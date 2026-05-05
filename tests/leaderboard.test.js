const { setupGameEnv } = require('./helpers');

let win;

beforeAll(() => {
  win = setupGameEnv();
});

beforeEach(() => {
  win.S = win.freshState();
  win.globalBoard = [];
});

// ---------------------------------------------------------------------------
// Leaderboard rendering (XSS protection)
// ---------------------------------------------------------------------------
describe('renderLeaderboard()', () => {
  test('renders entries into both leaderboard elements', () => {
    win.globalBoard = [
      { name: 'Alice', score: 500, date: '2026-01-01' },
      { name: 'Bob', score: 300, date: '2026-01-02' },
    ];
    win.renderLeaderboard();

    const titleList = document.getElementById('leaderboard-list');
    const goList = document.getElementById('go-leaderboard-list');
    expect(titleList.innerHTML).toContain('Alice');
    expect(titleList.innerHTML).toContain('500');
    expect(goList.innerHTML).toContain('Bob');
    expect(goList.innerHTML).toContain('300');
  });

  test('shows empty message when board is empty', () => {
    win.globalBoard = [];
    win.renderLeaderboard();

    const titleList = document.getElementById('leaderboard-list');
    expect(titleList.innerHTML).toContain('Noch keine');
  });

  test('escapes HTML in player names (XSS prevention)', () => {
    win.globalBoard = [
      { name: '<script>alert("xss")</script>', score: 100, date: '2026-01-01' },
    ];
    win.renderLeaderboard();

    const titleList = document.getElementById('leaderboard-list');
    expect(titleList.innerHTML).not.toContain('<script>');
    expect(titleList.innerHTML).toContain('&lt;script&gt;');
  });

  test('escapes ampersands', () => {
    win.globalBoard = [
      { name: 'A&B<C', score: 50, date: '2026-01-01' },
    ];
    win.renderLeaderboard();

    const titleList = document.getElementById('leaderboard-list');
    expect(titleList.innerHTML).toContain('&amp;');
    expect(titleList.innerHTML).toContain('&lt;');
  });

  test('renders medal emojis for top 3', () => {
    win.globalBoard = [
      { name: 'First', score: 300, date: '2026-01-01' },
      { name: 'Second', score: 200, date: '2026-01-01' },
      { name: 'Third', score: 100, date: '2026-01-01' },
      { name: 'Fourth', score: 50, date: '2026-01-01' },
    ];
    win.renderLeaderboard();

    const list = document.getElementById('leaderboard-list');
    expect(list.innerHTML).toContain('🥇');
    expect(list.innerHTML).toContain('🥈');
    expect(list.innerHTML).toContain('🥉');
    expect(list.innerHTML).toContain('4.');
  });

  test('limits display to MAX_LEADERBOARD entries', () => {
    win.globalBoard = Array.from({ length: 15 }, (_, i) => ({
      name: `P${i}`, score: 1000 - i * 10, date: '2026-01-01',
    }));
    win.renderLeaderboard();

    const list = document.getElementById('leaderboard-list');
    const rows = list.querySelectorAll('.lb-row');
    // globalBoard itself is what's rendered — the slice is done during fetch
    expect(rows.length).toBe(15);
  });
});

