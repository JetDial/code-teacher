/* ============================================================
   Code Teacher — engine
   Router, live code editors, quizzes, skill assessment,
   progress tracking, search, theme. No libraries, no build.
   ============================================================ */
(function () {
'use strict';

/* ---------------- State ---------------- */

var STORE_KEY = 'code-teacher-state';

function loadState() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
  catch (e) { return {}; }
}

var state = Object.assign({
  done: {},        // lessonId -> true
  quiz: {},        // lessonId -> best score (0..1)
  projects: {},    // projectId -> true
  practice: {},    // exerciseId -> true (all tests passed)
  review: {},      // "quizId|qIndex" -> {due, streak}
  assess: null,    // {web, js, python} correct counts
  theme: null,     // 'light' | 'dark' | null (follow system)
  last: null,      // {track, idx, title}
  play: null,      // playground code {html, css, js, py, sql}
  meta: null,      // {lastDay, streak}
  seenBadges: []   // badge ids already celebrated
}, loadState());

function persist() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
  try { checkNewBadges(); } catch (e) {}
}

/* ---------------- Data access ---------------- */

var TRACK_ORDER = ['html', 'css', 'js', 'ts', 'python', 'plain', 'sql', 'website', 'testing', 'dsa', 'ai'];
var TRACKS = window.CT_TRACKS || {};
var PROJECTS = window.CT_PROJECTS || [];
var REFERENCE = window.CT_REFERENCE || [];
var ATLAS = window.CT_ATLAS || [];
var BLUEPRINTS = window.CT_BLUEPRINTS || [];
var TOOLBOX = window.CT_TOOLBOX || [];
var ENC = window.CT_ENCYCLOPEDIA || [];
var PRACTICE = window.CT_PRACTICE || [];

/* ---------------- Streaks & badges ---------------- */

function exploredGuides() {
  var n = 0;
  ATLAS.forEach(function (a) { if (state.done['atlas-' + a.id]) n++; });
  TOOLBOX.forEach(function (t) { if (state.done['tool-' + t.id]) n++; });
  BLUEPRINTS.forEach(function (b) { if (state.done['bp-' + b.id]) n++; });
  return n;
}
function solvedExercises() {
  return Object.keys(state.practice).filter(function (k) { return state.practice[k]; }).length;
}
function completedTracks() {
  return allTracks().filter(function (t) {
    var p = trackProgress(t);
    return p.total > 0 && p.done === p.total;
  }).length;
}
function doneProjects() {
  return Object.keys(state.projects).filter(function (k) { return state.projects[k]; }).length;
}
function perfectQuizzes() {
  return Object.keys(state.quiz).filter(function (k) { return state.quiz[k] === 1; }).length;
}

var BADGES = [
  ['first-steps', '🐣', 'First steps', 'Complete your first lesson', function () { return doneLessons() >= 1; }],
  ['ten-lessons', '📚', 'Bookworm', 'Complete 10 lessons', function () { return doneLessons() >= 10; }],
  ['quarter', '🎓', 'Scholar', 'Complete 25 lessons', function () { return doneLessons() >= 25; }],
  ['fifty', '🏛️', 'Half-century', 'Complete 50 lessons', function () { return doneLessons() >= 50; }],
  ['track-one', '🏁', 'Finisher', 'Complete an entire track', function () { return completedTracks() >= 1; }],
  ['track-three', '🥇', 'Triple crown', 'Complete three tracks', function () { return completedTracks() >= 3; }],
  ['all-tracks', '👑', 'Completionist', 'Complete every track', function () { return completedTracks() >= allTracks().length; }],
  ['builder', '🔨', 'Builder', 'Finish your first project', function () { return doneProjects() >= 1; }],
  ['shipwright', '🚢', 'Shipwright', 'Finish 5 projects', function () { return doneProjects() >= 5; }],
  ['tested', '🧪', 'Green light', 'Solve your first Practice exercise', function () { return solvedExercises() >= 1; }],
  ['drilled', '💪', 'Drilled', 'Solve 10 Practice exercises', function () { return solvedExercises() >= 10; }],
  ['practice-all', '🏆', 'Perfect form', 'Solve every Practice exercise', function () { return PRACTICE.length > 0 && solvedExercises() >= PRACTICE.length; }],
  ['explorer', '🧭', 'Explorer', 'Explore 5 Atlas / Toolbox / Blueprint pages', function () { return exploredGuides() >= 5; }],
  ['architect', '🏗️', 'Architect', 'Explore every App Blueprint', function () { return BLUEPRINTS.length > 0 && BLUEPRINTS.every(function (b) { return state.done['bp-' + b.id]; }); }],
  ['sharpshooter', '🎯', 'Sharpshooter', 'Score 100% on 10 quizzes', function () { return perfectQuizzes() >= 10; }],
  ['streak-3', '🔥', 'On a roll', 'Learn 3 days in a row', function () { return state.meta && state.meta.streak >= 3; }],
  ['streak-7', '⚡', 'Unstoppable', 'Learn 7 days in a row', function () { return state.meta && state.meta.streak >= 7; }]
];

function checkNewBadges() {
  var seen = state.seenBadges || [];
  var fresh = [];
  BADGES.forEach(function (b) {
    if (seen.indexOf(b[0]) === -1 && b[4]()) fresh.push(b);
  });
  if (fresh.length) {
    state.seenBadges = seen.concat(fresh.map(function (b) { return b[0]; }));
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
    toast('🏅 Badge earned: ' + fresh[0][1] + ' ' + fresh[0][2] + '!');
  }
}

function trackStreak() {
  var today = new Date().toDateString();
  var m = state.meta || { lastDay: null, streak: 0 };
  if (m.lastDay !== today) {
    var yesterday = new Date(Date.now() - 86400000).toDateString();
    m.streak = m.lastDay === yesterday ? (m.streak || 0) + 1 : 1;
    m.lastDay = today;
    state.meta = m;
    persist();
  }
}

var LEVEL_NAMES = ['Beginner', 'Intermediate', 'Advanced'];

function allTracks() {
  return TRACK_ORDER.map(function (id) { return TRACKS[id]; }).filter(Boolean);
}
function totalLessons() {
  return allTracks().reduce(function (n, t) { return n + t.lessons.length; }, 0);
}
function doneLessons() {
  return allTracks().reduce(function (n, t) { return n + trackProgress(t).done; }, 0);
}
function trackProgress(track) {
  var done = track.lessons.filter(function (l) { return state.done[l.id]; }).length;
  return { done: done, total: track.lessons.length };
}

/* ---------------- Helpers ---------------- */

function $(sel, root) { return (root || document).querySelector(sel); }
function $all(sel, root) { return [].slice.call((root || document).querySelectorAll(sel)); }

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

var toastTimer = null;
function toast(msg) {
  var el = $('#toast');
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { el.hidden = true; }, 2600);
}

/* ---------------- Theme ---------------- */

function applyTheme() {
  var t = state.theme;
  if (!t) t = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', t);
  var btn = $('#theme-toggle');
  if (btn) btn.textContent = t === 'dark' ? '☀️' : '🌙';
}

/* ---------------- Syntax highlighting ---------------- */

