/* ============================================
   DÖNER DASH: KEBAB CHAOS — Game Engine v2
   Now with: customer switching, speech bubbles,
   Turkish-German culture, enhanced SFX
   ============================================ */

// ===== INGREDIENT DATA =====
const ING = [
    { emoji: '🥬', name: 'Salat',    color: '#4cdf6b' },
    { emoji: '🍅', name: 'Tomate',   color: '#ff4444' },
    { emoji: '🧅', name: 'Zwiebel',  color: '#d4a055' },
    { emoji: '🥗', name: 'Rotkraut', color: '#cc44aa' },
    { emoji: '🧄', name: 'Knobi',    color: '#ffe4b5' },
    { emoji: '🌶️', name: 'Scharf',   color: '#ff2e4c' }
];
const DRINKS = [
    { id: 'ayran', emoji: '🥛', name: 'Ayran' },
    { id: 'cola',  emoji: '🥤', name: 'Cola' },
    { id: 'cay',   emoji: '🫖', name: 'Çay' },
    { id: 'salgam', emoji: '🧃', name: 'Şalgam' }
];

// ===== CUSTOMER TYPES (Turkish/German culture) =====
const CUST_TYPES = [
    { title:'Abi',   sprites:['🧔','👨','🧑‍🦰','👨‍🦱'], vibe:'chill' },
    { title:'Abla',  sprites:['👩','🧕','👩‍🦳','👩‍🦱'], vibe:'nice' },
    { title:'Dayı',  sprites:['👴','🧔‍♂️','👨‍🦳'], vibe:'demanding' },
    { title:'Teyze', sprites:['👵','🧕'], vibe:'chatty' },
    { title:'Lan',   sprites:['🧑','👦','🧒'], vibe:'impatient' },
    { title:'Alman', sprites:['👨‍💼','👩‍💼','🧑‍💼','👮'], vibe:'polite' },
    { title:'Stammkunde', sprites:['🧔','👨','👩','🧑‍🦰'], vibe:'loyal' },
    { title:'Tourist', sprites:['🧑‍🦰','👩‍🦳','👱','👱‍♀️'], vibe:'confused' },
];

// ===== CUSTOMER DIALOGUES (German-Turkish mix) =====
// Each has: text, mood ('enter'=arrival, 'wait'=impatient, 'happy'=served, 'angry'=left)
const DIALOGUES_ENTER = [
    "Bruder, einmal Döner mit allem, scharf aber nicht zu scharf!",
    "Chef, mach schnell, mein Bus kommt gleich!",
    "Mit ohne Zwiebeln… also ein bisschen Zwiebeln ist okay.",
    "Wallah bester Döner hier, aber heute wenig Fleisch oder was?",
    "Ayran eiskalt bitte, sonst gibt es Stress!",
    "Ich zahl mit Karte… oder Bar… warte kurz…",
    "Scharf soll es sein, aber nicht so richtig, verstehst du?",
    "Ich komm seit zehn Jahren her, mach mal korrekt bitte.",
    "Extra Soße, aber so dass es nicht runterläuft bitte!",
    "Kein Rotkraut! Letztes Mal war ich traumatisiert.",
    "Chef, wie immer bitte — du weißt schon.",
    "Nach dem Fasten hab ich Hunger wie ein Wolf, mach stabil Bruder.",
    "Gibt es was Veganes? ...Spaß, extra Fleisch bitte!",
    "Mein Arzt sagt weniger Döner. Ich hab jetzt einen neuen Arzt.",
    "Döner ohne Salat? Ja, ich lebe gefährlich.",
    "Zwei Stück bitte, eins für die Oma.",
    "Letzte Woche war es besser, sag ich nur.",
    "Einmal alles, aber ohne die Sachen die ich nicht mag.",
    "Döner macht schöner — schau mich an zum Beispiel!",
    "Kannst du ein Herz aus Soße machen? Für Instagram!",
    "Ist das Halal? ...Na klar ist das Halal!",
    "Einen Döner aber mit Liebe gemacht bitte!",
    "Mein Döner-Radar hat mich hierher geführt Bruder.",
    "Drei Döner. Alle für mich. Nicht urteilen.",
    "So viel Fleisch wie erlaubt bitte.",
    "Keine Tomaten, ich hab eine Allergie... nee, mag ich einfach nicht.",
    "Ich hab gerade erst gegessen... aber egal.",
    "Viel Soße, aber nicht zu viel. Du verstehst.",
    "Hallo, bin zum ersten Mal hier. Mach was Gutes!",
    "Ich warte schon seit... jetzt gerade erst.",
    "Wie immer bitte. Ich war noch nie hier.",
    "Schön voll machen bitte, ich hab Kummer.",
    "Keine Zwiebeln, ich hab gleich ein Date.",
    "Ich schwöre, dein Döner heilt alles Bruder.",
    "Einmal den Klassiker, mit Freudentränen bitte.",
    "Du sagst nachher Guten Appetit oder? Ich warte drauf.",
    "Mach noch einen Tee dazu bitte, mir ist kalt heute.",
    "Mach mir den besten Döner deines Lebens!",
    "Richtig scharf bitte, kennst du mich nicht?",
    "Entweder Döner oder Tod, es gibt keine andere Wahl.",
    "Einen Döner bitte... mit Liebe und ein bisschen Schärfe.",
    "Meister, danke schon im Voraus, obwohl du noch gar nicht angefangen hast!",
    "Ich nehm das Übliche... also irgendwas Gutes halt.",
    "Alter, heute alles drauf was du hast.",
    "Einen Döner... aber ordentlich bitte!",
    "Kann ich einen Döner haben? ...Spaß, natürlich alles drauf!",
    "Ist der diesmal umsonst? ...War nur Spaß, naja.",
    "Also mein Vater ist auch Dönermann, aber deiner ist anders.",
];
const DIALOGUES_WAIT = [
    "Bruder, beeil dich, meine Geduld ist am Ende!",
    "Mein Döner wächst nicht im Garten!",
    "Hallo? Ich warte hier!",
    "Wie lange kann das denn noch dauern, um Himmels willen?",
    "Mein Magen denkt mein Hals ist abgeschnitten!",
    "Also wie lange kann ein Döner denn dauern?!",
    "Ich geh gleich zu Burger King, ich schwöre!",
    "Tick tack, Bruder, tick tack...",
    "Meine Mittagspause ist gleich vorbei, schneller bitte!",
    "Schneller, schneller! Mein Bus fährt gleich!",
    "Für einen Döner wartet man doch nicht so lange!",
    "Mein Auto steht in zweiter Reihe, es eilt!",
];
const DIALOGUES_HAPPY = [
    "Danke Bruder, perfekt!",
    "Großartig gemacht! Wunderschön!",
    "DAS ist ein Döner! Vielen Dank!",
    "Ich komm immer wieder, der beste hier!",
    "Wunderbar, richtig gut geworden!",
    "Danke Chef, guten Appetit an mich!",
    "Fünf Sterne auf Google, versprochen!",
    "Du hast es drauf! Respekt!",
    "Perfekt! Ich bring dir Hochzeitskekse mit!",
    "Du bist der Beste, gute Arbeit!",
];
const DIALOGUES_ANGRY = [
    "Na gut, ich geh! Tschüss!",
    "So lange wartet man doch nicht, bis dann!",
    "Ich komm nie wieder! ...Vielleicht morgen.",
    "Nee jetzt reicht es, lieber hungrig bleiben!",
    "Ich geh zu einem RICHTIGEN Dönerladen!",
    "Das erzähl ich meinem Vater, warte nur!",
    "Einen Stern auf Google! ...Nein, zwei, Döner war immer gut.",
    "So geht das nicht Bruder!",
];

