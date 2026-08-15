/* ============================================================
   Testing track — the professional habit of proving code works
   ============================================================ */
window.CT_TRACKS = window.CT_TRACKS || {};

window.CT_TRACKS.testing = {
  id: 'testing',
  name: 'Testing',
  icon: '✓',
  area: 'js',
  tagline: 'Prove your code works — and keep it working forever.',
  blurb: 'Professionals don\'t check their code by eyeballing the output; they write tests — small programs that verify the real program automatically, every time, forever. Testing is the skill that separates "it worked when I tried it" from engineering. This track builds the habit from scratch, and the Practice section\'s auto-graded exercises use exactly what you learn here.',
  uses: ['Catching bugs before users do', 'Refactoring without fear', 'Documenting how code should behave', 'Every professional codebase on Earth'],
  lessons: [

    {
      id: 'test-1', title: 'Why tests exist', level: 0, minutes: 10,
      blocks: [
        { t: 'p', html: 'Here\'s how you\'ve been checking code so far: run it, look at the output, nod. That works — once. But code changes constantly, and every change can silently break something you checked last week. Nobody re-checks everything by hand. So we automate the checking:' },
        { t: 'code', lang: 'js', code: 'function tip(bill, percent = 15) {\n  return bill * (percent / 100);\n}\n\n// the "eyeball method":\nconsole.log(tip(100));        // "9... wait, is 15 right? let me think..."\n\n// the TEST method - the computer knows what\'s right:\nconsole.assert(tip(100) === 15, "default tip of 100 should be 15");\nconsole.assert(tip(60, 20) === 12, "20% of 60 should be 12");\nconsole.log("If nothing yelled above, we\'re good ✅");' },
        { t: 'p', html: 'An <b>assertion</b> states a fact that must be true: "tip(100) equals 15". If it\'s true, silence. If it\'s false, an error names exactly what broke. A <b>test</b> is one or more assertions with a name; a <b>test suite</b> is all your tests, run in one command.' },
        { t: 'p', html: 'Why this changes everything:' },
        { t: 'ul', items: [
          '<b>Bugs surface in seconds, not in production.</b> Change code → run tests → know immediately.',
          '<b>Refactoring stops being scary.</b> Rewrite anything; if the tests still pass, behavior survived.',
          '<b>Tests are documentation that can\'t lie.</b> Reading <code>assert(grade(90) === "A")</code> tells you the boundary rule — and unlike a comment, it\'s verified.',
          '<b>You already know this feels good:</b> the Practice section\'s "Run tests" button IS a test suite judging your code. Now you\'ll write the judge.'
        ] }
      ],
      tryIt: {
        mode: 'js',
        code: 'function grade(score) {\n  if (score >= 90) return "A";\n  if (score >= 80) return "B";\n  return "F";   // oops - we forgot the C grade!\n}\n\n// tests catch what eyeballs miss:\nfunction assert(cond, msg) {\n  if (cond) console.log("  ✅ " + msg);\n  else console.error("  ❌ " + msg);\n}\n\nconsole.log("Testing grade():");\nassert(grade(95) === "A", "95 is an A");\nassert(grade(85) === "B", "85 is a B");\nassert(grade(75) === "C", "75 is a C");   // this one fails!\nassert(grade(50) === "F", "50 is an F");\n\n// Fix grade() so all four pass.'
      },
      quiz: [
        { q: 'An assertion is…', options: ['A strong opinion', 'A statement the code checks: silence if true, error if false', 'A comment', 'A type of loop'], a: 1, why: 'assert(tip(100) === 15) either passes silently or names exactly what broke.' },
        { q: 'The biggest everyday benefit of a test suite:', options: ['Faster code', 'Changing code without fear — the suite instantly reports anything you broke', 'Shorter files', 'No more debugging ever'], a: 1, why: 'Tests turn "did I break something?" from a worry into a command you run.' },
        { q: 'Tests as documentation beat comments because…', options: ['They\'re longer', 'They\'re verified every run — they can\'t drift out of date and lie', 'They use fewer words', 'Comments are deprecated'], a: 1, why: 'A stale comment misleads forever; a stale test FAILS and demands correction.' }
      ],
      challenge: {
        text: 'Fix grade() in the editor so all four tests pass — then add a boundary test for exactly 80 and exactly 90 (boundaries are where bugs live!).',
        hints: ['Add the missing >= 70 branch in the right position.'],
        solution: { lang: 'js', code: 'function grade(score) {\n  if (score >= 90) return "A";\n  if (score >= 80) return "B";\n  if (score >= 70) return "C";\n  return "F";\n}\n\nassert(grade(90) === "A", "exactly 90 is an A");\nassert(grade(80) === "B", "exactly 80 is a B");' }
      }
    },

    {
      id: 'test-2', title: 'Build a tiny test runner', level: 1, minutes: 14,
      blocks: [
        { t: 'p', html: 'Real test frameworks (Jest, pytest) look magical. They\'re not — you can build the core in 20 lines, and doing so demystifies every framework forever. A test runner needs to: collect named tests, run each safely (one crash mustn\'t stop the rest), and report a summary.' },
        { t: 'code', lang: 'js', code: 'let passed = 0, failed = 0;\n\nfunction test(name, fn) {\n  try {\n    fn();                      // run the test body\n    passed++;\n    console.log(`✅ ${name}`);\n  } catch (err) {\n    failed++;\n    console.error(`❌ ${name} — ${err.message}`);\n  }\n}\n\nfunction expect(actual) {\n  return {\n    toBe(expected) {\n      if (actual !== expected) {\n        throw new Error(`expected ${expected}, got ${actual}`);\n      }\n    }\n  };\n}' },
        { t: 'p', html: 'That\'s a real test framework — <code>test()</code> + <code>expect().toBe()</code> is literally Jest\'s API shape. Using it reads like a specification:' },
        { t: 'code', lang: 'js', code: 'test("tip defaults to 15%", () => {\n  expect(tip(100)).toBe(15);\n});\n\ntest("tip handles custom percent", () => {\n  expect(tip(60, 20)).toBe(12);\n});\n\nconsole.log(`\\n${passed} passed, ${failed} failed`);' },
        { t: 'p', html: 'What makes a GOOD test? Three habits:' },
        { t: 'ul', items: [
          '<b>One behavior per test</b>, named as a sentence: "withdraw rejects overdrafts" — failures then read like a bug report.',
          '<b>Test the boundaries:</b> 0, empty lists, exactly-at-the-threshold, negative numbers. Bugs cluster at edges.',
          '<b>Test behavior, not implementation:</b> assert what the function RETURNS, not how it works inside — so refactors don\'t break honest tests.'
        ] }
      ],
      tryIt: {
        mode: 'js',
        code: 'let passed = 0, failed = 0;\nfunction test(name, fn) {\n  try { fn(); passed++; console.log(`✅ ${name}`); }\n  catch (err) { failed++; console.error(`❌ ${name} — ${err.message}`); }\n}\nfunction expect(actual) {\n  return { toBe(expected) {\n    if (actual !== expected) throw new Error(`expected ${expected}, got ${actual}`);\n  }};\n}\n\n// the code under test:\nfunction slugify(title) {\n  return title.toLowerCase().trim().replace(/\\s+/g, "-");\n}\n\n// the suite:\ntest("lowercases", () => expect(slugify("Hello")).toBe("hello"));\ntest("spaces become dashes", () => expect(slugify("my first post")).toBe("my-first-post"));\ntest("trims outer whitespace", () => expect(slugify("  hi  ")).toBe("hi"));\ntest("multiple spaces collapse", () => expect(slugify("a   b")).toBe("a-b"));\n\nconsole.log(`\\n${passed} passed, ${failed} failed`);\n\n// Add 2 tests of your own. Can you find an input that BREAKS slugify?'
      },
      quiz: [
        { q: 'Why does the runner wrap each test in try/catch?', options: ['Style', 'So one failing test can\'t stop the rest from running', 'Speed', 'To hide errors'], a: 1, why: 'You want the FULL damage report, not just the first casualty.' },
        { q: 'A well-named test reads like…', options: ['test1, test2, test3', 'A sentence describing the behavior: "rejects empty input"', 'The function name', 'A file path'], a: 1, why: 'When it fails at 2am, the name IS the bug report.' },
        { q: '"Test behavior, not implementation" means…', options: ['Never test', 'Assert on returned results, not internal steps — so refactoring doesn\'t break honest tests', 'Only test the UI', 'Test private variables'], a: 1, why: 'Tests should pin down WHAT the code promises, leaving HOW free to improve.' }
      ],
      challenge: {
        text: 'Extend expect() with two more matchers: <code>toContain(item)</code> for arrays/strings and <code>toThrow()</code> that PASSES if calling the value throws. Test both matchers on real examples.',
        hints: ['toThrow receives a function: expect(() => risky()).toThrow() — call it inside try/catch and invert the logic.'],
        solution: { lang: 'js', code: 'function expect(actual) {\n  return {\n    toBe(expected) {\n      if (actual !== expected) throw new Error(`expected ${expected}, got ${actual}`);\n    },\n    toContain(item) {\n      if (!actual.includes(item)) throw new Error(`${JSON.stringify(actual)} does not contain ${item}`);\n    },\n    toThrow() {\n      try { actual(); } catch (e) { return; }\n      throw new Error("expected function to throw, but it didn\'t");\n    }\n  };\n}\n\ntest("array contains", () => expect([1,2,3]).toContain(2));\ntest("JSON.parse throws on garbage", () => expect(() => JSON.parse("{nope")).toThrow());' }
      }
    },

    {
      id: 'test-3', title: 'TDD: red, green, refactor', level: 1, minutes: 14,
      blocks: [
        { t: 'p', html: '<b>Test-Driven Development</b> flips the order: write the test FIRST, watch it fail, then write just enough code to pass. The loop has a chant:' },
        { t: 'ol', items: [
          '<b>🔴 Red</b> — write a small test for behavior that doesn\'t exist yet. Run it. It fails (good! it proves the test actually tests something).',
          '<b>🟢 Green</b> — write the simplest code that makes it pass. Not elegant. Just passing.',
          '<b>🔵 Refactor</b> — now clean up the code, with the tests standing guard. Repeat.'
        ] },
        { t: 'p', html: 'Watch it build a password validator, one requirement at a time:' },
        { t: 'code', lang: 'js', code: '// RED: the first requirement, as a test\ntest("rejects passwords under 8 chars", () => {\n  expect(validate("short")).toBe(false);\n});\n// -> ❌ validate is not defined. Perfect. Now GREEN:\n\nfunction validate(pw) {\n  return pw.length >= 8;      // simplest thing that passes\n}\n\n// RED again: next requirement\ntest("requires a digit", () => {\n  expect(validate("longenough")).toBe(false);\n});\n// -> ❌ fails. GREEN: add the rule. Repeat forever.' },
        { t: 'p', html: 'Why work this way? Because it forces three good things: you define "done" before you start (the test IS the spec), you only write code a test demands (no gold-plating), and you end every feature with a full safety net already in place.' },
        { t: 'tip', html: 'TDD\'s dirty secret: nobody does it 100% of the time. But for tricky logic — parsers, calculators, game rules, anything with edge cases — test-first is dramatically faster than debug-later. Try it on the challenge below and feel the rhythm.' }
      ],
      tryIt: {
        mode: 'js',
        code: 'let passed = 0, failed = 0;\nfunction test(name, fn) {\n  try { fn(); passed++; console.log(`✅ ${name}`); }\n  catch (err) { failed++; console.error(`❌ ${name} — ${err.message}`); }\n}\nfunction expect(a) { return { toBe(e) {\n  if (a !== e) throw new Error(`expected ${e}, got ${a}`);\n}}; }\n\n// ===== TDD an isValidUsername(name) function =====\n// The tests are written (RED). Make them pass (GREEN), one at a time:\n\nfunction isValidUsername(name) {\n  return false;   // start from nothing - let the tests pull the code out of you\n}\n\ntest("accepts simple names", () => expect(isValidUsername("sam_dev")).toBe(true));\ntest("rejects under 3 chars", () => expect(isValidUsername("ab")).toBe(false));\ntest("rejects over 15 chars", () => expect(isValidUsername("this_is_way_too_long")).toBe(false));\ntest("rejects spaces", () => expect(isValidUsername("sam dev")).toBe(false));\ntest("accepts digits and underscores", () => expect(isValidUsername("agent_007")).toBe(true));\n\nconsole.log(`\\n${passed} passed, ${failed} failed`);'
      },
      quiz: [
        { q: 'In TDD, a new test failing first is…', options: ['A mistake', 'The point — it proves the test really tests something missing', 'Skipped', 'A compiler bug'], a: 1, why: 'A test that passes before you write the code was testing nothing.' },
        { q: 'The GREEN step\'s rule is…', options: ['Write the final elegant version', 'Write the SIMPLEST code that passes — cleanup comes in refactor', 'Add extra features', 'Delete failing tests'], a: 1, why: 'Speed to green, then improve safely under the tests\' protection.' },
        { q: 'TDD shines most for…', options: ['One-off scripts', 'Logic with edge cases: parsers, validators, game rules, calculators', 'CSS styling', 'Writing README files'], a: 1, why: 'Where edge cases breed, test-first beats debug-later decisively.' }
      ],
      challenge: {
        text: 'Full TDD cycle from scratch: write tests FIRST for <code>romanNumeral(n)</code> handling 1→"I", 4→"IV", 9→"IX", 14→"XIV" — watch them fail — then implement until green. (This kata is a rite of passage.)',
        hints: ['Greedy approach: walk pairs [[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]], subtracting while n allows.'],
        solution: { lang: 'js', code: 'function romanNumeral(n) {\n  const table = [[10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];\n  let out = "";\n  for (const [value, glyph] of table) {\n    while (n >= value) { out += glyph; n -= value; }\n  }\n  return out;\n}\n\ntest("1 is I", () => expect(romanNumeral(1)).toBe("I"));\ntest("4 is IV", () => expect(romanNumeral(4)).toBe("IV"));\ntest("9 is IX", () => expect(romanNumeral(9)).toBe("IX"));\ntest("14 is XIV", () => expect(romanNumeral(14)).toBe("XIV"));' }
      }
    },

    {
      id: 'test-4', title: 'Testing in the real world', level: 2, minutes: 12,
      blocks: [
        { t: 'p', html: 'Your hand-rolled runner taught the mechanics; real projects use frameworks that add file discovery, watch modes, rich matchers and reports. The two you\'ll meet everywhere:' },
        { t: 'code', lang: 'js', code: '// JavaScript: Jest (or Vitest - same API, faster)\n// file: tip.test.js  -  run with: npx jest\ntest("tip defaults to 15%", () => {\n  expect(tip(100)).toBe(15);\n});\ntest("rejects negative bills", () => {\n  expect(() => tip(-5)).toThrow();\n});' },
        { t: 'code', lang: 'python', code: '# Python: pytest  -  run with: pytest\n# file: test_tip.py  -  functions starting with test_ are found automatically\ndef test_default_tip():\n    assert tip(100) == 15\n\ndef test_rejects_negative():\n    with pytest.raises(ValueError):\n        tip(-5)' },
        { t: 'p', html: 'Both look exactly like what you built — that was the plan. The remaining vocabulary of professional testing:' },
        { t: 'table', head: ['Term', 'Meaning'], rows: [
          ['Unit test', 'tests one function/class in isolation — fast, thousands of them'],
          ['Integration test', 'tests pieces working together (code + real database)'],
          ['End-to-end (E2E)', 'drives the whole app like a user (click, type, assert the screen)'],
          ['Mock / stub', 'a fake stand-in for something slow or external ("pretend the API returned this")'],
          ['Coverage', '% of code lines your tests execute — useful signal, terrible target'],
          ['CI', 'Continuous Integration: a server runs your suite on every git push, automatically']
        ] },
        { t: 'p', html: 'The pro workflow ties your Toolbox skills together: push code to GitHub → GitHub Actions (CI) runs the tests → a red ❌ or green ✅ appears on the pull request → nothing broken gets merged. Tests + git + CI is the tripod modern software stands on.' },
        { t: 'tip', html: 'How much to test? The honest heuristic: test the code you\'d be scared to change. Money math, parsing, game rules: heavily. Glue code and styling: lightly or not at all. 🎓 <b>Track complete</b> — now go earn green checkmarks in the Practice section.' }
      ],
      tryIt: {
        mode: 'js',
        code: '// Mocking, demystified: test code that depends on something external.\nlet passed = 0, failed = 0;\nfunction test(name, fn) {\n  try { fn(); passed++; console.log(`✅ ${name}`); }\n  catch (err) { failed++; console.error(`❌ ${name} — ${err.message}`); }\n}\nfunction expect(a) { return { toBe(e) {\n  if (a !== e) throw new Error(`expected ${e}, got ${a}`);\n}}; }\n\n// This function depends on the CLOCK - untestable... or is it?\nfunction greeting(getHour) {\n  const h = getHour();\n  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";\n}\n\n// In real life: greeting(() => new Date().getHours())\n// In tests: hand it a FAKE clock - a mock!\ntest("morning at 9", () => expect(greeting(() => 9)).toBe("Good morning"));\ntest("afternoon at 14", () => expect(greeting(() => 14)).toBe("Good afternoon"));\ntest("evening at 20", () => expect(greeting(() => 20)).toBe("Good evening"));\ntest("noon boundary", () => expect(greeting(() => 12)).toBe("Good afternoon"));\n\nconsole.log(`\\n${passed} passed, ${failed} failed`);\n// The trick: the dependency is a PARAMETER, so tests control it.'
      },
      quiz: [
        { q: 'A mock is…', options: ['A broken test', 'A controllable fake standing in for something slow or external', 'An insult', 'A CI server'], a: 1, why: 'Real clock, network, database → fake versions your tests fully control.' },
        { q: 'CI (Continuous Integration) means…', options: ['Coding continuously', 'A server automatically runs your test suite on every push', 'Merging without review', 'Daily standups'], a: 1, why: 'The red-✗/green-✓ on GitHub pull requests — the suite as a gatekeeper.' },
        { q: '100% coverage as a goal is…', options: ['Mandatory', 'A trap — a useful signal but a terrible target; test what\'s scary to change', 'Impossible', 'Only for Python'], a: 1, why: 'Chasing the number breeds meaningless tests. Risk-based judgment beats metrics.' }
      ],
      challenge: {
        text: 'The mock pattern, applied: write <code>rollDice(random)</code> that takes a random-function parameter and returns 1-6. Test all boundaries with mocks: random()=0 → 1, random()=0.999 → 6. Then use it "for real" with Math.random.',
        hints: ['Math.floor(random() * 6) + 1 — mock random with () => 0 and () => 0.999.'],
        solution: { lang: 'js', code: 'function rollDice(random) {\n  return Math.floor(random() * 6) + 1;\n}\n\ntest("minimum roll is 1", () => expect(rollDice(() => 0)).toBe(1));\ntest("maximum roll is 6", () => expect(rollDice(() => 0.999)).toBe(6));\ntest("mid roll", () => expect(rollDice(() => 0.5)).toBe(4));\n\nconsole.log("Real roll:", rollDice(Math.random));' }
      }
    }
  ]
};