var HL = {
  js: [
    { re: /^\/\/.*/, cls: 'com' },
    { re: /^\/\*[\s\S]*?\*\//, cls: 'com' },
    { re: /^`(?:\\.|[^`\\])*`/, cls: 'str' },
    { re: /^"(?:\\.|[^"\\])*"/, cls: 'str' },
    { re: /^'(?:\\.|[^'\\])*'/, cls: 'str' },
    { re: /^\b(?:const|let|var|function|return|if|else|for|while|of|in|new|class|extends|try|catch|finally|throw|typeof|async|await|switch|case|break|continue|default|do|this|import|export|from)\b/, cls: 'kw' },
    { re: /^\b(?:true|false|null|undefined|NaN|Infinity)\b/, cls: 'lit' },
    { re: /^\b\d[\d_]*(?:\.\d+)?\b/, cls: 'num' },
    { re: /^[A-Za-z_$][\w$]*(?=\s*\()/, cls: 'fn' },
    { re: /^[A-Za-z_$][\w$]*/, cls: null },
    { re: /^\s+/, cls: null }
  ],
  python: [
    { re: /^#.*/, cls: 'com' },
    { re: /^(?:f?"""[\s\S]*?"""|f?'''[\s\S]*?''')/, cls: 'str' },
    { re: /^f?"(?:\\.|[^"\\])*"/, cls: 'str' },
    { re: /^f?'(?:\\.|[^'\\])*'/, cls: 'str' },
    { re: /^\b(?:def|class|if|elif|else|for|while|in|not|and|or|return|import|from|as|with|try|except|finally|raise|pass|break|continue|lambda|is|del|yield|global)\b/, cls: 'kw' },
    { re: /^\b(?:None|True|False)\b/, cls: 'lit' },
    { re: /^\b\d[\d_]*(?:\.\d+)?\b/, cls: 'num' },
    { re: /^[A-Za-z_]\w*(?=\s*\()/, cls: 'fn' },
    { re: /^[A-Za-z_]\w*/, cls: null },
    { re: /^\s+/, cls: null }
  ],
  css: [
    { re: /^\/\*[\s\S]*?\*\//, cls: 'com' },
    { re: /^"[^"]*"|^'[^']*'/, cls: 'str' },
    { re: /^@[\w-]+/, cls: 'kw' },
    { re: /^#[0-9a-fA-F]{3,8}\b/, cls: 'num' },
    { re: /^\d+(?:\.\d+)?(?:px|rem|em|%|vh|vw|s|ms|fr|deg|ch)?/, cls: 'num' },
    { re: /^[-a-zA-Z]+(?=\s*:)/, cls: 'attr' },
    { re: /^[.#:][-\w:()]+/, cls: 'fn' },
    { re: /^[a-zA-Z][-\w]*/, cls: 'tag' },
    { re: /^\s+/, cls: null }
  ],
  sql: [
    { re: /^--.*/, cls: 'com' },
    { re: /^'(?:''|[^'])*'/, cls: 'str' },
    { re: /^\b(?:SELECT|FROM|WHERE|AND|OR|NOT|ORDER|GROUP|BY|HAVING|LIMIT|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|INDEX|DROP|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AS|DISTINCT|BETWEEN|IN|LIKE|IS|NULL|PRIMARY|KEY|NOT|DEFAULT|UNIQUE|INTEGER|TEXT|REAL|ASC|DESC|COUNT|SUM|AVG|MIN|MAX)\b/i, cls: 'kw' },
    { re: /^\b\d[\d]*(?:\.\d+)?\b/, cls: 'num' },
    { re: /^[A-Za-z_]\w*(?=\s*\()/, cls: 'fn' },
    { re: /^[A-Za-z_]\w*/, cls: null },
    { re: /^\s+/, cls: null }
  ],
  clike: [
    { re: /^\/\/.*/, cls: 'com' },
    { re: /^#!.*/, cls: 'com' },
    { re: /^\/\*[\s\S]*?\*\//, cls: 'com' },
    { re: /^"(?:\\.|[^"\\])*"/, cls: 'str' },
    { re: /^'(?:\\.|[^'\\])*'/, cls: 'str' },
    { re: /^`(?:\\.|[^`\\])*`/, cls: 'str' },
    { re: /^#(?:include|define|pragma)\b/, cls: 'kw' },
    { re: /^\b(?:int|float|double|char|void|bool|var|val|let|const|func|fn|fun|def|end|class|struct|enum|interface|trait|impl|data|object|public|private|protected|static|final|override|new|delete|return|if|else|elif|elsif|for|foreach|while|do|switch|case|match|when|break|continue|default|import|package|using|namespace|module|require|from|as|in|of|is|typeof|instanceof|try|catch|except|finally|throw|throws|raise|defer|go|chan|select|async|await|yield|mut|ref|this|self|super|nil|null|None|true|false|True|False|puts|print|println|printf|echo|local|then|guard|extension|typealias|lateinit|companion|init|constructor|sealed|open|internal|where|type|map|range|make|string|String|extends|implements|abstract|virtual|out|inout)\b/, cls: 'kw' },
    { re: /^\b\d[\d_]*(?:\.\d+)?[fLu]?\b/, cls: 'num' },
    { re: /^@\w+/, cls: 'attr' },
    { re: /^\$\w+/, cls: 'attr' },
    { re: /^[A-Za-z_]\w*[!?]?(?=\s*\()/, cls: 'fn' },
    { re: /^[A-Za-z_]\w*[!?]?/, cls: null },
    { re: /^\s+/, cls: null }
  ]
};

/* languages without their own rule set borrow the closest one */
var HL_ALIAS = {
  ts: 'clike', java: 'clike', c: 'clike', cpp: 'clike', csharp: 'clike',
  go: 'clike', rust: 'clike', swift: 'clike', kotlin: 'clike', php: 'clike',
  bash: 'clike', lua: 'clike', ruby: 'clike', r: 'clike',
  dart: 'clike', zig: 'clike', julia: 'python', haskell: 'haskell', asm: 'asm'
};

HL.haskell = [
  { re: /^--.*/, cls: 'com' },
  { re: /^"(?:\\.|[^"\\])*"/, cls: 'str' },
  { re: /^\b(?:module|import|where|let|in|do|if|then|else|case|of|data|type|class|instance|newtype|deriving|main)\b/, cls: 'kw' },
  { re: /^\b\d[\d_]*(?:\.\d+)?\b/, cls: 'num' },
  { re: /^[a-z_][\w']*(?=\s)/, cls: null },
  { re: /^[A-Z]\w*/, cls: 'fn' },
  { re: /^\s+/, cls: null }
];

HL.asm = [
  { re: /^;.*/, cls: 'com' },
  { re: /^\.[\w.]+/, cls: 'kw' },
  { re: /^[A-Za-z_.][\w.]*:/, cls: 'fn' },
  { re: /^"[^"]*"|^'[^']*'/, cls: 'str' },
  { re: /^#?\$?\b\d[\dxXa-fA-F]*\b/, cls: 'num' },
  { re: /^#\w+/, cls: 'num' },
  { re: /^\b(?:mov|add|sub|mul|div|cmp|jmp|jge|jle|je|jne|jg|jl|inc|dec|xor|and|or|not|push|pop|call|ret|lea|nop|LDA|STA|ADC|SBC|CLC|SEC|RTS|JSR|LDX|LDY|STX|STY)\b/, cls: 'kw' },
  { re: /^\b(?:rax|rbx|rcx|rdx|rsi|rdi|rbp|rsp|r\d+|eax|ebx|ecx|edx)\b/, cls: 'attr' },
  { re: /^[A-Za-z_.][\w.]*/, cls: null },
  { re: /^\s+/, cls: null }
];

function highlightTag(tagText) {
  var m = tagText.match(/^<\/?[a-zA-Z][\w-]*/);
  if (!m) return esc(tagText);
  var out = '<span class="tok-tag">' + esc(m[0]) + '</span>';
  var rest = tagText.slice(m[0].length);
  var rules = [
    { re: /^"[^"]*"|^'[^']*'/, cls: 'str' },
    { re: /^[a-zA-Z-]+/, cls: 'attr' },
    { re: /^\/?>/, cls: 'tag' },
    { re: /^\s+/, cls: null },
    { re: /^=/, cls: 'op' }
  ];
  out += scan(rest, rules);
  return out;
}

function scan(code, rules) {
  var out = '', pos = 0;
  while (pos < code.length) {
    var slice = code.slice(pos), hit = false;
    for (var i = 0; i < rules.length; i++) {
      var m = rules[i].re.exec(slice);
      if (m && m.index === 0 && m[0].length) {
        out += rules[i].fn ? rules[i].fn(m[0])
          : rules[i].cls ? '<span class="tok-' + rules[i].cls + '">' + esc(m[0]) + '</span>'
          : esc(m[0]);
        pos += m[0].length;
        hit = true;
        break;
      }
    }
    if (!hit) { out += esc(code[pos]); pos++; }
  }
  return out;
}

function highlight(code, lang) {
  if (lang === 'html') {
    return scan(code, [
      { re: /^<!--[\s\S]*?-->/, cls: 'com' },
      { re: /^<!doctype[^>]*>/i, cls: 'kw' },
      { re: /^<\/?[a-zA-Z][^>]*>/, fn: highlightTag },
      { re: /^[^<]+/, cls: null }
    ]);
  }
  var rules = HL[lang] || HL[HL_ALIAS[lang]];
  return rules ? scan(code, rules) : esc(code);
}

var LANG_LABELS = {
  js: 'JavaScript', html: 'HTML', css: 'CSS', python: 'Python', text: 'Output',
  bash: 'Bash', sql: 'SQL', ts: 'TypeScript', java: 'Java', c: 'C', cpp: 'C++',
  csharp: 'C#', go: 'Go', rust: 'Rust', ruby: 'Ruby', php: 'PHP', swift: 'Swift',
  kotlin: 'Kotlin', lua: 'Lua', r: 'R', dart: 'Dart', haskell: 'Haskell',
  asm: 'Assembly', julia: 'Julia', zig: 'Zig'
};

function codeBlock(lang, code) {
  var label = LANG_LABELS[lang] || lang;
  return '<div class="codeblock"><div class="code-head"><span>' + esc(label) +
    '</span><button class="copy-btn" type="button">Copy</button></div>' +
    '<pre><code>' + highlight(code, lang) + '</code></pre></div>';
}

/* ---------------- Lesson content blocks ---------------- */

function renderBlocks(blocks) {
  return blocks.map(function (b) {
    switch (b.t) {
      case 'p': return '<p>' + b.html + '</p>';
      case 'h': return '<h2>' + esc(b.text) + '</h2>';
      case 'h3': return '<h3>' + esc(b.text) + '</h3>';
      case 'ul': return '<ul>' + b.items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>';
      case 'ol': return '<ol>' + b.items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ol>';
      case 'code': return codeBlock(b.lang, b.code);
      case 'tip': return '<div class="tip-box"><p>' + b.html + '</p></div>';
      case 'warn': return '<div class="warn-box"><p>' + b.html + '</p></div>';
      case 'table':
        return '<div style="overflow-x:auto"><table class="lesson-table"><thead><tr>' +
          b.head.map(function (h) { return '<th>' + h + '</th>'; }).join('') +
          '</tr></thead><tbody>' +
          b.rows.map(function (r) {
            return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
          }).join('') + '</tbody></table></div>';
      default: return '';
    }
  }).join('');
}

/* ---------------- Live editors ---------------- */

var EDITORS = {};
var edCounter = 0;
var MOUNTQ = [];
function onMount(fn) { MOUNTQ.push(fn); }

var CAPTURE_SRC = '(function(){function fmt(a){return [].map.call(a,function(x){if(typeof x==="object"&&x!==null){try{return JSON.stringify(x)}catch(e){return String(x)}}return String(x)}).join(" ")}["log","warn","error","info"].forEach(function(k){var o=console[k];console[k]=function(){parent.postMessage({ctConsole:1,ed:"__ID__",kind:k,text:fmt(arguments)},"*");o.apply(console,arguments)}});window.onerror=function(m,s,l){parent.postMessage({ctConsole:1,ed:"__ID__",kind:"error",text:"Error: "+m+" (line "+l+")"},"*")}})();';

function sanitizeForSrcdoc(js) {
  return String(js || '').replace(/<\/script/gi, '<\\/script');
}

/**
 * cfg: { mode:'web'|'js'|'python', title, html, css, js, code, expected, note, height }
 */
function editorView(cfg) {
  var id = 'ed' + (++edCounter);
  EDITORS[id] = { cfg: cfg, initial: JSON.parse(JSON.stringify(cfg)) };
  var h = cfg.height || 260;
  var out = '<div class="editor" id="' + id + '" data-mode="' + cfg.mode + '">';
  out += '<div class="editor-head"><span class="ed-title">' + esc(cfg.title || 'Try it yourself') + '</span>';

  if (cfg.mode === 'web') {
    var tabs = ['html', 'css', 'js'].filter(function (k) { return cfg[k] !== undefined; });
    EDITORS[id].tabs = tabs;
    tabs.forEach(function (k, i) {
      out += '<button type="button" class="ed-tab' + (i === 0 ? ' active' : '') + '" data-tab="' + k + '">' +
        { html: 'HTML', css: 'CSS', js: 'JS' }[k] + '</button>';
    });
  }
  out += '<button type="button" class="dl-btn" title="Download this code as a file">⬇</button>';
  out += '<button type="button" class="reset-btn">Reset</button>';
  if (cfg.tests || cfg.expect) out += '<button type="button" class="tests-btn">🧪 Run tests</button>';
  out += '<button type="button" class="run-btn">▶ Run</button></div>';

  out += '<div class="editor-panes' + (cfg.mode === 'python' ? ' ' : '') + '">';

  if (cfg.mode === 'web') {
    EDITORS[id].tabs.forEach(function (k, i) {
      out += '<div class="ed-src' + (i === 0 ? ' active' : '') + '" data-src="' + k + '">' +
        '<div class="gutter">1</div>' +
        '<textarea spellcheck="false" style="min-height:' + h + 'px" aria-label="' + k + ' code">' +
        esc(cfg[k] || '') + '</textarea></div>';
    });
    out += '<div class="ed-result"><iframe title="Result" sandbox="allow-scripts"></iframe>' +
      '<div class="ed-console"></div></div>';
  } else if (cfg.mode === 'js' || cfg.mode === 'ts') {
    out += '<div class="ed-src active" data-src="code">' +
      '<div class="gutter">1</div>' +
      '<textarea spellcheck="false" style="min-height:' + h + 'px" aria-label="' + (cfg.mode === 'ts' ? 'TypeScript' : 'JavaScript') + ' code">' +
      esc(cfg.code || '') + '</textarea></div>';
    out += '<div class="ed-result"><div class="ed-console-label">Console output</div>' +
      '<div class="ed-output"></div><iframe title="Runner" sandbox="allow-scripts" style="display:none"></iframe></div>';
  } else { // python / sql / plain
    out += '<div class="ed-src active" data-src="code">' +
      '<div class="gutter">1</div>' +
      '<textarea spellcheck="false" style="min-height:' + h + 'px" aria-label="Python code">' +
      esc(cfg.code || '') + '</textarea></div>';
    out += '<div class="ed-result"><div class="ed-console-label">Output</div><div class="ed-output"></div></div>';
  }
  out += '</div>';

  if (cfg.mode === 'plain') {
    out += '<div class="ed-note">Plain runs right here in your browser with nothing to fetch — ' +
      'the whole language is a few files of plain JavaScript with no dependencies at all. ' +
      'The same program runs unchanged from a terminal with <code>plain run</code>.</div>';
  }
  if (cfg.mode === 'python') {
    out += '<div class="ed-note">Python runs right here in your browser (via Pyodide). The first Run needs internet to fetch the runtime — after that it\'s instant.</div>';
  }
  if (cfg.mode === 'sql') {
    out += '<div class="ed-note">SQL runs right here in your browser (via sql.js — real SQLite). The first Run needs internet to fetch the engine — after that it\'s instant.' +
      (cfg.tables ? '<br>' + cfg.tables : '') + '</div>';
  }
  if (cfg.mode === 'ts') {
    out += '<div class="ed-note">Run compiles with the <b>real TypeScript compiler</b> (fetched on first Run, ~8 MB), then executes the resulting JavaScript. Grammar problems are reported; for the full red-squiggle type-checking experience, mirror examples at typescriptlang.org/play.</div>';
  }
  if (cfg.note) out += '<div class="ed-note">' + cfg.note + '</div>';
  out += '</div>';

  onMount(function () { mountEditor(id); });
  return out;
}

function mountEditor(id) {
  var root = document.getElementById(id);
  if (!root) return;
  var ed = EDITORS[id];
  ed.root = root;
  ed.consoleEl = $('.ed-console', root) || $('.ed-output', root);
  ed.iframe = $('iframe', root);

  $all('.ed-tab', root).forEach(function (btn) {
    btn.addEventListener('click', function () {
      $all('.ed-tab', root).forEach(function (b) { b.classList.remove('active'); });
      $all('.ed-src', root).forEach(function (s) { s.classList.remove('active'); });
      btn.classList.add('active');
      $('.ed-src[data-src="' + btn.dataset.tab + '"]', root).classList.add('active');
    });
  });

  $('.run-btn', root).addEventListener('click', function () { runEditor(id); });
  $('.reset-btn', root).addEventListener('click', function () {
    var init = ed.initial;
    $all('.ed-src textarea', root).forEach(function (ta) {
      var key = ta.closest('.ed-src').dataset.src;
      ta.value = (key === 'code' ? init.code : init[key]) || '';
    });
    ed.consoleEl.innerHTML = '';
    if (ed.iframe) ed.iframe.removeAttribute('srcdoc');
  });

  $all('textarea', root).forEach(function (ta) {
    ta.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); runEditor(id); }
      if (e.key === 'Tab') {
        e.preventDefault();
        var s = ta.selectionStart;
        ta.value = ta.value.slice(0, s) + '  ' + ta.value.slice(ta.selectionEnd);
        ta.selectionStart = ta.selectionEnd = s + 2;
        ta.dispatchEvent(new Event('input'));
      }
      if (e.key === 'Enter' && !e.ctrlKey && !e.metaKey) {
        // auto-indent: keep the current line's indentation (+2 after an opener)
        e.preventDefault();
        var pos = ta.selectionStart;
        var before = ta.value.slice(0, pos);
        var line = before.slice(before.lastIndexOf('\n') + 1);
        var indent = (line.match(/^\s*/) || [''])[0];
        if (/[{(\[:]\s*$/.test(line)) indent += '  ';
        var insert = '\n' + indent;
        ta.value = before + insert + ta.value.slice(ta.selectionEnd);
        ta.selectionStart = ta.selectionEnd = pos + insert.length;
        ta.dispatchEvent(new Event('input'));
      }
    });
  });

  // line-number gutters, synced to their textareas
  $all('.ed-src', root).forEach(function (src) {
    var ta = $('textarea', src), gut = $('.gutter', src);
    if (!ta || !gut) return;
    function update() {
      var n = ta.value.split('\n').length;
      var s = '';
      for (var i = 1; i <= n; i++) s += i + '\n';
      gut.textContent = s;
      gut.scrollTop = ta.scrollTop;
    }
    ta.addEventListener('input', update);
    ta.addEventListener('scroll', function () { gut.scrollTop = ta.scrollTop; });
    update();
  });

  $('.dl-btn', root).addEventListener('click', function () { downloadEditor(id); });
  var testsBtn = $('.tests-btn', root);
  if (testsBtn) testsBtn.addEventListener('click', function () { runTests(id); });

  // auto-run web editors so learners see the result immediately
  if (ed.cfg.mode === 'web') runEditor(id);
}

/* ---------------- Download your work ---------------- */

function downloadFile(name, content, type) {
  var blob = new Blob([content], { type: type || 'text/plain' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(function () { URL.revokeObjectURL(a.href); }, 5000);
}

function downloadEditor(id) {
  var ed = EDITORS[id];
  var code = getEditorCode(id);
  if (ed.cfg.mode === 'web') {
    var doc = '<!doctype html>\n<html>\n<head>\n<meta charset="utf-8">\n' +
      '<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
      '<title>My page — built with Code Teacher</title>\n' +
      '<style>\n' + (code.css || '') + '\n</style>\n</head>\n<body>\n' +
      (code.html || '') + '\n<script>\n' + (code.js || '') + '\n<\/script>\n</body>\n</html>\n';
    downloadFile('my-page.html', doc, 'text/html');
    toast('Saved my-page.html — double-click it to open!');
  } else {
    var ext = { js: 'js', ts: 'ts', python: 'py', sql: 'sql' }[ed.cfg.mode] || 'txt';
    downloadFile('my-code.' + ext, code.code || '', 'text/plain');
    toast('Saved my-code.' + ext);
  }
}

/* ---------------- Auto-graded tests ---------------- */

function showTestResults(ed, results) {
  var el = document.createElement('div');
  el.className = 'test-results';
  var passed = 0;
  results.forEach(function (r) {
    if (r.pass) passed++;
    var line = document.createElement('div');
    line.className = 'tr-line ' + (r.pass ? 'tr-pass' : 'tr-fail');
    line.textContent = (r.pass ? '✅ ' : '❌ ') + r.name + (r.pass || !r.msg ? '' : ' — ' + r.msg);
    el.appendChild(line);
  });
  var sum = document.createElement('div');
  sum.className = 'tr-summary' + (passed === results.length ? ' tr-all' : '');
  sum.textContent = passed === results.length
    ? '🎉 All ' + results.length + ' tests pass — solved!'
    : passed + ' / ' + results.length + ' tests passing. Read the ❌ lines and iterate!';
  el.appendChild(sum);
  ed.consoleEl.appendChild(el);
  ed.consoleEl.scrollTop = ed.consoleEl.scrollHeight;

  if (passed === results.length && ed.cfg.exercise && !state.practice[ed.cfg.exercise]) {
    state.practice[ed.cfg.exercise] = true;
    persist();
    toast('✅ Exercise solved!');
  }
}

function runTests(id) {
  var ed = EDITORS[id], cfg = ed.cfg;
  var code = getEditorCode(id).code || '';
  ed.consoleEl.innerHTML = '<div class="con-line" style="color:var(--text-faint)">Running tests…</div>';

  if (cfg.mode === 'js' || cfg.mode === 'ts') {
    var capture = CAPTURE_SRC.replace(/__ID__/g, id);
    var harness =
      'var __TESTS=' + JSON.stringify(cfg.tests.map(function (t) { return [t.name, t.code]; })) + ';' +
      'function assert(c,m){if(!c)throw new Error(m||"assertion failed");}' +
      'var __results=__TESTS.map(function(t){try{eval(t[1]);return{name:t[0],pass:true};}' +
      'catch(e){return{name:t[0],pass:false,msg:String(e&&e.message||e)};}});' +
      'parent.postMessage({ctTests:1,ed:"' + id + '",results:__results},"*");';
    ed.iframe.srcdoc = '<!doctype html><html><body><script>' + capture + '<\/script>' +
      '<script>' + sanitizeForSrcdoc(code) + '\n<\/script>' +
      '<script>' + sanitizeForSrcdoc(harness) + '<\/script></body></html>';
    return;
  }

  if (cfg.mode === 'python') {
    ensurePyodide().then(function (py) {
      var names = cfg.tests.map(function (t) { return t.name; });
      var src = 'import json\n__ns = {}\n__results = []\n' +
        'try:\n    exec(' + JSON.stringify(code) + ', __ns)\n    __ok = True\n' +
        'except Exception as e:\n    __ok = False\n    __err = str(e) or type(e).__name__\n';
      cfg.tests.forEach(function (t) {
        src += 'if __ok:\n' +
          '    try:\n        exec(' + JSON.stringify(t.code) + ', __ns)\n' +
          '        __results.append({"name": ' + JSON.stringify(t.name) + ', "pass": True})\n' +
          '    except Exception as e:\n' +
          '        __results.append({"name": ' + JSON.stringify(t.name) + ', "pass": False, "msg": str(e) or type(e).__name__})\n';
      });
      src += 'if not __ok:\n    __results = [{"name": n, "pass": False, "msg": "your code failed to run: " + __err} for n in ' + JSON.stringify(names) + ']\n';
      src += 'json.dumps(__results)';
      py.setStdout({ batched: function () {} });
      py.setStderr({ batched: function () {} });
      return py.runPythonAsync(src).then(function (json) {
        ed.consoleEl.innerHTML = '';
        showTestResults(ed, JSON.parse(json));
      });
    }).catch(function (err) {
      ed.consoleEl.innerHTML = '';
      var div = document.createElement('div');
      div.className = 'con-line con-err';
      div.textContent = 'Could not run the tests: ' + String(err && err.message || err).split('\n').slice(-2).join(' ');
      ed.consoleEl.appendChild(div);
    });
    return;
  }

  if (cfg.mode === 'sql') {
    ensureSqlJs().then(function (SQL) {
      ed.consoleEl.innerHTML = '';
      var db = new SQL.Database();
      var results;
      try {
        if (cfg.setup) db.run(cfg.setup);
        var res = db.exec(code);
        var last = res[res.length - 1];
        var got = last ? last.values : [];
        var pass = JSON.stringify(got) === JSON.stringify(cfg.expect);
        results = [{
          name: 'Query result matches the expected rows',
          pass: pass,
          msg: pass ? '' : 'expected ' + JSON.stringify(cfg.expect) + ' but got ' + JSON.stringify(got).slice(0, 140)
        }];
        if (last) ed.consoleEl.appendChild(sqlResultTable(last));
      } catch (err) {
        var msg = String(err && err.message || err);
        results = [{ name: 'Query runs without errors', pass: false, msg: msg }];
        appendHint(ed.consoleEl, msg, SQL_HINTS);
      }
      db.close();
      showTestResults(ed, results);
    }).catch(function () {
      ed.consoleEl.innerHTML = '<div class="con-line con-err">Could not load the SQL engine — you may be offline.</div>';
    });
  }
}

function getEditorCode(id) {
  var ed = EDITORS[id], out = {};
  $all('.ed-src textarea', ed.root).forEach(function (ta) {
    out[ta.closest('.ed-src').dataset.src] = ta.value;
  });
  return out;
}

function setEditorCode(id, code) {
  var ed = EDITORS[id];
  Object.keys(code).forEach(function (k) {
    var src = $('.ed-src[data-src="' + k + '"] textarea', ed.root);
    if (src && code[k] !== undefined) src.value = code[k];
  });
}

function runEditor(id) {
  var ed = EDITORS[id], cfg = ed.cfg;
  var code = getEditorCode(id);
  ed.consoleEl.innerHTML = '';

  if (cfg.mode === 'plain') { runPlain(id, code.code); return; }
  if (cfg.mode === 'python') { runPython(id, code.code); return; }
  if (cfg.mode === 'sql') { runSql(id, code.code); return; }
  if (cfg.mode === 'ts') { runTypeScript(id, code.code); return; }

  var capture = CAPTURE_SRC.replace(/__ID__/g, id);
  var doc;
  if (cfg.mode === 'web') {
    doc = '<!doctype html><html><head><meta charset="utf-8"><style>' + (code.css || '') +
      '</style></head><body>' + (code.html || '') +
      '<script>' + capture + '<\/script>' +
      '<script>' + sanitizeForSrcdoc(code.js) + '\n<\/script></body></html>';
  } else { // js
    doc = '<!doctype html><html><body><script>' + capture + '<\/script>' +
      '<script>' + sanitizeForSrcdoc(code.code) + '\n<\/script></body></html>';
  }
  ed.iframe.srcdoc = doc;

  if (cfg.mode === 'js') {
    ed.ranAt = Date.now();
    setTimeout(function () {
      if (ed.consoleEl.childElementCount === 0) {
        ed.consoleEl.innerHTML = '<div class="con-line" style="color:var(--text-faint)">(finished — nothing was printed. Use console.log() to print.)</div>';
      }
    }, 600);
  }
}

/* ---- Error decoder: plain-English hints under every error ---- */

var JS_HINTS = [
  [/is not defined/i, 'Something is being used by a name the program doesn\'t know. Usually a typo, or the variable is created further down. Check the spelling (capitals count!) against where it was declared.'],
  [/is not a function/i, 'The code called something that isn\'t callable. Nine times out of ten it\'s a misspelled method name — .fliter instead of .filter — or the variable holds a different type than you think. console.log it to see.'],
  [/Cannot read propert/i, 'A chain like a.b.c hit an empty link — the part before the dot was undefined or null. Log each piece (console.log(a), then a.b) to find which link broke, then ask why it\'s empty.'],
  [/Unexpected token|Unexpected end of input|Invalid or unexpected token/i, 'A grammar slip: an unclosed bracket, quote or brace, or a stray character. The problem is often on the line BEFORE the one reported. Count your ( ) { } pairs.'],
  [/Assignment to constant/i, 'A const was reassigned. If the value truly needs to change, declare it with let instead.'],
  [/Maximum call stack/i, 'A function is calling itself forever (infinite recursion). Make sure it has a stopping condition that\'s actually reached.'],
  [/Failed to fetch|NetworkError/i, 'The network request failed — you may be offline, the URL may be wrong, or the API blocks browser requests (CORS). Try another API or check the URL in a new tab.']
];

var PY_HINTS = [
  [/NameError/, 'Python doesn\'t recognize a name. Usually a typo (capitals count!), or the variable is created later in the file than where you used it.'],
  [/IndentationError|TabError/, 'The indentation is inconsistent. Python is strict: pick 4 spaces per level and never mix tabs with spaces. Check the reported line against the lines above it.'],
  [/TypeError/, 'Two incompatible types got mixed — like "7" + 1. Convert first with int(), str() or float(), and print(type(x)) on the suspects to see what they really are.'],
  [/ValueError/, 'The type was right but the value was impossible — like int("hello"). Check what\'s actually inside the variable with a print() just before this line.'],
  [/IndexError/, 'A list index went past the end. Remember indexes start at 0, so the last item is len(lst) - 1. Print len() and the index you\'re using.'],
  [/KeyError/, 'That dictionary key doesn\'t exist. Print the dict to see its real keys, or use .get(key, default) for a safe lookup.'],
  [/ZeroDivisionError/, 'Something was divided by zero. Guard it: if divisor != 0, or catch the error with try/except.'],
  [/AttributeError/, 'The object doesn\'t have that method or property — often a typo (.apend), or the variable is a different type than you expect. print(type(x)) reveals all.'],
  [/ModuleNotFoundError/, 'That module isn\'t available here. The browser Python includes the standard library and numpy; other packages need Python on your own computer.'],
  [/SyntaxError/, 'Python couldn\'t parse the code: check for a missing colon at the end of if/for/def lines, unclosed quotes or brackets — often on the line before the one reported.']
];

function appendHint(consoleEl, text, hintTable) {
  for (var i = 0; i < hintTable.length; i++) {
    if (hintTable[i][0].test(text)) {
      if (consoleEl.querySelector('.con-hint')) return; // one hint per run
      var div = document.createElement('div');
      div.className = 'con-line con-hint';
      div.textContent = '💡 ' + hintTable[i][1];
      consoleEl.appendChild(div);
      return;
    }
  }
}

window.addEventListener('message', function (e) {
  var d = e.data;
  if (!d) return;
  if (d.ctTests) {
    var edT = EDITORS[d.ed];
    if (edT && edT.consoleEl) {
      edT.consoleEl.innerHTML = '';
      showTestResults(edT, d.results || []);
    }
    return;
  }
  if (!d.ctConsole) return;
  var ed = EDITORS[d.ed];
  if (!ed || !ed.consoleEl) return;
  var line = document.createElement('div');
  line.className = 'con-line' + (d.kind === 'error' ? ' con-err' : d.kind === 'warn' ? ' con-warn' : '');
  line.textContent = d.text;
  ed.consoleEl.appendChild(line);
  if (d.kind === 'error') appendHint(ed.consoleEl, d.text, JS_HINTS);
});

/* ---------------- Python (Pyodide) ---------------- */

var pyodidePromise = null;
function ensurePyodide() {
  if (!pyodidePromise) {
    pyodidePromise = new Promise(function (resolve, reject) {
      if (window.loadPyodide) { window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/' }).then(resolve, reject); return; }
      var s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
      s.onload = function () {
        window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/' }).then(resolve, reject);
      };
      s.onerror = function () { reject(new Error('load-failed')); };
      document.head.appendChild(s);
    });
    pyodidePromise.catch(function () { pyodidePromise = null; });
  }
  return pyodidePromise;
}

function runPlain(id, code) {
  var ed = EDITORS[id];
  var out = ed.consoleEl;
  out.innerHTML = '';

  function print(text, isErr) {
    var div = document.createElement('div');
    if (isErr) div.className = 'out-err';
    div.textContent = text;
    out.appendChild(div);
  }

  if (!window.CT_PLAIN_RUN) {
    print('The Plain runtime is still loading — try Run again in a moment.');
    return;
  }

  window.CT_PLAIN_RUN(code).then(function (answer) {
    out.innerHTML = '';

    if (answer.output) print(answer.output);

    if (!answer.ok) {
      // Plain says what is wrong in whole sentences, so the whole thing is
      // worth showing rather than the last line of a stack.
      print(answer.problem, true);
      return;
    }

    if (!answer.output) print('(finished — nothing was shown. Use show to put something on the screen.)');
  });
}

function runPython(id, code) {
  var ed = EDITORS[id];
  var out = ed.consoleEl;
  function print(text, isErr) {
    var div = document.createElement('div');
    if (isErr) div.className = 'out-err';
    div.textContent = text;
    out.appendChild(div);
  }
  out.innerHTML = '';
  print(window.loadPyodide && pyodidePromise ? 'Running…' : 'Loading the Python runtime… (first time only, ~10 MB)');

  ensurePyodide().then(function (py) {
    out.innerHTML = '';
    py.setStdout({ batched: function (s) { print(s); } });
    py.setStderr({ batched: function (s) { print(s, true); } });
    var prep = py.loadPackagesFromImports ? py.loadPackagesFromImports(code).catch(function () {}) : Promise.resolve();
    return prep.then(function () {
      return py.runPythonAsync(code);
    }).then(function () {
      if (out.childElementCount === 0) print('(finished — nothing was printed. Use print() to show output.)');
    }).catch(function (err) {
      var msg = String(err && err.message || err);
      var lines = msg.trim().split('\n');
      print(lines.slice(-3).join('\n'), true);
      appendHint(out, msg, PY_HINTS);
    });
  }).catch(function () {
    out.innerHTML = '';
    print('Could not load the Python runtime — you may be offline.', true);
    if (ed.cfg.expected) {
      print('\nExpected output of the original example:');
      print(ed.cfg.expected);
    }
  });
}

/* ---------------- TypeScript (real tsc from CDN) ---------------- */

var tsPromise = null;
function ensureTypeScript() {
  if (!tsPromise) {
    tsPromise = new Promise(function (resolve, reject) {
      if (window.ts) { resolve(window.ts); return; }
      var s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/typescript@5.4.5/lib/typescript.min.js';
      s.onload = function () { resolve(window.ts); };
      s.onerror = function () {
        var s2 = document.createElement('script');
        s2.src = 'https://cdn.jsdelivr.net/npm/typescript@5.4.5/lib/typescript.js';
        s2.onload = function () { resolve(window.ts); };
        s2.onerror = function () { reject(new Error('load-failed')); };
        document.head.appendChild(s2);
      };
      document.head.appendChild(s);
    });
    tsPromise.catch(function () { tsPromise = null; });
  }
  return tsPromise;
}

function runTypeScript(id, code) {
  var ed = EDITORS[id];
  var out = ed.consoleEl;
  function print(text, isErr) {
    var div = document.createElement('div');
    div.className = 'con-line' + (isErr ? ' con-err' : '');
    div.textContent = text;
    out.appendChild(div);
  }
  out.innerHTML = '';
  print(window.ts ? 'Compiling…' : 'Loading the TypeScript compiler… (first time only, ~8 MB)');

  ensureTypeScript().then(function (ts) {
    out.innerHTML = '';
    try {
      var res = ts.transpileModule(code, {
        compilerOptions: { target: ts.ScriptTarget.ES2020 },
        reportDiagnostics: true
      });
      (res.diagnostics || []).forEach(function (d) {
        var pos = d.file && d.start !== undefined ? d.file.getLineAndCharacterOfPosition(d.start) : null;
        print('TS' + d.code + (pos ? ' (line ' + (pos.line + 1) + ')' : '') + ': ' +
          ts.flattenDiagnosticMessageText(d.messageText, ' '), true);
      });
      var capture = CAPTURE_SRC.replace(/__ID__/g, id);
      ed.iframe.srcdoc = '<!doctype html><html><body><script>' + capture + '<\/script>' +
        '<script>' + sanitizeForSrcdoc(res.outputText) + '\n<\/script></body></html>';
      setTimeout(function () {
        if (out.childElementCount === 0) {
          out.innerHTML = '<div class="con-line" style="color:var(--text-faint)">(finished — nothing was printed. Use console.log() to print.)</div>';
        }
      }, 700);
    } catch (err) {
      print('TypeScript couldn\'t parse this code: ' + String(err && err.message || err), true);
      appendHint(out, 'Unexpected token', JS_HINTS);
    }
  }).catch(function () {
    out.innerHTML = '';
    print('Could not load the TypeScript compiler — you may be offline. The code and lesson still teach; run it when you\'re back online.', true);
  });
}

/* ---------------- SQL (sql.js / SQLite) ---------------- */

var SQL_HINTS = [
  [/syntax error/i, 'SQL couldn\'t parse the statement. Check the clause order (SELECT … FROM … WHERE … GROUP BY … ORDER BY … LIMIT), look for a missing comma or unclosed quote — and remember text needs SINGLE quotes: \'Pancakes\'.'],
  [/no such table/i, 'That table doesn\'t exist here. Check the spelling against the tables listed under the editor — or if this editor starts empty, you need to CREATE TABLE it first.'],
  [/no such column/i, 'That column name doesn\'t exist in the table. Run SELECT * FROM the table to see its real column names — spelling and underscores count.'],
  [/ambiguous column/i, 'Both joined tables have a column with this name. Prefix it with the table: dishes.name instead of name.'],
  [/UNIQUE constraint failed/i, 'You inserted a value that already exists in a UNIQUE or PRIMARY KEY column. Every row needs its own value there.'],
  [/NOT NULL constraint failed/i, 'The INSERT left out a required (NOT NULL) column. Provide a value for it, or give the column a DEFAULT.'],
  [/incomplete input/i, 'The statement ended mid-thought — usually an unclosed quote or parenthesis, or a missing closing part of the statement.']
];

var sqlJsPromise = null;
function ensureSqlJs() {
  if (!sqlJsPromise) {
    sqlJsPromise = new Promise(function (resolve, reject) {
      function boot() {
        window.initSqlJs({ locateFile: function (f) { return 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/' + f; } }).then(resolve, reject);
      }
      if (window.initSqlJs) { boot(); return; }
      var s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.js';
      s.onload = boot;
      s.onerror = function () { reject(new Error('load-failed')); };
      document.head.appendChild(s);
    });
    sqlJsPromise.catch(function () { sqlJsPromise = null; });
  }
  return sqlJsPromise;
}

function sqlResultTable(res) {
  var wrap = document.createElement('div');
  wrap.className = 'sql-result-wrap';
  var t = document.createElement('table');
  t.className = 'sql-result';
  t.innerHTML = '<tr>' + res.columns.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '</tr>' +
    res.values.map(function (r) {
      return '<tr>' + r.map(function (v) { return '<td>' + (v === null ? '<i>NULL</i>' : esc(v)) + '</td>'; }).join('') + '</tr>';
    }).join('');
  wrap.appendChild(t);
  var count = document.createElement('div');
  count.className = 'sql-rowcount';
  count.textContent = res.values.length + ' row' + (res.values.length === 1 ? '' : 's');
  wrap.appendChild(count);
  return wrap;
}

function runSql(id, code) {
  var ed = EDITORS[id];
  var out = ed.consoleEl;
  function print(text, isErr) {
    var div = document.createElement('div');
    if (isErr) div.className = 'out-err';
    div.textContent = text;
    out.appendChild(div);
  }
  out.innerHTML = '';
  print(window.initSqlJs && sqlJsPromise ? 'Running…' : 'Loading the SQL engine… (first time only, ~1 MB)');

  ensureSqlJs().then(function (SQL) {
    out.innerHTML = '';
    var db = new SQL.Database();
    try {
      if (ed.cfg.setup) db.run(ed.cfg.setup);
      var results = db.exec(code);
      if (!results.length) {
        print('✓ Ran successfully — no rows to display. SELECT something to see a table.');
      }
      results.forEach(function (res) { out.appendChild(sqlResultTable(res)); });
    } catch (err) {
      var msg = String(err && err.message || err);
      print(msg, true);
      appendHint(out, msg, SQL_HINTS);
    }
    db.close();
  }).catch(function () {
    out.innerHTML = '';
    print('Could not load the SQL engine — you may be offline. The lesson\'s code and text still teach the ideas; run it when you\'re back online.', true);
  });
}

/* ---------------- Quiz ---------------- */

function quizView(lesson) {
  var qid = lesson.id;
  var best = state.quiz[qid];
  var out = '<div class="quiz" data-quiz="' + qid + '">';
  lesson.quiz.forEach(function (q, qi) {
    out += '<div class="quiz-q" data-q="' + qi + '"><div class="qq-text">' + q.q + '</div><div class="quiz-opts">';
    q.options.forEach(function (opt, oi) {
      out += '<button type="button" class="quiz-opt" data-o="' + oi + '">' + opt + '</button>';
    });
    out += '</div><div class="quiz-why" hidden></div></div>';
  });
  out += '<div class="quiz-score" data-score>' +
    (best !== undefined ? 'Best score so far: ' + Math.round(best * 100) + '%. Answer again to beat it!' : 'Answer all ' + lesson.quiz.length + ' questions.') +
    '</div></div>';
  onMount(function () { mountQuiz(qid, lesson); });
  return out;
}

function mountQuiz(qid, lesson) {
  var root = $('.quiz[data-quiz="' + qid + '"]');
  if (!root) return;
  var answered = {}, correct = 0;
  $all('.quiz-q', root).forEach(function (qEl) {
    var qi = +qEl.dataset.q, q = lesson.quiz[qi];
    $all('.quiz-opt', qEl).forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (answered[qi] !== undefined) return;
        var oi = +btn.dataset.o;
        answered[qi] = oi;
        if (oi === q.a) {
          correct++;
          btn.classList.add('correct');
          reviewCorrect(qid + '|' + qi);
        } else {
          btn.classList.add('wrong');
          $all('.quiz-opt', qEl)[q.a].classList.add('correct');
          reviewWrong(qid + '|' + qi);
        }
        $all('.quiz-opt', qEl).forEach(function (b) { b.disabled = true; });
        if (q.why) {
          var why = $('.quiz-why', qEl);
          why.hidden = false;
          why.innerHTML = q.why;
        }
        if (Object.keys(answered).length === lesson.quiz.length) finishQuiz();
      });
    });
  });

  function finishQuiz() {
    var score = correct / lesson.quiz.length;
    var scoreEl = $('[data-score]', root);
    var pct = Math.round(score * 100);
    if ((state.quiz[qid] || 0) < score) { state.quiz[qid] = score; }
    if (score >= 0.7) {
      scoreEl.classList.add('pass');
      scoreEl.textContent = 'You got ' + correct + '/' + lesson.quiz.length + ' (' + pct + '%) — lesson complete! 🎉';
      if (!state.done[qid]) {
        state.done[qid] = true;
        toast('Lesson complete! 🎉');
        var btn = $('[data-mark-done]');
        if (btn) btn.textContent = '✓ Completed';
      }
    } else {
      scoreEl.textContent = 'You got ' + correct + '/' + lesson.quiz.length + ' (' + pct + '%). Re-read the lesson and refresh the page to retry — you\'ve got this!';
    }
    persist();
  }
}

/* ---------------- Spaced-repetition review ---------------- */

var REVIEW_INTERVALS = [1, 3, 7]; // days until next review, per correct streak

function reviewWrong(key) {
  state.review[key] = { due: Date.now(), streak: 0 };
  persist();
}

function reviewCorrect(key) {
  var r = state.review[key];
  if (!r) return;
  r.streak = (r.streak || 0) + 1;
  if (r.streak >= 3) delete state.review[key];   // graduated!
  else r.due = Date.now() + REVIEW_INTERVALS[r.streak - 1] * 86400000;
  persist();
}

var qindexCache = null;
function buildQIndex() {
  if (qindexCache) return qindexCache;
  qindexCache = {};
  allTracks().forEach(function (t) {
    t.lessons.forEach(function (l, i) {
      if (l.quiz) qindexCache[l.id] = { quiz: l.quiz, title: l.title, href: '#/lesson/' + t.id + '/' + i, where: t.name };
    });
  });
  ATLAS.forEach(function (a) { qindexCache['atlas-' + a.id] = { quiz: a.quiz, title: a.name, href: '#/atlas/' + a.id, where: 'Atlas' }; });
  TOOLBOX.forEach(function (t) { qindexCache['tool-' + t.id] = { quiz: t.quiz, title: t.name, href: '#/toolbox/' + t.id, where: 'Toolbox' }; });
  BLUEPRINTS.forEach(function (b) { qindexCache['bp-' + b.id] = { quiz: b.quiz, title: b.name, href: '#/blueprint/' + b.id, where: 'Blueprints' }; });
  return qindexCache;
}

function reviewEntries() {
  var idx = buildQIndex();
  var out = [];
  Object.keys(state.review).forEach(function (key) {
    var parts = key.split('|');
    var meta = idx[parts[0]];
    var q = meta && meta.quiz && meta.quiz[+parts[1]];
    if (q) out.push({ key: key, entry: state.review[key], meta: meta, q: q });
    else delete state.review[key];   // question no longer exists
  });
  return out;
}

function dueReviews() {
  return reviewEntries().filter(function (e) { return e.entry.due <= Date.now(); });
}

function viewReview() {
  var entries = reviewEntries();
  var due = entries.filter(function (e) { return e.entry.due <= Date.now(); });
  var later = entries.filter(function (e) { return e.entry.due > Date.now(); })
    .sort(function (a, b) { return a.entry.due - b.entry.due; });

  var out = '<h1>🔁 Review</h1>' +
    '<p class="muted">Every quiz question you miss lands here, and comes back on a schedule (1 day → 3 days → 7 days). Answer it right three times and it graduates. This is spaced repetition — the most evidence-backed study technique there is, running on your actual mistakes.</p>';

  if (!entries.length) {
    out += '<div class="card center" style="padding:40px"><p style="font-size:2rem;margin:0">🌤️</p><p><b>Nothing to review!</b></p><p class="muted small">Miss a quiz question anywhere on the site and it will appear here for scheduled re-practice. (Yes, this is the one place where getting things wrong is productive.)</p><a class="btn" href="#/">Back to learning</a></div>';
    return out;
  }

  if (due.length) {
    out += '<h2>Due now — ' + due.length + '</h2>';
    due.slice(0, 10).forEach(function (e, i) {
      out += '<div class="quiz-q review-q" data-rk="' + esc(e.key) + '" data-ri="' + i + '">' +
        '<p class="small muted" style="margin:0 0 6px">' + esc(e.meta.where) + ' · <a href="' + e.meta.href + '">' + esc(e.meta.title) + '</a> · streak ' + (e.entry.streak || 0) + '/3</p>' +
        '<div class="qq-text">' + e.q.q + '</div><div class="quiz-opts">' +
        e.q.options.map(function (opt, oi) {
          return '<button type="button" class="quiz-opt" data-o="' + oi + '">' + opt + '</button>';
        }).join('') + '</div><div class="quiz-why" hidden></div></div>';
    });
    if (due.length > 10) out += '<p class="small muted">…and ' + (due.length - 10) + ' more after these.</p>';
  } else {
    out += '<div class="card"><p>✅ <b>All caught up!</b> Nothing due right now.</p></div>';
  }

  if (later.length) {
    var next = new Date(later[0].entry.due);
    out += '<h2 style="margin-top:26px">Scheduled — ' + later.length + '</h2>' +
      '<p class="muted small">Next one due ' + next.toLocaleDateString() + '. Questions on streak 1-2 are on their way to graduating.</p>';
  }

  onMount(function () {
    $all('.review-q').forEach(function (qEl) {
      var key = qEl.dataset.rk;
      var e = entries.filter(function (x) { return x.key === key; })[0];
      if (!e) return;
      $all('.quiz-opt', qEl).forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (qEl.dataset.doneAnswered) return;
          qEl.dataset.doneAnswered = '1';
          var oi = +btn.dataset.o;
          var right = oi === e.q.a;
          var why = $('.quiz-why', qEl);
          if (right) {
            btn.classList.add('correct');
            reviewCorrect(key);
            var stillThere = state.review[key];
            why.hidden = false;
            why.innerHTML = stillThere
              ? '✓ Correct — next review in ' + REVIEW_INTERVALS[stillThere.streak - 1] + ' day' + (REVIEW_INTERVALS[stillThere.streak - 1] === 1 ? '' : 's') + '.'
              : '🎓 Correct three times — this question has graduated!';
          } else {
            btn.classList.add('wrong');
            $all('.quiz-opt', qEl)[e.q.a].classList.add('correct');
            reviewWrong(key);
            why.hidden = false;
            why.innerHTML = (e.q.why || '') + ' <span class="muted small">(Back to the start of the schedule — you\'ll see this again soon.)</span>';
          }
          $all('.quiz-opt', qEl).forEach(function (b) { b.disabled = true; });
        });
      });
    });
  });
  return out;
}

/* ---------------- Journey (guided roadmap) ---------------- */

function countDoneIds(ids) {
  return ids.filter(function (id) { return state.done[id]; }).length;
}

var JOURNEY = [
  { icon: '🎯', title: 'Find your level', desc: 'The 2-minute skill check tunes recommendations to you.', href: '#/assessment', test: function (s) { return !!s.assess; } },
  { icon: '📄', title: 'HTML: your first pages', desc: 'Lessons 1–4 of the HTML track — structure, text, lists, links.', href: '#/track/html', ids: ['html-1', 'html-2', 'html-3', 'html-4'] },
  { icon: '🎨', title: 'CSS: make it yours', desc: 'Lessons 1–4 of the CSS track — color, selectors, the box model.', href: '#/track/css', ids: ['css-1', 'css-2', 'css-3', 'css-4'] },
  { icon: '🚢', title: 'Ship a real page', desc: 'The Personal Profile project, start to finish.', href: '#/project/profile-page', test: function (s) { return !!s.projects['profile-page']; } },
  { icon: '⚡', title: 'JavaScript: first programs', desc: 'Lessons 1–5 — variables, decisions, loops.', href: '#/track/js', ids: ['js-1', 'js-2', 'js-3', 'js-4', 'js-5'] },
  { icon: '🧪', title: 'Prove it in Practice', desc: 'Solve 5 auto-graded exercises — green checks don\'t lie.', href: '#/practice', test: function () { return solvedExercises() >= 5; } },
  { icon: '🕹️', title: 'Build something interactive', desc: 'The Quiz game or the To-do list project.', href: '#/projects', test: function (s) { return !!(s.projects['quiz-game'] || s.projects['todo-list']); } },
  { icon: '🌐', title: 'Assemble a whole website', desc: 'Build-a-Website track, lessons 1–6.', href: '#/track/website', ids: ['web-1', 'web-2', 'web-3', 'web-4', 'web-5', 'web-6'] },
  { icon: '🐍', title: 'Second language: Python', desc: 'Lessons 1–5 — same ideas, new syntax. Feel the transfer.', href: '#/track/python', ids: ['py-1', 'py-2', 'py-3', 'py-4', 'py-5'] },
  { icon: '🗄️', title: 'Speak to databases', desc: 'SQL track, lessons 1–4 — SELECT to GROUP BY.', href: '#/track/sql', ids: ['sql-1', 'sql-2', 'sql-3', 'sql-4'] },
  { icon: '✅', title: 'Adopt the testing habit', desc: 'Testing track, lessons 1–2 — the professional reflex.', href: '#/track/testing', ids: ['test-1', 'test-2'] },
  { icon: '📈', title: 'Think in Big-O', desc: 'DS&A track, lessons 1–3 — why code is fast or slow.', href: '#/track/dsa', ids: ['dsa-1', 'dsa-2', 'dsa-3'] },
  { icon: '🧠', title: 'Train a neural network', desc: 'AI track through backprop (lessons 1–4). Yes, really.', href: '#/track/ai', ids: ['ai-1', 'ai-2', 'ai-3', 'ai-4'] },
  { icon: '👑', title: 'The capstone portfolio', desc: 'Build and publish your portfolio — then send someone the link.', href: '#/project/portfolio-capstone', test: function (s) { return !!s.projects['portfolio-capstone']; } },
  { icon: '🌍', title: 'Go wide', desc: 'Explore 5 pages across Blueprints, the Toolbox and the Atlas.', href: '#/blueprints', test: function () { return exploredGuides() >= 5; } }
];

function journeyStepDone(step) {
  return step.test ? step.test(state) : countDoneIds(step.ids) >= step.ids.length;
}

function viewJourney() {
  var doneCount = JOURNEY.filter(journeyStepDone).length;
  var currentFound = false;
  var out = '<h1>🧭 Your journey</h1>' +
    '<p class="muted">The recommended road from zero to job-ready, through everything this site teaches. Nothing is locked — this is a map, not a cage — but if you ever wonder "what next?", the answer is your next unchecked step. <b>' + doneCount + ' / ' + JOURNEY.length + ' milestones done.</b></p>';
  out += '<div class="progress-bar" style="margin-bottom:24px"><div style="width:' + Math.round(doneCount / JOURNEY.length * 100) + '%"></div></div>';

  out += '<div class="journey">';
  JOURNEY.forEach(function (step) {
    var done = journeyStepDone(step);
    var current = !done && !currentFound;
    if (current) currentFound = true;
    var progress = '';
    if (step.ids && !done) progress = ' <span class="small muted">(' + countDoneIds(step.ids) + '/' + step.ids.length + ')</span>';
    out += '<a class="j-step ' + (done ? 'j-done' : current ? 'j-current' : 'j-future') + '" href="' + step.href + '">' +
      '<span class="j-mark">' + (done ? '✓' : step.icon) + '</span>' +
      '<span class="j-body"><b>' + esc(step.title) + '</b>' + (current ? ' <span class="pill lv0">you are here</span>' : '') + progress +
      '<span class="j-desc">' + esc(step.desc) + '</span></span></a>';
  });
  out += '</div>';
  if (doneCount === JOURNEY.length) {
    out += '<div class="card center" style="margin-top:20px"><p style="font-size:2rem;margin:0">🎓👑🎉</p><p><b>The whole journey, complete.</b> You didn\'t just learn to code — you learned to learn languages, ship projects, test honestly and think in systems. Go build something nobody assigned you.</p></div>';
  }
  return out;
}

/* ---------------- Achievements ---------------- */

function viewAchievements() {
  var earned = BADGES.filter(function (b) { return b[4](); });
  var out = '<h1>🏅 Achievements</h1>' +
    '<p class="muted">Milestones on the way — <b>' + earned.length + ' / ' + BADGES.length + ' earned</b>. Current streak: <b>🔥 ' + (state.meta ? state.meta.streak : 1) + ' day' + (state.meta && state.meta.streak === 1 ? '' : 's') + '</b>.</p>';
  out += '<div class="badge-grid">';
  BADGES.forEach(function (b) {
    var got = b[4]();
    out += '<div class="badge-card' + (got ? ' badge-earned' : '') + '">' +
      '<div class="badge-icon">' + b[1] + '</div>' +
      '<b>' + esc(b[2]) + '</b>' +
      '<span class="small muted">' + esc(b[3]) + '</span>' +
      (got ? '<span class="pill lv0">earned</span>' : '<span class="pill">locked</span>') +
      '</div>';
  });
  out += '</div>';
  return out;
}

/* ---------------- Practice (auto-graded exercises) ---------------- */

function viewPractice() {
  var solved = solvedExercises();
  var due = dueReviews().length;
  var out = '<h1>🧪 Practice</h1>' +
    '<p class="muted">Auto-graded exercises: write real code, press <b>Run tests</b>, and get judged by actual assertions — the same way professional code is verified. All tests green = solved. <b>' + solved + ' / ' + PRACTICE.length + ' solved.</b></p>';

  out += '<div class="track-grid" style="margin-bottom:22px">' +
    '<a class="track-card" style="--tc:var(--c-bp)" href="#/review"><h3><span class="track-icon" style="background:var(--c-bp)">🔁</span>Review</h3><div class="tagline">Your missed questions, on a spaced-repetition schedule.</div><div class="track-meta"><span>' + due + ' due now</span><span>' + Object.keys(state.review).length + ' in rotation</span></div></a>' +
    '<a class="track-card" style="--tc:var(--c-atlas)" href="#/journey"><h3><span class="track-icon" style="background:var(--c-atlas)">🧭</span>Your journey</h3><div class="tagline">The recommended road through everything, with you on the map.</div><div class="track-meta"><span>' + JOURNEY.filter(journeyStepDone).length + ' / ' + JOURNEY.length + ' milestones</span><span></span></div></a>' +
    '<a class="track-card" style="--tc:var(--c-ai)" href="#/achievements"><h3><span class="track-icon" style="background:var(--c-ai)">🏅</span>Achievements</h3><div class="tagline">Badges, streaks and bragging rights.</div><div class="track-meta"><span>' + BADGES.filter(function (b) { return b[4](); }).length + ' / ' + BADGES.length + ' earned</span><span>🔥 ' + (state.meta ? state.meta.streak : 1) + '-day streak</span></div></a>' +
    '</div>';

  [['js', 'JavaScript'], ['python', 'Python'], ['sql', 'SQL']].forEach(function (group) {
    var exs = PRACTICE.filter(function (e) { return e.lang === group[0]; });
    if (!exs.length) return;
    out += '<div class="section-head"><h2>' + group[1] + '</h2></div><div class="proj-grid">';
    exs.forEach(function (ex) {
      var done = state.practice[ex.id];
      out += '<a class="proj-card' + (done ? ' done-card' : '') + '" href="#/practice/' + ex.id + '">' +
        '<div class="pc-meta">' + pillLevel(ex.level) + (done ? '<span class="pc-done">✓ SOLVED</span>' : '') + '</div>' +
        '<h3>' + esc(ex.title) + '</h3>' +
        '<div class="blurb">' + ex.brief + '</div></a>';
    });
    out += '</div>';
  });
  return out;
}

function viewExercise(id) {
  var ex = PRACTICE.filter(function (e) { return e.id === id; })[0];
  if (!ex) return viewNotFound();
  var solved = state.practice[ex.id];

  var out = '<div class="breadcrumbs"><a href="#/">Home</a> / <a href="#/practice">Practice</a> / ' + esc(ex.title) + '</div>';
  out += '<div class="lesson-head"><h1>' + esc(ex.title) + (solved ? ' <span class="pc-done">✓ SOLVED</span>' : '') + '</h1>' +
    '<div class="meta">' + pillLevel(ex.level) + '<span>' + LANG_LABELS[ex.lang === 'python' ? 'python' : ex.lang] + '</span></div></div>';
  out += '<div class="lesson-body"><p>' + ex.brief + '</p>' +
    '<p class="muted small">Write your solution, use <b>▶ Run</b> to experiment freely, then <b>🧪 Run tests</b> to be judged. All green = solved.</p></div>';

  var cfg = {
    mode: ex.lang === 'python' ? 'python' : ex.lang,
    title: 'Your solution',
    code: ex.starter,
    exercise: ex.id,
    height: 260
  };
  if (ex.lang === 'sql') {
    cfg.setup = window.DINER_DB || '';
    cfg.tables = 'The diner database is pre-loaded: <b>dishes</b>(id, name, price, vegan), <b>orders</b>(id, dish_id, quantity, day).';
    cfg.expect = ex.expect;
  } else {
    cfg.tests = ex.tests;
  }
  out += editorView(cfg);

  if (ex.lang !== 'sql') {
    out += '<details class="reveal"><summary>What the tests check</summary><div class="reveal-body"><ul>' +
      ex.tests.map(function (t) { return '<li>' + esc(t.name) + '</li>'; }).join('') + '</ul></div></details>';
  }
  out += '<details class="reveal"><summary>Hint</summary><div class="reveal-body"><p>' + ex.hint + '</p></div></details>';
  out += '<details class="reveal"><summary>Show a solution (try the hint first!)</summary><div class="reveal-body">' +
    codeBlock(ex.lang === 'python' ? 'python' : ex.lang, ex.solution) + '</div></details>';

  var all = PRACTICE;
  var idx = all.indexOf(ex);
  out += '<div class="lesson-nav">';
  out += idx > 0 ? '<a class="btn secondary" href="#/practice/' + all[idx - 1].id + '">← ' + esc(all[idx - 1].title) + '</a>' : '<a class="btn secondary" href="#/practice">← All exercises</a>';
  out += idx < all.length - 1 ? '<a class="btn" href="#/practice/' + all[idx + 1].id + '">' + esc(all[idx + 1].title) + ' →</a>' : '<a class="btn" href="#/practice">Back to Practice 🎉</a>';
  out += '</div>';
  return out;
}

/* ---------------- Views ---------------- */

function pillLevel(lv) {
  return '<span class="pill lv' + lv + '">' + LEVEL_NAMES[lv] + '</span>';
}

function trackCard(track) {
  var p = trackProgress(track);
  var pct = p.total ? Math.round(p.done / p.total * 100) : 0;
  return '<a class="track-card" style="--tc:var(--c-' + track.id + ')" href="#/track/' + track.id + '">' +
    '<h3><span class="track-icon">' + track.icon + '</span>' + esc(track.name) + '</h3>' +
    '<div class="tagline">' + esc(track.tagline) + '</div>' +
    '<div class="progress-bar"><div style="width:' + pct + '%"></div></div>' +
    '<div class="track-meta"><span>' + p.done + ' / ' + p.total + ' lessons</span><span>' + pct + '%</span></div></a>';
}

function viewHome() {
  var out = '';
  out += '<section class="hero"><h1>Learn to code, one small step at a time</h1>' +
    '<p>Interactive lessons in HTML, CSS, JavaScript and Python — with live code editors, quizzes and real projects. It adapts to what you already know, and your progress is saved automatically.</p>';
  if (!state.assess) {
    out += '<a class="btn" href="#/assessment">Find my level — 2-minute quiz</a>' +
      '<a class="btn secondary" href="#/track/html">I\'m brand new, start from zero</a>';
  } else if (state.last) {
    out += '<a class="btn" href="#/lesson/' + state.last.track + '/' + state.last.idx + '">Continue: ' + esc(state.last.title) + '</a>' +
      '<a class="btn secondary" href="#/projects">Browse projects</a>';
  } else {
    out += '<a class="btn" href="#/track/html">Start learning</a>' +
      '<a class="btn secondary" href="#/projects">Browse projects</a>';
  }
  out += '</section>';

  var quizzes = Object.keys(state.quiz).length;
  var projDone = doneProjects();
  var due = dueReviews().length;
  out += '<div class="stat-row">' +
    '<div class="stat"><b>' + doneLessons() + ' / ' + totalLessons() + '</b><span>lessons completed</span></div>' +
    '<div class="stat"><b>' + quizzes + '</b><span>quizzes taken</span></div>' +
    '<div class="stat"><b>' + projDone + ' / ' + PROJECTS.length + '</b><span>projects finished</span></div>' +
    '<a class="stat stat-link" href="#/practice"><b>' + solvedExercises() + ' / ' + PRACTICE.length + '</b><span>exercises solved</span></a>' +
    '<a class="stat stat-link' + (due ? ' stat-due' : '') + '" href="#/review"><b>' + due + '</b><span>reviews due</span></a>' +
    '<a class="stat stat-link" href="#/achievements"><b>🔥 ' + (state.meta ? state.meta.streak : 1) + '</b><span>day streak</span></a>' +
    '</div>';
  out += '<p class="center" style="margin-top:-14px;margin-bottom:26px"><a class="btn secondary small" href="#/journey">🧭 See your journey — the recommended path through everything</a></p>';

  out += '<div class="section-head"><h2>Learning tracks</h2>' +
    (state.assess ? '<a class="small" href="#/assessment">Retake skill check</a>' : '') + '</div>';
  out += '<div class="track-grid">' + allTracks().map(trackCard).join('') + '</div>';

  var atlasDone = ATLAS.filter(function (a) { return state.done['atlas-' + a.id]; }).length;
  var toolDone = TOOLBOX.filter(function (t) { return state.done['tool-' + t.id]; }).length;
  var bpDone = BLUEPRINTS.filter(function (b) { return state.done['bp-' + b.id]; }).length;
  out += '<div class="section-head"><h2>Go wider</h2></div><div class="track-grid">' +
    '<a class="track-card" style="--tc:var(--c-atlas)" href="#/atlas"><h3><span class="track-icon" style="background:var(--c-atlas)">🗺️</span>Language Atlas</h3>' +
    '<div class="tagline">Java, C++, Rust, Go, Haskell, Assembly and more — plus how to learn ANY language fast.</div>' +
    '<div class="track-meta"><span>' + ATLAS.length + ' languages</span><span>' + atlasDone + ' explored</span></div></a>' +
    '<a class="track-card" style="--tc:var(--c-atlas)" href="#/encyclopedia"><h3><span class="track-icon" style="background:var(--c-atlas)">📚</span>Encyclopedia</h3>' +
    '<div class="tagline">The full catalog: ' + ENC.length + ' documented languages, searchable, each linked to its closest relative here.</div>' +
    '<div class="track-meta"><span>' + ENC.length + ' entries</span><span>from 1945 →</span></div></a>' +
    '<a class="track-card" style="--tc:var(--c-bp)" href="#/blueprints"><h3><span class="track-icon" style="background:var(--c-bp)">🏗️</span>App Blueprints</h3>' +
    '<div class="tagline">How YouTube, chat apps, stores and search engines are really built — with live miniatures.</div>' +
    '<div class="track-meta"><span>' + BLUEPRINTS.length + ' blueprints</span><span>' + bpDone + ' explored</span></div></a>' +
    '<a class="track-card" style="--tc:var(--c-tool)" href="#/toolbox"><h3><span class="track-icon" style="background:var(--c-tool)">🧰</span>The Toolbox</h3>' +
    '<div class="tagline">Terminal, git, VS Code, Docker — and the game engines: Godot, Unity, Unreal, WebGL.</div>' +
    '<div class="track-meta"><span>' + TOOLBOX.length + ' tools</span><span>' + toolDone + ' explored</span></div></a>' +
    '</div>';

  out += '<div class="section-head"><h2>Featured projects</h2><a class="small" href="#/projects">See all ' + PROJECTS.length + ' →</a></div>';
  out += '<div class="proj-grid">' + PROJECTS.slice(0, 3).map(projCard).join('') + '</div>';
  out += '<p class="center" style="margin-top:14px"><a class="btn secondary" href="#/generate">🎲 Or generate a custom challenge sized to your progress</a></p>';

  out += '<div class="section-head"><h2>How this site works</h2></div><div class="track-grid">' +
    '<div class="card"><h3>1 · Learn</h3><p class="muted small">Every lesson explains one idea in plain language, shows working code, and lets you edit and run that code right in the page.</p></div>' +
    '<div class="card"><h3>2 · Check</h3><p class="muted small">Short quizzes with instant feedback tell you if it stuck. Score 70% or better and the lesson is marked complete.</p></div>' +
    '<div class="card"><h3>3 · Build</h3><p class="muted small">Guided projects at every level turn lessons into real things — games, pages, apps — with hints and full solutions when you need them.</p></div>' +
    '</div>';
  return out;
}

function viewTrack(id) {
  var track = TRACKS[id];
  if (!track) return viewNotFound();
  var out = '<div class="breadcrumbs"><a href="#/">Home</a> / ' + esc(track.name) + '</div>';
  out += '<div class="lesson-head"><h1><span class="track-icon" style="background:var(--c-' + track.id + ')">' + track.icon + '</span> ' + esc(track.name) + '</h1>' +
    '<p class="muted">' + esc(track.blurb || track.tagline) + '</p></div>';

  if (track.uses && track.uses.length) {
    out += '<p class="small muted" style="margin-bottom:6px"><b>What people build with it:</b></p>' +
      '<ul class="learn-list">' + track.uses.map(function (u) { return '<li>' + esc(u) + '</li>'; }).join('') + '</ul>';
  }

  var rec = recommendedLevel(track);
  if (rec !== null && rec > 0) {
    out += '<div class="recommend-note">📍 Based on your skill check, you can probably start at <b>' +
      LEVEL_NAMES[rec] + '</b> — but every lesson is open, so feel free to skim the earlier ones first.</div>';
  }

  [0, 1, 2].forEach(function (lv) {
    var lessons = track.lessons.filter(function (l) { return l.level === lv; });
    if (!lessons.length) return;
    out += '<div class="level-group" id="lv' + lv + '"><h3>' + pillLevel(lv) +
      ' <span class="muted small">' + lessons.length + ' lessons</span></h3><div class="lesson-list">';
    lessons.forEach(function (l) {
      var idx = track.lessons.indexOf(l);
      out += '<a class="lesson-row' + (state.done[l.id] ? ' done' : '') + '" href="#/lesson/' + track.id + '/' + idx + '">' +
        '<span class="check">✓</span><span class="lr-title">' + esc(l.title) + '</span>' +
        '<span class="lr-time">⏱ ' + l.minutes + ' min</span></a>';
    });
    out += '</div></div>';
  });

  var related = PROJECTS.filter(function (p) { return p.langs.indexOf(track.id) !== -1; });
  if (related.length) {
    out += '<div class="section-head"><h2>Projects that use ' + esc(track.name) + '</h2></div>' +
      '<div class="proj-grid">' + related.map(projCard).join('') + '</div>';
  }
  return out;
}

function recommendedLevel(track) {
  if (!state.assess || !track.area) return null;
  var n = state.assess[track.area];
  if (n === undefined) return null;
  return n >= 3 ? 2 : n === 2 ? 1 : 0;
}

function viewLesson(trackId, idx) {
  var track = TRACKS[trackId];
  idx = +idx;
  var lesson = track && track.lessons[idx];
  if (!lesson) return viewNotFound();

  state.last = { track: trackId, idx: idx, title: lesson.title };
  persist();

  var out = '<div class="breadcrumbs"><a href="#/">Home</a> / <a href="#/track/' + trackId + '">' +
    esc(track.name) + '</a> / ' + esc(lesson.title) + '</div>';
  out += '<div class="lesson-head"><h1>' + esc(lesson.title) + '</h1><div class="meta">' +
    pillLevel(lesson.level) + '<span>⏱ about ' + lesson.minutes + ' min</span>' +
    '<span>Lesson ' + (idx + 1) + ' of ' + track.lessons.length + '</span></div></div>';

  out += '<div class="lesson-body">' + renderBlocks(lesson.blocks) + '</div>';

  if (lesson.tryIt) {
    out += '<h2>🧪 Try it yourself</h2><p class="muted small">Change the code, press <b>▶ Run</b> (or Ctrl+Enter) and see what happens. Breaking things is how you learn — Reset brings the original back.</p>';
    out += editorView(Object.assign({ title: 'Try it yourself' }, lesson.tryIt));
  }

  if (lesson.quiz && lesson.quiz.length) {
    out += '<h2>✅ Check your understanding</h2>' + quizView(lesson);
  }

  if (lesson.challenge) {
    var ch = lesson.challenge;
    out += '<h2>🏆 Mini-challenge</h2><div class="challenge-box"><h3>Your turn</h3><p>' + ch.text + '</p>';
    (ch.hints || []).forEach(function (hint, i) {
      out += '<details class="reveal"><summary>Hint ' + (i + 1) + '</summary><div class="reveal-body"><p>' + hint + '</p></div></details>';
    });
    if (ch.solution) {
      out += '<details class="reveal"><summary>Show a solution</summary><div class="reveal-body">' +
        codeBlock(ch.solution.lang, ch.solution.code) + '</div></details>';
    }
    out += '</div>';
  }

  var doneNow = !!state.done[lesson.id];
  out += '<div class="lesson-nav">';
  out += idx > 0
    ? '<a class="btn secondary" href="#/lesson/' + trackId + '/' + (idx - 1) + '">← ' + esc(track.lessons[idx - 1].title) + '</a>'
    : '<a class="btn secondary" href="#/track/' + trackId + '">← Back to track</a>';
  out += '<button class="btn ' + (doneNow ? 'green' : 'secondary') + '" data-mark-done type="button">' +
    (doneNow ? '✓ Completed' : 'Mark as complete') + '</button>';
  out += idx < track.lessons.length - 1
    ? '<a class="btn" href="#/lesson/' + trackId + '/' + (idx + 1) + '">' + esc(track.lessons[idx + 1].title) + ' →</a>'
    : '<a class="btn" href="#/track/' + trackId + '">Finish track 🎉</a>';
  out += '</div>';

  onMount(function () {
    $('[data-mark-done]').addEventListener('click', function () {
      state.done[lesson.id] = !state.done[lesson.id];
      persist();
      this.textContent = state.done[lesson.id] ? '✓ Completed' : 'Mark as complete';
      this.classList.toggle('green', state.done[lesson.id]);
      this.classList.toggle('secondary', !state.done[lesson.id]);
      if (state.done[lesson.id]) toast('Lesson marked complete');
    });
  });
  return out;
}

/* ---------------- Projects ---------------- */

var projFilter = { level: 'all', lang: 'all' };

function projCard(p) {
  var done = state.projects[p.id];
  return '<a class="proj-card' + (done ? ' done-card' : '') + '" href="#/project/' + p.id + '">' +
    '<div class="pc-meta">' + pillLevel(p.level) +
    p.langs.map(function (l) { return '<span class="pill lang">' + (TRACKS[l] ? TRACKS[l].name : l) + '</span>'; }).join('') +
    (done ? '<span class="pc-done">✓ DONE</span>' : '') + '</div>' +
    '<h3>' + esc(p.title) + '</h3><div class="blurb">' + esc(p.blurb) + '</div>' +
    '<div class="small muted">⏱ about ' + p.minutes + ' min</div></a>';
}

function viewProjects() {
  var out = '<h1>Projects</h1><p class="muted">Learning sticks when you build. Pick a project at your level — each one has step-by-step guidance, starter code you can run right here, and a full solution if you get stuck.</p>';
  out += '<div class="resume-card"><p>♾️ Done with these, or want something no one else has built? <b>The challenge generator invents projects sized to your progress.</b></p><a class="btn" href="#/generate">🎲 Generate a challenge</a></div>';
  out += '<div class="filter-row" data-filter="level">' +
    ['all', 0, 1, 2].map(function (v) {
      var label = v === 'all' ? 'All levels' : LEVEL_NAMES[v];
      return '<button type="button" class="chip' + (String(projFilter.level) === String(v) ? ' active' : '') + '" data-v="' + v + '">' + label + '</button>';
    }).join('') + '</div>';
  out += '<div class="filter-row" data-filter="lang">' +
    ['all', 'html', 'css', 'js', 'python'].map(function (v) {
      var label = v === 'all' ? 'All languages' : TRACKS[v].name;
      return '<button type="button" class="chip' + (projFilter.lang === v ? ' active' : '') + '" data-v="' + v + '">' + label + '</button>';
    }).join('') + '</div>';

  var list = PROJECTS.filter(function (p) {
    if (projFilter.level !== 'all' && p.level !== +projFilter.level) return false;
    if (projFilter.lang !== 'all' && p.langs.indexOf(projFilter.lang) === -1) return false;
    return true;
  });
  out += list.length
    ? '<div class="proj-grid">' + list.map(projCard).join('') + '</div>'
    : '<p class="muted">No projects match those filters yet — try widening them.</p>';

  onMount(function () {
    $all('.filter-row .chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        var kind = chip.closest('.filter-row').dataset.filter;
        projFilter[kind] = chip.dataset.v;
        renderRoute();
      });
    });
  });
  return out;
}