// ===== DIFFICULTY & SCORING =====
const OVEN_BAKE_BASE = 4000;       // ms to bake bread
const OVEN_BURN_OFFSET = 3000;     // extra ms after bake before burn
const MEAT_MAX = 100;
const MEAT_PER_SLICE = 10;
const MEAT_PER_ORDER = 15;
const MEAT_START = 60;
const CUSTOMER_PATIENCE_BASE = 22000; // ms
const CUSTOMER_SPAWN_BASE = 6000;     // ms between spawns
const MAX_CUSTOMERS = 4;
const MAX_LIVES = 3;
const ORDERS_PER_LEVEL = 5;
const EVENT_INTERVAL_MIN = 18000;
const EVENT_INTERVAL_MAX = 35000;

const PTS_INGREDIENT = 10;
const PTS_DRINK = 10;
const PTS_SPEED_BONUS = 50;
const PTS_COMBO = 20;
const PTS_PERFECT = 40;
const PTS_WRONG_ING = -5;
const PTS_BURNED = -20;
const PTS_CUSTOMER_LEFT = -50;

const LS_KEY = 'donerChaosHS';
const LS_NAME_KEY = 'donerChaosName';
const MAX_LEADERBOARD = 10;
const MAX_NAME_LEN = 10;
const FIREBASE_DB = 'https://donerdash-9e39d-default-rtdb.firebaseio.com';

// ===== UPGRADES =====
const UPGRADE_POOL = [
    { id:'fast-oven',   icon:'⚡', name:'Turbo-Ofen',      desc:'Brot backt 30% schneller',     apply: s => { s.ovenSpeedMul *= 0.7; }},
    { id:'sharp-knife', icon:'🔪', name:'Scharfes Messer',  desc:'+50% Fleisch pro Schnitt',     apply: s => { s.sliceAmount = Math.ceil(s.sliceAmount * 1.5); }},
    { id:'patience',    icon:'😊', name:'Nette Kunden',     desc:'Kunden warten 25% länger',     apply: s => { s.patienceMul *= 1.25; }},
    { id:'double-bread',icon:'🍞', name:'Doppel-Brot',      desc:'Ofen macht 2 Brote auf einmal', apply: s => { s.breadPerBake = 2; }},
    { id:'mega-meat',   icon:'🥩', name:'Mega-Vorrat',      desc:'+40 max Fleisch',              apply: s => { s.meatMax += 40; }},
    { id:'extra-life',  icon:'❤️', name:'Extra Leben',       desc:'+1 Leben',                     apply: s => { s.lives = Math.min(s.lives + 1, 5); }},
    { id:'combo-keep',  icon:'🔥', name:'Combo-Keeper',     desc:'Fehler: Combo nur -1 statt reset', apply: s => { s.comboKeep = true; }},
    { id:'auto-drink',  icon:'🤖', name:'Getränke-Automat', desc:'Getränke automatisch korrekt', apply: s => { s.autoDrink = true; }},
    { id:'tip-jar',     icon:'💰', name:'Trinkgeld-Glas',   desc:'+15 Punkte pro Bestellung',    apply: s => { s.tipBonus += 15; }},
    { id:'big-oven',    icon:'🔥', name:'Großer Ofen',      desc:'Ofen hält 5 Brote (statt 3)',  apply: s => { s.maxBread = 5; }},
];

// ===== AUDIO ENGINE (Turkish-flavored) =====
const Audio = (() => {
    let ctx = null;
    const getCtx = () => { if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)(); return ctx; };
    const tone = (f, d, type='square', vol=0.12) => {
        try {
            const c = getCtx(), o = c.createOscillator(), g = c.createGain();
            o.type = type; o.frequency.value = f;
            g.gain.setValueAtTime(vol, c.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + d);
            o.connect(g); g.connect(c.destination); o.start(); o.stop(c.currentTime + d);
        } catch(_){}
    };
    const noise = (d, vol=0.08) => {
        try {
            const c = getCtx(), sz = c.sampleRate * d, buf = c.createBuffer(1, sz, c.sampleRate);
            const data = buf.getChannelData(0);
            for (let i = 0; i < sz; i++) data[i] = (Math.random()*2-1)*(1-i/sz);
            const src = c.createBufferSource(); src.buffer = buf;
            const g = c.createGain(); g.gain.setValueAtTime(vol, c.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + d);
            const flt = c.createBiquadFilter(); flt.type='highpass'; flt.frequency.value=2000;
            src.connect(flt); flt.connect(g); g.connect(c.destination); src.start();
        } catch(_){}
    };
    // Turkish-scale melody helper (Hicaz-ish intervals)
    const turkMelody = (notes, dur, vol=0.08) => {
        notes.forEach((f,i)=>setTimeout(()=>tone(f,dur,'triangle',vol), i*(dur*800)));
    };
    return {
        slice()    { noise(0.07,0.1); tone(800,0.04,'square',0.06); },
        addIng(i)  { tone(400+i*80, 0.05, 'triangle', 0.1); },
        wrongIng() { tone(150,0.2,'sawtooth',0.15); setTimeout(()=>tone(100,0.2,'sawtooth',0.1),80); },
        ovenIn()   { tone(300,0.06,'triangle',0.08); },
        ovenDing() { tone(880,0.15,'sine',0.12); setTimeout(()=>tone(1100,0.12,'sine',0.1),120); },
        ovenBurn() { noise(0.3,0.12); tone(200,0.3,'sawtooth',0.1); },
        drink()    { tone(600,0.06,'triangle',0.08); tone(800,0.04,'triangle',0.06); },
        cayPour()  { noise(0.15,0.04); tone(1200,0.1,'sine',0.04); setTimeout(()=>tone(1400,0.08,'sine',0.03),100); },
        salgam()   { tone(300,0.05,'triangle',0.07); setTimeout(()=>tone(350,0.05,'triangle',0.06),60); },
        serve()    { tone(523,0.07,'square',0.1); setTimeout(()=>tone(659,0.07,'square',0.1),70);
                     setTimeout(()=>tone(784,0.12,'square',0.13),140); },
        perfect()  { turkMelody([523,622,784,1047], 0.08, 0.1); },
        custEnter(){ tone(440,0.04,'triangle',0.06); setTimeout(()=>tone(554,0.05,'triangle',0.06),50);
                     setTimeout(()=>tone(659,0.04,'triangle',0.05),100); },
        custLeave(){ tone(293,0.1,'sawtooth',0.08); setTimeout(()=>tone(220,0.15,'sawtooth',0.1),100);
                     setTimeout(()=>tone(165,0.2,'sawtooth',0.08),200); },
        custSwitch(){ tone(660,0.03,'triangle',0.07); setTimeout(()=>tone(880,0.03,'triangle',0.06),40); },
        speech()   { tone(500+Math.random()*300, 0.03, 'triangle', 0.04); },
        lifeLost() { tone(300,0.12,'sawtooth',0.12); setTimeout(()=>tone(200,0.12,'sawtooth',0.1),120);
                     setTimeout(()=>tone(120,0.25,'sawtooth',0.15),240); },
        gameOver() { turkMelody([440,415,370,330,293,220], 0.2, 0.1); },
        levelUp()  { turkMelody([440,554,659,880,1047], 0.1, 0.1); },
        highScore(){ turkMelody([523,659,784,1047,784,1047,1318], 0.1, 0.1); },
        event()    { tone(600,0.08,'square',0.1); tone(900,0.08,'square',0.08); },
        timerWarn(){ tone(220,0.06,'square',0.06); },
        click()    { tone(800,0.02,'square',0.06); },
        // Ambient döner shop sounds
        ambientSizzle() { noise(0.5, 0.02); },
        doorBell()  {
            // Classic shop door Klingel: bright ding-dong
            tone(1318,0.12,'sine',0.15); // high ding
            setTimeout(()=>tone(1046,0.15,'sine',0.13),120); // lower dong
            setTimeout(()=>tone(1318,0.06,'sine',0.08),280); // faint echo ding
        },
        cashRegister() { tone(1000,0.03,'square',0.08); noise(0.04,0.05);
                        setTimeout(()=>{ tone(1200,0.03,'square',0.07); noise(0.03,0.04); },60); },
        resume()   { if(ctx&&ctx.state==='suspended') ctx.resume(); }
    };
})();

