/* ============================================================
   Python track — lesson data
   ============================================================ */
window.CT_TRACKS = window.CT_TRACKS || {};

window.CT_TRACKS.python = {
  id: 'python',
  name: 'Python',
  icon: 'Py',
  area: 'python',
  tagline: 'The friendly all-rounder — science, AI, automation, everything.',
  blurb: 'Python is famous for reading almost like English, which makes it a wonderful first (or fifth) language. It powers data science, AI and machine learning, web servers, automation scripts, and more. In this track it runs right in your browser.',
  uses: ['Data science & analysis', 'AI & machine learning', 'Automation & scripting', 'Web servers (Django, Flask)', 'Scientific computing', 'Games & graphics (Pygame)', 'Robotics & hardware'],
  lessons: [

    /* ---------- BEGINNER ---------- */
    {
      id: 'py-1', title: 'Hello, Python', level: 0, minutes: 8,
      blocks: [
        { t: 'p', html: 'Python\'s pitch is simplicity: less punctuation, fewer brackets, code that reads like a sentence. Printing is just:' },
        { t: 'code', lang: 'python', code: 'print("Hello, world!")\nprint("2 + 2 is", 2 + 2)' },
        { t: 'p', html: 'No semicolons, no curly braces. Text (strings) goes in quotes; numbers stay bare; <code>#</code> starts a comment:' },
        { t: 'code', lang: 'python', code: '# This is a comment - Python ignores it\nprint("Python is", 34, "years old")   # you can print several things' },
        { t: 'p', html: 'Where JavaScript lives inside web pages, Python normally lives in <code>.py</code> files you run from a terminal (<code>python myfile.py</code>) — on servers, laptops, robots, Raspberry Pis. Here, a little magic (a browser build of Python called Pyodide) lets you run it inside this page.' },
        { t: 'tip', html: 'To run Python on your own computer later: install it free from <b>python.org</b>, save code in a file ending in <code>.py</code>, and run it from the terminal. The code you write here works there unchanged.' }
      ],
      tryIt: {
        mode: 'python',
        code: 'print("Hello, world!")\nprint("2 + 2 is", 2 + 2)\n\n# Add a line that prints your name!',
        expected: 'Hello, world!\n2 + 2 is 4'
      },
      quiz: [
        { q: 'How does Python print text?', options: ['<code>console.log("hi")</code>', '<code>print("hi")</code>', '<code>echo "hi"</code>', '<code>System.out.println("hi")</code>'], a: 1, why: 'print() is Python\'s output function. (The others are JavaScript, shell, and Java.)' },
        { q: 'What starts a comment in Python?', options: ['<code>//</code>', '<code>&lt;!--</code>', '<code>#</code>', '<code>/*</code>'], a: 2, why: 'Everything after # on a line is ignored.' },
        { q: 'Which is true about Python syntax?', options: ['Every line ends with a semicolon', 'Code blocks use curly braces', 'It needs no semicolons or braces', 'All variables need $'], a: 2, why: 'Python uses newlines to end statements and indentation for blocks — minimal punctuation.' }
      ],
      challenge: {
        text: 'Print a 3-line introduction: your name, your hometown, and a sum Python calculates for you (like the year you were born + your age).',
        hints: ['Three print() calls — or experiment with commas inside one.'],
        solution: { lang: 'python', code: 'print("Hi, I\'m Sam!")\nprint("I live in Springfield")\nprint("Born in", 2026 - 25)' }
      }
    },

    {
      id: 'py-2', title: 'Variables & types', level: 0, minutes: 10,
      blocks: [
        { t: 'p', html: 'Variables in Python need no keyword at all — name, equals, value:' },
        { t: 'code', lang: 'python', code: 'name = "Sam"\nage = 25\nheight = 1.75\nlikes_pizza = True\n\nage = age + 1   # variables can change\nprint(name, age, height, likes_pizza)' },
        { t: 'p', html: 'The core types:' },
        { t: 'table', head: ['Type', 'Name', 'Examples'], rows: [
          ['Integer', '<code>int</code>', '<code>42</code>, <code>-7</code>'],
          ['Decimal', '<code>float</code>', '<code>3.14</code>, <code>-0.5</code>'],
          ['Text', '<code>str</code>', '<code>"hello"</code>, <code>\'hi\'</code>'],
          ['True/False', '<code>bool</code>', '<code>True</code>, <code>False</code> (capitalized!)'],
          ['Nothing', '<code>NoneType</code>', '<code>None</code>']
        ] },
        { t: 'p', html: '<code>type()</code> tells you what something is, and conversion functions switch between types:' },
        { t: 'code', lang: 'python', code: 'print(type(42))          # <class \'int\'>\nprint(int("7") + 1)      # 8   - string to number\nprint(str(7) + "!")      # 7!  - number to string\nprint(float("2.5") * 2)  # 5.0' },
        { t: 'warn', html: 'Unlike JavaScript, Python refuses to mix types silently: <code>"7" + 1</code> is an <b>error</b>, not "71". Annoying for 10 seconds, bug-preventing forever.' },
        { t: 'p', html: 'Naming convention: Python uses <code>snake_case</code> (words_with_underscores) where JavaScript uses camelCase. Both work; matching the convention keeps your code looking native.' }
      ],
      tryIt: {
        mode: 'python',
        code: 'coins = 12\ncoins = coins + 5\n\nname = "Sam"\nprint(name, "has", coins, "coins")\n\nprint(type(coins))\nprint(int("100") + coins)\n\n# What happens if you try:  print("7" + 1)  ?\n# Try it and read the error - then fix it with str() or int().',
        expected: 'Sam has 17 coins\n<class \'int\'>\n117'
      },
      quiz: [
        { q: 'How do you create a variable in Python?', options: ['<code>let x = 5</code>', '<code>var x = 5</code>', '<code>x = 5</code>', '<code>int x = 5</code>'], a: 2, why: 'No declaration keyword — just assign.' },
        { q: 'What is <code>"7" + 1</code> in Python?', options: ['<code>"71"</code>', '<code>8</code>', 'An error', '<code>71</code>'], a: 2, why: 'Python won\'t silently mix strings and numbers — convert first with int() or str().' },
        { q: 'Python\'s True and False must be written…', options: ['lowercase', 'Capitalized', 'in quotes', 'as 1 and 0'], a: 1, why: '<code>True</code> and <code>False</code> — capital first letter, unlike JS.' }
      ],
      challenge: {
        text: 'A shop sells stickers at 0.75 each. Create variables for the price and a quantity of 8, compute the total, and print it along with its type. Then print the total converted to a string with " dollars" glued on.',
        hints: ['Gluing needs matching types: <code>str(total) + " dollars"</code>.'],
        solution: { lang: 'python', code: 'price = 0.75\nquantity = 8\n\ntotal = price * quantity\nprint(total)\nprint(type(total))\nprint(str(total) + " dollars")' }
      }
    },

    {
      id: 'py-3', title: 'Strings & f-strings', level: 0, minutes: 10,
      blocks: [
        { t: 'p', html: 'Python treats text as a first-class citizen. The star of the show is the <b>f-string</b> — put an <code>f</code> before the quotes and use <code>{ }</code> slots for live values:' },
        { t: 'code', lang: 'python', code: 'name = "Sam"\nscore = 97.5\n\nprint(f"{name} scored {score} points!")\nprint(f"Half of that is {score / 2}")      # slots run real code\nprint(f"Rounded: {score:.0f}")             # formatting: no decimals' },
        { t: 'p', html: 'Strings come with a rich set of built-in methods:' },
        { t: 'code', lang: 'python', code: 's = "  Hello, Python!  "\n\nprint(s.strip())        # trim spaces from the ends\nprint(s.lower())        # lowercase\nprint(s.upper())        # UPPERCASE\nprint(s.replace("Python", "world"))\nprint("2026-08-13".split("-"))   # chop into a list' },
        { t: 'p', html: 'Useful string facts:' },
        { t: 'ul', items: [
          '<code>len(s)</code> — length in characters.',
          '<code>"py" in s</code> — substring test, returns True/False.',
          '<code>s[0]</code> — first character; <code>s[-1]</code> — last (negative counts from the end!).',
          '<code>s[0:5]</code> — a slice: characters 0 up to (not including) 5.',
          'Strings can\'t be edited in place — methods return <i>new</i> strings.'
        ] }
      ],
      tryIt: {
        mode: 'python',
        code: 'quote = "talk is cheap, show me the code"\n\nprint(quote.upper())\nprint(f"That quote has {len(quote)} characters")\nprint(f"First word: {quote[0:4]}")\nprint(f"Last character: {quote[-1]}")\nprint("code" in quote)\n\n# Make a variable with YOUR favorite quote and\n# print it in Title Case (hint: .title())',
        expected: 'TALK IS CHEAP, SHOW ME THE CODE\nThat quote has 31 characters\nFirst word: talk\nLast character: e\nTrue'
      },
      quiz: [
        { q: 'What does <code>f"I am {age}"</code> do when age is 30?', options: ['Prints the letters {age}', 'Produces "I am 30"', 'Causes an error', 'Produces "I am age"'], a: 1, why: 'f-strings evaluate whatever is inside the braces and insert the result.' },
        { q: 'What is <code>"python"[-1]</code>?', options: ['<code>"p"</code>', 'An error', '<code>"n"</code>', '<code>"o"</code>'], a: 2, why: 'Negative indexes count from the end: -1 is the last character.' },
        { q: '<code>s.upper()</code> …', options: ['Changes s permanently', 'Returns a new uppercase string, s unchanged', 'Only works on letters a-m', 'Sorts the string'], a: 1, why: 'Strings are immutable — methods hand back a modified copy.' }
      ],
      challenge: {
        text: 'Make a username generator: given <code>first = "Grace"</code> and <code>last = "Hopper"</code>, print a username that\'s the first letter of the first name + the last name, all lowercase, plus the length of the full name (like "ghopper11").',
        hints: ['First letter: <code>first[0]</code>. Full name length: <code>len(first + last)</code>.'],
        solution: { lang: 'python', code: 'first = "Grace"\nlast = "Hopper"\n\nusername = (first[0] + last).lower() + str(len(first + last))\nprint(username)   # ghopper11' }
      }
    },

    {
      id: 'py-4', title: 'Making decisions: if / elif / else', level: 0, minutes: 12,
      blocks: [
        { t: 'p', html: 'Python\'s big syntactic idea appears here: <b>indentation is the syntax</b>. No braces — a colon ends the condition line, and everything indented below it belongs to that branch:' },
        { t: 'code', lang: 'python', code: 'temperature = 3\n\nif temperature < 0:\n    print("Ice warning!")\n    print("Wear spikes")        # same indent = same block\nelif temperature < 15:\n    print("Jacket weather")\nelse:\n    print("Nice out!")' },
        { t: 'ul', items: [
          'The colon <code>:</code> at the end of the if/elif/else line is required.',
          'Indent with <b>4 spaces</b> (the universal Python convention). Mixing tabs and spaces is an error.',
          '<code>elif</code> is Python\'s "else if". First true branch wins.'
        ] },
        { t: 'p', html: 'Comparisons look familiar — with friendlier logic words:' },
        { t: 'code', lang: 'python', code: 'age = 15\nhas_ticket = True\n\nprint(age >= 13 and age <= 19)   # and, or, not - actual words\nprint(not has_ticket)\nprint(13 <= age <= 19)           # chained comparison - Python exclusive!' },
        { t: 'p', html: 'Note: Python uses <code>==</code> for equality (one <code>=</code> is assignment). There\'s no <code>===</code> — Python\'s <code>==</code> is already well-behaved because types don\'t auto-convert.' }
      ],
      tryIt: {
        mode: 'python',
        code: 'score = 87\n\nif score >= 90:\n    print("Grade: A")\nelif score >= 80:\n    print("Grade: B")\nelif score >= 70:\n    print("Grade: C")\nelse:\n    print("Grade: needs pizza and a retry")\n\n# Change the score. Then add an A+ for 97 and up -\n# where in the chain must it go?',
        expected: 'Grade: B'
      },
      quiz: [
        { q: 'What marks a block of code in Python?', options: ['Curly braces { }', 'Parentheses ( )', 'Indentation', 'The word "end"'], a: 2, why: 'Indentation isn\'t style in Python — it IS the structure.' },
        { q: 'Python\'s "else if" is spelled…', options: ['<code>else if</code>', '<code>elif</code>', '<code>elseif</code>', '<code>ef</code>'], a: 1, why: 'elif — one word, no space.' },
        { q: 'Which is valid Python logic?', options: ['<code>a && b</code>', '<code>a and b</code>', '<code>a AND b</code>', '<code>a &amp; b</code> only'], a: 1, why: 'Python uses the lowercase words and, or, not.' }
      ],
      challenge: {
        text: 'Write a password checker: given a <code>password</code> variable, print "too short" under 8 characters, "add a number" if it has no digits (hint: <code>any(c.isdigit() for c in password)</code>), otherwise "looks good!".',
        hints: ['Check length first, then the digit rule.', '<code>len(password) < 8</code> for the first test.'],
        solution: { lang: 'python', code: 'password = "waffles2026"\n\nif len(password) < 8:\n    print("too short")\nelif not any(c.isdigit() for c in password):\n    print("add a number")\nelse:\n    print("looks good!")' }
      }
    },

    {
      id: 'py-5', title: 'Loops & range', level: 0, minutes: 12,
      blocks: [
        { t: 'p', html: 'Python\'s <code>for</code> loop walks through a sequence — and for counting, that sequence comes from <code>range()</code>:' },
        { t: 'code', lang: 'python', code: 'for i in range(5):\n    print("Lap", i)        # 0, 1, 2, 3, 4  - starts at 0, stops BEFORE 5\n\nfor i in range(1, 6):\n    print("Round", i)      # 1 to 5\n\nfor i in range(10, 0, -2):\n    print(i)               # 10, 8, 6, 4, 2 - third value is the step' },
        { t: 'p', html: 'But <code>for</code> loops over anything — the characters of a string, items of a list, lines of a file:' },
        { t: 'code', lang: 'python', code: 'for letter in "abc":\n    print(letter.upper())' },
        { t: 'p', html: '<code>while</code> repeats until a condition changes, same as everywhere:' },
        { t: 'code', lang: 'python', code: 'fuel = 100\nwhile fuel > 0:\n    fuel -= 23\n    print("Vroom! Fuel left:", fuel)' },
        { t: 'p', html: '<code>break</code> exits a loop early, <code>continue</code> skips to the next round. And uniquely, loops pair beautifully with accumulating a result:' },
        { t: 'code', lang: 'python', code: 'total = 0\nfor n in range(1, 101):\n    total += n\nprint("1+2+...+100 =", total)   # 5050' }
      ],
      tryIt: {
        mode: 'python',
        code: '# Countdown launcher\nfor i in range(5, 0, -1):\n    print(f"{i}...")\nprint("LIFTOFF! 🚀")\n\n# Try: print the 7 times table (7, 14, ... 70)\n# with a loop, using f-strings like "7 x 3 = 21"',
        expected: '5...\n4...\n3...\n2...\n1...\nLIFTOFF! 🚀'
      },
      quiz: [
        { q: 'What numbers does <code>range(3)</code> produce?', options: ['1, 2, 3', '0, 1, 2', '0, 1, 2, 3', '3'], a: 1, why: 'range starts at 0 and stops before the end value.' },
        { q: 'What does <code>range(2, 10, 3)</code> produce?', options: ['2, 5, 8', '2, 3, 10', '3, 6, 9', '2 through 10'], a: 0, why: 'Start 2, stop before 10, step 3 → 2, 5, 8.' },
        { q: 'Which loops over the letters of a word?', options: ['<code>for letter of word:</code>', '<code>for letter in word:</code>', '<code>foreach word</code>', '<code>loop word</code>'], a: 1, why: 'Python\'s for..in iterates any sequence, strings included.' }
      ],
      challenge: {
        text: '<b>FizzBuzz, Python edition:</b> loop 1 to 30; multiples of 3 print "Fizz", of 5 "Buzz", of both "FizzBuzz", otherwise the number.',
        hints: ['Both = <code>i % 15 == 0</code> — test it first!', '<code>range(1, 31)</code> to reach 30.'],
        solution: { lang: 'python', code: 'for i in range(1, 31):\n    if i % 15 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)' }
      }
    },

    /* ---------- INTERMEDIATE ---------- */
    {
      id: 'py-6', title: 'Lists', level: 1, minutes: 14,
      blocks: [
        { t: 'p', html: 'Python\'s list is the same idea as JavaScript\'s array — an ordered, changeable collection:' },
        { t: 'code', lang: 'python', code: 'foods = ["pizza", "tacos", "sushi"]\n\nprint(foods[0])        # pizza\nprint(len(foods))      # 3\nprint(foods[-1])       # sushi - negative = from the end\n\nfoods.append("ramen")     # add to the end\nfoods.remove("tacos")     # remove by value\nprint(foods)' },
        { t: 'p', html: 'The essentials:' },
        { t: 'table', head: ['Operation', 'Effect'], rows: [
          ['<code>lst.append(x)</code>', 'add to the end'],
          ['<code>lst.insert(0, x)</code>', 'add at a position'],
          ['<code>lst.pop()</code>', 'remove & return the last item'],
          ['<code>lst.sort()</code>', 'sort in place'],
          ['<code>sorted(lst)</code>', 'sorted copy, original untouched'],
          ['<code>x in lst</code>', 'membership test'],
          ['<code>lst[1:3]</code>', 'slice — items 1 and 2'],
          ['<code>sum(lst)</code> / <code>max(lst)</code> / <code>min(lst)</code>', 'instant math on number lists']
        ] },
        { t: 'p', html: 'And the beloved Python party trick — the <b>list comprehension</b>, a loop and a transform in one readable line:' },
        { t: 'code', lang: 'python', code: 'nums = [3, 7, 12, 5, 20]\n\ndoubled = [n * 2 for n in nums]\nbig = [n for n in nums if n > 6]\n\nprint(doubled)   # [6, 14, 24, 10, 40]\nprint(big)       # [7, 12, 20]' },
        { t: 'tip', html: 'Read a comprehension right-to-left: "for each n in nums (if n &gt; 6), keep n". It\'s Python\'s equivalent of JavaScript\'s map + filter.' }
      ],
      tryIt: {
        mode: 'python',
        code: 'scores = [88, 42, 95, 73, 60, 99]\n\npassing = [s for s in scores if s >= 70]\ncurved = [min(100, s + 5) for s in scores]\n\nprint("Passing:", passing)\nprint("Curved:", curved)\nprint("Average:", sum(scores) / len(scores))\nprint("Top score:", max(scores))\n\n# Sort the scores from highest to lowest\n# (hint: sorted(scores, reverse=True))',
        expected: 'Passing: [88, 95, 73, 99]\nCurved: [93, 47, 100, 78, 65, 100]\nAverage: 76.16666666666667\nTop score: 99'
      },
      quiz: [
        { q: 'How do you add "kiwi" to the end of a list called fruits?', options: ['<code>fruits.push("kiwi")</code>', '<code>fruits.append("kiwi")</code>', '<code>fruits.add("kiwi")</code>', '<code>fruits + "kiwi"</code>'], a: 1, why: 'append() is Python\'s "add to the end". (push is JavaScript.)' },
        { q: 'What is <code>[n * n for n in range(4)]</code>?', options: ['<code>[1, 4, 9, 16]</code>', '<code>[0, 1, 4, 9]</code>', '<code>[0, 1, 2, 3]</code>', 'An error'], a: 1, why: 'range(4) is 0-3, each squared: 0, 1, 4, 9.' },
        { q: '<code>sorted(lst)</code> vs <code>lst.sort()</code>:', options: ['Identical', 'sorted returns a new list; .sort() changes the original', '.sort() is faster only', 'sorted only works on numbers'], a: 1, why: 'Choose based on whether you want to keep the original order around.' }
      ],
      challenge: {
        text: 'Given <code>temps = [21, 25, 19, 30, 28, 17, 24]</code> (a week in °C): print the hottest and coldest days, the average rounded to 1 decimal, and a comprehension listing only the "beach days" (over 24).',
        hints: ['Round with <code>round(x, 1)</code>.'],
        solution: { lang: 'python', code: 'temps = [21, 25, 19, 30, 28, 17, 24]\n\nprint("Hottest:", max(temps))\nprint("Coldest:", min(temps))\nprint("Average:", round(sum(temps) / len(temps), 1))\nprint("Beach days:", [t for t in temps if t > 24])' }
      }
    },

    {
      id: 'py-7', title: 'Dictionaries', level: 1, minutes: 14,
      blocks: [
        { t: 'p', html: 'A <b>dictionary</b> (dict) stores labeled values — Python\'s version of the JavaScript object, and one of its most-used tools:' },
        { t: 'code', lang: 'python', code: 'player = {\n    "name": "Sam",\n    "level": 12,\n    "hp": 80,\n}\n\nprint(player["name"])          # read by key\nplayer["hp"] -= 25             # change\nplayer["guild"] = "Waffle Knights"   # add\nprint(player)' },
        { t: 'p', html: 'Note the quoted keys — that\'s the visible difference from JavaScript objects. Missing keys raise an error, so Python offers safe lookups:' },
        { t: 'code', lang: 'python', code: 'print(player.get("pet"))            # None instead of crash\nprint(player.get("pet", "no pet"))  # or a default\nprint("hp" in player)               # True - key test' },
        { t: 'p', html: 'Looping over dicts:' },
        { t: 'code', lang: 'python', code: 'for key in player:\n    print(key, "=>", player[key])\n\nfor key, value in player.items():   # both at once - the usual way\n    print(f"{key}: {value}")' },
        { t: 'p', html: 'Dicts are perfect counters and lookups — and just like in JavaScript, real data is usually <b>lists of dicts</b>:' },
        { t: 'code', lang: 'python', code: 'menu = [\n    {"name": "Pancakes", "price": 5},\n    {"name": "Fruit bowl", "price": 6},\n    {"name": "Waffles", "price": 7},\n]\n\ncheap = [item["name"] for item in menu if item["price"] < 7]\nprint(cheap)' }
      ],
      tryIt: {
        mode: 'python',
        code: '# A dict as a counter - a classic pattern\nvotes = ["pizza", "tacos", "pizza", "sushi", "pizza", "tacos"]\n\ncounts = {}\nfor food in votes:\n    counts[food] = counts.get(food, 0) + 1\n\nprint(counts)\n\nfor food, n in counts.items():\n    print(f"{food}: {\'★\' * n}")\n\n# Which food won? (hint: max(counts, key=counts.get))',
        expected: "{'pizza': 3, 'tacos': 2, 'sushi': 1}\npizza: ★★★\ntacos: ★★\nsushi: ★"
      },
      quiz: [
        { q: 'How do you read the "age" value from dict <code>d</code>?', options: ['<code>d.age</code>', '<code>d["age"]</code>', '<code>d(age)</code>', '<code>age in d</code>'], a: 1, why: 'Square brackets with the key. (Dot access is JavaScript; in Python dots are for methods.)' },
        { q: 'What does <code>d.get("x", 0)</code> return if "x" is missing?', options: ['An error', '<code>None</code>', '<code>0</code>', '<code>"x"</code>'], a: 2, why: 'get with a default returns the default instead of raising an error.' },
        { q: 'Which loops over keys AND values together?', options: ['<code>for k in d:</code>', '<code>for k, v in d.items():</code>', '<code>for v in d.values():</code>', '<code>for k, v in d:</code>'], a: 1, why: '.items() yields (key, value) pairs to unpack.' }
      ],
      challenge: {
        text: 'Build a mini phone book dict with 3 people. Print one number, add a fourth person, safely look up someone who ISN\'T in it (no crash!), and print everyone line by line.',
        hints: ['Safe lookup: <code>book.get("Zed", "not found")</code>.'],
        solution: { lang: 'python', code: 'book = {\n    "Ada": "555-0101",\n    "Sam": "555-0102",\n    "Kim": "555-0103",\n}\n\nprint(book["Ada"])\nbook["Max"] = "555-0104"\nprint(book.get("Zed", "not found"))\n\nfor name, number in book.items():\n    print(f"{name}: {number}")' }
      }
    },

    {
      id: 'py-8', title: 'Functions', level: 1, minutes: 14,
      blocks: [
        { t: 'p', html: 'Functions in Python start with <code>def</code>, and the body is indented (of course):' },
        { t: 'code', lang: 'python', code: 'def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Sam"))\nprint(greet("Ada"))' },
        { t: 'p', html: 'Parameters can have <b>default values</b>, and callers can name their arguments — which makes calls self-documenting:' },
        { t: 'code', lang: 'python', code: 'def make_coffee(size="medium", sugar=0, to_go=False):\n    cup = f"{size} coffee, {sugar} sugar"\n    if to_go:\n        cup += ", to go"\n    return cup\n\nprint(make_coffee())\nprint(make_coffee("large", sugar=2))\nprint(make_coffee(to_go=True))' },
        { t: 'p', html: 'Functions can return multiple values at once (secretly a tuple), which callers unpack:' },
        { t: 'code', lang: 'python', code: 'def min_max(numbers):\n    return min(numbers), max(numbers)\n\nlow, high = min_max([3, 41, 7, 19])\nprint(low, high)   # 3 41' },
        { t: 'p', html: 'A docstring — a string right under the def line — documents what the function does. Editors and <code>help()</code> display it:' },
        { t: 'code', lang: 'python', code: 'def area_of_circle(radius):\n    """Return the area of a circle with the given radius."""\n    return 3.14159 * radius ** 2' },
        { t: 'tip', html: 'The same golden rule as JavaScript: one function, one job, named after that job. <code>snake_case</code> for function names.' }
      ],
      tryIt: {
        mode: 'python',
        code: 'def convert_temp(celsius):\n    """Return a friendly Fahrenheit conversion string."""\n    f = celsius * 9 / 5 + 32\n    return f"{celsius}°C is {f}°F"\n\ndef tip(bill, percent=15):\n    return round(bill * percent / 100, 2)\n\nprint(convert_temp(20))\nprint(convert_temp(-10))\nprint("Tip on $60:", tip(60))\nprint("Generous tip:", tip(60, percent=25))\n\n# Write is_even(n) returning True/False and test it.',
        expected: '20°C is 68.0°F\n-10°C is 14.0°F\nTip on $60: 9.0\nGenerous tip: 15.0'
      },
      quiz: [
        { q: 'Which keyword defines a function?', options: ['<code>function</code>', '<code>def</code>', '<code>fn</code>', '<code>lambda</code> only'], a: 1, why: 'def name(parameters): then an indented body.' },
        { q: 'What does <code>def f(x, y=10):</code> mean?', options: ['y must be 10', 'y is optional and defaults to 10', 'x defaults to 10', 'Invalid syntax'], a: 1, why: 'Callers may omit y: f(5) uses 10, f(5, 2) overrides it.' },
        { q: '<code>a, b = get_pair()</code> works when get_pair…', options: ['Prints two values', 'Returns two values', 'Has two parameters', 'Is called twice'], a: 1, why: 'Returning multiple values (a tuple) lets the caller unpack them into variables.' }
      ],
      challenge: {
        text: 'Write <code>describe_list(numbers)</code> that returns three values: the total, the average, and a "grade" string ("high" if the average is over 50, otherwise "low"). Unpack and print all three.',
        hints: ['<code>return total, avg, grade</code> — commas make the multi-return.'],
        solution: { lang: 'python', code: 'def describe_list(numbers):\n    total = sum(numbers)\n    avg = total / len(numbers)\n    grade = "high" if avg > 50 else "low"\n    return total, avg, grade\n\nt, a, g = describe_list([80, 90, 45, 70])\nprint(f"total={t}, average={a:.1f}, grade={g}")' }
      }
    },

    {
      id: 'py-9', title: 'Modules & the standard library', level: 1, minutes: 12,
      blocks: [
        { t: 'p', html: 'Python ships with "batteries included" — a huge standard library of ready-made modules. You pull one in with <code>import</code>:' },
        { t: 'code', lang: 'python', code: 'import math\nimport random\n\nprint(math.sqrt(144))          # 12.0\nprint(math.pi)                 # 3.14159...\nprint(random.randint(1, 6))    # a dice roll\nprint(random.choice(["red", "green", "blue"]))' },
        { t: 'p', html: 'Modules worth knowing on day one:' },
        { t: 'table', head: ['Module', 'Gives you'], rows: [
          ['<code>math</code>', 'sqrt, floor, ceil, pi, trig'],
          ['<code>random</code>', 'randint, choice, shuffle, random'],
          ['<code>datetime</code>', 'dates, times, date math'],
          ['<code>json</code>', 'read/write JSON data'],
          ['<code>re</code>', 'regular expressions (pattern matching)'],
          ['<code>collections</code>', 'Counter, defaultdict and friends']
        ] },
        { t: 'code', lang: 'python', code: 'from collections import Counter\n\nvotes = ["pizza", "tacos", "pizza", "sushi", "pizza"]\nprint(Counter(votes))                    # counts everything for you\nprint(Counter(votes).most_common(1))     # the winner' },
        { t: 'p', html: '<code>from module import thing</code> pulls one name in directly. Beyond the standard library, <b>pip</b> (Python\'s app store for code) installs community packages — <code>pip install requests</code> on your own machine gets you the famous HTTP library, and the same mechanism installs numpy, pandas, and the AI frameworks you\'ll meet in the AI track.' },
        { t: 'tip', html: 'The browser Python here (Pyodide) includes much of the standard library, and even numpy — so <code>import numpy</code> works in these editors when you\'re online. You\'ll use it in the AI &amp; Neural Nets track!' }
      ],
      tryIt: {
        mode: 'python',
        code: 'import random\nimport math\n\n# Dice duel!\nyou = random.randint(1, 6) + random.randint(1, 6)\nrival = random.randint(1, 6) + random.randint(1, 6)\n\nprint(f"You rolled {you}, rival rolled {rival}")\nif you > rival:\n    print("You win! 🎉")\nelif you < rival:\n    print("Rival wins 😤")\nelse:\n    print("A tie!")\n\nprint("Bonus math:", math.floor(7.9), math.ceil(7.1))',
        expected: '(random results — e.g.)\nYou rolled 9, rival rolled 6\nYou win! 🎉\nBonus math: 7 8'
      },
      quiz: [
        { q: 'How do you use the square root function from the math module?', options: ['<code>sqrt(9)</code> directly', '<code>import math</code> then <code>math.sqrt(9)</code>', '<code>python.math.sqrt(9)</code>', '<code>#include math</code>'], a: 1, why: 'Import the module, then access its contents with the dot.' },
        { q: '<code>random.randint(1, 6)</code> can return…', options: ['1 through 5', '0 through 6', '1 through 6, inclusive', 'Only 1 or 6'], a: 2, why: 'Unusually for Python, randint includes BOTH ends.' },
        { q: 'What is pip?', options: ['A Python game', 'Python\'s installer for community packages', 'A type of loop', 'A code editor'], a: 1, why: 'pip install <package> fetches libraries from the Python Package Index (PyPI).' }
      ],
      challenge: {
        text: 'Build a password generator: use <code>random.choice</code> in a loop (or comprehension) to pick 12 random characters from a string of letters+digits+symbols, and print the result.',
        hints: ['A candidate pool: <code>chars = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789!@#$%"</code>', '<code>"".join(...)</code> glues a list of characters into a string.'],
        solution: { lang: 'python', code: 'import random\n\nchars = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ23456789!@#$%"\npassword = "".join(random.choice(chars) for _ in range(12))\nprint("Your password:", password)' }
      }
    },

    /* ---------- ADVANCED ---------- */
    {
      id: 'py-10', title: 'Classes & objects', level: 2, minutes: 16,
      blocks: [
        { t: 'p', html: 'A <b>class</b> is a blueprint for making objects that bundle data with the functions that work on that data. If you\'ve ever wanted "a thing that knows how to do stuff to itself" — that\'s a class:' },
        { t: 'code', lang: 'python', code: 'class Pet:\n    def __init__(self, name, species):\n        self.name = name          # each pet remembers its own data\n        self.species = species\n        self.hunger = 5\n\n    def feed(self):\n        self.hunger = max(0, self.hunger - 2)\n        print(f"{self.name} eats! Hunger: {self.hunger}")\n\n    def speak(self):\n        sound = "Meow" if self.species == "cat" else "Woof"\n        print(f"{self.name} says {sound}!")\n\nwaffles = Pet("Waffles", "cat")\nrex = Pet("Rex", "dog")\n\nwaffles.speak()\nrex.speak()\nwaffles.feed()' },
        { t: 'ul', items: [
          '<code>__init__</code> is the constructor — it runs when you create an object and sets up its starting data.',
          '<code>self</code> is "this particular object" — every method takes it as the first parameter, and Python fills it in automatically when you call <code>waffles.feed()</code>.',
          'Each object (<code>waffles</code>, <code>rex</code>) has its <i>own</i> copy of the data but shares the methods.'
        ] },
        { t: 'p', html: 'Classes can <b>inherit</b>: a subclass gets everything from its parent and can add or change behavior:' },
        { t: 'code', lang: 'python', code: 'class Robot(Pet):\n    def feed(self):\n        print(f"{self.name} charges its battery instead. 🔋")\n\nbeep = Robot("Beep", "robot")\nbeep.feed()      # the overridden version\nbeep.speak()     # inherited from Pet' },
        { t: 'tip', html: 'When to use a class: when data and behavior belong together and you\'ll make several of them (players, enemies, bank accounts, particles…). For one-off scripts, plain functions and dicts are perfectly good Python.' }
      ],
      tryIt: {
        mode: 'python',
        code: 'class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount):\n        self.balance += amount\n        print(f"{self.owner} deposits ${amount}. Balance: ${self.balance}")\n\n    def withdraw(self, amount):\n        if amount > self.balance:\n            print(f"{self.owner}: insufficient funds!")\n        else:\n            self.balance -= amount\n            print(f"{self.owner} withdraws ${amount}. Balance: ${self.balance}")\n\nacct = BankAccount("Sam", 100)\nacct.deposit(50)\nacct.withdraw(30)\nacct.withdraw(500)\n\n# Add an interest(percent) method that grows the balance!',
        expected: 'Sam deposits $50. Balance: $150\nSam withdraws $30. Balance: $120\nSam: insufficient funds!'
      },
      quiz: [
        { q: 'What is <code>__init__</code>?', options: ['A private method', 'The constructor that runs when an object is created', 'A loop', 'An import statement'], a: 1, why: 'It initializes each new object\'s starting state.' },
        { q: 'Inside a method, <code>self</code> means…', options: ['The class itself', 'The particular object the method was called on', 'The parent class', 'A keyword you can skip'], a: 1, why: 'self is how methods reach "their own" data: self.name, self.balance…' },
        { q: 'If <code>class Dog(Animal):</code>, then Dog…', options: ['Replaces Animal', 'Inherits Animal\'s methods and can override them', 'Can\'t have new methods', 'Is abstract'], a: 1, why: 'Inheritance: the child gets everything, and may add or redefine behavior.' }
      ],
      challenge: {
        text: 'Create a <code>Playlist</code> class: it starts empty, has <code>add(song)</code>, <code>total()</code> returning the song count, and <code>play()</code> printing each song numbered. Make one and use all three methods.',
        hints: ['Store songs in <code>self.songs = []</code> inside __init__.', 'Numbered printing: <code>for i, s in enumerate(self.songs, 1):</code>'],
        solution: { lang: 'python', code: 'class Playlist:\n    def __init__(self, name):\n        self.name = name\n        self.songs = []\n\n    def add(self, song):\n        self.songs.append(song)\n\n    def total(self):\n        return len(self.songs)\n\n    def play(self):\n        print(f"▶ Playing {self.name}:")\n        for i, s in enumerate(self.songs, 1):\n            print(f"  {i}. {s}")\n\np = Playlist("Coding beats")\np.add("Lo-fi loop")\np.add("Synthwave sunset")\np.play()\nprint("Songs:", p.total())' }
      }
    },

    {
      id: 'py-11', title: 'Errors & exceptions', level: 2, minutes: 12,
      blocks: [
        { t: 'p', html: 'When Python hits something impossible, it raises an <b>exception</b> and — unless you catch it — the program stops with a <b>traceback</b>. Learning to read tracebacks is a superpower: read them <b>bottom-up</b>. The last line names the error; the lines above show where it happened.' },
        { t: 'code', lang: 'python', code: 'Traceback (most recent call last):\n  File "shop.py", line 12, in <module>\n    total = price * int(quantity)\nValueError: invalid literal for int() with base 10: \'many\'' },
        { t: 'p', html: 'Translation: on line 12, <code>int("many")</code> failed because "many" isn\'t a number. The common ones:' },
        { t: 'table', head: ['Exception', 'Usual cause'], rows: [
          ['<code>NameError</code>', 'typo\'d or not-yet-created variable name'],
          ['<code>TypeError</code>', 'mixing incompatible types ("7" + 1)'],
          ['<code>ValueError</code>', 'right type, impossible value (int("hello"))'],
          ['<code>IndexError</code>', 'list index past the end'],
          ['<code>KeyError</code>', 'missing dictionary key'],
          ['<code>ZeroDivisionError</code>', 'dividing by zero'],
          ['<code>IndentationError</code>', 'inconsistent indenting']
        ] },
        { t: 'p', html: 'To handle errors gracefully instead of crashing, wrap risky code in <code>try/except</code>:' },
        { t: 'code', lang: 'python', code: 'user_input = "3.5"\n\ntry:\n    n = int(user_input)\n    print("Got the number", n)\nexcept ValueError:\n    print(f"\'{user_input}\' is not a whole number - using 0")\n    n = 0\n\nprint("Continuing with n =", n)' },
        { t: 'p', html: 'You can catch specific exceptions (best), several kinds, add <code>else</code> (runs if nothing failed) and <code>finally</code> (runs no matter what). You can also <code>raise</code> your own to signal "this input is unacceptable".' },
        { t: 'warn', html: 'Avoid a bare <code>except:</code> that swallows everything — it hides real bugs. Catch the specific error you expect.' }
      ],
      tryIt: {
        mode: 'python',
        code: 'inputs = ["12", "7", "banana", "0", "3"]\n\ntotal = 0\nfor raw in inputs:\n    try:\n        n = int(raw)\n        print(f"100 / {n} = {100 / n}")\n        total += n\n    except ValueError:\n        print(f"Skipping \'{raw}\' - not a number")\n    except ZeroDivisionError:\n        print("Cannot divide by zero - skipping")\n\nprint("Total of valid numbers:", total)',
        expected: '100 / 12 = 8.333333333333334\n100 / 7 = 14.285714285714286\nSkipping \'banana\' - not a number\nCannot divide by zero - skipping\n100 / 3 = 33.333333333333336\nTotal of valid numbers: 22'
      },
      quiz: [
        { q: 'Where in a traceback is the actual error name?', options: ['The first line', 'The last line', 'The middle', 'It\'s hidden'], a: 1, why: 'Read tracebacks bottom-up: last line = what went wrong, lines above = where.' },
        { q: '<code>int("3.9")</code> raises…', options: ['Nothing, returns 3', '<code>TypeError</code>', '<code>ValueError</code>', '<code>SyntaxError</code>'], a: 2, why: 'Right type (a string), unacceptable value — int() won\'t parse "3.9". (int(3.9) the float would work.)' },
        { q: 'The point of try/except is to…', options: ['Make errors impossible', 'Handle expected failures gracefully and keep running', 'Speed up code', 'Skip testing'], a: 1, why: 'You plan for the failure cases you can predict — bad input, missing files — and recover.' }
      ],
      challenge: {
        text: 'Write <code>safe_divide(a, b)</code> that returns a/b, but returns the string "undefined" on division by zero and re-raises anything else. Test it with (10, 2), (5, 0), and (10, "x") — the last should crash with a TypeError.',
        hints: ['<code>except ZeroDivisionError:</code> handles just that one case; anything else propagates naturally if you don\'t catch it.'],
        solution: { lang: 'python', code: 'def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "undefined"\n\nprint(safe_divide(10, 2))    # 5.0\nprint(safe_divide(5, 0))     # undefined\nprint(safe_divide(10, "x"))  # TypeError - and that\'s correct!' }
      }
    },

    {
      id: 'py-12', title: 'Python in the real world', level: 2, minutes: 14,
      blocks: [
        { t: 'p', html: 'You now know enough Python to understand where it actually gets used — and what to type to follow each path:' },
        { t: 'table', head: ['Field', 'The famous tools', 'What it looks like'], rows: [
          ['Data science', '<code>pandas</code>, <code>numpy</code>, <code>matplotlib</code>', 'load a spreadsheet, analyze it, chart it — in 10 lines'],
          ['AI & machine learning', '<code>pytorch</code>, <code>tensorflow</code>, <code>scikit-learn</code>', 'train models — see this site\'s AI track!'],
          ['Web servers', '<code>flask</code>, <code>django</code>, <code>fastapi</code>', 'the code behind Instagram, Spotify, Reddit'],
          ['Automation', 'the standard library', 'rename 1000 files, scrape a site, send reports'],
          ['Games', '<code>pygame</code>', '2D games with sprites and sound']
        ] },
        { t: 'p', html: 'A taste of real-world flavor — reading and writing <b>files</b>, the bread and butter of automation (this runs here because Pyodide gives Python a small virtual disk):' },
        { t: 'code', lang: 'python', code: '# Writing a file\nwith open("notes.txt", "w") as f:\n    f.write("Remember: practice beats theory.\\n")\n    f.write("Also: buy waffles.\\n")\n\n# Reading it back\nwith open("notes.txt") as f:\n    for line in f:\n        print("->", line.strip())' },
        { t: 'p', html: 'The <code>with</code> statement opens the file and guarantees it closes, even if something fails inside. And JSON — the data format you met in JavaScript — is one import away:' },
        { t: 'code', lang: 'python', code: 'import json\n\ndata = {"name": "Sam", "scores": [88, 95]}\ntext = json.dumps(data)        # dict -> JSON text\nprint(text)\nback = json.loads(text)        # JSON text -> dict\nprint(back["scores"][1])' },
        { t: 'tip', html: 'Your path from here: finish the Python projects in the Projects section, then head to the <b>AI &amp; Neural Nets track</b> — you\'ll build a real neural network with the Python you just learned. On your own machine, install Python from python.org and try automating something tiny that annoys you. That\'s how everyone starts.' }
      ],
      tryIt: {
        mode: 'python',
        code: 'import json\n\n# A mini "data pipeline": raw data -> analysis -> report file\nsales = [\n    {"product": "Waffle iron", "units": 31, "price": 49.99},\n    {"product": "Syrup (1L)", "units": 118, "price": 8.50},\n    {"product": "Chef hat", "units": 5, "price": 15.00},\n]\n\ntotal = sum(item["units"] * item["price"] for item in sales)\nbest = max(sales, key=lambda item: item["units"] * item["price"])\n\nreport = {\n    "total_revenue": round(total, 2),\n    "best_seller": best["product"],\n}\n\nwith open("report.json", "w") as f:\n    f.write(json.dumps(report, indent=2))\n\nwith open("report.json") as f:\n    print(f.read())',
        expected: '{\n  "total_revenue": 2627.69,\n  "best_seller": "Waffle iron"\n}'
      },
      quiz: [
        { q: 'Why use <code>with open(...) as f:</code> instead of plain open()?', options: ['It\'s faster', 'The file is guaranteed to close, even on errors', 'It creates the file', 'It\'s required syntax'], a: 1, why: 'The with-block handles cleanup automatically — the professional habit from day one.' },
        { q: '<code>json.dumps(data)</code> converts…', options: ['JSON text to a dict', 'A dict/list to JSON text', 'A file to JSON', 'Python to JavaScript'], a: 1, why: 'dumps = "dump to string". loads = "load from string". (Think s = string.)' },
        { q: 'Which library family powers most Python AI work?', options: ['flask & django', 'pygame', 'pytorch, tensorflow & scikit-learn', 'os & sys'], a: 2, why: 'Those are the machine-learning heavyweights — and the AI track here shows you the ideas underneath them.' }
      ],
      challenge: {
        text: 'Extend the pipeline: add a "low_stock" list to the report containing product names with fewer than 20 units, and pretty-print the JSON with indent=2.',
        hints: ['A comprehension over sales with a condition on item["units"].'],
        solution: { lang: 'python', code: 'report = {\n    "total_revenue": round(total, 2),\n    "best_seller": best["product"],\n    "low_stock": [i["product"] for i in sales if i["units"] < 20],\n}\nprint(json.dumps(report, indent=2))' }
      }
    }
  ]
};