function viewProject(id) {
  var p = PROJECTS.filter(function (x) { return x.id === id; })[0];
  if (!p) return viewNotFound();

  var out = '<div class="breadcrumbs"><a href="#/">Home</a> / <a href="#/projects">Projects</a> / ' + esc(p.title) + '</div>';
  out += '<div class="lesson-head"><h1>' + esc(p.title) + '</h1><div class="meta">' + pillLevel(p.level) +
    p.langs.map(function (l) { return '<span class="pill lang">' + (TRACKS[l] ? TRACKS[l].name : l) + '</span>'; }).join('') +
    '<span>⏱ about ' + p.minutes + ' min</span></div></div>';
  out += '<div class="proj-body"><p>' + p.description + '</p>';

  out += '<h2>What you\'ll practice</h2><ul class="learn-list">' +
    p.learn.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>';

  out += '<h2>Build it step by step</h2><div class="proj-steps">';
  p.steps.forEach(function (s) {
    out += '<div class="proj-step"><h3>' + esc(s.title) + '</h3><p>' + s.body + '</p>' +
      (s.code ? codeBlock(s.code.lang, s.code.code) : '') + '</div>';
  });
  out += '</div>';

  out += '<h2>Your workspace</h2><p class="muted small">The starter code is loaded below. Work through the steps here — press ▶ Run any time.</p>';
  var edId = 'ed' + (edCounter + 1); // editorView will create this id next
  out += editorView(Object.assign({ title: 'Project workspace', height: 340 }, p.starter));

  if (p.solution) {
    out += '<details class="reveal"><summary>Stuck? Show the full solution</summary><div class="reveal-body">';
    ['html', 'css', 'js', 'code'].forEach(function (k) {
      if (p.solution[k]) {
        var lang = k !== 'code' ? k
          : p.starter.mode === 'python' ? 'python'
          : p.starter.mode === 'sql' ? 'sql' : 'js';
        out += codeBlock(lang, p.solution[k]);
      }
    });
    out += '<button class="btn secondary small" type="button" data-load-solution>Load solution into the workspace</button>';
    out += '</div></details>';
  }

  if (p.extensions && p.extensions.length) {
    out += '<h2>Make it yours</h2><p class="muted small">Finished? Level it up with one of these:</p><ul>' +
      p.extensions.map(function (e) { return '<li>' + e + '</li>'; }).join('') + '</ul>';
  }

  var done = state.projects[p.id];
  out += '<div class="lesson-nav"><a class="btn secondary" href="#/projects">← All projects</a>' +
    '<button class="btn ' + (done ? 'green' : '') + '" type="button" data-proj-done>' +
    (done ? '✓ Project completed' : 'Mark project complete') + '</button></div></div>';

  onMount(function () {
    var loadBtn = $('[data-load-solution]');
    if (loadBtn) loadBtn.addEventListener('click', function () {
      var code = {};
      if (p.starter.mode === 'web') {
        ['html', 'css', 'js'].forEach(function (k) { if (p.solution[k] !== undefined) code[k] = p.solution[k]; });
      } else { code.code = p.solution.code; }
      setEditorCode(edId, code);
      runEditor(edId);
      toast('Solution loaded into the workspace');
      document.getElementById(edId).scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    $('[data-proj-done]').addEventListener('click', function () {
      state.projects[p.id] = !state.projects[p.id];
      persist();
      this.textContent = state.projects[p.id] ? '✓ Project completed' : 'Mark project complete';
      this.classList.toggle('green', !!state.projects[p.id]);
      if (state.projects[p.id]) toast('Project complete! 🏆');
    });
  });
  return out;
}

/* ---------------- Language Atlas ---------------- */

function viewAtlas() {
  var out = '<h1>🗺️ Language Atlas</h1>' +
    '<p class="muted">The tracks teach deeply; the Atlas travels widely. These are the other languages you\'ll meet in real software — what each one is, what it honestly looks like, what\'s famously built with it, and exactly how to start. Pass a page\'s mini-quiz to mark that language explored. Start anywhere; end with the map-reading lesson: <b>How to learn ANY language</b>.</p>';
  out += '<div class="resume-card"><p>📚 Hunting something rarer? The <b>Language Encyclopedia</b> catalogs <b>' + ENC.length + ' documented languages</b> — searchable, filterable, each linked to its closest relative here.</p><a class="btn" href="#/encyclopedia">Open the Encyclopedia</a></div>';
  out += '<div class="track-grid">' + ATLAS.map(function (a) {
    var done = state.done['atlas-' + a.id];
    return '<a class="track-card" style="--tc:var(--c-atlas)" href="#/atlas/' + a.id + '">' +
      '<h3><span class="track-icon" style="background:var(--c-atlas)">' + esc(a.icon) + '</span>' + esc(a.name) + (done ? ' <span class="pc-done">✓</span>' : '') + '</h3>' +
      '<div class="tagline">' + esc(a.tagline) + '</div>' +
      '<div class="track-meta"><span>' + (a.year ? 'born ' + a.year : 'the meta-skill') + '</span><span>' + (done ? 'explored ✓' : 'unexplored') + '</span></div></a>';
  }).join('') + '</div>';
  return out;
}

/* Shared page renderer for Atlas languages and Toolbox tools */
function renderGuide(a, opts) {
  var out = '<div class="breadcrumbs"><a href="#/">Home</a> / <a href="' + opts.backHref + '">' + opts.section + '</a> / ' + esc(a.name) + '</div>';
  out += '<div class="lesson-head"><h1><span class="track-icon" style="background:var(' + opts.color + ')">' + esc(a.icon) + '</span> ' + esc(a.name) + '</h1>' +
    '<div class="meta">' + (a.year ? '<span>born ' + a.year + '</span>' : '') +
    (a.creator ? '<span>created by ' + esc(a.creator) + '</span>' : '') + '</div>' +
    '<p class="muted" style="margin-top:8px"><b>' + esc(a.tagline) + '</b></p></div>';

  out += '<div class="lesson-body">';
  out += '<p>' + esc(a.pitch) + '</p>';

  if (a.uses && a.uses.length) {
    out += '<p class="small muted" style="margin-bottom:6px"><b>Where you\'ll meet it:</b></p>' +
      '<ul class="learn-list">' + a.uses.map(function (u) { return '<li>' + esc(u) + '</li>'; }).join('') + '</ul>';
  }

  out += '<h2>The look and feel</h2>';
  (a.samples || []).forEach(function (s) {
    out += '<h3>' + esc(s.title) + '</h3>' + codeBlock(s.lang, s.code);
    if (s.output) out += codeBlock('text', s.output);
  });

  if (a.demo) {
    out += '<h2>🕹️ Try it live</h2>' + editorView(Object.assign({ title: a.demo.title || 'Live demo' }, a.demo));
  }

  out += '<h2>Quick facts</h2><div style="overflow-x:auto"><table class="lesson-table"><tbody>' +
    a.facts.map(function (f) { return '<tr><td><b>' + f[0] + '</b></td><td>' + f[1] + '</td></tr>'; }).join('') +
    '</tbody></table></div>';

  if (a.famous && a.famous.length) {
    out += '<h2>Big things built with it</h2><ul>' +
      a.famous.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>';
  }

  out += '<h2>' + (opts.stepsTitle || 'Run it yourself') + '</h2><ol>' +
    a.firstSteps.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol>';

  if (a.related && a.related.length) {
    out += '<p class="small muted"><b>Sharpen the transferable skills first:</b> ' +
      a.related.map(function (t) {
        return TRACKS[t] ? '<a class="btn secondary small" style="margin-right:8px" href="#/track/' + t + '">' + TRACKS[t].name + ' track →</a>' : '';
      }).join('') + '</p>';
  }
  out += '</div>';

  out += '<h2>✅ Explorer check</h2>' + quizView({ id: opts.donePrefix + a.id, quiz: a.quiz });
  out += '<div class="lesson-nav"><a class="btn secondary" href="' + opts.backHref + '">← Back to ' + opts.section + '</a></div>';
  return out;
}

function viewAtlasLang(id) {
  var a = ATLAS.filter(function (x) { return x.id === id; })[0];
  if (!a) return viewNotFound();
  return renderGuide(a, { section: 'the Atlas', backHref: '#/atlas', donePrefix: 'atlas-', color: '--c-atlas' });
}

/* ---------------- Language Encyclopedia ---------------- */

var ENC_STATUS = {
  taught: ['Taught here', 'lv0'],
  active: ['Active', 'lang'],
  legacy: ['Legacy', 'lv1'],
  historic: ['Historic', 'lv2'],
  research: ['Research', ''],
  esolang: ['Esoteric', '']
};

var encFilter = { q: '', status: 'all' };

function encLearnLink(kin) {
  if (TRACKS[kin]) return '<a href="#/track/' + kin + '">' + esc(TRACKS[kin].name) + ' track</a>';
  var atl = ATLAS.filter(function (a) { return a.id === kin; })[0];
  if (atl) return '<a href="#/atlas/' + kin + '">' + esc(atl.name) + '</a>';
  return '<a href="#/atlas/polyglot">the method</a>';
}

function viewEncyclopedia(prefill) {
  if (prefill !== undefined) encFilter = { q: prefill || '', status: 'all' };

  var out = '<h1>📚 Language Encyclopedia</h1>' +
    '<p class="muted">The full catalog: <b>' + ENC.length + ' real, documented programming languages</b> — from 1945\'s pencil-and-paper Plankalkül to this decade\'s newest. Every entry links to its closest relative taught on this site, so any language here is a short hop from something you know. ' + esc(window.CT_ENC_NOTE || '') + '</p>' +
    '<p><a class="btn secondary small" href="#/atlas/polyglot">🗺️ The "learn ANY language" method →</a></p>';

  out += '<div class="filter-row">' +
    '<input id="enc-q" type="search" placeholder="Filter ' + ENC.length + ' languages…" value="' + esc(encFilter.q) + '" style="padding:7px 12px;border:1px solid var(--border);border-radius:8px;background:var(--bg-card);color:var(--text);font-family:inherit">' +
    ['all'].concat(Object.keys(ENC_STATUS)).map(function (s) {
      var label = s === 'all' ? 'All' : ENC_STATUS[s][0];
      return '<button type="button" class="chip' + (encFilter.status === s ? ' active' : '') + '" data-st="' + s + '">' + label + '</button>';
    }).join('') + '</div>';

  out += '<p class="small muted" id="enc-count"></p>';
  out += '<div style="overflow-x:auto"><table class="lesson-table" id="enc-table"><thead><tr>' +
    '<th>Language</th><th>Born</th><th>Family</th><th>Status</th><th>What it is</th><th>Learn via</th></tr></thead><tbody></tbody></table></div>';

  onMount(function () {
    var tbody = $('#enc-table tbody');
    var countEl = $('#enc-count');

    function renderRows() {
      var q = encFilter.q.trim().toLowerCase();
      var rows = ENC.filter(function (e) {
        if (encFilter.status !== 'all' && e[3] !== encFilter.status) return false;
        if (q && (e[0] + ' ' + e[2] + ' ' + e[4]).toLowerCase().indexOf(q) === -1) return false;
        return true;
      });
      countEl.textContent = 'Showing ' + rows.length + ' of ' + ENC.length + ' languages.';
      tbody.innerHTML = rows.map(function (e) {
        var st = ENC_STATUS[e[3]] || [e[3], ''];
        return '<tr><td><b>' + esc(e[0]) + '</b></td><td>' + (e[1] || '—') + '</td>' +
          '<td>' + esc(e[2]) + '</td>' +
          '<td><span class="pill ' + st[1] + '">' + st[0] + '</span></td>' +
          '<td>' + esc(e[4]) + '</td><td>' + encLearnLink(e[5]) + '</td></tr>';
      }).join('') || '<tr><td colspan="6" class="muted">Nothing matches — loosen the filters.</td></tr>';
    }

    $('#enc-q').addEventListener('input', function () {
      encFilter.q = this.value;
      renderRows();
    });
    $all('.filter-row .chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        encFilter.status = chip.dataset.st;
        $all('.filter-row .chip').forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
        renderRows();
      });
    });
    renderRows();
  });
  return out;
}

