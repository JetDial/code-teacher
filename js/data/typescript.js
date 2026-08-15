/* ============================================================
   TypeScript track — lesson data
   'ts' editors compile with the real TypeScript compiler (CDN)
   and run the result. Deep type-error demos are shown as static
   examples, since full checking lives in real editors.
   ============================================================ */
window.CT_TRACKS = window.CT_TRACKS || {};

window.CT_TRACKS.ts = {
  id: 'ts',
  name: 'TypeScript',
  icon: 'TS',
  area: 'js',
  tagline: 'JavaScript that catches your bugs before you run them.',
  blurb: 'TypeScript is JavaScript plus type annotations — labels that let your editor catch mistakes while you type instead of when users click. It compiles to plain JS and runs everywhere JS runs. Most professional JavaScript today is actually TypeScript, so this track is the bridge from "I know JS" to "I read real codebases". Do the JavaScript track first — TS is the same language underneath.',
  uses: ['Professional web apps', 'React / Vue / Angular codebases', 'Node.js backends', 'Library development', 'Anywhere JS grows large'],
  lessons: [

    /* ---------- BEGINNER ---------- */
    {
      id: 'ts-1', title: 'Why types? TS in ten minutes', level: 0, minutes: 10,
      blocks: [
        { t: 'p', html: 'Here\'s a JavaScript bug factory you\'ve already met:' },
        { t: 'code', lang: 'js', code: 'function tip(bill, percent) {\n  return bill * (percent / 100);\n}\n\ntip("sixty", 20);   // NaN - discovered at RUNTIME, by a user' },
        { t: 'p', html: 'JavaScript happily runs nonsense and fails later, somewhere else, mysteriously. TypeScript\'s fix: let you <b>declare what each thing is</b>, and refuse to compile contradictions:' },
        { t: 'code', lang: 'ts', code: 'function tip(bill: number, percent: number): number {\n  return bill * (percent / 100);\n}\n\ntip("sixty", 20);   // caught BEFORE running:' },
        { t: 'code', lang: 'text', code: 'error TS2345: Argument of type \'string\' is not\nassignable to parameter of type \'number\'.' },
        { t: 'p', html: 'That\'s the entire pitch. The annotations (<code>: number</code>) exist only at compile time — the compiler checks them, then <b>erases</b> them, emitting plain JavaScript. Zero runtime cost, enormous editing-time benefit: autocomplete that actually knows your data, refactors that can\'t miss a spot, and whole bug categories gone.' },
        { t: 'ul', items: [
          '<b>TS = JS + types.</b> Every JavaScript file is already valid TypeScript. You add types gradually.',
          '<b>Compile step:</b> <code>tsc file.ts</code> produces <code>file.js</code>. Real projects automate this; editors check live as you type.',
          '<b>Where the magic lives:</b> mostly in your editor. VS Code speaks TypeScript natively — red squiggles are the compiler talking to you mid-keystroke.'
        ] },
        { t: 'tip', html: 'In this track\'s editors, Run feeds your code through the <b>real TypeScript compiler</b> (downloaded on first Run), then executes the resulting JavaScript. Grammar mistakes get flagged; the deep type-error demos are shown as static examples — recreate them at <b>typescriptlang.org/play</b> to watch the red squiggles live.' }
      ],
      tryIt: {
        mode: 'ts',
        code: 'function tip(bill: number, percent: number = 15): number {\n  return bill * (percent / 100);\n}\n\nconst bill: number = 60;\nconsole.log(`Tip on $${bill}: $${tip(bill)}`);\nconsole.log(`Generous: $${tip(bill, 25)}`);\n\n// The : number annotations vanish when this runs -\n// check the output, then try annotating a new variable yourself.'
      },
      quiz: [
        { q: 'What happens to type annotations when TypeScript runs?', options: ['Checked on every line', 'Erased — the output is plain JavaScript', 'They slow the program', 'They become strings'], a: 1, why: 'Types are compile-time only: all the checking, none of the runtime cost.' },
        { q: 'Valid JavaScript pasted into a .ts file is…', options: ['An error', 'Valid TypeScript', 'Auto-deleted', 'Converted to types'], a: 1, why: 'TS is a superset of JS — adoption can be one annotation at a time.' },
        { q: 'Where do you feel TypeScript\'s benefits most?', options: ['Faster runtime', 'In the editor: squiggles, autocomplete, safe refactors', 'Smaller files', 'Prettier output'], a: 1, why: 'The compiler runs inside your editor as you type — that feedback loop is the product.' }
      ],
      challenge: {
        text: 'Write a typed function <code>area(width: number, height: number): number</code> and a typed constant for your favorite number. Log both. Then change the constant\'s annotation to <code>string</code> while leaving the number value — run and note the compiler diagnostic.',
        hints: ['A wrong annotation is exactly the kind of contradiction TS exists to catch.'],
        solution: { lang: 'ts', code: 'function area(width: number, height: number): number {\n  return width * height;\n}\n\nconst favorite: number = 7;\nconsole.log(area(3, 4), favorite);\n\n// const bad: string = 7;\n// -> error TS2322: Type \'number\' is not assignable to type \'string\'.' }
      }
    },

    {
      id: 'ts-2', title: 'Typing variables & functions', level: 0, minutes: 12,
      blocks: [
        { t: 'p', html: 'The primitive types mirror JavaScript\'s values:' },
        { t: 'code', lang: 'ts', code: 'const name: string = "Sam";\nconst age: number = 25;\nconst active: boolean = true;\nconst tags: string[] = ["dev", "learner"];   // array of strings\nconst scores: number[] = [88, 95];' },
        { t: 'p', html: 'But here\'s the professional secret: <b>you rarely write those</b>. TypeScript <b>infers</b> types from values — <code>const age = 25</code> already IS a number, annotation-free. The places annotations earn their keep:' },
        { t: 'ul', items: [
          '<b>Function parameters</b> — inference can\'t guess what callers will pass. Always type these.',
          '<b>Function return types</b> — optional (inferred), but writing them documents intent and catches mistakes inside the function.',
          '<b>Empty starts</b> — <code>const items: string[] = []</code>, because an empty array could be anything.'
        ] },
        { t: 'code', lang: 'ts', code: 'function describe(name: string, level: number, vip: boolean = false): string {\n  const badge = vip ? "⭐" : "";\n  return `${badge}${name} (level ${level})`;\n}\n\nconsole.log(describe("Ada", 12, true));' },
        { t: 'p', html: 'Two special types to know on sight: <code>any</code> — the off switch ("stop checking this, I know better"), infectious and best avoided — and <code>unknown</code>, its safe cousin that forces you to check before using. And when a value can be absent, say so honestly:' },
        { t: 'code', lang: 'ts', code: 'function findUser(id: number): string | undefined {\n  return id === 1 ? "Ada" : undefined;   // might not find one!\n}' }
      ],
      tryIt: {
        mode: 'ts',
        code: 'function describe(name: string, level: number, vip: boolean = false): string {\n  const badge = vip ? "⭐" : "";\n  return `${badge}${name} (level ${level})`;\n}\n\nconst party: string[] = [];\nparty.push(describe("Ada", 36, true));\nparty.push(describe("Sam", 19));\n\nfor (const member of party) {\n  console.log(member);\n}\n\n// Add a typed function xp(level: number): number\n// returning level * 100, and log it for each member level.'
      },
      quiz: [
        { q: '<code>const price = 4.5;</code> — what does TS think price is?', options: ['any', 'number, by inference', 'string', 'unknown'], a: 1, why: 'Inference reads the value. Explicit annotations there are redundant.' },
        { q: 'The one place you should ALWAYS write types:', options: ['Every variable', 'Function parameters', 'Loop counters', 'console.log calls'], a: 1, why: 'Parameters face outward — inference can\'t know what callers intend.' },
        { q: '<code>any</code> is…', options: ['The default and recommended', 'An escape hatch that turns checking off — use sparingly', 'Faster than number', 'The same as unknown'], a: 1, why: 'Every any is a hole in the safety net, and it spreads through whatever touches it.' }
      ],
      challenge: {
        text: 'Type a mini inventory: a function <code>addItem(name: string, qty: number): string</code> returning "3 × potion", an initially-empty typed array collecting results, and a loop printing them. Bonus: a function returning <code>number | undefined</code> for looking up a quantity.',
        hints: ['The empty array needs its annotation: <code>const log: string[] = []</code>.'],
        solution: { lang: 'ts', code: 'const log: string[] = [];\n\nfunction addItem(name: string, qty: number): string {\n  return `${qty} × ${name}`;\n}\n\nlog.push(addItem("potion", 3));\nlog.push(addItem("rope", 1));\nlog.forEach(line => console.log(line));' }
      }
    },

    /* ---------- INTERMEDIATE ---------- */
    {
      id: 'ts-3', title: 'Interfaces: naming object shapes', level: 1, minutes: 14,
      blocks: [
        { t: 'p', html: 'Real data is objects, and <b>interfaces</b> give an object shape a name the whole codebase can share:' },
        { t: 'code', lang: 'ts', code: 'interface Player {\n  name: string;\n  level: number;\n  guild?: string;              // ? = optional\n  readonly id: number;         // can\'t be changed after creation\n}\n\nfunction promote(p: Player): Player {\n  return { ...p, level: p.level + 1 };\n}\n\nconst sam: Player = { id: 1, name: "Sam", level: 12 };\nconsole.log(promote(sam));' },
        { t: 'p', html: 'Now every function touching players declares <code>p: Player</code>, autocomplete lists the real properties, and a typo like <code>p.lvl</code> is a compile error instead of an undefined at 2 a.m.:' },
        { t: 'code', lang: 'text', code: 'error TS2339: Property \'lvl\' does not exist on type \'Player\'.\n  Did you mean \'level\'?' },
        { t: 'p', html: 'Interfaces compose — bigger shapes from smaller ones:' },
        { t: 'code', lang: 'ts', code: 'interface HasTimestamps {\n  created: string;\n  updated: string;\n}\n\ninterface Post extends HasTimestamps {\n  title: string;\n  body: string;\n  likes: number;\n}' },
        { t: 'p', html: 'TypeScript\'s checking is <b>structural</b> — "if it has the right shape, it fits". Any object with the right properties satisfies Player, whether or not it was "declared as" one. (You\'ll also see <code>type Player = {...}</code> — for object shapes, type and interface are interchangeable in practice; interface is the convention.)' },
        { t: 'tip', html: 'This is where TS pays rent daily: describe the shape of your API responses once, and every screen using that data gets autocomplete and typo-proofing forever.' }
      ],
      tryIt: {
        mode: 'ts',
        code: 'interface Dish {\n  name: string;\n  price: number;\n  vegan?: boolean;\n}\n\nconst menu: Dish[] = [\n  { name: "Pancakes", price: 5 },\n  { name: "Fruit Bowl", price: 6, vegan: true },\n  { name: "Waffle Supreme", price: 9 },\n];\n\nfunction receipt(dishes: Dish[]): string {\n  const total = dishes.reduce((sum, d) => sum + d.price, 0);\n  return `${dishes.length} dishes — total $${total}`;\n}\n\nconsole.log(receipt(menu));\nconsole.log("Vegan options:", menu.filter(d => d.vegan).map(d => d.name));\n\n// Add a "category" property to the interface and the data,\n// then log only the breakfast items.'
      },
      quiz: [
        { q: 'An interface describes…', options: ['A class only', 'The shape of an object: property names and their types', 'A network connection', 'CSS styling'], a: 1, why: 'Name the shape once; use it everywhere that data flows.' },
        { q: '<code>guild?: string</code> means…', options: ['guild is a string question', 'guild may be omitted', 'guild is private', 'guild defaults to ""'], a: 1, why: 'Optional properties: objects with or without it fit the shape.' },
        { q: '"Structural typing" means…', options: ['Types must be declared with the same name', 'Anything with the right shape fits, regardless of declarations', 'Only classes have types', 'Types are checked at runtime'], a: 1, why: 'TS matches by shape, not by name tags — the duck-typing philosophy, checked.' }
      ],
      challenge: {
        text: 'Model this site: an interface <code>Lesson</code> (title, minutes, done) and <code>Track extends</code>… no wait — <code>Track</code> with a name and a <code>lessons: Lesson[]</code>. Write <code>progress(t: Track): string</code> returning "2/5 done, 34 min left". Test it.',
        hints: ['Minutes left: filter the not-done lessons, reduce their minutes.'],
        solution: { lang: 'ts', code: 'interface Lesson { title: string; minutes: number; done: boolean; }\ninterface Track { name: string; lessons: Lesson[]; }\n\nfunction progress(t: Track): string {\n  const done = t.lessons.filter(l => l.done).length;\n  const left = t.lessons.filter(l => !l.done)\n                        .reduce((s, l) => s + l.minutes, 0);\n  return `${t.name}: ${done}/${t.lessons.length} done, ${left} min left`;\n}\n\nconsole.log(progress({\n  name: "TypeScript",\n  lessons: [\n    { title: "Why types?", minutes: 10, done: true },\n    { title: "Interfaces", minutes: 14, done: false },\n  ],\n}));' }
      }
    },

    {
      id: 'ts-4', title: 'Unions & narrowing: types that branch', level: 1, minutes: 14,
      blocks: [
        { t: 'p', html: 'Real values are often "this OR that". <b>Union types</b> say so, and they\'re TypeScript\'s most distinctive idea:' },
        { t: 'code', lang: 'ts', code: 'type Status = "loading" | "success" | "error";   // literal union!\n\nfunction badge(s: Status): string {\n  if (s === "success") return "✅";\n  if (s === "error") return "❌";\n  return "⏳";\n}\n\nbadge("success");   // fine\nbadge("sucess");    // typo caught at compile time:' },
        { t: 'code', lang: 'text', code: 'error TS2345: Argument of type \'"sucess"\' is not\nassignable to parameter of type \'Status\'.' },
        { t: 'p', html: 'A union of exact strings turns a whole class of typo bugs into compile errors — this is why TS codebases barely need "invalid status" checks.' },
        { t: 'p', html: 'When a union mixes types, TypeScript makes you <b>narrow</b> before using type-specific features — and it understands your if-statements:' },
        { t: 'code', lang: 'ts', code: 'function format(value: string | number): string {\n  if (typeof value === "string") {\n    return value.toUpperCase();    // here TS knows: string\n  }\n  return value.toFixed(2);         // here TS knows: number\n}\n\nconsole.log(format("hello"), format(3.14159));' },
        { t: 'p', html: 'The pattern scales into the <b>discriminated union</b> — objects that carry their own type tag — which is how real apps model states without impossible combinations:' },
        { t: 'code', lang: 'ts', code: 'type FetchState =\n  | { kind: "loading" }\n  | { kind: "success"; data: string[] }\n  | { kind: "error"; message: string };\n\nfunction render(s: FetchState): string {\n  switch (s.kind) {\n    case "loading": return "Spinner…";\n    case "success": return `${s.data.length} items`;  // data exists ONLY here\n    case "error":   return `Oops: ${s.message}`;\n  }\n}' }
      ],
      tryIt: {
        mode: 'ts',
        code: 'type Command = "start" | "stop" | "status";\n\nfunction run(cmd: Command, engine: { running: boolean }): string {\n  if (cmd === "start") { engine.running = true; return "Engine on 🟢"; }\n  if (cmd === "stop")  { engine.running = false; return "Engine off 🔴"; }\n  return engine.running ? "Running" : "Stopped";\n}\n\nconst engine = { running: false };\nconsole.log(run("start", engine));\nconsole.log(run("status", engine));\nconsole.log(run("stop", engine));\n\n// Add a "restart" member to the Command union and handle it.\n// Then try calling run("selfdestruct", engine) and read the diagnostic.'
      },
      quiz: [
        { q: '<code>type Size = "S" | "M" | "L"</code> — what is <code>Size</code>?', options: ['Three variables', 'A type allowing exactly those three strings', 'An enum object at runtime', 'A string array'], a: 1, why: 'A literal union: any other string is a compile error. Typos die here.' },
        { q: 'Narrowing means…', options: ['Making files smaller', 'Using checks (typeof, ===, switch) so TS knows which union member you hold', 'Removing types', 'Shortening names'], a: 1, why: 'TS follows your control flow — inside the branch, the type is narrowed.' },
        { q: 'In a discriminated union, the "discriminant" is…', options: ['An insult', 'The shared tag property (like kind) that identifies each variant', 'The first property', 'A special class'], a: 1, why: 'Switch on the tag; TS unlocks each variant\'s own properties per branch.' }
      ],
      challenge: {
        text: 'Model a traffic light: <code>type Light = "red" | "yellow" | "green"</code>, a function <code>next(l: Light): Light</code> cycling through them, and a loop printing 6 transitions. Then upgrade to a discriminated union where green carries <code>seconds: number</code>.',
        hints: ['Cycle: red→green→yellow→red is the real-world order.'],
        solution: { lang: 'ts', code: 'type Light = "red" | "yellow" | "green";\n\nfunction next(l: Light): Light {\n  if (l === "red") return "green";\n  if (l === "green") return "yellow";\n  return "red";\n}\n\nlet light: Light = "red";\nfor (let i = 0; i < 6; i++) {\n  light = next(light);\n  console.log(light);\n}' }
      }
    },

    {
      id: 'ts-5', title: 'Generics: types with parameters', level: 1, minutes: 14,
      blocks: [
        { t: 'p', html: 'You\'ve used generics all track without noticing: <code>string[]</code> is really <code>Array&lt;string&gt;</code> — the Array type taking a <b>type parameter</b>. Generics let YOUR code do the same: work with any type while keeping track of which one.' },
        { t: 'p', html: 'The problem they solve — this function works but forgets:' },
        { t: 'code', lang: 'ts', code: 'function firstAny(arr: any[]): any {\n  return arr[0];\n}\nconst n = firstAny([1, 2, 3]);   // n is any - type info LOST' },
        { t: 'p', html: 'The generic version remembers:' },
        { t: 'code', lang: 'ts', code: 'function first<T>(arr: T[]): T {\n  return arr[0];\n}\n\nconst n = first([1, 2, 3]);        // n is number - inferred!\nconst s = first(["a", "b"]);       // s is string\n// n.toUpperCase()  <- compile error: numbers can\'t do that' },
        { t: 'p', html: 'Read <code>&lt;T&gt;</code> as "for some type T, decided by the caller". TS usually infers T from the arguments — you write generic functions, callers just call them. Generic interfaces work the same way:' },
        { t: 'code', lang: 'ts', code: 'interface ApiResponse<T> {\n  ok: boolean;\n  data: T;\n}\n\nconst users: ApiResponse<string[]> = { ok: true, data: ["Ada", "Sam"] };\nconst count: ApiResponse<number>  = { ok: true, data: 42 };' },
        { t: 'p', html: 'And <b>constraints</b> let a generic demand capabilities: <code>&lt;T extends { id: number }&gt;</code> means "any type, as long as it has an id".' },
        { t: 'tip', html: 'You\'ll <i>consume</i> generics daily (Array&lt;T&gt;, Promise&lt;T&gt;, React\'s useState&lt;T&gt;) and <i>write</i> them occasionally. Recognizing the angle brackets as "type slot" is 80% of the value.' }
      ],
      tryIt: {
        mode: 'ts',
        code: 'function pickRandom<T>(arr: T[]): T {\n  return arr[Math.floor(Math.random() * arr.length)];\n}\n\nfunction pair<A, B>(a: A, b: B): [A, B] {\n  return [a, b];\n}\n\nconst food = pickRandom(["pizza", "tacos", "ramen"]);   // string\nconst roll = pickRandom([1, 2, 3, 4, 5, 6]);            // number\nconst combo = pair(food, roll);                          // [string, number]\n\nconsole.log(`Dinner: ${combo[0]}, dice says ${combo[1]}`);\n\n// Write last<T>(arr: T[]): T  and test it on both arrays.'
      },
      quiz: [
        { q: '<code>Array&lt;string&gt;</code> and <code>string[]</code> are…', options: ['Different types', 'The same type, two spellings', 'Runtime vs compile-time', 'Mutable vs immutable'], a: 1, why: 'Both are the generic Array type applied to string.' },
        { q: 'In <code>function first&lt;T&gt;(arr: T[]): T</code>, who decides T?', options: ['The function body', 'The caller — usually via inference from the argument', 'The compiler randomly', 'It\'s always any'], a: 1, why: 'Pass number[], T becomes number. The type flows through and out.' },
        { q: 'Generics beat <code>any</code> because…', options: ['They run faster', 'The type relationship is preserved — outputs stay as typed as inputs', 'They\'re shorter', 'any is deprecated'], a: 1, why: 'any forgets; T remembers. That memory is what keeps autocomplete alive downstream.' }
      ],
      challenge: {
        text: 'Build a typed stack: <code>class Stack&lt;T&gt;</code>… or simpler, functions over an array: <code>push&lt;T&gt;(stack: T[], item: T): void</code> and <code>pop&lt;T&gt;(stack: T[]): T | undefined</code>. Make a number stack and a string stack; confirm mixing them is refused (in a comment).',
        hints: ['pop returns T | undefined because the stack might be empty — honest types!'],
        solution: { lang: 'ts', code: 'function push<T>(stack: T[], item: T): void {\n  stack.push(item);\n}\nfunction pop<T>(stack: T[]): T | undefined {\n  return stack.pop();\n}\n\nconst nums: number[] = [];\npush(nums, 1);\npush(nums, 2);\nconsole.log(pop(nums));      // 2\n\n// push(nums, "three") -> error TS2345: string not assignable to number' }
      }
    },

    /* ---------- ADVANCED ---------- */
    {
      id: 'ts-6', title: 'Utility types & the type toolbox', level: 2, minutes: 14,
      blocks: [
        { t: 'p', html: 'TypeScript ships a toolbox of <b>utility types</b> — generics that transform existing types instead of redefining them. The everyday four:' },
        { t: 'code', lang: 'ts', code: 'interface User {\n  id: number;\n  name: string;\n  email: string;\n  admin: boolean;\n}\n\ntype UserUpdate = Partial<User>;          // every property optional\ntype PublicUser = Omit<User, "email">;    // User minus email\ntype Credentials = Pick<User, "id" | "email">;  // just those two\ntype Frozen = Readonly<User>;             // all properties readonly' },
        { t: 'p', html: 'Why this matters: the update-form type, the public-API type and the full database type stay <b>derived from one source</b>. Add a property to User, and every derived type updates itself. No drift, ever.' },
        { t: 'p', html: 'Two more workhorses: <code>Record</code> builds dictionary types, and <code>keyof</code> extracts a type\'s property names as a literal union:' },
        { t: 'code', lang: 'ts', code: 'type Prices = Record<string, number>;      // any string key -> number\nconst menu: Prices = { pancakes: 5, waffles: 9 };\n\ntype UserKey = keyof User;                 // "id" | "name" | "email" | "admin"\n\nfunction get<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];    // fully typed property access\n}' },
        { t: 'p', html: 'That last function is the famous one: <code>get(user, "name")</code> returns string, <code>get(user, "admin")</code> returns boolean, and <code>get(user, "nmae")</code> is a compile error. Look how much safety fits in three lines.' },
        { t: 'tip', html: 'Don\'t memorize the whole catalog — recognize the pattern: <i>types can be computed from types</i>. When you find yourself re-typing a shape with small differences, a utility type already does it.' }
      ],
      tryIt: {
        mode: 'ts',
        code: 'interface Dish {\n  name: string;\n  price: number;\n  vegan: boolean;\n}\n\n// Partial in action: an update function that accepts any subset\nfunction updateDish(dish: Dish, changes: Partial<Dish>): Dish {\n  return { ...dish, ...changes };\n}\n\nconst waffle: Dish = { name: "Waffle", price: 9, vegan: false };\nconsole.log(updateDish(waffle, { price: 8 }));\nconsole.log(updateDish(waffle, { vegan: true, name: "Vegan Waffle" }));\n\n// Record in action:\nconst stock: Record<string, number> = { Waffle: 12, Toast: 30 };\nfor (const [item, qty] of Object.entries(stock)) {\n  console.log(`${item}: ${qty} left`);\n}'
      },
      quiz: [
        { q: '<code>Partial&lt;User&gt;</code> produces…', options: ['Half of User', 'User with every property optional', 'User minus methods', 'A runtime copy'], a: 1, why: 'Perfect for updates and patches: send only what changed, typed.' },
        { q: '<code>keyof User</code> is…', options: ['An array of strings at runtime', 'A literal union of User\'s property names', 'The first key', 'A function'], a: 1, why: '"id" | "name" | "email" | "admin" — property names as a checkable type.' },
        { q: 'The deep reason utility types matter:', options: ['They look impressive', 'Derived types update automatically when the source type changes — no drift', 'They speed up the compiler', 'They\'re required by React'], a: 1, why: 'One source of truth; the type system maintains all the variations.' }
      ],
      challenge: {
        text: 'Given the Dish interface, build: a <code>MenuBoard = Readonly&lt;Dish&gt;[]</code>, a <code>NewDish = Omit&lt;Dish, "name"&gt;</code>… actually invert it: <code>DishDraft = Partial&lt;Omit&lt;Dish, "name"&gt;&gt; & { name: string }</code> — name required, rest optional. Write <code>createDish(draft: DishDraft): Dish</code> filling defaults. Utilities compose!',
        hints: ['Defaults via spread: <code>{ price: 0, vegan: false, ...draft }</code>.'],
        solution: { lang: 'ts', code: 'type DishDraft = Partial<Omit<Dish, "name">> & { name: string };\n\nfunction createDish(draft: DishDraft): Dish {\n  return { price: 0, vegan: false, ...draft };\n}\n\nconsole.log(createDish({ name: "Mystery Soup" }));\nconsole.log(createDish({ name: "Salad", vegan: true, price: 4 }));' }
      }
    },

    {
      id: 'ts-7', title: 'TS in real projects: tsconfig, DOM & React', level: 2, minutes: 14,
      blocks: [
        { t: 'p', html: 'A real TypeScript project is three things: your <code>.ts</code> files, a <code>tsconfig.json</code> telling the compiler how strict to be, and tooling that runs it all invisibly. The config that matters:' },
        { t: 'code', lang: 'js', code: '// tsconfig.json (the sane starter)\n{\n  "compilerOptions": {\n    "strict": true,          // THE setting - all safety on\n    "target": "ES2020",      // how modern the output JS is\n    "module": "esnext",\n    "outDir": "dist"\n  }\n}' },
        { t: 'p', html: '<code>"strict": true</code> is non-negotiable advice: it enables null-checking (<code>string | null</code> must be handled before use — the billion-dollar mistake, caught), implicit-any bans, and friends. Strict from day one is easy; retrofitting strict later is a week of pain.' },
        { t: 'p', html: 'The DOM skills from your JS track come pre-typed — and now the compiler knows the difference between element kinds:' },
        { t: 'code', lang: 'ts', code: 'const input = document.querySelector<HTMLInputElement>("#name");\n\nif (input) {                    // querySelector might find nothing:\n  console.log(input.value);     // null-checked, so this is safe\n}\n// Without the check, strict mode refuses: \'input\' is possibly \'null\'.' },
        { t: 'p', html: 'And this is what TS looks like in React — the framework where most people meet it:' },
        { t: 'code', lang: 'ts', code: 'interface CardProps {\n  title: string;\n  likes: number;\n  onLike: () => void;\n}\n\nfunction Card({ title, likes, onLike }: CardProps) {\n  return <button onClick={onLike}>{title} ❤️ {likes}</button>;\n}\n// Using <Card title={5} /> anywhere = instant compile error.' },
        { t: 'tip', html: 'In practice you\'ll rarely run tsc by hand — Vite, Next.js and friends compile TS out of the box. Start a real project with <code>npm create vite@latest</code>, pick "TypeScript", and everything just works.' }
      ],
      tryIt: {
        mode: 'ts',
        code: 'interface Task {\n  title: string;\n  done: boolean;\n}\n\nconst tasks: Task[] = [\n  { title: "Learn TS basics", done: true },\n  { title: "Type a real project", done: false },\n  { title: "Enable strict mode", done: false },\n];\n\n// Honest nullability, like querySelector teaches:\nfunction find(title: string): Task | null {\n  return tasks.find(t => t.title.includes(title)) ?? null;\n}\n\nconst hit = find("strict");\nif (hit) {\n  console.log(`Found: ${hit.title} (${hit.done ? "done" : "todo"})`);\n} else {\n  console.log("No such task");\n}\n\nconsole.log(`${tasks.filter(t => t.done).length}/${tasks.length} complete`);'
      },
      quiz: [
        { q: 'The single most important tsconfig setting is…', options: ['"outDir"', '"strict": true', '"target"', '"module"'], a: 1, why: 'It turns on null-checking and implicit-any bans — the protections you came for.' },
        { q: '<code>document.querySelector</code> returns a type that includes null because…', options: ['A TS bug', 'The element genuinely might not exist — the type is honest', 'null is faster', 'Legacy reasons'], a: 1, why: 'Strict TS forces the existence check you should have written anyway.' },
        { q: 'In typed React, passing wrong props to a component…', options: ['Crashes at runtime', 'Fails compilation immediately', 'Logs a warning', 'Is impossible to detect'], a: 1, why: 'Props interfaces make component contracts machine-checked.' }
      ],
      challenge: {
        text: 'Simulate the null-safety discipline: write <code>parseAge(input: string): number | null</code> (null unless the string is a whole number 0-130 — use Number() and checks), then a caller that handles both cases with a narrowing if. Test on "25", "abc", "-5".',
        hints: ['<code>Number.isInteger(n)</code> after <code>const n = Number(input)</code>.'],
        solution: { lang: 'ts', code: 'function parseAge(input: string): number | null {\n  const n = Number(input);\n  return Number.isInteger(n) && n >= 0 && n <= 130 ? n : null;\n}\n\nfor (const raw of ["25", "abc", "-5"]) {\n  const age = parseAge(raw);\n  if (age !== null) {\n    console.log(`"${raw}" -> valid age ${age}`);\n  } else {\n    console.log(`"${raw}" -> rejected`);\n  }\n}' }
      }
    },

    {
      id: 'ts-8', title: 'Migrating JS to TS (and thinking in types)', level: 2, minutes: 14,
      blocks: [
        { t: 'p', html: 'The final professional skill: taking a JavaScript codebase to TypeScript without stopping the world. The battle-tested sequence:' },
        { t: 'ol', items: [
          '<b>Rename one file</b> .js → .ts. It mostly just works (TS is a superset). Red squiggles appear where the compiler is confused or worried.',
          '<b>Type the boundaries first:</b> function parameters, API responses, and shared data shapes (interfaces). Boundaries are where bugs cross between modules.',
          '<b>Chase the squiggles</b> — each one is either a missing annotation or, delightfully often, a REAL BUG that was always there.',
          '<b>Ban new <code>any</code></b>, tolerate old ones temporarily, and tighten strictness as coverage grows.',
          '<b>Repeat per file.</b> Mixed JS/TS projects are fully supported — migration is a dial, not a cliff.'
        ] },
        { t: 'p', html: 'Teams doing this report the same surprise: the migration <i>finds dormant bugs</i> — the function sometimes called with a string, the property that\'s occasionally undefined, the status value nobody validated. The types were always there; now they\'re checked.' },
        { t: 'p', html: 'And that\'s the deeper graduation: <b>thinking in types</b>. Before writing code, sketch its shapes:' },
        { t: 'code', lang: 'ts', code: '// Designing a feature = designing its types first:\ntype Currency = "USD" | "EUR";\n\ninterface CartItem {\n  sku: string;\n  qty: number;\n  unitPrice: number;\n  currency: Currency;\n}\n\ninterface Cart {\n  items: CartItem[];\n  coupon: string | null;      // absence is explicit\n}\n\n// The implementation almost writes itself under these constraints -\n// and impossible states (mixed currencies? qty: "two"?) can\'t compile.' },
        { t: 'tip', html: '🎓 <b>Track complete!</b> You now read the professional web\'s house dialect. Next moves: start a Vite + TypeScript project, add types to one of your JS projects from this site, and when you see <code>&lt;T&gt;</code> in library docs, smile knowingly.' }
      ],
      tryIt: {
        mode: 'ts',
        code: '// This "migrated" code has honest types - and they exposed a bug.\n// The old JS version silently produced NaN totals. Find the fix!\n\ninterface CartItem {\n  name: string;\n  qty: number;\n  unitPrice: number;\n}\n\nconst cart: CartItem[] = [\n  { name: "Waffle iron", qty: 1, unitPrice: 49.99 },\n  { name: "Syrup", qty: 3, unitPrice: 8.5 },\n];\n\nfunction total(items: CartItem[]): number {\n  return items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);\n}\n\nconsole.log(`Total: $${total(cart).toFixed(2)}`);\n\n// The old JS bug: an item arrived as { qty: "3" } from a form.\n// Try adding one - the compiler now refuses. That\'s the migration payoff.'
      },
      quiz: [
        { q: 'The recommended migration order starts with…', options: ['Rewriting everything at once', 'Renaming one file and typing its boundaries (parameters, shared shapes)', 'Deleting the JS', 'Installing React'], a: 1, why: 'Incremental, boundary-first — value from day one, no big-bang risk.' },
        { q: 'During migration, many red squiggles turn out to be…', options: ['Compiler bugs', 'Real, pre-existing bugs the types just revealed', 'Style complaints', 'Version issues'], a: 1, why: 'The classic migration story: TS didn\'t add the bugs, it found them.' },
        { q: '"Thinking in types" means…', options: ['Naming variables after types', 'Designing the data shapes first so invalid states can\'t compile', 'Avoiding functions', 'Using any everywhere'], a: 1, why: 'Make illegal states unrepresentable — the design philosophy TS enables.' }
      ],
      challenge: {
        text: 'Migrate for real: take your Compliment Generator project (Projects → Compliment generator), paste it here, and type it fully — typed arrays, typed pick&lt;T&gt;, a return type on compliment(). Confirm it still runs identically.',
        hints: ['pick becomes <code>pick&lt;T&gt;(arr: T[]): T</code> — you wrote this generic in lesson 5!'],
        solution: { lang: 'ts', code: 'const openers: string[] = ["Honestly,", "Real talk:", "Fact:"];\nconst adjectives: string[] = ["brilliant", "unstoppable", "curious"];\nconst nouns: string[] = ["coder", "problem-solver", "legend"];\n\nconst pick = <T,>(arr: T[]): T =>\n  arr[Math.floor(Math.random() * arr.length)];\n\nfunction compliment(): string {\n  return `${pick(openers)} you are one ${pick(adjectives)} ${pick(nouns)}.`;\n}\n\nfor (let i = 1; i <= 3; i++) {\n  console.log(`${i}. ${compliment()}`);\n}' }
      }
    }
  ]
};
