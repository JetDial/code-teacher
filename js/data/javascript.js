/* ============================================================
   JavaScript track — lesson data
   ============================================================ */
window.CT_TRACKS = window.CT_TRACKS || {};

window.CT_TRACKS.js = {
  id: 'js',
  name: 'JavaScript',
  icon: 'JS',
  area: 'js',
  tagline: 'The behavior of every web page — what things DO.',
  blurb: 'JavaScript is the programming language of the browser: it reacts to clicks, changes the page, fetches data, runs games. It also runs servers (Node.js), mobile apps, desktop apps — and even neural networks. If you learn one language deeply, this is a superb choice.',
  uses: ['Interactive websites', 'Web apps (Gmail, Figma…)', 'Servers & APIs (Node.js)', 'Mobile apps (React Native)', 'Desktop apps (Electron)', 'Games (browser & beyond)', 'Machine learning (TensorFlow.js)'],
  lessons: [

    /* ---------- BEGINNER ---------- */
    {
      id: 'js-1', title: 'Hello, JavaScript', level: 0, minutes: 8,
      blocks: [
        { t: 'p', html: 'HTML describes, CSS styles — <b>JavaScript acts</b>. It\'s a real programming language: it makes decisions, repeats work, reacts to the user, and changes the page while you watch.' },
        { t: 'p', html: 'Your first tool is <code>console.log()</code> — it prints things to the <b>console</b>, a text area developers use to see what their program is doing:' },
        { t: 'code', lang: 'js', code: 'console.log("Hello, world!");\nconsole.log("2 + 2 is", 2 + 2);' },
        { t: 'p', html: 'Two things to notice: text (a <b>string</b>) goes in quotes, and numbers don\'t. <code>"2 + 2"</code> is four characters of text; <code>2 + 2</code> is math.' },
        { t: 'p', html: 'In a real page, JavaScript lives in a <code>&lt;script&gt;</code> tag (usually at the end of the body) or a separate file:' },
        { t: 'code', lang: 'html', code: '<body>\n  <h1>My page</h1>\n\n  <script>\n    console.log("The page has loaded!");\n  </script>\n</body>' },
        { t: 'tip', html: 'Every browser has a console built in — press <b>F12</b> and click the "Console" tab. You can type JavaScript directly into it, on any website. Try it after this lesson!' }
      ],
      tryIt: {
        mode: 'js',
        code: 'console.log("Hello, world!");\nconsole.log("2 + 2 is", 2 + 2);\n\n// Lines starting with // are comments - notes the computer ignores.\n// Add a console.log that prints your name!'
      },
      quiz: [
        { q: 'What does <code>console.log("hi")</code> do?', options: ['Shows a popup', 'Adds "hi" to the page', 'Prints "hi" to the developer console', 'Nothing'], a: 2, why: 'The console is the developer\'s window into the program — logging is how you see what\'s happening.' },
        { q: 'What is the difference between <code>7</code> and <code>"7"</code>?', options: ['None', 'The first is a number, the second is text (a string)', 'The second is bigger', 'The first is invalid'], a: 1, why: 'Quotes make text. <code>7 + 7</code> is 14, but <code>"7" + "7"</code> is "77"!' },
        { q: 'What does <code>//</code> start?', options: ['A division', 'A web address', 'A comment the computer ignores', 'A new line'], a: 2, why: 'Comments are notes for humans. The computer skips them entirely.' }
      ],
      challenge: {
        text: 'Print a tiny self-introduction to the console: your name, your favorite number, and your favorite number times 2 (let the computer do the math).',
        hints: ['<code>console.log("My number doubled:", 21 * 2);</code>'],
        solution: { lang: 'js', code: 'console.log("Hi, I\'m Sam!");\nconsole.log("My favorite number is", 21);\nconsole.log("Doubled, that\'s", 21 * 2);' }
      }
    },

    {
      id: 'js-2', title: 'Variables & types', level: 0, minutes: 12,
      blocks: [
        { t: 'p', html: 'A <b>variable</b> is a named box that holds a value. Create one with <code>let</code> (changeable) or <code>const</code> (constant — can\'t be reassigned):' },
        { t: 'code', lang: 'js', code: 'let score = 0;\nconst playerName = "Sam";\n\nscore = 10;          // fine - let can change\n// playerName = "Max";  // ERROR - const cannot' },
        { t: 'p', html: 'Modern rule of thumb: <b>use <code>const</code> by default</b>, switch to <code>let</code> only when the value actually needs to change. (You\'ll also see <code>var</code> in old code — it\'s the outdated version of <code>let</code>.)' },
        { t: 'p', html: 'The core types of value:' },
        { t: 'table', head: ['Type', 'Examples', 'What it is'], rows: [
          ['Number', '<code>42</code>, <code>3.14</code>, <code>-7</code>', 'any number — no separate decimal type'],
          ['String', '<code>"hello"</code>, <code>\'hi\'</code>', 'text, in single or double quotes'],
          ['Boolean', '<code>true</code>, <code>false</code>', 'yes/no values — the fuel of decisions'],
          ['undefined', '<code>undefined</code>', 'a variable with no value yet'],
          ['null', '<code>null</code>', '"deliberately nothing"']
        ] },
        { t: 'p', html: 'Strings can be glued together (<b>concatenation</b>) with <code>+</code>, but the modern favorite is the <b>template literal</b> — backticks with <code>${...}</code> slots:' },
        { t: 'code', lang: 'js', code: 'const name = "Sam";\nconst age = 25;\n\nconsole.log("Hi " + name + ", you are " + age);   // old style\nconsole.log(`Hi ${name}, you are ${age}`);        // template literal' },
        { t: 'warn', html: 'Watch the type trap: <code>"2" + 2</code> is <code>"22"</code> (glue), not 4. When one side is a string, + means concatenate.' }
      ],
      tryIt: {
        mode: 'js',
        code: 'const name = "Sam";\nlet coins = 12;\n\ncoins = coins + 5;\n\nconsole.log(`${name} has ${coins} coins.`);\nconsole.log("Type experiment:", "2" + 2);\n\n// Try: make a const for your favorite food\n// and log a sentence about it using backticks.'
      },
      quiz: [
        { q: 'Which declaration can NOT be reassigned later?', options: ['<code>let</code>', '<code>var</code>', '<code>const</code>', 'All can'], a: 2, why: 'const = constant. Reassigning it throws an error, which catches bugs early.' },
        { q: 'What does <code>`I have ${3 + 2} cats`</code> produce?', options: ['<code>I have ${3 + 2} cats</code>', '<code>I have 5 cats</code>', 'An error', '<code>I have 3 + 2 cats</code>'], a: 1, why: 'Inside backticks, ${…} slots run real JavaScript and insert the result.' },
        { q: 'What is <code>"10" + 1</code>?', options: ['<code>11</code>', '<code>"101"</code>', '<code>101</code>', 'An error'], a: 1, why: 'String + anything = concatenation. The 1 becomes "1" and gets glued on.' }
      ],
      challenge: {
        text: 'Create variables for a movie title (const), its rating out of 10 (let), then raise the rating by 1 and log a review sentence with a template literal.',
        hints: ['Raise with <code>rating = rating + 1</code> or the shortcut <code>rating += 1</code>.'],
        solution: { lang: 'js', code: 'const title = "The Waffle Ultimatum";\nlet rating = 8;\n\nrating += 1;\n\nconsole.log(`${title} gets a ${rating}/10 from me!`);' }
      }
    },

    {
      id: 'js-3', title: 'Math & comparisons', level: 0, minutes: 10,
      blocks: [
        { t: 'p', html: 'The math operators are mostly what you\'d guess — plus a couple of newcomers:' },
        { t: 'table', head: ['Operator', 'Meaning', 'Example'], rows: [
          ['<code>+ - * /</code>', 'add, subtract, multiply, divide', '<code>10 / 4</code> → 2.5'],
          ['<code>%</code>', 'remainder (modulo)', '<code>10 % 3</code> → 1'],
          ['<code>**</code>', 'power', '<code>2 ** 10</code> → 1024'],
          ['<code>+=</code> <code>-=</code>', 'change in place', '<code>score += 5</code>'],
          ['<code>++</code> <code>--</code>', 'add/subtract exactly 1', '<code>lives--</code>']
        ] },
        { t: 'p', html: 'The remainder operator <code>%</code> looks weird but earns its keep: <code>n % 2 === 0</code> means "n is even", and remainders make things wrap around (think clock arithmetic: <code>(hour + 5) % 12</code>).' },
        { t: 'p', html: '<b>Comparisons</b> produce booleans — and this is where JavaScript has a famous gotcha:' },
        { t: 'code', lang: 'js', code: 'console.log(5 > 3);       // true\nconsole.log(5 === 5);     // true  - strictly equal\nconsole.log(5 !== 4);     // true  - strictly NOT equal\nconsole.log("5" == 5);    // true  - loose equals converts types 😬\nconsole.log("5" === 5);   // false - strict equals does not' },
        { t: 'warn', html: '<b>Always use <code>===</code> and <code>!==</code></b> (triple, strict). The loose double versions convert types behind your back and cause legendary bugs. One = is assignment, two == is sloppy comparison, three === is what you want.' },
        { t: 'p', html: 'Combine conditions with <code>&amp;&amp;</code> (and), <code>||</code> (or), <code>!</code> (not): <code>age >= 13 &amp;&amp; age &lt; 20</code> means "is a teenager".' }
      ],
      tryIt: {
        mode: 'js',
        code: 'const price = 4.5;\nconst wallet = 20;\n\nconsole.log("Can afford 4?", wallet >= price * 4);\nconsole.log("Change from buying 3:", wallet - price * 3);\nconsole.log("Is 2026 even?", 2026 % 2 === 0);\nconsole.log("2 to the 8th:", 2 ** 8);\n\n// Predict before you run: what does this print?\nconsole.log("7" === 7);'
      },
      quiz: [
        { q: 'What is <code>17 % 5</code>?', options: ['<code>3</code>', '<code>2</code>', '<code>3.4</code>', '<code>0</code>'], a: 1, why: '17 ÷ 5 = 3 remainder 2. The % operator gives the remainder.' },
        { q: 'Which comparison should you habitually use?', options: ['<code>==</code>', '<code>===</code>', '<code>=</code>', 'Whichever'], a: 1, why: 'Strict equality never converts types. <code>"5" === 5</code> is honestly false.' },
        { q: '<code>age >= 18 && hasTicket</code> is true when…', options: ['Either is true', 'Both are true', 'age is exactly 18', 'hasTicket is false'], a: 1, why: '&& (and) requires both sides. || (or) requires at least one.' }
      ],
      challenge: {
        text: 'A game gives 100 points per level plus a 250 bonus every 5th level. Compute the points for level 15 (should be 1750... check with %), and log whether level 15 is a bonus level as a boolean.',
        hints: ['Bonus level test: <code>level % 5 === 0</code>.', 'Total = level * 100 + (bonus levels passed) * 250 → <code>Math.floor(level / 5) * 250</code>.'],
        solution: { lang: 'js', code: 'const level = 15;\n\nconst isBonus = level % 5 === 0;\nconst total = level * 100 + Math.floor(level / 5) * 250;\n\nconsole.log(`Level ${level} bonus level?`, isBonus);\nconsole.log(`Total points: ${total}`);' }
      }
    },

    {
      id: 'js-4', title: 'Making decisions: if / else', level: 0, minutes: 12,
      blocks: [
        { t: 'p', html: 'Programs get interesting when they <b>choose</b>. The <code>if</code> statement runs code only when a condition is true:' },
        { t: 'code', lang: 'js', code: 'const temperature = 3;\n\nif (temperature < 0) {\n  console.log("Ice warning!");\n} else if (temperature < 15) {\n  console.log("Jacket weather.");\n} else {\n  console.log("Nice out!");\n}' },
        { t: 'ul', items: [
          'The condition lives in parentheses and must boil down to true or false.',
          'The curly braces <code>{ }</code> hold the code that runs — its <b>block</b>.',
          '<code>else if</code> chains checks in order; the <b>first</b> true one wins and the rest are skipped.',
          '<code>else</code> is the catch-all when nothing matched.'
        ] },
        { t: 'p', html: 'Conditions can combine logic: <code>if (day === "Sat" || day === "Sun")</code>. And anything can nest — an if inside an if is normal (but if you\'re four levels deep, there\'s usually a cleaner way).' },
        { t: 'p', html: 'For quick either/or <i>values</i>, the ternary operator is a one-line if:' },
        { t: 'code', lang: 'js', code: 'const age = 20;\nconst label = age >= 18 ? "adult" : "minor";\nconsole.log(label); // "adult"' },
        { t: 'tip', html: 'Read <code>a ? b : c</code> as "if a, then b, otherwise c". Great for small choices; unreadable when nested — use a real if for anything complex.' }
      ],
      tryIt: {
        mode: 'js',
        code: 'const score = 87;\n\nif (score >= 90) {\n  console.log("Grade: A");\n} else if (score >= 80) {\n  console.log("Grade: B");\n} else if (score >= 70) {\n  console.log("Grade: C");\n} else {\n  console.log("Grade: needs pizza and a retry");\n}\n\n// Change the score and re-run.\n// Then add an A+ grade for 97 and up.\n// Careful: where must that check go in the chain?'
      },
      quiz: [
        { q: 'In an if / else-if chain, which branch runs?', options: ['All true ones', 'The first true one only', 'The last true one', 'A random true one'], a: 1, why: 'The chain checks top to bottom and stops at the first match — order matters!' },
        { q: 'When does <code>else</code> run?', options: ['Always', 'When the if condition was true', 'When no condition above it matched', 'Never'], a: 2, why: 'else is the fallback for "none of the above".' },
        { q: 'What is <code>x > 10 ? "big" : "small"</code> when x is 4?', options: ['<code>"big"</code>', '<code>"small"</code>', '<code>true</code>', 'An error'], a: 1, why: 'The condition is false, so the value after the colon is chosen.' }
      ],
      challenge: {
        text: 'Write a movie-ticket price calculator: base price 12. Under 13 or over 64 pays half. Tuesdays (make a <code>day</code> variable) everyone pays 5. Log the final price for a few test cases.',
        hints: ['Check the Tuesday special first — it overrides everything.', 'Half price: <code>price = 12 / 2</code> or <code>price *= 0.5</code>.'],
        solution: { lang: 'js', code: 'const age = 70;\nconst day = "Tuesday";\n\nlet price = 12;\n\nif (day === "Tuesday") {\n  price = 5;\n} else if (age < 13 || age > 64) {\n  price = 6;\n}\n\nconsole.log(`Ticket: $${price}`);' }
      }
    },

    {
      id: 'js-5', title: 'Loops: repeating work', level: 0, minutes: 12,
      blocks: [
        { t: 'p', html: 'Computers shine at repetition. The classic counting loop is <code>for</code>:' },
        { t: 'code', lang: 'js', code: 'for (let i = 1; i <= 5; i++) {\n  console.log(`Lap ${i}`);\n}' },
        { t: 'p', html: 'Three parts, separated by semicolons: <b>start</b> (<code>let i = 1</code>), <b>keep-going test</b> (<code>i &lt;= 5</code>), <b>step</b> (<code>i++</code>). Read it as: "start i at 1; while i ≤ 5, run the block, then add 1 to i".' },
        { t: 'p', html: '<code>while</code> loops when you don\'t know how many times in advance — "keep going until something happens":' },
        { t: 'code', lang: 'js', code: 'let fuel = 100;\nwhile (fuel > 0) {\n  fuel -= 23;\n  console.log("Vroom! Fuel left:", fuel);\n}' },
        { t: 'p', html: 'Two control words work inside any loop: <code>break</code> exits the loop immediately; <code>continue</code> skips to the next round.' },
        { t: 'warn', html: 'If the keep-going test never becomes false, the loop runs forever and freezes the page. If that happens in an editor here, the preview panel may stop responding — just fix the code and press Run again (the panel reloads fresh each run).' },
        { t: 'p', html: 'Loops + conditions = real programs. FizzBuzz, the world\'s most famous exercise, is exactly that combination — it\'s your challenge below.' }
      ],
      tryIt: {
        mode: 'js',
        code: '// Countdown launcher\nfor (let i = 5; i >= 1; i--) {\n  console.log(i + "...");\n}\nconsole.log("LIFTOFF! 🚀");\n\n// Try: print the 7 times table (7, 14, ... 70)\n// using a loop and multiplication.'
      },
      quiz: [
        { q: 'How many times does <code>for (let i = 0; i < 3; i++)</code> loop?', options: ['2', '3', '4', 'Forever'], a: 1, why: 'i takes the values 0, 1, 2 — three rounds. The test fails at 3.' },
        { q: 'What does <code>break</code> do in a loop?', options: ['Pauses one second', 'Skips one round', 'Exits the loop immediately', 'Restarts the loop'], a: 2, why: 'break jumps out; continue skips to the next iteration.' },
        { q: 'When is <code>while</code> better than <code>for</code>?', options: ['Never', 'When you don\'t know the number of repetitions ahead of time', 'When counting up', 'When counting down'], a: 1, why: '"Repeat until a condition changes" is while\'s natural shape.' }
      ],
      challenge: {
        text: '<b>FizzBuzz:</b> loop 1 to 30. Multiples of 3 print "Fizz", multiples of 5 print "Buzz", multiples of both print "FizzBuzz", everything else prints the number.',
        hints: ['Test "both" FIRST (<code>i % 15 === 0</code>) or the single checks will steal it.', 'Multiple of 3: <code>i % 3 === 0</code>.'],
        solution: { lang: 'js', code: 'for (let i = 1; i <= 30; i++) {\n  if (i % 15 === 0) {\n    console.log("FizzBuzz");\n  } else if (i % 3 === 0) {\n    console.log("Fizz");\n  } else if (i % 5 === 0) {\n    console.log("Buzz");\n  } else {\n    console.log(i);\n  }\n}' }
      }
    },

    /* ---------- INTERMEDIATE ---------- */
    {
      id: 'js-6', title: 'Functions: reusable recipes', level: 1, minutes: 14,
      blocks: [
        { t: 'p', html: 'A <b>function</b> is a named, reusable piece of program: define it once, run ("call") it whenever. Functions take inputs (<b>parameters</b>) and can hand back an output (<b>return</b>):' },
        { t: 'code', lang: 'js', code: 'function greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("Sam"));   // Hello, Sam!\nconsole.log(greet("Ada"));   // Hello, Ada!' },
        { t: 'p', html: '<code>return</code> does two jobs: it ends the function and sends a value back to whoever called it. A function without a return gives back <code>undefined</code>.' },
        { t: 'p', html: 'You\'ll also constantly see <b>arrow functions</b> — a shorter syntax for the same idea:' },
        { t: 'code', lang: 'js', code: 'const double = (x) => x * 2;          // one-liner: implicit return\nconst add = (a, b) => a + b;\n\nconst shout = (text) => {\n  const loud = text.toUpperCase();     // longer bodies need braces\n  return loud + "!!!";\n};\n\nconsole.log(double(21), add(2, 3), shout("hey"));' },
        { t: 'p', html: 'Why functions matter beyond saving typing: they give ideas <b>names</b>. <code>calculateTax(price)</code> reads like English. Big programs are just small functions composed together.' },
        { t: 'tip', html: 'A healthy function does <b>one thing</b> and its name says what. If you can\'t name it without "and" — <code>validateAndSaveAndEmail()</code> — split it up.' }
      ],
      tryIt: {
        mode: 'js',
        code: 'function areaOfCircle(radius) {\n  return Math.PI * radius ** 2;\n}\n\nconst tip = (bill, percent) => bill * (percent / 100);\n\nconsole.log("Pizza area:", areaOfCircle(15).toFixed(1), "cm²");\nconsole.log("Tip on $60 at 18%:", tip(60, 18).toFixed(2));\n\n// Write a function isEven(n) that returns true/false,\n// and test it on 3 numbers.'
      },
      quiz: [
        { q: 'What does <code>return</code> do?', options: ['Prints a value', 'Ends the function and sends a value back', 'Restarts the function', 'Declares a variable'], a: 1, why: 'The returned value replaces the call: <code>greet("Sam")</code> BECOMES "Hello, Sam!" wherever it\'s written.' },
        { q: 'What is <code>const f = x => x + 1;</code>?', options: ['A comparison', 'An arrow function that adds 1', 'An error', 'A loop'], a: 1, why: 'Arrow syntax: parameters, arrow, expression to return.' },
        { q: 'A function\'s parameters are…', options: ['Its output values', 'Named inputs it receives when called', 'Global variables', 'Optional comments'], a: 1, why: 'Parameters are the input slots; arguments are the actual values passed in.' }
      ],
      challenge: {
        text: 'Write <code>convertTemp(celsius)</code> returning a string like <code>"20°C is 68°F"</code> (F = C × 9/5 + 32). Then write <code>freezing(celsius)</code> that uses a comparison to return true below 0. Test both.',
        hints: ['Functions can call other functions — build the string with a template literal.'],
        solution: { lang: 'js', code: 'function convertTemp(c) {\n  const f = c * 9 / 5 + 32;\n  return `${c}°C is ${f}°F`;\n}\n\nconst freezing = (c) => c < 0;\n\nconsole.log(convertTemp(20));\nconsole.log(convertTemp(-10));\nconsole.log("Is -10 freezing?", freezing(-10));' }
      }
    },

    {
      id: 'js-7', title: 'Arrays: lists of things', level: 1, minutes: 14,
      blocks: [
        { t: 'p', html: 'An <b>array</b> is an ordered list in one variable. Items are read by position (<b>index</b>) — and counting starts at <b>0</b>:' },
        { t: 'code', lang: 'js', code: 'const foods = ["pizza", "tacos", "sushi"];\n\nconsole.log(foods[0]);        // "pizza"\nconsole.log(foods.length);    // 3\n\nfoods.push("ramen");          // add to the end\nconsole.log(foods);           // 4 items now' },
        { t: 'p', html: 'The everyday toolbox:' },
        { t: 'table', head: ['Method', 'What it does'], rows: [
          ['<code>push(x)</code> / <code>pop()</code>', 'add / remove at the end'],
          ['<code>unshift(x)</code> / <code>shift()</code>', 'add / remove at the start'],
          ['<code>includes(x)</code>', 'is x in there? true/false'],
          ['<code>indexOf(x)</code>', 'where is x? (-1 if absent)'],
          ['<code>slice(a, b)</code>', 'copy a piece, original untouched'],
          ['<code>join(", ")</code>', 'glue into one string']
        ] },
        { t: 'p', html: 'Looping over arrays is daily bread. The cleanest way to visit every item is <code>for...of</code>:' },
        { t: 'code', lang: 'js', code: 'for (const food of foods) {\n  console.log(`I could eat ${food} right now.`);\n}' },
        { t: 'p', html: 'And then there are the power tools — methods that take a <i>function</i> and do the loop for you:' },
        { t: 'code', lang: 'js', code: 'const nums = [3, 7, 12, 5, 20];\n\nconst doubled = nums.map(n => n * 2);        // transform each -> [6,14,24,10,40]\nconst big = nums.filter(n => n > 6);          // keep some     -> [7,12,20]\nconst total = nums.reduce((a, b) => a + b);   // boil down     -> 47\n\nconsole.log(doubled, big, total);' },
        { t: 'tip', html: '<code>map</code> = same length, transformed. <code>filter</code> = same items, fewer of them. <code>reduce</code> = one value from many. These three run half the internet.' }
      ],
      tryIt: {
        mode: 'js',
        code: 'const scores = [88, 42, 95, 73, 60, 99];\n\nconst passing = scores.filter(s => s >= 70);\nconst curved = scores.map(s => Math.min(100, s + 5));\nconst average = scores.reduce((a, b) => a + b) / scores.length;\n\nconsole.log("Passing:", passing);\nconsole.log("Curved:", curved);\nconsole.log("Average:", average.toFixed(1));\n\n// Find the top score with Math.max(...scores)'
      },
      quiz: [
        { q: 'What is <code>["a","b","c"][1]</code>?', options: ['<code>"a"</code>', '<code>"b"</code>', '<code>"c"</code>', 'An error'], a: 1, why: 'Indexes start at 0, so index 1 is the second item.' },
        { q: '<code>[1,2,3,4].filter(n => n % 2 === 0)</code> gives…', options: ['<code>[1, 3]</code>', '<code>[2, 4]</code>', '<code>[true, false]</code>', '<code>2</code>'], a: 1, why: 'filter keeps items where the function says true — the evens.' },
        { q: 'Which method transforms every item into something new?', options: ['<code>push</code>', '<code>map</code>', '<code>includes</code>', '<code>join</code>'], a: 1, why: 'map builds a new array by applying your function to each item.' }
      ],
      challenge: {
        text: 'Given <code>const prices = [4.5, 12, 8.25, 3, 19.99]</code>: make a new array with 10% off everything, filter it to only items under 10, and log the total you\'d pay for those.',
        hints: ['Chain them! <code>prices.map(...).filter(...).reduce(...)</code>'],
        solution: { lang: 'js', code: 'const prices = [4.5, 12, 8.25, 3, 19.99];\n\nconst total = prices\n  .map(p => p * 0.9)\n  .filter(p => p < 10)\n  .reduce((a, b) => a + b);\n\nconsole.log(`You pay: $${total.toFixed(2)}`);' }
      }
    },

    {
      id: 'js-8', title: 'Objects: labeled data', level: 1, minutes: 14,
      blocks: [
        { t: 'p', html: 'Arrays store things by position; <b>objects</b> store things by <b>name</b>. They\'re how you model "a thing with properties":' },
        { t: 'code', lang: 'js', code: 'const player = {\n  name: "Sam",\n  level: 12,\n  hp: 80,\n  inventory: ["sword", "3 potions"]\n};\n\nconsole.log(player.name);          // dot access\nconsole.log(player["level"]);      // bracket access (same thing)\n\nplayer.hp -= 25;                   // properties can change\nplayer.guild = "Waffle Knights";   // or be added' },
        { t: 'p', html: 'Objects hold anything — numbers, strings, arrays, other objects, even functions. A function stored on an object is called a <b>method</b>, and inside it, <code>this</code> refers to the object itself:' },
        { t: 'code', lang: 'js', code: 'const counter = {\n  count: 0,\n  add() {\n    this.count++;\n    console.log("Count is now", this.count);\n  }\n};\n\ncounter.add();\ncounter.add();' },
        { t: 'p', html: 'Real data is usually <b>arrays of objects</b> — a list of users, products, messages. Every API you\'ll ever call returns some shape like this:' },
        { t: 'code', lang: 'js', code: 'const menu = [\n  { name: "Pancakes", price: 5, vegan: false },\n  { name: "Fruit bowl", price: 6, vegan: true },\n  { name: "Waffles", price: 7, vegan: false }\n];\n\nconst cheapNames = menu\n  .filter(item => item.price < 7)\n  .map(item => item.name);\n\nconsole.log(cheapNames);   // ["Pancakes", "Fruit bowl"]' },
        { t: 'tip', html: 'That JSON you\'ll hear about constantly? It\'s just this — objects and arrays written as text so they can be sent over the internet. <code>JSON.stringify(obj)</code> converts to text, <code>JSON.parse(text)</code> converts back.' }
      ],
      tryIt: {
        mode: 'js',
        code: 'const pet = {\n  name: "Waffles",\n  species: "cat",\n  hunger: 3,\n  feed() {\n    this.hunger = Math.max(0, this.hunger - 1);\n    console.log(`${this.name} eats. Hunger: ${this.hunger}`);\n  }\n};\n\npet.feed();\npet.feed();\n\nconsole.log(JSON.stringify(pet));\n\n// Add a play() method that RAISES hunger by 1\n// and logs something fun.'
      },
      quiz: [
        { q: 'How do you read the name property of <code>user</code>?', options: ['<code>user->name</code>', '<code>user.name</code>', '<code>user(name)</code>', '<code>name.user</code>'], a: 1, why: 'Dot notation. <code>user["name"]</code> also works and allows dynamic keys.' },
        { q: 'Inside a method, <code>this</code> refers to…', options: ['The window', 'The method itself', 'The object the method belongs to', 'Nothing'], a: 2, why: 'this lets methods read and change their own object\'s properties.' },
        { q: 'Most real-world data (API responses etc.) is shaped as…', options: ['One giant string', 'Arrays of objects', 'Only numbers', 'HTML'], a: 1, why: 'Lists of labeled things — users, posts, products — are arrays of objects, usually as JSON.' }
      ],
      challenge: {
        text: 'Model a tiny library: an array of 3 book objects (title, author, pages, read: true/false). Log the total pages of all books, and the titles of unread ones.',
        hints: ['Total pages: <code>books.reduce((sum, b) => sum + b.pages, 0)</code>.', 'Unread titles: filter then map.'],
        solution: { lang: 'js', code: 'const books = [\n  { title: "Dune", author: "Herbert", pages: 412, read: true },\n  { title: "Emma", author: "Austen", pages: 380, read: false },\n  { title: "It", author: "King", pages: 1138, read: false }\n];\n\nconst totalPages = books.reduce((sum, b) => sum + b.pages, 0);\nconst unread = books.filter(b => !b.read).map(b => b.title);\n\nconsole.log("Total pages:", totalPages);\nconsole.log("Still to read:", unread);' }
      }
    },

    {
      id: 'js-9', title: 'The DOM: JavaScript meets the page', level: 1, minutes: 14,
      blocks: [
        { t: 'p', html: 'The browser turns your HTML into a live tree of objects called the <b>DOM</b> (Document Object Model). JavaScript can grab any element from that tree, read it, restyle it, rewrite it, or delete it — that\'s how pages change without reloading.' },
        { t: 'p', html: 'Finding elements:' },
        { t: 'code', lang: 'js', code: 'const title = document.querySelector("h1");        // first match, CSS selector\nconst byId = document.querySelector("#status");     // by id\nconst allCards = document.querySelectorAll(".card"); // ALL matches (a list)' },
        { t: 'p', html: '<code>querySelector</code> takes the same selectors you learned in CSS — that knowledge just paid off twice. Once you hold an element, you can change it:' },
        { t: 'table', head: ['Property/method', 'Changes'], rows: [
          ['<code>el.textContent = "hi"</code>', 'the text inside'],
          ['<code>el.innerHTML = "&lt;b&gt;hi&lt;/b&gt;"</code>', 'the HTML inside (careful with untrusted text!)'],
          ['<code>el.style.color = "red"</code>', 'inline styles (JS names: <code>backgroundColor</code>)'],
          ['<code>el.classList.add("active")</code>', 'classes — also <code>.remove()</code> and <code>.toggle()</code>'],
          ['<code>el.remove()</code>', 'deletes the element']
        ] },
        { t: 'p', html: 'And you can create elements from nothing:' },
        { t: 'code', lang: 'js', code: 'const li = document.createElement("li");\nli.textContent = "A brand new item";\ndocument.querySelector("ul").appendChild(li);' },
        { t: 'tip', html: 'The pro move for styling changes is <code>classList.toggle</code> — keep the actual styles in CSS under a class like <code>.dark</code> or <code>.hidden</code>, and let JS just flip the class on and off. Style lives in CSS, behavior in JS.' }
      ],
      tryIt: {
        mode: 'web',
        html: '<h1 id="headline">Breaking news</h1>\n<ul id="list">\n  <li>First item</li>\n</ul>',
        css: 'body { font-family: sans-serif; padding: 20px; }\n.highlight { background: gold; padding: 2px 6px; }',
        js: 'const headline = document.querySelector("#headline");\nheadline.textContent = "JavaScript takes over page!";\nheadline.classList.add("highlight");\n\nconst list = document.querySelector("#list");\nfor (let i = 2; i <= 4; i++) {\n  const li = document.createElement("li");\n  li.textContent = `Item number ${i}`;\n  list.appendChild(li);\n}'
      },
      quiz: [
        { q: 'What is the DOM?', options: ['A programming language', 'The browser\'s live object tree of your page', 'A file format', 'A database'], a: 1, why: 'HTML is the recipe; the DOM is the living dish the browser made — and JS can edit it live.' },
        { q: '<code>document.querySelector(".note")</code> returns…', options: ['All elements with class note', 'The first element matching the CSS selector', 'The text "note"', 'A stylesheet'], a: 1, why: 'querySelector = first match. querySelectorAll = every match.' },
        { q: 'The cleanest way to change an element\'s look from JS is…', options: ['Rewrite its HTML', 'Set 10 style properties one by one', 'Toggle a CSS class', 'Delete and recreate it'], a: 2, why: 'Define the look in CSS; flip the class in JS. Each language does its job.' }
      ],
      challenge: {
        text: 'In the try-it, add a paragraph with id "counter" in the HTML, then make JS fill it with the number of list items (use <code>querySelectorAll("li").length</code>) — and keep it correct after your loop adds items.',
        hints: ['Count AFTER appending, or the number will be stale.'],
        solution: { lang: 'js', code: '// after the loop that adds items:\nconst count = document.querySelectorAll("li").length;\ndocument.querySelector("#counter").textContent =\n  `The list has ${count} items.`;' }
      }
    },

    {
      id: 'js-10', title: 'Events: reacting to the user', level: 1, minutes: 14,
      blocks: [
        { t: 'p', html: 'Web pages are event-driven: nothing happens until the user does something — clicks, types, scrolls, submits. You attach a function (a "listener") to an element, and the browser calls it when the event fires:' },
        { t: 'code', lang: 'js', code: 'const btn = document.querySelector("#magic");\n\nbtn.addEventListener("click", () => {\n  document.body.style.background = "lavender";\n});' },
        { t: 'p', html: 'The events you\'ll use most:' },
        { t: 'table', head: ['Event', 'Fires when'], rows: [
          ['<code>click</code>', 'element is clicked (buttons, links, anything)'],
          ['<code>input</code>', 'a form field\'s value changes, every keystroke'],
          ['<code>change</code>', 'a field is committed (checkbox toggled, select picked)'],
          ['<code>submit</code>', 'a form is submitted (pair with <code>event.preventDefault()</code>)'],
          ['<code>keydown</code>', 'a keyboard key goes down'],
          ['<code>mouseover</code> / <code>mouseout</code>', 'pointer enters / leaves']
        ] },
        { t: 'p', html: 'The listener receives an <b>event object</b> full of details — which key, where the mouse was, what the target element is:' },
        { t: 'code', lang: 'js', code: 'const input = document.querySelector("#name");\n\ninput.addEventListener("input", (event) => {\n  console.log("Current value:", event.target.value);\n});\n\ndocument.addEventListener("keydown", (event) => {\n  if (event.key === "Escape") console.log("Panic button!");\n});' },
        { t: 'p', html: 'Reading input values + changing the DOM + events = you can now build actual apps. The to-do list project in the Projects section is exactly these three skills combined.' }
      ],
      tryIt: {
        mode: 'web',
        html: '<h2 id="greeting">Hello, stranger!</h2>\n<input id="name" placeholder="Type your name...">\n<button id="party">🎉 Party mode</button>',
        css: 'body { font-family: sans-serif; padding: 20px; transition: background 0.4s; }\ninput, button { font-size: 16px; padding: 8px 12px; }\n.party { background: hotpink; }',
        js: 'const input = document.querySelector("#name");\nconst greeting = document.querySelector("#greeting");\n\ninput.addEventListener("input", () => {\n  const name = input.value.trim();\n  greeting.textContent = name ? `Hello, ${name}!` : "Hello, stranger!";\n});\n\ndocument.querySelector("#party").addEventListener("click", () => {\n  document.body.classList.toggle("party");\n});'
      },
      quiz: [
        { q: '<code>addEventListener("click", fn)</code> means…', options: ['Call fn now', 'Call fn every time the element is clicked', 'Click the element', 'fn replaces the element'], a: 1, why: 'You register the function; the browser calls it on each event, forever (until removed).' },
        { q: 'Which event fires on every keystroke in a text field?', options: ['<code>click</code>', '<code>submit</code>', '<code>input</code>', '<code>load</code>'], a: 2, why: 'input fires on every value change — ideal for live feedback and search-as-you-type.' },
        { q: 'In a listener, <code>event.target</code> is…', options: ['The event name', 'The element the event happened on', 'The mouse position', 'The parent window'], a: 1, why: 'target tells you which element fired — one listener can serve many elements that way.' }
      ],
      challenge: {
        text: 'Add a click-counter: a button and a paragraph. Each click increments a number in the paragraph, and at 10 clicks the text changes to "OK, that\'s enough clicking."',
        hints: ['Keep the count in a <code>let</code> variable outside the listener.'],
        solution: { lang: 'js', code: 'let clicks = 0;\nconst btn = document.querySelector("#clicker");\nconst out = document.querySelector("#count");\n\nbtn.addEventListener("click", () => {\n  clicks++;\n  out.textContent = clicks >= 10\n    ? "OK, that\'s enough clicking."\n    : `Clicks: ${clicks}`;\n});' }
      }
    },

    /* ---------- ADVANCED ---------- */
    {
      id: 'js-11', title: 'Timers, async & fetching data', level: 2, minutes: 16,
      blocks: [
        { t: 'p', html: 'Some things take time — waiting a second, downloading data. JavaScript never stops to wait; instead you hand it a function to run <i>later</i>. The simplest versions are timers:' },
        { t: 'code', lang: 'js', code: 'setTimeout(() => console.log("3 seconds passed!"), 3000);\n\nconst tick = setInterval(() => console.log("tick"), 1000);\nsetTimeout(() => clearInterval(tick), 5000);  // stop after 5s' },
        { t: 'p', html: 'For bigger waits — like network requests — modern JS uses <b>promises</b>, tamed by the <code>async/await</code> keywords: <code>await</code> pauses <i>inside the function</i> until the result arrives, while the rest of the page keeps running.' },
        { t: 'p', html: '<code>fetch()</code> requests a URL and returns a promise. This is how sites load live data — weather, scores, search results — without reloading:' },
        { t: 'code', lang: 'js', code: 'async function loadJoke() {\n  const response = await fetch("https://official-joke-api.appspot.com/random_joke");\n  const data = await response.json();   // parse JSON into objects\n  console.log(data.setup);\n  console.log(data.punchline);\n}\n\nloadJoke();' },
        { t: 'p', html: 'Public data sources like this are called <b>APIs</b> (Application Programming Interfaces) — URLs that return JSON instead of pages. Thousands are free: weather, space launches, dictionaries, Pokémon…' },
        { t: 'p', html: 'When things fail (no internet, bad URL), <code>try/catch</code> handles it gracefully:' },
        { t: 'code', lang: 'js', code: 'async function safeLoad() {\n  try {\n    const res = await fetch("https://example.com/nope.json");\n    const data = await res.json();\n    console.log(data);\n  } catch (err) {\n    console.log("Something went wrong:", err.message);\n  }\n}' },
        { t: 'warn', html: 'The fetch example needs internet, and some APIs block requests from other sites (a security feature called CORS). If one API refuses, it\'s not you — try another.' }
      ],
      tryIt: {
        mode: 'js',
        code: '// A tiny countdown using a timer:\nlet seconds = 3;\nconsole.log("Starting countdown...");\n\nconst timer = setInterval(() => {\n  console.log(seconds + "...");\n  seconds--;\n  if (seconds === 0) {\n    clearInterval(timer);\n    console.log("Done! 🎉");\n  }\n}, 700);\n\n// If you\'re online, un-comment this to fetch a real joke:\n// (async () => {\n//   const res = await fetch("https://official-joke-api.appspot.com/random_joke");\n//   const joke = await res.json();\n//   console.log(joke.setup, "...", joke.punchline);\n// })();'
      },
      quiz: [
        { q: '<code>setTimeout(fn, 2000)</code> runs fn…', options: ['Every 2 seconds', 'Once, after about 2 seconds', 'Immediately, twice', '2000 times'], a: 1, why: 'setTimeout = once, later. setInterval = repeatedly.' },
        { q: 'What does <code>await</code> do?', options: ['Stops the whole browser', 'Pauses that async function until the promise resolves', 'Repeats a request', 'Catches errors'], a: 1, why: 'Only the async function waits — the page stays responsive.' },
        { q: 'An API, in this context, is…', options: ['A programming language', 'A URL that returns data (usually JSON) for programs to use', 'A browser extension', 'A database inside your page'], a: 1, why: 'APIs are how programs ask other computers for data or actions.' }
      ],
      challenge: {
        text: 'Build a "typing effect": given <code>const msg = "HELLO THERE"</code>, print one additional letter every 200ms (H, HE, HEL…) until complete, then stop the timer.',
        hints: ['Keep an index; each tick, log <code>msg.slice(0, i)</code> and increment.', 'Stop when <code>i > msg.length</code> with clearInterval.'],
        solution: { lang: 'js', code: 'const msg = "HELLO THERE";\nlet i = 1;\n\nconst t = setInterval(() => {\n  console.log(msg.slice(0, i));\n  i++;\n  if (i > msg.length) clearInterval(t);\n}, 200);' }
      }
    },

    {
      id: 'js-12', title: 'Debugging & modern JS habits', level: 2, minutes: 14,
      blocks: [
        { t: 'p', html: 'Every programmer\'s code breaks constantly — the skill is finding out <i>why</i>, fast. Your toolkit:' },
        { t: 'ul', items: [
          '<b>Read the error message.</b> Really read it. <code>TypeError: Cannot read properties of undefined (reading \'name\')</code> means: something you expected to be an object was undefined, and it tells you the line number.',
          '<b>console.log everything suspicious.</b> Print the variable right before the crash. Nine times out of ten it doesn\'t contain what you assumed.',
          '<b>Shrink the problem.</b> Comment out half the code. Still broken? The bug is in the other half. Repeat — you\'ll corner it in minutes.',
          '<b>The debugger.</b> In browser dev tools (F12 → Sources), click a line number to set a breakpoint — the code pauses there and you can inspect every variable at that instant.'
        ] },
        { t: 'p', html: 'The classic errors, decoded:' },
        { t: 'table', head: ['Error', 'Usual meaning'], rows: [
          ['<code>x is not defined</code>', 'typo in a name, or the variable doesn\'t exist yet'],
          ['<code>x is not a function</code>', 'you called something that isn\'t callable — often a typo\'d method name'],
          ['<code>Cannot read properties of undefined/null</code>', 'a lookup like <code>a.b.c</code> where <code>a.b</code> came back empty'],
          ['<code>Unexpected token</code>', 'a syntax slip — unclosed bracket, stray comma, missing quote']
        ] },
        { t: 'p', html: 'And a few modern-JS habits that make code shorter and safer:' },
        { t: 'code', lang: 'js', code: 'const user = { name: "Sam", pet: { name: "Waffles" } };\n\n// destructuring: unpack properties into variables\nconst { name, pet } = user;\n\n// optional chaining: safe lookups that may not exist\nconsole.log(user.boss?.name);       // undefined, NOT a crash\n\n// spread: copy/merge arrays and objects\nconst base = [1, 2, 3];\nconst more = [...base, 4, 5];\n\n// default parameters\nconst greet = (who = "friend") => `Hi, ${who}!`;\nconsole.log(name, more, greet());' },
        { t: 'tip', html: 'Where to go next: build the projects in this site, then explore Node.js (JavaScript outside the browser), a framework like React or Vue, and TypeScript (JavaScript with types). And check the AI &amp; Neural Nets track here — you already know enough JS to train a network.' }
      ],
      tryIt: {
        mode: 'js',
        code: '// This program has 3 bugs. Fix them all!\n// Goal: print the names of users older than 20.\n\nconst users = [\n  { name: "Ada", age: 36 },\n  { name: "Sam", age: 19 },\n  { name: "Kim", age: 28 }\n];\n\nconst grownups = users.filtr(u => u.age > 20);\n\nfor (const u of grownups) {\n  console.log(u.nmae);\n}\n\nconsole.log("Total found: " + grownups.length);',
        note: 'Run it, read each error, fix, run again. (Bugs: filtr → filter, nmae → name, console → console.)'
      },
      quiz: [
        { q: '<code>TypeError: Cannot read properties of undefined (reading \'length\')</code> most likely means…', options: ['The internet is down', 'You did <code>something.length</code> but something was undefined', 'length is misspelled', 'The array is too long'], a: 1, why: 'The value before the dot was undefined. Log it and find out why.' },
        { q: 'Your 100-line program broke somewhere. The fastest first move is…', options: ['Rewrite it', 'Read every line carefully', 'Comment out half and see if the bug remains', 'Ask someone'], a: 2, why: 'Binary search on your own code corners any bug in ~7 halvings.' },
        { q: 'What does <code>user.address?.city</code> return when address is missing?', options: ['A crash', '<code>undefined</code>', '<code>null</code>', 'An empty string'], a: 1, why: 'Optional chaining short-circuits to undefined instead of throwing.' }
      ],
      challenge: {
        text: 'Fix all three bugs in the try-it editor, then improve it: use destructuring in the loop — <code>for (const { name, age } of grownups)</code> — and print both.',
        hints: ['Errors report line numbers — the console output tells you exactly where to look.'],
        solution: { lang: 'js', code: 'const users = [\n  { name: "Ada", age: 36 },\n  { name: "Sam", age: 19 },\n  { name: "Kim", age: 28 }\n];\n\nconst grownups = users.filter(u => u.age > 20);\n\nfor (const { name, age } of grownups) {\n  console.log(`${name} (${age})`);\n}\n\nconsole.log("Total found: " + grownups.length);' }
      }
    },

    {
      id: 'js-13', title: 'Regular expressions', level: 2, minutes: 14,
      blocks: [
        { t: 'p', html: 'A <b>regular expression</b> (regex) is a pattern that describes text: "an email-shaped thing", "three digits then a dash", "any word starting with W". One pattern replaces a page of string-fiddling code, and regex exists in every language on this site — learn it once, use it everywhere.' },
        { t: 'code', lang: 'js', code: 'const pattern = /\\d+/;            // "one or more digits"\n\nconsole.log(pattern.test("Room 404"));        // true - is it in there?\nconsole.log("Room 404".match(/\\d+/)[0]);      // "404" - grab it\nconsole.log("a1b22c333".match(/\\d+/g));       // ["1","22","333"] - g = all\nconsole.log("2026-08-13".replace(/-/g, "/")); // "2026/08/13"' },
        { t: 'p', html: 'The vocabulary — a dozen symbols cover most real work:' },
        { t: 'table', head: ['Symbol', 'Means', 'Example'], rows: [
          ['<code>\\d</code> <code>\\w</code> <code>\\s</code>', 'digit / word char / whitespace', '<code>\\d\\d\\d</code> = 3 digits'],
          ['<code>.</code>', 'any single character', '<code>c.t</code> = cat, cot, c9t'],
          ['<code>+</code> <code>*</code> <code>?</code>', '1+ / 0+ / optional', '<code>colou?r</code> = color & colour'],
          ['<code>{2,4}</code>', 'between 2 and 4 of it', '<code>\\d{4}</code> = exactly 4 digits'],
          ['<code>[abc]</code> <code>[^abc]</code>', 'any of / none of', '<code>[aeiou]</code> = a vowel'],
          ['<code>^</code> <code>$</code>', 'start / end of text', '<code>^\\d+$</code> = ONLY digits'],
          ['<code>(…)</code>', 'capture group — extract this part', '<code>(\\d+)-(\\d+)</code>'],
          ['<code>|</code>', 'or', '<code>cat|dog</code>']
        ] },
        { t: 'code', lang: 'js', code: '// reading a real one, symbol by symbol:\nconst time = /^(\\d{1,2}):(\\d{2})$/;\n// ^ start, 1-2 digits (captured), a colon, exactly 2 digits (captured), end $\n\nconst m = "9:45".match(time);\nconsole.log(m[1], m[2]);   // "9"  "45" - the captured groups' },
        { t: 'warn', html: 'Regex famous failure mode: trying to parse complex nested things (like full HTML) with it — patterns can\'t count nesting. Rule of thumb: regex for FLAT patterns (codes, dates, tokens); real parsers for nested structure. And comment any regex longer than your thumb — future-you deserves it.' },
        { t: 'tip', html: 'regex101.com explains any pattern piece by piece as you type — the best regex teacher ever built. (And yes, regex is in the Encyclopedia: born 1968!)' }
      ],
      tryIt: {
        mode: 'js',
        code: 'const log = `\n[2026-08-13 09:12] INFO  server started on port 8742\n[2026-08-13 09:15] ERROR database timeout after 3000ms\n[2026-08-13 09:16] INFO  retry succeeded\n[2026-08-13 09:41] ERROR disk 87% full\n`;\n\n// pull every ERROR line:\nconst errors = log.match(/ERROR.*/g);\nconsole.log("Errors:", errors);\n\n// extract every timestamp\'s time part:\nconst times = log.match(/\\d{2}:\\d{2}/g);\nconsole.log("Times:", times);\n\n// capture groups: pull the numbers WITH their units\nfor (const m of log.matchAll(/(\\d+)(ms|%)/g)) {\n  console.log(`value ${m[1]}, unit ${m[2]}`);\n}\n\n// Your turn: extract the port number, and count INFO lines.'
      },
      quiz: [
        { q: 'What does <code>/^\\d{3}$/</code> match?', options: ['Any text containing 3 digits', 'Text that is EXACTLY three digits, nothing else', 'Three of any character', 'The string "\\d{3}"'], a: 1, why: '^ and $ anchor both ends: nothing before, three digits, nothing after.' },
        { q: 'The g flag makes match()…', options: ['Case-insensitive', 'Return ALL matches instead of just the first', 'Faster', 'Global variables'], a: 1, why: 'g = global. Without it you get only the first hit (plus its groups).' },
        { q: 'Regex is the wrong tool for…', options: ['Validating a postal code', 'Parsing arbitrarily nested HTML', 'Extracting dates from logs', 'Find-and-replace'], a: 1, why: 'Patterns can\'t count nesting depth — that needs a real parser. Flat patterns are regex\'s home.' }
      ],
      challenge: {
        text: 'Write <code>validPhone(s)</code> using one regex: accepts "555-0123", "(555) 010-4477" and "5550123", rejects letters and wrong lengths. Then a bonus one-liner: censor all digits in a string with "#".',
        hints: ['Strategy: strip non-digits first (replace(/\\D/g, "")), then test /^\\d{7}$|^\\d{10}$/.'],
        solution: { lang: 'js', code: 'function validPhone(s) {\n  const digits = s.replace(/\\D/g, "");     // \\D = NOT a digit\n  return /^(\\d{7}|\\d{10})$/.test(digits);\n}\n\nconsole.log(validPhone("555-0123"));        // true\nconsole.log(validPhone("(555) 010-4477"));  // true\nconsole.log(validPhone("call me"));         // false\n\nconsole.log("PIN 4321 to 9 Oak Rd".replace(/\\d/g, "#"));' }
      }
    }
  ]
};