/* ---------------- Toolbox ---------------- */

function viewToolbox() {
  var out = '<h1>🧰 The Toolbox</h1>' +
    '<p class="muted">Code is half the job — the other half is the tools around it: the terminal you run things in, the editor you write in, git remembering every version, Docker shipping it, and the engines games are made of. Each guide: what it is, what using it actually looks like, and your first session. Pass a quiz to mark a tool explored.</p>';

  var groups = [['essential', '🔧 The essentials — every developer, every day'], ['engine', '🎮 Game engines & graphics'], ['guide', '🧭 Working smart']];
  groups.forEach(function (g) {
    var tools = TOOLBOX.filter(function (t) { return t.kind === g[0]; });
    if (!tools.length) return;
    out += '<div class="section-head"><h2>' + g[1] + '</h2></div><div class="track-grid">';
    tools.forEach(function (t) {
      var done = state.done['tool-' + t.id];
      out += '<a class="track-card" style="--tc:var(--c-tool)" href="#/toolbox/' + t.id + '">' +
        '<h3><span class="track-icon" style="background:var(--c-tool)">' + esc(t.icon) + '</span>' + esc(t.name) + (done ? ' <span class="pc-done">✓</span>' : '') + '</h3>' +
        '<div class="tagline">' + esc(t.tagline) + '</div>' +
        '<div class="track-meta"><span>' + (t.kind === 'engine' ? 'game engine' : 'core tool') + '</span><span>' + (done ? 'explored ✓' : 'unexplored') + '</span></div></a>';
    });
    out += '</div>';
  });
  return out;
}

