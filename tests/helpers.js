/**
 * Test helper: sets up the DOM structure game.js expects,
 * stubs browser APIs, then loads game.js as a script.
 * Uses Jest's built-in jsdom environment.
 */
const fs = require('fs');
const path = require('path');

function setupGameEnv() {
  // Build the DOM from index.html (jest-environment-jsdom provides document/window)
  const htmlSrc = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf-8');
  document.body.innerHTML = htmlSrc.match(/<body>([\s\S]*)<\/body>/i)[1];

  // Stub canvas getContext
  HTMLCanvasElement.prototype.getContext = function () {
    return {
      clearRect() {}, fillRect() {}, beginPath() {}, arc() {}, fill() {},
      fillText() {}, save() {}, restore() {}, translate() {}, rotate() {},
      set globalAlpha(_) {}, set fillStyle(_) {}, set font(_) {},
      set textAlign(_) {}, set textBaseline(_) {},
    };
  };

  // Stub AudioContext
  window.AudioContext = class {
    constructor() { this.state = 'running'; this.currentTime = 0; this.sampleRate = 44100; }
    createOscillator() {
      return { connect() {}, start() {}, stop() {}, type: 'square', frequency: { value: 440 } };
    }
    createGain() {
      return { connect() {}, gain: { setValueAtTime() {}, exponentialRampToValueAtTime() {} } };
    }
    createBuffer(ch, len) { return { getChannelData: () => new Float32Array(len) }; }
    createBufferSource() { return { connect() {}, start() {}, buffer: null }; }
    createBiquadFilter() { return { connect() {}, type: 'highpass', frequency: { value: 0 } }; }
    resume() { return Promise.resolve(); }
  };
  window.webkitAudioContext = window.AudioContext;

  // Stub requestAnimationFrame
  window.requestAnimationFrame = jest.fn();

  // Stub getBoundingClientRect
  Element.prototype.getBoundingClientRect = function () {
    return { top: 0, left: 0, bottom: 100, right: 100, width: 100, height: 100 };
  };

  // Stub fetch
  global.fetch = jest.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve(null) })
  );

  // Load game.js source and transform it into a module that exports all globals.
  let src = fs.readFileSync(path.resolve(__dirname, '..', 'game.js'), 'utf-8');

  // Replace let with var for mutable state so they become global properties
  src = src.replace(/^let S = /m, 'var S = ');
  src = src.replace(/^let globalBoard = /m, 'var globalBoard = ');
  src = src.replace(/^let activeSpeechTimer/m, 'var activeSpeechTimer');
  src = src.replace(/^let resizeTimer/m, 'var resizeTimer');

  // Wrap in a Function that receives browser globals and returns exports.
  // Note: `fetch` is NOT passed as a parameter so the game code looks it up
  // from the enclosing scope (window.fetch) at call time, allowing tests to mock it.
  const wrappedSrc = `
    return (function(window, document, localStorage, performance,
                     requestAnimationFrame, AudioContext, webkitAudioContext,
                     HTMLCanvasElement, Element, setTimeout, clearTimeout, setInterval, clearInterval) {
      var fetch = function() { return window.fetch.apply(window, arguments); };
      ${src}
      return {
        // Constants
        ING, DRINKS, CUST_TYPES, UPGRADE_POOL,
        DIALOGUES_ENTER, DIALOGUES_WAIT, DIALOGUES_HAPPY, DIALOGUES_ANGRY,
        OVEN_BAKE_BASE, OVEN_BURN_OFFSET, MEAT_MAX, MEAT_PER_SLICE,
        MEAT_PER_ORDER, MEAT_START, CUSTOMER_PATIENCE_BASE, MAX_CUSTOMERS,
        MAX_LIVES, ORDERS_PER_LEVEL,
        PTS_INGREDIENT, PTS_DRINK, PTS_SPEED_BONUS, PTS_COMBO, PTS_PERFECT,
        PTS_WRONG_ING, PTS_BURNED, PTS_CUSTOMER_LEFT,
        LS_KEY, LS_NAME_KEY, MAX_LEADERBOARD, MAX_NAME_LEN, FIREBASE_DB,
        Audio, FX, DOM, EVENTS,
        rand, pick, clamp,
        // Mutable state (getter/setter)
        get S() { return S; },
        set S(v) { S = v; },
        get globalBoard() { return globalBoard; },
        set globalBoard(v) { globalBoard = v; },
        // Functions
        freshState, showScreen, loadHS, saveHS, loadName, saveName,
        fetchLeaderboard, submitScore, renderLeaderboard,
        generateOrder, spawnCustomer, removeCustomer, getActive, switchCustomer,
        showSpeechBubble, updateCustomers,
        ovenPutIn, ovenTakeOut, updateOven,
        sliceMeat, initAssembly, clearAssembly, addIngredient, addDrink,
        checkCanServe, tryServe,
        triggerEvent, updateEvent, showUpgradeScreen, resumeAfterUpgrade,
        showFB, screenShake, screenFlash,
        renderCustomers, renderOven, renderSlicer, renderAssembly,
        renderDrinks, updateServeBtn, renderHUD,
        gameLoop, startGame, gameOver, init,
      };
    })(window, document, localStorage, performance,
       requestAnimationFrame, AudioContext, webkitAudioContext,
       HTMLCanvasElement, Element, setTimeout, clearTimeout, setInterval, clearInterval);
  `;

  const factory = new Function(wrappedSrc);
  const game = factory();

  // Expose everything on window for backward compat with tests that use `win.X`
  Object.keys(game).forEach((key) => {
    const desc = Object.getOwnPropertyDescriptor(game, key);
    if (desc && (desc.get || desc.set)) {
      Object.defineProperty(window, key, desc);
    } else {
      window[key] = game[key];
    }
  });

  return window;
}

module.exports = { setupGameEnv };

module.exports = { setupGameEnv };
