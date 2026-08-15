# Code Teacher

An interactive website that teaches you how to code — no account, no install, no internet required.
Open `index.html` in any browser and start learning.

---

## The improved prompt (what this project is)

> Build a self-contained, offline-friendly website called **Code Teacher** that teaches multiple
> programming languages — **HTML, CSS, JavaScript, Python, and SQL** — through short, plain-language
> lessons organized into tracks, and surveys the rest of the language world in a **Language Atlas**
> (TypeScript, Java, C, C++, C#, Go, Rust, Ruby, PHP, Swift, Kotlin, Bash, Lua, R — each with real
> code, quizzes, and a getting-started guide, plus a page on how to learn ANY language fast).
> Each lesson should include:
>
> 1. A clear explanation with runnable example code,
> 2. A **"Try it yourself" live code editor** with instant preview/output in the page,
> 3. A short **quiz** with instant feedback and explanations,
> 4. A **mini-challenge** with hints and a revealable solution.
>
> Lessons are grouped by difficulty (Beginner → Intermediate → Advanced). A **skill assessment**
> quiz on first visit recommends where each learner should start, so the difficulty adapts to what
> the person already knows — but nothing is ever locked.
>
> Beyond individual languages, include a **"Build a Website" track** that shows how HTML, CSS, and
> JavaScript combine into a real site, ending with how to publish it for free — and an
> **AI & Neural Nets track** where learners build and *actually train* real neural networks
> (perceptrons, backprop, XOR, numpy, CNN filters) in both Python and JavaScript, right in the
> page, plus a tour of CNNs, RNNs, transformers and the real frameworks. Every track lists what
> that language is used for in the real world.
>
> Include a **Projects** section with guided projects at every difficulty level (filterable by
> language and difficulty), each with step-by-step instructions, starter code loaded into a live
> editor, a hidden full solution, and "make it yours" extension ideas. Beyond the fixed projects,
> add an **adaptive challenge generator** that composes endless custom project briefs and scales
> their complexity to the learner's recorded progress — the more lessons completed, the more
> requirement tiers each brief demands.
>
> Guide learners through problems, not just around them: build an **error decoder** into every
> code editor that appends a plain-English explanation and fix strategy beneath any JavaScript or
> Python error, and include a debugging cheat sheet teaching the universal 5-step method.
>
> Add supporting features that make learning stick:
> - **Progress tracking** (completed lessons, quiz scores, finished projects) saved in the browser,
> - A **free-play code playground** (HTML/CSS/JS with live preview, plus Python),
> - **Cheat sheets** for every language plus a plain-English glossary of coding terms,
> - **Search** across all lessons and projects,
> - **Dark/light mode**, syntax-highlighted code with copy buttons, and a clean, friendly design.
>
> Build it with plain HTML/CSS/JS (no frameworks, no build step) so the site itself is a teaching
> example: learners can open the source of the very site that's teaching them and understand it.

## What's inside

| Area | What you get |
|---|---|
| **Tracks** | HTML (10 lessons), CSS (10), JavaScript (13, incl. regex), TypeScript (8), Python (12), SQL (8), Build a Website (9, incl. security), Testing (4), Data Structures & Algorithms (6), AI & Neural Nets (8) — 88 lessons total |
| **Practice** | Auto-graded exercises (JS, Python, SQL): write code, Run tests, get judged by real assertions |
| **Review** | Spaced repetition of every quiz question you miss (1 → 3 → 7 days, graduate at 3 correct) |
| **Journey** | A guided 15-milestone roadmap through everything, with your position on the map |
| **Achievements** | Badges and daily streaks; progress backup/restore in the footer |
| **App Blueprints** | How 8 famous app types are built (video platform, chat, store, search, AI chatbot…) with live runnable miniatures, SQL data models and MVP plans |
| **The Toolbox** | 12 tool guides: terminal (cmd/PowerShell/bash), git, VS Code, DevTools, Node/npm, Python tooling, Docker, HTTP/APIs — and game engines: Godot, Unity, Unreal, WebGL (live game-loop demo) |
| **Language Atlas** | 19 more languages (incl. Dart, Haskell, Assembly, Julia, Zig) + the how-to-learn-anything meta-page, each with code tours and quizzes |
| **Encyclopedia** | A searchable catalog of 350+ real documented languages — every entry classified and linked to its closest relative on the site |
| **Skill assessment** | 9-question quiz that recommends a starting level per area |
| **Projects** | 16 guided projects across Beginner / Intermediate / Advanced, incl. AI and database builds |
| **Challenge generator** | Endless custom project briefs whose difficulty scales with your progress (`#/generate`) |
| **Error decoder** | Every editor explains JS/Python errors in plain English under the output |
| **Playground** | Free HTML/CSS/JS editor with live preview + console, plus Python and SQL runners |
| **Reference** | Cheat sheets for each language + AI/ML, a debugging guide, and a glossary |
| **Progress** | Everything you complete is remembered by your browser (localStorage) |

## How to run it

Just open `index.html` — double-click it, or drag it into a browser window. Everything works
offline from the file itself.

The only features that need internet are the heavier language runtimes, each fetched from a CDN
on first Run: **Python** (Pyodide, ~10 MB), **SQL** (sql.js, ~1 MB) and **TypeScript** (the real
compiler, ~8 MB). When offline, those lessons still show the expected output of every example —
and HTML/CSS/JS editors work fully offline always.

## Project structure

```
Code Teacher/
├── index.html          The single page that hosts everything
├── css/style.css       All styling (light + dark themes)
├── js/app.js           The engine: router, editors, quizzes, progress,
│                       search, error decoder, challenge generator
└── js/data/
    ├── html.js         HTML track lessons
    ├── css.js          CSS track lessons
    ├── javascript.js   JavaScript track lessons
    ├── python.js       Python track lessons
    ├── typescript.js   TypeScript track (compiles live via the real tsc)
    ├── testing.js      Testing track
    ├── dsa.js          Data Structures & Algorithms track
    ├── practice.js     Auto-graded exercises
    ├── website.js      "Build a Website" combined track
    ├── sql.js          SQL track lessons (runs live via sql.js)
    ├── ai.js           AI & Neural Nets track lessons
    ├── atlas.js        Language Atlas (19 languages + meta-page)
    ├── encyclopedia.js Language Encyclopedia (350+ entry catalog)
    ├── blueprints.js   App Blueprints (8 app teardowns with live demos)
    ├── toolbox.js      Toolbox (12 tool & engine guides)
    ├── projects.js     All guided projects
    ├── generator.js    Challenge generator templates & themes
    └── reference.js    Cheat sheets, debugging guide + glossary
```

## Adding your own content

Every lesson, project, and cheat sheet is plain data in `js/data/`. Copy an existing entry, edit
the fields, and refresh the page — no build step. The shapes are documented at the top of each
data file.

## The Plain track

Eight lessons and five projects for **Plain**, the sentence-shaped language
in this collection - and the only track whose runtime is not fetched from
anywhere. Plain is dependency-free JavaScript, so the whole language sits in
`js/plain` and every Run works offline and instantly.

It goes from `show "Hello!"` to a **neural network written from nothing** -
a squash, a hidden layer, and backpropagation explained as what it actually
is: blame passed backwards along the weight it came forward on. It trains on
XOR in the page and gets all four answers right.

Along the way: your own kinds of thing, one program written out in eleven
other programming languages, Plain read in six human languages, and lists
that do not exist until you ask for them.

