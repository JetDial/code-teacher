/* ============================================================
   Guided projects
   Shape: { id, title, level, langs[], minutes, blurb, description,
            learn[], steps[{title, body, code?}], starter{mode,...},
            solution{...}, extensions[] }
   ============================================================ */
window.CT_PROJECTS = [

  /* ================= BEGINNER ================= */
  {
    id: 'profile-page', title: 'Personal profile page', level: 0,
    langs: ['html', 'css'], minutes: 45,
    blurb: 'Your first real page: a styled card about you (or an invented character).',
    description: 'Every developer\'s first build: a page that introduces someone — structure it with semantic HTML, then style it into a centered profile card. You\'ll use everything from the beginner HTML and CSS lessons.',
    learn: ['HTML structure', 'Headings, lists & links', 'Classes', 'The box model', 'Centering'],
    steps: [
      { title: 'Structure the content', body: 'In the HTML tab: a <code>&lt;main&gt;</code> holding an <code>&lt;h1&gt;</code> name, a tagline paragraph, an "About" section with 2-3 sentences, a "Top 3 facts" ordered list, and a link somewhere you like on the web.' },
      { title: 'Wrap it in a card', body: 'Put everything inside <code>&lt;main class="card"&gt;</code> so CSS can treat it as one box.' },
      { title: 'Style the page', body: 'In the CSS tab: give <code>body</code> a background color and a font-family. Style <code>.card</code> with a white background, padding, rounded corners and a max-width around 420px.', code: { lang: 'css', code: '.card {\n  background: white;\n  max-width: 420px;\n  margin: 40px auto;   /* the centering trick */\n  padding: 24px;\n  border-radius: 14px;\n}' } },
      { title: 'Add personality', body: 'An accent color for the h1, styled list markers, a hover effect on the link. Small touches, big difference.' },
      { title: 'Polish check', body: 'Is there exactly one h1? Does every section have a heading? Does it still look good when the preview is narrow?' }
    ],
    starter: {
      mode: 'web',
      html: '<main class="card">\n  <h1>Your Name</h1>\n  <p class="tagline">One line about you</p>\n\n  <!-- Add: About section, Top 3 facts list, a favorite link -->\n</main>',
      css: 'body {\n  font-family: sans-serif;\n  background: #dbe7f0;\n}\n\n.card {\n  /* your card styles here */\n}'
    },
    solution: {
      html: '<main class="card">\n  <h1>Robin Okafor</h1>\n  <p class="tagline">Turning coffee into web pages since 2026</p>\n\n  <h2>About me</h2>\n  <p>I\'m learning to code with tiny projects like this one.\n  I like puzzles, plants, and pressing Run to see what happens.</p>\n\n  <h2>Top 3 facts</h2>\n  <ol>\n    <li>I\'ve visited 9 countries</li>\n    <li>I can whistle two notes at once</li>\n    <li>This is my first web page</li>\n  </ol>\n\n  <p><a href="https://developer.mozilla.org">My favorite reference site →</a></p>\n</main>',
      css: 'body {\n  font-family: Georgia, serif;\n  background: #dbe7f0;\n}\n\n.card {\n  background: white;\n  max-width: 420px;\n  margin: 40px auto;\n  padding: 28px;\n  border-radius: 14px;\n  box-shadow: 0 6px 18px rgba(20, 40, 60, 0.15);\n}\n\nh1 {\n  margin: 0;\n  color: #1f5673;\n}\n\n.tagline {\n  color: #888;\n  font-style: italic;\n  margin-top: 4px;\n}\n\nh2 {\n  border-bottom: 2px solid #1f5673;\n  padding-bottom: 4px;\n  font-size: 1.05rem;\n}\n\na { color: #b4552d; }\na:hover { text-decoration: none; }'
    },
    extensions: ['Add a photo (or an emoji "avatar" in a big circle)', 'Dark theme with CSS variables', 'A second card for a friend — turn the layout into flexbox']
  },

  {
    id: 'recipe-card', title: 'Recipe page', level: 0,
    langs: ['html'], minutes: 30,
    blurb: 'Structure a real recipe with every text element you know.',
    description: 'Recipes are secretly perfect HTML practice: they need headings, ordered steps, unordered ingredients, emphasis, and a table. Write a real recipe (or a ridiculous invented one) with correct structure throughout.',
    learn: ['Semantic structure', 'Ordered vs unordered lists', 'Tables', 'Text emphasis'],
    steps: [
      { title: 'The frame', body: '<code>&lt;h1&gt;</code> recipe name, an intro paragraph with <code>&lt;em&gt;</code> selling it, and h2 sections: Ingredients, Steps, Nutrition.' },
      { title: 'Ingredients', body: 'Unordered list — order doesn\'t matter. Mark critical ones with <code>&lt;strong&gt;</code>.' },
      { title: 'Steps', body: 'Ordered list — order definitely matters. One action per step. Use <code>&lt;strong&gt;</code> for warnings ("<strong>hot!</strong>").' },
      { title: 'Nutrition table', body: 'A small table: two columns (thing, amount), a header row with <code>&lt;th&gt;</code>, and rows for calories, sugar, joy.', code: { lang: 'html', code: '<table border="1">\n  <tr><th>Per serving</th><th>Amount</th></tr>\n  <tr><td>Calories</td><td>Yes</td></tr>\n</table>' } },
      { title: 'Finishing touch', body: 'Add prep time as <code>&lt;small&gt;</code> under the title, and a horizontal rule <code>&lt;hr&gt;</code> between major sections.' }
    ],
    starter: {
      mode: 'web',
      html: '<h1>Legendary ________</h1>\n<p><small>Prep time: __ minutes</small></p>\n\n<!-- intro paragraph, then Ingredients (ul),\n     Steps (ol), Nutrition (table) -->'
    },
    solution: {
      html: '<h1>Legendary Midnight Nachos</h1>\n<p><small>Prep time: 11 minutes · Serves: 1 (do not share)</small></p>\n<p>The <em>only</em> nachos recipe you will ever need after 11pm.</p>\n<hr>\n\n<h2>Ingredients</h2>\n<ul>\n  <li><strong>Tortilla chips</strong> (the sturdy kind)</li>\n  <li>Shredded cheese, an irresponsible amount</li>\n  <li>Jalapeños (optional)</li>\n  <li>Salsa</li>\n</ul>\n\n<h2>Steps</h2>\n<ol>\n  <li>Spread chips on an oven-safe plate</li>\n  <li>Bury them in cheese</li>\n  <li>Bake ~5 min. <strong>The plate will be hot!</strong></li>\n  <li>Top with salsa and jalapeños</li>\n  <li>Eat immediately while standing in the kitchen</li>\n</ol>\n\n<h2>Nutrition</h2>\n<table border="1">\n  <tr><th>Per serving</th><th>Amount</th></tr>\n  <tr><td>Calories</td><td>Absolutely</td></tr>\n  <tr><td>Regret</td><td>0 g</td></tr>\n  <tr><td>Joy</td><td>100%</td></tr>\n</table>'
    },
    extensions: ['Add a CSS tab pass: style it like a recipe site card', 'A second recipe page — link the two together', 'An "equipment" checklist with checkboxes (input type="checkbox")']
  },

  {
    id: 'compliment-bot', title: 'Compliment generator', level: 0,
    langs: ['js'], minutes: 30,
    blurb: 'Random compliments assembled from word lists — arrays + random in action.',
    description: 'Build a tiny text machine: arrays of sentence pieces, a random picker, and a loop that prints five unique-ish compliments. Pure console JavaScript — variables, arrays and Math.random doing something fun.',
    learn: ['Arrays & indexes', 'Math.random', 'Template literals', 'Loops', 'Functions'],
    steps: [
      { title: 'Word banks', body: 'Three arrays: <code>openers</code> ("Honestly,", "Real talk:"…), <code>adjectives</code> ("brilliant", "unstoppable"…), <code>nouns</code> ("coder", "human", "problem-solver"…). At least 4 items each.' },
      { title: 'The random picker', body: 'Write <code>pick(arr)</code> returning a random item.', code: { lang: 'js', code: 'const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];' } },
      { title: 'Assemble a compliment', body: 'A function <code>compliment()</code> returning a template literal combining one pick from each bank.' },
      { title: 'Produce five', body: 'A for-loop logging <code>compliment()</code> five times. Run it a few times — randomness means a new batch every run.' },
      { title: 'Level it up', body: 'Add a rare 1-in-10 "golden compliment" (check <code>Math.random() < 0.1</code>) with extra sparkle ✨.' }
    ],
    starter: {
      mode: 'js',
      code: 'const openers = ["Honestly,", "Real talk:", "Breaking news:", "Fact:"];\nconst adjectives = ["brilliant", "unstoppable", "curious", "dangerously capable"];\nconst nouns = ["coder", "human", "problem-solver", "legend"];\n\n// 1. write pick(arr)\n// 2. write compliment()\n// 3. loop 5 times and console.log the results'
    },
    solution: {
      code: 'const openers = ["Honestly,", "Real talk:", "Breaking news:", "Fact:"];\nconst adjectives = ["brilliant", "unstoppable", "curious", "dangerously capable"];\nconst nouns = ["coder", "human", "problem-solver", "legend"];\n\nconst pick = (arr) => arr[Math.floor(Math.random() * arr.length)];\n\nfunction compliment() {\n  const base = `${pick(openers)} you are one ${pick(adjectives)} ${pick(nouns)}.`;\n  if (Math.random() < 0.1) {\n    return "✨ GOLDEN: " + base.toUpperCase() + " ✨";\n  }\n  return base;\n}\n\nfor (let i = 1; i <= 5; i++) {\n  console.log(`${i}. ${compliment()}`);\n}'
    },
    extensions: ['Avoid repeats: remove used items with splice', 'An insult-free "roast" mode toggled by a constant', 'Port it to Python — same logic, new syntax (great practice!)']
  },

  {
    id: 'magic-8-ball', title: 'Magic 8-Ball', level: 0,
    langs: ['python'], minutes: 30,
    blurb: 'Ask fate your questions — Python\'s random module answers.',
    description: 'The classic toy, in Python: a list of mystical answers, random.choice, and a loop that answers a batch of questions with dramatic formatting. Beginner Python — lists, loops, f-strings, random.',
    learn: ['Lists', 'random.choice', 'for loops', 'f-strings', 'Functions'],
    steps: [
      { title: 'The answers', body: 'A list of at least 8 responses across three moods: positive ("Definitely!"), negative ("Very doubtful."), mysterious ("Ask again after snacks.").' },
      { title: 'The questions', body: 'A list of 4-5 questions to put to the ball (we can\'t type live input here, so pre-load them).' },
      { title: 'The oracle function', body: '<code>def shake(question):</code> — prints the question, then a random answer, formatted like a séance.', code: { lang: 'python', code: 'import random\n\ndef shake(question):\n    print(f"🎱 You ask: {question}")\n    print(f"   The ball says: {random.choice(answers)}\\n")' } },
      { title: 'Consult the ball', body: 'Loop over the questions calling <code>shake()</code>. Run several times — fate is fickle.' },
      { title: 'Weighted fate', body: 'Make positive answers rarer: use <code>random.random() < 0.2</code> to pick from the positive list only 20% of the time, else from the others.' }
    ],
    starter: {
      mode: 'python',
      code: 'import random\n\nanswers = [\n    "Definitely!",\n    "Very doubtful.",\n    "Ask again after snacks.",\n    # add at least 5 more...\n]\n\nquestions = [\n    "Will I become a great programmer?",\n    "Should I refactor this code?",\n    # add a few of your own...\n]\n\n# write shake(question) and loop over the questions',
      expected: '🎱 You ask: Will I become a great programmer?\n   The ball says: Definitely!'
    },
    solution: {
      code: 'import random\n\npositive = ["Definitely!", "Without a doubt.", "The stars say YES."]\nnegative = ["Very doubtful.", "Not a chance.", "The vibes are off."]\nmystic = ["Ask again after snacks.", "Reply hazy.", "Only Tuesday knows."]\n\nanswers = positive + negative + mystic\n\nquestions = [\n    "Will I become a great programmer?",\n    "Should I refactor this code?",\n    "Is the bug my fault?",\n    "Will it work on the first try?",\n]\n\ndef shake(question):\n    if random.random() < 0.2:\n        answer = random.choice(positive)      # rare good fortune\n    else:\n        answer = random.choice(negative + mystic)\n    print(f"🎱 You ask: {question}")\n    print(f"   The ball says: {answer}\\n")\n\nfor q in questions:\n    shake(q)'
    },
    extensions: ['Count how often fate was positive across 100 shakes', 'Themed balls: pass a mood parameter choosing the answer pool', 'Track every answer in a dict counter and print statistics']
  },

  /* ================= INTERMEDIATE ================= */
  {
    id: 'todo-list', title: 'To-do list app', level: 1,
    langs: ['js', 'html', 'css'], minutes: 60,
    blurb: 'The rite of passage: add tasks, complete them, delete them.',
    description: 'Every framework tutorial on Earth builds a to-do list — because it exercises the full front-end loop: read input, create elements, handle events on them, track state. Build it in vanilla JS and you\'ll understand what frameworks automate.',
    learn: ['DOM creation', 'Event listeners', 'Reading inputs', 'classList.toggle', 'State in arrays'],
    steps: [
      { title: 'The static shell', body: 'HTML: a heading, a text input + "Add" button, and an empty <code>&lt;ul id="list"&gt;</code>. CSS: make it look like an app — centered column, styled input.' },
      { title: 'Adding tasks', body: 'On button click: read the input\'s value, trim it, ignore empties, create an <code>&lt;li&gt;</code> with the text, append to the list, clear the input.', code: { lang: 'js', code: 'addBtn.addEventListener("click", () => {\n  const text = input.value.trim();\n  if (!text) return;\n  // create li, append, clear input\n});' } },
      { title: 'Completing tasks', body: 'Give each li a click listener that toggles a "done" class. CSS: <code>.done { text-decoration: line-through; opacity: 0.5; }</code>.' },
      { title: 'Deleting tasks', body: 'When creating each li, also create a small ✕ button inside it that removes the li. Use <code>event.stopPropagation()</code> so deleting doesn\'t also toggle done.' },
      { title: 'Enter key & counter', body: 'Submit on Enter (keydown listener checking <code>event.key === "Enter"</code>), and keep a "3 tasks left" counter updated after every change.' }
    ],
    starter: {
      mode: 'web',
      html: '<main>\n  <h1>My tasks</h1>\n  <div class="add-row">\n    <input id="task-input" placeholder="What needs doing?">\n    <button id="add-btn">Add</button>\n  </div>\n  <ul id="list"></ul>\n  <p id="counter"></p>\n</main>',
      css: 'body { font-family: sans-serif; background: #f0f4f8; }\nmain { max-width: 420px; margin: 30px auto; background: white;\n  padding: 24px; border-radius: 12px; }\n.add-row { display: flex; gap: 8px; }\n#task-input { flex: 1; padding: 8px; }\nul { padding: 0; list-style: none; }\nli { padding: 10px 8px; border-bottom: 1px solid #eee; cursor: pointer; }\n.done { text-decoration: line-through; opacity: 0.5; }',
      js: 'const input = document.querySelector("#task-input");\nconst addBtn = document.querySelector("#add-btn");\nconst list = document.querySelector("#list");\n\n// your code here'
    },
    solution: {
      js: 'const input = document.querySelector("#task-input");\nconst addBtn = document.querySelector("#add-btn");\nconst list = document.querySelector("#list");\nconst counter = document.querySelector("#counter");\n\nfunction updateCounter() {\n  const left = list.querySelectorAll("li:not(.done)").length;\n  counter.textContent = left === 0 ? "All done! 🎉" : `${left} task${left === 1 ? "" : "s"} left`;\n}\n\nfunction addTask() {\n  const text = input.value.trim();\n  if (!text) return;\n\n  const li = document.createElement("li");\n  li.textContent = text;\n\n  const del = document.createElement("button");\n  del.textContent = "✕";\n  del.style.cssText = "float:right;border:none;background:none;cursor:pointer;color:#c0392b";\n  del.addEventListener("click", (e) => {\n    e.stopPropagation();\n    li.remove();\n    updateCounter();\n  });\n  li.appendChild(del);\n\n  li.addEventListener("click", () => {\n    li.classList.toggle("done");\n    updateCounter();\n  });\n\n  list.appendChild(li);\n  input.value = "";\n  input.focus();\n  updateCounter();\n}\n\naddBtn.addEventListener("click", addTask);\ninput.addEventListener("keydown", (e) => {\n  if (e.key === "Enter") addTask();\n});\n\nupdateCounter();'
    },
    extensions: ['Persist tasks in localStorage so they survive reload', 'A filter row: All / Active / Done', 'Edit a task by double-clicking it', 'Drag to reorder (hard mode!)']
  },

  {
    id: 'quiz-game', title: 'Quiz game', level: 1,
    langs: ['js', 'html'], minutes: 60,
    blurb: 'Multiple choice, instant feedback, final score — like this site\'s own quizzes.',
    description: 'Build the same quiz machinery this site uses on you: a questions array, one question shown at a time, buttons that reveal right/wrong, and a score screen at the end. Data-driven UI — the pattern behind almost every app.',
    learn: ['Arrays of objects', 'Rendering from data', 'Event handling', 'Tracking state', 'Conditional UI'],
    steps: [
      { title: 'Model the data', body: 'An array of question objects: <code>{ q, options: [4 strings], answer: index }</code>. Write at least 4 questions about anything you love.' },
      { title: 'Render one question', body: 'A function <code>show(index)</code> that fills a heading with the question and creates a button per option inside a container div (clear it first with <code>innerHTML = ""</code>).' },
      { title: 'Handle answers', body: 'Each button\'s listener compares its index to the answer: color the clicked button green/red (add a class), disable all buttons, +1 score if right.' },
      { title: 'Advance', body: 'After answering, show a "Next" button. At the end, replace everything with "You scored X/Y" and a Play-again button that resets state and calls <code>show(0)</code>.' },
      { title: 'Polish', body: 'A progress line ("Question 2 of 4"), and a taunting message tier based on final score.' }
    ],
    starter: {
      mode: 'web',
      html: '<main>\n  <p id="progress"></p>\n  <h2 id="question">Loading…</h2>\n  <div id="options"></div>\n  <button id="next" hidden>Next →</button>\n</main>',
      css: 'body { font-family: sans-serif; background: #22303c; color: #eee; }\nmain { max-width: 460px; margin: 40px auto; }\n#options button {\n  display: block; width: 100%; margin: 8px 0; padding: 12px;\n  font-size: 15px; border-radius: 8px; border: none; cursor: pointer;\n  background: #3c4f63; color: white; text-align: left;\n}\n#options button.right { background: #2e7d4f; }\n#options button.wrong { background: #a33c3c; }\n#next { padding: 10px 22px; border-radius: 8px; border: none;\n  background: #e0a458; font-weight: bold; cursor: pointer; }',
      js: 'const questions = [\n  { q: "What does CSS stand for?",\n    options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Styling System", "Colorful Simple Sheets"],\n    answer: 1 },\n  // add at least 3 more!\n];\n\n// your code here'
    },
    solution: {
      js: 'const questions = [\n  { q: "What does CSS stand for?",\n    options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Styling System", "Colorful Simple Sheets"],\n    answer: 1 },\n  { q: "Which tag makes the biggest heading?",\n    options: ["<h6>", "<head>", "<h1>", "<big>"], answer: 2 },\n  { q: "What is 10 % 3 in JavaScript?",\n    options: ["3", "1", "3.33", "0"], answer: 1 },\n  { q: "Which method adds to the END of an array?",\n    options: ["shift()", "pop()", "unshift()", "push()"], answer: 3 },\n];\n\nlet current = 0, score = 0;\nconst qEl = document.querySelector("#question");\nconst optsEl = document.querySelector("#options");\nconst nextBtn = document.querySelector("#next");\nconst progEl = document.querySelector("#progress");\n\nfunction show(index) {\n  const item = questions[index];\n  progEl.textContent = `Question ${index + 1} of ${questions.length} · Score: ${score}`;\n  qEl.textContent = item.q;\n  optsEl.innerHTML = "";\n  nextBtn.hidden = true;\n\n  item.options.forEach((text, i) => {\n    const btn = document.createElement("button");\n    btn.textContent = text;\n    btn.addEventListener("click", () => {\n      if (i === item.answer) { btn.classList.add("right"); score++; }\n      else {\n        btn.classList.add("wrong");\n        optsEl.children[item.answer].classList.add("right");\n      }\n      [...optsEl.children].forEach(b => b.disabled = true);\n      nextBtn.hidden = false;\n    });\n    optsEl.appendChild(btn);\n  });\n}\n\nnextBtn.addEventListener("click", () => {\n  current++;\n  if (current < questions.length) { show(current); return; }\n  progEl.textContent = "";\n  qEl.textContent = `You scored ${score}/${questions.length} — ` +\n    (score === questions.length ? "perfect! 🏆" : score >= questions.length / 2 ? "solid!" : "the rematch will go better.");\n  optsEl.innerHTML = "";\n  nextBtn.textContent = "Play again";\n  nextBtn.addEventListener("click", () => location.reload(), { once: true });\n});\n\nshow(0);'
    },
    extensions: ['Shuffle questions each round', 'A 15-second timer per question (setInterval)', 'Load questions from a JSON string to practice JSON.parse', 'High score in localStorage']
  },

  {
    id: 'rps-tournament', title: 'Rock-Paper-Scissors tournament', level: 1,
    langs: ['python'], minutes: 45,
    blurb: 'Two bot strategies battle over 100 rounds — who wins the tournament?',
    description: 'Simulate rock-paper-scissors between strategies: a random bot, a "always rock" bot, a copycat that repeats the opponent\'s last move. Run tournaments, keep score in a dict, and crown a champion. Functions, dicts, loops and randomness working together.',
    learn: ['Functions as strategies', 'Dictionaries for scoring', 'random.choice', 'Loops & game logic', 'f-string reports'],
    steps: [
      { title: 'The rules', body: 'Write <code>beats(a, b)</code> returning True if move a beats move b (rock&gt;scissors, scissors&gt;paper, paper&gt;rock).', code: { lang: 'python', code: 'def beats(a, b):\n    return (a, b) in [("rock", "scissors"), ("scissors", "paper"), ("paper", "rock")]' } },
      { title: 'The contenders', body: 'Strategy functions that take the opponent\'s previous move and return a move: <code>random_bot</code>, <code>always_rock</code>, <code>copycat</code> (repeats opponent\'s last move; random on round 1).' },
      { title: 'One match', body: '<code>play_match(strat1, strat2, rounds=100)</code>: loop the rounds, get both moves, decide the winner, tally in a dict <code>{"p1": 0, "p2": 0, "tie": 0}</code>, remember last moves.' },
      { title: 'The tournament', body: 'Every strategy vs every other. Print a result line per match and track total wins per strategy in another dict.' },
      { title: 'The podium', body: 'Sort the totals (<code>sorted(d.items(), key=...)</code>) and print final standings with medals.' }
    ],
    starter: {
      mode: 'python',
      code: 'import random\n\nMOVES = ["rock", "paper", "scissors"]\n\ndef beats(a, b):\n    return (a, b) in [("rock", "scissors"), ("scissors", "paper"), ("paper", "rock")]\n\ndef random_bot(opponent_last):\n    return random.choice(MOVES)\n\ndef always_rock(opponent_last):\n    return "rock"\n\ndef copycat(opponent_last):\n    # your code: repeat their last move (random if None)\n    pass\n\n# write play_match, then run the tournament!',
      expected: 'random_bot vs always_rock: 34 - 33 (33 ties)\n...\n🥇 copycat with 2 match wins'
    },
    solution: {
      code: 'import random\n\nMOVES = ["rock", "paper", "scissors"]\n\ndef beats(a, b):\n    return (a, b) in [("rock", "scissors"), ("scissors", "paper"), ("paper", "rock")]\n\ndef random_bot(opponent_last):\n    return random.choice(MOVES)\n\ndef always_rock(opponent_last):\n    return "rock"\n\ndef copycat(opponent_last):\n    return opponent_last if opponent_last else random.choice(MOVES)\n\ndef play_match(name1, strat1, name2, strat2, rounds=100):\n    score = {"p1": 0, "p2": 0, "tie": 0}\n    last1 = last2 = None\n    for _ in range(rounds):\n        m1, m2 = strat1(last2), strat2(last1)\n        if beats(m1, m2):\n            score["p1"] += 1\n        elif beats(m2, m1):\n            score["p2"] += 1\n        else:\n            score["tie"] += 1\n        last1, last2 = m1, m2\n    print(f"{name1} vs {name2}: {score[\'p1\']} - {score[\'p2\']} ({score[\'tie\']} ties)")\n    if score["p1"] > score["p2"]: return name1\n    if score["p2"] > score["p1"]: return name2\n    return None\n\nbots = {"random_bot": random_bot, "always_rock": always_rock, "copycat": copycat}\nwins = {name: 0 for name in bots}\n\nnames = list(bots)\nfor i in range(len(names)):\n    for j in range(i + 1, len(names)):\n        winner = play_match(names[i], bots[names[i]], names[j], bots[names[j]])\n        if winner:\n            wins[winner] += 1\n\nprint()\nfor medal, (name, w) in zip("🥇🥈🥉", sorted(wins.items(), key=lambda x: -x[1])):\n    print(f"{medal} {name}: {w} match wins")'
    },
    extensions: ['A "counter-bot" that plays whatever beats the opponent\'s last move — watch it destroy always_rock', 'Best-of-5 matches instead of 100 rounds', 'Track move statistics: which move won most overall?']
  },

  {
    id: 'photo-gallery', title: 'Responsive gallery', level: 1,
    langs: ['html', 'css'], minutes: 45,
    blurb: 'A grid gallery that reflows itself at any screen size — no media queries needed.',
    description: 'Build the classic responsive image gallery with CSS Grid\'s auto-fit magic, hover effects, and a featured tile. We use colorful gradient tiles instead of photos so it works offline — swap in real images later.',
    learn: ['CSS Grid', 'auto-fit + minmax', 'Hover transforms', 'Spanning tiles', 'Gradients'],
    steps: [
      { title: 'The tiles', body: '12 <code>&lt;figure class="tile"&gt;</code> elements in a <code>.gallery</code> container, each with an emoji and a <code>&lt;figcaption&gt;</code>.' },
      { title: 'The responsive grid', body: 'The one-liner: <code>grid-template-columns: repeat(auto-fit, minmax(140px, 1fr))</code> with a gap. Drag the preview edge — it reflows alone.' },
      { title: 'Make tiles pretty', body: 'Each tile: a gradient background (vary them with utility classes like <code>.g1</code>…<code>.g4</code>), centered emoji at large font-size, rounded corners.', code: { lang: 'css', code: '.g1 { background: linear-gradient(135deg, #f6d365, #fda085); }' } },
      { title: 'Hover life', body: 'On hover: lift with <code>transform: scale(1.04)</code>, deepen the shadow, and fade the caption in (start it at <code>opacity: 0</code>).' },
      { title: 'A featured tile', body: 'One tile gets <code>grid-column: span 2; grid-row: span 2;</code> and a bigger emoji. Check it degrades gracefully when narrow.' }
    ],
    starter: {
      mode: 'web',
      html: '<h1>Gallery</h1>\n<div class="gallery">\n  <figure class="tile g1"><span>🌄</span><figcaption>Sunrise</figcaption></figure>\n  <figure class="tile g2"><span>🌊</span><figcaption>Waves</figcaption></figure>\n  <figure class="tile g3"><span>🌲</span><figcaption>Forest</figcaption></figure>\n  <!-- add 9 more tiles, cycling classes g1-g4 -->\n</div>',
      css: 'body { font-family: sans-serif; background: #14181d; color: #eee; padding: 16px; }\n\n.gallery {\n  /* the responsive grid goes here */\n}\n\n.tile {\n  margin: 0;\n  /* tile styles */\n}\n\n.g1 { background: linear-gradient(135deg, #f6d365, #fda085); }\n.g2 { background: linear-gradient(135deg, #84fab0, #8fd3f4); }\n.g3 { background: linear-gradient(135deg, #a18cd1, #fbc2eb); }\n.g4 { background: linear-gradient(135deg, #fccb90, #d57eeb); }'
    },
    solution: {
      css: 'body { font-family: sans-serif; background: #14181d; color: #eee; padding: 16px; }\n\n.gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));\n  gap: 14px;\n}\n\n.tile {\n  margin: 0;\n  position: relative;\n  display: grid;\n  place-items: center;\n  aspect-ratio: 1;\n  border-radius: 12px;\n  font-size: 52px;\n  overflow: hidden;\n  transition: transform 0.2s, box-shadow 0.2s;\n  cursor: pointer;\n}\n\n.tile:hover {\n  transform: scale(1.04);\n  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);\n}\n\n.tile figcaption {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  padding: 8px;\n  font-size: 14px;\n  text-align: center;\n  background: rgba(0, 0, 0, 0.55);\n  opacity: 0;\n  transition: opacity 0.2s;\n}\n\n.tile:hover figcaption { opacity: 1; }\n\n.featured {\n  grid-column: span 2;\n  grid-row: span 2;\n  font-size: 96px;\n}\n\n.g1 { background: linear-gradient(135deg, #f6d365, #fda085); }\n.g2 { background: linear-gradient(135deg, #84fab0, #8fd3f4); }\n.g3 { background: linear-gradient(135deg, #a18cd1, #fbc2eb); }\n.g4 { background: linear-gradient(135deg, #fccb90, #d57eeb); }'
    },
    extensions: ['Swap gradients for real images (img with object-fit: cover)', 'A lightbox: click a tile to enlarge it (needs a little JS)', 'Category filter buttons that hide/show tiles']
  },

  {
    id: 'clock-stopwatch', title: 'Clock & stopwatch', level: 1,
    langs: ['js', 'css'], minutes: 45,
    blurb: 'A live digital clock plus a working stopwatch — timers and state.',
    description: 'Two instruments on one page: a clock that ticks every second (Date + setInterval) and a stopwatch with Start/Stop/Reset (state machine thinking). Time formatting, intervals, and buttons that change behavior based on state.',
    learn: ['Date objects', 'setInterval / clearInterval', 'Zero-padding numbers', 'State machines', 'Button states'],
    steps: [
      { title: 'The clock face', body: 'A big <code>&lt;div id="clock"&gt;</code>. Every second, build "HH:MM:SS" from <code>new Date()</code> — pad with <code>String(n).padStart(2, "0")</code>.', code: { lang: 'js', code: 'function tick() {\n  const d = new Date();\n  const pad = (n) => String(n).padStart(2, "0");\n  clock.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;\n}\ntick();\nsetInterval(tick, 1000);' } },
      { title: 'Stopwatch display', body: 'Below it: <code>#watch</code> showing "0.0 s", and three buttons: Start, Stop, Reset.' },
      { title: 'Start', body: 'On Start: record <code>startTime = Date.now()</code> and set an interval every 100ms updating the display with <code>(Date.now() - startTime) / 1000</code> to one decimal. Guard against double-starts!' },
      { title: 'Stop & Reset', body: 'Stop clears the interval but keeps the time (store elapsed so Start resumes). Reset stops and zeroes everything.' },
      { title: 'Polish', body: 'Disable buttons that make no sense in the current state (Stop while stopped, etc.) — set <code>btn.disabled</code> in one <code>updateButtons()</code> function.' }
    ],
    starter: {
      mode: 'web',
      html: '<main>\n  <div id="clock">--:--:--</div>\n  <div id="watch">0.0 s</div>\n  <div class="row">\n    <button id="start">Start</button>\n    <button id="stop">Stop</button>\n    <button id="reset">Reset</button>\n  </div>\n</main>',
      css: 'body { font-family: sans-serif; background: #101820; color: #eee; text-align: center; }\n#clock { font-size: 56px; font-family: monospace; margin: 40px 0 8px; }\n#watch { font-size: 32px; font-family: monospace; color: #e0a458; margin-bottom: 16px; }\nbutton { font-size: 16px; padding: 10px 22px; margin: 0 4px;\n  border: none; border-radius: 8px; cursor: pointer; }\nbutton:disabled { opacity: 0.35; cursor: default; }',
      js: 'const clock = document.querySelector("#clock");\nconst watch = document.querySelector("#watch");\n\n// 1. the ticking clock\n// 2. the stopwatch state + buttons'
    },
    solution: {
      js: 'const clock = document.querySelector("#clock");\nconst watch = document.querySelector("#watch");\nconst startBtn = document.querySelector("#start");\nconst stopBtn = document.querySelector("#stop");\nconst resetBtn = document.querySelector("#reset");\n\n// --- clock ---\nconst pad = (n) => String(n).padStart(2, "0");\nfunction tick() {\n  const d = new Date();\n  clock.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;\n}\ntick();\nsetInterval(tick, 1000);\n\n// --- stopwatch ---\nlet elapsed = 0;      // ms banked from previous runs\nlet startTime = null; // Date.now() when running, null when stopped\nlet interval = null;\n\nfunction render() {\n  const total = elapsed + (startTime ? Date.now() - startTime : 0);\n  watch.textContent = (total / 1000).toFixed(1) + " s";\n}\n\nfunction updateButtons() {\n  startBtn.disabled = !!startTime;\n  stopBtn.disabled = !startTime;\n  resetBtn.disabled = !startTime && elapsed === 0;\n}\n\nstartBtn.addEventListener("click", () => {\n  startTime = Date.now();\n  interval = setInterval(render, 100);\n  updateButtons();\n});\n\nstopBtn.addEventListener("click", () => {\n  elapsed += Date.now() - startTime;\n  startTime = null;\n  clearInterval(interval);\n  render();\n  updateButtons();\n});\n\nresetBtn.addEventListener("click", () => {\n  elapsed = 0;\n  startTime = null;\n  clearInterval(interval);\n  render();\n  updateButtons();\n});\n\nrender();\nupdateButtons();'
    },
    extensions: ['Lap times: a Lap button appending to a list', 'A countdown timer mode with an input for minutes', 'Show the date and day of the week under the clock']
  },

  {
    id: 'word-stats', title: 'Text analyzer', level: 1,
    langs: ['python'], minutes: 45,
    blurb: 'Feed it text, get statistics: words, frequencies, reading time.',
    description: 'Real-world text processing: take a paragraph and compute its statistics — word and sentence counts, most common words, average word length, estimated reading time. The skills behind search engines and spam filters start exactly here.',
    learn: ['String methods', 'split & join', 'Dicts as counters', 'sorted with key=', 'Rounding & formatting'],
    steps: [
      { title: 'Get some text', body: 'A multi-line string (triple quotes) — paste any paragraph you like, the longer the funnier.' },
      { title: 'Basic counts', body: 'Words: <code>text.split()</code>. Sentences: count "." + "!" + "?" occurrences. Characters: <code>len(text)</code>. Print each with f-strings.' },
      { title: 'Clean the words', body: 'Lowercase each word and strip punctuation: <code>word.lower().strip(".,!?;:\\"()")</code> — a comprehension does all words in one line.' },
      { title: 'Frequency table', body: 'The dict-counter pattern: <code>counts[w] = counts.get(w, 0) + 1</code>. Then top 5 via <code>sorted(counts.items(), key=lambda kv: -kv[1])[:5]</code>.' },
      { title: 'The report', body: 'Average word length (1 decimal), reading time at 200 words/min, and a ★-bar chart for the top words.' }
    ],
    starter: {
      mode: 'python',
      code: 'text = """\nPaste any paragraph here. The bigger the text, the more\ninteresting the statistics. This placeholder text mentions\ntext twice, which the frequency counter will notice.\n"""\n\n# 1. word / sentence / character counts\n# 2. cleaned lowercase words\n# 3. frequency dict and top 5\n# 4. the final report',
      expected: 'Words: 31\nSentences: 3\nTop words: text (3), the (3)...'
    },
    solution: {
      code: 'text = """\nPaste any paragraph here. The bigger the text, the more\ninteresting the statistics. This placeholder text mentions\ntext twice, which the frequency counter will notice.\n"""\n\nwords_raw = text.split()\nsentences = text.count(".") + text.count("!") + text.count("?")\n\nwords = [w.lower().strip(\'.,!?;:"()\') for w in words_raw]\nwords = [w for w in words if w]\n\ncounts = {}\nfor w in words:\n    counts[w] = counts.get(w, 0) + 1\n\ntop = sorted(counts.items(), key=lambda kv: -kv[1])[:5]\navg_len = sum(len(w) for w in words) / len(words)\nread_min = len(words) / 200\n\nprint(f"Words: {len(words)}")\nprint(f"Unique words: {len(counts)}")\nprint(f"Sentences: {sentences}")\nprint(f"Average word length: {avg_len:.1f} letters")\nprint(f"Reading time: ~{max(1, round(read_min * 60))} seconds")\nprint("\\nTop words:")\nfor word, n in top:\n    print(f"  {word:<12} {\'★\' * n} ({n})")'
    },
    extensions: ['Ignore boring words (a "stopword" list: the, a, and…)', 'Longest word and longest sentence', 'Compare two texts: which vocabulary is richer (unique/total ratio)?']
  },

  /* ================= ADVANCED ================= */
  {
    id: 'leaderboard-db', title: 'Game leaderboard database', level: 1,
    langs: ['sql'], minutes: 60,
    blurb: 'Design the database behind an arcade: players, matches, and the reports that rank them.',
    description: 'Every leaderboard you\'ve ever climbed is a database doing GROUP BY. Design one from scratch: a players table, a matches table linked by ID, and the queries that answer the questions arcades care about — who\'s best, who\'s improving, which game is hot. Pure SQL, running live in your workspace.',
    learn: ['Schema design', 'Foreign keys', 'INSERT', 'GROUP BY reports', 'JOINs', 'ORDER BY rankings'],
    steps: [
      { title: 'Design the schema', body: 'Two tables: <code>players</code>(id, name, joined) and <code>matches</code>(id, player_id, game, score, day). player_id is the foreign key pointing at players.id.', code: { lang: 'sql', code: 'CREATE TABLE players (\n  id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL,\n  joined TEXT\n);' } },
      { title: 'Seed the data', body: 'INSERT 4 players and at least 10 matches across 2-3 different games and several days. Make the data tell a story — someone\'s a Pac-Man specialist, someone plays everything.' },
      { title: 'The all-time leaderboard', body: 'JOIN + GROUP BY: each player\'s name with their total score across all matches, highest first. This is THE leaderboard query.' },
      { title: 'Per-game rankings', body: 'The best score per game (GROUP BY game with MAX), then a filtered leaderboard for just one game (WHERE + GROUP BY + ORDER BY).' },
      { title: 'The insights round', body: 'Which game gets played most (COUNT per game)? Which day was busiest? Who has played the widest variety (COUNT(DISTINCT game))?' }
    ],
    starter: {
      mode: 'sql',
      tables: 'This database starts empty — you\'re the architect. Build it with CREATE TABLE.',
      code: '-- Step 1: the schema\nCREATE TABLE players (\n  id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL,\n  joined TEXT\n);\n\n-- now: CREATE TABLE matches ... then INSERT, then the reports!'
    },
    solution: {
      code: "CREATE TABLE players (\n  id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL,\n  joined TEXT\n);\n\nCREATE TABLE matches (\n  id INTEGER PRIMARY KEY,\n  player_id INTEGER,\n  game TEXT NOT NULL,\n  score INTEGER,\n  day TEXT\n);\n\nINSERT INTO players (name, joined) VALUES\n ('Ada', '2026-01-10'), ('Sam', '2026-02-02'),\n ('Kim', '2026-02-20'), ('Max', '2026-03-05');\n\nINSERT INTO matches (player_id, game, score, day) VALUES\n (1, 'Pac-Man', 9200, 'Mon'), (1, 'Pac-Man', 11400, 'Tue'),\n (1, 'Tetris', 5400, 'Tue'),  (2, 'Tetris', 8800, 'Mon'),\n (2, 'Tetris', 9900, 'Wed'),  (2, 'Galaga', 7100, 'Thu'),\n (3, 'Pac-Man', 6800, 'Mon'), (3, 'Galaga', 9500, 'Wed'),\n (3, 'Tetris', 7200, 'Thu'),  (4, 'Galaga', 12000, 'Fri'),\n (4, 'Pac-Man', 3000, 'Fri');\n\n-- All-time leaderboard\nSELECT players.name, SUM(matches.score) AS total\nFROM matches\nJOIN players ON matches.player_id = players.id\nGROUP BY players.name\nORDER BY total DESC;\n\n-- Best score per game\nSELECT game, MAX(score) AS best FROM matches GROUP BY game;\n\n-- Most-played game\nSELECT game, COUNT(*) AS plays FROM matches\nGROUP BY game ORDER BY plays DESC LIMIT 1;\n\n-- Widest variety\nSELECT players.name, COUNT(DISTINCT matches.game) AS games_tried\nFROM matches\nJOIN players ON matches.player_id = players.id\nGROUP BY players.name\nORDER BY games_tried DESC;"
    },
    extensions: ['A weekly report: totals per day with a HAVING filter for busy days', 'A LEFT JOIN listing players who haven\'t played at all (add one!)', 'Rebuild the leaderboard query from Python using sqlite3']
  },

  {
    id: 'memory-game', title: 'Memory match game', level: 2,
    langs: ['js', 'css', 'html'], minutes: 90,
    blurb: 'Flip cards, find pairs, beat your move count — a complete game.',
    description: 'A full game loop in the browser: a shuffled grid of hidden emoji pairs, flip logic with its tricky edge cases (double-clicks! flipping during checks!), win detection, and a move counter. This is where DOM skills become game-dev skills.',
    learn: ['Shuffling arrays', 'Game state', 'Timing with setTimeout', 'Guarding edge cases', 'CSS card flips'],
    steps: [
      { title: 'The deck', body: '8 emoji, duplicated into 16 cards, shuffled: <code>cards.sort(() => Math.random() - 0.5)</code>. Render each as a button in a 4×4 grid, showing "?" when hidden.' },
      { title: 'Flipping', body: 'Click reveals the emoji (store it in a data attribute; swap textContent). Track <code>firstPick</code> — if null, this is pick one; else it\'s pick two.' },
      { title: 'Matching', body: 'On pick two: same emoji → both get a "matched" class and stay open. Different → <code>setTimeout</code> 800ms, then hide both. Count every pair-attempt as a move.' },
      { title: 'The guards', body: 'The bugs every version has until you fix them: ignore clicks on already-open cards, on matched cards, and on ANY card while the 800ms check is pending (a <code>locked</code> flag).' },
      { title: 'Winning', body: 'When matched count hits 16, show "You won in N moves!" and a restart button. Restart = re-shuffle and reset all state.' }
    ],
    starter: {
      mode: 'web',
      html: '<main>\n  <h1>Memory</h1>\n  <p id="status">Moves: 0</p>\n  <div id="board"></div>\n  <button id="restart">Restart</button>\n</main>',
      css: 'body { font-family: sans-serif; background: #1a2233; color: #eee; text-align: center; }\n#board {\n  display: grid;\n  grid-template-columns: repeat(4, 70px);\n  gap: 10px;\n  justify-content: center;\n  margin: 20px 0;\n}\n#board button {\n  height: 70px; font-size: 30px; border: none; border-radius: 10px;\n  background: #31405c; color: white; cursor: pointer;\n  transition: transform 0.15s, background 0.2s;\n}\n#board button:hover { transform: scale(1.05); }\n#board button.matched { background: #2e7d4f; cursor: default; }\n#restart { padding: 8px 20px; border-radius: 8px; border: none; cursor: pointer; }',
      js: 'const EMOJI = ["🍕", "🚀", "🐙", "🎲", "🌵", "🎧", "🦊", "🍩"];\nconst board = document.querySelector("#board");\nconst status = document.querySelector("#status");\n\n// build the shuffled deck, render cards, add flip logic'
    },
    solution: {
      js: 'const EMOJI = ["🍕", "🚀", "🐙", "🎲", "🌵", "🎧", "🦊", "🍩"];\nconst board = document.querySelector("#board");\nconst status = document.querySelector("#status");\nconst restartBtn = document.querySelector("#restart");\n\nlet firstPick = null;\nlet locked = false;\nlet moves = 0;\nlet matched = 0;\n\nfunction setup() {\n  firstPick = null; locked = false; moves = 0; matched = 0;\n  status.textContent = "Moves: 0";\n  board.innerHTML = "";\n\n  const deck = [...EMOJI, ...EMOJI].sort(() => Math.random() - 0.5);\n  deck.forEach((emoji) => {\n    const card = document.createElement("button");\n    card.dataset.emoji = emoji;\n    card.textContent = "?";\n    card.addEventListener("click", () => flip(card));\n    board.appendChild(card);\n  });\n}\n\nfunction flip(card) {\n  if (locked || card === firstPick || card.classList.contains("matched")) return;\n\n  card.textContent = card.dataset.emoji;\n\n  if (!firstPick) {\n    firstPick = card;\n    return;\n  }\n\n  moves++;\n  status.textContent = `Moves: ${moves}`;\n\n  if (firstPick.dataset.emoji === card.dataset.emoji) {\n    firstPick.classList.add("matched");\n    card.classList.add("matched");\n    matched += 2;\n    firstPick = null;\n    if (matched === 16) {\n      status.textContent = `🏆 You won in ${moves} moves!`;\n    }\n  } else {\n    locked = true;\n    const other = firstPick;\n    setTimeout(() => {\n      card.textContent = "?";\n      other.textContent = "?";\n      firstPick = null;\n      locked = false;\n    }, 800);\n  }\n}\n\nrestartBtn.addEventListener("click", setup);\nsetup();'
    },
    extensions: ['A timer — win screen shows time AND moves', 'Best score in localStorage', 'A 6×6 hard mode toggle', 'A real 3D flip animation with CSS transform rotateY']
  },

  {
    id: 'contact-book', title: 'Contact book', level: 2,
    langs: ['python'], minutes: 75,
    blurb: 'A contact manager with classes, search, and JSON saving.',
    description: 'A structured mini-application: a Contact class, a ContactBook class managing a collection with add/search/delete, and persistence to JSON — the architecture of real programs in miniature, with a scripted demo standing in for user input.',
    learn: ['Classes & methods', 'Managing collections', 'Search & filtering', 'JSON persistence', 'Program architecture'],
    steps: [
      { title: 'The Contact class', body: '<code>__init__(self, name, phone, email)</code> plus a <code>describe()</code> method returning a nice one-liner. Add <code>to_dict()</code> returning its data as a dict (JSON prep).' },
      { title: 'The ContactBook', body: 'Holds <code>self.contacts = []</code>. Methods: <code>add(contact)</code> (reject duplicates by name!), <code>remove(name)</code>, <code>find(query)</code> returning matches where the query appears in name OR email.' },
      { title: 'Listing', body: '<code>show_all()</code> printing contacts sorted by name — <code>sorted(self.contacts, key=lambda c: c.name)</code>.' },
      { title: 'Persistence', body: '<code>save(filename)</code> writing all contacts as JSON (a list of dicts); a <code>load(filename)</code> classmethod-style function rebuilding the book. Test the round-trip!', code: { lang: 'python', code: 'def save(self, filename):\n    with open(filename, "w") as f:\n        json.dump([c.to_dict() for c in self.contacts], f)' } },
      { title: 'The demo script', body: 'Add 4 contacts, show all, search "an", delete one, save, reload into a NEW book, show it still has everything.' }
    ],
    starter: {
      mode: 'python',
      code: 'import json\n\nclass Contact:\n    def __init__(self, name, phone, email):\n        # store the three fields\n        pass\n\n    def describe(self):\n        pass\n\n    def to_dict(self):\n        pass\n\nclass ContactBook:\n    def __init__(self):\n        self.contacts = []\n\n    # add / remove / find / show_all / save / load\n\n# demo script at the bottom',
      expected: '📖 All contacts:\n  Ada Lovelace · 555-0101 · ada@maths.uk\n  ...\n🔎 Search "an": Dan Abramov\nSaved. Reloaded book has 3 contacts.'
    },
    solution: {
      code: 'import json\n\nclass Contact:\n    def __init__(self, name, phone, email):\n        self.name = name\n        self.phone = phone\n        self.email = email\n\n    def describe(self):\n        return f"{self.name} · {self.phone} · {self.email}"\n\n    def to_dict(self):\n        return {"name": self.name, "phone": self.phone, "email": self.email}\n\nclass ContactBook:\n    def __init__(self):\n        self.contacts = []\n\n    def add(self, contact):\n        if any(c.name == contact.name for c in self.contacts):\n            print(f"⚠ {contact.name} already exists - skipped")\n            return\n        self.contacts.append(contact)\n\n    def remove(self, name):\n        before = len(self.contacts)\n        self.contacts = [c for c in self.contacts if c.name != name]\n        print(f"Removed {before - len(self.contacts)} contact(s) named {name}")\n\n    def find(self, query):\n        q = query.lower()\n        return [c for c in self.contacts if q in c.name.lower() or q in c.email.lower()]\n\n    def show_all(self):\n        print("📖 All contacts:")\n        for c in sorted(self.contacts, key=lambda c: c.name):\n            print("  " + c.describe())\n\n    def save(self, filename):\n        with open(filename, "w") as f:\n            json.dump([c.to_dict() for c in self.contacts], f)\n\ndef load(filename):\n    book = ContactBook()\n    with open(filename) as f:\n        for d in json.load(f):\n            book.add(Contact(d["name"], d["phone"], d["email"]))\n    return book\n\n# ---- demo ----\nbook = ContactBook()\nbook.add(Contact("Ada Lovelace", "555-0101", "ada@maths.uk"))\nbook.add(Contact("Dan Abramov", "555-0102", "dan@react.dev"))\nbook.add(Contact("Grace Hopper", "555-0103", "grace@navy.mil"))\nbook.add(Contact("Ada Lovelace", "555-9999", "fake@ada.com"))  # duplicate!\n\nbook.show_all()\n\nprint(\'\\n🔎 Search "an":\')\nfor c in book.find("an"):\n    print("  " + c.describe())\n\nbook.remove("Dan Abramov")\nbook.save("contacts.json")\n\nbook2 = load("contacts.json")\nprint(f"\\nReloaded book has {len(book2.contacts)} contacts:")\nbook2.show_all()'
    },
    extensions: ['Add birthday fields and an "upcoming birthdays" report', 'Fuzzy search: match even with one typo (compare letter by letter)', 'Groups/tags per contact with a filter method']
  },

  {
    id: 'perceptron-lab', title: 'Perceptron laboratory', level: 2,
    langs: ['python', 'ai'], minutes: 75,
    blurb: 'Train neurons on your own data and chart what they can — and cannot — learn.',
    description: 'Take the perceptron from the AI track and turn it into a reusable experiment kit: a train() function, accuracy measurement, a text-based decision map, and a battery of experiments — including watching XOR fail and explaining why. Real ML methodology in miniature.',
    learn: ['Perceptron training', 'Reusable functions', 'Accuracy metrics', 'Decision boundaries', 'Experimental method'],
    steps: [
      { title: 'The trainer', body: 'Package the AI-track perceptron into <code>train(data, epochs=20, lr=0.1)</code> returning <code>(weights, bias, history)</code> where history is mistakes-per-epoch.' },
      { title: 'The evaluator', body: '<code>accuracy(data, weights, bias)</code> — fraction of correct predictions. Never trust a model you haven\'t scored.' },
      { title: 'The visualizer', body: 'A text decision map: for a grid of x,y points from 0 to 1 in steps of 0.1, print "#" where the neuron says 1 and "·" where it says 0. The straight boundary line becomes literally visible.', code: { lang: 'python', code: 'def decision_map(weights, bias):\n    for row in range(10, -1, -1):\n        y = row / 10\n        line = ""\n        for col in range(11):\n            x = col / 10\n            s = x * weights[0] + y * weights[1] + bias\n            line += " #" if s > 0 else " ·"\n        print(line)' } },
      { title: 'The experiments', body: 'Train and map: AND, OR, NAND — all learnable. Then XOR: watch history never reach 0 and the map stay nonsensical. Log your observations as comments, like a lab notebook.' },
      { title: 'The report', body: 'Print a results table: gate, epochs to converge (or "never"), final accuracy. Conclude with the one-sentence explanation of the XOR failure.' }
    ],
    starter: {
      mode: 'python',
      code: 'GATES = {\n    "AND":  [([0,0],0), ([0,1],0), ([1,0],0), ([1,1],1)],\n    "OR":   [([0,0],0), ([0,1],1), ([1,0],1), ([1,1],1)],\n    "NAND": [([0,0],1), ([0,1],1), ([1,0],1), ([1,1],0)],\n    "XOR":  [([0,0],0), ([0,1],1), ([1,0],1), ([1,1],0)],\n}\n\ndef train(data, epochs=20, lr=0.1):\n    weights, bias = [0.0, 0.0], 0.0\n    history = []\n    # your training loop -> fill history with mistakes per epoch\n    return weights, bias, history\n\n# accuracy(), decision_map(), then run all four experiments',
      expected: 'AND: converged after 6 epochs, accuracy 100%\n(decision map showing a clean diagonal split)\nXOR: never converged, accuracy 50%'
    },
    solution: {
      code: 'GATES = {\n    "AND":  [([0,0],0), ([0,1],0), ([1,0],0), ([1,1],1)],\n    "OR":   [([0,0],0), ([0,1],1), ([1,0],1), ([1,1],1)],\n    "NAND": [([0,0],1), ([0,1],1), ([1,0],1), ([1,1],0)],\n    "XOR":  [([0,0],0), ([0,1],1), ([1,0],1), ([1,1],0)],\n}\n\ndef predict(x, weights, bias):\n    return 1 if x[0] * weights[0] + x[1] * weights[1] + bias > 0 else 0\n\ndef train(data, epochs=20, lr=0.1):\n    weights, bias = [0.0, 0.0], 0.0\n    history = []\n    for _ in range(epochs):\n        mistakes = 0\n        for x, target in data:\n            error = target - predict(x, weights, bias)\n            if error != 0:\n                mistakes += 1\n                weights[0] += lr * error * x[0]\n                weights[1] += lr * error * x[1]\n                bias += lr * error\n        history.append(mistakes)\n        if mistakes == 0:\n            break\n    return weights, bias, history\n\ndef accuracy(data, weights, bias):\n    right = sum(1 for x, t in data if predict(x, weights, bias) == t)\n    return right / len(data)\n\ndef decision_map(weights, bias):\n    for row in range(10, -1, -1):\n        y = row / 10\n        line = ""\n        for col in range(11):\n            x = col / 10\n            line += " #" if predict([x, y], weights, bias) else " ·"\n        print(line)\n\nprint(f"{\'gate\':<6}{\'converged\':<14}{\'accuracy\'}")\nfor name, data in GATES.items():\n    w, b, hist = train(data, epochs=25)\n    conv = f"epoch {len(hist)}" if hist and hist[-1] == 0 else "NEVER"\n    print(f"{name:<6}{conv:<14}{accuracy(data, w, b):.0%}")\n\nprint("\\nAND decision map (# = fires):")\nw, b, _ = train(GATES["AND"])\ndecision_map(w, b)\n\nprint("\\nXOR decision map (chaos - no line can split it):")\nw, b, _ = train(GATES["XOR"], epochs=50)\ndecision_map(w, b)\n\nprint("\\nConclusion: one neuron draws ONE straight line;")\nprint("XOR needs two lines - hence hidden layers.")'
    },
    extensions: ['Plot the mistakes-history as a text bar chart per epoch', 'Add a learning-rate experiment: same gate at lr 0.01 / 0.1 / 1.0', 'Solve XOR by feeding the neuron a third input: x*y (feature engineering!)']
  },

  {
    id: 'nn-playground', title: 'Neural net playground', level: 2,
    langs: ['js', 'ai', 'html'], minutes: 90,
    blurb: 'A page where visitors train a real neural network with one click.',
    description: 'Wrap the XOR network from the AI track in an interface: buttons pick a logic gate, a Train button runs backprop live, and the page displays the loss curve and predictions as they improve. Front-end skills + ML skills in one artifact — instant portfolio material.',
    learn: ['Neural nets in JS', 'Wiring ML to UI', 'Rendering results', 'Progress feedback', 'Code organization'],
    steps: [
      { title: 'Port the network', body: 'Bring in the backprop network from the AI track (3 hidden neurons) as functions: <code>initNet()</code> (random weights object), <code>forward(net, x)</code>, <code>trainEpoch(net, data, lr)</code> returning the loss.' },
      { title: 'The controls', body: 'HTML: gate buttons (AND / OR / XOR), a Train button, a results area. Clicking a gate sets the current dataset and resets the net.' },
      { title: 'Live training', body: 'Train 100 epochs per animation tick (setInterval) so the page stays responsive. Append the loss to a log every 500 epochs; stop at 6000 or when loss < 0.01.' },
      { title: 'Show predictions', body: 'After training stops, render a table: each input, the network\'s output (3 decimals), the target, and a ✓/✗. Green the successes.' },
      { title: 'The loss "chart"', body: 'No chart library needed: a row of divs whose heights are proportional to the logged losses — a bar chart from pure CSS.' }
    ],
    starter: {
      mode: 'web',
      html: '<main>\n  <h1>🧠 Train a neural net</h1>\n  <div>\n    <button class="gate" data-gate="AND">AND</button>\n    <button class="gate" data-gate="OR">OR</button>\n    <button class="gate" data-gate="XOR">XOR</button>\n    <button id="train" disabled>⚡ Train!</button>\n  </div>\n  <p id="status">Pick a gate to begin.</p>\n  <div id="chart"></div>\n  <div id="results"></div>\n</main>',
      css: 'body { font-family: sans-serif; background: #10141f; color: #e8e8f0; text-align: center; }\nbutton { font-size: 15px; padding: 10px 18px; margin: 4px; border: none;\n  border-radius: 8px; cursor: pointer; background: #2d3a55; color: white; }\nbutton.active { background: #7c5cff; }\n#train { background: #1d9d5f; }\nbutton:disabled { opacity: 0.4; }\n#chart { display: flex; align-items: flex-end; justify-content: center;\n  gap: 3px; height: 80px; margin: 16px 0; }\n#chart div { width: 14px; background: #7c5cff; border-radius: 3px 3px 0 0; }\ntable { margin: 0 auto; border-collapse: collapse; }\ntd, th { padding: 6px 14px; border: 1px solid #333; font-family: monospace; }\n.good { color: #4ade80; }\n.bad { color: #f87171; }',
      js: 'const GATES = {\n  AND: [[[0,0],0], [[0,1],0], [[1,0],0], [[1,1],1]],\n  OR:  [[[0,0],0], [[0,1],1], [[1,0],1], [[1,1],1]],\n  XOR: [[[0,0],0], [[0,1],1], [[1,0],1], [[1,1],0]],\n};\n\nconst sigmoid = (x) => 1 / (1 + Math.exp(-x));\nconst rand = () => Math.random() * 2 - 1;\n\n// initNet, forward, trainEpoch, then wire the buttons'
    },
    solution: {
      js: 'const GATES = {\n  AND: [[[0,0],0], [[0,1],0], [[1,0],0], [[1,1],1]],\n  OR:  [[[0,0],0], [[0,1],1], [[1,0],1], [[1,1],1]],\n  XOR: [[[0,0],0], [[0,1],1], [[1,0],1], [[1,1],0]],\n};\n\nconst sigmoid = (x) => 1 / (1 + Math.exp(-x));\nconst rand = () => Math.random() * 2 - 1;\n\nconst H = 3;  // hidden neurons\n\nfunction initNet() {\n  return {\n    w1: [Array.from({length: H}, rand), Array.from({length: H}, rand)],\n    b1: Array.from({length: H}, rand),\n    w2: Array.from({length: H}, rand),\n    b2: rand(),\n  };\n}\n\nfunction forward(net, x) {\n  const h = net.b1.map((b, j) => sigmoid(x[0]*net.w1[0][j] + x[1]*net.w1[1][j] + b));\n  const out = sigmoid(h.reduce((s, hj, j) => s + hj * net.w2[j], net.b2));\n  return { h, out };\n}\n\nfunction trainEpoch(net, data, lr = 0.5) {\n  let loss = 0;\n  for (const [x, target] of data) {\n    const { h, out } = forward(net, x);\n    loss += (out - target) ** 2;\n    const dOut = (out - target) * out * (1 - out);\n    const dH = h.map((hj, j) => dOut * net.w2[j] * hj * (1 - hj));\n    for (let j = 0; j < H; j++) {\n      net.w2[j] -= lr * dOut * h[j];\n      net.b1[j] -= lr * dH[j];\n      net.w1[0][j] -= lr * dH[j] * x[0];\n      net.w1[1][j] -= lr * dH[j] * x[1];\n    }\n    net.b2 -= lr * dOut;\n  }\n  return loss / data.length;\n}\n\n// ---- UI wiring ----\nlet net = null, data = null, timer = null;\nconst status = document.querySelector("#status");\nconst chart = document.querySelector("#chart");\nconst results = document.querySelector("#results");\nconst trainBtn = document.querySelector("#train");\n\ndocument.querySelectorAll(".gate").forEach(btn => {\n  btn.addEventListener("click", () => {\n    document.querySelectorAll(".gate").forEach(b => b.classList.remove("active"));\n    btn.classList.add("active");\n    data = GATES[btn.dataset.gate];\n    net = initNet();\n    clearInterval(timer);\n    chart.innerHTML = results.innerHTML = "";\n    trainBtn.disabled = false;\n    status.textContent = `Ready to learn ${btn.dataset.gate}. Hit Train!`;\n  });\n});\n\ntrainBtn.addEventListener("click", () => {\n  clearInterval(timer);\n  chart.innerHTML = results.innerHTML = "";\n  net = initNet();\n  let epoch = 0;\n  const losses = [];\n\n  timer = setInterval(() => {\n    let loss;\n    for (let i = 0; i < 100; i++) loss = trainEpoch(net, data);\n    epoch += 100;\n    if (epoch % 500 === 0) {\n      losses.push(loss);\n      const bar = document.createElement("div");\n      bar.style.height = Math.max(3, loss * 300) + "px";\n      bar.title = `epoch ${epoch}: ${loss.toFixed(4)}`;\n      chart.appendChild(bar);\n    }\n    status.textContent = `Epoch ${epoch} — loss ${loss.toFixed(4)}`;\n    if (loss < 0.01 || epoch >= 6000) {\n      clearInterval(timer);\n      showResults(loss < 0.01);\n    }\n  }, 30);\n});\n\nfunction showResults(learned) {\n  status.textContent = learned ? "✅ Learned it!" : "⏱ Stopped at 6000 epochs.";\n  let html = "<table><tr><th>input</th><th>output</th><th>target</th><th></th></tr>";\n  for (const [x, t] of data) {\n    const out = forward(net, x).out;\n    const ok = Math.round(out) === t;\n    html += `<tr><td>${x}</td><td>${out.toFixed(3)}</td><td>${t}</td>` +\n      `<td class="${ok ? "good" : "bad"}">${ok ? "✓" : "✗"}</td></tr>`;\n  }\n  results.innerHTML = html + "</table>";\n}'
    },
    extensions: ['A learning-rate slider (input type="range") wired into trainEpoch', 'Show the 6 weights live while training — watch them settle', 'Add a "NOR" and "NAND" gate', 'Hard mode: let visitors click a 4×4 grid to define their own truth table']
  },

  {
    id: 'portfolio-capstone', title: 'Portfolio site (capstone)', level: 2,
    langs: ['html', 'css', 'js'], minutes: 120,
    blurb: 'The graduation project: your complete personal site, ready to publish for real.',
    description: 'Everything from every track in one build: semantic structure, a designed theme with CSS variables, responsive project cards, dark mode, a validated contact form, and small JS touches. Finish it, then actually publish it with the Build-a-Website track\'s final lesson.',
    learn: ['Full-page architecture', 'Design systems', 'Responsive layout', 'Dark mode', 'Form validation', 'Publishing'],
    steps: [
      { title: 'Structure (HTML track skills)', body: 'Semantic top to bottom: header with nav (anchor links), hero section, about, a projects section, contact form section, footer. One h1. Headings in order.' },
      { title: 'Design system (CSS track skills)', body: ':root variables for 4-5 colors and a radius; base styles; max-width content column. Pick a personality: serif & warm? mono & terminal-y? It\'s YOUR site.' },
      { title: 'Project cards (grid skills)', body: 'Your real builds from this site — the quiz, the memory game, the neural net playground — as cards in an auto-fit grid with hover lift.' },
      { title: 'Behavior (JS track skills)', body: 'Dark-mode toggle (class + variables), auto year, and the validated contact form with helpful messages. Bonus: a typing-effect headline (setInterval + slice).' },
      { title: 'Pre-flight & launch', body: 'Run the Build-a-Website track\'s polish checklist (mobile width! console clean!), then publish via Netlify Drop or GitHub Pages. Send the link to a human.' }
    ],
    starter: {
      mode: 'web',
      html: '<header>\n  <nav>\n    <strong>YOURNAME.dev</strong>\n    <span>\n      <a href="#about">About</a>\n      <a href="#projects">Projects</a>\n      <a href="#contact">Contact</a>\n    </span>\n    <button id="theme">🌙</button>\n  </nav>\n  <section class="hero">\n    <h1 id="headline">Hi, I\'m ____</h1>\n    <p>I build things for the web.</p>\n  </section>\n</header>\n<main>\n  <section id="about"><h2>About</h2><p>...</p></section>\n  <section id="projects"><h2>Projects</h2>\n    <div class="cards"><!-- your real projects! --></div>\n  </section>\n  <section id="contact"><h2>Contact</h2>\n    <form id="form">\n      <input id="email" placeholder="your@email.com">\n      <textarea id="msg" placeholder="Say hi"></textarea>\n      <button>Send</button>\n    </form>\n    <p id="form-status"></p>\n  </section>\n</main>\n<footer>© <span id="year"></span> — built from scratch</footer>',
      css: ':root {\n  --bg: #ffffff;\n  --ink: #1c2733;\n  --accent: #b4552d;\n  --card: #f4f0ea;\n  --radius: 12px;\n}\n\nbody.dark {\n  --bg: #14181f;\n  --ink: #e8e4da;\n  --card: #1f2630;\n}\n\n/* build your design system here */',
      js: '// dark mode toggle, auto year, form validation, typing effect'
    },
    solution: {
      css: ':root {\n  --bg: #ffffff; --ink: #1c2733; --accent: #b4552d;\n  --card: #f4f0ea; --radius: 12px;\n}\nbody.dark { --bg: #14181f; --ink: #e8e4da; --card: #1f2630; }\n\n* { box-sizing: border-box; }\nbody {\n  margin: 0; font-family: Georgia, serif;\n  background: var(--bg); color: var(--ink);\n  transition: background 0.3s, color 0.3s;\n}\nnav {\n  display: flex; justify-content: space-between; align-items: center;\n  padding: 14px 20px; gap: 12px;\n}\nnav a { color: var(--accent); margin: 0 8px; text-decoration: none; font-weight: bold; }\nnav button { background: none; border: 1px solid currentColor; color: inherit;\n  border-radius: 999px; padding: 6px 12px; cursor: pointer; }\n.hero { text-align: center; padding: 60px 16px; }\n.hero h1 { font-size: 2.4rem; margin: 0; min-height: 1.3em; }\nmain { max-width: 720px; margin: 0 auto; padding: 0 16px 60px; }\nh2 { border-bottom: 3px solid var(--accent); padding-bottom: 6px; margin-top: 48px; }\n.cards {\n  display: grid; gap: 14px;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n}\n.card {\n  background: var(--card); padding: 16px;\n  border-radius: var(--radius); transition: transform 0.15s;\n}\n.card:hover { transform: translateY(-4px); }\nform { display: grid; gap: 10px; max-width: 420px; }\ninput, textarea { font: inherit; padding: 10px; border-radius: 8px;\n  border: 1px solid #999; background: var(--bg); color: var(--ink); }\nform button { padding: 10px; border: none; border-radius: 8px;\n  background: var(--accent); color: white; font-weight: bold; cursor: pointer; }\nfooter { text-align: center; padding: 24px; opacity: 0.6; font-size: 0.85rem; }',
      js: '// dark mode\ndocument.querySelector("#theme").addEventListener("click", () => {\n  document.body.classList.toggle("dark");\n});\n\n// auto year\ndocument.querySelector("#year").textContent = new Date().getFullYear();\n\n// typing effect\nconst title = "Hi, I\'m Robin 👋";\nconst h1 = document.querySelector("#headline");\nlet i = 0;\nconst typer = setInterval(() => {\n  h1.textContent = title.slice(0, ++i);\n  if (i >= title.length) clearInterval(typer);\n}, 70);\n\n// contact form\nconst form = document.querySelector("#form");\nconst statusEl = document.querySelector("#form-status");\nform.addEventListener("submit", (e) => {\n  e.preventDefault();\n  const email = document.querySelector("#email").value.trim();\n  const msg = document.querySelector("#msg").value.trim();\n  if (!email.includes("@")) {\n    statusEl.textContent = "Please enter a real email address.";\n    return;\n  }\n  if (msg.length < 5) {\n    statusEl.textContent = "Don\'t be shy — write a little more!";\n    return;\n  }\n  statusEl.textContent = "Thanks! (Wire me to a form service to really send ✉️)";\n  form.reset();\n});'
    },
    extensions: ['Publish it! (Build-a-Website lesson 8 — Netlify Drop takes 2 minutes)', 'Embed your neural net playground as its own page', 'A blog section — one article about what learning to code was like', 'Custom domain for the full professional look']
  }
];
