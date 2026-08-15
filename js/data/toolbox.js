/* ============================================================
   The Toolbox — guides to the tools around the code:
   terminals, git, editors, Docker, engines and more.
   Same entry shape as the Atlas (shared renderer), plus an
   optional runnable `demo` (web editor config).
   ============================================================ */
window.CT_TOOLBOX = [

  {
    id: 'terminal', name: 'The Terminal (cmd, PowerShell, bash)', icon: '>_', kind: 'essential',
    tagline: 'The text interface to your computer — every developer\'s home base.',
    pitch: 'Before windows and mice, computers were a text prompt — and that prompt never went away, because it\'s faster and more automatable than clicking. Windows actually has TWO shells (the old cmd and the modern PowerShell), while Mac/Linux use bash/zsh. They differ in syntax, but the mental model is identical: you\'re standing in a folder, typing commands that act on files. Ten commands cover 90% of daily use.',
    uses: ['Running your programs', 'Git, npm, pip — all terminal tools', 'Automating repetitive work', 'Managing servers (they have no desktop!)'],
    famous: ['Every tool in this Toolbox is driven from here', 'Every server on Earth', 'Every "hacker" scene in movies (green text optional)'],
    facts: [
      ['Windows: cmd', 'the 1980s-lineage shell — simple, everywhere, limited. Commands: dir, copy, del'],
      ['Windows: PowerShell', 'the modern one — object pipelines, scripting power. Commands: Get-ChildItem (alias: ls, dir)'],
      ['Mac/Linux: bash / zsh', 'the Unix family — the standard of servers, tutorials and this site\'s Bash Atlas page'],
      ['The universal trio', 'cd (go somewhere) · ls / dir (look around) · running a program by typing its name'],
      ['Escape hatch', 'Tab autocompletes paths; ↑ recalls history; Ctrl+C cancels a stuck command']
    ],
    samples: [
      { title: 'The same session in all three shells', lang: 'bash',
        code: '# bash (Mac/Linux/Git Bash)      # PowerShell            # cmd\npwd                               #  pwd                   #  cd\nls                                #  ls  (or dir)          #  dir\ncd projects                       #  cd projects           #  cd projects\nmkdir my-site                     #  mkdir my-site         #  mkdir my-site\ncp index.html backup.html         #  cp index.html b.html  #  copy index.html b.html\nrm old.txt                        #  rm old.txt            #  del old.txt\npython app.py                     #  python app.py         #  python app.py',
        output: '(same ideas everywhere: where am I, what\'s here,\n go there, make/copy/delete, run a program)' },
      { title: 'Why developers love it: one line = one chore done', lang: 'bash',
        code: '# PowerShell: rename every .txt file to .md in one line\nGet-ChildItem *.txt | Rename-Item -NewName { $_.Name -replace ".txt", ".md" }\n\n# bash: count lines of code in a project\nfind . -name "*.js" | xargs wc -l',
        output: '  312 ./app.js\n  1204 ./data/lessons.js\n  1516 total' }
    ],
    firstSteps: [
      'Windows: press Win, type "powershell", Enter. You\'re in. (cmd works too; PowerShell is the better default.)',
      'Try the survival kit: <code>pwd</code> (where am I), <code>ls</code> (what\'s here), <code>cd foldername</code>, <code>cd ..</code> (up one).',
      'Navigate to a project folder and run something real: <code>python file.py</code>, <code>git status</code>.',
      'Adopt Tab-completion immediately — type 3 letters of a path, hit Tab, never type full paths again.'
    ],
    related: ['python'],
    quiz: [
      { q: 'Windows\' modern shell is…', options: ['cmd', 'PowerShell', 'bash', 'DOS'], a: 1, why: 'cmd still works, but PowerShell is the current, far more capable default.' },
      { q: '<code>cd ..</code> means…', options: ['Close the terminal', 'Go up one folder', 'Delete a folder', 'Show hidden files'], a: 1, why: '.. is always "the parent folder" — the single most-typed command fragment.' },
      { q: 'The terminal survives 50 years on because…', options: ['Nostalgia', 'Text commands are faster to repeat, script and run on servers than clicking', 'It uses less RAM', 'Microsoft requires it'], a: 1, why: 'Anything you can type, you can automate. Clicking doesn\'t scale; scripts do.' }
    ]
  },

  {
    id: 'git', name: 'Git & GitHub', icon: '⎇', kind: 'essential',
    tagline: 'Time travel for your code — and the world\'s codebase, shared.',
    pitch: 'Git records snapshots ("commits") of your project, forever. Broke everything? Roll back. Wonder why a line exists? See who wrote it, when, and their explanation. GitHub hosts those histories online — backup, portfolio and collaboration in one. It\'s the first tool employers assume you know, and it makes fearless experimentation possible: you literally cannot lose committed work.',
    uses: ['Version history for any project', 'Backup via GitHub', 'Collaboration (branches & pull requests)', 'Your public portfolio', 'Publishing sites (GitHub Pages)'],
    famous: ['Linux (git was built to manage it)', 'Every open-source project you\'ve heard of', 'Your future team\'s workflow'],
    facts: [
      ['Commit', 'a saved snapshot with a message — the unit of history'],
      ['Repository (repo)', 'a project folder git watches, with its whole history inside'],
      ['Branch', 'a parallel line of history — experiment safely, merge when happy'],
      ['Pull request (PR)', 'GitHub\'s "please review & merge my branch" — how teams collaborate'],
      ['Git vs GitHub', 'git = the tool on your machine; GitHub = a website hosting git repos']
    ],
    samples: [
      { title: 'The daily loop (90% of all git usage)', lang: 'bash',
        code: 'git init                       # once per project: start tracking\ngit status                     # what changed?\ngit add .                      # stage everything changed\ngit commit -m "Add login form" # snapshot it, with a message\ngit log --oneline              # see the history',
        output: 'a3f8c21 Add login form\n9b2d110 Style the homepage\n71c0aa4 First commit' },
      { title: 'The GitHub loop', lang: 'bash',
        code: '# once: connect your repo to GitHub\ngit remote add origin https://github.com/you/my-site.git\ngit push -u origin main        # upload history\n\n# thereafter:\ngit push                       # send new commits up\ngit pull                       # fetch others\' commits down',
        output: 'To github.com:you/my-site.git\n   9b2d110..a3f8c21  main -> main' }
    ],
    firstSteps: [
      'Install from git-scm.com (Windows gets Git Bash as a bonus shell). Check with <code>git --version</code>.',
      'Introduce yourself once: <code>git config --global user.name "You"</code> and <code>user.email</code>.',
      'In any project folder: <code>git init</code>, then commit after every meaningful change. Message = what & why.',
      'Make a free github.com account, create a repo, push a project — that\'s a portfolio piece and an off-machine backup in one evening.'
    ],
    related: ['website'],
    quiz: [
      { q: 'A commit is…', options: ['A file upload', 'A saved snapshot of the project with a message', 'A branch', 'A GitHub account'], a: 1, why: 'History is a chain of commits — each one a restorable point with an explanation.' },
      { q: 'Git vs GitHub:', options: ['Same thing', 'Git is the local tool; GitHub is a hosting site for git repos', 'GitHub came first', 'Git is the paid version'], a: 1, why: 'Git works fully offline; GitHub adds sharing, backup and collaboration.' },
      { q: 'The safe way to try a risky idea:', options: ['A copy of the folder named final_v2_REAL', 'A branch — merge if it works, delete if not', 'Comments everywhere', 'Hope'], a: 1, why: 'Branches are disposable parallel histories — the antidote to folder_final_final.zip.' }
    ]
  },

  {
    id: 'vscode', name: 'VS Code', icon: '⌨', kind: 'essential',
    tagline: 'The editor most of the world writes code in — free, and deeply extendable.',
    pitch: 'Visual Studio Code is a free editor that understands code: it autocompletes, underlines errors as you type (TypeScript speaks natively!), integrates git and a terminal, and extends with a marketplace of plugins for every language and framework. Notepad got you started; VS Code is where the tooling starts working WITH you.',
    uses: ['Writing every language on this site', 'Built-in terminal + git', 'Live Server for instant web preview', 'Debugging with breakpoints'],
    famous: ['~75% of developers use it (StackOverflow surveys)', 'Built with Electron — it\'s HTML/CSS/TypeScript!', 'The base of many AI coding tools'],
    facts: [
      ['Price', 'free, open source, Windows/Mac/Linux'],
      ['The shortcut that matters', 'Ctrl+Shift+P — the command palette runs everything by name'],
      ['IntelliSense', 'autocomplete + inline docs + error squiggles, live'],
      ['Extensions', 'Python, Live Server, Prettier, themes — installed in two clicks'],
      ['Integrated terminal', 'Ctrl+` opens PowerShell/bash inside the editor']
    ],
    samples: [
      { title: 'Shortcuts that pay rent daily', lang: 'text',
        code: 'Ctrl+P            jump to any file by typing its name\nCtrl+Shift+P      command palette (do anything by name)\nCtrl+`            toggle the built-in terminal\nCtrl+D            select next occurrence (multi-cursor magic!)\nAlt+↑/↓           move a line up/down\nCtrl+/            comment/uncomment selection\nF2                rename a symbol EVERYWHERE, safely\nCtrl+Space        force autocomplete suggestions',
        output: '(learn Ctrl+P and Ctrl+D first - instant productivity)' },
      { title: 'A typical setup for this site\'s learners', lang: 'text',
        code: 'Extensions to install (Ctrl+Shift+X, search, click Install):\n  · Live Server     - right-click index.html -> "Open with Live Server":\n                      your page auto-reloads on every save\n  · Python          - run/debug .py files, rich autocomplete\n  · Prettier        - auto-formats your HTML/CSS/JS on save\n  · Error Lens      - shows errors inline, loudly',
        output: '(Live Server + your Code Teacher projects = a real dev loop)' }
    ],
    firstSteps: [
      'Download from code.visualstudio.com, install with defaults.',
      'File → Open Folder on a project (folders, not single files — that\'s how VS Code thinks).',
      'Install Live Server, open one of your HTML projects, right-click → Open with Live Server. Edit, save, watch it reload.',
      'Learn one shortcut per day from the list above. In two weeks you\'ll feel superhuman.'
    ],
    related: ['website', 'js'],
    quiz: [
      { q: 'Ctrl+Shift+P opens…', options: ['Print dialog', 'The command palette — every action, searchable by name', 'A new project', 'Settings'], a: 1, why: 'You never need to memorize menus: palette + type what you want.' },
      { q: 'The Live Server extension gives you…', options: ['Web hosting', 'A local preview that auto-reloads on every save', 'A database', 'Faster internet'], a: 1, why: 'The edit→save→see loop, tightened to instant — like this site\'s editors but for your own files.' },
      { q: 'VS Code itself is built with…', options: ['C only', 'Web tech: TypeScript/HTML/CSS via Electron', 'Java', 'Assembly'], a: 1, why: 'The world\'s favorite editor is a web app in a desktop shell — your web skills built it.' }
    ]
  },

  {
    id: 'devtools', name: 'Browser DevTools', icon: 'F12', kind: 'essential',
    tagline: 'X-ray vision for any web page — including everyone else\'s.',
    pitch: 'Press F12 on any website and the browser opens its workshop: inspect and live-edit the HTML/CSS of the page, watch every network request, run JavaScript in the console, debug with breakpoints, and simulate phones. It\'s the web developer\'s primary diagnostic instrument — and the world\'s best way to learn from sites you admire.',
    uses: ['Debugging your pages', 'Live-editing CSS to experiment', 'Watching API calls happen', 'Testing mobile layouts', 'Learning how any site works'],
    famous: ['Built into Chrome, Edge, Firefox, Safari — free, everywhere', 'The "how did they do that?" answer machine'],
    facts: [
      ['Open it', 'F12, or right-click anything → Inspect'],
      ['Elements tab', 'the live DOM — edit HTML/CSS in place, changes apply instantly (and vanish on reload)'],
      ['Console tab', 'run JS on the current page; where console.log and errors appear'],
      ['Network tab', 'every file and API call the page makes, with timing and responses'],
      ['Device toolbar', 'Ctrl+Shift+M — simulate phones, throttle to slow 3G']
    ],
    samples: [
      { title: 'A debugging session', lang: 'text',
        code: '1. Page misbehaves -> F12 -> Console: read the red error, note the line\n2. Sources tab -> click the line number = breakpoint\n3. Reload; execution PAUSES there - hover variables to see values\n4. Step line by line (F10), watch where reality diverges from intention\n5. Elements tab -> click the broken element -> see exactly which\n   CSS rules apply, which are crossed out, and toggle them live',
        output: '(the console.log lifestyle, upgraded to a microscope)' },
      { title: 'Console tricks on ANY site', lang: 'js',
        code: '// F12 on any website, Console tab:\ndocument.title = "I own this tab now";\ndocument.body.style.filter = "invert(1)";      // instant dark mode\nconsole.table(performance.getEntriesByType("resource").slice(0, 5));\n$$("img").length                               // count images ($$ = querySelectorAll)',
        output: '(harmless, local, gone on reload - and deeply educational)' }
    ],
    firstSteps: [
      'F12 right now, on this page — Elements tab, find this paragraph, change its text. You can\'t break anything; reload resets.',
      'Console tab: type <code>2 + 2</code>, then <code>document.querySelectorAll("a").length</code>.',
      'Network tab, reload the page — watch every file arrive. Click one.',
      'Ctrl+Shift+M, pick "iPhone", browse a site you know — this is how mobile testing actually happens.'
    ],
    related: ['js', 'html'],
    quiz: [
      { q: 'Edits made in the Elements tab…', options: ['Change the real website for everyone', 'Apply instantly to YOUR view and vanish on reload', 'Are saved to the server', 'Break the site'], a: 1, why: 'You\'re editing your browser\'s copy — a consequence-free experiment lab.' },
      { q: 'A breakpoint lets you…', options: ['Break the page', 'Pause running JS at a line and inspect every variable at that instant', 'Speed up code', 'Block ads'], a: 1, why: 'The debugger turns "why is this wrong?" from guesswork into observation.' },
      { q: 'The Network tab answers…', options: ['Wi-Fi passwords', 'What requests the page makes, what came back, and how long each took', 'Server code', 'User counts'], a: 1, why: 'Every API call your JS track fetch() makes shows up here, inspectable.' }
    ]
  },

  {
    id: 'node', name: 'Node.js & npm', icon: '⬢', kind: 'essential',
    tagline: 'JavaScript escapes the browser — servers, tools and a million packages.',
    pitch: 'Node.js runs JavaScript outside the browser: on your machine, on servers, anywhere. That one move made JS a full-stack language — the same skills write the website AND its backend. It comes with npm, the world\'s largest package registry, where one command installs anything from a date formatter to a whole framework.',
    uses: ['Backend servers & APIs', 'Build tools (Vite, bundlers)', 'Command-line tools', 'Everything React/Vue/etc. needs installed'],
    famous: ['Netflix, PayPal, LinkedIn backends', 'npm: ~3 million packages', 'Vite, Express, Electron'],
    facts: [
      ['Run a file', '<code>node app.js</code> — your JS track knowledge, no browser needed'],
      ['npm', 'the package manager: <code>npm install express</code> pulls code into node_modules'],
      ['package.json', 'your project\'s manifest: dependencies + runnable scripts'],
      ['npx', 'run a package without installing: <code>npx create-vite</code>'],
      ['The ecosystem tax', 'node_modules folders are famously enormous. It\'s fine. Don\'t commit them to git (.gitignore!)']
    ],
    samples: [
      { title: 'JavaScript, but it\'s a server', lang: 'js',
        code: '// server.js - a real web server in Node (no packages needed!)\nconst http = require("http");\n\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { "Content-Type": "application/json" });\n  res.end(JSON.stringify({ hello: "world", path: req.url }));\n});\n\nserver.listen(3000);\nconsole.log("API running at http://localhost:3000");',
        output: '$ node server.js\nAPI running at http://localhost:3000\n(visit it in a browser - your fetch() lessons, from the other side!)' },
      { title: 'The npm workflow', lang: 'bash',
        code: 'npm init -y                # create package.json\nnpm install express        # add a package\nnode server.js             # run your code\n\n# or start a whole modern web project:\nnpm create vite@latest my-app\ncd my-app && npm install && npm run dev',
        output: '  VITE ready in 300 ms\n  ➜ Local: http://localhost:5173/' }
    ],
    firstSteps: [
      'Install the LTS version from nodejs.org, verify with <code>node --version</code> and <code>npm --version</code>.',
      'Make hello.js with a console.log, run <code>node hello.js</code> — JS without a browser. Small moment, big door.',
      'Type the server sample above into server.js, run it, visit localhost:3000 — you have built an API.',
      'Then <code>npm create vite@latest</code> and pick TypeScript — the professional front-end starter, one command.'
    ],
    related: ['js', 'ts'],
    quiz: [
      { q: 'Node.js is…', options: ['A browser', 'A runtime that executes JavaScript outside the browser', 'A database', 'A language different from JS'], a: 1, why: 'Same language, new habitats: your terminal, servers, build tools.' },
      { q: 'npm is…', options: ['A code editor', 'The package manager — installs shared code libraries', 'A server host', 'A JS framework'], a: 1, why: 'The app store of JavaScript code, wired into every project via package.json.' },
      { q: 'node_modules should be…', options: ['Committed to git proudly', 'Listed in .gitignore — it\'s reinstallable from package.json', 'Emailed to teammates', 'Edited by hand'], a: 1, why: 'package.json is the recipe; node_modules is the cooked meal. Share recipes, not meals.' }
    ]
  },

  {
    id: 'pytools', name: 'Python tooling (pip & venv)', icon: '🐍', kind: 'essential',
    tagline: 'Install anything, isolate everything — Python projects done right.',
    pitch: 'Real Python work runs on two tools: pip installs packages from PyPI (the Python package index — numpy, requests, pytorch, all of it), and venv gives each project its own isolated package bubble so projects can\'t break each other. Learn the two-command ritual once and every Python tutorial on the internet suddenly works.',
    uses: ['Installing libraries (numpy, requests…)', 'Isolating project dependencies', 'Running the AI/data stack locally', 'Reproducible setups via requirements.txt'],
    famous: ['PyPI: ~500k packages', 'Every data-science tutorial\'s first line', 'The AI track\'s tools (numpy, torch) live here'],
    facts: [
      ['pip', '<code>pip install requests</code> — fetch a package from PyPI'],
      ['venv', 'a per-project bubble: packages install into it, not system-wide'],
      ['The ritual', 'create venv → activate → pip install → work. Every project, same dance'],
      ['requirements.txt', 'the list of a project\'s packages — <code>pip install -r requirements.txt</code> recreates it anywhere'],
      ['Jupyter', '<code>pip install notebook</code> — the interactive notebook environment data science lives in']
    ],
    samples: [
      { title: 'The per-project ritual (memorize this)', lang: 'bash',
        code: 'cd my-project\npython -m venv .venv              # 1. create the bubble (once)\n\n.venv\\Scripts\\activate            # 2. enter it (Windows)\n# source .venv/bin/activate       #    (Mac/Linux version)\n\npip install requests numpy        # 3. install into the bubble\npip freeze > requirements.txt     # 4. write down what you used\npython app.py                     # 5. run inside the bubble',
        output: '(.venv) C:\\my-project>   <- the prompt shows you\'re in the bubble' },
      { title: 'Why it matters: packages in action', lang: 'python',
        code: '# after pip install requests - talk to any API in 3 lines:\nimport requests\n\ndata = requests.get("https://api.github.com/users/torvalds").json()\nprint(data["name"], "-", data["public_repos"], "public repos")',
        output: 'Linus Torvalds - 7 public repos' }
    ],
    firstSteps: [
      'You have Python already if you did the track locally — verify: <code>python --version</code> and <code>pip --version</code>.',
      'Do the ritual once in a scratch folder: venv, activate, <code>pip install requests</code>, run the sample.',
      'Golden rule: see a tutorial say "pip install X"? Activate a venv first. System-wide installs are how Pythons get haunted.',
      'For data/AI work: <code>pip install notebook numpy</code> then <code>jupyter notebook</code> — the exploratory environment the field runs on.'
    ],
    related: ['python', 'ai'],
    quiz: [
      { q: 'What does pip do?', options: ['Formats code', 'Installs Python packages from PyPI', 'Runs tests', 'Compiles Python'], a: 1, why: 'The gateway to the ecosystem — every library in the Python track\'s "real world" lesson arrives via pip.' },
      { q: 'A virtual environment (venv) exists to…', options: ['Speed up Python', 'Give each project isolated packages so they can\'t conflict', 'Hide your code', 'Run Python in browsers'], a: 1, why: 'Project A needs numpy 1.x, project B needs 2.x — bubbles make both true.' },
      { q: 'requirements.txt lets anyone…', options: ['Read your code', 'Recreate your exact package setup with one pip command', 'Run without Python', 'Skip venvs'], a: 1, why: 'Reproducibility: the difference between "works on my machine" and works.' }
    ]
  },

  {
    id: 'docker', name: 'Docker', icon: '🐳', kind: 'essential',
    tagline: '"Works on my machine" — now shipping YOUR machine to everyone.',
    pitch: 'Docker packages an app WITH its entire environment — OS layer, language runtime, packages, config — into an image that runs identically on any computer. The venv idea, extended to everything. It\'s how modern software ships: build the image once, run containers of it anywhere, from your laptop to a thousand cloud servers.',
    uses: ['Running databases without installing them', 'Shipping backends to servers', 'Identical dev environments for whole teams', 'The building block of cloud deployment (Kubernetes)'],
    famous: ['The container revolution (2013)', 'Kubernetes orchestrates Docker containers', 'Written in Go (Atlas checkmark!)'],
    facts: [
      ['Image', 'the frozen recipe: app + runtime + OS layer, built from a Dockerfile'],
      ['Container', 'a running instance of an image — start, stop, delete, start fresh'],
      ['Dockerfile', 'the build script: FROM a base, COPY code, RUN installs, CMD to start'],
      ['Docker Hub', 'the registry of ready images: postgres, python, nginx — <code>docker run</code> away'],
      ['The killer demo', 'a full database, running in one command, deletable without a trace']
    ],
    samples: [
      { title: 'The taste test', lang: 'bash',
        code: 'docker run hello-world            # prove it works\n\n# a REAL PostgreSQL database, zero installation:\ndocker run --name mydb -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres\n\ndocker ps                          # see it running\ndocker stop mydb                   # stop it\ndocker rm mydb                     # gone without a trace',
        output: 'CONTAINER ID  IMAGE     STATUS         PORTS\nf3a91c2b8d10  postgres  Up 12 seconds  0.0.0.0:5432->5432/tcp' },
      { title: 'A Dockerfile for a Python app', lang: 'bash',
        code: '# Dockerfile - the environment as code\nFROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nCMD ["python", "app.py"]\n\n# then:  docker build -t my-app .   &&   docker run my-app',
        output: '(the same image runs on your laptop, a teammate\'s Mac,\n and a Linux server - byte-for-byte identical)' }
    ],
    firstSteps: [
      'Install Docker Desktop (docker.com) — on Windows it uses WSL2; the installer handles it.',
      '<code>docker run hello-world</code> — the ritual first container.',
      'Run the postgres example, then connect to it — a database you didn\'t install, deletable in one command.',
      'Dockerize something of yours: the Node server from the Node page + a 6-line Dockerfile is the classic first build.'
    ],
    related: ['python', 'sql'],
    quiz: [
      { q: 'Image vs container:', options: ['Same thing', 'Image = frozen recipe; container = a running instance of it', 'Container = compressed image', 'Images run faster'], a: 1, why: 'One image, many containers — like a class and its objects.' },
      { q: 'Docker\'s core promise:', options: ['Faster code', 'The same environment everywhere — laptop and server run the identical image', 'Free hosting', 'No more bugs'], a: 1, why: '"Works on my machine" becomes "my machine ships with it".' },
      { q: 'A Dockerfile is…', options: ['A container backup', 'The build script defining an image: base, dependencies, code, start command', 'A config for Windows', 'A database file'], a: 1, why: 'The environment, versioned as code — reviewable, repeatable, buildable anywhere.' }
    ]
  },

  {
    id: 'http', name: 'HTTP & APIs', icon: '⇄', kind: 'essential',
    tagline: 'The protocol of everything — how programs talk across the internet.',
    pitch: 'Every page load, every fetch(), every app checking your notifications is an HTTP conversation: a request (method + URL + maybe a body) and a response (status code + data, usually JSON). Learn to read these conversations and every API on Earth — weather, GitHub, Claude, your own backends — becomes usable from any language you know.',
    uses: ['Using public APIs from your code', 'Building your own backends', 'Debugging with the Network tab', 'Understanding literally every web app'],
    famous: ['REST APIs everywhere', 'The fetch() from your JS track', 'curl — the terminal\'s HTTP swiss knife'],
    facts: [
      ['Methods', 'GET (read) · POST (create) · PUT/PATCH (update) · DELETE — verbs of the web'],
      ['Status codes', '200 OK · 201 Created · 404 Not Found · 403 Forbidden · 500 Server Error'],
      ['JSON', 'the lingua franca payload — your JS objects / Python dicts, as text'],
      ['Headers', 'metadata: content types, auth tokens (<code>Authorization: Bearer …</code>)'],
      ['curl', 'make any HTTP request from the terminal — the universal API tester']
    ],
    samples: [
      { title: 'One conversation, dissected', lang: 'bash',
        code: '# the request (curl shows it all):\ncurl -i https://api.github.com/users/octocat\n\n# REQUEST:  GET /users/octocat HTTP/1.1\n#           Host: api.github.com',
        output: 'HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  "login": "octocat",\n  "name": "The Octocat",\n  "followers": 18435\n}' },
      { title: 'The same call from every language you know', lang: 'text',
        code: 'JavaScript:  const d = await (await fetch(url)).json();\nPython:      d = requests.get(url).json()\nTerminal:    curl url | more\nTypeScript:  same as JS, plus an interface for the shape!',
        output: '(one protocol, every language - this is why\n HTTP knowledge transfers everywhere)' }
    ],
    firstSteps: [
      'Open the Network tab (DevTools page!), reload any site, click a request — you\'re reading real HTTP right now.',
      'curl something: <code>curl https://api.github.com/users/torvalds</code> works in PowerShell and bash alike.',
      'Pick a free API (no key needed: open-meteo.com for weather, pokeapi.co for Pokémon) and fetch() it from the JS playground here.',
      'Then build your own endpoint with the Node page\'s server sample — be both sides of the conversation.'
    ],
    related: ['js', 'python'],
    quiz: [
      { q: 'GET vs POST:', options: ['GET is faster', 'GET reads data; POST sends data to create something', 'POST is deprecated', 'They\'re interchangeable'], a: 1, why: 'The method is the verb: what you intend to do to the resource at that URL.' },
      { q: 'Status 404 means…', options: ['Server crashed', 'The thing you asked for doesn\'t exist there', 'Forbidden', 'Success'], a: 1, why: '4xx = your request\'s problem; 5xx = the server\'s problem; 2xx = all good.' },
      { q: 'APIs overwhelmingly exchange data as…', options: ['HTML', 'JSON', 'CSV', 'XML only'], a: 1, why: 'JSON maps directly onto the objects/dicts of every language in this site.' }
    ]
  },

  {
    id: 'godot', name: 'Godot', icon: '🤖', kind: 'engine',
    tagline: 'The free, open-source engine — the friendliest road into game dev.',
    pitch: 'Godot is a complete game engine — scene editor, physics, animation, sound, export to every platform — that\'s genuinely free (no royalties, no strings, open source) and refreshingly light (~100MB). Its GDScript language is so Python-like that the Python track makes you productive on day one. For learning game development in 2026, it\'s the default recommendation.',
    uses: ['2D games (its superpower)', '3D games (solid and improving)', 'Game jams', 'Mobile & desktop releases'],
    famous: ['Brotato', 'Dome Keeper', 'Cassette Beasts', 'Thousands of jam games'],
    facts: [
      ['Price', 'free forever, MIT-licensed, no royalties ever'],
      ['Language', 'GDScript (Python-flavored) — C# also supported'],
      ['Core idea', 'everything is a Node in a Scene tree: a player = Sprite node + collision node + your script'],
      ['Size', '~100MB download, runs on modest hardware'],
      ['Exports to', 'Windows, Mac, Linux, phones, web']
    ],
    samples: [
      { title: 'GDScript: Python players feel at home', lang: 'python',
        code: 'extends CharacterBody2D    # this script IS the player\n\nvar speed = 300\n\nfunc _physics_process(delta):\n    var direction = Input.get_axis("ui_left", "ui_right")\n    velocity.x = direction * speed\n    move_and_slide()\n\nfunc _on_coin_collected():\n    print("Coin! 🪙")',
        output: '(attach to a sprite in the editor - arrow keys move it.\n That\'s a game character in 10 lines.)' },
      { title: 'The mental model', lang: 'text',
        code: 'Scene: Level1\n └─ Player (CharacterBody2D)  <- script above lives here\n     ├─ Sprite2D              <- the picture\n     └─ CollisionShape2D      <- the physics body\n └─ Coin (Area2D)\n     └─ signal body_entered -> Player._on_coin_collected',
        output: '(games = trees of nodes + scripts + signals between them)' }
    ],
    firstSteps: [
      'Download from godotengine.org (~100MB), no install — it just runs.',
      'Do the official "Your first 2D game" tutorial (docs.godotengine.org) — a complete dodge-the-creeps game in an afternoon.',
      'GDScript = your Python skills: indentation blocks, def→func, same loops and ifs.',
      'Then jam! game jams (itch.io/jams) are the classic way to finish small games and level up fast.'
    ],
    related: ['python'],
    quiz: [
      { q: 'Godot costs…', options: ['$99/year', 'Nothing — open source, no royalties ever', '5% of revenue', 'Free until you publish'], a: 1, why: 'MIT license: make, sell, keep everything. Its funding is donations.' },
      { q: 'GDScript most resembles…', options: ['C++', 'Python', 'JavaScript', 'SQL'], a: 1, why: 'Indentation, func/var, readable flow — the Python track transfers almost directly.' },
      { q: 'In Godot, a game is built from…', options: ['One big file', 'Trees of nodes (sprites, physics, sounds) with scripts attached', 'Pure code, no editor', 'Spreadsheets'], a: 1, why: 'The scene/node tree is the engine\'s core mental model — compose behaviors from parts.' }
    ]
  },

  {
    id: 'unity', name: 'Unity', icon: '◇', kind: 'engine',
    tagline: 'The engine behind half the indie hits and most mobile games.',
    pitch: 'Unity is the industry\'s general-purpose workhorse: a massive editor, an asset store full of ready-made pieces, export to 25+ platforms, and C# as its scripting language (the Atlas page\'s samples were real Unity code). The tutorial ecosystem is the largest in games — whatever you\'re stuck on, someone made a video about it in 2019.',
    uses: ['Mobile games (its kingdom)', '2D & 3D indie games', 'AR/VR (Quest apps are mostly Unity)', 'Simulations & visualization'],
    famous: ['Hollow Knight', 'Cuphead', 'Among Us', 'Pokémon GO', 'Monument Valley'],
    facts: [
      ['Price', 'free tier until your revenue is substantial ($200k+/yr)'],
      ['Language', 'C# — see its Atlas page; the skills transfer to all .NET work'],
      ['Core idea', 'GameObjects + Components: an entity is a bag of behaviors (renderer, collider, YOUR script)'],
      ['Asset Store', 'buy/download art, sound, whole systems — prototype at warp speed'],
      ['Exports to', 'basically everything with a screen']
    ],
    samples: [
      { title: 'A Unity script (C#)', lang: 'csharp',
        code: 'using UnityEngine;\n\npublic class Bouncer : MonoBehaviour {\n    public float jumpForce = 8f;\n    private Rigidbody2D rb;\n\n    void Start() {\n        rb = GetComponent<Rigidbody2D>();\n    }\n\n    void Update() {\n        if (Input.GetKeyDown(KeyCode.Space)) {\n            rb.linearVelocity = Vector2.up * jumpForce;\n        }\n    }\n}',
        output: '(drag onto any object with physics: Space now makes it hop.\n Update() runs every frame - the game loop, visible)' },
      { title: 'The mental model', lang: 'text',
        code: 'GameObject "Player"\n ├─ SpriteRenderer   (how it looks)\n ├─ Rigidbody2D      (how physics moves it)\n ├─ BoxCollider2D    (how it bumps things)\n └─ Bouncer.cs       (YOUR behavior, above)\n\nComposition over inheritance: build entities like LEGO.',
        output: '(same philosophy as Godot\'s nodes - engines converge on this)' }
    ],
    firstSteps: [
      'Install Unity Hub from unity.com, then the latest LTS editor version through it.',
      'Do "Roll-a-Ball" (learn.unity.com) — the canonical first project: a marble, a board, collectibles, score.',
      'C# feels like TypeScript/Java — brush the Atlas C# page; your JS-track brain adapts in a week.',
      'Choosing an engine? Unity for mobile/AR ambitions and job listings; Godot for pure learning joy and 2D indie.'
    ],
    related: ['js', 'ts'],
    quiz: [
      { q: 'Unity scripts are written in…', options: ['UnityScript', 'C#', 'C++', 'Lua'], a: 1, why: 'C# is the language — and it counts as real professional C# experience.' },
      { q: 'The GameObject + Component model means…', options: ['Deep inheritance trees', 'Entities are assembled from behavior parts (renderer + collider + your script)', 'One file per game', 'No code needed'], a: 1, why: 'Composition: add capabilities like LEGO bricks. Modern engine design in one idea.' },
      { q: '<code>Update()</code> in a Unity script runs…', options: ['Once at start', 'Every frame — it\'s the game loop\'s hook', 'On errors', 'When you save'], a: 1, why: '60 times a second, your code steers the world — the heartbeat of every game.' }
    ]
  },

  {
    id: 'unreal', name: 'Unreal Engine', icon: 'U', kind: 'engine',
    tagline: 'The AAA powerhouse — Hollywood graphics, Blueprints for mortals.',
    pitch: 'Unreal is the engine of blockbuster games and, increasingly, film production — the most advanced real-time graphics available to the public. Its twist for learners: Blueprints, a complete visual programming system where you wire nodes instead of typing, with C++ underneath when you outgrow it. Heavier than the others in every way (download, hardware, learning curve) — and the ceiling is the sky.',
    uses: ['AAA & high-end 3D games', 'Film/TV virtual production (The Mandalorian!)', 'Architectural visualization', 'Car configurators & simulations'],
    famous: ['Fortnite', 'Final Fantasy VII Remake', 'The Matrix Awakens demo', 'The Mandalorian\'s LED stage'],
    facts: [
      ['Price', 'free; 5% royalty only after $1M revenue per title'],
      ['Languages', 'Blueprints (visual) + C++ (see the Atlas page)'],
      ['Graphics tech', 'Nanite (infinite detail) + Lumen (real-time global illumination)'],
      ['Hardware appetite', 'wants a real GPU and ~100GB of disk. It is not shy'],
      ['Made by', 'Epic Games — funded by a certain battle royale']
    ],
    samples: [
      { title: 'Blueprints: programming, but wired', lang: 'text',
        code: '[Event: OnComponentBeginOverlap (Coin)]\n        │\n        ▼\n[Get Player State] ──▶ [Add Score: +10]\n        │\n        ▼\n[Play Sound: coin.wav] ──▶ [Destroy Actor (Coin)]\n\n(each box is a node; each arrow is execution flow -\n the same logic as code, drawn instead of typed)',
        output: '(your if/then/function-call thinking from every track\n applies directly - only the medium changed)' },
      { title: 'The C++ underneath (when you\'re ready)', lang: 'cpp',
        code: 'void ACoin::OnOverlap(AActor* OtherActor) {\n    if (APlayerCharacter* Player = Cast<APlayerCharacter>(OtherActor)) {\n        Player->AddScore(10);\n        UGameplayStatics::PlaySound2D(this, PickupSound);\n        Destroy();\n    }\n}',
        output: '(same coin logic - Blueprints and C++ are two views\n of one engine; teams mix them freely)' }
    ],
    firstSteps: [
      'Install the Epic Games Launcher, then Unreal Engine (allow ~100GB and a beefy GPU; if your machine wheezes, start with Godot/Unity and return).',
      'Do the official "Your First Hour in Unreal" learning path — Blueprints only, no C++.',
      'Build something tiny in Blueprints: a door that opens, a coin that scores. Visual programming is still programming — your logic skills are the transferable part.',
      'Only reach for C++ when Blueprints feel limiting; that\'s the intended path, even in studios.'
    ],
    related: ['js'],
    quiz: [
      { q: 'Blueprints are…', options: ['Level maps', 'Unreal\'s visual programming: logic as wired nodes, no typing required', 'Paid DLC', 'Documentation'], a: 1, why: 'Complete games ship on Blueprints alone — it\'s real programming in visual form.' },
      { q: 'Unreal\'s royalty model:', options: ['$200/month', 'Free until $1M revenue per title, then 5%', 'Always 30%', 'One-time $5000'], a: 1, why: 'Effectively free for learners and indies; Epic profits only when you seriously do.' },
      { q: 'Beyond games, Unreal is famous in…', options: ['Accounting', 'Film & TV virtual production — real-time CGI backdrops on LED stages', 'Databases', 'Word processing'], a: 1, why: 'The Mandalorian popularized it: the engine renders the set live behind the actors.' }
    ]
  },

  {
    id: 'webgl', name: 'WebGL & Three.js', icon: '🎲', kind: 'engine',
    tagline: 'Games and 3D in the browser — no install, no engine, just a URL.',
    pitch: 'The browser is secretly a game platform: Canvas draws 2D with JavaScript, WebGL taps the GPU for 3D, and Three.js wraps WebGL\'s complexity into a friendly scene/camera/mesh API. Your JS-track skills are the whole prerequisite, distribution is "send a link", and the game loop below runs right here to prove it.',
    uses: ['Browser games', '3D product viewers on shop sites', 'Data visualizations', 'Interactive art & portfolio wow-pieces'],
    famous: ['Google Earth in the browser', 'Figma\'s canvas rendering', 'Countless .io games', 'Bruno Simon\'s drivable portfolio (bruno-simon.com)'],
    facts: [
      ['Canvas 2D', 'immediate drawing API: rects, images, text — perfect for 2D games'],
      ['The game loop', 'requestAnimationFrame runs your update+draw ~60×/second'],
      ['WebGL', 'raw GPU access from JS — powerful, verbose (100 lines per triangle)'],
      ['Three.js', 'the friendly 3D layer: scene, camera, lights, meshes in ~10 lines'],
      ['Phaser', 'a full 2D game framework (sprites, physics, sound) atop Canvas/WebGL']
    ],
    samples: [
      { title: 'Three.js: a spinning 3D cube, complete', lang: 'js',
        code: 'const scene = new THREE.Scene();\nconst camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight);\nconst renderer = new THREE.WebGLRenderer();\ndocument.body.appendChild(renderer.domElement);\n\nconst cube = new THREE.Mesh(\n  new THREE.BoxGeometry(),\n  new THREE.MeshNormalMaterial()\n);\nscene.add(cube);\ncamera.position.z = 2;\n\nfunction loop() {\n  cube.rotation.x += 0.01;\n  cube.rotation.y += 0.02;\n  renderer.render(scene, camera);\n  requestAnimationFrame(loop);\n}\nloop();',
        output: '(a rotating 3D cube - the hello-world of Three.js.\n Needs the three.js library from a CDN; try it in a local file)' }
    ],
    demo: {
      mode: 'web',
      title: 'A real game loop — runs right here',
      html: '<canvas id="game" width="360" height="200"></canvas>\n<p id="hud">Click the canvas, then use ← → to move the paddle!</p>',
      css: 'body { font-family: sans-serif; background: #0b1020; color: #cfd8ff; text-align: center; }\ncanvas { background: #131a33; border-radius: 10px; margin-top: 14px; outline: none; }\n#hud { font-size: 13px; }',
      js: 'const cv = document.querySelector("#game");\nconst ctx = cv.getContext("2d");\ncv.tabIndex = 0;   // so it can receive keyboard focus\n\nconst ball = { x: 180, y: 60, vx: 2.4, vy: 2, r: 7 };\nconst paddle = { x: 150, w: 64, h: 8 };\nlet score = 0, keys = {};\n\ncv.addEventListener("keydown", e => { keys[e.key] = true; e.preventDefault(); });\ncv.addEventListener("keyup",   e => keys[e.key] = false);\n\nfunction update() {\n  if (keys.ArrowLeft)  paddle.x = Math.max(0, paddle.x - 5);\n  if (keys.ArrowRight) paddle.x = Math.min(cv.width - paddle.w, paddle.x + 5);\n\n  ball.x += ball.vx;  ball.y += ball.vy;\n  if (ball.x < ball.r || ball.x > cv.width - ball.r) ball.vx *= -1;\n  if (ball.y < ball.r) ball.vy *= -1;\n\n  const py = cv.height - 20;\n  if (ball.y + ball.r > py && ball.x > paddle.x && ball.x < paddle.x + paddle.w && ball.vy > 0) {\n    ball.vy *= -1.03;   // bounce, slightly faster (difficulty curve!)\n    score++;\n  }\n  if (ball.y > cv.height + 20) {   // missed - reset\n    Object.assign(ball, { x: 180, y: 60, vx: 2.4, vy: 2 });\n    score = 0;\n  }\n}\n\nfunction draw() {\n  ctx.clearRect(0, 0, cv.width, cv.height);\n  ctx.fillStyle = "#ffd166";\n  ctx.beginPath();\n  ctx.arc(ball.x, ball.y, ball.r, 0, 7);\n  ctx.fill();\n  ctx.fillStyle = "#6db4f5";\n  ctx.fillRect(paddle.x, cv.height - 20, paddle.w, paddle.h);\n  ctx.fillStyle = "#cfd8ff";\n  ctx.fillText("Bounces: " + score, 10, 16);\n}\n\nfunction loop() {          // THE game loop - every engine has this heart\n  update();                // 1. advance the world\n  draw();                  // 2. paint the frame\n  requestAnimationFrame(loop);   // 3. again, ~60x/sec\n}\nloop();'
    },
    firstSteps: [
      'Run the demo above — then read its loop() function: update, draw, repeat. That heartbeat is every game engine\'s core.',
      'Mod it: change speeds, add a second ball, make the paddle shrink per bounce. Canvas rewards fiddling.',
      'For 3D: threejs.org\'s manual + examples — copy the cube sample into a local HTML file with the CDN script tag.',
      'For bigger 2D games: Phaser (phaser.io) adds sprites, physics and sound — its tutorial builds a platformer in an hour.'
    ],
    related: ['js', 'website'],
    quiz: [
      { q: 'The game loop pattern is…', options: ['A for-loop over levels', 'update() then draw(), repeated ~60×/second via requestAnimationFrame', 'A while(true) that freezes pages', 'Only for 3D'], a: 1, why: 'Advance the world, paint a frame, schedule the next — the heartbeat under every engine in this Toolbox.' },
      { q: 'Three.js exists because…', options: ['WebGL is deprecated', 'Raw WebGL is powerful but takes ~100 lines to draw a triangle — Three.js makes it 10', 'Browsers can\'t do 3D', 'It\'s required by law'], a: 1, why: 'It wraps the GPU plumbing in scene/camera/mesh concepts humans can hold.' },
      { q: 'Browser games\' superpower vs installed games:', options: ['Better graphics', 'Distribution — playing is clicking a link, on any device', 'More RAM', 'Easier multiplayer'], a: 1, why: 'Zero install friction. Your Toolbox-WebGL games ship by URL, like every site you\'ve built here.' }
    ]
  },

  {
    id: 'ai-coding', name: 'Coding with AI assistants', icon: '✨', kind: 'guide',
    tagline: 'Use AI to learn faster — not to skip the learning.',
    pitch: 'AI assistants (Claude, Copilot, ChatGPT) write plausible code on demand, which makes them either the best tutor you\'ve ever had or a machine for skipping the exact struggle that builds skill — the difference is entirely in HOW you use them. This guide is the usage manual nobody hands out: the habits that compound your learning, the traps that hollow it out, and the professional workflows worth copying.',
    uses: ['Explaining confusing code & errors', 'Unsticking yourself with hints', 'Code review of YOUR code', 'Generating practice problems', 'Pair-programming on real projects'],
    famous: ['Claude Code & Copilot in most professional editors', 'The single biggest change to programming since Stack Overflow'],
    facts: [
      ['The golden rule', 'AI for understanding: always. AI for answers you paste unread: never.'],
      ['The learner\'s prompt', '"Give me a HINT, not the solution" — the phrase that keeps the struggle (and growth) yours'],
      ['The trust rule', 'AI code is a confident first draft: often right, sometimes subtly wrong. YOU are the reviewer'],
      ['The skill that grows', 'reading code critically — which is exactly the skill senior engineers have'],
      ['Hallucination', 'AI sometimes invents functions/APIs that don\'t exist. Run everything.']
    ],
    samples: [
      { title: 'The same question, asked badly and well', lang: 'text',
        code: '❌ "write me a function that finds duplicates in an array"\n   (you get code; you learn nothing; next week you need it again)\n\n✅ "I wrote this duplicate-finder. It works but feels clumsy -\n    review it like a senior engineer would. Don\'t rewrite it;\n    tell me what you\'d change and WHY."\n\n✅ "Explain what this error means in plain words, and give me\n    a hint about where to look - but do NOT fix it for me."\n\n✅ "Quiz me: 5 questions about JS closures, one at a time,\n    and correct my answers."',
        output: '(the well-asked versions leave the learning inside you)' },
      { title: 'The professional workflow worth copying', lang: 'text',
        code: '1. Try it yourself FIRST (even 10 minutes) - the attempt primes\n   your brain to actually absorb the answer\n2. Ask for hints, escalate slowly: concept -> approach -> code\n3. When you do get code: read every line; ask about any line\n   you couldn\'t have written; rename things to prove you own it\n4. Run it. Test it (Testing track!). AI code fails tests too.\n5. Close the loop: "explain what I misunderstood" - turn every\n   rescue into a lesson',
        output: '(AI as tutor and reviewer, never as a vending machine)' }
    ],
    firstSteps: [
      'Adopt the hint rule today: next time you\'re stuck on a lesson here, ask an AI for a hint — explicitly forbid the full solution.',
      'Paste code YOU wrote and ask for review — critique of your own work is where AI teaches hardest.',
      'When AI gives you code, make yourself explain every line back (rubber-duck it). Can\'t explain it? Ask about exactly that line.',
      'Watch for the dependency signal: if you can\'t start any task without AI, downshift — do the Practice section exercises solo until the muscles return.'
    ],
    related: ['js', 'python'],
    quiz: [
      { q: 'The best learning prompt when stuck is…', options: ['"Fix this for me"', '"Give me a hint, not the solution"', '"Write it all"', '"Is coding dead?"'], a: 1, why: 'Hints keep the productive struggle — and the skill — yours.' },
      { q: 'AI-generated code should be treated as…', options: ['Always correct', 'A confident first draft that YOU review, run and test', 'Always wrong', 'Magic'], a: 1, why: 'Often right, sometimes subtly wrong, occasionally invented. The reviewer is you.' },
      { q: 'The skill that AI-era programmers need MOST is…', options: ['Typing speed', 'Reading code critically and judging correctness', 'Memorizing syntax', 'Avoiding AI entirely'], a: 1, why: 'When drafts are free, judgment is the scarce skill — build it deliberately.' }
    ]
  },

  {
    id: 'career', name: 'Getting hired', icon: '💼', kind: 'guide',
    tagline: 'From "I can code" to "I\'m hired" — the practical path.',
    pitch: 'The gap between coding skill and a coding job is a second skill set: showing your work, telling its story, and navigating interviews. The good news — as a Code Teacher graduate you already have real projects, and real projects are the strongest currency a new developer holds. This guide turns what you\'ve built here into a portfolio, a GitHub presence, and interview readiness.',
    uses: ['First dev job or internship', 'Freelance credibility', 'Career-switching', 'Standing out without a CS degree'],
    famous: ['Every self-taught developer you\'ve heard of walked exactly this path'],
    facts: [
      ['The core loop', 'build real things → publish them → write about them → repeat'],
      ['Portfolio > résumé', 'a live site with 3 polished projects beats any bullet list'],
      ['GitHub is the new CV', 'recruiters look; green squares and readable READMEs talk'],
      ['Interviews have 3 flavors', 'coding problems (your DS&A track!), project walkthroughs, behavior questions'],
      ['The numbers game', 'rejection is the default for everyone; volume + iteration wins']
    ],
    samples: [
      { title: 'The portfolio that works (you\'ve already built it here)', lang: 'text',
        code: 'Your capstone portfolio site (Projects track), published, containing:\n  1. The neural-net playground   <- "wait, YOU built that?"\n  2. The memory game or quiz app <- polish + game feel\n  3. The leaderboard database    <- "knows SQL" proven\nEach with: live demo link, source link, and a 3-sentence story:\n  what it does / what was hard / what you\'d improve.\nThat last sentence is senior-engineer thinking - interviewers notice.',
        output: '(three finished things beat thirty tutorials - every time)' },
      { title: 'Interview prep map (all trained on this site)', lang: 'text',
        code: 'Coding rounds   -> DS&A track + Practice exercises (redo them cold)\nProject rounds  -> rehearse a 2-min tour of each portfolio piece:\n                   problem -> approach -> a hard bug -> what you learned\nBehavior rounds -> prepare 3 stories in STAR shape\n                   (Situation, Task, Action, Result)\n"Any questions?" -> always: "What does a great first 90 days\n                   look like in this role?"',
        output: '(interviews are a performance - rehearsal is legal and expected)' }
    ],
    firstSteps: [
      'Publish the capstone portfolio (Build-a-Website lesson 8) with your 3 best projects from this site — this week, imperfect, live.',
      'Move your projects to GitHub (Toolbox → Git) with real READMEs: what it is, screenshot, how to run it. Commit regularly — the activity graph is quietly persuasive.',
      'Write one short post (on the portfolio blog you built!) about something you debugged — writing about code is rare among juniors and glows on applications.',
      'Then apply in volume, tailor the first line of each application to the company, and treat every interview as a practice rep. The nth try lands.'
    ],
    related: ['website', 'dsa'],
    quiz: [
      { q: 'The strongest asset for a first dev job is…', options: ['A long résumé', 'A few finished, published projects with their stories told well', 'Memorized algorithms', 'Certificates alone'], a: 1, why: 'Proof of shipping beats claims of knowing — three polished pieces suffice.' },
      { q: 'A project README should lead with…', options: ['Your biography', 'What it is, a screenshot, and how to run it', 'The license', 'Commit history'], a: 1, why: 'A recruiter gives it 30 seconds; make them count.' },
      { q: 'STAR in behavioral interviews stands for…', options: ['Skills, Talent, Ambition, Résumé', 'Situation, Task, Action, Result', 'Study, Test, Apply, Repeat', 'A rating system'], a: 1, why: 'The story shape that turns "tell me about a challenge" into a crisp two minutes.' }
    ]
  }
];
