const { setupGameEnv } = require('./helpers');

let win;

beforeAll(() => {
  win = setupGameEnv();
});

beforeEach(() => {
  // Reset game state before each test
  win.S = win.freshState();
});

// ---------------------------------------------------------------------------
// freshState
// ---------------------------------------------------------------------------
describe('freshState()', () => {
  test('returns a new state object each call', () => {
    const a = win.freshState();
    const b = win.freshState();
    expect(a).not.toBe(b);
  });

  test('starts with correct defaults', () => {
    const s = win.freshState();
    expect(s.running).toBe(false);
    expect(s.score).toBe(0);
    expect(s.lives).toBe(win.MAX_LIVES);
    expect(s.level).toBe(1);
    expect(s.combo).toBe(0);
    expect(s.ordersServed).toBe(0);
    expect(s.customers).toEqual([]);
    expect(s.meat).toBe(win.MEAT_START);
    expect(s.breadStock).toBe(0);
    expect(s.ovenHasBread).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Order generation
// ---------------------------------------------------------------------------
describe('generateOrder()', () => {
  test('returns an object with ingredients array', () => {
    const order = win.generateOrder();
    expect(Array.isArray(order.ingredients)).toBe(true);
    expect(order.ingredients.length).toBeGreaterThanOrEqual(2);
  });

  test('ingredient indices are within valid range', () => {
    for (let i = 0; i < 50; i++) {
      const order = win.generateOrder();
      order.ingredients.forEach((idx) => {
        expect(idx).toBeGreaterThanOrEqual(0);
        expect(idx).toBeLessThan(6);
      });
    }
  });

  test('ingredient indices are unique within an order', () => {
    for (let i = 0; i < 50; i++) {
      const order = win.generateOrder();
      expect(new Set(order.ingredients).size).toBe(order.ingredients.length);
    }
  });

  test('drink is null or a valid drink id', () => {
    const validIds = win.DRINKS.map((d) => d.id);
    for (let i = 0; i < 100; i++) {
      const order = win.generateOrder();
      if (order.drink !== null) {
        expect(validIds).toContain(order.drink);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------
describe('Helper utilities', () => {
  test('rand(a,b) returns values in [a,b]', () => {
    for (let i = 0; i < 200; i++) {
      const v = win.rand(3, 7);
      expect(v).toBeGreaterThanOrEqual(3);
      expect(v).toBeLessThanOrEqual(7);
    }
  });

  test('pick() returns an element from the array', () => {
    const arr = ['a', 'b', 'c'];
    for (let i = 0; i < 50; i++) {
      expect(arr).toContain(win.pick(arr));
    }
  });

  test('clamp() constrains values', () => {
    expect(win.clamp(5, 0, 10)).toBe(5);
    expect(win.clamp(-1, 0, 10)).toBe(0);
    expect(win.clamp(15, 0, 10)).toBe(10);
    expect(win.clamp(0, 0, 0)).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// Oven system
// ---------------------------------------------------------------------------
describe('Oven system', () => {
  test('ovenPutIn() sets ovenHasBread', () => {
    win.S.ovenHasBread = false;
    win.ovenPutIn();
    expect(win.S.ovenHasBread).toBe(true);
  });

  test('ovenPutIn() does nothing if bread is already in', () => {
    win.S.ovenHasBread = true;
    const startTime = win.S.ovenStart;
    win.ovenPutIn();
    expect(win.S.ovenStart).toBe(startTime);
  });

  test('ovenTakeOut() too early shows raw message', () => {
    win.S.ovenHasBread = true;
    win.S.ovenStart = performance.now();
    // Taking out immediately is too early
    win.ovenTakeOut();
    // Bread should still be in the oven
    expect(win.S.ovenHasBread).toBe(true);
  });

  test('ovenTakeOut() at right time gives bread', () => {
    const bakeTime = win.OVEN_BAKE_BASE * win.S.ovenSpeedMul;
    // Set ovenStart so elapsed = bakeTime (perfect zone)
    win.S.ovenHasBread = true;
    win.S.ovenStart = performance.now() - bakeTime;
    win.S.breadStock = 0;
    win.ovenTakeOut();
    expect(win.S.ovenHasBread).toBe(false);
    expect(win.S.breadStock).toBe(1);
  });

  test('breadStock does not exceed maxBread', () => {
    win.S.breadStock = win.S.maxBread;
    const bakeTime = win.OVEN_BAKE_BASE * win.S.ovenSpeedMul;
    win.S.ovenHasBread = true;
    win.S.ovenStart = performance.now() - bakeTime;
    win.ovenTakeOut();
    expect(win.S.breadStock).toBe(win.S.maxBread);
  });
});

// ---------------------------------------------------------------------------
// Slicer system
// ---------------------------------------------------------------------------
describe('Slicer system', () => {
  test('sliceMeat() increases meat', () => {
    win.S.meat = 50;
    win.S.lastSliceTime = 0;
    win.S.sliceCooldown = 180;
    const before = win.S.meat;
    win.sliceMeat();
    expect(win.S.meat).toBeGreaterThan(before);
  });

  test('sliceMeat() does not exceed meatMax', () => {
    win.S.meat = win.S.meatMax;
    win.S.lastSliceTime = 0;
    win.sliceMeat();
    expect(win.S.meat).toBe(win.S.meatMax);
  });

  test('sliceMeat() respects cooldown', () => {
    win.S.meat = 50;
    win.S.lastSliceTime = performance.now();
    win.sliceMeat();
    expect(win.S.meat).toBe(50); // unchanged
  });
});

// ---------------------------------------------------------------------------
// Customer spawning
// ---------------------------------------------------------------------------
describe('Customer system', () => {
  test('spawnCustomer() adds a customer', () => {
    win.S.running = true;
    expect(win.S.customers).toHaveLength(0);
    win.spawnCustomer();
    expect(win.S.customers).toHaveLength(1);
  });

  test('customer has required properties', () => {
    win.S.running = true;
    win.spawnCustomer();
    const cust = win.S.customers[0];
    expect(cust.id).toBeDefined();
    expect(cust.sprite).toBeTruthy();
    expect(cust.type).toBeDefined();
    expect(cust.order).toBeDefined();
    expect(cust.order.ingredients).toBeDefined();
    expect(cust.patience).toBeGreaterThan(0);
    expect(cust.addedIngs).toBeInstanceOf(Set);
    expect(cust.addedDrink).toBeNull();
  });

  test('spawnCustomer() respects MAX_CUSTOMERS', () => {
    win.S.running = true;
    for (let i = 0; i < 10; i++) win.spawnCustomer();
    expect(win.S.customers.length).toBeLessThanOrEqual(win.MAX_CUSTOMERS);
  });

  test('removeCustomer() removes the right customer', () => {
    win.S.running = true;
    win.spawnCustomer();
    win.spawnCustomer();
    const id = win.S.customers[0].id;
    win.removeCustomer(id);
    expect(win.S.customers.find((c) => c.id === id)).toBeUndefined();
  });

  test('switchCustomer() cycles through customers', () => {
    win.S.running = true;
    win.spawnCustomer();
    win.spawnCustomer();
    expect(win.S.activeIdx).toBe(0);
    win.switchCustomer('next');
    expect(win.S.activeIdx).toBe(1);
    win.switchCustomer('next');
    expect(win.S.activeIdx).toBe(0);
  });

  test('getActive() returns the selected customer', () => {
    win.S.running = true;
    win.spawnCustomer();
    expect(win.getActive()).toBe(win.S.customers[0]);
  });

  test('getActive() returns null when no customers', () => {
    expect(win.getActive()).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Upgrade system
// ---------------------------------------------------------------------------
describe('Upgrade system', () => {
  test('fast-oven upgrade reduces ovenSpeedMul', () => {
    const u = win.UPGRADE_POOL.find((u) => u.id === 'fast-oven');
    const s = win.freshState();
    const before = s.ovenSpeedMul;
    u.apply(s);
    expect(s.ovenSpeedMul).toBeLessThan(before);
  });

  test('sharp-knife upgrade increases sliceAmount', () => {
    const u = win.UPGRADE_POOL.find((u) => u.id === 'sharp-knife');
    const s = win.freshState();
    const before = s.sliceAmount;
    u.apply(s);
    expect(s.sliceAmount).toBeGreaterThan(before);
  });

  test('extra-life upgrade adds a life (capped at 5)', () => {
    const u = win.UPGRADE_POOL.find((u) => u.id === 'extra-life');
    const s = win.freshState();
    s.lives = 3;
    u.apply(s);
    expect(s.lives).toBe(4);
    s.lives = 5;
    u.apply(s);
    expect(s.lives).toBe(5);
  });

  test('auto-drink upgrade sets autoDrink flag', () => {
    const u = win.UPGRADE_POOL.find((u) => u.id === 'auto-drink');
    const s = win.freshState();
    expect(s.autoDrink).toBe(false);
    u.apply(s);
    expect(s.autoDrink).toBe(true);
  });

  test('mega-meat upgrade increases meatMax', () => {
    const u = win.UPGRADE_POOL.find((u) => u.id === 'mega-meat');
    const s = win.freshState();
    const before = s.meatMax;
    u.apply(s);
    expect(s.meatMax).toBe(before + 40);
  });
});