// ===== PARTICLES =====
const FX = (() => {
    const canvas = document.getElementById('fx-canvas');
    const c = canvas.getContext('2d');
    let parts = [], on = false;
    const resize = () => { const r = canvas.parentElement.getBoundingClientRect(); canvas.width=r.width; canvas.height=r.height; };
    const emit = (x,y,n,opts={}) => {
        const { colors=['#ffd700','#ff8c00','#ff2e4c'], spd=3, sz=4, life=35, grav=0.06, emoji=null, spread=Math.PI*2 } = opts;
        for(let i=0;i<n;i++){
            const a = -Math.PI/2 + (Math.random()-.5)*spread;
            const v = spd*(.5+Math.random()*.5);
            parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life,maxLife:life,
                size:sz*(.5+Math.random()*.5),color:colors[Math.floor(Math.random()*colors.length)],
                grav,emoji,rot:Math.random()*6.28,rs:(Math.random()-.5)*.2});
        }
    };
    const update = () => {
        c.clearRect(0,0,canvas.width,canvas.height);
        parts = parts.filter(p => {
            p.x+=p.vx; p.y+=p.vy; p.vy+=p.grav; p.life--; p.rot+=p.rs;
            const a = p.life/p.maxLife;
            if(p.emoji){ c.save(); c.globalAlpha=a; c.translate(p.x,p.y); c.rotate(p.rot);
                c.font=`${p.size}px serif`; c.textAlign='center'; c.textBaseline='middle';
                c.fillText(p.emoji,0,0); c.restore();
            } else { c.globalAlpha=a; c.fillStyle=p.color; c.beginPath(); c.arc(p.x,p.y,p.size*a,0,6.28); c.fill(); }
            return p.life>0;
        });
        c.globalAlpha=1;
    };
    const loop = () => { if(!on) return; update(); requestAnimationFrame(loop); };
    window.addEventListener('resize', resize);
    return {
        emit, resize,
        start() { resize(); on=true; loop(); },
        stop()  { on=false; c.clearRect(0,0,canvas.width,canvas.height); parts=[]; }
    };
})();

// ===== DOM =====
const $ = id => document.getElementById(id);
const DOM = {
    titleScreen: $('title-screen'), gameScreen: $('game-screen'),
    upgradeScreen: $('upgrade-screen'), gameoverScreen: $('gameover-screen'),
    titleHS: $('title-hs'), startBtn: $('start-btn'),
    hudScore: $('hud-score'), hudCombo: $('hud-combo'), hudLevel: $('hud-level'), hudLives: $('hud-lives'),
    eventBanner: $('event-banner'), custQueue: $('customer-queue'),
    ovenBreadVis: $('oven-bread-vis'), ovenBar: $('oven-bar'), ovenStatus: $('oven-status'),
    breadCount: $('bread-count'), ovenBox: $('oven-box'),
    orderChecklist: $('order-checklist'),
    ingBtns: document.querySelectorAll('.ing-btn'),
    spitMeat: $('spit-meat'), spitKnife: $('spit-knife'),
    meatBar: $('meat-bar'), meatVal: $('meat-val'),
    drinkNeeded: $('drink-needed'), drinkStatus: $('drink-status'),
    drinkBtns: document.querySelectorAll('.drink-btn'),
    serveStatus: $('serve-status'), serveBtn: $('serve-btn'),
    feedback: $('feedback'),
    upgradeSub: $('upgrade-sub'), upgradeOpts: $('upgrade-options'),
    goScore: $('go-score'), goOrders: $('go-orders'), goCombo: $('go-combo'),
    goLevel: $('go-level'), goNewHS: $('go-newhs'), goHS: $('go-hs'),
    restartBtn: $('restart-btn'), container: $('game-container')
};

// ===== GAME STATE =====
let S = {};

function freshState() {
    return {
        running: false, score: 0, lives: MAX_LIVES, level: 1,
        combo: 0, maxCombo: 0, ordersServed: 0, ordersThisLevel: 0,
        highScore: 0,
        // Oven
        ovenHasBread: false, ovenStart: 0,
        ovenSpeedMul: 1, breadPerBake: 1, maxBread: 3, breadStock: 0,
        ovenDinged: false, ovenBurned: false,
        // Meat
        meat: MEAT_START, meatMax: MEAT_MAX, sliceAmount: MEAT_PER_SLICE,
        lastSliceTime: 0, sliceCooldown: 180,
        // Customers
        customers: [], nextCustTime: 0, custIdCounter: 0,
        activeIdx: 0,  // <-- which customer is currently selected
        // Assembly (PER CUSTOMER — stored on customer obj)
        // Upgrades
        patienceMul: 1, comboKeep: false, autoDrink: false, tipBonus: 0,
        appliedUpgrades: [],
        // Events
        activeEvent: null, eventEnd: 0, nextEventTime: 0,
        // Speech bubbles
        speechQueue: [], speechTimeout: null,
        // Timing
        lastTS: 0, lastWarnBeep: 0, lastAmbient: 0,
        serving: false
    };
}

// ===== SCREENS =====
function showScreen(scr) {
    [DOM.titleScreen, DOM.gameScreen, DOM.upgradeScreen, DOM.gameoverScreen]
        .forEach(s => s.classList.remove('active'));
    scr.classList.add('active');
}

// ===== LOCAL STORAGE =====
function loadHS() { try { S.highScore = parseInt(localStorage.getItem(LS_KEY),10)||0; } catch(_){ S.highScore=0; } }
function saveHS() { try { localStorage.setItem(LS_KEY, S.highScore.toString()); } catch(_){} }
function loadName() { try { return localStorage.getItem(LS_NAME_KEY)||''; } catch(_){ return ''; } }
function saveName(n) { try { localStorage.setItem(LS_NAME_KEY, n); } catch(_){} }

// ===== GLOBAL LEADERBOARD (Firebase REST API) =====
let globalBoard = [];

async function fetchLeaderboard() {
    try {
        const r = await fetch(`${FIREBASE_DB}/leaderboard.json`);
        if (!r.ok) { globalBoard = []; renderLeaderboard(); return; }
        const data = await r.json();
        if (data) {
            globalBoard = Object.values(data).sort((a, b) => b.score - a.score);
        } else {
            globalBoard = [];
        }
    } catch(_){ globalBoard = []; }
    renderLeaderboard();
}

async function submitScore(name, score) {
    if (!name || score <= 0) return;
    try {
        const entry = {
            name: name.substring(0, MAX_NAME_LEN),
            score,
            date: new Date().toISOString().slice(0, 10)
        };
        await fetch(`${FIREBASE_DB}/leaderboard.json`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entry)
        });
        // Re-fetch to get updated board and trim old entries
        const r = await fetch(`${FIREBASE_DB}/leaderboard.json`);
        if (!r.ok) return;
        const data = await r.json();
        if (data) {
            const all = Object.entries(data).map(([k, v]) => ({ ...v, _key: k }));
            all.sort((a, b) => b.score - a.score);
            globalBoard = all.slice(0, MAX_LEADERBOARD);
            // Remove entries outside top list
            const toRemove = all.slice(MAX_LEADERBOARD);
            if (toRemove.length > 0) {
                const updates = {};
                toRemove.forEach(e => { updates[e._key] = null; });
                await fetch(`${FIREBASE_DB}/leaderboard.json`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updates)
                });
            }
        }
        renderLeaderboard();
    } catch(_){}
}