function viewTool(id) {
  var t = TOOLBOX.filter(function (x) { return x.id === id; })[0];
  if (!t) return viewNotFound();
  return renderGuide(t, { section: 'the Toolbox', backHref: '#/toolbox', donePrefix: 'tool-', color: '--c-tool', stepsTitle: 'Your first session' });
}

/* ---------------- App Blueprints ---------------- */

function viewBlueprints() {
  var out = '<h1>🏗️ App Blueprints</h1>' +
    '<p class="muted">How the apps you use every day are actually built. Each blueprint tears one famous app-type down to its architecture, lets you <b>run a working miniature right on the page</b>, shows the real database design, names the genuinely hard problems — and hands you an MVP plan you can build with this site\'s skills.</p>';
  out += '<div class="proj-grid">';
  BLUEPRINTS.forEach(function (b) {
    var done = state.done['bp-' + b.id];
    out += '<a class="proj-card' + (done ? ' done-card' : '') + '" href="#/blueprint/' + b.id + '">' +
      '<div class="pc-meta">' + pillLevel(b.level) + (done ? '<span class="pc-done">✓ EXPLORED</span>' : '') + '</div>' +
      '<h3>' + b.icon + ' ' + esc(b.name) + '</h3>' +
      '<div class="blurb">' + esc(b.blurb) + '</div>' +
      '<div class="small muted">like: ' + esc(b.examples) + '</div></a>';
  });
  out += '</div>';
  return out;
}

