const fs = require('fs');
const path = require('path');

const htmlPath = path.resolve(__dirname, '..', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf-8');

// Parse the HTML once for all tests
beforeAll(() => {
  document.body.innerHTML = html.match(/<body>([\s\S]*)<\/body>/i)[1];
});

// ---------------------------------------------------------------------------
// Required DOM elements
// ---------------------------------------------------------------------------
describe('Required DOM elements', () => {
  const requiredIds = [
    'game-container', 'fx-canvas',
    'title-screen', 'game-screen', 'upgrade-screen', 'gameover-screen',
    'hud', 'hud-score', 'hud-combo', 'hud-level', 'hud-lives',
    'event-banner', 'customer-queue',
    'oven-box', 'oven-bread-vis', 'oven-bar', 'oven-status', 'bread-count',
    'order-checklist',
    'spit-meat', 'spit-knife', 'meat-bar', 'meat-val',
    'drink-needed', 'drink-status',
    'serve-status', 'serve-btn',
    'feedback',
    'upgrade-sub', 'upgrade-options',
    'go-score', 'go-orders', 'go-combo', 'go-level', 'go-hs', 'go-newhs',
    'go-name', 'go-submit',
    'leaderboard-list', 'go-leaderboard-list',
    'start-btn', 'restart-btn',
    'title-hs',
  ];

  test.each(requiredIds)('#%s exists', (id) => {
    expect(document.getElementById(id)).not.toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Screens
// ---------------------------------------------------------------------------
describe('Screen structure', () => {
  test('has exactly 4 screens', () => {
    expect(document.querySelectorAll('.screen').length).toBe(4);
  });

  test('only title-screen is active by default', () => {
    const active = document.querySelectorAll('.screen.active');
    expect(active.length).toBe(1);
    expect(active[0].id).toBe('title-screen');
  });
});

// ---------------------------------------------------------------------------
// Ingredient buttons
// ---------------------------------------------------------------------------
describe('Ingredient buttons', () => {
  test('has 6 ingredient buttons', () => {
    expect(document.querySelectorAll('.ing-btn').length).toBe(6);
  });

  test('ingredient buttons have data-ing attributes 0-5', () => {
    const btns = document.querySelectorAll('.ing-btn');
    const indices = [...btns].map((b) => b.dataset.ing);
    expect(indices).toEqual(['0', '1', '2', '3', '4', '5']);
  });
});

// ---------------------------------------------------------------------------
// Drink buttons
// ---------------------------------------------------------------------------
describe('Drink buttons', () => {
  test('has 4 drink buttons', () => {
    expect(document.querySelectorAll('.drink-btn').length).toBe(4);
  });

  test('drink buttons have correct data-action values', () => {
    const actions = [...document.querySelectorAll('.drink-btn')].map(
      (b) => b.dataset.action
    );
    expect(actions).toContain('ayran');
    expect(actions).toContain('cola');
    expect(actions).toContain('cay');
    expect(actions).toContain('salgam');
  });
});

// ---------------------------------------------------------------------------
// Station buttons
// ---------------------------------------------------------------------------
describe('Station buttons', () => {
  test('oven has in/out buttons', () => {
    expect(document.querySelector('[data-action="oven-in"]')).not.toBeNull();
    expect(document.querySelector('[data-action="oven-out"]')).not.toBeNull();
  });

  test('slicer has slice button', () => {
    expect(document.querySelector('[data-action="slice"]')).not.toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Name input
// ---------------------------------------------------------------------------
describe('Leaderboard name input', () => {
  test('go-name input has maxlength 10', () => {
    const input = document.getElementById('go-name');
    expect(input.maxLength).toBe(10);
  });

  test('go-name input has autocomplete off', () => {
    const input = document.getElementById('go-name');
    expect(input.autocomplete).toBe('off');
  });
});

// ---------------------------------------------------------------------------
// Accessibility / Meta
// ---------------------------------------------------------------------------
describe('HTML meta and accessibility', () => {
  test('HTML has lang="de"', () => {
    // We loaded the body, so check the raw HTML string
    expect(html).toContain('lang="de"');
  });

  test('has charset UTF-8', () => {
    expect(html).toContain('charset="UTF-8"');
  });

  test('has viewport meta tag', () => {
    expect(html).toContain('name="viewport"');
  });

  test('has theme-color meta tag', () => {
    expect(html).toContain('name="theme-color"');
  });

  test('page title is set', () => {
    expect(html).toMatch(/<title>.+<\/title>/);
  });

  test('no inline event handlers (onclick etc.)', () => {
    const allElements = document.querySelectorAll('*');
    allElements.forEach((el) => {
      for (const attr of el.attributes) {
        expect(attr.name.startsWith('on')).toBe(false);
      }
    });
  });

  test('only local scripts loaded (no CDN/external)', () => {
    // jsdom resolves relative src to http://localhost, so filter for actual external domains
    const scripts = document.querySelectorAll('script[src]');
    const external = [...scripts].filter(
      (s) => s.src.startsWith('http') && !s.src.includes('localhost')
    );
    expect(external.length).toBe(0);
  });

  test('game.js script loaded from local file', () => {
    expect(html).toContain('src="game.js"');
  });
});
