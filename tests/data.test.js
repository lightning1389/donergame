const { setupGameEnv } = require('./helpers');

let win;

beforeAll(() => {
  win = setupGameEnv();
});

// ---------------------------------------------------------------------------
// Data integrity tests
// ---------------------------------------------------------------------------
describe('Game data constants', () => {
  test('ING has exactly 6 ingredients', () => {
    expect(win.ING).toHaveLength(6);
  });

  test('every ingredient has emoji, name, and color', () => {
    win.ING.forEach((ing) => {
      expect(ing.emoji).toBeTruthy();
      expect(ing.name).toBeTruthy();
      expect(ing.color).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
  });

  test('DRINKS has exactly 4 drinks', () => {
    expect(win.DRINKS).toHaveLength(4);
  });

  test('each drink has id, emoji, and name', () => {
    win.DRINKS.forEach((d) => {
      expect(d.id).toBeTruthy();
      expect(d.emoji).toBeTruthy();
      expect(d.name).toBeTruthy();
    });
  });

  test('drink ids are unique', () => {
    const ids = win.DRINKS.map((d) => d.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('CUST_TYPES has at least 6 customer types', () => {
    expect(win.CUST_TYPES.length).toBeGreaterThanOrEqual(6);
  });

  test('each customer type has sprites array', () => {
    win.CUST_TYPES.forEach((t) => {
      expect(Array.isArray(t.sprites)).toBe(true);
      expect(t.sprites.length).toBeGreaterThan(0);
    });
  });

  test('UPGRADE_POOL has at least 5 upgrades', () => {
    expect(win.UPGRADE_POOL.length).toBeGreaterThanOrEqual(5);
  });

  test('each upgrade has id, icon, name, desc, and apply function', () => {
    win.UPGRADE_POOL.forEach((u) => {
      expect(u.id).toBeTruthy();
      expect(u.icon).toBeTruthy();
      expect(u.name).toBeTruthy();
      expect(u.desc).toBeTruthy();
      expect(typeof u.apply).toBe('function');
    });
  });

  test('upgrade ids are unique', () => {
    const ids = win.UPGRADE_POOL.map((u) => u.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

// ---------------------------------------------------------------------------
// Dialogue arrays
// ---------------------------------------------------------------------------
describe('Dialogue arrays', () => {
  test('DIALOGUES_ENTER has at least 20 entries', () => {
    expect(win.DIALOGUES_ENTER.length).toBeGreaterThanOrEqual(20);
  });

  test('DIALOGUES_WAIT has at least 8 entries', () => {
    expect(win.DIALOGUES_WAIT.length).toBeGreaterThanOrEqual(8);
  });

  test('DIALOGUES_HAPPY has at least 5 entries', () => {
    expect(win.DIALOGUES_HAPPY.length).toBeGreaterThanOrEqual(5);
  });

  test('DIALOGUES_ANGRY has at least 5 entries', () => {
    expect(win.DIALOGUES_ANGRY.length).toBeGreaterThanOrEqual(5);
  });

  test('all dialogues are non-empty strings', () => {
    const all = [
      ...win.DIALOGUES_ENTER,
      ...win.DIALOGUES_WAIT,
      ...win.DIALOGUES_HAPPY,
      ...win.DIALOGUES_ANGRY,
    ];
    all.forEach((d) => {
      expect(typeof d).toBe('string');
      expect(d.length).toBeGreaterThan(0);
    });
  });
});

// ---------------------------------------------------------------------------
// Scoring constants
// ---------------------------------------------------------------------------
describe('Scoring constants', () => {
  test('MAX_LIVES is 3', () => {
    expect(win.MAX_LIVES).toBe(3);
  });

  test('MAX_LEADERBOARD is 10', () => {
    expect(win.MAX_LEADERBOARD).toBe(10);
  });

  test('MAX_NAME_LEN is 10', () => {
    expect(win.MAX_NAME_LEN).toBe(10);
  });

  test('point values are numbers', () => {
    expect(typeof win.PTS_INGREDIENT).toBe('number');
    expect(typeof win.PTS_DRINK).toBe('number');
    expect(typeof win.PTS_COMBO).toBe('number');
    expect(typeof win.PTS_PERFECT).toBe('number');
    expect(typeof win.PTS_WRONG_ING).toBe('number');
    expect(typeof win.PTS_BURNED).toBe('number');
    expect(typeof win.PTS_CUSTOMER_LEFT).toBe('number');
  });

  test('penalty values are negative', () => {
    expect(win.PTS_WRONG_ING).toBeLessThan(0);
    expect(win.PTS_BURNED).toBeLessThan(0);
    expect(win.PTS_CUSTOMER_LEFT).toBeLessThan(0);
  });
});