function renderLeaderboard() {
    const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    ['leaderboard-list', 'go-leaderboard-list'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        if (!globalBoard.length) { el.innerHTML = '<div class="lb-empty">Noch keine Eintr\u00e4ge!</div>'; return; }
        el.innerHTML = globalBoard.map((e, i) => {
            const medal = i === 0 ? '\ud83e\udd47' : i === 1 ? '\ud83e\udd48' : i === 2 ? '\ud83e\udd49' : `${i+1}.`;
            return `<div class="lb-row${i < 3 ? ' lb-top' : ''}"><span class="lb-rank">${medal}</span><span class="lb-name">${esc(e.name)}</span><span class="lb-score">${e.score}</span></div>`;
        }).join('');
    });
}

// ===== HELPERS =====
const rand = (a,b) => a + Math.floor(Math.random()*(b-a+1));
const pick = arr => arr[Math.floor(Math.random()*arr.length)];
const clamp = (v,lo,hi) => Math.max(lo, Math.min(hi, v));

// ===== CUSTOMER SYSTEM =====

function generateOrder() {
    const lvl = S.level;
    const minI = Math.min(2 + Math.floor((lvl-1)/3), 5);
    const maxI = Math.min(3 + Math.floor((lvl-1)/2), 6);
    const count = rand(minI, maxI);
    const pool = Math.min(3 + Math.ceil(lvl/2), 6);
    const indices = [];
    while (indices.length < count) {
        const idx = rand(0, pool - 1);
        if (!indices.includes(idx)) indices.push(idx);
    }
    // Drink — now with çay and şalgam at higher levels
    let drink = null;
    if (lvl >= 2 && Math.random() < 0.4 + lvl * 0.08) {
        const drinkPool = lvl >= 4 ? DRINKS : DRINKS.slice(0, 2);
        drink = pick(drinkPool).id;
    }
    return { ingredients: indices, drink };
}

function spawnCustomer() {
    if (S.customers.length >= MAX_CUSTOMERS) return;
    const order = generateOrder();
    const patience = CUSTOMER_PATIENCE_BASE * S.patienceMul * (1 - S.level * 0.04);
    const type = pick(CUST_TYPES);
    const cust = {
        id: S.custIdCounter++,
        sprite: pick(type.sprites),
        type,
        dialogue: pick(DIALOGUES_ENTER),
        order,
        patience: Math.max(patience, 8000),
        maxPatience: Math.max(patience, 8000),
        arrivalTime: performance.now(),
        mood: '😊',
        leaving: false,
        // Per-customer assembly state
        addedIngs: new Set(),
        addedDrink: null,
        wrongCount: 0,
        // Speech state
        lastSpeech: '',
        hasSpoken: false,
        waitDialogue: pick(DIALOGUES_WAIT),
        spokeWait: false,
    };
    S.customers.push(cust);
    Audio.doorBell();
    Audio.custEnter();

    // Show their entrance speech
    showSpeechBubble(cust, cust.dialogue);

    renderCustomers();
    if (S.customers.length === 1) { S.activeIdx = 0; initAssembly(); }
}

function removeCustomer(id) {
    const idx = S.customers.findIndex(c => c.id === id);
    S.customers = S.customers.filter(c => c.id !== id);
    // Fix activeIdx
    if (S.customers.length === 0) { S.activeIdx = 0; clearAssembly(); }
    else { S.activeIdx = clamp(S.activeIdx, 0, S.customers.length - 1); initAssembly(); }
    renderCustomers();
}

function getActive() { return S.customers[S.activeIdx] || null; }

function switchCustomer(dir) {
    if (S.customers.length <= 1) return;
    Audio.custSwitch();
    if (typeof dir === 'number') {
        // Direct index
        S.activeIdx = clamp(dir, 0, S.customers.length - 1);
    } else if (dir === 'next') {
        S.activeIdx = (S.activeIdx + 1) % S.customers.length;
    } else {
        S.activeIdx = (S.activeIdx - 1 + S.customers.length) % S.customers.length;
    }
    initAssembly();
    renderCustomers();
    // Show their dialogue again briefly
    const cust = getActive();
    if (cust) showSpeechBubble(cust, cust.dialogue);
}

// ===== SPEECH BUBBLE SYSTEM =====
let activeSpeechTimer = null;

function showSpeechBubble(cust, text) {
    if (!cust) return;
    cust.lastSpeech = text;
    cust.speechAnimated = false; // reset so blow-up plays once
    // Play speech blip sounds (like talking)
    const words = text.split(' ').length;
    for (let i = 0; i < Math.min(words, 6); i++) {
        setTimeout(() => Audio.speech(), i * 60);
    }
    renderCustomers();
    // Mark animated after first render so it won't replay
    cust.speechAnimated = true;
    // Auto-hide speech after a while
    if (activeSpeechTimer) clearTimeout(activeSpeechTimer);
    activeSpeechTimer = setTimeout(() => {
        if (cust && !cust.leaving) { cust.lastSpeech = ''; renderCustomers(); }
    }, 3500);
}

function updateCustomers(now) {
    S.customers.forEach((c, i) => {
        if (c.leaving) return;
        const elapsed = now - c.arrivalTime;
        c.patience = c.maxPatience - elapsed;
        const ratio = c.patience / c.maxPatience;
        // Mood progression
        if (ratio > 0.6) c.mood = '😊';
        else if (ratio > 0.3) { c.mood = '😐';
            // Trigger wait dialogue once
            if (!c.spokeWait && ratio < 0.5) {
                c.spokeWait = true;
                showSpeechBubble(c, c.waitDialogue);
            }
        }
        else if (ratio > 0.1) c.mood = '😤';
        else c.mood = '🤬';
        // Timed out
        if (c.patience <= 0 && !c.leaving) {
            c.leaving = true;
            c.mood = '🤬';
            showSpeechBubble(c, pick(DIALOGUES_ANGRY));
            Audio.custLeave();
            S.lives--;
            S.combo = 0;
            S.score += PTS_CUSTOMER_LEFT;
            if (S.score < 0) S.score = 0;
            showFB('😤 ZU LANGSAM!', 'miss');
            screenShake(); screenFlash('red');
            emitAt(DOM.container.clientWidth/2, DOM.container.clientHeight*0.15, 8,
                { emoji:'💢', speed:2, size:16, life:30, grav:0.1 });
            renderHUD();
            setTimeout(() => {
                removeCustomer(c.id);
                if (S.lives <= 0) gameOver();
            }, 800);
        }
    });
}

// ===== OVEN SYSTEM =====

function ovenPutIn() {
    if (S.ovenHasBread) return; // already has bread
    S.ovenHasBread = true;
    S.ovenStart = performance.now();
    S.ovenDinged = false;
    S.ovenBurned = false;
    Audio.ovenIn();
}

function ovenTakeOut() {
    if (!S.ovenHasBread) return;
    const elapsed = performance.now() - S.ovenStart;
    const bakeTime = OVEN_BAKE_BASE * S.ovenSpeedMul;
    const burnTime = bakeTime + OVEN_BURN_OFFSET;

    if (elapsed < bakeTime * 0.7) {
        // Too early — bread is raw
        showFB('🥖 NOCH ROH!', 'wrong');
        Audio.wrongIng();
        return;
    }
    if (elapsed >= burnTime) {
        // Already burned
        S.ovenHasBread = false;
        showFB('💀 VERBRANNT!', 'wrong');
        S.score += PTS_BURNED; if (S.score < 0) S.score = 0;
        Audio.ovenBurn();
        screenShake();
        renderHUD();
        return;
    }
    // Success — bread is ready!
    S.ovenHasBread = false;
    S.breadStock = Math.min(S.breadStock + S.breadPerBake, S.maxBread);
    Audio.ovenDing();
    const isPerfect = elapsed >= bakeTime && elapsed < bakeTime + OVEN_BURN_OFFSET * 0.4;
    if (isPerfect) {
        showFB('🍞 PERFEKT!', 'perfect');
        emitAt(DOM.container.clientWidth*0.25, DOM.container.clientHeight*0.5, 12,
            { colors:['#ffd700','#ff8c00','#ffe4b5'], speed:2, size:3, life:25 });
    } else {
        showFB('🍞 BROT FERTIG!', 'good');
    }
}

