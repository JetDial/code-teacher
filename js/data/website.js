/* ============================================================
   "Build a Website" track — HTML + CSS + JS combined, start to publish
   ============================================================ */
window.CT_TRACKS = window.CT_TRACKS || {};

window.CT_TRACKS.website = {
  id: 'website',
  name: 'Build a Website',
  icon: 'WWW',
  area: 'web',
  tagline: 'HTML + CSS + JS together: from blank file to published site.',
  blurb: 'This track puts the three web languages together and walks you through building a complete personal website — structure, style, interactivity — and ends with publishing it on the real internet for free. Best started after the beginner lessons of the HTML and CSS tracks.',
  uses: ['Portfolio sites', 'Business & landing pages', 'Blogs', 'Web apps', 'Online stores', 'Documentation sites'],
  lessons: [

    {
      id: 'web-1', title: 'How websites actually work', level: 0, minutes: 10,
      blocks: [
        { t: 'p', html: 'Before building, a 3-minute tour of what happens when someone visits a website:' },
        { t: 'ol', items: [
          'You type <code>example.com</code>. The browser asks a <b>DNS</b> server "what computer is that?" and gets back an address.',
          'The browser sends an <b>HTTP request</b> to that computer — the <b>server</b> — saying "please send me the page".',
          'The server responds with files: an HTML file, then the CSS, JavaScript and images it references.',
          'Your browser — the <b>client</b> — assembles and renders them into the page you see.'
        ] },
        { t: 'p', html: 'That\'s it. A website is <b>files on a computer that answers requests</b>. When you open your own .html file from your desktop, you\'re skipping the network and being your own server — which is why local development works offline.' },
        { t: 'p', html: 'The three languages divide the work exactly as you\'ve learned:' },
        { t: 'table', head: ['Language', 'Role', 'Metaphor'], rows: [
          ['HTML', 'structure & content', 'the skeleton'],
          ['CSS', 'appearance', 'the clothes'],
          ['JavaScript', 'behavior', 'the muscles']
        ] },
        { t: 'p', html: 'In this track we\'ll build a personal site — a portfolio — because it\'s genuinely useful, shows off every skill, and you can publish it at the end. First: plan. Good sites answer three questions fast: <b>Who are you? What do you do? How do I contact you?</b>' },
        { t: 'tip', html: 'Professional habit from day one: keep a site in its own folder with <code>index.html</code> (the name servers look for first), <code>style.css</code>, and <code>script.js</code>. Our editors simulate exactly that split with their three tabs.' }
      ],
      tryIt: {
        mode: 'web',
        html: '<!-- Your site\'s first sketch. We\'ll grow this through the track. -->\n<h1>Sam Rivera</h1>\n<p>Future web developer. Current snack enthusiast.</p>\n<p>Contact: sam@example.com</p>',
        css: '/* Empty for now - structure first, style next lesson. */',
        js: '// Empty for now - behavior comes later in the track.'
      },
      quiz: [
        { q: 'What is a web server?', options: ['A special browser', 'A computer that sends files when browsers request them', 'A programming language', 'The internet cable'], a: 1, why: 'Servers serve. Browsers (clients) request and render.' },
        { q: 'Which file name do servers show by default for a folder?', options: ['<code>main.html</code>', '<code>home.html</code>', '<code>index.html</code>', '<code>start.html</code>'], a: 2, why: 'index.html is the convention every server understands — your site\'s front door.' },
        { q: 'Which pairing is right?', options: ['HTML=behavior, CSS=structure, JS=style', 'HTML=structure, CSS=style, JS=behavior', 'HTML=style, CSS=behavior, JS=structure', 'They\'re interchangeable'], a: 1, why: 'Skeleton, clothes, muscles — each language has its job.' }
      ],
      challenge: {
        text: 'Plan YOUR site in the editor as plain HTML comments: who it\'s for, its three sections, and one thing visitors should do (email you? see your projects?). Then rough in the headline.',
        hints: ['Planning in comments is real developer practice — the file becomes its own to-do list.'],
        solution: { lang: 'html', code: '<!-- Site: my portfolio\n     Audience: future employers & collaborators\n     Sections: About, Projects, Contact\n     Goal: get people to email me -->\n<h1>Alex Kim — I build small, sturdy websites</h1>' }
      }
    },

    {
      id: 'web-2', title: 'The skeleton: structure your site', level: 0, minutes: 12,
      blocks: [
        { t: 'p', html: 'Time to build the real structure with the semantic tags from the HTML track. A classic one-page portfolio skeleton:' },
        { t: 'code', lang: 'html', code: '<header>\n  <h1>Sam Rivera</h1>\n  <p>Web developer in training</p>\n  <nav>\n    <a href="#about">About</a>\n    <a href="#projects">Projects</a>\n    <a href="#contact">Contact</a>\n  </nav>\n</header>\n\n<main>\n  <section id="about">\n    <h2>About me</h2>\n    <p>...</p>\n  </section>\n\n  <section id="projects">\n    <h2>Projects</h2>\n    ...\n  </section>\n\n  <section id="contact">\n    <h2>Contact</h2>\n    ...\n  </section>\n</main>\n\n<footer>\n  <p>© 2026 Sam Rivera</p>\n</footer>' },
        { t: 'p', html: 'New trick: the nav links point to <code>#about</code>, <code>#projects</code>, <code>#contact</code> — the <code>id</code>s of the sections. Clicking one scrolls to that section. Same-page navigation, zero JavaScript.' },
        { t: 'p', html: 'Notice what makes this skeleton good: every piece of content has a home, headings descend in order, and you could already read the page\'s purpose with all styling stripped away. Structure that stands on its own is the foundation everything else leans on.' },
        { t: 'tip', html: 'Write real content now, not "lorem ipsum" filler. Real words expose real layout problems, and you\'ll never get around to replacing the fake ones. Two honest sentences beat three fake paragraphs.' }
      ],
      tryIt: {
        mode: 'web',
        html: '<header>\n  <h1>Sam Rivera</h1>\n  <p>Web developer in training</p>\n  <nav>\n    <a href="#about">About</a>\n    <a href="#projects">Projects</a>\n    <a href="#contact">Contact</a>\n  </nav>\n</header>\n\n<main>\n  <section id="about">\n    <h2>About me</h2>\n    <p>I started learning to code this year and I\'m hooked.\n    I like small tools, big breakfasts, and clean HTML.</p>\n  </section>\n\n  <section id="projects">\n    <h2>Projects</h2>\n    <ul>\n      <li><strong>This site</strong> — my first from scratch</li>\n      <li><strong>To-do app</strong> — coming soon</li>\n    </ul>\n  </section>\n\n  <section id="contact">\n    <h2>Contact</h2>\n    <p>Email me at <a href="mailto:sam@example.com">sam@example.com</a></p>\n  </section>\n</main>\n\n<footer>\n  <p>© 2026 Sam Rivera</p>\n</footer>',
        css: '/* Still naked on purpose. Structure first! */',
        js: ''
      },
      quiz: [
        { q: '<code>&lt;a href="#projects"&gt;</code> does what?', options: ['Opens projects.html', 'Scrolls to the element with id="projects"', 'Downloads a file', 'Nothing without JS'], a: 1, why: 'A # link targets an id on the same page — built-in smooth navigation.' },
        { q: 'Why write real content instead of placeholder text?', options: ['Placeholder is illegal', 'Real content reveals real layout needs and actually gets finished', 'It loads faster', 'Search engines require it'], a: 1, why: 'Fake text hides problems and has a way of shipping to production.' },
        { q: 'A link that opens the visitor\'s email app uses…', options: ['<code>href="email:..."</code>', '<code>href="mailto:..."</code>', '<code>href="@..."</code>', 'JavaScript'], a: 1, why: 'mailto: links open the default mail client with the address filled in.' }
      ],
      challenge: {
        text: 'Personalize the skeleton: your (or an invented persona\'s) name, honest about-text, two projects — and add a fourth section "Skills" with a list, wired into the nav.',
        hints: ['Four things to touch: new <code>&lt;section id="skills"&gt;</code>, its heading, its list, and a fourth nav link.'],
        solution: { lang: 'html', code: '<!-- added inside <nav>: -->\n<a href="#skills">Skills</a>\n\n<!-- added inside <main>: -->\n<section id="skills">\n  <h2>Skills</h2>\n  <ul>\n    <li>HTML & CSS</li>\n    <li>JavaScript (learning!)</li>\n    <li>Debugging with snacks</li>\n  </ul>\n</section>' }
      }
    },

    {
      id: 'web-3', title: 'Dress it up: a real stylesheet', level: 0, minutes: 14,
      blocks: [
        { t: 'p', html: 'Now the CSS-track skills turn the skeleton into a designed page. Professional stylesheets follow a pattern — variables first, base styles next, then section by section:' },
        { t: 'code', lang: 'css', code: '/* 1. Design tokens */\n:root {\n  --ink: #22303c;\n  --paper: #f9f7f2;\n  --brand: #b4552d;\n}\n\n/* 2. Base */\n* { box-sizing: border-box; }\nbody {\n  margin: 0;\n  font-family: Georgia, serif;\n  background: var(--paper);\n  color: var(--ink);\n  line-height: 1.6;\n}\n\n/* 3. Sections... */\nheader { text-align: center; padding: 48px 16px; }' },
        { t: 'p', html: 'A few choices that quietly make amateur pages look professional:' },
        { t: 'ul', items: [
          '<b>A content column:</b> <code>main { max-width: 640px; margin: 0 auto; }</code> — long lines are hard to read; every serious site limits them.',
          '<b>Consistent spacing:</b> pick a rhythm (say, multiples of 8px) and stick to it.',
          '<b>Few colors:</b> one background, one text, one accent goes a long way. Variables make them swappable.',
          '<b>Breathing room:</b> when in doubt, add padding. Cramped beats ugly every time… wait, no — cramped IS ugly. Add the padding.'
        ] },
        { t: 'tip', html: 'Design cheat: pick a palette from a site you love (browser dev tools show any site\'s colors), or use a palette generator. Two fonts max: one for headings, one for body — or just one for everything.' }
      ],
      tryIt: {
        mode: 'web',
        html: '<header>\n  <h1>Sam Rivera</h1>\n  <p class="tagline">Web developer in training</p>\n  <nav>\n    <a href="#about">About</a>\n    <a href="#projects">Projects</a>\n    <a href="#contact">Contact</a>\n  </nav>\n</header>\n<main>\n  <section id="about">\n    <h2>About me</h2>\n    <p>I started learning to code this year and I\'m hooked.</p>\n  </section>\n  <section id="projects">\n    <h2>Projects</h2>\n    <ul>\n      <li><strong>This site</strong> — my first from scratch</li>\n      <li><strong>To-do app</strong> — coming soon</li>\n    </ul>\n  </section>\n  <section id="contact">\n    <h2>Contact</h2>\n    <p><a href="mailto:sam@example.com">sam@example.com</a></p>\n  </section>\n</main>\n<footer><p>© 2026 Sam Rivera</p></footer>',
        css: ':root {\n  --ink: #22303c;\n  --paper: #f9f7f2;\n  --brand: #b4552d;\n}\n\n* { box-sizing: border-box; }\n\nbody {\n  margin: 0;\n  font-family: Georgia, serif;\n  background: var(--paper);\n  color: var(--ink);\n  line-height: 1.6;\n}\n\nheader {\n  text-align: center;\n  padding: 48px 16px 24px;\n}\n\nh1 { margin: 0; font-size: 2.2rem; }\n\n.tagline { color: var(--brand); font-style: italic; margin-top: 4px; }\n\nnav { margin-top: 16px; }\nnav a {\n  color: var(--brand);\n  text-decoration: none;\n  margin: 0 10px;\n  font-weight: bold;\n}\nnav a:hover { text-decoration: underline; }\n\nmain {\n  max-width: 640px;\n  margin: 0 auto;\n  padding: 0 16px 40px;\n}\n\nsection { margin-top: 40px; }\n\nh2 {\n  border-bottom: 3px solid var(--brand);\n  padding-bottom: 6px;\n}\n\nfooter {\n  text-align: center;\n  padding: 24px;\n  color: #888;\n  font-size: 0.85rem;\n}',
        js: ''
      },
      quiz: [
        { q: 'Why limit content width with max-width?', options: ['To save bandwidth', 'Long text lines are hard to read', 'Browsers require it', 'It centers images'], a: 1, why: 'Around 60-75 characters per line is the comfortable reading zone — every book and news site does this.' },
        { q: 'Where should your color palette live?', options: ['Repeated wherever needed', 'In CSS variables on :root', 'In the HTML', 'In JavaScript'], a: 1, why: 'Define once, use everywhere, change in one place.' },
        { q: 'A quietly professional look usually comes from…', options: ['Many fonts and colors', 'Restraint: few colors, consistent spacing, a readable column', 'Animations everywhere', 'Dark mode'], a: 1, why: 'Consistency reads as polish. Restraint is a skill.' }
      ],
      challenge: {
        text: 'Re-theme the page completely by ONLY changing the three :root variables (try a dark theme: dark paper, light ink). Then make one bigger change: style the nav links as pill-shaped buttons.',
        hints: ['Dark idea: <code>--paper: #1d232b; --ink: #e8e4da; --brand: #e0a458;</code>', 'Pills: padding, border-radius 999px, and a background on <code>nav a</code>.'],
        solution: { lang: 'css', code: ':root {\n  --ink: #e8e4da;\n  --paper: #1d232b;\n  --brand: #e0a458;\n}\n\nnav a {\n  display: inline-block;\n  background: var(--brand);\n  color: var(--paper);\n  padding: 6px 16px;\n  border-radius: 999px;\n  margin: 0 4px;\n}\nnav a:hover { text-decoration: none; opacity: 0.85; }' }
      }
    },

    {
      id: 'web-4', title: 'Project cards with flexbox & grid', level: 1, minutes: 14,
      blocks: [
        { t: 'p', html: 'A list of projects is fine; a <b>grid of cards</b> is a portfolio. This is the flexbox/grid material from the CSS track earning its keep. The HTML pattern — each project becomes an <code>&lt;article&gt;</code> card:' },
        { t: 'code', lang: 'html', code: '<div class="cards">\n  <article class="card">\n    <h3>Weather app</h3>\n    <p>Live forecasts using a free API.</p>\n    <a href="#">View project →</a>\n  </article>\n  <article class="card">...</article>\n  <article class="card">...</article>\n</div>' },
        { t: 'p', html: 'And the responsive-by-default grid from the CSS track:' },
        { t: 'code', lang: 'css', code: '.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 16px;\n}\n\n.card {\n  background: white;\n  border-radius: 10px;\n  padding: 16px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n}' },
        { t: 'p', html: 'Small touches with big returns: a subtle <code>box-shadow</code> lifts cards off the page; a hover transition (<code>transform: translateY(-3px)</code>) makes them feel alive; and <code>display: flex; flex-direction: column</code> <i>inside</i> the card pins the link to the bottom so all cards align.' },
        { t: 'tip', html: 'This exact pattern — semantic articles in an auto-fit grid — is most of the "card UI" you see across the modern web. Master it once, reuse it forever.' }
      ],
      tryIt: {
        mode: 'web',
        html: '<section id="projects">\n  <h2>Projects</h2>\n  <div class="cards">\n    <article class="card">\n      <h3>This site</h3>\n      <p>My first site built from scratch.</p>\n      <a href="#">View →</a>\n    </article>\n    <article class="card">\n      <h3>To-do app</h3>\n      <p>Tasks, checkboxes, zero excuses.</p>\n      <a href="#">View →</a>\n    </article>\n    <article class="card">\n      <h3>Quiz game</h3>\n      <p>Multiple choice, instant feedback.</p>\n      <a href="#">View →</a>\n    </article>\n  </div>\n</section>',
        css: 'body {\n  font-family: Georgia, serif;\n  background: #f9f7f2;\n  color: #22303c;\n  padding: 20px;\n}\n\nh2 { border-bottom: 3px solid #b4552d; padding-bottom: 6px; }\n\n.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 16px;\n}\n\n.card {\n  display: flex;\n  flex-direction: column;\n  background: white;\n  border-radius: 10px;\n  padding: 16px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n  transition: transform 0.15s, box-shadow 0.15s;\n}\n\n.card:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);\n}\n\n.card h3 { margin-top: 0; }\n.card p { flex: 1; }\n.card a { color: #b4552d; font-weight: bold; text-decoration: none; }',
        js: ''
      },
      quiz: [
        { q: 'Why is each card an <code>&lt;article&gt;</code>?', options: ['Articles are styled automatically', 'Each card is self-contained content — the semantic fit', 'Divs can\'t be cards', 'For SEO only'], a: 1, why: 'A project card would make sense standing alone — the definition of article.' },
        { q: '<code>repeat(auto-fit, minmax(200px, 1fr))</code> gives you…', options: ['Exactly 3 columns', 'As many ≥200px columns as fit, sharing space evenly', 'One 200px column', 'Horizontal scrolling'], a: 1, why: 'The layout reflows itself at every width — responsive with zero media queries.' },
        { q: 'How do you pin the link to every card\'s bottom edge?', options: ['<code>position: absolute</code>', 'Make the card a flex column and give the paragraph <code>flex: 1</code>', 'Extra <code>&lt;br&gt;</code> tags', 'Fixed card heights'], a: 1, why: 'The growing paragraph pushes the link down — cards align however long the text is.' }
      ],
      challenge: {
        text: 'Add a "featured" class to one card: an accent-colored top border, and it spans 2 columns when there\'s room (grid-column). Add a fourth card to watch it reflow.',
        hints: ['<code>.featured { border-top: 4px solid #b4552d; grid-column: span 2; }</code>', 'On narrow screens span 2 can overflow — wrap it in a media query, or add <code>@media (max-width: 500px){ .featured { grid-column: auto; } }</code>.'],
        solution: { lang: 'css', code: '.featured {\n  border-top: 4px solid #b4552d;\n  grid-column: span 2;\n}\n\n@media (max-width: 500px) {\n  .featured { grid-column: auto; }\n}' }
      }
    },

    {
      id: 'web-5', title: 'Adding behavior: your site comes alive', level: 1, minutes: 14,
      blocks: [
        { t: 'p', html: 'Time for the JavaScript track to join the party. Good first behaviors for a personal site are small and genuinely useful. Three classics:' },
        { t: 'p', html: '<b>1. A dark-mode toggle</b> — the DOM lesson\'s classList.toggle, doing exactly its job:' },
        { t: 'code', lang: 'js', code: 'const toggle = document.querySelector("#theme-btn");\ntoggle.addEventListener("click", () => {\n  document.body.classList.toggle("dark");\n});' },
        { t: 'code', lang: 'css', code: '/* the entire dark theme, thanks to variables: */\nbody.dark {\n  --paper: #1d232b;\n  --ink: #e8e4da;\n}' },
        { t: 'p', html: '<b>2. Auto-updating year</b> in the footer (never edit your copyright again):' },
        { t: 'code', lang: 'js', code: 'document.querySelector("#year").textContent = new Date().getFullYear();' },
        { t: 'p', html: '<b>3. A greeting that knows the time of day:</b>' },
        { t: 'code', lang: 'js', code: 'const hour = new Date().getHours();\nconst greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";\ndocument.querySelector("#greeting").textContent = `${greeting}! Welcome to my site.`;' },
        { t: 'tip', html: 'Notice the pattern in all three: <b>find element → listen or compute → change the DOM</b>. That loop is 90% of front-end JavaScript. The other 10% is fetching data — which you saw in the JS track and will use in the weather project.' }
      ],
      tryIt: {
        mode: 'web',
        html: '<header>\n  <h1>Sam Rivera</h1>\n  <p id="greeting">Welcome!</p>\n  <button id="theme-btn">🌙 Toggle theme</button>\n</header>\n<main>\n  <p>The rest of the site lives here.</p>\n</main>\n<footer>\n  <p>© <span id="year">????</span> Sam Rivera</p>\n</footer>',
        css: ':root { --paper: #f9f7f2; --ink: #22303c; }\n\nbody {\n  background: var(--paper);\n  color: var(--ink);\n  font-family: Georgia, serif;\n  text-align: center;\n  transition: background 0.3s, color 0.3s;\n}\n\nbody.dark { --paper: #1d232b; --ink: #e8e4da; }\n\nbutton {\n  padding: 8px 16px;\n  border-radius: 999px;\n  border: 1px solid currentColor;\n  background: none;\n  color: inherit;\n  cursor: pointer;\n}',
        js: 'document.querySelector("#theme-btn").addEventListener("click", () => {\n  document.body.classList.toggle("dark");\n});\n\ndocument.querySelector("#year").textContent = new Date().getFullYear();\n\nconst hour = new Date().getHours();\nconst greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";\ndocument.querySelector("#greeting").textContent = `${greeting}! Welcome to my site.`;'
      },
      quiz: [
        { q: 'Why does the dark-mode toggle need so little CSS?', options: ['Dark mode is built into browsers', 'The colors were variables, so one class redefines them all', 'JavaScript rewrites the stylesheet', 'It uses a library'], a: 1, why: 'body.dark just changes the variable values — everything using them follows.' },
        { q: '<code>new Date().getFullYear()</code> returns…', options: ['"2026" as a string', 'The current year as a number', 'The full date', 'The year the site was made'], a: 1, why: 'The Date object reads the visitor\'s clock — the year updates itself forever.' },
        { q: 'The core front-end JS pattern is…', options: ['fetch → parse → render', 'find element → listen/compute → change the DOM', 'write HTML in strings', 'reload the page on every change'], a: 1, why: 'Nearly every interactive feature decomposes into those three moves.' }
      ],
      challenge: {
        text: 'Add a visit counter using localStorage (the browser\'s tiny permanent storage): each Run, increment a counter and show "You\'ve visited N times" somewhere on the page.',
        hints: ['Read: <code>Number(localStorage.getItem("visits") || 0)</code>. Write: <code>localStorage.setItem("visits", n)</code>.'],
        solution: { lang: 'js', code: 'const visits = Number(localStorage.getItem("visits") || 0) + 1;\nlocalStorage.setItem("visits", visits);\n\nconst p = document.createElement("p");\np.textContent = `You\'ve visited ${visits} time${visits === 1 ? "" : "s"}.`;\ndocument.querySelector("main").appendChild(p);' }
      }
    },

    {
      id: 'web-6', title: 'A contact form that responds', level: 1, minutes: 14,
      blocks: [
        { t: 'p', html: 'Your HTML-track form skills + JS-track event skills = a contact form that actually reacts. The key event is <code>submit</code>, and the key move is <code>preventDefault()</code> — stopping the browser\'s default "send to a server and reload" behavior so your code can take over:' },
        { t: 'code', lang: 'js', code: 'const form = document.querySelector("#contact-form");\n\nform.addEventListener("submit", (event) => {\n  event.preventDefault();                     // stop the reload\n  const name = document.querySelector("#name").value.trim();\n\n  if (name === "") {\n    showStatus("Please tell me your name!", true);\n    return;                                   // stop here on bad input\n  }\n  showStatus(`Thanks, ${name}! Message received.`, false);\n  form.reset();\n});' },
        { t: 'p', html: 'This is <b>client-side validation</b> — checking input before accepting it. The pattern: read values, <code>trim()</code> whitespace, check each rule, bail out early with a helpful message, and only proceed when everything passes.' },
        { t: 'p', html: 'Being honest about the last mile: making the message actually <i>reach your inbox</i> needs a server (or a free form service like Formspree — you point the form\'s <code>action</code> at their URL and they email you). What you\'re building here — the validation and feedback layer — is exactly the part that stays yours either way.' },
        { t: 'tip', html: 'Good form feedback is specific and polite: not "ERROR", but "Please enter an email address". Put it near the form, color it meaningfully, and never make users guess what went wrong.' }
      ],
      tryIt: {
        mode: 'web',
        html: '<h2>Contact me</h2>\n<form id="contact-form">\n  <p>\n    <label for="name">Name</label><br>\n    <input id="name" type="text">\n  </p>\n  <p>\n    <label for="msg">Message</label><br>\n    <textarea id="msg" rows="4" cols="34"></textarea>\n  </p>\n  <button type="submit">Send</button>\n</form>\n<p id="status"></p>',
        css: 'body { font-family: Georgia, serif; padding: 20px; }\ninput, textarea { font: inherit; padding: 6px; }\n#status { font-weight: bold; }\n#status.error { color: #b03030; }\n#status.ok { color: #2c7a3f; }',
        js: 'const form = document.querySelector("#contact-form");\nconst status = document.querySelector("#status");\n\nfunction showStatus(text, isError) {\n  status.textContent = text;\n  status.className = isError ? "error" : "ok";\n}\n\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n\n  const name = document.querySelector("#name").value.trim();\n  const msg = document.querySelector("#msg").value.trim();\n\n  if (name === "") {\n    showStatus("Please tell me your name!", true);\n    return;\n  }\n  if (msg.length < 10) {\n    showStatus("Message is a bit short - give me at least 10 characters.", true);\n    return;\n  }\n\n  showStatus(`Thanks, ${name}! Message received. 📨`, false);\n  form.reset();\n});'
      },
      quiz: [
        { q: 'What does <code>event.preventDefault()</code> do on a form submit?', options: ['Deletes the form', 'Stops the browser\'s default submit-and-reload so your JS handles it', 'Prevents typing', 'Validates automatically'], a: 1, why: 'Without it, the page reloads and your JavaScript never gets its moment.' },
        { q: 'Why <code>trim()</code> input values?', options: ['To lowercase them', 'So "   " isn\'t accepted as a filled-in field', 'To remove numbers', 'To encrypt them'], a: 1, why: 'trim strips surrounding whitespace — the classic way empty-but-spacey input sneaks past checks.' },
        { q: 'For the message to reach your actual inbox, you need…', options: ['More JavaScript', 'A server or a form service — the browser alone can\'t email', 'A newer browser', 'CSS'], a: 1, why: 'Client-side code can validate and react, but delivering email is a server-side job.' }
      ],
      challenge: {
        text: 'Add an email field with two rules: not empty, and contains "@" (<code>email.includes("@")</code>). Bonus: live-count the message characters as the user types (input event) — "23/10 characters".',
        hints: ['Insert the email check between the name and message checks.', 'The counter is an <code>input</code> listener on the textarea updating a small element.'],
        solution: { lang: 'js', code: 'const email = document.querySelector("#email").value.trim();\nif (!email.includes("@")) {\n  showStatus("Please enter a valid email address.", true);\n  return;\n}\n\n// live counter:\nconst msgBox = document.querySelector("#msg");\nmsgBox.addEventListener("input", () => {\n  document.querySelector("#counter").textContent =\n    `${msgBox.value.length}/10 characters`;\n});' }
      }
    },

    {
      id: 'web-7', title: 'Responsive polish & pre-flight checks', level: 2, minutes: 14,
      blocks: [
        { t: 'p', html: 'Before a site goes public, it earns a polish pass. The responsive check comes first — most visitors are on phones:' },
        { t: 'ul', items: [
          'Viewport meta tag present? (Head lesson, HTML track.)',
          'Readable without zooming? Body text 16px minimum.',
          'Nothing overflowing sideways? (Fix images with <code>max-width: 100%</code>; check long unbroken words.)',
          'Tap targets big enough? Links and buttons want ~44px of touchable area.',
          'Nav usable on a narrow screen? Sometimes that just means letting it wrap: <code>flex-wrap: wrap</code>.'
        ] },
        { t: 'p', html: 'Then the quality sweep — the difference between "my first site" and "a site":' },
        { t: 'ul', items: [
          '<b>A real <code>&lt;title&gt;</code> and meta description</b> — this is what search results and browser tabs show.',
          '<b>Alt text on every image.</b>',
          '<b>A favicon</b> — even a simple emoji one (this site\'s own favicon is an emoji in an SVG — view source!).',
          '<b>Check the console</b> (F12) — a clean site loads with zero red errors.',
          '<b>Lighthouse audit</b> (F12 → Lighthouse in Chrome): free scores for performance, accessibility and SEO, with specific fixes listed.'
        ] },
        { t: 'code', lang: 'css', code: '/* The classic final-polish snippet: */\nhtml { scroll-behavior: smooth; }   /* nav links glide */\nimg { max-width: 100%; height: auto; }\n\n@media (max-width: 600px) {\n  h1 { font-size: 1.6rem; }         /* big titles shrink politely */\n  nav { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }\n}' },
        { t: 'tip', html: 'Test the true mobile experience: open your page, press F12, click the device-toolbar icon (or Ctrl+Shift+M), and pick a phone. Rotate it. Fat-finger your own buttons. You\'ll find something — everyone does.' }
      ],
      tryIt: {
        mode: 'web',
        html: '<header>\n  <h1>A Very Long Site Title That Tests Wrapping</h1>\n  <nav>\n    <a href="#a">About</a>\n    <a href="#b">Projects</a>\n    <a href="#c">Contact</a>\n    <a href="#d">Blog</a>\n    <a href="#e">Extras</a>\n  </nav>\n</header>\n<main>\n  <p>Drag the preview pane narrow and watch what breaks — then fix it in the CSS tab using the lesson\'s snippet.</p>\n  <p style="font-size: 12px">This text is too small for phones. Bump the base size!</p>\n</main>',
        css: 'body { font-family: Georgia, serif; margin: 0; }\nheader { padding: 24px 16px; text-align: center; background: #22303c; color: #f9f7f2; }\nnav a { color: #e0a458; margin: 0 8px; }\nmain { max-width: 640px; margin: 0 auto; padding: 16px; }\n\n/* Your polish pass goes here! */'
      },
      quiz: [
        { q: 'The majority of web visits come from…', options: ['Desktops', 'Phones', 'Tablets', 'Smart TVs'], a: 1, why: 'Mobile passed desktop years ago — the phone view is the primary view.' },
        { q: 'A comfortable minimum for body text is…', options: ['10px', '12px', '16px', '24px'], a: 2, why: '16px is the browser default for a reason; smaller strains eyes on phones.' },
        { q: 'Lighthouse (in Chrome dev tools) gives you…', options: ['Free hosting', 'Scored audits of performance, accessibility and SEO with concrete fixes', 'A code editor', 'Traffic statistics'], a: 1, why: 'It\'s an automated pre-flight inspection — run it before you publish.' }
      ],
      challenge: {
        text: 'Do the full polish pass on the try-it page: smooth scrolling, wrapped nav on small screens, shrunken h1 under 600px, and fix the too-small paragraph (change the HTML too — inline styles were the crime).',
        hints: ['Remove the style attribute and set a proper base font-size on body.'],
        solution: { lang: 'css', code: 'html { scroll-behavior: smooth; }\nbody { font-size: 16px; }\n\n@media (max-width: 600px) {\n  h1 { font-size: 1.5rem; }\n  nav {\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n    gap: 8px;\n  }\n}\n/* and in the HTML: delete style="font-size: 12px" */' }
      }
    },

    {
      id: 'web-8', title: 'Publish your site — free, today', level: 2, minutes: 14,
      blocks: [
        { t: 'p', html: 'A site on your hard drive is a diary; a site on the internet is a website. Static sites (HTML/CSS/JS files, no server code) host for <b>free</b> in several places. The two easiest paths:' },
        { t: 'h3', text: 'Option A: Netlify Drop (fastest — 2 minutes)' },
        { t: 'ol', items: [
          'Put your site in one folder, entry file named <code>index.html</code>.',
          'Go to <code>app.netlify.com/drop</code> in a browser.',
          'Drag the folder onto the page. Done — you get a live URL like <code>wobbly-waffle-123.netlify.app</code> to share.'
        ] },
        { t: 'h3', text: 'Option B: GitHub Pages (the developer path)' },
        { t: 'ol', items: [
          'Create a free account at <code>github.com</code> — the site where developers store code with <b>git</b>, the version-control tool.',
          'Create a new repository (a project folder on GitHub), e.g. <code>my-site</code>.',
          'Upload your files (the web interface allows drag & drop — no command line required).',
          'In the repository\'s Settings → Pages, choose your main branch as the source.',
          'Minutes later your site is live at <code>yourname.github.io/my-site</code>.'
        ] },
        { t: 'p', html: 'Why bother with the GitHub route? Because it introduces <b>version control</b> — the professional workflow where every change is recorded, undoable, and shareable. Update a file in the repository, and the live site updates. It\'s the on-ramp to collaborating on real software.' },
        { t: 'p', html: 'Want <code>yourname.com</code> instead of a free subdomain? Domain names cost ~$10-15/year from registrars like Namecheap or Cloudflare; both Netlify and GitHub Pages let you attach one with a settings page and a couple of DNS entries (the registrar\'s instructions walk you through it).' },
        { t: 'tip', html: '🎓 <b>Track complete!</b> The Projects section has your next builds — and the portfolio capstone project pulls everything from this track into one publishable site. Build it, publish it, and send someone the link. That feeling is why people do this.' }
      ],
      tryIt: {
        mode: 'web',
        html: '<h1>🚀 Launch checklist</h1>\n<ul>\n  <li>Folder with index.html, style.css, script.js</li>\n  <li>Title + meta description written</li>\n  <li>Images have alt text</li>\n  <li>Looks good at phone width</li>\n  <li>Console shows no errors</li>\n  <li>Dragged onto Netlify Drop OR pushed to GitHub Pages</li>\n  <li>URL sent to someone who\'ll say "whoa"</li>\n</ul>',
        css: 'body { font-family: system-ui, sans-serif; padding: 24px; background: #101820; color: #e8e4da; }\nli { margin-bottom: 8px; }'
      },
      quiz: [
        { q: 'What kind of site can be hosted for free on Netlify/GitHub Pages?', options: ['Any site including databases', 'Static sites — HTML, CSS, JS files', 'Only single pages', 'Only sites without JavaScript'], a: 1, why: 'Static files need no server-side code, which is why hosting them costs providers almost nothing.' },
        { q: 'What is a GitHub repository?', options: ['A code editor', 'A project\'s folder of files with full change history', 'A web server you rent', 'A programming language'], a: 1, why: 'A repo holds your files plus every version of them — that history is git\'s superpower.' },
        { q: 'To use a custom domain like yourname.com you…', options: ['Must pay for expensive hosting', 'Buy the domain (~$10-15/yr) and point it at your free host', 'Need a business license', 'Can\'t — free hosts forbid it'], a: 1, why: 'The domain is the only cost; free hosts happily serve it once DNS points their way.' }
      ],
      challenge: {
        text: 'The real challenge: actually do it. Take any page you\'ve built in this track (copy it from an editor into files on your computer), and publish it with Netlify Drop. It genuinely takes 2 minutes.',
        hints: ['Create a folder, make index.html + style.css + script.js in Notepad, paste each tab\'s content into its file, link them in the HTML head/body, drag the folder onto app.netlify.com/drop.'],
        solution: { lang: 'text', code: 'No code — the solution is a URL that exists.\nGo drag that folder. We\'ll wait. 🚀' }
      }
    },

    {
      id: 'web-9', title: 'Web security basics', level: 2, minutes: 14,
      blocks: [
        { t: 'p', html: 'Your site is public now — time for the defensive basics every web developer must know. The core principle behind all of them: <b>never trust input from outside</b>. Anything a user types, pastes, or sends is potentially hostile until handled safely.' },
        { t: 'h3', text: 'XSS — the injection attack every site faces' },
        { t: 'p', html: '<b>Cross-site scripting (XSS)</b> happens when user text gets inserted into your page as HTML. If someone\'s "comment" contains a script tag and you render it with <code>innerHTML</code>, their code runs in every visitor\'s browser — stealing sessions, defacing pages, worse. The defense is beautifully simple:' },
        { t: 'code', lang: 'js', code: '// ❌ DANGEROUS: user text interpreted as HTML\ncommentDiv.innerHTML = userComment;\n\n// ✅ SAFE: user text displayed as text, always\ncommentDiv.textContent = userComment;\n// <script> arrives? It\'s SHOWN as letters, never run.' },
        { t: 'p', html: 'Rule: <code>textContent</code> for anything user-supplied; <code>innerHTML</code> only for HTML <i>you</i> wrote. (Frameworks like React do this escaping automatically — now you know what they\'re protecting you from.)' },
        { t: 'h3', text: 'The rest of the starter kit' },
        { t: 'ul', items: [
          '<b>Secrets never go in front-end code.</b> API keys, passwords, tokens — anything in your HTML/JS is readable by every visitor (View Source!). Secrets live on servers. (The AI-chatbot blueprint showed this pattern.)',
          '<b>HTTPS always.</b> The padlock encrypts traffic so networks can\'t read or alter it. Netlify/GitHub Pages give it free — there\'s no excuse.',
          '<b>SQL injection</b> — you met it in the SQL track: never glue user input into queries; use ? placeholders.',
          '<b>Passwords are never stored as text.</b> Real systems store salted hashes (one-way scrambles); better yet, use a login provider and never touch passwords at all.',
          '<b>Validate on the server too.</b> Your form\'s JavaScript checks are UX, not security — attackers skip your page and talk to your server directly.'
        ] },
        { t: 'warn', html: 'Ethics matter: these concepts are for DEFENDING your own sites and understanding the threats. Testing attacks against systems you don\'t own is illegal nearly everywhere. Curious about offense? Legal playgrounds exist — capture-the-flag (CTF) challenges and sites like OWASP Juice Shop are built to be attacked.' }
      ],
      tryIt: {
        mode: 'web',
        html: '<h2>Guestbook</h2>\n<input id="msg" placeholder="Leave a message..." size="30">\n<button id="unsafe">Post (innerHTML 😱)</button>\n<button id="safe">Post (textContent 😌)</button>\n<div id="wall"></div>',
        css: 'body { font-family: sans-serif; padding: 16px; }\n#wall div { border: 1px solid #ccc; border-radius: 8px; padding: 8px 12px; margin-top: 8px; }\nbutton { padding: 6px 12px; }',
        js: 'const input = document.querySelector("#msg");\nconst wall = document.querySelector("#wall");\n\n// Try posting this with BOTH buttons and compare:\n//   Nice site! <b>I am bold</b> <img src=x onerror="alert(\'gotcha\')">\ninput.value = "Nice site! <b>I am bold</b>";\n\ndocument.querySelector("#unsafe").onclick = () => {\n  const post = document.createElement("div");\n  post.innerHTML = input.value;          // ❌ input interpreted as HTML\n  wall.appendChild(post);\n};\n\ndocument.querySelector("#safe").onclick = () => {\n  const post = document.createElement("div");\n  post.textContent = input.value;        // ✅ input shown as plain text\n  wall.appendChild(post);\n};',
        note: 'The unsafe button renders the <b> as real bold — proof that user text became code. The safe button shows the same input as harmless literal text. That one-method difference is XSS defense.'
      },
      quiz: [
        { q: 'XSS happens when…', options: ['Passwords are weak', 'User-supplied text is rendered as HTML/script in other visitors\' browsers', 'Servers crash', 'Cookies expire'], a: 1, why: 'Injected markup runs with your site\'s trust. textContent (or framework escaping) prevents it.' },
        { q: 'An API key placed in your front-end JavaScript is…', options: ['Safe if minified', 'Public — every visitor can read it via View Source', 'Encrypted by the browser', 'Fine for paid keys only'], a: 1, why: 'All client code ships to the client. Secrets belong on servers, period.' },
        { q: 'Client-side form validation is…', options: ['Complete security', 'Good UX only — the server must re-validate because attackers skip the page', 'Illegal', 'Slower than server checks'], a: 1, why: 'Anyone can send requests directly to your server. It must defend itself.' }
      ],
      challenge: {
        text: 'Harden the guestbook: remove the unsafe button entirely, cap messages at 200 chars, reject empty posts — and add a tiny "escape preview" that shows exactly what characters would have been dangerous (&lt; &gt; &amp;) using a manual escape function.',
        hints: ['Manual escaping (know what frameworks do for you): replace & then < then > with their &amp;-entities.'],
        solution: { lang: 'js', code: 'function escapeHtml(s) {\n  return s.replace(/&/g, "&amp;")\n          .replace(/</g, "&lt;")\n          .replace(/>/g, "&gt;");\n}\n\ndocument.querySelector("#safe").onclick = () => {\n  const text = input.value.trim().slice(0, 200);\n  if (!text) return;\n  const post = document.createElement("div");\n  post.textContent = text;                    // display safely\n  wall.appendChild(post);\n  console.log("escaped form:", escapeHtml(text));  // what a server would store\n};' }
      }
    }
  ]
};