function viewBlueprint(id) {
  var b = BLUEPRINTS.filter(function (x) { return x.id === id; })[0];
  if (!b) return viewNotFound();

  var out = '<div class="breadcrumbs"><a href="#/">Home</a> / <a href="#/blueprints">Blueprints</a> / ' + esc(b.name) + '</div>';
  out += '<div class="lesson-head"><h1>' + b.icon + ' ' + esc(b.name) + '</h1>' +
    '<div class="meta">' + pillLevel(b.level) + '<span>like: ' + esc(b.examples) + '</span></div></div>';

  out += '<div class="lesson-body">';
  out += '<p>' + esc(b.overview) + '</p>';

  out += '<h2>The machine, layer by layer</h2><div style="overflow-x:auto"><table class="lesson-table">' +
    '<thead><tr><th>Layer</th><th>Typical tech</th><th>What it does</th></tr></thead><tbody>' +
    b.layers.map(function (l) {
      return '<tr><td><b>' + l[0] + '</b></td><td>' + l[1] + '</td><td>' + l[2] + '</td></tr>';
    }).join('') + '</tbody></table></div>';

  out += '<h2>🕹️ A working miniature — live</h2><p class="muted small">A real, tiny version of the front end. Run it, use it, then read its code — every technique is from this site\'s tracks.</p>';
  out += editorView(Object.assign({ title: b.name + ' demo', height: 300 }, b.demo));

  out += '<h2>The data model</h2><p class="muted small">The heart of the backend — paste this into the <a href="#/playground">SQL playground</a> and run the queries for real.</p>';
  out += codeBlock('sql', b.schema);

  out += '<h2>Why it\'s genuinely hard at scale</h2><ul>' +
    b.hard.map(function (h) { return '<li>' + h + '</li>'; }).join('') + '</ul>';

  out += '<h2>🚀 Build your own MVP</h2><ol>' +
    b.mvp.map(function (m) { return '<li>' + m + '</li>'; }).join('') + '</ol>';
  out += '</div>';

  out += '<h2>✅ Architect check</h2>' + quizView({ id: 'bp-' + b.id, quiz: b.quiz });
  out += '<div class="lesson-nav"><a class="btn secondary" href="#/blueprints">← All blueprints</a></div>';
  return out;
}

