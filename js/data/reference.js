/* ============================================================
   Reference — cheat sheets & glossary
   Shape: { id, title, sections: [{title, items: [{code, desc}]}], glossary?: [{term, def}] }
   ============================================================ */
window.CT_REFERENCE = [

  {
    id: 'html', title: 'HTML',
    sections: [
      { title: 'Page skeleton', items: [
        { code: '<!doctype html>\n<html>\n  <head>\n    <meta charset="utf-8">\n    <title>Title</title>\n  </head>\n  <body>...</body>\n</html>', desc: 'The minimal valid page. Content goes in the body; info about the page in the head.' }
      ] },
      { title: 'Text', items: [
        { code: '<h1> … <h6>', desc: 'Headings, biggest to smallest. One h1 per page; don\'t skip levels.' },
        { code: '<p>', desc: 'A paragraph.' },
        { code: '<strong> / <em>', desc: 'Important (bold) / stressed (italic).' },
        { code: '<br> / <hr>', desc: 'Line break / horizontal divider. No closing tags.' },
        { code: '<!-- note -->', desc: 'A comment — invisible on the page.' }
      ] },
      { title: 'Lists & tables', items: [
        { code: '<ul><li>…</li></ul>', desc: 'Bulleted list.' },
        { code: '<ol><li>…</li></ol>', desc: 'Numbered list.' },
        { code: '<table><tr><th>…</th></tr>\n<tr><td>…</td></tr></table>', desc: 'Table: rows (tr) of header (th) or data (td) cells.' }
      ] },
      { title: 'Links, images & media', items: [
        { code: '<a href="https://…">text</a>', desc: 'A link. href="#id" scrolls to an element on this page; "mailto:…" opens email.' },
        { code: '<img src="pic.jpg" alt="description">', desc: 'An image. ALWAYS write the alt text.' },
        { code: '<video src="v.mp4" controls>', desc: 'Video player. Also <audio>. autoplay needs muted.' },
        { code: '<iframe src="…" title="…">', desc: 'Another page embedded in yours.' }
      ] },
      { title: 'Structure & forms', items: [
        { code: '<header> <nav> <main>\n<section> <article> <aside> <footer>', desc: 'Semantic regions — same as div, but meaningful.' },
        { code: '<div> / <span>', desc: 'Generic block / inline containers, for when nothing semantic fits.' },
        { code: '<input type="text|number|checkbox|radio|date|color|range">', desc: 'The form chameleon.' },
        { code: '<label for="x">…</label>\n<input id="x">', desc: 'Every input needs a connected label.' },
        { code: '<select><option>…</option></select>\n<textarea></textarea>\n<button>…</button>', desc: 'Dropdown, multi-line text, button.' }
      ] }
    ]
  },

  {
    id: 'css', title: 'CSS',
    sections: [
      { title: 'Syntax & selectors', items: [
        { code: 'selector {\n  property: value;\n}', desc: 'The universal shape of every rule.' },
        { code: 'p  /  .card  /  #header', desc: 'By tag / by class (many) / by id (one).' },
        { code: '.card p', desc: 'Descendant: paragraphs inside .card.' },
        { code: 'a:hover  /  li:first-child\n:nth-child(odd)', desc: 'State and position pseudo-classes.' },
        { code: 'h1, h2, .title', desc: 'A comma = a list of selectors sharing the rule.' }
      ] },
      { title: 'Text & color', items: [
        { code: 'color: #ff9900;\nbackground: hsl(28, 100%, 50%);', desc: 'Named, hex, rgb() and hsl() all work.' },
        { code: 'font-size: 1.2rem;\nfont-family: Georgia, serif;\nfont-weight: bold;', desc: 'rem scales with user settings — prefer it for text.' },
        { code: 'text-align: center;\nline-height: 1.6;\ntext-decoration: none;', desc: 'Alignment, line spacing, removing underlines.' }
      ] },
      { title: 'Box model', items: [
        { code: 'padding: 16px;      /* inside */\nborder: 2px solid #333;\nmargin: 16px;       /* outside */', desc: 'The three layers around content.' },
        { code: 'margin: 0 auto;\nmax-width: 640px;', desc: 'The classic centered content column.' },
        { code: 'border-radius: 12px;\nbox-shadow: 0 4px 12px rgba(0,0,0,.15);', desc: 'Rounded corners and drop shadows.' },
        { code: '* { box-sizing: border-box; }', desc: 'Make width include padding+border. Use always.' }
      ] },
      { title: 'Layout', items: [
        { code: 'display: flex;\ngap: 12px;\njustify-content: space-between;\nalign-items: center;', desc: 'Flexbox: one-dimensional rows/columns.' },
        { code: 'display: grid;\ngrid-template-columns:\n  repeat(auto-fit, minmax(150px, 1fr));', desc: 'Grid: two dimensions. This line = responsive gallery.' },
        { code: 'position: relative | absolute\n| fixed | sticky;', desc: 'Nudge, pin to parent, pin to screen, stick on scroll.' },
        { code: '@media (min-width: 700px) { … }', desc: 'Styles that apply only on wider screens (mobile-first).' }
      ] },
      { title: 'Motion & variables', items: [
        { code: 'transition: transform .2s;\ntransform: translateY(-3px) scale(1.05);', desc: 'Smooth property changes; GPU-friendly movement.' },
        { code: '@keyframes spin { to { transform: rotate(360deg); } }\nanimation: spin 1s linear infinite;', desc: 'Self-running animation.' },
        { code: ':root { --brand: #6c4ab6; }\ncolor: var(--brand);', desc: 'Variables: define once, use everywhere, retheme instantly.' }
      ] }
    ]
  },

  {
    id: 'js', title: 'JavaScript',
    sections: [
      { title: 'Basics', items: [
        { code: 'const x = 5;   let y = "hi";', desc: 'const = can\'t reassign (default choice); let = can.' },
        { code: '`Hello ${name}, you are ${age}`', desc: 'Template literal — backticks with live slots.' },
        { code: 'if (a === b) { … } else if (…) { … } else { … }', desc: 'Always triple equals.' },
        { code: 'for (let i = 0; i < 10; i++) { … }\nfor (const item of list) { … }\nwhile (condition) { … }', desc: 'Counting loop, items loop, condition loop.' },
        { code: 'function f(a, b) { return a + b; }\nconst g = (a, b) => a + b;', desc: 'Function and arrow function.' }
      ] },
      { title: 'Arrays & objects', items: [
        { code: 'arr.push(x)  arr.pop()\narr.includes(x)  arr.length', desc: 'Add/remove at end, membership, size.' },
        { code: 'arr.map(x => x * 2)\narr.filter(x => x > 5)\narr.reduce((a, b) => a + b)', desc: 'Transform / keep some / boil to one value.' },
        { code: 'const user = { name: "Sam", age: 25 };\nuser.name   user["age"]', desc: 'Objects: labeled data.' },
        { code: 'const { name, age } = user;\nconst copy = { ...user, age: 26 };', desc: 'Destructuring and spread.' },
        { code: 'JSON.stringify(obj)\nJSON.parse(text)', desc: 'Object ↔ text, for storage and networks.' }
      ] },
      { title: 'DOM & events', items: [
        { code: 'document.querySelector(".card")\ndocument.querySelectorAll("li")', desc: 'Find first / all matching elements (CSS selectors).' },
        { code: 'el.textContent = "hi";\nel.classList.toggle("dark");\nel.style.color = "red";', desc: 'Change text, classes, inline styles.' },
        { code: 'const li = document.createElement("li");\nparent.appendChild(li);\nel.remove();', desc: 'Create, insert, delete elements.' },
        { code: 'el.addEventListener("click", (e) => { … });', desc: 'React to events: click, input, submit, keydown…' },
        { code: 'event.preventDefault();\nevent.target.value', desc: 'Stop default form submits; read the field that fired.' }
      ] },
      { title: 'Time, storage & network', items: [
        { code: 'setTimeout(fn, 1000)\nsetInterval(fn, 1000)\nclearInterval(id)', desc: 'Run later / repeatedly / stop repeating.' },
        { code: 'localStorage.setItem("key", value)\nlocalStorage.getItem("key")', desc: 'Tiny permanent storage in the browser (strings only — JSON helps).' },
        { code: 'const res = await fetch(url);\nconst data = await res.json();', desc: 'Load data from an API (inside an async function).' },
        { code: 'try { … } catch (err) { … }', desc: 'Handle failures gracefully.' }
      ] }
    ]
  },

  {
    id: 'python', title: 'Python',
    sections: [
      { title: 'Basics', items: [
        { code: 'x = 5\nname = "Sam"\nprint(f"{name} is {x}")', desc: 'Variables need no keyword; f-strings for output.' },
        { code: 'if a == b:\n    ...\nelif a > b:\n    ...\nelse:\n    ...', desc: 'Colons + 4-space indentation ARE the syntax.' },
        { code: 'for i in range(10):\nfor item in my_list:\nwhile condition:', desc: 'range(n) = 0 to n-1.' },
        { code: 'def f(a, b=10):\n    """What it does."""\n    return a + b', desc: 'Functions: def, optional defaults, docstring, return.' },
        { code: 'a and b   a or b   not a\n13 <= age <= 19', desc: 'Logic words, and chained comparisons.' }
      ] },
      { title: 'Collections', items: [
        { code: 'lst = [1, 2, 3]\nlst.append(x)  lst[0]  lst[-1]\nlen(lst)  sum(lst)  sorted(lst)', desc: 'Lists: ordered, changeable.' },
        { code: '[n * 2 for n in nums if n > 3]', desc: 'List comprehension: map + filter in one line.' },
        { code: 'd = {"name": "Sam"}\nd["name"]   d.get("x", default)\nfor k, v in d.items():', desc: 'Dictionaries: labeled data.' },
        { code: 'counts[w] = counts.get(w, 0) + 1', desc: 'The dict-counter pattern — memorize it.' },
        { code: 's.upper()  s.strip()  s.split(",")\n", ".join(parts)   "x" in s', desc: 'String toolbox.' }
      ] },
      { title: 'Bigger structures', items: [
        { code: 'class Pet:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        print(self.name)', desc: 'Classes: __init__ constructs; self = this object.' },
        { code: 'try:\n    risky()\nexcept ValueError:\n    handle()', desc: 'Catch specific exceptions; read tracebacks bottom-up.' },
        { code: 'import random, math, json\nrandom.choice(lst)  math.sqrt(x)\njson.dumps(d)  json.loads(text)', desc: 'The standard library — batteries included.' },
        { code: 'with open("f.txt", "w") as f:\n    f.write("hi")', desc: 'Files: with guarantees closing.' }
      ] }
    ]
  },

  {
    id: 'ai', title: 'AI & ML',
    sections: [
      { title: 'Core ideas', items: [
        { code: 'output = activation(Σ inputs·weights + bias)', desc: 'One neuron. Networks are layers of these.' },
        { code: 'error = target - prediction\nw += lr * error * input', desc: 'The perceptron learning rule: nudge weights by their blame.' },
        { code: 'loss → gradient → step downhill → repeat', desc: 'Gradient descent — how every network trains, GPT included.' },
        { code: 'forward pass → loss →\nbackward pass (backprop) → update', desc: 'The universal training loop.' },
        { code: 'sigmoid: 0..1   ReLU: max(0, x)\nsoftmax: probabilities summing to 1', desc: 'The activation functions you\'ll meet daily.' }
      ] },
      { title: 'Practice', items: [
        { code: 'train set (~80%) / test set (~20%)', desc: 'Only test-set scores are honest. Training scores flatter.' },
        { code: 'overfitting', desc: 'Memorized the training data; fails on new data. Cure: more data, simpler model, stop earlier.' },
        { code: 'hyperparameters', desc: 'The settings YOU pick: learning rate, layers, epochs. Weights are learned; these aren\'t.' },
        { code: 'X @ W + b', desc: 'A whole layer as one matrix multiply (numpy). Shape-tracking is the debugging skill.' }
      ] },
      { title: 'The zoo', items: [
        { code: 'CNN', desc: 'Sliding filters over images: edges → shapes → objects. Vision.' },
        { code: 'RNN / LSTM', desc: 'Reads sequences step by step with a memory. Speech, time series.' },
        { code: 'Transformer', desc: 'Attention: every token looks at every other. GPT, Claude, translation — modern language AI.' },
        { code: 'GAN / diffusion', desc: 'Image generators: forger-vs-detective duels / learned de-noising.' },
        { code: 'PyTorch / TensorFlow / TF.js', desc: 'The frameworks: autograd + GPUs. loss.backward() = backprop for free.' }
      ] }
    ]
  },

  {
    id: 'debugging', title: 'Debugging',
    sections: [
      { title: 'The 5-step method (works in every language)', items: [
        { code: '1. READ the error', desc: 'Twice. It names the problem and the line number. The editors on this site add plain-English hints under errors.' },
        { code: '2. PRINT the suspect', desc: 'console.log / print the variable just before the crash. It almost never contains what you assumed.' },
        { code: '3. SHRINK the problem', desc: 'Comment out half the code. Bug still there? Other half. Repeat — 7 halvings corners anything.' },
        { code: '4. EXPLAIN it out loud', desc: 'Line by line, to a rubber duck if needed. Bugs surrender mid-sentence with embarrassing regularity.' },
        { code: '5. TAKE the walk', desc: 'Genuinely stuck 30+ minutes? Step away. The shower/walk fix is real neuroscience, not myth.' }
      ] },
      { title: 'JavaScript errors decoded', items: [
        { code: 'x is not defined', desc: 'Typo in a name, or using a variable before creating it.' },
        { code: 'x is not a function', desc: 'You called something that isn\'t callable — usually a misspelled method (.fliter).' },
        { code: 'Cannot read properties of undefined', desc: 'a.b.c where a.b came back empty. Log the chain piece by piece.' },
        { code: 'Unexpected token', desc: 'Syntax slip: unclosed bracket/quote, stray comma. Look at the line BEFORE too.' },
        { code: 'Assignment to constant variable', desc: 'You reassigned a const. Use let if it must change.' }
      ] },
      { title: 'Python errors decoded', items: [
        { code: 'NameError', desc: 'Typo\'d or not-yet-created variable.' },
        { code: 'TypeError', desc: 'Mixing types: "7" + 1. Convert with int() / str().' },
        { code: 'ValueError', desc: 'Right type, impossible value: int("hello").' },
        { code: 'IndexError / KeyError', desc: 'List index past the end / dict key that doesn\'t exist (use .get()).' },
        { code: 'IndentationError', desc: 'Inconsistent indenting. Pick 4 spaces, never mix with tabs.' },
        { code: 'read tracebacks BOTTOM-UP', desc: 'Last line = what went wrong. Lines above = where.' }
      ] }
    ]
  },

  {
    id: 'glossary', title: 'Glossary',
    glossary: [
      { term: 'Algorithm', def: 'A precise recipe of steps for solving a problem. Code is algorithms written for computers.' },
      { term: 'API', def: 'A way for programs to talk to each other — often a URL that returns data (JSON) instead of a web page.' },
      { term: 'Backprop(agation)', def: 'The algorithm that tells every weight in a neural network how it contributed to an error, so all can improve.' },
      { term: 'Boolean', def: 'A true/false value. The fuel of every if-statement.' },
      { term: 'Bug', def: 'Any way code misbehaves. Named after an actual moth found in a 1947 computer. Debugging = hunting them.' },
      { term: 'Client / Server', def: 'The asker and the answerer. Your browser (client) requests; a computer somewhere (server) responds with files or data.' },
      { term: 'Framework', def: 'A big pre-built structure you write your code inside (React, Django) — someone else\'s architecture, your logic.' },
      { term: 'Function', def: 'A named, reusable piece of program with inputs and (usually) an output.' },
      { term: 'Git / GitHub', def: 'Git records every version of your code so nothing is ever lost; GitHub hosts those histories online for sharing.' },
      { term: 'JSON', def: 'Data written as text — objects/dicts and arrays/lists — so any language or network can pass it around.' },
      { term: 'Library / Package', def: 'Ready-made code you pull in (import) instead of writing yourself. Python\'s pip and JS\'s npm are the stores.' },
      { term: 'Loop', def: 'Code that repeats — a fixed number of times (for) or until something changes (while).' },
      { term: 'Neural network', def: 'A function made of layered "neurons" with adjustable weights, trained by gradient descent to turn inputs into useful outputs.' },
      { term: 'Refactoring', def: 'Improving code\'s structure without changing what it does — like editing a draft.' },
      { term: 'Responsive design', def: 'One page that adapts its layout to any screen size, from phone to ultrawide.' },
      { term: 'Runtime', def: 'The program that runs your program: the browser for JS, the Python interpreter for .py files.' },
      { term: 'String', def: 'Text data, in quotes. "42" is a string; 42 is a number.' },
      { term: 'Syntax', def: 'The grammar rules of a language. Syntax errors mean the computer couldn\'t even parse your code.' },
      { term: 'Variable', def: 'A named box holding a value that your code can read and change.' },
      { term: 'Version control', def: 'Tracking every change to your code over time so you can undo, compare, and collaborate. See Git.' }
    ]
  }
];