function updateOven(now) {
    if (!S.ovenHasBread) return;
    const elapsed = now - S.ovenStart;
    const bakeTime = OVEN_BAKE_BASE * S.ovenSpeedMul;
    const burnTime = bakeTime + OVEN_BURN_OFFSET;

    // Ding when ready (once)
    if (elapsed >= bakeTime && !S.ovenDinged) {
        S.ovenDinged = true;
        Audio.ovenDing();
    }
    // Auto-burn
    if (elapsed >= burnTime && !S.ovenBurned) {
        S.ovenBurned = true;
        S.ovenHasBread = false;
        S.score += PTS_BURNED; if (S.score < 0) S.score = 0;
        showFB('💀 BROT VERBRANNT!', 'wrong');
        Audio.ovenBurn();
        screenShake(); screenFlash('red');
        renderHUD();
    }
}

// ===== SLICER SYSTEM =====

function sliceMeat() {
    const now = performance.now();
    if (now - S.lastSliceTime < S.sliceCooldown) return;
    S.lastSliceTime = now;
    S.meat = Math.min(S.meat + S.sliceAmount, S.meatMax);
    Audio.slice();
    // Knife animation
    DOM.spitKnife.classList.remove('slicing');
    void DOM.spitKnife.offsetWidth;
    DOM.spitKnife.classList.add('slicing');
    // Particles
    const rect = DOM.spitMeat.getBoundingClientRect();
    const cr = DOM.container.getBoundingClientRect();
    emitAt(rect.left - cr.left + rect.width/2, rect.top - cr.top + rect.height/2, 5,
        { colors:['#b55a30','#d47a40','#8b3a1a'], speed:2, size:2, life:15, grav:0.15 });
}

// ===== ASSEMBLY SYSTEM =====

function initAssembly() {
    // Assembly now reads from the active customer's state
    DOM.drinkBtns.forEach(b => b.classList.remove('correct'));
    renderAssembly();
    renderDrinks();
    updateServeBtn();
}

function clearAssembly() {
    DOM.orderChecklist.innerHTML = '<span style="color:var(--dim);font-size:.6rem">Warte auf Kunden...</span>';
    DOM.drinkNeeded.textContent = '';
    DOM.drinkStatus.textContent = '';
    DOM.drinkBtns.forEach(b => b.classList.remove('correct'));
    updateServeBtn();
}

function addIngredient(idx) {
    const cust = getActive();
    if (!cust || S.serving) return;

    if (cust.addedIngs.has(idx)) {
        Audio.wrongIng();
        showFB('SCHON DRIN!', 'wrong');
        return;
    }

    if (cust.order.ingredients.includes(idx)) {
        cust.addedIngs.add(idx);
        Audio.addIng(idx);
        emitIngBtn(idx);
        renderAssembly();
        updateServeBtn();
    } else {
        cust.wrongCount++;
        S.score += PTS_WRONG_ING; if (S.score < 0) S.score = 0;
        Audio.wrongIng();
        showFB('FALSCH!', 'wrong');
        screenShake();
        DOM.ingBtns[idx].classList.add('wrong-flash');
        setTimeout(() => DOM.ingBtns[idx].classList.remove('wrong-flash'), 300);
        renderHUD();
    }
}

function addDrink(drinkId) {
    const cust = getActive();
    if (!cust || S.serving) return;
    if (!cust.order.drink) {
        showFB('KEIN GETRÄNK NÖTIG!', 'wrong');
        Audio.wrongIng();
        return;
    }
    if (cust.addedDrink) return;

    if (drinkId === cust.order.drink) {
        cust.addedDrink = drinkId;
        // Special SFX for çay and şalgam
        if (drinkId === 'cay') Audio.cayPour();
        else if (drinkId === 'salgam') Audio.salgam();
        else Audio.drink();
        DOM.drinkBtns.forEach(b => {
            if (b.dataset.action === drinkId) b.classList.add('correct');
        });
        DOM.drinkStatus.textContent = '✓';
        DOM.drinkStatus.style.color = 'var(--green)';
        updateServeBtn();
    } else {
        cust.wrongCount++;
        S.score += PTS_WRONG_ING; if (S.score < 0) S.score = 0;
        Audio.wrongIng();
        showFB('FALSCHES GETRÄNK!', 'wrong');
        DOM.drinkBtns.forEach(b => {
            if (b.dataset.action === drinkId) { b.classList.add('wrong-flash');
                setTimeout(() => b.classList.remove('wrong-flash'), 300); }
        });
        renderHUD();
    }
}

// ===== SERVE SYSTEM =====

function checkCanServe() {
    const cust = getActive();
    if (!cust) return { ok: false, reasons: ['Kein Kunde'] };
    const reasons = [];
    if (S.breadStock <= 0) reasons.push('BROT ✗');
    if (S.meat < MEAT_PER_ORDER) reasons.push('FLEISCH ✗');
    const allIngs = cust.order.ingredients.every(i => cust.addedIngs.has(i));
    if (!allIngs) reasons.push('ZUTATEN ✗');
    if (cust.order.drink && cust.addedDrink !== cust.order.drink && !S.autoDrink) reasons.push('GETRÄNK ✗');
    return { ok: reasons.length === 0, reasons };
}

function tryServe() {
    if (S.serving || !S.running) return;
    const cust = getActive();
    if (!cust) return;

    const check = checkCanServe();
    if (!check.ok) {
        Audio.wrongIng();
        showFB(check.reasons[0], 'wrong');
        screenShake();
        return;
    }

    S.serving = true;

    // Consume resources
    S.breadStock--;
    S.meat -= MEAT_PER_ORDER;

    // Calculate score
    const elapsed = performance.now() - cust.arrivalTime;
    const timeRatio = clamp(cust.patience / cust.maxPatience, 0, 1);
    const isPerfect = cust.wrongCount === 0;
    const isFast = timeRatio > 0.5;

    let pts = cust.order.ingredients.length * PTS_INGREDIENT;
    if (cust.order.drink) pts += PTS_DRINK;

    S.combo++;
    if (S.combo > S.maxCombo) S.maxCombo = S.combo;
    pts += S.combo * PTS_COMBO;
    if (isPerfect) pts += PTS_PERFECT;
    if (isFast) pts += Math.floor(timeRatio * PTS_SPEED_BONUS);
    pts += S.tipBonus;

    S.score += pts;
    S.ordersServed++;
    S.ordersThisLevel++;

    // Feedback
    if (isPerfect && isFast) {
        showFB(`🥙 PERFEKT! +${pts}`, 'perfect');
        Audio.perfect();
        emitServeBurst();
        screenFlash('gold');
    } else if (isPerfect) {
        showFB(`🥙 LECKER! +${pts}`, 'good');
        Audio.serve();
        emitServeBurst();
        screenFlash('green');
    } else {
        showFB(`+${pts}`, 'good');
        Audio.serve();
        screenFlash('green');
    }

    renderHUD(true);

    // Customer leaves happy
    cust.mood = '😍';
    cust.leaving = true;
    showSpeechBubble(cust, pick(DIALOGUES_HAPPY));
    Audio.cashRegister();
    renderCustomers();

    // Level up?
    const leveledUp = S.ordersThisLevel >= ORDERS_PER_LEVEL;

    setTimeout(() => {
        removeCustomer(cust.id);
        S.serving = false;

        if (leveledUp) {
            S.level++;
            S.ordersThisLevel = 0;
            Audio.levelUp();
            showUpgradeScreen();
        }
    }, 450);
}

// ===== EVENTS =====

