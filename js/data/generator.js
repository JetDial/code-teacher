/* ============================================================
   Adaptive challenge generator
   Composes custom project briefs. The engine (app.js) picks a
   template + theme, then includes requirement tiers based on how
   much the learner has completed — more progress, harder briefs.
   ============================================================ */
window.CT_GENERATOR = {

  themes: [
    { name: 'space mission', emoji: '🚀', flavor: 'rockets, planets and mission control' },
    { name: 'street food', emoji: '🌮', flavor: 'food trucks, menus and secret sauces' },
    { name: 'pet rescue', emoji: '🐾', flavor: 'adoptable animals and happy endings' },
    { name: 'retro arcade', emoji: '🕹️', flavor: 'pixel art, high scores and neon' },
    { name: 'music festival', emoji: '🎸', flavor: 'bands, stages and setlists' },
    { name: 'ocean explorer', emoji: '🌊', flavor: 'deep sea creatures and submarines' },
    { name: 'dinosaur park', emoji: '🦖', flavor: 'prehistoric beasts and questionable safety' },
    { name: 'coffee empire', emoji: '☕', flavor: 'brews, baristas and loyalty cards' },
    { name: 'superhero agency', emoji: '🦸', flavor: 'heroes, powers and mission logs' },
    { name: 'haunted hotel', emoji: '👻', flavor: 'spooky rooms and mysterious guests' },
    { name: 'garden kingdom', emoji: '🌻', flavor: 'plants, seasons and watering schedules' },
    { name: 'sports league', emoji: '🏆', flavor: 'teams, scores and championships' }
  ],

  /* stack: which skills it exercises → which tracks set its difficulty */
  templates: [

    /* ---------- web (HTML + CSS) ---------- */
    {
      kind: 'Landing page', stack: 'web', langs: ['html', 'css'],
      brief: 'Design a landing page for a {theme} business — the page that convinces a visitor in 10 seconds.',
      base: [
        'A header with the business name and a one-line pitch',
        'A section describing 3 things it offers (headings + paragraphs)',
        'At least one list and one link',
        'A styled color scheme: background, text and one accent color'
      ],
      tier2: [
        'The 3 offerings as cards in a flexbox or grid row with a gap',
        'A nav bar with anchor links that scroll to each section',
        'A "prices" table with at least 3 rows, styled borders',
        'Hover effects on every clickable thing'
      ],
      tier3: [
        'Fully responsive: cards stack on narrow screens (media query or auto-fit grid)',
        'CSS variables for the whole palette, with a second theme reachable by changing only :root',
        'A hero section with a CSS gradient background and a call-to-action button',
        'Pass the accessibility sweep: heading order, alt text, real buttons/links'
      ],
      stretch: [
        'A testimonials section with fake 5-star reviews',
        'A keyframes animation somewhere tasteful',
        'Publish it with Netlify Drop and share the URL'
      ]
    },
    {
      kind: 'Top-10 countdown page', stack: 'web', langs: ['html', 'css'],
      brief: 'Build a magazine-style "Top 10 {theme} moments" countdown page, from #10 down to a dramatic #1.',
      base: [
        'A big title and intro paragraph',
        'An ordered list — or 10 headed sections — counting down',
        'Each entry: a name, one sentence why it deserves the spot',
        'Style the numbers so they pop (size or color)'
      ],
      tier2: [
        'Each entry becomes a styled card with padding, border-radius and margin rhythm',
        'The #1 entry visually distinct: bigger, accent border, maybe a 👑',
        'A sticky header that stays while you scroll (position: sticky)',
        'Alternate card background colors with :nth-child'
      ],
      tier3: [
        'A table of contents at the top with anchor links to every entry',
        'Entries fade in with a CSS animation',
        'Responsive typography: bigger headings on wide screens via media query',
        'A "back to top" link pinned to the corner (position: fixed)'
      ],
      stretch: [
        'A reader-voting row of buttons under each entry (needs a little JS)',
        'Print stylesheet: clean when printed (@media print)'
      ]
    },

    /* ---------- js (interactive app) ---------- */
    {
      kind: 'Random generator app', stack: 'js', langs: ['js', 'html'],
      brief: 'Build a "{theme} generator": every click invents a new random combination (a name, a description, a rating).',
      base: [
        'Arrays of at least 3 kinds of parts to combine (names, adjectives, details)',
        'A pick-random helper function used everywhere',
        'A button that composes a result and shows it on the page',
        'A template literal assembling the sentence'
      ],
      tier2: [
        'A rare result (< 10% chance) with special styling',
        'A history list: every generated result appends to a ul',
        'A counter of how many have been generated',
        'A "clear history" button'
      ],
      tier3: [
        'No repeats until the combinations run out (track used ones)',
        'Save history in localStorage so reload keeps it',
        'A favorites system: star a result to pin it to a separate list',
        'Keyboard shortcut: pressing G generates'
      ],
      stretch: [
        'Share button that copies the result to the clipboard',
        'Stats panel: which part appeared most often (object as counter)'
      ]
    },
    {
      kind: 'Clicker game', stack: 'js', langs: ['js', 'html', 'css'],
      brief: 'A {theme} clicker game: click the big button to earn points, spend points on upgrades that earn for you.',
      base: [
        'A big themed button that adds 1 point per click',
        'A live score display that updates on every change',
        'One upgrade purchasable with points (e.g. +1 per click), which deducts its cost',
        'The upgrade button disabled (disabled property) when unaffordable'
      ],
      tier2: [
        'An auto-clicker upgrade: +1 point per second via setInterval',
        'Upgrade costs that rise each purchase (cost = Math.round(cost * 1.5))',
        'A stats line: points per click, per second, total clicks',
        'A little animation or emoji burst on click'
      ],
      tier3: [
        'Three upgrade types with different economics — balance them so choices matter',
        'Save the whole game in localStorage (load on start, save every few seconds)',
        'A prestige/reset mechanic granting a permanent bonus',
        'Number formatting: 12,400 or 12.4k once scores grow'
      ],
      stretch: [
        'Achievements that pop a toast at milestones',
        'An offline-earnings calculation using saved timestamps'
      ]
    },
    {
      kind: 'Tracker app', stack: 'js', langs: ['js', 'html', 'css'],
      brief: 'A {theme} tracker: add entries, see them in a list, watch a total update — a real CRUD interface.',
      base: [
        'A form: text input + number input (e.g. name and amount) + Add button',
        'Entries render into a list, newest first',
        'A running total/count displayed prominently',
        'Input validation: no empty names, no negative numbers'
      ],
      tier2: [
        'Delete button on each entry (and the total updates)',
        'Click an entry to mark it done/favorite with a class toggle',
        'Enter key submits',
        'An empty-state message when the list has nothing'
      ],
      tier3: [
        'Persist everything in localStorage',
        'Sort controls: by name / by amount / newest',
        'A filter box that live-hides non-matching entries as you type',
        'Summary stats: biggest entry, average, count by category'
      ],
      stretch: [
        'Edit-in-place on double click',
        'Export the list as JSON shown in a textarea (JSON.stringify(list, null, 2))'
      ]
    },

    /* ---------- python ---------- */
    {
      kind: 'Simulator', stack: 'python', langs: ['python'],
      brief: 'Simulate a day at the {theme}: random events happen over 10 rounds, resources rise and fall, and a final report card sums it up.',
      base: [
        'Variables for 2-3 resources (money, reputation, energy…)',
        'A list of at least 5 possible events (use random.choice each round)',
        'A loop of 10 rounds printing what happened and the resource changes',
        'A final report with f-strings'
      ],
      tier2: [
        'Events as dicts: {"text": ..., "money": +/-N, "rep": +/-N} applied programmatically',
        'Conditional events: some can only happen if a resource is high/low enough',
        'A win/lose verdict based on final resources',
        'Track history in a list; print the best and worst round'
      ],
      tier3: [
        'Wrap it in functions: run_round(), apply_event(), report()',
        'Run 1,000 simulations in a loop and report win percentage',
        'A difficulty parameter changing event probabilities',
        'Rare disaster/jackpot events (random.random() < 0.05) that dominate the story'
      ],
      stretch: [
        'A Simulation class holding all state and methods',
        'Plot the money-over-rounds curve as a text bar chart'
      ]
    },
    {
      kind: 'Data cruncher', stack: 'python', langs: ['python'],
      brief: 'You run a {theme} operation and have a messy list of records. Compute the statistics that actually matter.',
      base: [
        'A list of at least 8 dicts (invent realistic fields: name, amount, category, rating…)',
        'Total and average of the number field, nicely formatted',
        'The best and worst record (max/min with key=)',
        'A count of records passing some threshold'
      ],
      tier2: [
        'Group totals by category into a dict (the counter pattern)',
        'A sorted leaderboard printed with rank numbers (enumerate)',
        'A comprehension filtering a sub-list, then stats on just that',
        'A text bar chart: name padded with ljust, then ★ * value'
      ],
      tier3: [
        'Functions with docstrings for each analysis; a main() that runs the report',
        'Data validation: skip malformed records with try/except, count the skips',
        'Write the final report to a file AND read it back to verify',
        'A "trend" analysis comparing the first half of records to the second'
      ],
      stretch: [
        'Export results as JSON with json.dumps(indent=2)',
        'A percentile calculation without any imports'
      ]
    },

    /* ---------- sql ---------- */
    {
      kind: 'Database design', stack: 'sql', langs: ['sql'],
      brief: 'Design and query the database behind a {theme} operation — the tables a real app would run on.',
      base: [
        'CREATE two related tables (e.g. things and events-about-things) with a PRIMARY KEY each and a foreign-key column linking them',
        'INSERT at least 5 rows into each table',
        'A SELECT with a WHERE filter, and one with ORDER BY + LIMIT',
        'Use at least three column types (INTEGER, TEXT, REAL)'
      ],
      tier2: [
        'A GROUP BY report: totals or counts per category',
        'A JOIN query producing a human-readable report (names, not ids)',
        'An UPDATE and a DELETE — each previewed first with the same WHERE as a SELECT',
        'A NOT NULL and a DEFAULT constraint that make sense for the data'
      ],
      tier3: [
        'A third table making it a real schema (e.g. customers → orders → order_items)',
        'A revenue-style report joining all tables with SUM and ORDER BY',
        'A subquery: rows above the average of something',
        'A HAVING clause filtering the grouped report'
      ],
      stretch: [
        'A LEFT JOIN report that includes rows with zero matches',
        'Rebuild the same queries from Python with sqlite3 and parameterized (?) queries'
      ]
    },

    /* ---------- ai ---------- */
    {
      kind: 'Machine learning experiment', stack: 'ai', langs: ['python', 'ai'],
      brief: 'Train a perceptron to make {theme} decisions — invent a 2-feature dataset (e.g. "size" and "danger") and teach the neuron a rule.',
      base: [
        'Invent 8+ labeled examples: two number features (0-10 scale) and a 0/1 verdict following a rule YOU choose',
        'The perceptron training loop from the AI track, adapted to your data',
        'Print mistakes per epoch — training should visibly converge',
        'Test on 3 new examples the neuron never saw'
      ],
      tier2: [
        'An accuracy() function scoring the final weights',
        'Normalize features to 0-1 first (divide by 10) — note whether learning speeds up',
        'A text decision map (the # / · grid) showing the learned boundary',
        'One deliberately mislabeled example — how much does one bad label hurt?'
      ],
      tier3: [
        'A train/test split: train on 75%, report honest accuracy on the rest',
        'Try a rule a straight line CAN\'T learn (verdict = features disagree) and document the failure',
        'Then solve that rule with the 2-hidden-neuron backprop network from the AI track',
        'Compare epochs-to-learn across 3 learning rates in a table'
      ],
      stretch: [
        'Port your trained weights into a tiny JS page: inputs + a "decide" button (nets are portable!)',
        'Rebuild the training in numpy matrix form'
      ]
    }
  ],

  approach: [
    'Read the whole brief once, then re-read the base requirements — that\'s your minimum viable version. Ignore the rest until it works.',
    'Start from something running: the smallest thing that shows output, even just a title or one print. Run it. Then grow it.',
    'One requirement at a time, running the code after each. Never write 50 lines untested.',
    'Stuck 15+ minutes on the same thing? That\'s the signal to simplify: do a cruder version of the requirement first, upgrade later.'
  ],

  stuck: [
    '<b>Read the error message twice.</b> It names the problem and the line. The editors here explain common errors under your console output.',
    '<b>Print the suspect.</b> console.log / print the variable right before things go wrong — it almost never holds what you assumed.',
    '<b>Shrink the problem.</b> Comment out half the code. Bug still there? It\'s in the other half. Repeat.',
    '<b>Re-read the relevant lesson.</b> Each requirement maps to a lesson in the tracks — the Search box finds it fast.',
    '<b>Rubber-duck it.</b> Explain your code line by line, out loud, to anything. The bug usually surrenders mid-sentence.'
  ]
};
