/* ============================================================
   Practice — auto-graded exercises. Write code, press Run tests,
   get green. All pass -> exercise marked solved.
   Shape: { id, title, lang: 'js'|'python'|'sql', level, brief,
            starter, tests, hint, solution, setup?, tables?, expect? }
   js/python tests: [{name, code}] — code throws (assert) on failure.
   sql: setup + expect (values of the LAST result set) [+ order matters].
   ============================================================ */
window.CT_PRACTICE = [

  /* ---------------- JavaScript ---------------- */
  {
    id: 'ex-js-double', title: 'Double it', lang: 'js', level: 0,
    brief: 'Write a function <code>double(n)</code> that returns n multiplied by two.',
    starter: 'function double(n) {\n  // your code here\n}\n\nconsole.log(double(4)); // try it before running the tests',
    tests: [
      { name: 'double(4) is 8', code: 'assert(double(4) === 8)' },
      { name: 'double(0) is 0', code: 'assert(double(0) === 0)' },
      { name: 'double(-3) is -6', code: 'assert(double(-3) === -6)' },
      { name: 'returns (not prints) the value', code: 'assert(typeof double(1) === "number")' }
    ],
    hint: 'return n * 2 — remember return sends the value back; console.log only displays it.',
    solution: 'function double(n) {\n  return n * 2;\n}'
  },
  {
    id: 'ex-js-tip', title: 'Tip calculator', lang: 'js', level: 0,
    brief: 'Write <code>tip(bill, percent)</code> returning the tip amount. If percent is omitted, default it to 15.',
    starter: 'function tip(bill, percent) {\n  // your code here\n}',
    tests: [
      { name: 'tip(100, 20) is 20', code: 'assert(tip(100, 20) === 20)' },
      { name: 'tip(60, 10) is 6', code: 'assert(tip(60, 10) === 6)' },
      { name: 'default percent is 15', code: 'assert(tip(100) === 15)' }
    ],
    hint: 'Default parameters: function tip(bill, percent = 15). The math: bill * (percent / 100).',
    solution: 'function tip(bill, percent = 15) {\n  return bill * (percent / 100);\n}'
  },
  {
    id: 'ex-js-grade', title: 'Grade machine', lang: 'js', level: 0,
    brief: 'Write <code>grade(score)</code>: 90+ → "A", 80+ → "B", 70+ → "C", below → "F".',
    starter: 'function grade(score) {\n  // your if/else chain here\n}',
    tests: [
      { name: 'grade(95) is "A"', code: 'assert(grade(95) === "A")' },
      { name: 'grade(90) is "A" (boundary!)', code: 'assert(grade(90) === "A")' },
      { name: 'grade(85) is "B"', code: 'assert(grade(85) === "B")' },
      { name: 'grade(70) is "C" (boundary!)', code: 'assert(grade(70) === "C")' },
      { name: 'grade(42) is "F"', code: 'assert(grade(42) === "F")' }
    ],
    hint: 'Check the biggest threshold first: if (score >= 90) return "A"; then else-if downward.',
    solution: 'function grade(score) {\n  if (score >= 90) return "A";\n  if (score >= 80) return "B";\n  if (score >= 70) return "C";\n  return "F";\n}'
  },
  {
    id: 'ex-js-sumto', title: 'Sum to n', lang: 'js', level: 0,
    brief: 'Write <code>sumTo(n)</code> returning 1 + 2 + … + n, using a loop.',
    starter: 'function sumTo(n) {\n  let total = 0;\n  // loop here\n  return total;\n}',
    tests: [
      { name: 'sumTo(3) is 6', code: 'assert(sumTo(3) === 6)' },
      { name: 'sumTo(10) is 55', code: 'assert(sumTo(10) === 55)' },
      { name: 'sumTo(1) is 1', code: 'assert(sumTo(1) === 1)' },
      { name: 'sumTo(100) is 5050 (little Gauss says hi)', code: 'assert(sumTo(100) === 5050)' }
    ],
    hint: 'for (let i = 1; i <= n; i++) total += i;',
    solution: 'function sumTo(n) {\n  let total = 0;\n  for (let i = 1; i <= n; i++) {\n    total += i;\n  }\n  return total;\n}'
  },
  {
    id: 'ex-js-evens', title: 'Keep the evens', lang: 'js', level: 1,
    brief: 'Write <code>evens(numbers)</code> returning a NEW array containing only the even numbers, in order.',
    starter: 'function evens(numbers) {\n  // filter is your friend\n}',
    tests: [
      { name: 'evens([1,2,3,4]) is [2,4]', code: 'assert(JSON.stringify(evens([1,2,3,4])) === "[2,4]")' },
      { name: 'evens([7,9]) is []', code: 'assert(JSON.stringify(evens([7,9])) === "[]")' },
      { name: 'evens([0,-2,5]) keeps 0 and -2', code: 'assert(JSON.stringify(evens([0,-2,5])) === "[0,-2]")' },
      { name: 'original array untouched', code: 'var a=[1,2]; evens(a); assert(a.length === 2)' }
    ],
    hint: 'return numbers.filter(n => n % 2 === 0);',
    solution: 'function evens(numbers) {\n  return numbers.filter(n => n % 2 === 0);\n}'
  },
  {
    id: 'ex-js-cart', title: 'Cart total', lang: 'js', level: 1,
    brief: 'Write <code>cartTotal(items)</code> where each item is <code>{ price, qty }</code> — return the total cost of everything.',
    starter: 'function cartTotal(items) {\n  // reduce over price * qty\n}',
    tests: [
      { name: 'one item: 2 × $5 = 10', code: 'assert(cartTotal([{price:5, qty:2}]) === 10)' },
      { name: 'mixed cart totals 27.5', code: 'assert(cartTotal([{price:5, qty:2}, {price:3.5, qty:5}]) === 27.5)' },
      { name: 'empty cart is 0', code: 'assert(cartTotal([]) === 0)' }
    ],
    hint: 'items.reduce((sum, item) => sum + item.price * item.qty, 0) — the 0 starter matters for the empty cart!',
    solution: 'function cartTotal(items) {\n  return items.reduce((sum, item) => sum + item.price * item.qty, 0);\n}'
  },
  {
    id: 'ex-js-revwords', title: 'Reverse the words', lang: 'js', level: 1,
    brief: 'Write <code>reverseWords(sentence)</code>: "hello brave world" → "world brave hello". (Words reversed, not letters!)',
    starter: 'function reverseWords(sentence) {\n  // split → reverse → join\n}',
    tests: [
      { name: 'three words flip', code: 'assert(reverseWords("hello brave world") === "world brave hello")' },
      { name: 'one word survives', code: 'assert(reverseWords("solo") === "solo")' },
      { name: 'two words', code: 'assert(reverseWords("code teacher") === "teacher code")' }
    ],
    hint: 'sentence.split(" ").reverse().join(" ")',
    solution: 'function reverseWords(sentence) {\n  return sentence.split(" ").reverse().join(" ");\n}'
  },
  {
    id: 'ex-js-fizz', title: 'FizzBuzz, the function', lang: 'js', level: 1,
    brief: 'Write <code>fizzbuzz(n)</code> returning an ARRAY of the first n FizzBuzz values: multiples of 3 → "Fizz", of 5 → "Buzz", both → "FizzBuzz", else the number itself.',
    starter: 'function fizzbuzz(n) {\n  const out = [];\n  // your loop here\n  return out;\n}',
    tests: [
      { name: 'first 5: [1, 2, "Fizz", 4, "Buzz"]', code: 'assert(JSON.stringify(fizzbuzz(5)) === JSON.stringify([1,2,"Fizz",4,"Buzz"]))' },
      { name: '15th item is "FizzBuzz"', code: 'assert(fizzbuzz(15)[14] === "FizzBuzz")' },
      { name: 'numbers stay numbers', code: 'assert(fizzbuzz(2)[1] === 2)' },
      { name: 'length is n', code: 'assert(fizzbuzz(30).length === 30)' }
    ],
    hint: 'Test i % 15 first, then % 3, then % 5, else push i (the number, unquoted).',
    solution: 'function fizzbuzz(n) {\n  const out = [];\n  for (let i = 1; i <= n; i++) {\n    if (i % 15 === 0) out.push("FizzBuzz");\n    else if (i % 3 === 0) out.push("Fizz");\n    else if (i % 5 === 0) out.push("Buzz");\n    else out.push(i);\n  }\n  return out;\n}'
  },

  /* ---------------- Python ---------------- */
  {
    id: 'ex-py-greet', title: 'Greeter', lang: 'python', level: 0,
    brief: 'Write <code>greet(name)</code> returning the string <code>"Hello, NAME!"</code> — with the name uppercased.',
    starter: 'def greet(name):\n    # your code here (f-string + .upper())\n    pass',
    tests: [
      { name: 'greet("sam") is "Hello, SAM!"', code: 'assert greet("sam") == "Hello, SAM!"' },
      { name: 'greet("Ada") is "Hello, ADA!"', code: 'assert greet("Ada") == "Hello, ADA!"' },
      { name: 'returns, not prints', code: 'assert isinstance(greet("x"), str)' }
    ],
    hint: 'return f"Hello, {name.upper()}!"',
    solution: 'def greet(name):\n    return f"Hello, {name.upper()}!"'
  },
  {
    id: 'ex-py-even', title: 'Even checker', lang: 'python', level: 0,
    brief: 'Write <code>is_even(n)</code> returning True for even numbers, False for odd.',
    starter: 'def is_even(n):\n    pass',
    tests: [
      { name: 'is_even(4) is True', code: 'assert is_even(4) == True' },
      { name: 'is_even(7) is False', code: 'assert is_even(7) == False' },
      { name: 'is_even(0) is True', code: 'assert is_even(0) == True' },
      { name: 'negative evens count', code: 'assert is_even(-2) == True' }
    ],
    hint: 'return n % 2 == 0 — the comparison already IS a True/False value.',
    solution: 'def is_even(n):\n    return n % 2 == 0'
  },
  {
    id: 'ex-py-countdown', title: 'Countdown list', lang: 'python', level: 0,
    brief: 'Write <code>countdown(n)</code> returning a LIST counting from n down to 1, ending with "Liftoff!". Example: countdown(3) → [3, 2, 1, "Liftoff!"]',
    starter: 'def countdown(n):\n    result = []\n    # build it with a loop (hint: range can step backwards)\n    return result',
    tests: [
      { name: 'countdown(3) is [3, 2, 1, "Liftoff!"]', code: 'assert countdown(3) == [3, 2, 1, "Liftoff!"]' },
      { name: 'countdown(1) is [1, "Liftoff!"]', code: 'assert countdown(1) == [1, "Liftoff!"]' },
      { name: 'ends with Liftoff!', code: 'assert countdown(5)[-1] == "Liftoff!"' }
    ],
    hint: 'for i in range(n, 0, -1): result.append(i) — then append the string after the loop.',
    solution: 'def countdown(n):\n    result = []\n    for i in range(n, 0, -1):\n        result.append(i)\n    result.append("Liftoff!")\n    return result'
  },
  {
    id: 'ex-py-top3', title: 'Podium', lang: 'python', level: 1,
    brief: 'Write <code>top3(scores)</code> returning the three highest scores, biggest first. (Don\'t change the original list!)',
    starter: 'def top3(scores):\n    pass',
    tests: [
      { name: 'picks the top three, sorted', code: 'assert top3([50, 90, 20, 80, 70]) == [90, 80, 70]' },
      { name: 'handles exactly three', code: 'assert top3([3, 1, 2]) == [3, 2, 1]' },
      { name: 'original list untouched', code: 's = [5, 1]; top3(s); assert s == [5, 1]' }
    ],
    hint: 'sorted(scores, reverse=True)[:3] — sorted() copies; .sort() would mutate.',
    solution: 'def top3(scores):\n    return sorted(scores, reverse=True)[:3]'
  },
  {
    id: 'ex-py-wordcount', title: 'Word counter', lang: 'python', level: 1,
    brief: 'Write <code>count_words(text)</code> returning a dict of lowercase word → how many times it appears.',
    starter: 'def count_words(text):\n    counts = {}\n    # the classic dict-counter pattern\n    return counts',
    tests: [
      { name: 'counts repeats', code: 'assert count_words("the cat the") == {"the": 2, "cat": 1}' },
      { name: 'lowercases', code: 'assert count_words("Hi hi") == {"hi": 2}' },
      { name: 'empty text gives empty dict', code: 'assert count_words("") == {}' }
    ],
    hint: 'for word in text.lower().split(): counts[word] = counts.get(word, 0) + 1',
    solution: 'def count_words(text):\n    counts = {}\n    for word in text.lower().split():\n        counts[word] = counts.get(word, 0) + 1\n    return counts'
  },
  {
    id: 'ex-py-temp', title: 'Temperature converter', lang: 'python', level: 1,
    brief: 'Write <code>to_fahrenheit(c)</code> (F = C × 9/5 + 32) and <code>to_celsius(f)</code> — the round trip must survive!',
    starter: 'def to_fahrenheit(c):\n    pass\n\ndef to_celsius(f):\n    pass',
    tests: [
      { name: '0°C is 32°F', code: 'assert to_fahrenheit(0) == 32' },
      { name: '100°C is 212°F', code: 'assert to_fahrenheit(100) == 212' },
      { name: '32°F is 0°C', code: 'assert to_celsius(32) == 0' },
      { name: 'round trip: c → f → c', code: 'assert abs(to_celsius(to_fahrenheit(37)) - 37) < 0.001' }
    ],
    hint: 'Solve the formula backwards for to_celsius: (f - 32) * 5 / 9.',
    solution: 'def to_fahrenheit(c):\n    return c * 9 / 5 + 32\n\ndef to_celsius(f):\n    return (f - 32) * 5 / 9'
  },
  {
    id: 'ex-py-account', title: 'Bank account class', lang: 'python', level: 2,
    brief: 'Write a class <code>Account</code>: starts with balance 0, has <code>deposit(n)</code> and <code>withdraw(n)</code> methods. Withdrawing more than the balance should raise <code>ValueError</code>.',
    starter: 'class Account:\n    def __init__(self):\n        pass\n\n    def deposit(self, n):\n        pass\n\n    def withdraw(self, n):\n        pass',
    tests: [
      { name: 'starts at 0', code: 'assert Account().balance == 0' },
      { name: 'deposit adds', code: 'a = Account(); a.deposit(50); assert a.balance == 50' },
      { name: 'withdraw subtracts', code: 'a = Account(); a.deposit(50); a.withdraw(20); assert a.balance == 30' },
      { name: 'overdraft raises ValueError', code: 'a = Account()\ntry:\n    a.withdraw(1)\n    assert False, "should have raised"\nexcept ValueError:\n    pass' }
    ],
    hint: 'In withdraw: if n > self.balance: raise ValueError("insufficient funds")',
    solution: 'class Account:\n    def __init__(self):\n        self.balance = 0\n\n    def deposit(self, n):\n        self.balance += n\n\n    def withdraw(self, n):\n        if n > self.balance:\n            raise ValueError("insufficient funds")\n        self.balance -= n'
  },

  /* ---------------- SQL ---------------- */
  {
    id: 'ex-sql-vegan', title: 'Cheap vegan options', lang: 'sql', level: 0,
    brief: 'From the diner database: select the <code>name</code> of every vegan dish under $6, cheapest first. (One column, ordered by price.)',
    starter: '-- tables: dishes(id, name, price, vegan), orders(id, dish_id, quantity, day)\nSELECT ...',
    expect: [['Toast'], ['Smoothie']],
    hint: 'WHERE vegan = 1 AND price < 6, then ORDER BY price.',
    solution: 'SELECT name FROM dishes\nWHERE vegan = 1 AND price < 6\nORDER BY price;'
  },
  {
    id: 'ex-sql-days', title: 'Busiest days', lang: 'sql', level: 1,
    brief: 'Total items sold (<code>SUM(quantity)</code>) per day, busiest first — ties broken alphabetically by day. Columns: day, total.',
    starter: 'SELECT ...',
    expect: [['Wed', 7], ['Fri', 5], ['Thu', 5], ['Tue', 4], ['Mon', 3]],
    hint: 'GROUP BY day, then ORDER BY total DESC, day.',
    solution: 'SELECT day, SUM(quantity) AS total\nFROM orders\nGROUP BY day\nORDER BY total DESC, day;'
  },
  {
    id: 'ex-sql-revenue', title: 'Top earners', lang: 'sql', level: 2,
    brief: 'The two dishes earning the most revenue (quantity × price), biggest first. Columns: name, revenue. You\'ll need a JOIN.',
    starter: 'SELECT ...',
    expect: [['Waffle Supreme', 54], ['Pancakes', 30]],
    hint: 'JOIN dishes ON orders.dish_id = dishes.id, SUM(quantity * price), GROUP BY name, ORDER BY revenue DESC LIMIT 2.',
    solution: 'SELECT dishes.name,\n       SUM(orders.quantity * dishes.price) AS revenue\nFROM orders\nJOIN dishes ON orders.dish_id = dishes.id\nGROUP BY dishes.name\nORDER BY revenue DESC\nLIMIT 2;'
  }
];