const EVENTS = [
    { id:'phone', text:'📞 TELEFON! Lieferung!', cls:'event-danger', duration:0,
      trigger: () => { spawnCustomer(); /* delivery = extra customer */ } },
    { id:'rush', text:'🏃 RUSH HOUR!', cls:'event-rush', duration:0,
      trigger: () => { spawnCustomer(); spawnCustomer(); } },
    { id:'inspect', text:'🔍 GESUNDHEITSAMT!', cls:'event-inspect', duration:8000,
      trigger: () => { if (S.ovenBurned || (S.ovenHasBread && performance.now()-S.ovenStart > OVEN_BAKE_BASE*S.ovenSpeedMul+OVEN_BURN_OFFSET)) {
          S.score -= 50; if(S.score<0)S.score=0; showFB('-50 STRAFE!','wrong'); } } },
    { id:'meat-low', text:'🥩 FLEISCH KNAPP!', cls:'event-danger', duration:0,
      trigger: () => { S.meat = Math.max(5, Math.floor(S.meat * 0.4)); } },
    { id:'blackout', text:'⚡ STROMAUSFALL!', cls:'event-danger', duration:8000,
      trigger: () => { DOM.ovenBar.style.visibility = 'hidden'; },
      end: () => { DOM.ovenBar.style.visibility = 'visible'; } }
];

function triggerEvent() {
    const ev = pick(EVENTS);
    S.activeEvent = ev;
    S.eventEnd = performance.now() + (ev.duration || 3000);
    DOM.eventBanner.textContent = ev.text;
    DOM.eventBanner.className = ev.cls || '';
    Audio.event();
    ev.trigger();
    S.nextEventTime = performance.now() + rand(EVENT_INTERVAL_MIN, EVENT_INTERVAL_MAX);
}

function updateEvent(now) {
    if (S.activeEvent && now >= S.eventEnd) {
        if (S.activeEvent.end) S.activeEvent.end();
        S.activeEvent = null;
        DOM.eventBanner.className = 'hidden';
    }
}

// ===== UPGRADES =====

function showUpgradeScreen() {
    // Game keeps running during upgrades! No S.running = false;
    // Pick 3 random upgrades not already applied
    const available = UPGRADE_POOL.filter(u => !S.appliedUpgrades.includes(u.id));
    const picks = [];
    const pool = [...available];
    while (picks.length < 3 && pool.length > 0) {
        const idx = rand(0, pool.length - 1);
        picks.push(pool.splice(idx, 1)[0]);
    }
    if (picks.length === 0) { resumeAfterUpgrade(); return; }

    DOM.upgradeSub.textContent = `Level ${S.level} erreicht! Wähle ein Upgrade:`;
    DOM.upgradeOpts.innerHTML = '';
    picks.forEach(u => {
        const card = document.createElement('div');
        card.className = 'upg-card';
        card.innerHTML = `<div class="upg-icon">${u.icon}</div><div class="upg-name">${u.name}</div><div class="upg-desc">${u.desc}</div>`;
        card.addEventListener('click', () => {
            Audio.click();
            u.apply(S);
            S.appliedUpgrades.push(u.id);
            resumeAfterUpgrade();
        });
        DOM.upgradeOpts.appendChild(card);
    });
    showScreen(DOM.upgradeScreen);
}

function resumeAfterUpgrade() {
    showScreen(DOM.gameScreen);
    // Game was still running, just switch back to game screen
    showFB(`⭐ LEVEL ${S.level}!`, 'perfect');
    emitLevelFX();
}

// ===== SCORING & FEEDBACK =====

function showFB(text, type) {
    DOM.feedback.className = '';
    DOM.feedback.textContent = text;
    void DOM.feedback.offsetWidth;
    DOM.feedback.classList.add(`fb-${type}`);
}

function screenShake() {
    DOM.container.classList.remove('shake');
    void DOM.container.offsetWidth;
    DOM.container.classList.add('shake');
}

function screenFlash(color) {
    DOM.container.classList.remove('flash-red','flash-green','flash-gold');
    void DOM.container.offsetWidth;
    DOM.container.classList.add(`flash-${color}`);
}

// ===== PARTICLE HELPERS =====

function emitAt(x, y, n, opts) { FX.emit(x, y, n, opts); }

function emitIngBtn(idx) {
    const btn = DOM.ingBtns[idx];
    const r = btn.getBoundingClientRect(), cr = DOM.container.getBoundingClientRect();
    FX.emit(r.left-cr.left+r.width/2, r.top-cr.top, 6,
        { colors:[ING[idx].color,'#ffd700','#fff'], speed:2, size:3, life:20, grav:0.1 });
}

function emitServeBurst() {
    const cx = DOM.container.clientWidth/2, cy = DOM.container.clientHeight*0.35;
    FX.emit(cx, cy, 25, { colors:['#ffd700','#ff8c00','#ff2e4c','#4cdf6b','#ffe4b5'], speed:4, size:5, life:40, grav:0.07 });
    FX.emit(cx, cy, 8, { emoji:'⭐', speed:2.5, size:18, life:35, grav:0.04 });
}

function emitLevelFX() {
    const w = DOM.container.clientWidth, h = DOM.container.clientHeight;
    for(let i=0;i<3;i++) setTimeout(() => {
        FX.emit(w*(.2+Math.random()*.6), h*(.2+Math.random()*.3), 15,
            { colors:['#ffd700','#ff8c00','#4cdf6b','#6ec6ff'], speed:3, size:4, life:35, grav:0.05 });
    }, i*180);
}

// ===== RENDERING =====

function renderCustomers() {
    DOM.custQueue.innerHTML = '';
    S.customers.forEach((c, i) => {
        const div = document.createElement('div');
        const isActive = i === S.activeIdx;
        div.className = 'cust-card' + (isActive ? ' active' : '') + (c.leaving ? ' leaving' : '');
        const ratio = clamp(c.patience / c.maxPatience, 0, 1);
        const barCls = ratio > 0.5 ? '' : ratio > 0.2 ? ' warn' : ' crit';
        // Turkish flag for Turkish customers, German flag for Alman
        const flag = c.type.title === 'Alman' ? '🇩🇪' : c.type.title === 'Tourist' ? '🌍' : '🇹🇷';
        // Order progress indicator
        const ingsNeeded = c.order.ingredients.length;
        const ingsDone = c.order.ingredients.filter(x => c.addedIngs.has(x)).length;
        const drinkDone = !c.order.drink || c.addedDrink === c.order.drink || S.autoDrink;
        const progress = ingsNeeded > 0 ? `${ingsDone}/${ingsNeeded}` : '';
        // Switch hint
        const switchHint = !isActive ? `<span class="cust-switch-hint">TAB→</span>` : '<span class="cust-active-badge">▶</span>';
        div.innerHTML = `
            <div class="cust-top">
                <span class="cust-avatar">${c.sprite}</span>
                <span class="cust-type">${flag}${c.type.title}</span>
                <span class="cust-mood">${c.mood}</span>
                ${switchHint}
            </div>
            ${c.lastSpeech ? `<div class="cust-speech-bubble${!c.speechAnimated ? ' speech-enter' : ''}">"${c.lastSpeech}"</div>` : `<div class="cust-speech">"${c.dialogue.substring(0, 40)}…"</div>`}
            <div class="cust-order-progress">${progress}${c.order.drink ? (drinkDone ? ' 🥤✓' : ' 🥤✗') : ''}</div>
            <div class="cust-patience"><div class="patience-fill${barCls}" style="width:${ratio*100}%"></div></div>`;
        // Click to switch to this customer
        if (!c.leaving) {
            div.addEventListener('click', () => { if (S.running) switchCustomer(i); });
            div.style.cursor = 'pointer';
        }
        DOM.custQueue.appendChild(div);
    });
}