/* ---------------- Playground ---------------- */

function viewPlayground() {
  var play = state.play || {};
  var out = '<h1>Playground</h1><p class="muted">A blank canvas — build whatever you want. Your code is saved in this browser every time you press Run.</p>';
  out += '<h2>Web (HTML + CSS + JS)</h2>';
  out += editorView({
    mode: 'web', title: 'Web playground', height: 320,
    html: play.html !== undefined ? play.html : '<h1>Hello, world!</h1>\n<p>Edit me and press Run.</p>\n<button id="btn">Click me</button>',
    css: play.css !== undefined ? play.css : 'body {\n  font-family: sans-serif;\n  padding: 20px;\n}\nbutton {\n  padding: 8px 16px;\n}',
    js: play.js !== undefined ? play.js : 'document.getElementById("btn").onclick = function () {\n  alert("Nice click!");\n};'
  });
  var webEdId = 'ed' + edCounter;
  out += '<h2>Python</h2>';
  out += editorView({
    mode: 'python', title: 'Python playground', height: 260,
    code: play.py !== undefined ? play.py : 'name = "world"\nfor i in range(3):\n    print(f"Hello, {name}! ({i + 1})")',
    expected: 'Hello, world! (1)\nHello, world! (2)\nHello, world! (3)'
  });
  var pyEdId = 'ed' + edCounter;
  out += '<h2>SQL</h2>';
  out += editorView({
    mode: 'sql', title: 'SQL playground', height: 240,
    code: play.sql !== undefined ? play.sql : "CREATE TABLE scores (name TEXT, points INTEGER);\nINSERT INTO scores VALUES ('Ada', 95), ('Sam', 82), ('Kim', 88);\n\nSELECT * FROM scores ORDER BY points DESC;",
    tables: 'This database starts empty — CREATE whatever you like.'
  });
  var sqlEdId = 'ed' + edCounter;

  onMount(function () {
    [webEdId, pyEdId, sqlEdId].forEach(function (eid) {
      $('.run-btn', document.getElementById(eid)).addEventListener('click', function () {
        var web = getEditorCode(webEdId), py = getEditorCode(pyEdId), sql = getEditorCode(sqlEdId);
        state.play = { html: web.html, css: web.css, js: web.js, py: py.code, sql: sql.code };
        persist();
      });
    });
  });
  return out;
}

/* ---------------- Adaptive challenge generator ---------------- */

var genArea = 'any';

function learnerTierFor(stack) {
  var trackIds = { web: ['html', 'css', 'website'], js: ['js', 'ts'], python: ['python'], sql: ['sql'], ai: ['ai', 'python'] }[stack] || [];
  var done = 0, total = 0;
  trackIds.forEach(function (id) {
    var t = TRACKS[id];
    if (t) {
      total += t.lessons.length;
      done += t.lessons.filter(function (l) { return state.done[l.id]; }).length;
    }
  });
  var ratio = total ? done / total : 0;
  var tier = ratio >= 0.6 ? 2 : ratio >= 0.25 ? 1 : 0;
  if (state.assess) {
    var key = stack === 'web' ? 'web' : stack === 'js' ? 'js' : 'python';
    var n = state.assess[key] || 0;
    tier = Math.max(tier, n >= 3 ? 2 : n === 2 ? 1 : 0);
  }
  return tier;
}

function generateBrief() {
  var G = window.CT_GENERATOR;
  if (!G) return null;
  var pool = G.templates.filter(function (t) { return genArea === 'any' || t.stack === genArea; });
  if (!pool.length) return null;
  var tmpl = pool[Math.floor(Math.random() * pool.length)];
  var theme = G.themes[Math.floor(Math.random() * G.themes.length)];
  var tier = learnerTierFor(tmpl.stack);
  var reqs = tmpl.base.slice();
  if (tier >= 1) reqs = reqs.concat(tmpl.tier2);
  if (tier >= 2) reqs = reqs.concat(tmpl.tier3);
  return { tmpl: tmpl, theme: theme, tier: tier, reqs: reqs };
}

function briefHTML(b) {
  var G = window.CT_GENERATOR;
  var out = '<div class="card" style="margin-top:16px">';
  out += '<div class="pc-meta" style="margin-bottom:8px">' + pillLevel(b.tier) +
    b.tmpl.langs.map(function (l) { return '<span class="pill lang">' + (TRACKS[l] ? TRACKS[l].name : l.toUpperCase()) + '</span>'; }).join('') + '</div>';
  out += '<h2 style="margin:0 0 6px">' + b.theme.emoji + ' ' + esc(b.theme.name.charAt(0).toUpperCase() + b.theme.name.slice(1)) + ' — ' + esc(b.tmpl.kind) + '</h2>';
  out += '<p>' + esc(b.tmpl.brief.replace(/\{theme\}/g, b.theme.name)) + ' <span class="muted small">(Flavor it with ' + esc(b.theme.flavor) + '.)</span></p>';

  out += '<h3>Requirements <span class="muted small">(' + b.reqs.length + ' — scaled to your progress)</span></h3><ul style="padding-left:0;list-style:none">';
  b.reqs.forEach(function (r) {
    out += '<li style="margin-bottom:6px"><label style="cursor:pointer"><input type="checkbox" style="margin-right:8px">' + esc(r) + '</label></li>';
  });
  out += '</ul>';

  if (b.tier < 2) {
    out += '<p class="small muted">🔒 This brief has harder requirement tiers — finish more lessons in the related tracks (or ace the skill check) and regenerate to unlock them.</p>';
  }

  out += '<details class="reveal"><summary>Stretch goals (optional spice)</summary><div class="reveal-body"><ul>' +
    b.tmpl.stretch.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></div></details>';

  out += '<details class="reveal"><summary>How to approach it</summary><div class="reveal-body"><ol>' +
    G.approach.map(function (a) { return '<li>' + esc(a) + '</li>'; }).join('') + '</ol></div></details>';

  out += '<details class="reveal"><summary>If you get stuck</summary><div class="reveal-body"><ul>' +
    G.stuck.map(function (s) { return '<li>' + s + '</li>'; }).join('') +
    '</ul><p class="small muted">Also: the <a href="#/reference/debugging">Debugging cheat sheet</a> decodes every common error.</p></div></details>';

  out += '<p style="margin-top:12px"><a class="btn secondary small" href="#/playground">Open the Playground to build it →</a></p>';
  out += '</div>';
  return out;
}

function viewGenerator() {
  var out = '<h1>🎲 Challenge generator</h1>' +
    '<p class="muted">Infinite custom projects, sized to you. The generator reads your progress — the further you get in the tracks, the more requirements each brief demands. Come back after every few lessons and the same button deals harder cards.</p>';

  var areas = [['any', 'Surprise me'], ['web', 'Web page (HTML+CSS)'], ['js', 'JS app'], ['python', 'Python'], ['sql', 'SQL'], ['ai', 'AI / ML']];
  out += '<div class="filter-row">' + areas.map(function (a) {
    return '<button type="button" class="chip' + (genArea === a[0] ? ' active' : '') + '" data-area="' + a[0] + '">' + a[1] + '</button>';
  }).join('') + '</div>';

  out += '<button class="btn" type="button" id="gen-btn">Generate a challenge</button>';
  out += '<div id="gen-out"></div>';

  onMount(function () {
    $all('.filter-row .chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        genArea = chip.dataset.area;
        $all('.filter-row .chip').forEach(function (c) { c.classList.remove('active'); });
        chip.classList.add('active');
      });
    });
    $('#gen-btn').addEventListener('click', function () {
      var b = generateBrief();
      if (b) {
        $('#gen-out').innerHTML = briefHTML(b);
        $('#gen-btn').textContent = 'Deal me another';
      }
    });
  });
  return out;
}

