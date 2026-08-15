/* ============================================================
   Data Structures & Algorithms track
   ============================================================ */
window.CT_TRACKS = window.CT_TRACKS || {};

window.CT_TRACKS.dsa = {
  id: 'dsa',
  name: 'Data Structures & Algorithms',
  icon: 'O(n)',
  area: 'js',
  tagline: 'Why some code is instant and some takes till Tuesday.',
  blurb: 'Data structures are the shapes you store information in; algorithms are the recipes that work on them. Together they explain why one solution handles a million items instantly while another chokes on a thousand — and they\'re the shared vocabulary of technical interviews everywhere. Runnable, measurable, in the JavaScript and Python you know.',
  uses: ['Writing code that scales', 'Technical interviews', 'Understanding why apps are slow', 'The vocabulary of computer science'],
  lessons: [

    {
      id: 'dsa-1', title: 'Big-O: the speed language', level: 0, minutes: 14,
      blocks: [
        { t: 'p', html: '"Fast code" is meaningless without asking: <b>fast at what size?</b> Big-O notation describes how work grows as input grows — ignoring constants and machines, keeping only the shape of the growth:' },
        { t: 'table', head: ['Big-O', 'Name', 'Feel', 'Example'], rows: [
          ['<code>O(1)</code>', 'constant', 'instant at any size', 'array[5], dict lookup'],
          ['<code>O(log n)</code>', 'logarithmic', 'doubling input adds ONE step', 'binary search'],
          ['<code>O(n)</code>', 'linear', 'double input, double work', 'one loop over everything'],
          ['<code>O(n log n)</code>', 'linearithmic', 'the good sorts live here', 'sort()'],
          ['<code>O(n²)</code>', 'quadratic', 'double input, 4× work — danger', 'a loop inside a loop'],
          ['<code>O(2ⁿ)</code>', 'exponential', 'add one item, work DOUBLES', 'naive fibonacci']
        ] },
        { t: 'p', html: 'The reading trick: find the loops. One loop over n items → O(n). A loop inside a loop → O(n²). No loop, just a lookup → O(1). Halving each step → O(log n).' },
        { t: 'code', lang: 'js', code: 'function hasDuplicates(list) {          // O(n²) - loop in loop\n  for (let i = 0; i < list.length; i++)\n    for (let j = i + 1; j < list.length; j++)\n      if (list[i] === list[j]) return true;\n  return false;\n}\n\nfunction hasDuplicatesFast(list) {       // O(n) - one pass + Set\n  const seen = new Set();\n  for (const item of list) {\n    if (seen.has(item)) return true;     // Set lookups are O(1)\n    seen.add(item);\n  }\n  return false;\n}' },
        { t: 'p', html: 'Same answer, wildly different futures: at 100 items both feel instant; at 1,000,000 the first needs ~500 billion comparisons and the second needs a million. The try-it lets you feel the cliff.' },
        { t: 'warn', html: 'Big-O is about growth, not absolute speed. An O(n²) solution is FINE for 20 items — knowing when it matters is the actual skill.' }
      ],
      tryIt: {
        mode: 'js',
        code: 'function timeIt(label, fn) {\n  const t = performance.now();\n  fn();\n  console.log(`${label}: ${(performance.now() - t).toFixed(1)} ms`);\n}\n\nfunction makeList(n) {\n  return Array.from({ length: n }, () => Math.floor(Math.random() * n * 10));\n}\n\nfunction dupSlow(list) {   // O(n²)\n  for (let i = 0; i < list.length; i++)\n    for (let j = i + 1; j < list.length; j++)\n      if (list[i] === list[j]) return true;\n  return false;\n}\nfunction dupFast(list) {   // O(n)\n  const seen = new Set();\n  for (const x of list) { if (seen.has(x)) return true; seen.add(x); }\n  return false;\n}\n\nconst small = makeList(1000), big = makeList(20000);\ntimeIt("O(n²) on 1,000", () => dupSlow(small));\ntimeIt("O(n)  on 1,000", () => dupFast(small));\ntimeIt("O(n²) on 20,000", () => dupSlow(big));    // feel the cliff\ntimeIt("O(n)  on 20,000", () => dupFast(big));\n\n// Try 50000. Then try to explain the numbers with the table.'
      },
      quiz: [
        { q: 'A loop inside a loop over the same list is typically…', options: ['O(n)', 'O(n²)', 'O(1)', 'O(log n)'], a: 1, why: 'n items × n items = n² pairs examined.' },
        { q: 'O(log n) means doubling the input…', options: ['Doubles the work', 'Adds just one more step', 'Squares the work', 'Has no effect'], a: 1, why: 'Halving strategies (like binary search) barely notice input size.' },
        { q: 'Big-O deliberately ignores…', options: ['Loops', 'Constant factors and hardware — only the growth shape survives', 'Memory', 'Correctness'], a: 1, why: '2n and 100n are both O(n): same shape, and shape wins at scale.' }
      ],
      challenge: {
        text: 'Classify these and verify one with timeIt: (a) sum of a list, (b) first element, (c) all PAIRS of a list printed, (d) checking a number in a Set. Then write commonItems(a, b) two ways — nested O(n·m) and Set-powered O(n+m) — and race them.',
        hints: ['(a) O(n), (b) O(1), (c) O(n²), (d) O(1).'],
        solution: { lang: 'js', code: 'function commonSlow(a, b) {\n  return a.filter(x => b.includes(x));      // includes() is a hidden loop!\n}\nfunction commonFast(a, b) {\n  const setB = new Set(b);\n  return a.filter(x => setB.has(x));        // O(1) lookups\n}\n// race them on makeList(20000) - same answer, different century.' }
      }
    },

    {
      id: 'dsa-2', title: 'Arrays & linked lists', level: 1, minutes: 14,
      blocks: [
        { t: 'p', html: 'The array you\'ve used all along is a specific promise: items sit <b>side by side in memory</b>. That layout is why <code>arr[500]</code> is instant — the computer multiplies 500 by the item size and jumps straight there. But the same layout makes inserting at the FRONT expensive: every other item must shuffle over. O(1) reads, O(n) front-insertions.' },
        { t: 'p', html: 'The <b>linked list</b> flips the trade: each item is a little node floating anywhere in memory, holding its value and the address of the next node:' },
        { t: 'code', lang: 'js', code: 'const list = {\n  value: "a",\n  next: {\n    value: "b",\n    next: { value: "c", next: null }\n  }\n};\n\n// walking it - the only way to reach anything:\nlet node = list;\nwhile (node) {\n  console.log(node.value);\n  node = node.next;\n}' },
        { t: 'p', html: 'Now inserting at the front is O(1) — make a node, point it at the old head, done. No shuffling. But reading item 500 means walking 500 links: O(n). The eternal trade-off table:' },
        { t: 'table', head: ['Operation', 'Array', 'Linked list'], rows: [
          ['Read by position', '<b>O(1)</b> ⚡', 'O(n)'],
          ['Insert/remove at front', 'O(n)', '<b>O(1)</b> ⚡'],
          ['Insert/remove at end', 'O(1)*', 'O(1) with a tail pointer'],
          ['Memory layout', 'compact, cache-friendly', 'scattered, pointer overhead']
        ] },
        { t: 'p', html: 'Real talk: in JS/Python you\'ll almost always use arrays (they\'re heavily optimized). Linked lists matter because (1) they underlie queues, stacks and many library internals, (2) "reverse a linked list" is an interview ritual, and (3) node-and-pointer thinking is the foundation of trees and graphs.' }
      ],
      tryIt: {
        mode: 'js',
        code: '// Build a linked list from an array, then do things with it\nfunction fromArray(arr) {\n  let head = null;\n  for (let i = arr.length - 1; i >= 0; i--) {\n    head = { value: arr[i], next: head };   // O(1) front-insert each time\n  }\n  return head;\n}\n\nfunction toArray(head) {\n  const out = [];\n  for (let node = head; node; node = node.next) out.push(node.value);\n  return out;\n}\n\nfunction listLength(head) {\n  let n = 0;\n  for (let node = head; node; node = node.next) n++;\n  return n;\n}\n\nconst list = fromArray(["a", "b", "c", "d"]);\nconsole.log("as array:", toArray(list));\nconsole.log("length:", listLength(list));\nconsole.log("third item the slow way:", toArray(list)[2]);\n\n// Write contains(head, value) - walk until found or null.'
      },
      quiz: [
        { q: 'Why is arr[9000] instant?', options: ['Caching', 'Contiguous memory: position × item-size = exact address, one jump', 'The browser preloads it', 'It isn\'t'], a: 1, why: 'The side-by-side layout turns indexing into arithmetic.' },
        { q: 'Linked lists win at…', options: ['Reading the middle', 'Inserting/removing at the front without shifting anything', 'Using less memory', 'Everything'], a: 1, why: 'Repoint one link and you\'re done — no mass shuffle.' },
        { q: 'The main reason to learn linked lists today:', options: ['They\'re faster than arrays', 'Node-and-pointer thinking underlies queues, trees, graphs — and interviews love them', 'JS arrays are deprecated', 'They save disk space'], a: 1, why: 'The structure generalizes; the interview question is a rite of passage.' }
      ],
      challenge: {
        text: 'The classic: write <code>reverseList(head)</code> that reverses a linked list by re-pointing links (no converting to an array!). Verify with toArray. Interview lore: keep three variables — prev, current, next.',
        hints: ['Loop: save node.next, point node.next at prev, advance prev and node.'],
        solution: { lang: 'js', code: 'function reverseList(head) {\n  let prev = null;\n  let node = head;\n  while (node) {\n    const next = node.next;   // save the road ahead\n    node.next = prev;         // flip this link backwards\n    prev = node;              // advance both markers\n    node = next;\n  }\n  return prev;                // prev is the new head\n}\n\nconsole.log(toArray(reverseList(fromArray([1, 2, 3, 4]))));  // [4,3,2,1]' }
      }
    },

    {
      id: 'dsa-3', title: 'Stacks & queues', level: 1, minutes: 12,
      blocks: [
        { t: 'p', html: 'Two of the most useful structures are just arrays with house rules:' },
        { t: 'ul', items: [
          '<b>Stack — LIFO</b> (last in, first out): add and remove at the same end, like plates. <code>push()</code> / <code>pop()</code>. Powers: undo history, the browser back button, and the literal <b>call stack</b> your functions run on.',
          '<b>Queue — FIFO</b> (first in, first out): add at the back, remove at the front, like a line. <code>push()</code> / <code>shift()</code>. Powers: print jobs, message processing, breadth-first search.'
        ] },
        { t: 'p', html: 'The classic stack problem — matching brackets — is basically how your editor and every compiler checks syntax:' },
        { t: 'code', lang: 'js', code: 'function balanced(code) {\n  const stack = [];\n  const pairs = { ")": "(", "]": "[", "}": "{" };\n  for (const ch of code) {\n    if ("([{".includes(ch)) stack.push(ch);          // opener: remember it\n    else if (ch in pairs) {\n      if (stack.pop() !== pairs[ch]) return false;   // closer must match\n    }\n  }\n  return stack.length === 0;                          // nothing left open\n}\n\nconsole.log(balanced("if (a[0] === {x: 1}.x) {}"));   // true\nconsole.log(balanced("function( { )"));                // false' },
        { t: 'p', html: 'That "most recently opened must close first" logic IS the stack — the structure and the problem fit like lock and key. When a problem mentions "most recent", think stack; "in arrival order", think queue.' },
        { t: 'tip', html: 'Now you can name the error you\'ve seen: <b>stack overflow</b> is the call stack (a real stack!) filling up with unfinished function calls — usually runaway recursion. Lesson 5 makes that concrete.' }
      ],
      tryIt: {
        mode: 'js',
        code: '// An undo system - the everyday stack\nconst doc = { text: "" };\nconst undoStack = [];\n\nfunction type(newText) {\n  undoStack.push(doc.text);        // save the PREVIOUS state\n  doc.text += newText;\n  console.log(`typed  -> "${doc.text}"`);\n}\n\nfunction undo() {\n  if (undoStack.length === 0) { console.log("nothing to undo"); return; }\n  doc.text = undoStack.pop();      // restore most recent\n  console.log(`undo   -> "${doc.text}"`);\n}\n\ntype("Hello");\ntype(", world");\ntype("!!!");\nundo();\nundo();\ntype("?");\nconsole.log("final:", doc.text);\n\n// Add a REDO stack: undo pushes onto it; typing clears it. Classic!'
      },
      quiz: [
        { q: 'LIFO describes…', options: ['A queue', 'A stack: the last thing added is the first removed', 'A sorted array', 'A database'], a: 1, why: 'Plates, undo, back-button, the call stack — last in, first out.' },
        { q: 'A print queue should be…', options: ['LIFO — newest job first', 'FIFO — jobs print in arrival order', 'Random', 'Sorted by size'], a: 1, why: 'Fairness = first come, first served = queue.' },
        { q: '"Stack overflow" literally means…', options: ['Too many browser tabs', 'The call stack filled with unfinished calls — usually runaway recursion', 'Disk full', 'A popular website only'], a: 1, why: 'Every call pushes a frame; no base case = pushes forever = overflow.' }
      ],
      challenge: {
        text: 'Build a printer queue simulator: jobs arrive as {name, pages}; process() takes the front job, "prints" it (log), and reports remaining count. Add a rush(name, pages) that jumps the line (unshift) — and log a grumpy message from the queue on behalf of everyone waiting.',
        hints: ['Queue ops: jobs.push(job) to arrive, jobs.shift() to process.'],
        solution: { lang: 'js', code: 'const jobs = [];\nconst arrive = (name, pages) => { jobs.push({ name, pages }); };\nconst rush = (name, pages) => {\n  jobs.unshift({ name, pages });\n  console.log(`⚡ ${name} cut the line. The queue grumbles.`);\n};\nfunction process() {\n  const job = jobs.shift();\n  if (!job) return console.log("queue empty");\n  console.log(`🖨 printing ${job.name} (${job.pages}p) — ${jobs.length} waiting`);\n}\n\narrive("essay", 4); arrive("recipes", 2); rush("BOSS-REPORT", 90);\nprocess(); process(); process();' }
      }
    },

    {
      id: 'dsa-4', title: 'Hash maps: the O(1) miracle', level: 1, minutes: 12,
      blocks: [
        { t: 'p', html: 'You\'ve used them all along — JS objects/Maps, Python dicts — but WHY is looking up a key instant, even among a million entries? The trick is the <b>hash function</b>: it converts any key into a number, and that number IS the storage slot:' },
        { t: 'code', lang: 'js', code: 'function hash(key, buckets) {\n  let h = 0;\n  for (const ch of key) {\n    h = (h * 31 + ch.charCodeAt(0)) % buckets;\n  }\n  return h;   // "waffles" -> always the same slot number\n}\n\nconsole.log(hash("waffles", 16));   // e.g. 11\nconsole.log(hash("toast", 16));     // e.g. 3\nconsole.log(hash("waffles", 16));   // 11 again - deterministic!' },
        { t: 'p', html: 'Storing: hash the key → put the value in that slot. Reading: hash the key → jump straight to the slot. No searching — <i>computing</i> the location instead of looking for it. That\'s the whole miracle.' },
        { t: 'p', html: 'One wrinkle: two keys can hash to the same slot — a <b>collision</b>. Standard fix: each slot holds a little list of entries, and you check the few things there (that\'s a linked list inside a hash map — the structures compose!). With a good hash and enough buckets, slots stay nearly empty and lookups stay effectively O(1).' },
        { t: 'p', html: 'Why this matters practically: <b>the #1 optimization in everyday code is replacing a search with a lookup.</b> The O(n²) duplicate-finder from lesson 1 became O(n) with a Set — a Set is just a hash map without values. This pattern will save you a hundred times.' }
      ],
      tryIt: {
        mode: 'js',
        code: '// Build a real (tiny) hash map from scratch\nclass TinyMap {\n  constructor(buckets = 8) {\n    this.buckets = Array.from({ length: buckets }, () => []);\n  }\n  hash(key) {\n    let h = 0;\n    for (const ch of key) h = (h * 31 + ch.charCodeAt(0)) % this.buckets.length;\n    return h;\n  }\n  set(key, value) {\n    const bucket = this.buckets[this.hash(key)];\n    const hit = bucket.find(e => e[0] === key);\n    if (hit) hit[1] = value;\n    else bucket.push([key, value]);\n  }\n  get(key) {\n    const bucket = this.buckets[this.hash(key)];\n    const hit = bucket.find(e => e[0] === key);\n    return hit ? hit[1] : undefined;\n  }\n}\n\nconst prices = new TinyMap();\nprices.set("waffles", 9);\nprices.set("toast", 2);\nprices.set("waffles", 8.5);            // updates, no duplicate\n\nconsole.log(prices.get("waffles"));    // 8.5\nconsole.log(prices.get("nothing"));    // undefined\nconsole.log("bucket layout:", JSON.stringify(prices.buckets));\n// See the collisions? Add more items and watch buckets share.'
      },
      quiz: [
        { q: 'Hash map lookups are fast because…', options: ['They\'re sorted', 'The hash function COMPUTES the storage slot directly — no searching', 'They\'re small', 'Caching'], a: 1, why: 'Turning the key into the address replaces search with arithmetic.' },
        { q: 'A collision is…', options: ['A crash', 'Two keys hashing to the same slot — handled by a per-slot list', 'A syntax error', 'Duplicate values'], a: 1, why: 'Expected and fine: good hashing keeps each slot\'s list tiny.' },
        { q: 'The everyday optimization this enables:', options: ['More loops', 'Replace an O(n) search inside a loop with an O(1) Set/dict lookup', 'Shorter names', 'Recursion'], a: 1, why: 'The n²→n upgrade you\'ll perform for the rest of your career.' }
      ],
      challenge: {
        text: 'Use the pattern for real: given two big arrays of usernames, find who appears in BOTH — first with .includes (slow), then with a Set (fast), and time both with performance.now() at 20,000 names each.',
        hints: ['Generate names like "user" + i with some overlap between the arrays.'],
        solution: { lang: 'js', code: 'const a = Array.from({length: 20000}, (_, i) => "user" + i);\nconst b = Array.from({length: 20000}, (_, i) => "user" + (i + 15000));\n\nlet t = performance.now();\nconst slow = a.filter(x => b.includes(x));\nconsole.log("includes:", (performance.now() - t).toFixed(1), "ms,", slow.length, "shared");\n\nt = performance.now();\nconst setB = new Set(b);\nconst fast = a.filter(x => setB.has(x));\nconsole.log("Set:     ", (performance.now() - t).toFixed(1), "ms,", fast.length, "shared");' }
      }
    },

    {
      id: 'dsa-5', title: 'Recursion: functions calling themselves', level: 1, minutes: 14,
      blocks: [
        { t: 'p', html: 'A recursive function solves a problem by solving a <b>smaller version of the same problem</b> — calling itself — until it reaches a case so small the answer is obvious (the <b>base case</b>):' },
        { t: 'code', lang: 'python', code: 'def factorial(n):\n    if n <= 1:                  # base case: obvious answer\n        return 1\n    return n * factorial(n - 1) # smaller version of the same problem\n\nprint(factorial(5))   # 5 * 4 * 3 * 2 * 1 = 120' },
        { t: 'p', html: 'Every call waits on the call stack (lesson 3!) for its smaller call to return: factorial(5) waits for factorial(4) waits for factorial(3)… until factorial(1) returns 1 and the answers cascade back up. Forget the base case and the stack fills forever: the literal stack overflow.' },
        { t: 'p', html: 'Recursion\'s home turf is <b>self-similar data</b> — structures containing smaller versions of themselves. Folders contain folders. HTML elements contain elements. JSON contains JSON. For these, recursion isn\'t clever, it\'s natural:' },
        { t: 'code', lang: 'python', code: 'def count_files(folder):\n    total = len(folder["files"])\n    for sub in folder["subfolders"]:\n        total += count_files(sub)     # each subfolder: same problem, smaller\n    return total' },
        { t: 'p', html: 'One famous trap: naive fibonacci recomputes the same values exponentially many times — O(2ⁿ). The fix, <b>memoization</b> (cache what you\'ve computed — a hash map again!), collapses it to O(n). The try-it makes the difference visceral.' }
      ],
      tryIt: {
        mode: 'python',
        code: 'import time\n\ndef fib_naive(n):\n    if n <= 1:\n        return n\n    return fib_naive(n - 1) + fib_naive(n - 2)   # recomputes EVERYTHING\n\ncache = {}\ndef fib_memo(n):\n    if n <= 1:\n        return n\n    if n not in cache:                            # the hash map saves us\n        cache[n] = fib_memo(n - 1) + fib_memo(n - 2)\n    return cache[n]\n\nt = time.time()\nprint("naive fib(28):", fib_naive(28), f"({time.time() - t:.2f}s)")\n\nt = time.time()\nprint("memo  fib(28):", fib_memo(28), f"({time.time() - t:.4f}s)")\nprint("memo  fib(300):", fib_memo(300))   # naive would outlive the universe\n\n# Push naive to 32 and feel O(2^n). (Maybe not 40. Definitely not 40.)',
        expected: 'naive fib(28): 317811 (~1-2s)\nmemo  fib(28): 317811 (~0.0001s)\nmemo  fib(300): 2222322446...(a 63-digit number)'
      },
      quiz: [
        { q: 'Every correct recursive function needs…', options: ['A loop', 'A base case that stops the self-calls', 'Global variables', 'Two arguments'], a: 1, why: 'No base case → calls forever → the call stack overflows.' },
        { q: 'Recursion is most natural for…', options: ['Simple counting', 'Self-similar data: folders in folders, elements in elements, JSON in JSON', 'Math only', 'Sorting'], a: 1, why: 'When the data nests, the function that processes it nests too.' },
        { q: 'Memoization fixes naive fibonacci by…', options: ['Using bigger numbers', 'Caching computed results in a map so nothing is computed twice', 'Removing the base case', 'Using loops secretly'], a: 1, why: 'O(2ⁿ) → O(n) with one dict. Data structures rescuing algorithms.' }
      ],
      challenge: {
        text: 'Write recursive <code>sum_nested(lst)</code> that totals a list that may contain numbers OR nested lists, any depth: <code>sum_nested([1, [2, [3, 4]], 5]) == 15</code>. Then flatten(lst) returning all numbers in order.',
        hints: ['For each item: if isinstance(item, list) → recurse; else add it.'],
        solution: { lang: 'python', code: 'def sum_nested(lst):\n    total = 0\n    for item in lst:\n        if isinstance(item, list):\n            total += sum_nested(item)   # same problem, smaller\n        else:\n            total += item\n    return total\n\nprint(sum_nested([1, [2, [3, 4]], 5]))   # 15\n\ndef flatten(lst):\n    out = []\n    for item in lst:\n        if isinstance(item, list):\n            out.extend(flatten(item))\n        else:\n            out.append(item)\n    return out\n\nprint(flatten([1, [2, [3]], 4]))   # [1, 2, 3, 4]' }
      }
    },

    {
      id: 'dsa-6', title: 'Sorting & searching', level: 2, minutes: 14,
      blocks: [
        { t: 'p', html: 'Sorting and searching are the algorithms you\'ll actually meet weekly — and the cleanest showcase of Big-O mattering. Start with search. Unsorted data forces <b>linear search</b>: check everything, O(n). But SORTED data unlocks <b>binary search</b> — the number-guessing strategy from the Python track, weaponized:' },
        { t: 'code', lang: 'js', code: 'function binarySearch(sorted, target) {\n  let lo = 0, hi = sorted.length - 1;\n  let steps = 0;\n  while (lo <= hi) {\n    steps++;\n    const mid = Math.floor((lo + hi) / 2);\n    if (sorted[mid] === target) return { index: mid, steps };\n    if (sorted[mid] < target) lo = mid + 1;   // discard the left half\n    else hi = mid - 1;                        // discard the right half\n  }\n  return { index: -1, steps };\n}' },
        { t: 'p', html: 'Each step discards HALF the remaining data: a million items need at most 20 steps, a billion need 30. That\'s O(log n), and it\'s why "keep it sorted" (or indexed — your SQL track\'s indexes are this idea) is such a powerful invariant.' },
        { t: 'p', html: 'Sorting itself: the teaching classic is <b>bubble sort</b> — repeatedly swap adjacent out-of-order pairs, O(n²), lovely to watch, never used in production. Real sorts (quicksort, mergesort, timsort) reach O(n log n) by divide-and-conquer, and every language ships one:' },
        { t: 'code', lang: 'js', code: 'scores.sort((a, b) => a - b);        // JS: give it the comparison\nmenu.sort((a, b) => a.price - b.price);  // objects sort by anything' },
        { t: 'code', lang: 'python', code: 'sorted(scores)                        # Python\nsorted(menu, key=lambda d: d["price"])  # sort by a field' },
        { t: 'p', html: 'The professional rule: <b>never write your own sort for real work</b> — the built-in is faster and battle-tested. Learn bubble sort to understand the problem; use .sort() to solve it. 🎓 <b>Track complete</b> — you now speak the interview language, and more importantly, you know why the Set trick keeps saving you.' }
      ],
      tryIt: {
        mode: 'js',
        code: 'function bubbleSort(arr) {\n  const a = [...arr];\n  let swaps = 0;\n  for (let end = a.length - 1; end > 0; end--) {\n    for (let i = 0; i < end; i++) {\n      if (a[i] > a[i + 1]) {\n        [a[i], a[i + 1]] = [a[i + 1], a[i]];   // the swap\n        swaps++;\n      }\n    }\n  }\n  return { sorted: a, swaps };\n}\n\nconst messy = [64, 25, 12, 89, 3, 42, 77, 8];\nconsole.log("bubble:", bubbleSort(messy));\n\n// binary search needs SORTED data:\nfunction binarySearch(sorted, target) {\n  let lo = 0, hi = sorted.length - 1, steps = 0;\n  while (lo <= hi) {\n    steps++;\n    const mid = Math.floor((lo + hi) / 2);\n    if (sorted[mid] === target) return { index: mid, steps };\n    if (sorted[mid] < target) lo = mid + 1; else hi = mid - 1;\n  }\n  return { index: -1, steps };\n}\n\nconst big = Array.from({ length: 1000000 }, (_, i) => i * 2);\nconsole.log("find 777776 among a MILLION:", binarySearch(big, 777776));\nconsole.log("(twenty-ish steps. for a million items. that\'s log n.)");'
      },
      quiz: [
        { q: 'Binary search requires the data to be…', options: ['Small', 'Sorted', 'Numbers only', 'In a linked list'], a: 1, why: 'Discarding half only works when order tells you WHICH half.' },
        { q: 'Searching a billion sorted items takes binary search about…', options: ['A billion steps', '30 steps', 'A million steps', 'It can\'t'], a: 1, why: 'log₂(1e9) ≈ 30. Halving is a superpower.' },
        { q: 'For real work, you should sort with…', options: ['Bubble sort, hand-written', 'The language\'s built-in sort', 'No sorting ever', 'Random shuffles until sorted'], a: 1, why: 'Built-ins are O(n log n), optimized and correct. (Bogosort, option D, is a real joke algorithm!)' }
      ],
      challenge: {
        text: 'Use sorting as a TOOL (the real skill): given the diner menu as [{name, price}], print it cheapest-first, then find the median price, then the two closest-priced dishes (hint: after sorting, closest pairs are neighbors — that\'s WHY you sort).',
        hints: ['Median of sorted list: middle element (or average of two middles).', 'Closest pair: one pass over sorted neighbors tracking the min gap.'],
        solution: { lang: 'js', code: 'const menu = [\n  { name: "Pancakes", price: 5 }, { name: "Waffle Supreme", price: 9 },\n  { name: "Fruit Bowl", price: 6 }, { name: "Toast", price: 2 },\n  { name: "Omelette", price: 7.5 }, { name: "Smoothie", price: 4.5 },\n];\n\nconst byPrice = [...menu].sort((a, b) => a.price - b.price);\nbyPrice.forEach(d => console.log(`$${d.price} — ${d.name}`));\n\nconst mid = byPrice[Math.floor(byPrice.length / 2)].price;\nconsole.log("median-ish price:", mid);\n\nlet best = null;\nfor (let i = 1; i < byPrice.length; i++) {\n  const gap = byPrice[i].price - byPrice[i - 1].price;\n  if (!best || gap < best.gap) best = { gap, pair: [byPrice[i - 1].name, byPrice[i].name] };\n}\nconsole.log("closest prices:", best.pair, "(gap", best.gap + ")");' }
      }
    }
  ]
};