function renderOven() {
    if (!S.ovenHasBread) {
        DOM.ovenBreadVis.textContent = '';
        DOM.ovenBar.style.width = '0%';
        DOM.ovenBar.style.background = '#444';
        DOM.ovenStatus.textContent = S.breadStock > 0 ? '' : '← Q REIN';
        DOM.ovenStatus.style.color = 'var(--dim)';
    } else {
        const elapsed = performance.now() - S.ovenStart;
        const bakeTime = OVEN_BAKE_BASE * S.ovenSpeedMul;
        const burnTime = bakeTime + OVEN_BURN_OFFSET;
        const progress = clamp(elapsed / burnTime, 0, 1);
        DOM.ovenBar.style.width = `${progress * 100}%`;

        if (elapsed < bakeTime * 0.7) {
            // Baking — not ready yet
            DOM.ovenBreadVis.textContent = '🍞';
            DOM.ovenBreadVis.style.filter = 'brightness(0.5)';
            DOM.ovenBar.style.background = '#6ec6ff';
            DOM.ovenStatus.textContent = 'BACKT...';
            DOM.ovenStatus.style.color = 'var(--cyan)';
        } else if (elapsed < bakeTime) {
            // Almost ready
            DOM.ovenBreadVis.textContent = '🍞';
            DOM.ovenBreadVis.style.filter = 'brightness(0.8)';
            DOM.ovenBar.style.background = 'var(--green)';
            DOM.ovenStatus.textContent = 'FAST...';
            DOM.ovenStatus.style.color = 'var(--green)';
        } else if (elapsed < bakeTime + OVEN_BURN_OFFSET * 0.5) {
            // Perfect zone!
            DOM.ovenBreadVis.textContent = '🥖';
            DOM.ovenBreadVis.style.filter = 'brightness(1) drop-shadow(0 0 6px gold)';
            DOM.ovenBar.style.background = 'var(--gold)';
            DOM.ovenStatus.textContent = '✓ W RAUS!';
            DOM.ovenStatus.style.color = 'var(--gold)';
        } else if (elapsed < burnTime) {
            // Danger zone — about to burn
            DOM.ovenBreadVis.textContent = '🥖';
            DOM.ovenBreadVis.style.filter = 'brightness(1.2) sepia(0.5)';
            DOM.ovenBar.style.background = 'var(--orange)';
            DOM.ovenStatus.textContent = '⚠️ SCHNELL!';
            DOM.ovenStatus.style.color = 'var(--red)';
        } else {
            // Burned (shouldn't reach here, auto-burn handles it)
            DOM.ovenBreadVis.textContent = '💀';
            DOM.ovenBreadVis.style.filter = '';
            DOM.ovenBar.style.background = 'var(--red)';
            DOM.ovenStatus.textContent = 'VERBRANNT';
            DOM.ovenStatus.style.color = 'var(--red)';
        }
    }
    DOM.breadCount.textContent = S.breadStock;
}

function renderSlicer() {
    const ratio = S.meat / S.meatMax;
    DOM.meatBar.style.width = `${ratio * 100}%`;
    DOM.meatBar.style.background = ratio > 0.3 ? 'var(--slicer-accent)' : ratio > 0.15 ? 'var(--gold)' : 'var(--red)';
    DOM.meatVal.textContent = `${Math.floor(S.meat)}/${S.meatMax}`;
    // Visual: spit meat shrinks
    const h = 12 + ratio * 30;
    const w = 12 + ratio * 24;
    DOM.spitMeat.style.height = `${h}px`;
    DOM.spitMeat.style.width = `${w}px`;
    DOM.spitMeat.style.top = `${8 + (42 - h) / 2}px`;

    if (ratio < 0.15) {
        DOM.meatBar.style.animation = 'pBlink .3s infinite alternate';
    } else {
        DOM.meatBar.style.animation = '';
    }
}

function renderAssembly() {
    const cust = getActive();
    if (!cust) { clearAssembly(); return; }

    let html = '';
    const needed = cust.order.ingredients;
    const nextIdx = needed.find(i => !cust.addedIngs.has(i));

    needed.forEach(idx => {
        const done = cust.addedIngs.has(idx);
        const isNext = idx === nextIdx && !done;
        html += `<span class="oc-item needed${done ? ' done' : ''}${isNext ? ' next' : ''}">${ING[idx].emoji}</span>`;
    });

    // Drink in checklist
    if (cust.order.drink && !S.autoDrink) {
        const drinkObj = DRINKS.find(d => d.id === cust.order.drink);
        const drinkDone = cust.addedDrink === cust.order.drink;
        html += `<span class="oc-item oc-drink needed${drinkDone ? ' done' : ''}">${drinkObj.emoji}</span>`;
    }

    DOM.orderChecklist.innerHTML = html;

    DOM.ingBtns.forEach(b => b.classList.remove('hint'));
    if (nextIdx !== undefined) {
        DOM.ingBtns[nextIdx].classList.add('hint');
    }
}

function renderDrinks() {
    const cust = getActive();
    if (!cust || !cust.order.drink) {
        DOM.drinkNeeded.textContent = 'Kein Getränk';
        DOM.drinkNeeded.style.opacity = '0.3';
        DOM.drinkStatus.textContent = '';
        return;
    }
    if (S.autoDrink) {
        cust.addedDrink = cust.order.drink;
        DOM.drinkNeeded.textContent = '🤖 AUTO';
        DOM.drinkNeeded.style.opacity = '0.5';
        DOM.drinkStatus.textContent = '✓'; DOM.drinkStatus.style.color = 'var(--green)';
        return;
    }
    const drinkObj = DRINKS.find(d => d.id === cust.order.drink);
    DOM.drinkNeeded.innerHTML = `${drinkObj.emoji} ${drinkObj.name}`;
    DOM.drinkNeeded.style.opacity = '1';
    if (cust.addedDrink === cust.order.drink) {
        DOM.drinkStatus.textContent = '✓'; DOM.drinkStatus.style.color = 'var(--green)';
    } else {
        DOM.drinkStatus.textContent = ''; DOM.drinkStatus.style.color = '';
    }
    // Update button highlights for current customer
    DOM.drinkBtns.forEach(b => {
        b.classList.toggle('correct', cust.addedDrink && b.dataset.action === cust.addedDrink);
    });
}

function updateServeBtn() {
    const check = checkCanServe();
    if (check.ok) {
        DOM.serveBtn.classList.add('ready');
        DOM.serveBtn.classList.remove('not-ready');
    } else {
        DOM.serveBtn.classList.remove('ready');
        DOM.serveBtn.classList.add('not-ready');
    }
    // Status text
    const cust = getActive();
    if (!cust) { DOM.serveStatus.textContent = 'Warte auf Kunden...'; return; }
    const bread = S.breadStock > 0 ? '🍞✓' : '🍞✗';
    const meat = S.meat >= MEAT_PER_ORDER ? '🥩✓' : '🥩✗';
    const ings = cust.order.ingredients.every(i => cust.addedIngs.has(i)) ? '🥬✓' : '🥬✗';
    let drk = '';
    if (cust.order.drink && !S.autoDrink) {
        drk = cust.addedDrink === cust.order.drink ? ' 🥤✓' : ' 🥤✗';
    }
    DOM.serveStatus.textContent = `${bread} ${meat} ${ings}${drk}`;
}

function renderHUD(animate = false) {
    DOM.hudScore.textContent = S.score;
    DOM.hudLevel.textContent = S.level;
    // Lives as kebabs
    let lh = '';
    for (let i = 0; i < MAX_LIVES; i++) {
        lh += i < S.lives ? '🥙' : '<span style="opacity:.2">🥙</span>';
    }
    DOM.hudLives.innerHTML = lh;
    // Combo
    if (S.combo >= 5) {
        DOM.hudCombo.textContent = `🔥x${S.combo}`;
        DOM.hudCombo.className = 'hud-val combo-fire';
    } else if (S.combo > 1) {
        DOM.hudCombo.textContent = `x${S.combo}`;
        DOM.hudCombo.className = 'hud-val';
    } else {
        DOM.hudCombo.textContent = 'x1';
        DOM.hudCombo.className = 'hud-val';
    }
    if (animate) {
        DOM.hudScore.classList.remove('score-bump');
        void DOM.hudScore.offsetWidth;
        DOM.hudScore.classList.add('score-bump');
    }
}

// ===== GAME LOOP =====

