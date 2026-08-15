/* ============================================================
   Plain track — lesson data

   Plain is the sentence-shaped language in this collection. Unlike the
   other tracks, its runtime is not fetched from anywhere: the whole
   language is a handful of dependency-free JavaScript files sitting in
   js/plain, so every Run here works offline and instantly.
   ============================================================ */
window.CT_TRACKS = window.CT_TRACKS || {};

window.CT_TRACKS.plain = {
  id: 'plain',
  name: 'Plain',
  icon: 'Pl',
  area: 'plain',
  tagline: 'A language you write the way you type a sentence — games, 3D, web, and a neural net.',
  blurb: 'Plain has about a dozen control words; everything else is a sentence pattern the language knows. No semicolons, no curly braces, no <code>public static void</code>. It comes with 2D and 3D game engines, a website builder, a video editor and a web server, translates your program into eleven other programming languages, and reads six human languages besides English. Everything here runs in this page with nothing to download.',
  uses: ['A genuinely gentle first language', '2D and 3D games', 'Websites and web servers', 'Learning how a language is built', 'Reading code in your own human language', 'Neural networks from scratch'],
  lessons: [

    /* ---------- BEGINNER ---------- */
    {
      id: 'pl-1', title: 'Sentences that do things', level: 0, minutes: 8,
      blocks: [
        { t: 'p', html: 'A Plain program is a list of instructions, one to a line, done from the top down. The first word of each line is usually a verb — what you want done.' },
        { t: 'code', lang: 'text', code: 'show "Hello!"\nshow 6 times 7' },
        { t: 'p', html: 'Those two lines differ in one way that matters: <b>quote marks mean words, no quote marks means work it out</b>. The first shows the letters <code>Hello!</code>; the second does the sum and shows <code>42</code>.' },
        { t: 'p', html: 'Compare how three languages say the same thing:' },
        { t: 'code', lang: 'javascript', code: 'console.log("Hello!");        // JavaScript' },
        { t: 'code', lang: 'python', code: 'print("Hello!")               # Python' },
        { t: 'code', lang: 'text', code: 'show "Hello!"                 # Plain' },
        { t: 'tip', html: 'Plain has no semicolons and no brackets around what you are showing. That is not decoration — fewer symbols means fewer ways to be wrong while you are still learning what the words mean.' }
      ],
      tryIt: {
        mode: 'plain',
        code: 'show "Hello!"\nshow 6 times 7\n\n# Add a line that shows your name',
        expected: 'Hello!\n42'
      },
      quiz: [
        { q: 'What does <code>show 6 times 7</code> put on the screen?', options: ['<code>6 times 7</code>', '<code>42</code>', '<code>67</code>', 'An error'], a: 1, why: 'No quote marks, so Plain does the sum instead of showing the words.' },
        { q: 'How do you end a line in Plain?', options: ['With a semicolon', 'With a full stop', 'With a newline — nothing else needed', 'With <code>end</code>'], a: 2, why: 'One instruction to a line. <code>end</code> closes a block, not a line.' },
        { q: 'Why do quote marks matter?', options: ['They make text bold', 'They tell Plain "these are words, do not work them out"', 'They are optional decoration', 'They start a comment'], a: 1, why: 'Quotes are the difference between showing letters and doing arithmetic.' }
      ],
      challenge: {
        text: 'Show three lines: a greeting, a sum Plain works out for you, and a sentence with a number inside it.',
        hints: ['Curly braces put a value inside text: <code>show "I am {2026 minus 2000} years old"</code>'],
        solution: { lang: 'text', code: 'show "Hello there!"\nshow 12 times 12\nshow "That is {12 times 12} exactly"' }
      }
    },

    {
      id: 'pl-2', title: 'Names, and asking questions', level: 0, minutes: 10,
      blocks: [
        { t: 'p', html: 'A name holds a value. <code>make</code> creates one; <code>set</code> changes it afterwards.' },
        { t: 'code', lang: 'text', code: 'make score be 0\nadd 10 to score\nset score to score times 2\nshow "Score: {score}"' },
        { t: 'p', html: 'Questions read as questions. There is no <code>==</code> to confuse with <code>=</code>, because Plain does not use either one.' },
        { t: 'code', lang: 'text', code: 'if score is above 15\n    show "Well played"\notherwise\n    show "Keep going"\nend' },
        { t: 'p', html: 'Every block is closed by <code>end</code> — <code>if</code>, loops, actions, all of them. Indentation is for your eyes only; Plain does not read it.' },
        { t: 'tip', html: 'The comparison words: <code>is</code>, <code>is not</code>, <code>is above</code>, <code>is below</code>, <code>is at least</code>, <code>is at most</code>, <code>contains</code>, <code>starts with</code>.' }
      ],
      tryIt: {
        mode: 'plain',
        code: 'make score be 0\nadd 10 to score\nset score to score times 2\nshow "Score: {score}"\n\nif score is above 15\n    show "Well played"\notherwise\n    show "Keep going"\nend',
        expected: 'Score: 20\nWell played'
      },
      quiz: [
        { q: 'Which line changes an existing name?', options: ['<code>make score be 5</code>', '<code>set score to 5</code>', '<code>score = 5</code>', '<code>let score = 5</code>'], a: 1, why: '<code>make</code> creates, <code>set</code> changes. Using make twice on one name is usually a mistake you meant to catch.' },
        { q: 'What closes an <code>if</code> block?', options: ['<code>}</code>', '<code>endif</code>', '<code>end</code>', 'Nothing — indentation does it'], a: 2, why: 'One word closes every kind of block, which is one thing to remember instead of five.' },
        { q: 'What does <code>{score}</code> do inside quoted text?', options: ['Shows the letters s-c-o-r-e', 'Puts the value of score there', 'Starts a block', 'Nothing'], a: 1, why: 'Curly braces inside text are how a value gets into a sentence.' }
      ],
      challenge: {
        text: 'Make a name for a temperature, then say whether it is freezing (at most 0), warm (above 20), or neither.',
        hints: ['<code>otherwise if</code> chains a second question onto the first.'],
        solution: { lang: 'text', code: 'make degrees be 24\n\nif degrees is at most 0\n    show "Freezing"\notherwise if degrees is above 20\n    show "Warm"\notherwise\n    show "In between"\nend' }
      }
    },

    {
      id: 'pl-3', title: 'Lists, loops and actions', level: 0, minutes: 12,
      blocks: [
        { t: 'p', html: 'A list holds several values in order. Plain counts from <b>1</b>, not 0 — because "item 1" meaning the second thing is a rule you have to learn rather than a fact you can guess.' },
        { t: 'code', lang: 'text', code: 'make cards be [3, 1, 2]\nshow item 1 of cards\nshow number of items in cards\nshow sorted cards' },
        { t: 'p', html: 'Two loops cover nearly everything: one walks a list, one counts.' },
        { t: 'code', lang: 'text', code: 'for each card in cards\n    show card\nend\n\nrepeat with n from 1 to 3\n    show "round {n}"\nend' },
        { t: 'p', html: 'An <b>action</b> is a piece of work with a name. <code>to</code> defines one, <code>give back</code> hands an answer out.' },
        { t: 'code', lang: 'text', code: 'to double with n\n    give back n times 2\nend\n\nshow double with 21' },
        { t: 'warn', html: '<code>repeat with n from 1 to 0</code> does not do nothing — it counts <b>down</b>, running with 1 and then 0. If a loop behaves strangely, check which way it is counting.' }
      ],
      tryIt: {
        mode: 'plain',
        code: 'make cards be [3, 1, 2]\nshow sorted cards\n\nto double with n\n    give back n times 2\nend\n\nmake total be 0\nfor each card in cards\n    set total to total plus (double with card)\nend\nshow total',
        expected: '[1, 2, 3]\n12'
      },
      quiz: [
        { q: 'What is <code>item 1 of [9, 8, 7]</code>?', options: ['<code>8</code>', '<code>9</code>', '<code>7</code>', 'An error'], a: 1, why: 'Plain counts from 1, so item 1 is the first thing.' },
        { q: 'How does an action hand an answer back?', options: ['<code>return n</code>', '<code>give back n</code>', '<code>output n</code>', '<code>show n</code>'], a: 1, why: '<code>show</code> puts something on the screen; <code>give back</code> hands it to whoever asked.' },
        { q: 'Which walks every item of a list?', options: ['<code>repeat 3 times</code>', '<code>for each card in cards</code>', '<code>while cards</code>', '<code>loop cards</code>'], a: 1, why: 'for each takes the list and gives you one item at a time.' }
      ],
      challenge: {
        text: 'Write an action that gives back the largest of a list, without using the built-in <code>highest of</code>. Then show it working on [4, 11, 7].',
        hints: ['Start with the first item as the best so far, then compare each one against it.', 'Remember <code>item 1 of</code> and <code>is above</code>.'],
        solution: { lang: 'text', code: 'to biggest with numbers\n    make best be item 1 of numbers\n    for each one in numbers\n        if one is above best\n            set best to one\n        end\n    end\n    give back best\nend\n\nshow biggest with [4, 11, 7]' }
      }
    },

    /* ---------- INTERMEDIATE ---------- */
    {
      id: 'pl-4', title: 'Your own kinds of thing', level: 1, minutes: 12,
      blocks: [
        { t: 'p', html: 'A <b>thing</b> holds named values. You can write one down directly:' },
        { t: 'code', lang: 'text', code: 'make player be { name: "Ada", score: 0 }\nshow name of player\nset value "score" of player to 10' },
        { t: 'p', html: 'Or you can describe a <b>kind</b> once and make as many as you like — Plain\'s version of a class.' },
        { t: 'code', lang: 'text', code: 'a kind called animal\n    has name\n    has sound be "..."\n    has legs be 4\n\n    to speak\n        show "{name of me} says {sound of me}"\n    end\nend\n\nmake dog be a new animal with name "Rex" and sound "woof"\ntell dog to speak' },
        { t: 'p', html: '<code>has</code> declares a value every one of these will carry, with a default. <code>me</code> inside an action means the particular one being spoken to. A kind can be <code>based on</code> another, which is inheritance.' },
        { t: 'tip', html: 'This is also where Plain gets fast. When the translator can prove a list holds only one kind of thing whose values are all numbers, it emits a real struct in Rust — which took a heavy loop from 129× slower than hand-written Rust to 1.05×.' }
      ],
      tryIt: {
        mode: 'plain',
        code: 'a kind called animal\n    has name\n    has sound be "..."\n\n    to speak\n        show "{name of me} says {sound of me}"\n    end\nend\n\nmake dog be a new animal with name "Rex" and sound "woof"\nmake cat be a new animal with name "Mia" and sound "meow"\ntell dog to speak\ntell cat to speak',
        expected: 'Rex says woof\nMia says meow'
      },
      quiz: [
        { q: 'What does <code>has legs be 4</code> mean?', options: ['Every animal has exactly 4 legs, always', 'Every animal starts with 4 legs unless told otherwise', 'It shows the number 4', 'It is a comment'], a: 1, why: 'It is a default. Anything you pass in when making one wins.' },
        { q: 'Inside a kind\'s action, what is <code>me</code>?', options: ['The programmer', 'The kind itself', 'The particular thing being spoken to', 'The last thing made'], a: 2, why: 'Other languages spell it this or self.' },
        { q: 'How do you run a kind\'s action?', options: ['<code>dog.speak()</code>', '<code>tell dog to speak</code>', '<code>speak dog</code>', '<code>run speak on dog</code>'], a: 1, why: 'It reads as an instruction to that thing.' }
      ],
      challenge: {
        text: 'Make a kind for a book with a title, an author and how many pages. Give it an action that shows a one-line description. Make two books and describe both.',
        hints: ['<code>has pages be 0</code> gives a sensible default.'],
        solution: { lang: 'text', code: 'a kind called book\n    has title be "Untitled"\n    has author be "Anonymous"\n    has pages be 0\n\n    to describe\n        show "{title of me} by {author of me}, {pages of me} pages"\n    end\nend\n\nmake one be a new book with title "Dune" and author "Herbert" and pages 412\nmake two be a new book with title "Emma" and author "Austen" and pages 474\ntell one to describe\ntell two to describe' }
      }
    },

    {
      id: 'pl-5', title: 'One program, eleven languages', level: 1, minutes: 10,
      blocks: [
        { t: 'p', html: 'Plain does not only run. It <b>translates</b> — writing your program out as real, readable JavaScript, TypeScript, Python, Ruby, PHP, Java, C#, Go, Lua, Rust or C.' },
        { t: 'p', html: 'Not a rough conversion: real loops, real classes, real functions, your names kept, and the same answers when you run them. The test suite compiles and runs all eleven and insists their output matches to the character.' },
        { t: 'code', lang: 'text', code: 'to double with n\n    give back n times 2\nend\n\nmake total be 0\nrepeat with n from 1 to 5\n    add double with n to total\nend\nshow "total is {total}"' },
        { t: 'p', html: 'From a terminal, <code>plain translate myfile.plain --to python</code> writes that out as:' },
        { t: 'code', lang: 'python', code: 'def double(n):\n    return n * 2\n\ntotal = 0\nfor n in range(1, 6):\n    total = total + double(n)\nprint("total is " + plain_text(total))' },
        { t: 'p', html: '<b>Why this is worth having.</b> What you learn here is not stuck here. The loop you just wrote is the same loop in all twelve languages — reading your own program in three of them side by side teaches more about what a loop <i>is</i> than any explanation.' },
        { t: 'tip', html: 'The engines are the exception: games, worlds, websites and videos stay in Plain, because they lean on the engines that come with it. Ordinary programs translate completely.' }
      ],
      tryIt: {
        mode: 'plain',
        code: 'to double with n\n    give back n times 2\nend\n\nmake total be 0\nrepeat with n from 1 to 5\n    add double with n to total\nend\nshow "total is {total}"',
        expected: 'total is 30'
      },
      quiz: [
        { q: 'How many languages can Plain write your program out as?', options: ['Three', 'Six', 'Eleven', 'Only JavaScript'], a: 2, why: 'JavaScript, TypeScript, Python, Ruby, PHP, Java, C#, Go, Lua, Rust and C.' },
        { q: 'What must be true of every translation?', options: ['It looks similar', 'It compiles', 'It runs and gives exactly the same answers', 'It is shorter'], a: 2, why: 'The suite runs all of them and compares output character by character.' },
        { q: 'Which part of a program does NOT translate?', options: ['Loops', 'Your own kinds', 'Games, worlds, websites and videos', 'Text handling'], a: 2, why: 'Those need the engines Plain brings with it, so they stay in Plain.' }
      ],
      challenge: {
        text: 'Write a small program with a name, a loop and an action of your own — then imagine it as Python. Which lines would keep their shape, and which would change?',
        hints: ['Loops and functions map almost one to one. Text with values inside it is where languages differ most.'],
        solution: { lang: 'text', code: 'to celsius with f\n    give back (f minus 32) times 5 divided by 9\nend\n\nrepeat with f from 0 to 100 by 50\n    show "{f}F is {round celsius with f}C"\nend' }
      }
    },

    {
      id: 'pl-6', title: 'Plain in six human languages', level: 1, minutes: 10,
      blocks: [
        { t: 'p', html: 'Programming languages are almost always English. Plain does not have to be. Say which language you are writing in on the first line, and the whole file is in it.' },
        { t: 'code', lang: 'text', code: 'en español\nhaz total sea 0\npor cada carta dentro de cartas\n    cambia total para total más carta\nfin\nsi total es mayor que 5\n    muestra "grande"\nfin' },
        { t: 'p', html: 'Six besides English: <b>en español</b>, <b>en français</b>, <b>auf deutsch</b>, <b>em português</b>, <b>in italiano</b>, <b>in het nederlands</b>. Everything downstream is unchanged — the checker checks it, and the translator will turn a Spanish program into Python.' },
        { t: 'p', html: 'Three things worth knowing before you write one:' },
        { t: 'list', items: [
          'Any English word still works mid-sentence. A word the dictionary does not know passes through untouched, so a gap is an inconvenience, not a wall.',
          'Names you invent are left alone — so <code>cartas</code> stays <code>cartas</code>.',
          'The language\'s own small words are taken. In a Spanish file <code>y</code>, <code>a</code>, <code>en</code> and <code>de</code> belong to Plain, exactly as <code>and</code>, <code>to</code>, <code>at</code> and <code>of</code> do in English.'
        ] },
        { t: 'tip', html: 'German and Dutch split some verbs in two — <code>füge 5 zu punkte hinzu</code>. Plain understands the trailing half and drops it, so the sentence reads the way the language actually says it.' }
      ],
      tryIt: {
        mode: 'plain',
        code: 'en español\nhaz cartas sea [3, 1, 2]\nmuestra ordenado cartas\nhaz total sea 0\npor cada carta dentro de cartas\n    cambia total para total más carta\nfin\nsi total es mayor que 5\n    muestra "grande: {total}"\nfin',
        expected: '[1, 2, 3]\ngrande: 6'
      },
      quiz: [
        { q: 'How does Plain know which language a file is in?', options: ['From the file name', 'From a line at the top saying so', 'It guesses from the words', 'You pass a flag'], a: 1, why: 'One line — <code>en español</code> — and the rest of the file is in that language.' },
        { q: 'What happens to a word the dictionary does not know?', options: ['An error', 'It passes through unchanged', 'It is deleted', 'The file is rejected'], a: 1, why: 'Which is why English words still work mid-sentence, and your own names survive.' },
        { q: 'Can a Spanish Plain program be translated to Python?', options: ['No', 'Yes — the language is per file and everything downstream is unchanged', 'Only if you translate it to English first', 'Only the comments'], a: 1, why: 'The human language is resolved before the parser ever sees the program.' }
      ],
      challenge: {
        text: 'Write three lines in French: say the language, make a list of numbers, and show it.',
        hints: ['<code>fais</code> is make, <code>être</code> is be, <code>affiche</code> is show.'],
        solution: { lang: 'text', code: 'en français\nfais nombres être [1, 2, 3]\naffiche nombres' }
      }
    },

    /* ---------- ADVANCED ---------- */
    {
      id: 'pl-7', title: 'Lists that do not exist yet', level: 2, minutes: 10,
      blocks: [
        { t: 'p', html: 'A list you write down takes up room. A hundred million numbers take up a hundred million numbers\' worth of it, and your computer will say so.' },
        { t: 'p', html: 'A <b>stream</b> does not hold its items. It knows how to hand you the next one, and nothing is worked out until you ask.' },
        { t: 'code', lang: 'text', code: 'make big be numbers from 1 to 100000000\nshow the first 3 of big' },
        { t: 'p', html: 'That runs instantly. Three numbers were worked out; the other 99,999,997 never happened. A stream can also have no end at all:' },
        { t: 'code', lang: 'text', code: 'for each n in numbers from 2 onwards\n    show n times n\n    if n is 5\n        stop\n    end\nend' },
        { t: 'p', html: 'This is the same idea as generators in Python and JavaScript, and iterators in Rust. It separates <i>what</i> the values are from <i>how many</i> you want — so one stream serves a program that needs three and a program that needs three million.' },
        { t: 'warn', html: 'A loop over an endless stream with no <code>stop</code> would run forever. Plain\'s loop guard stops it and tells you — a rescue, not a plan.' }
      ],
      tryIt: {
        mode: 'plain',
        code: 'make big be numbers from 1 to 100000000\nshow the first 3 of big\n\nfor each n in numbers from 2 onwards\n    show n times n\n    if n is 5\n        stop\n    end\nend',
        expected: '[1, 2, 3]\n4\n9\n16\n25'
      },
      quiz: [
        { q: 'What does <code>numbers from 1 to 100000000</code> cost when you write it?', options: ['A hundred million numbers of memory', 'Almost nothing — nothing is worked out yet', 'It fails', 'It depends on your computer'], a: 1, why: 'A stream knows where to start and stop; it does not hold anything.' },
        { q: 'How do you leave a loop over an endless stream?', options: ['<code>break</code>', '<code>stop</code>', '<code>end</code>', 'You cannot'], a: 1, why: '<code>end</code> closes the block; <code>stop</code> leaves the loop.' },
        { q: 'What is the closest idea in Python?', options: ['A list comprehension', 'A generator', 'A dictionary', 'A decorator'], a: 1, why: 'Same idea: produce values on demand rather than all at once.' }
      ],
      challenge: {
        text: 'Show the first 10 square numbers, using a stream rather than a list.',
        hints: ['<code>numbers from 1 onwards</code> and a counter, or <code>the first 10 of</code> and a loop.'],
        solution: { lang: 'text', code: 'make counted be 0\nfor each n in numbers from 1 onwards\n    show n times n\n    set counted to counted plus 1\n    if counted is 10\n        stop\n    end\nend' }
      }
    },

    {
      id: 'pl-8', title: 'A brain that learns', level: 2, minutes: 20,
      blocks: [
        { t: 'p', html: 'A neural network sounds like a large thing. It is not. It is a pile of numbers, one small sum, and a rule for nudging the numbers when the answer is wrong. All three fit on this page.' },
        { t: 'p', html: 'Start with the sum. A <b>neuron</b> takes its inputs, multiplies each by a <b>weight</b>, adds them up, and <b>squashes</b> the total into something between 0 and 1:' },
        { t: 'code', lang: 'text', code: 'to squash with n\n    give back 1 divided by (1 plus exponent of (0 minus n))\nend' },
        { t: 'p', html: 'That squash matters more than it looks. Without it, stacking neurons is pointless — a pile of straight lines is still a straight line. The squash is the bend that lets a network learn a shape.' },
        { t: 'p', html: 'The job is <b>XOR</b>: 0 and 1 make 1, but 1 and 1 make 0. It is the classic example because <b>one layer cannot do it</b> — you cannot separate those four answers with a single straight line, wherever you put it. That is what a hidden layer is for.' },
        { t: 'p', html: 'Learning is two lines of arithmetic. The network guessed <code>out</code> and wanted <code>want</code>; the difference is how wrong it was and which way. Multiply by <code>out times (1 minus out)</code> — how much the squash was bending there — and you have how hard to push each weight.' },
        { t: 'p', html: 'Then the part that makes it a <i>network</i>: each hidden neuron is blamed in proportion to how much it contributed, by passing the blame backwards along the weight it came forward on. That is all <b>backpropagation</b> means.' },
        { t: 'tip', html: 'Run the code below. It trains for four thousand rounds and then gets all four answers right. Then break it on purpose: set <code>rate</code> to 0.01 (too small to get there), or <code>hidden</code> to 1 (which <i>cannot</i> learn XOR however long you wait).' }
      ],
      tryIt: {
        mode: 'plain',
        code: 'make examples be [\n    { ins: [0, 0], want: 0 },\n    { ins: [0, 1], want: 1 },\n    { ins: [1, 0], want: 1 },\n    { ins: [1, 1], want: 0 }\n]\n\nmake hidden be 3\nmake w1 be []\nmake b1 be []\nrepeat with h from 1 to hidden\n    add [random -1 to 1, random -1 to 1] to w1\n    add 0 to b1\nend\nmake w2 be []\nrepeat with h from 1 to hidden\n    make seed be random -1 to 1\n    add seed to w2\nend\nmake b2 be 0\nmake rate be 0.5\n\nto squash with n\n    give back 1 divided by (1 plus exponent of (0 minus n))\nend\n\nto think with ins\n    make hs be []\n    repeat with h from 1 to hidden\n        make sum be item h of b1\n        make ws be item h of w1\n        repeat with i from 1 to 2\n            set sum to sum plus ((item i of ins) times (item i of ws))\n        end\n        add squash with sum to hs\n    end\n    make out be b2\n    repeat with h from 1 to hidden\n        set out to out plus ((item h of hs) times (item h of w2))\n    end\n    give back { hs: hs, out: squash with out }\nend\n\nrepeat with round from 1 to 4000\n    for each one in examples\n        make ins be ins of one\n        make got be think with ins\n        make out be out of got\n        make hs be hs of got\n\n        make slip be (want of one) minus out\n        make lean be slip times out times (1 minus out)\n\n        repeat with h from 1 to hidden\n            make hv be item h of hs\n            make hlean be lean times (item h of w2) times hv times (1 minus hv)\n            make ws be item h of w1\n            repeat with i from 1 to 2\n                set item i of ws to (item i of ws) plus (rate times hlean times (item i of ins))\n            end\n            set item h of w1 to ws\n            set item h of b1 to (item h of b1) plus (rate times hlean)\n            set item h of w2 to (item h of w2) plus (rate times lean times hv)\n        end\n        set b2 to b2 plus (rate times lean)\n    end\nend\n\nshow "after training:"\nfor each one in examples\n    make got be think with ins of one\n    show "  {item 1 of ins of one} xor {item 2 of ins of one} -> {round (out of got) times 100 divided by 100}  (wanted {want of one})"\nend',
        expected: 'after training:'
      },
      quiz: [
        { q: 'Why does a neuron squash its total?', options: ['To make it smaller', 'Because without a bend, stacked neurons are still just a straight line', 'To avoid errors', 'For speed'], a: 1, why: 'Layers of linear functions collapse into one linear function. The squash is what makes depth mean anything.' },
        { q: 'Why is XOR the classic example?', options: ['It is the simplest', 'One layer cannot separate its four answers with a straight line', 'It is the fastest to train', 'It uses the least memory'], a: 1, why: 'It is the smallest problem that genuinely needs a hidden layer.' },
        { q: 'What is backpropagation, in one sentence?', options: ['Running the network backwards', 'Blaming each hidden neuron in proportion to how much it contributed', 'Undoing the last training round', 'A way to save memory'], a: 1, why: 'The blame travels backwards along the same weight the value came forward on.' }
      ],
      challenge: {
        text: 'Change <code>hidden</code> to 1 and run it. It will fail — every answer drifting toward 0.5. Explain in your own words why one hidden neuron cannot learn XOR.',
        hints: ['Think about what a single neuron can draw: one straight line. Now try to separate {0,1 and 1,0} from {0,0 and 1,1} with one line.'],
        solution: { lang: 'text', code: '# With hidden be 1, the network has one line to draw and XOR needs two.\n# The answers settle near 0.5 - the network hedging, because no single\n# straight line does better than guessing on this problem.\nmake hidden be 1' }
      }
    }
  ],

  /* ---------- PROJECTS ---------- */
  projects: [
    {
      id: 'pl-proj-1', title: 'A quiz that marks itself', minutes: 30,
      brief: 'Ask several questions, keep score, and give a verdict at the end.',
      steps: [
        'Make a list of questions, each a thing with a <code>q</code> and an <code>a</code>.',
        'Walk the list with <code>for each</code>, showing each question.',
        'Keep a score, adding one for every right answer.',
        'At the end, show the score out of the total, and a different message for a good, fair or poor result.'
      ],
      hints: [
        'A question is a thing: <code>{ q: "Capital of France?", a: "Paris" }</code>.',
        'Compare answers in one case so "paris" and "Paris" both count: <code>if lowercase of given is lowercase of (a of one)</code>.',
        'For a percentage: <code>round score times 100 divided by (number of items in questions)</code>.'
      ],
      solution: { lang: 'text', code: 'make questions be [\n    { q: "Capital of France?", a: "Paris" },\n    { q: "2 plus 2?", a: "4" },\n    { q: "Colour of the sky?", a: "blue" }\n]\n\nmake answers be ["Paris", "4", "green"]\nmake score be 0\nmake at be 0\n\nfor each one in questions\n    set at to at plus 1\n    make given be item at of answers\n    show "{q of one}  you said: {given}"\n    if lowercase of given is lowercase of (a of one)\n        set score to score plus 1\n    end\nend\n\nmake many be number of items in questions\nshow "{score} out of {many}"\nif score is many\n    show "Perfect."\notherwise if score is at least (many divided by 2)\n    show "Not bad."\notherwise\n    show "Worth another go."\nend' }
    },

    {
      id: 'pl-proj-2', title: 'A word counter', minutes: 25,
      brief: 'Take a piece of writing and report on it: how many words, which are longest, and which repeat.',
      steps: [
        'Put a paragraph in a name, and split it into words.',
        'Show how many words there are, and how many are different.',
        'Find the longest word.',
        'Count how often each word appears, and show any that appear more than once.'
      ],
      hints: [
        '<code>parts of "a b c" split by " "</code> gives you a list.',
        '<code>unique</code> gives a list with the repeats removed — comparing its length with the original tells you a lot.',
        'To count, keep a thing whose names are the words: <code>set value word of counts to (value word of counts) plus 1</code>.'
      ],
      solution: { lang: 'text', code: 'make writing be "the cat sat on the mat and the cat was glad"\nmake words be parts of writing split by " "\n\nshow "{number of items in words} words"\nshow "{number of items in unique words} of them different"\n\nmake longest be ""\nfor each word in words\n    if length of word is above length of longest\n        set longest to word\n    end\nend\nshow "longest: {longest}"\n\nmake counts be { }\nfor each word in words\n    make sofar be value word of counts\n    if sofar is nothing\n        set sofar to 0\n    end\n    set value word of counts to sofar plus 1\nend\n\nshow "repeated:"\nfor each word in unique words\n    make many be value word of counts\n    if many is above 1\n        show "  {word} - {many} times"\n    end\nend' }
    },

    {
      id: 'pl-proj-3', title: 'A number-guessing game', minutes: 30,
      brief: 'The computer picks a number; a player narrows it down. Then write the player, so the computer plays itself.',
      steps: [
        'Pick a secret number between 1 and 100.',
        'Write an action that takes a guess and says "higher", "lower" or "got it".',
        'Write a guesser that plays properly — always guessing the middle of what is still possible.',
        'Show every guess, and how many it took. Then work out the worst case: how many guesses can it ever need?'
      ],
      hints: [
        'Halving the range each time is called binary search. From 100 possibilities it needs at most 7 guesses.',
        'Keep a <code>low</code> and a <code>high</code>; work the middle out on its own line first, then round it - <code>round (low plus high) divided by 2</code> rounds the sum and <i>then</i> divides, which is not what you meant.',
        'When told "higher", the new low is the guess plus 1.'
      ],
      solution: { lang: 'text', code: 'make secret be random 1 to 100\n\nto judge with guess\n    if guess is secret\n        give back "got it"\n    end\n    if guess is below secret\n        give back "higher"\n    end\n    give back "lower"\nend\n\nmake low be 1\nmake high be 100\nmake tries be 0\n\nrepeat with n from 1 to 20\n    make middle be (low plus high) divided by 2\n    make guess be round middle\n    set tries to tries plus 1\n    make said be judge with guess\n    show "guess {tries}: {guess} - {said}"\n    if said is "got it"\n        stop\n    end\n    if said is "higher"\n        set low to guess plus 1\n    otherwise\n        set high to guess minus 1\n    end\nend\n\nshow "found {secret} in {tries} guesses"\nshow "halving 100 possibilities can never need more than 7"' }
    },

    {
      id: 'pl-proj-4', title: 'A catching game', minutes: 45,
      brief: 'A real 2D game: something falls, you catch it, the score goes up and it speeds up as you go.',
      steps: [
        'Start a game, and make a paddle near the bottom and something to catch at the top.',
        'Every frame, move the falling thing down, and move the paddle with the arrow keys.',
        'When the falling thing goes off the bottom, put it back at the top somewhere random.',
        'When the paddle touches it, add to the score, speed it up a little, and play a sound.',
        'Draw the score on the screen. Then add three lives, lost when you miss.'
      ],
      hints: [
        'Games run in a browser: use <code>plain play mygame.plain</code> from a terminal.',
        '<code>when player touches coin</code> is an event — it does not go inside <code>every frame</code>.',
        '<code>if key "left" is held</code> reads the keyboard; <code>random 50 to 750</code> picks a spot.'
      ],
      solution: { lang: 'text', code: 'start a game called "Catch" sized 800 by 500\nset the background to "#0a0e18"\n\nmake player be a box at 400 , 450 sized 70 by 16 colored "#ffd166"\nmake coin be a circle at 200 , 40 sized 22 colored "#7ee787"\nmake score be 0\nmake lives be 3\nmake speed be 3\n\nevery frame\n    if key "left" is held\n        move player by -7 , 0\n    end\n    if key "right" is held\n        move player by 7 , 0\n    end\n\n    move coin by 0 , speed\n\n    if y of coin is above 500\n        set lives to lives minus 1\n        move coin to random 50 to 750 , 0\n        if lives is at most 0\n            show "final score: {score}"\n            stop the game\n        end\n    end\n\n    draw "score {score}" at 20 , 20 sized 16 colored "#ffffff"\n    draw "lives {lives}" at 20 , 44 sized 16 colored "#ff6b6b"\nend\n\nwhen player touches coin\n    set score to score plus 1\n    set speed to speed plus 0.4\n    move coin to random 50 to 750 , 0\n    play a beep at 880\nend' }
    },

    {
      id: 'pl-proj-5', title: 'Teach the brain something new', minutes: 45,
      brief: 'Take the neural network from lesson 8 and give it a different job.',
      steps: [
        'Start from the XOR network and get it running.',
        'Change the examples to AND instead of XOR — and notice it still works with <code>hidden</code> set to 1, because AND <i>can</i> be drawn with one straight line.',
        'Now give it three inputs instead of two, and teach it "the majority of the three".',
        'Measure it: after training, how far is each answer from what was wanted? Show the average.',
        'Try to make it fail, and explain why it did.'
      ],
      hints: [
        'The <code>repeat with i from 1 to 2</code> loops are what tie the network to two inputs — those need to become 3.',
        'Majority-of-three needs 8 examples, one for every combination.',
        'Average error is a better measure than eyeballing four numbers, and it is the number real training watches.'
      ],
      solution: { lang: 'text', code: '# The change that matters: examples with three inputs, and every loop\n# that said "1 to 2" now says "1 to 3". Majority of three is learnable\n# with a hidden layer of 3 in a few thousand rounds.\nmake examples be [\n    { ins: [0, 0, 0], want: 0 },\n    { ins: [0, 0, 1], want: 0 },\n    { ins: [0, 1, 0], want: 0 },\n    { ins: [0, 1, 1], want: 1 },\n    { ins: [1, 0, 0], want: 0 },\n    { ins: [1, 0, 1], want: 1 },\n    { ins: [1, 1, 0], want: 1 },\n    { ins: [1, 1, 1], want: 1 }\n]\n\n# ... the rest as in lesson 8, with every "1 to 2" changed to "1 to 3"\n# and w1 seeded with three weights a neuron instead of two.\n#\n# To measure rather than eyeball:\n#   make wrongness be 0\n#   for each one in examples\n#       make got be think with ins of one\n#       set wrongness to wrongness plus absolute of ((want of one) minus (out of got))\n#   end\n#   show "average error {wrongness divided by (number of items in examples)}"' }
    }
  ]
};