/* ---------------- Assessment ---------------- */

var ASSESS_QS = [
  { area: 'web', q: 'What is HTML used for?', options: ['Styling how a page looks', 'Describing the structure and content of a page', 'Adding interactive behavior', 'Storing data on a server'], a: 1 },
  { area: 'web', q: 'Which HTML tag makes the biggest heading?', options: ['<code>&lt;head&gt;</code>', '<code>&lt;h6&gt;</code>', '<code>&lt;h1&gt;</code>', '<code>&lt;title&gt;</code>'], a: 2 },
  { area: 'web', q: 'In CSS, which line makes text red?', options: ['<code>text: red;</code>', '<code>color: red;</code>', '<code>font-color: red;</code>', '<code>paint: red;</code>'], a: 1 },
  { area: 'js', q: 'In JavaScript, which keyword declares a variable whose value can change?', options: ['<code>const</code>', '<code>let</code>', '<code>static</code>', '<code>define</code>'], a: 1 },
  { area: 'js', q: 'What does <code>console.log("Hi")</code> do?', options: ['Shows a popup with "Hi"', 'Writes "Hi" onto the page', 'Prints "Hi" to the browser console', 'Saves "Hi" to a file'], a: 2 },
  { area: 'js', q: 'What is the result of <code>"2" + 2</code> in JavaScript?', options: ['<code>4</code>', '<code>"22"</code>', '<code>22</code>', 'An error'], a: 1 },
  { area: 'python', q: 'How do you display text in Python?', options: ['<code>echo("Hello")</code>', '<code>console.log("Hello")</code>', '<code>show "Hello"</code>', '<code>print("Hello")</code>'], a: 3 },
  { area: 'python', q: 'Which symbol starts a comment in Python?', options: ['<code>//</code>', '<code>#</code>', '<code>&lt;!--</code>', '<code>/*</code>'], a: 1 },
  { area: 'python', q: 'What does <code>len("code")</code> return?', options: ['<code>3</code>', '<code>4</code>', '<code>"code"</code>', 'An error'], a: 1 }
];

var assessState = null;

function viewAssessment() {
  assessState = { i: 0, score: { web: 0, js: 0, python: 0 }, answered: false };
  var out = '<h1>Find your level</h1><p class="muted">Nine quick questions — three each about web pages, JavaScript and Python. It\'s fine (expected!) to not know answers. Guessing is allowed; "no idea" just means you\'ll start at the beginning, which is a great place to start.</p>';
  out += '<div class="card" id="assess-card"></div>';
  out += '<p class="center" style="margin-top:14px"><a class="small muted" href="#/" id="assess-skip">I\'m completely new — skip this and start me at Beginner</a></p>';
  onMount(function () {
    renderAssessQ();
    $('#assess-skip').addEventListener('click', function () {
      state.assess = { web: 0, js: 0, python: 0 };
      persist();
    });
  });
  return out;
}

function renderAssessQ() {
  var card = $('#assess-card');
  var i = assessState.i;
  if (i >= ASSESS_QS.length) { renderAssessResult(card); return; }
  var q = ASSESS_QS[i];
  var html = '<div class="assess-progress">Question ' + (i + 1) + ' of ' + ASSESS_QS.length + '</div>' +
    '<div class="qq-text" style="font-weight:600;margin-bottom:12px">' + q.q + '</div><div class="quiz-opts">';
  q.options.forEach(function (opt, oi) {
    html += '<button type="button" class="quiz-opt" data-o="' + oi + '">' + opt + '</button>';
  });
  html += '<button type="button" class="quiz-opt" data-o="-1" style="color:var(--text-faint)">🤷 No idea yet</button></div>';
  card.innerHTML = html;
  $all('.quiz-opt', card).forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (+btn.dataset.o === q.a) assessState.score[q.area]++;
      assessState.i++;
      renderAssessQ();
    });
  });
}

function renderAssessResult(card) {
  state.assess = assessState.score;
  persist();
  var areas = [
    { key: 'web', name: 'Web pages (HTML & CSS)', tracks: ['html', 'css', 'website'] },
    { key: 'js', name: 'JavaScript', tracks: ['js'] },
    { key: 'python', name: 'Python', tracks: ['python'] }
  ];
  var html = '<h2>Your starting points</h2><p class="muted small">Nothing is locked — these are just good places to begin.</p>';
  areas.forEach(function (a) {
    var n = state.assess[a.key];
    var lv = n >= 3 ? 2 : n === 2 ? 1 : 0;
    html += '<div class="assess-result-card"><h3>' + esc(a.name) + ' ' + pillLevel(lv) + '</h3>' +
      '<p class="small muted">You answered ' + n + '/3 correctly → start at <b>' + LEVEL_NAMES[lv] + '</b>.</p><p>' +
      a.tracks.map(function (t) {
        return '<a class="btn secondary small" style="margin-right:8px" href="#/track/' + t + '">' + TRACKS[t].name + ' track →</a>';
      }).join('') + '</p></div>';
  });
  html += '<p style="margin-top:14px"><a class="btn" href="#/">Take me to my dashboard</a></p>';
  card.innerHTML = html;
  toast('Skill check saved ✓');
}

/* ---------------- Reference ---------------- */

function viewReference(sheetId) {
  var current = REFERENCE.filter(function (s) { return s.id === sheetId; })[0] || REFERENCE[0];
  var out = '<h1>Reference</h1><p class="muted">Quick cheat sheets — for when you know what you want but forget how to spell it.</p>';
  out += '<div class="ref-tabs">' + REFERENCE.map(function (s) {
    return '<a class="chip' + (s.id === current.id ? ' active' : '') + '" href="#/reference/' + s.id + '">' + esc(s.title) + '</a>';
  }).join('') + '</div>';

  if (current.glossary) {
    current.glossary.forEach(function (g) {
      out += '<div class="glossary-term"><b>' + esc(g.term) + '</b> — ' + g.def + '</div>';
    });
  }
  (current.sections || []).forEach(function (sec) {
    out += '<div class="ref-section"><h2>' + esc(sec.title) + '</h2>' +
      '<div style="overflow-x:auto"><table class="ref-table"><tbody>' +
      sec.items.map(function (it) {
        return '<tr><td>' + esc(it.code) + '</td><td>' + it.desc + '</td></tr>';
      }).join('') + '</tbody></table></div></div>';
  });
  return out;
}

function viewNotFound() {
  return '<div class="center" style="padding:60px 0"><h1>Page not found</h1><p class="muted">That link doesn\'t go anywhere.</p><a class="btn" href="#/">Back home</a></div>';
}

/* ---------------- Search ---------------- */

var searchIndex = null;

function blockText(blocks) {
  return blocks.map(function (b) {
    if (b.t === 'p' || b.t === 'tip' || b.t === 'warn') return b.html.replace(/<[^>]+>/g, ' ');
    if (b.t === 'h' || b.t === 'h3') return b.text;
    if (b.t === 'ul' || b.t === 'ol') return b.items.join(' ').replace(/<[^>]+>/g, ' ');
    return '';
  }).join(' ');
}

function buildSearchIndex() {
  if (searchIndex) return searchIndex;
  searchIndex = [];
  allTracks().forEach(function (t) {
    t.lessons.forEach(function (l, i) {
      searchIndex.push({
        kind: t.name, title: l.title, href: '#/lesson/' + t.id + '/' + i,
        text: (l.title + ' ' + blockText(l.blocks)).toLowerCase()
      });
    });
  });
  PROJECTS.forEach(function (p) {
    searchIndex.push({ kind: 'Project', title: p.title, href: '#/project/' + p.id, text: (p.title + ' ' + p.blurb).toLowerCase() });
  });
  REFERENCE.forEach(function (s) {
    searchIndex.push({ kind: 'Reference', title: s.title, href: '#/reference/' + s.id, text: s.title.toLowerCase() });
  });
  ATLAS.forEach(function (a) {
    searchIndex.push({
      kind: 'Language', title: a.name, href: '#/atlas/' + a.id,
      text: (a.name + ' ' + a.tagline + ' ' + a.pitch + ' ' + a.uses.join(' ') + ' ' + a.famous.join(' ')).toLowerCase()
    });
  });
  TOOLBOX.forEach(function (t) {
    searchIndex.push({
      kind: 'Tool', title: t.name, href: '#/toolbox/' + t.id,
      text: (t.name + ' ' + t.tagline + ' ' + t.pitch + ' ' + (t.uses || []).join(' ') + ' ' + (t.famous || []).join(' ')).toLowerCase()
    });
  });
  BLUEPRINTS.forEach(function (b) {
    searchIndex.push({
      kind: 'Blueprint', title: b.name, href: '#/blueprint/' + b.id,
      text: (b.name + ' ' + b.examples + ' ' + b.blurb + ' ' + b.overview).toLowerCase()
    });
  });
  ENC.forEach(function (e) {
    searchIndex.push({
      kind: 'Encyclopedia', title: e[0], href: '#/encyclopedia/' + encodeURIComponent(e[0]),
      text: (e[0] + ' ' + e[2] + ' ' + e[4]).toLowerCase()
    });
  });
  return searchIndex;
}

function doSearch(q) {
  var resEl = $('#search-results');
  q = q.trim().toLowerCase();
  if (q.length < 2) { resEl.hidden = true; return; }
  var hits = buildSearchIndex().filter(function (e) { return e.text.indexOf(q) !== -1; }).slice(0, 12);
  if (!hits.length) {
    resEl.innerHTML = '<div class="search-empty">Nothing found for “' + esc(q) + '”.</div>';
  } else {
    resEl.innerHTML = hits.map(function (h) {
      var i = h.text.indexOf(q);
      var snip = h.text.slice(Math.max(0, i - 30), i + 50);
      return '<a href="' + h.href + '"><span class="sr-kind">' + esc(h.kind) + '</span>' + esc(h.title) +
        '<span class="sr-snip">…' + esc(snip) + '…</span></a>';
    }).join('');
  }
  resEl.hidden = false;
}

/* ---------------- Router ---------------- */

function renderRoute() {
  var hash = location.hash.replace(/^#\/?/, '');
  var parts = hash.split('/').filter(Boolean).map(decodeURIComponent);
  var view;
  EDITORS = {};
  MOUNTQ = [];

  switch (parts[0] || '') {
    case '': view = viewHome(); break;
    case 'track': view = viewTrack(parts[1]); break;
    case 'lesson': view = viewLesson(parts[1], parts[2]); break;
    case 'projects': view = viewProjects(); break;
    case 'project': view = viewProject(parts[1]); break;
    case 'playground': view = viewPlayground(); break;
    case 'generate': view = viewGenerator(); break;
    case 'practice': view = parts[1] ? viewExercise(parts[1]) : viewPractice(); break;
    case 'review': view = viewReview(); break;
    case 'journey': view = viewJourney(); break;
    case 'achievements': view = viewAchievements(); break;
    case 'atlas': view = parts[1] ? viewAtlasLang(parts[1]) : viewAtlas(); break;
    case 'encyclopedia': view = viewEncyclopedia(parts[1]); break;
    case 'toolbox': view = parts[1] ? viewTool(parts[1]) : viewToolbox(); break;
    case 'blueprints': view = viewBlueprints(); break;
    case 'blueprint': view = viewBlueprint(parts[1]); break;
    case 'assessment': view = viewAssessment(); break;
    case 'reference': view = viewReference(parts[1]); break;
    default: view = viewNotFound();
  }

  $('#app').innerHTML = view;
  MOUNTQ.forEach(function (fn) { fn(); });
  MOUNTQ = [];

  var navKey = { '': 'home', track: 'home', lesson: 'home', assessment: 'home', projects: 'projects', project: 'projects', generate: 'projects', playground: 'playground', atlas: 'atlas', encyclopedia: 'atlas', toolbox: 'toolbox', blueprints: 'blueprints', blueprint: 'blueprints', practice: 'practice', review: 'practice', journey: 'practice', achievements: 'practice', reference: 'reference' }[parts[0] || ''];
  $all('#topnav a').forEach(function (a) {
    a.classList.toggle('active', a.dataset.nav === navKey);
  });
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', renderRoute);

/* ---------------- Global wiring ---------------- */

document.addEventListener('click', function (e) {
  var btn = e.target.closest('.copy-btn');
  if (btn) {
    var code = btn.closest('.codeblock').querySelector('pre').textContent;
    var done = function () {
      btn.textContent = 'Copied ✓';
      setTimeout(function () { btn.textContent = 'Copy'; }, 1500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(done, function () { fallbackCopy(code); done(); });
    } else { fallbackCopy(code); done(); }
  }
});

function fallbackCopy(text) {
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); } catch (e) {}
  document.body.removeChild(ta);
}

$('#theme-toggle').addEventListener('click', function () {
  var cur = document.documentElement.getAttribute('data-theme');
  state.theme = cur === 'dark' ? 'light' : 'dark';
  persist();
  applyTheme();
});

var searchInput = $('#search-input');
var searchTimer = null;
searchInput.addEventListener('input', function () {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(function () { doSearch(searchInput.value); }, 120);
});
searchInput.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') { $('#search-results').hidden = true; searchInput.blur(); }
});
document.addEventListener('click', function (e) {
  if (!e.target.closest('.search-wrap')) $('#search-results').hidden = true;
});
$('#search-results').addEventListener('click', function (e) {
  if (e.target.closest('a')) { $('#search-results').hidden = true; searchInput.value = ''; }
});

var backupBtn = $('#backup-progress');
if (backupBtn) backupBtn.addEventListener('click', function (e) {
  e.preventDefault();
  downloadFile('code-teacher-progress.json', JSON.stringify(state, null, 2), 'application/json');
  toast('Progress backed up — keep that file safe!');
});

var restoreBtn = $('#restore-progress');
var restoreFile = $('#restore-file');
if (restoreBtn && restoreFile) {
  restoreBtn.addEventListener('click', function (e) {
    e.preventDefault();
    restoreFile.click();
  });
  restoreFile.addEventListener('change', function () {
    var file = restoreFile.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = JSON.parse(reader.result);
        if (!data || typeof data !== 'object' || !data.done) throw new Error('not a progress file');
        if (!confirm('Restore progress from "' + file.name + '"? This replaces your current progress on this browser.')) return;
        state = Object.assign({
          done: {}, quiz: {}, projects: {}, practice: {}, review: {},
          assess: null, theme: state.theme, last: null, play: null, meta: null, seenBadges: []
        }, data);
        persist();
        renderRoute();
        toast('Progress restored ✓');
      } catch (err) {
        toast('That file isn\'t a Code Teacher backup.');
      }
      restoreFile.value = '';
    };
    reader.readAsText(file);
  });
}

$('#reset-progress').addEventListener('click', function (e) {
  e.preventDefault();
  if (confirm('Reset ALL progress? This clears completed lessons, quiz scores, project completions, exercises, reviews, badges and the skill check. This cannot be undone. (Consider "Backup progress" first!)')) {
    state = { done: {}, quiz: {}, projects: {}, practice: {}, review: {}, assess: null, theme: state.theme, last: null, play: null, meta: null, seenBadges: [] };
    persist();
    location.hash = '#/';
    renderRoute();
    toast('Progress reset');
  }
});

/* ---------------- Boot ---------------- */

applyTheme();
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
    if (!state.theme) applyTheme();
  });
}
trackStreak();
renderRoute();

})();