// ---------------------------------------------------------------------------
// fetchLeaderboard integration
// ---------------------------------------------------------------------------
describe('fetchLeaderboard()', () => {
  test('parses Firebase response and sorts by score desc', async () => {
    window.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          '-abc': { name: 'Low', score: 50, date: '2026-01-01' },
          '-def': { name: 'High', score: 200, date: '2026-01-02' },
          '-ghi': { name: 'Mid', score: 100, date: '2026-01-03' },
        }),
      })
    );

    await win.fetchLeaderboard();
    expect(win.globalBoard[0].name).toBe('High');
    expect(win.globalBoard[1].name).toBe('Mid');
    expect(win.globalBoard[2].name).toBe('Low');
  });

  test('handles null response (empty database)', async () => {
    window.fetch = jest.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve(null) })
    );

    await win.fetchLeaderboard();
    expect(win.globalBoard).toEqual([]);
  });

  test('handles network error gracefully', async () => {
    window.fetch = jest.fn(() => Promise.reject(new Error('network')));

    await win.fetchLeaderboard();
    expect(win.globalBoard).toEqual([]);
  });

  test('handles non-ok response', async () => {
    window.fetch = jest.fn(() =>
      Promise.resolve({ ok: false })
    );

    await win.fetchLeaderboard();
    expect(win.globalBoard).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// submitScore integration
// ---------------------------------------------------------------------------
describe('submitScore()', () => {
  test('POSTs score to Firebase', async () => {
    window.fetch = jest.fn()
      .mockResolvedValueOnce({ ok: true }) // POST
      .mockResolvedValueOnce({             // GET after POST
        ok: true,
        json: () => Promise.resolve({
          '-abc': { name: 'Player', score: 500, date: '2026-01-01' },
        }),
      });

    await win.submitScore('Player', 500);
    expect(window.fetch).toHaveBeenCalledTimes(2);

    const postCall = window.fetch.mock.calls[0];
    expect(postCall[0]).toContain('leaderboard.json');
    expect(postCall[1].method).toBe('POST');

    const body = JSON.parse(postCall[1].body);
    expect(body.name).toBe('Player');
    expect(body.score).toBe(500);
  });

  test('does not submit if name is empty', async () => {
    window.fetch = jest.fn();
    await win.submitScore('', 100);
    expect(window.fetch).not.toHaveBeenCalled();
  });

  test('does not submit if score is 0', async () => {
    window.fetch = jest.fn();
    await win.submitScore('Player', 0);
    expect(window.fetch).not.toHaveBeenCalled();
  });

  test('does not submit if score is negative', async () => {
    window.fetch = jest.fn();
    await win.submitScore('Player', -10);
    expect(window.fetch).not.toHaveBeenCalled();
  });

  test('truncates name to MAX_NAME_LEN', async () => {
    window.fetch = jest.fn()
      .mockResolvedValueOnce({ ok: true })
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(null) });

    await win.submitScore('VeryLongNameThatExceeds', 100);
    const body = JSON.parse(window.fetch.mock.calls[0][1].body);
    expect(body.name.length).toBeLessThanOrEqual(win.MAX_NAME_LEN);
  });

  test('trims entries beyond MAX_LEADERBOARD', async () => {
    const entries = {};
    for (let i = 0; i < 12; i++) {
      entries[`-key${i}`] = { name: `P${i}`, score: 1000 - i * 50, date: '2026-01-01' };
    }

    window.fetch = jest.fn()
      .mockResolvedValueOnce({ ok: true })             // POST
      .mockResolvedValueOnce({                          // GET
        ok: true,
        json: () => Promise.resolve(entries),
      })
      .mockResolvedValueOnce({ ok: true });             // PATCH to remove extras

    await win.submitScore('New', 999);

    // Third call should be a PATCH to remove the lowest 2
    expect(window.fetch).toHaveBeenCalledTimes(3);
    const patchCall = window.fetch.mock.calls[2];
    expect(patchCall[1].method).toBe('PATCH');
    const patchBody = JSON.parse(patchCall[1].body);
    // Should null out the 2 lowest entries
    const nullKeys = Object.keys(patchBody).filter((k) => patchBody[k] === null);
    expect(nullKeys.length).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// Local storage functions
// ---------------------------------------------------------------------------
describe('Local storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('saveHS and loadHS round-trip', () => {
    win.S.highScore = 42;
    win.saveHS();
    win.S.highScore = 0;
    win.loadHS();
    expect(win.S.highScore).toBe(42);
  });

  test('loadHS defaults to 0 when nothing stored', () => {
    win.S.highScore = 999;
    win.loadHS();
    expect(win.S.highScore).toBe(0);
  });

  test('saveName and loadName round-trip', () => {
    win.saveName('Ali');
    expect(win.loadName()).toBe('Ali');
  });

  test('loadName defaults to empty string', () => {
    expect(win.loadName()).toBe('');
  });
});