function gameLoop(ts) {
    if (!S.running) return;
    const dt = ts - S.lastTS;
    S.lastTS = ts;

    // Update systems
    updateOven(ts);
    updateCustomers(ts);
    updateEvent(ts);

    // Customer spawning
    if (ts >= S.nextCustTime && S.customers.length < MAX_CUSTOMERS) {
        spawnCustomer();
        const spawnDelay = Math.max(3000, CUSTOMER_SPAWN_BASE - S.level * 300);
        S.nextCustTime = ts + spawnDelay + rand(0, 2000);
    }

    // Event spawning
    if (ts >= S.nextEventTime && S.level >= 2) {
        triggerEvent();
    }

    // Render fast-updating elements
    renderOven();
    renderSlicer();
    updateServeBtn();

    // Update customer patience bars (every 200ms for performance)
    if (ts - S.lastWarnBeep > 200) {
        renderCustomers();
        S.lastWarnBeep = ts;
        const active = getActive();
        if (active) {
            const ratio = active.patience / active.maxPatience;
            if (ratio < 0.2 && ratio > 0) Audio.timerWarn();
        }
    }

    // Ambient sizzle sound every ~4s
    if (ts - S.lastAmbient > 4000) {
        S.lastAmbient = ts;
        Audio.ambientSizzle();
    }

    requestAnimationFrame(gameLoop);
}

// ===== LIFECYCLE =====

function startGame() {
    Audio.resume();
    Audio.click();
    S = freshState();
    loadHS();
    renderHUD();
    showScreen(DOM.gameScreen);
    FX.start();

    S.running = true;
    S.lastTS = performance.now();
    S.nextCustTime = performance.now() + 800;
    S.nextEventTime = performance.now() + rand(EVENT_INTERVAL_MIN, EVENT_INTERVAL_MAX);

    // Start with bread in oven
    ovenPutIn();
    clearAssembly();

    requestAnimationFrame(gameLoop);
}

function gameOver() {
    S.running = false;
    FX.stop();
    Audio.gameOver();

    const isNew = S.score > S.highScore;
    if (isNew) { S.highScore = S.score; saveHS(); setTimeout(() => Audio.highScore(), 800); }

    DOM.goScore.textContent = S.score;
    DOM.goOrders.textContent = S.ordersServed;
    DOM.goCombo.textContent = S.maxCombo;
    DOM.goLevel.textContent = S.level;
    DOM.goHS.textContent = S.highScore;
    DOM.goNewHS.classList.toggle('hidden', !isNew);

    // Name input for leaderboard
    const nameInput = document.getElementById('go-name');
    const submitBtn = document.getElementById('go-submit');
    if (nameInput) {
        nameInput.value = loadName();
        nameInput.disabled = false;
        submitBtn.disabled = false;
        submitBtn.textContent = '📤 EINTRAGEN';
    }

    setTimeout(() => {
        showScreen(DOM.gameoverScreen);
        fetchLeaderboard();
    }, 600);
}

// ===== INPUT =====

document.addEventListener('keydown', e => {
    const key = e.key.toLowerCase();

    // Prevent scroll on game keys
    if (['1','2','3','4','5','6','q','w','e','a','s','d','f',' ','enter','tab','arrowleft','arrowright'].includes(key)) e.preventDefault();

    if (S.running) {
        // Oven
        if (key === 'q') { ovenPutIn(); pressBtn('[data-action="oven-in"]'); }
        if (key === 'w') { ovenTakeOut(); pressBtn('[data-action="oven-out"]'); }
        // Slicer
        if (key === 'e') { sliceMeat(); pressBtn('[data-action="slice"]'); }
        // Ingredients 1-6
        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= 6) { addIngredient(num - 1); pressBtn(`.ing-btn[data-ing="${num-1}"]`); }
        // Drinks (A=Ayran, S=Cola, D=Çay, F=Şalgam)
        if (key === 'a') { addDrink('ayran'); pressBtn('[data-action="ayran"]'); }
        if (key === 's') { addDrink('cola'); pressBtn('[data-action="cola"]'); }
        if (key === 'd') { addDrink('cay'); pressBtn('[data-action="cay"]'); }
        if (key === 'f') { addDrink('salgam'); pressBtn('[data-action="salgam"]'); }
        // Customer switching (Tab / Arrow keys)
        if (key === 'tab' || key === 'arrowright') switchCustomer('next');
        if (key === 'arrowleft') switchCustomer('prev');
        // Serve
        if (key === ' ' || key === 'enter') tryServe();
    }

    // Title / Game Over
    if (!S.running && (key === ' ' || key === 'enter')) {
        if (DOM.titleScreen.classList.contains('active') || DOM.gameoverScreen.classList.contains('active')) {
            startGame();
        }
    }
});

function pressBtn(sel) {
    const btn = document.querySelector(sel);
    if (btn) { btn.classList.add('pressed'); setTimeout(() => btn.classList.remove('pressed'), 100); }
}

// Touch/click handlers for all station buttons
document.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('pointerdown', e => {
        e.preventDefault();
        if (!S.running) return;
        const action = btn.dataset.action;
        if (action === 'oven-in') ovenPutIn();
        else if (action === 'oven-out') ovenTakeOut();
        else if (action === 'slice') sliceMeat();
        else if (action === 'ayran') addDrink('ayran');
        else if (action === 'cola') addDrink('cola');
        else if (action === 'cay') addDrink('cay');
        else if (action === 'salgam') addDrink('salgam');
        btn.classList.add('pressed');
        setTimeout(() => btn.classList.remove('pressed'), 100);
    });
});

DOM.ingBtns.forEach(btn => {
    btn.addEventListener('pointerdown', e => {
        e.preventDefault();
        if (!S.running) return;
        const idx = parseInt(btn.dataset.ing, 10);
        addIngredient(idx);
        btn.classList.add('pressed');
        setTimeout(() => btn.classList.remove('pressed'), 100);
    });
});

DOM.serveBtn.addEventListener('pointerdown', e => { e.preventDefault(); tryServe(); });
DOM.startBtn.addEventListener('click', startGame);
DOM.restartBtn.addEventListener('click', startGame);

// ===== SWIPE GESTURE (customer switching on mobile) =====
(() => {
    let sx = 0, sy = 0, swiping = false;
    const THRESHOLD = 40;
    const queue = DOM.custQueue;
    queue.addEventListener('touchstart', e => {
        if (e.touches.length !== 1) return;
        sx = e.touches[0].clientX; sy = e.touches[0].clientY; swiping = true;
    }, { passive: true });
    queue.addEventListener('touchmove', e => {
        if (!swiping || !S.running) return;
        const dx = e.touches[0].clientX - sx;
        const dy = e.touches[0].clientY - sy;
        if (Math.abs(dx) > THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.5) {
            swiping = false;
            switchCustomer(dx < 0 ? 'next' : 'prev');
        }
    }, { passive: true });
    queue.addEventListener('touchend', () => { swiping = false; }, { passive: true });
})();

// ===== PREVENT DOUBLE-TAP ZOOM =====
document.addEventListener('dblclick', e => e.preventDefault());

// ===== HANDLE RESIZE / ORIENTATION CHANGE =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { FX.resize(); }, 150);
});

// ===== LEADERBOARD SUBMIT HANDLER =====
document.addEventListener('click', e => {
    if (e.target.id === 'go-submit') {
        const nameInput = document.getElementById('go-name');
        const name = (nameInput.value || '').trim().substring(0, MAX_NAME_LEN);
        if (!name) { nameInput.focus(); return; }
        saveName(name);
        e.target.disabled = true;
        e.target.textContent = '✅ GESPEICHERT';
        nameInput.disabled = true;
        submitScore(name, S.score);
    }
});

// ===== INIT =====
function init() {
    S = freshState();
    loadHS();
    DOM.titleHS.textContent = S.highScore;
    showScreen(DOM.titleScreen);
    fetchLeaderboard();
}

init();
