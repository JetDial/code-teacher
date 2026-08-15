/* ============================================================
   Language Atlas — a guided tour of every language you're
   likely to meet in real software. Each entry: what it is,
   what it looks like, what's built with it, and how to start.
   Shape: { id, name, icon, year, creator, tagline, pitch,
            uses[], famous[], facts[[k,v]], samples[{title,lang,code,output}],
            firstSteps[], related[], quiz[] }
   ============================================================ */
window.CT_ATLAS = [

  {
    id: 'ts', name: 'TypeScript', icon: 'TS', year: 2012, creator: 'Microsoft (Anders Hejlsberg)',
    tagline: 'JavaScript with a seatbelt: types that catch bugs before you run.',
    pitch: 'TypeScript IS JavaScript — every JS program is valid TS — plus optional type annotations that let tools catch mistakes as you type instead of when users click. It compiles down to plain JavaScript, so it runs everywhere JS runs. Most large JavaScript codebases today are actually TypeScript, which means your JS track knowledge is 90% of the way there.',
    uses: ['Large web apps', 'React / Vue / Angular work', 'Node.js backends', 'Any serious JS codebase'],
    famous: ['VS Code', 'Slack\'s desktop app', 'Angular (built in it)', 'Most of the modern npm ecosystem'],
    facts: [
      ['Typing', 'static, optional — types vanish at runtime'],
      ['Runs on', 'anywhere JavaScript runs (after compiling)'],
      ['Package manager', 'npm — shared with JavaScript'],
      ['Learn it HERE', 'TypeScript has a full interactive track on this site — see the buttons below'],
      ['File extension', '.ts (.tsx with React)']
    ],
    samples: [
      { title: 'JavaScript you already know, now with types', lang: 'ts',
        code: 'function tip(bill: number, percent: number = 15): number {\n  return bill * (percent / 100);\n}\n\nconst names: string[] = ["Ada", "Sam"];\n\ntip(60);        // fine\ntip("sixty");   // caught BEFORE running:',
        output: 'error TS2345: Argument of type \'string\' is not\nassignable to parameter of type \'number\'.' },
      { title: 'The signature feature: describing data shapes', lang: 'ts',
        code: 'interface Player {\n  name: string;\n  level: number;\n  guild?: string;        // ? = optional\n}\n\nfunction promote(p: Player): Player {\n  return { ...p, level: p.level + 1 };\n}\n\nconst sam: Player = { name: "Sam", level: 12 };\nconsole.log(promote(sam));',
        output: '{ name: "Sam", level: 13 }' }
    ],
    firstSteps: [
      'Take the full <b>TypeScript track</b> on this site — 8 interactive lessons with the real compiler running in your browser.',
      'Finish the JavaScript track first if you haven\'t — TypeScript is JS plus annotations.',
      'Try it instantly, zero install, at typescriptlang.org/play — paste JS, add types, watch errors light up.',
      'Rule of thumb: start by typing your function parameters — that alone catches most bugs.'
    ],
    related: ['ts', 'js'],
    quiz: [
      { q: 'What happens to TypeScript\'s types when the program runs?', options: ['They\'re checked on every line', 'They\'re erased — the browser runs plain JavaScript', 'They slow it down', 'They become comments'], a: 1, why: 'Types exist for the compiler and editor; the output is ordinary JS.' },
      { q: 'Valid JavaScript is…', options: ['Invalid TypeScript', 'Valid TypeScript', 'Only valid with types added', 'Compiled from TypeScript'], a: 1, why: 'TS is a superset — JS code is TS code, and you add types gradually.' },
      { q: '<code>guild?: string</code> in an interface means…', options: ['guild is a question', 'guild is optional', 'guild is private', 'guild can be any type'], a: 1, why: 'The ? marks optional properties — objects without it still fit the shape.' }
    ]
  },

  {
    id: 'java', name: 'Java', icon: '☕', year: 1995, creator: 'James Gosling at Sun Microsystems',
    tagline: '"Write once, run anywhere" — the enterprise & Android veteran.',
    pitch: 'Java compiles to bytecode that runs on the Java Virtual Machine (JVM), so the same program runs on any OS. It\'s strongly object-oriented — everything lives in a class — verbose but explicit, and it powers an enormous share of corporate backends, banks, and Android apps. Learning it teaches you discipline that transfers everywhere.',
    uses: ['Enterprise backends', 'Android apps (with Kotlin)', 'Big data tools (Hadoop, Kafka)', 'Banking systems'],
    famous: ['Minecraft (Java Edition)', 'Android\'s foundations', 'Netflix & LinkedIn backends', 'Apache Kafka'],
    facts: [
      ['Typing', 'static, strict — every variable declares its type'],
      ['Runs on', 'the JVM — install once, run any Java program'],
      ['Package manager', 'Maven / Gradle'],
      ['Closest relative here', 'JavaScript syntax-wise (braces), Python concept-wise (classes)'],
      ['File extension', '.java']
    ],
    samples: [
      { title: 'Hello, ceremony and all', lang: 'java',
        code: 'public class Main {\n    public static void main(String[] args) {\n        String name = "world";\n        for (int i = 1; i <= 3; i++) {\n            System.out.println("Hello, " + name + "! (" + i + ")");\n        }\n    }\n}',
        output: 'Hello, world! (1)\nHello, world! (2)\nHello, world! (3)' },
      { title: 'Classes are the whole game', lang: 'java',
        code: 'class Pet {\n    private String name;\n\n    Pet(String name) { this.name = name; }\n\n    void speak() {\n        System.out.println(name + " says: Woof!");\n    }\n}\n\n// in main:  new Pet("Rex").speak();',
        output: 'Rex says: Woof!' }
    ],
    firstSteps: [
      'Install a JDK (Java Development Kit) — Adoptium.net is the friendly source.',
      'Save code as Main.java, run `javac Main.java` then `java Main` — or let the IntelliJ IDEA editor (free Community edition) do everything.',
      'Everything you learned about classes in the Python track maps straight across: __init__ becomes a constructor, self becomes this.',
      'Modern note: new JVM projects increasingly start in Kotlin (see its Atlas page) — but Java skills read both.'
    ],
    related: ['python', 'js'],
    quiz: [
      { q: 'What makes Java "write once, run anywhere"?', options: ['It\'s interpreted', 'It compiles to JVM bytecode, and JVMs exist for every OS', 'It only runs on Windows', 'The cloud'], a: 1, why: 'The virtual machine is the portable layer — your program targets it, not the OS.' },
      { q: 'In Java, code lives…', options: ['Anywhere in the file', 'Inside classes — even main() belongs to one', 'In HTML script tags', 'In notebooks'], a: 1, why: 'Java is class-first: the file structure mirrors the class structure.' },
      { q: 'Java vs JavaScript:', options: ['Same language, short name', 'Completely different languages with a marketing-era name collision', 'JS compiles to Java', 'Java runs in browsers today'], a: 1, why: 'The 1995 name was marketing. Ham vs hamster.' }
    ]
  },

  {
    id: 'c', name: 'C', icon: 'C', year: 1972, creator: 'Dennis Ritchie at Bell Labs',
    tagline: 'The ancestor: closest to the metal, and inside everything.',
    pitch: 'C is the language operating systems, and most other languages, are built with. It gives you raw control — you manage memory yourself, and nothing protects you from mistakes — in exchange for maximum speed and minimum footprint. Python\'s interpreter, Linux, and the firmware in your keyboard are all C. Learning some C is learning what computers actually do.',
    uses: ['Operating systems', 'Embedded devices & firmware', 'Language runtimes (Python is written in C!)', 'Anything where every byte counts'],
    famous: ['Linux & Windows kernels', 'Git', 'SQLite (your SQL track runs on it)', 'CPython'],
    facts: [
      ['Typing', 'static, weak — you declare types, and can subvert them'],
      ['Memory', 'manual — you allocate and free it yourself (the famous foot-gun)'],
      ['Compiles to', 'native machine code, no runtime needed'],
      ['Age', '50+ years old and still top-5 in usage'],
      ['File extension', '.c (headers: .h)']
    ],
    samples: [
      { title: 'Hello, with all the bolts showing', lang: 'c',
        code: '#include <stdio.h>\n\nint main(void) {\n    int scores[3] = {88, 95, 73};\n    int total = 0;\n\n    for (int i = 0; i < 3; i++) {\n        total += scores[i];\n    }\n    printf("Average: %d\\n", total / 3);\n    return 0;\n}',
        output: 'Average: 85' },
      { title: 'The famous part: pointers (variables holding addresses)', lang: 'c',
        code: 'int hp = 100;\nint *ptr = &hp;      // ptr holds the ADDRESS of hp\n\n*ptr = 25;           // write through the pointer...\nprintf("%d\\n", hp);  // ...and hp itself changed',
        output: '25' }
    ],
    firstSteps: [
      'Install GCC (Linux/Mac: usually present; Windows: install "MSYS2" or use WSL).',
      'Save hello.c, compile with `gcc hello.c -o hello`, run `./hello` — that two-step compile/run rhythm is the C experience.',
      'Read "The C Programming Language" by Kernighan & Ritchie — 50 years old, still the best-written programming book ever.',
      'Fair warning: strings and memory management are genuinely hard. That difficulty is the lesson — every language you know is protecting you from this.'
    ],
    related: ['python'],
    quiz: [
      { q: 'Why does C remain everywhere after 50 years?', options: ['Nostalgia', 'Maximum speed and control with no runtime — ideal for OSes and devices', 'It\'s easiest to learn', 'Legal requirements'], a: 1, why: 'Nothing between your code and the hardware — that niche never went away.' },
      { q: 'A pointer is…', options: ['A function', 'A variable holding a memory address', 'A type of loop', 'A compiler'], a: 1, why: 'Pointers let C pass around locations instead of copies — powerful and dangerous.' },
      { q: 'What language is Python\'s main interpreter written in?', options: ['Python', 'Java', 'C', 'Rust'], a: 2, why: 'CPython — like most language runtimes, it\'s C underneath.' }
    ]
  },

  {
    id: 'cpp', name: 'C++', icon: 'C++', year: 1985, creator: 'Bjarne Stroustrup',
    tagline: 'C with superpowers: the engine room of games and high performance.',
    pitch: 'C++ took C and added classes, generics and a giant standard library while keeping the raw speed. It\'s the language of game engines, browsers, trading systems and 3D software — anywhere you need C-level performance AND large-scale structure. It is famously huge; working programmers use a comfortable subset.',
    uses: ['Game engines & AAA games', 'Browsers & desktop apps', 'High-frequency trading', 'Robotics, graphics, ML cores'],
    famous: ['Unreal Engine', 'Chrome & Firefox', 'Photoshop', 'PyTorch\'s core'],
    facts: [
      ['Typing', 'static, strong-ish, with templates (generics)'],
      ['Memory', 'manual OR automatic via "smart pointers" — modern C++ mostly avoids raw new/delete'],
      ['Compiles to', 'native machine code'],
      ['Relationship to C', 'a (mostly) superset — C code usually compiles as C++'],
      ['File extension', '.cpp (headers: .h / .hpp)']
    ],
    samples: [
      { title: 'Familiar bones, richer toolbox', lang: 'cpp',
        code: '#include <iostream>\n#include <vector>\n#include <algorithm>\n\nint main() {\n    std::vector<int> scores = {88, 95, 73, 60};\n    std::sort(scores.begin(), scores.end());\n\n    for (int s : scores) {\n        std::cout << s << " ";\n    }\n    std::cout << "\\n";\n}',
        output: '60 73 88 95' },
      { title: 'Classes, C++ style', lang: 'cpp',
        code: 'class Pet {\npublic:\n    Pet(std::string name) : name(name) {}\n    void speak() {\n        std::cout << name << " says: Meow!\\n";\n    }\nprivate:\n    std::string name;\n};\n\n// Pet("Waffles").speak();',
        output: 'Waffles says: Meow!' }
    ],
    firstSteps: [
      'Install a compiler: g++ (with GCC) or Visual Studio Community on Windows (the full IDE, free).',
      'Compile with `g++ hello.cpp -o hello`, run `./hello`.',
      'Learn "modern C++" (C++17 or newer) from the start: std::vector over raw arrays, std::string over char*, smart pointers over new/delete.',
      'If games are your goal: Unreal Engine uses C++, Godot offers it, and learncpp.com is the free course everyone recommends.'
    ],
    related: ['js'],
    quiz: [
      { q: 'C++\'s core pitch is…', options: ['Simplicity', 'C-level speed plus large-scale structure (classes, templates, std library)', 'Running in browsers', 'Replacing SQL'], a: 1, why: 'Performance without giving up abstraction — why engines and browsers choose it.' },
      { q: '<code>std::vector</code> is C++\'s…', options: ['Math type', 'Growable array (like a JS array / Python list)', 'Pointer', 'Game engine'], a: 1, why: 'The everyday container — dynamic, bounds-managed, fast.' },
      { q: 'Modern C++ style prefers…', options: ['Raw new/delete everywhere', 'Smart pointers and containers that manage memory for you', 'No functions', 'Global variables'], a: 1, why: 'The last decade of C++ is about making the fast language also safe-by-default.' }
    ]
  },

  {
    id: 'csharp', name: 'C#', icon: 'C#', year: 2000, creator: 'Microsoft (Anders Hejlsberg)',
    tagline: 'The polished all-rounder — and the language of Unity games.',
    pitch: 'C# ("C sharp") is Microsoft\'s flagship: a clean, modern, garbage-collected language that took Java\'s ideas and kept improving them. It runs on .NET across every OS. For learners its killer app is Unity — the engine behind half the indie games you\'ve played — where all game scripting is C#.',
    uses: ['Unity games', 'Windows & cross-platform apps', 'Enterprise backends (.NET)', 'VR/AR development'],
    famous: ['Hollow Knight & Cuphead (Unity)', 'Stack Overflow\'s backend', 'Most Windows business software'],
    facts: [
      ['Typing', 'static, strong, with excellent inference (var)'],
      ['Memory', 'garbage-collected — no manual management'],
      ['Runs on', '.NET — Windows, Mac, Linux, mobile via MAUI'],
      ['Closest relative', 'Java (same family), TypeScript (same designer!)'],
      ['File extension', '.cs']
    ],
    samples: [
      { title: 'Clean and modern', lang: 'csharp',
        code: 'var scores = new List<int> { 88, 95, 73, 60 };\n\nvar passing = scores.Where(s => s >= 70)\n                    .OrderByDescending(s => s)\n                    .ToList();\n\nConsole.WriteLine(string.Join(", ", passing));',
        output: '95, 88, 73' },
      { title: 'What Unity scripting looks like', lang: 'csharp',
        code: 'public class PlayerController : MonoBehaviour {\n    public float speed = 5f;\n\n    void Update() {\n        float move = Input.GetAxis("Horizontal");\n        transform.Translate(move * speed * Time.deltaTime, 0, 0);\n    }\n}',
        output: '// (runs every frame - moves the player left/right)' }
    ],
    firstSteps: [
      'Install the .NET SDK from dotnet.microsoft.com, then `dotnet new console` + `dotnet run` gives you a running program in a minute.',
      'For games: install Unity Hub + Unity, do their free "Roll-a-Ball" tutorial — you\'ll write real C# on day one.',
      'That Where/OrderBy chain is LINQ — C#\'s beloved map/filter system. Your JS array-methods knowledge transfers directly.',
      'VS Code or Visual Studio Community both work great, free.'
    ],
    related: ['js', 'ai'],
    quiz: [
      { q: 'The game engine scripted entirely in C# is…', options: ['Unreal', 'Unity', 'Godot only', 'Source'], a: 1, why: 'Unity = C#. It\'s many people\'s entire reason for learning the language.' },
      { q: 'C# memory management is…', options: ['Manual like C', 'Garbage-collected — the runtime frees unused memory', 'Nonexistent', 'Done by Windows'], a: 1, why: 'Like Java, Python and JS: you create objects, the GC cleans up.' },
      { q: 'C# and TypeScript share…', options: ['A runtime', 'Their lead designer, Anders Hejlsberg', 'A file extension', 'Nothing'], a: 1, why: 'Same architect — which is why their type systems feel like cousins.' }
    ]
  },

  {
    id: 'go', name: 'Go', icon: 'Go', year: 2009, creator: 'Google (Pike, Thompson, Griesemer)',
    tagline: 'Radically simple, built for servers and the cloud.',
    pitch: 'Go (or Golang) was designed at Google to be the opposite of complex: a tiny language you can learn in a weekend, that compiles instantly to a single fast binary, with concurrency (doing many things at once) built into its bones. It became the language of cloud infrastructure — the tools that run the internet\'s plumbing are overwhelmingly Go.',
    uses: ['Cloud & DevOps tooling', 'Web services & APIs', 'Network programs', 'Command-line tools'],
    famous: ['Docker', 'Kubernetes', 'Terraform', 'Caddy & much of the cloud stack'],
    facts: [
      ['Typing', 'static, strong, inferred with :='],
      ['Compiles to', 'one self-contained native binary — deployment is "copy the file"'],
      ['Signature feature', 'goroutines — lightweight threads, trivially cheap'],
      ['Philosophy', 'deliberately small: one obvious way to do things'],
      ['File extension', '.go']
    ],
    samples: [
      { title: 'Small and direct', lang: 'go',
        code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    scores := []int{88, 95, 73}\n    total := 0\n    for _, s := range scores {\n        total += s\n    }\n    fmt.Println("Average:", total/len(scores))\n}',
        output: 'Average: 85' },
      { title: 'The famous part: goroutines (easy concurrency)', lang: 'go',
        code: 'func fetch(name string, ch chan string) {\n    // imagine a slow network call here\n    ch <- name + " done"\n}\n\nfunc main() {\n    ch := make(chan string)\n    go fetch("users", ch)      // "go" = run concurrently\n    go fetch("orders", ch)\n    fmt.Println(<-ch, "/", <-ch)\n}',
        output: 'users done / orders done   (order may vary!)' }
    ],
    firstSteps: [
      'Install from go.dev, then `go run hello.go` — no build config, ever.',
      'The official "A Tour of Go" (tour.golang.org) runs in the browser and is genuinely one of the best language intros anywhere.',
      'Go has strong opinions: it formats your code itself (gofmt) and refuses to compile unused variables. Lean into it.',
      'Natural first project: a tiny web API — Go\'s standard library serves HTTP out of the box.'
    ],
    related: ['python', 'js'],
    quiz: [
      { q: 'Go\'s design philosophy is…', options: ['Maximum features', 'Deliberate simplicity — small language, one obvious way', 'Visual programming', 'Backwards compatibility with C'], a: 1, why: 'It omits features on purpose so all Go code looks alike and reads fast.' },
      { q: 'Docker and Kubernetes are written in…', options: ['Python', 'Rust', 'Go', 'Java'], a: 2, why: 'Go dominates cloud infrastructure tooling.' },
      { q: 'A goroutine is…', options: ['A Go loop', 'A lightweight concurrent task started with the go keyword', 'A package', 'An error type'], a: 1, why: 'You can launch thousands cheaply — concurrency as a first-class citizen.' }
    ]
  },

  {
    id: 'rust', name: 'Rust', icon: 'Rs', year: 2015, creator: 'Mozilla (Graydon Hoare)',
    tagline: 'C++-level speed with memory safety proven at compile time.',
    pitch: 'Rust\'s big idea: the compiler mathematically verifies your program can\'t have entire categories of crashes and security bugs (the memory errors that plague C/C++) — before it runs, with zero runtime cost. The "borrow checker" that enforces this is famously strict; Rust programmers describe arguing with it, losing, and slowly realizing it was right. Most-loved language in developer surveys for years running.',
    uses: ['Systems & performance-critical code', 'WebAssembly', 'CLI tools', 'Safety-critical software'],
    famous: ['Firefox internals', 'Linux kernel drivers (first non-C language admitted!)', 'Discord & Cloudflare services', 'ripgrep'],
    facts: [
      ['Typing', 'static, strong, heavily inferred'],
      ['Memory', 'no garbage collector AND no manual free — ownership rules, checked at compile time'],
      ['Signature feature', 'the borrow checker: each value has one owner'],
      ['Learning curve', 'steep start, famously worth it'],
      ['File extension', '.rs']
    ],
    samples: [
      { title: 'Expressive and fast', lang: 'rust',
        code: 'fn main() {\n    let scores = vec![88, 95, 73, 60];\n\n    let passing: Vec<i32> = scores.iter()\n        .filter(|&&s| s >= 70)\n        .cloned()\n        .collect();\n\n    println!("Passing: {:?}", passing);\n}',
        output: 'Passing: [88, 95, 73]' },
      { title: 'The famous part: ownership', lang: 'rust',
        code: 'let name = String::from("Waffles");\nlet owner = name;          // ownership MOVES to owner\n\nprintln!("{}", name);      // compile error - name gave it away:',
        output: 'error[E0382]: borrow of moved value: `name`\n(The compiler caught a use-after-move BEFORE running -\n in C++ this same pattern is a silent bug.)' }
    ],
    firstSteps: [
      'Install via rustup.rs — one command sets up everything, then `cargo new hello && cargo run`.',
      'Read "The Rust Book" (doc.rust-lang.org/book) — free, official, excellent.',
      'Expect the borrow checker to reject your first programs. Each rejection is a real bug class you didn\'t know you were writing.',
      'Come to Rust after C or C++ if you can — you\'ll understand what it\'s protecting you from.'
    ],
    related: ['js'],
    quiz: [
      { q: 'Rust prevents memory bugs by…', options: ['A garbage collector', 'Compile-time ownership rules — no runtime cost', 'Running slower', 'Banning pointers'], a: 1, why: 'The borrow checker proves safety statically: C-speed with guarantees.' },
      { q: 'The historic first non-C language accepted into the Linux kernel:', options: ['Go', 'C++', 'Rust', 'Zig'], a: 2, why: 'A landmark endorsement of Rust for the most safety-critical code there is.' },
      { q: 'When ownership of a value moves in Rust, the old variable…', options: ['Keeps a copy', 'Can no longer be used — the compiler enforces it', 'Becomes null', 'Crashes at runtime'], a: 1, why: 'One owner at a time. Use-after-move is a compile error, not a mystery crash.' }
    ]
  },

  {
    id: 'ruby', name: 'Ruby', icon: 'Rb', year: 1995, creator: 'Yukihiro "Matz" Matsumoto',
    tagline: 'Optimized for programmer happiness — the joy-first language.',
    pitch: 'Ruby was designed around a radical metric: how nice it feels to write. Everything is an object, the syntax reads like prose, and the Rails framework (2004) made it the fastest way to build a web startup — GitHub, Shopify and Airbnb all began as Rails apps. Less dominant now, but Rails remains a one-person-army superpower.',
    uses: ['Web apps (Ruby on Rails)', 'Startups & MVPs', 'Scripting & automation', 'DevOps tooling (Chef, Homebrew)'],
    famous: ['GitHub', 'Shopify', 'Airbnb (originally)', 'Homebrew'],
    facts: [
      ['Typing', 'dynamic, strong'],
      ['Philosophy', '"Ruby is designed to make programmers happy" — Matz'],
      ['Killer app', 'Ruby on Rails — database to webpage in minutes'],
      ['Closest relative here', 'Python — similar niche, curlier syntax'],
      ['File extension', '.rb']
    ],
    samples: [
      { title: 'Reads like a sentence', lang: 'ruby',
        code: 'scores = [88, 95, 73, 60]\n\npassing = scores.select { |s| s >= 70 }.sort.reverse\n\nputs "Passing: #{passing.join(", ")}"\n\n3.times { |i| puts "Hip hip #{i + 1}!" }',
        output: 'Passing: 95, 88, 73\nHip hip 1!\nHip hip 2!\nHip hip 3!' },
      { title: 'Everything is an object — even numbers', lang: 'ruby',
        code: 'puts 5.even?\nputs -42.abs\nputs "waffle".capitalize.reverse\n\nclass Pet\n  def initialize(name) = @name = name\n  def speak = puts "#{@name} says hi!"\nend\n\nPet.new("Waffles").speak',
        output: 'false\n42\nelffaW\nWaffles says hi!' }
    ],
    firstSteps: [
      'Mac has Ruby preinstalled; elsewhere install from ruby-lang.org, then `ruby hello.rb`.',
      'Play in irb (interactive Ruby) — like the browser console, but Ruby.',
      'If web apps call you: the free Rails tutorial at guides.rubyonrails.org builds a real app fast.',
      'Coming from Python: select is filter, blocks { } are lambdas everywhere, and #{} is the f-string.'
    ],
    related: ['python'],
    quiz: [
      { q: 'Ruby\'s explicit design goal was…', options: ['Maximum speed', 'Programmer happiness', 'Browser scripting', 'Replacing C'], a: 1, why: 'Matz optimized for the human. The syntax joy is the feature.' },
      { q: 'Ruby on Rails is…', options: ['A train simulator', 'The web framework that made Ruby famous', 'Ruby\'s compiler', 'A testing tool'], a: 1, why: 'Rails\' conventions turned database-backed websites into a days-not-months job.' },
      { q: 'GitHub was originally built with…', options: ['PHP', 'Java', 'Ruby on Rails', 'Go'], a: 2, why: 'One of the great Rails success stories, alongside Shopify.' }
    ]
  },

  {
    id: 'php', name: 'PHP', icon: 'php', year: 1995, creator: 'Rasmus Lerdorf',
    tagline: 'The web\'s workhorse — quietly serving most of the internet.',
    pitch: 'PHP was born to generate web pages and never stopped: it still runs a colossal share of the web, because WordPress (PHP) powers roughly 40% of all websites. Mocked for its messy early years, modern PHP (8+) with the Laravel framework is genuinely pleasant — and PHP jobs are everywhere.',
    uses: ['WordPress themes & plugins', 'Web backends', 'E-commerce (WooCommerce, Magento)', 'Server-rendered sites'],
    famous: ['WordPress', 'Wikipedia', 'Facebook (originally)', 'Slack\'s backend (still partly)'],
    facts: [
      ['Typing', 'dynamic, with optional type declarations in modern PHP'],
      ['Natural habitat', 'embedded in HTML on a server'],
      ['Variables', 'all start with $ — unmissable'],
      ['Modern framework', 'Laravel — PHP\'s Rails'],
      ['File extension', '.php']
    ],
    samples: [
      { title: 'HTML with logic inside — PHP\'s original trick', lang: 'php',
        code: '<h1>Menu</h1>\n<?php\n  $dishes = ["Pancakes" => 5, "Waffles" => 9];\n\n  foreach ($dishes as $name => $price) {\n    echo "<p>$name costs \\$$price</p>";\n  }\n?>',
        output: '<h1>Menu</h1>\n<p>Pancakes costs $5</p>\n<p>Waffles costs $9</p>' },
      { title: 'Modern PHP is a real language', lang: 'php',
        code: 'function tip(float $bill, int $percent = 15): float {\n    return $bill * $percent / 100;\n}\n\n$scores = [88, 95, 73];\n$passing = array_filter($scores, fn($s) => $s >= 80);\n\necho tip(60.0) . "\\n";\nprint_r($passing);',
        output: '9\nArray ( [0] => 88 [1] => 95 )' }
    ],
    firstSteps: [
      'Easiest start: install XAMPP (Apache + PHP + MySQL in one) and drop .php files into its htdocs folder.',
      'The pattern to internalize: browser requests page → PHP runs on the server → HTML comes back. View-source shows only the output.',
      'If you use WordPress: your theme\'s functions.php is real PHP — tweaking it is a gentle, practical entry.',
      'For serious apps, learn Laravel — laracasts.com is the beloved tutorial site.'
    ],
    related: ['html', 'sql'],
    quiz: [
      { q: 'Roughly what share of websites run WordPress (PHP)?', options: ['4%', '15%', '40%', '90%'], a: 2, why: 'Which makes PHP arguably the most-served language on the web.' },
      { q: 'PHP code runs…', options: ['In the browser', 'On the server, before the page is sent', 'In the database', 'At compile time'], a: 1, why: 'The browser only ever sees the HTML that PHP produced.' },
      { q: 'Every PHP variable starts with…', options: ['@', '#', '$', '&'], a: 2, why: '$name, $price, $_POST — the dollar sign is PHP\'s signature.' }
    ]
  },

  {
    id: 'swift', name: 'Swift', icon: 'Sw', year: 2014, creator: 'Apple (Chris Lattner)',
    tagline: 'The language of iPhones, iPads and everything Apple.',
    pitch: 'Swift replaced the aging Objective-C as Apple\'s language: fast, modern, safe (optionals make "null" mistakes explicit) and surprisingly friendly. If you want to ship an iOS app, this is the road. SwiftUI, its interface framework, lets you describe screens declaratively and preview them live.',
    uses: ['iPhone & iPad apps', 'Mac apps', 'Apple Watch & TV', 'Server-side (niche but real)'],
    famous: ['Every modern iOS app', 'Apple\'s own apps', 'Airbnb & Uber\'s iOS clients'],
    facts: [
      ['Typing', 'static, strong, inferred'],
      ['Signature feature', 'optionals — the type system tracks "might be missing"'],
      ['UI framework', 'SwiftUI — declarative, live-previewed'],
      ['Requirement', 'a Mac with Xcode for iOS development'],
      ['File extension', '.swift']
    ],
    samples: [
      { title: 'Modern and tidy', lang: 'swift',
        code: 'let scores = [88, 95, 73, 60]\n\nlet passing = scores.filter { $0 >= 70 }.sorted(by: >)\n\nprint("Passing: \\(passing)")\n\nfor (i, s) in passing.enumerated() {\n    print("#\\(i + 1): \\(s)")\n}',
        output: 'Passing: [95, 88, 73]\n#1: 95\n#2: 88\n#3: 73' },
      { title: 'The famous part: optionals', lang: 'swift',
        code: 'var nickname: String? = nil      // ? = might be absent\n\n// You CANNOT use it without addressing that:\nif let name = nickname {\n    print("Hi, \\(name)!")\n} else {\n    print("No nickname set.")\n}\n\nprint(nickname ?? "anonymous")   // ?? = fallback',
        output: 'No nickname set.\nanonymous' }
    ],
    firstSteps: [
      'On a Mac: install Xcode from the App Store — it includes Swift Playgrounds for instant experimentation.',
      'No Mac? Swift Playgrounds on iPad teaches the language beautifully, and online sandboxes like swiftfiddle.com run snippets.',
      'Apple\'s free "Develop in Swift" tutorials walk from zero to a shipped app.',
      'The optionals concept transfers back: it\'s TypeScript\'s `?` and Rust\'s Option, all cousins.'
    ],
    related: ['js'],
    quiz: [
      { q: 'Swift optionals exist to…', options: ['Make code optional', 'Force you to handle possibly-missing values before using them', 'Speed up loops', 'Store settings'], a: 1, why: 'The billion-dollar null mistake, fixed in the type system.' },
      { q: 'Building & shipping an iOS app requires…', options: ['Any PC', 'A Mac with Xcode', 'Linux', 'Just an iPhone'], a: 1, why: 'Xcode is Mac-only — the practical entry ticket to iOS development.' },
      { q: '<code>nickname ?? "anonymous"</code> means…', options: ['Compare the two', 'Use nickname, or "anonymous" if it\'s nil', 'Both values', 'A syntax error'], a: 1, why: 'The nil-coalescing operator — a safe unwrap with a fallback.' }
    ]
  },

  {
    id: 'kotlin', name: 'Kotlin', icon: 'Kt', year: 2016, creator: 'JetBrains',
    tagline: 'Java\'s modern successor — and Android\'s favorite language.',
    pitch: 'Kotlin runs on the JVM and interoperates seamlessly with Java — call Java code, be called by it — while deleting Java\'s ceremony: no semicolons, null-safety built in, data classes in one line. Google made it the preferred language for Android in 2019, and most new Android work is Kotlin.',
    uses: ['Android apps', 'JVM backends', 'Cross-platform mobile (KMP)', 'Anywhere Java goes'],
    famous: ['Most modern Android apps', 'Pinterest & Netflix mobile', 'Gradle build scripts'],
    facts: [
      ['Typing', 'static, strong, null-safe by default'],
      ['Runs on', 'the JVM (plus native & JS targets)'],
      ['Java interop', 'total — mix .kt and .java files in one project'],
      ['Signature feature', 'String? vs String — null is opt-in, tracked by types'],
      ['File extension', '.kt']
    ],
    samples: [
      { title: 'Java\'s ideas, a third of the typing', lang: 'kotlin',
        code: 'data class Player(val name: String, val level: Int)\n\nfun main() {\n    val players = listOf(\n        Player("Ada", 36), Player("Sam", 19), Player("Kim", 28)\n    )\n\n    players.filter { it.level > 20 }\n           .sortedByDescending { it.level }\n           .forEach { println("${it.name}: ${it.level}") }\n}',
        output: 'Ada: 36\nKim: 28' },
      { title: 'Null-safety built in', lang: 'kotlin',
        code: 'var nickname: String? = null     // ? = nullable, tracked\n\nprintln(nickname?.length)        // safe call -> null, not crash\nprintln(nickname ?: "anonymous") // fallback\n\n// nickname.length  <- won\'t even compile',
        output: 'null\nanonymous' }
    ],
    firstSteps: [
      'Try it instantly at play.kotlinlang.org — zero install.',
      'For Android: install Android Studio (built by JetBrains too) — its templates start you in Kotlin.',
      'Kotlin Koans (built into the playground) teach the language as small exercises.',
      'Knowing Java helps but isn\'t required; Kotlin is many people\'s first JVM language now.'
    ],
    related: ['java', 'js'],
    quiz: [
      { q: 'Google\'s preferred language for Android development is…', options: ['Java', 'Kotlin', 'Swift', 'Dart'], a: 1, why: 'Official since 2019 — new Android APIs are Kotlin-first.' },
      { q: 'Kotlin and Java code…', options: ['Cannot mix', 'Interoperate seamlessly in one project', 'Need translation tools', 'Compete for the JVM'], a: 1, why: 'Full interop was the adoption superpower — migrate one file at a time.' },
      { q: 'In Kotlin, a plain <code>String</code> variable can hold null?', options: ['Yes, always', 'No — nullability must be declared with String?', 'Only in Java files', 'Only if final'], a: 1, why: 'Null is opt-in and compiler-tracked. NullPointerExceptions become rare.' }
    ]
  },

  {
    id: 'bash', name: 'Bash / Shell', icon: '$_', year: 1989, creator: 'Brian Fox (GNU Project)',
    tagline: 'The language you\'re already inside — command your computer directly.',
    pitch: 'The terminal is a programming environment, and Bash is its language. Every command you type is a tiny program; pipes chain them into pipelines; a .sh file replays them. Developers live here daily — deploys, builds, servers, git — and ten lines of shell regularly replace an afternoon of clicking. (Windows\' native equivalent is PowerShell; Bash arrives with Git or WSL.)',
    uses: ['Automating anything on a computer', 'Servers & deployment', 'Build scripts & CI', 'Data wrangling one-liners'],
    famous: ['Every Linux server\'s glue', 'Docker entrypoints', 'CI/CD pipelines everywhere', 'Your git hooks'],
    facts: [
      ['Typing', 'everything is text'],
      ['Signature feature', 'the pipe | — feed one command\'s output into the next'],
      ['Where', 'Linux & Mac terminals; Windows via Git Bash or WSL'],
      ['Superpower', 'composing small tools into big workflows'],
      ['File extension', '.sh']
    ],
    samples: [
      { title: 'Commands, variables, loops', lang: 'bash',
        code: '#!/bin/bash\nname="world"\necho "Hello, $name!"\n\nfor f in *.txt; do\n  echo "Found file: $f"\ndone\n\nif [ -f "notes.txt" ]; then\n  echo "notes.txt exists!"\nfi',
        output: 'Hello, world!\nFound file: ideas.txt\nFound file: notes.txt\nnotes.txt exists!' },
      { title: 'The famous part: pipes', lang: 'bash',
        code: '# Which words appear most in a file?\ncat article.txt | tr " " "\\n" | sort | uniq -c | sort -rn | head -3\n\n# read it left to right: split into words -> sort ->\n# count duplicates -> sort by count -> top 3',
        output: '  42 the\n  17 waffle\n  15 breakfast' }
    ],
    firstSteps: [
      'Windows: you already have Git Bash if git is installed — or enable WSL for real Linux. Mac/Linux: open Terminal.',
      'Learn the survival kit first: ls, cd, cat, cp, mv, mkdir, rm (careful!), grep.',
      'Put repeated commands in a file, `chmod +x script.sh`, run `./script.sh` — congratulations, you automate now.',
      'explainshell.com decodes any cryptic one-liner you find on the internet.'
    ],
    related: ['python'],
    quiz: [
      { q: 'The pipe | does what?', options: ['Comments a line', 'Sends one command\'s output into the next command\'s input', 'Runs in parallel', 'Redirects to a file'], a: 1, why: 'Composition is the shell\'s whole philosophy: small tools, piped together.' },
      { q: 'A shell script is…', options: ['A compiled program', 'A text file of commands, replayed in order', 'A Windows-only feature', 'A programming joke'], a: 1, why: 'If you typed it once, a .sh file can type it forever.' },
      { q: 'In Bash, <code>$name</code> means…', options: ['A price', 'The value of the variable name', 'A special file', 'An error'], a: 1, why: 'Variables are read with $ — same instinct as PHP and template strings.' }
    ]
  },

  {
    id: 'lua', name: 'Lua', icon: '🌙', year: 1993, creator: 'PUC-Rio, Brazil (Roberto Ierusalimschy)',
    tagline: 'The tiny language hiding inside your favorite games.',
    pitch: 'Lua ("moon" in Portuguese) is designed to be embedded: the whole language is a featherweight engine that bigger programs swallow to make themselves scriptable. Roblox games are Lua (Luau). World of Warcraft addons are Lua. Neovim configs are Lua. If a game lets you script it, odds are you\'re writing Lua — making it many kids\' secret first language.',
    uses: ['Roblox games (Luau)', 'Game modding & addons', 'Neovim configuration', 'Embedded scripting anywhere'],
    famous: ['Roblox', 'World of Warcraft addons', 'Angry Birds (original)', 'Neovim'],
    facts: [
      ['Typing', 'dynamic, tiny type set'],
      ['Size', 'the whole engine is ~300KB — hence "embeddable"'],
      ['One data structure', 'the table — array, dict and object in one'],
      ['Quirk', 'arrays start at index 1!'],
      ['File extension', '.lua']
    ],
    samples: [
      { title: 'Small and readable', lang: 'lua',
        code: 'local scores = {88, 95, 73}\nlocal total = 0\n\nfor i = 1, #scores do        -- yes, arrays start at 1!\n  total = total + scores[i]\nend\n\nprint("Average: " .. total / #scores)',
        output: 'Average: 85.333333333333' },
      { title: 'What Roblox scripting looks like (Luau)', lang: 'lua',
        code: 'local part = script.Parent\n\nlocal function onTouch(other)\n  local player = other.Parent\n  print(player.Name .. " touched the lava!")\n  player.Humanoid.Health = 0\nend\n\npart.Touched:Connect(onTouch)',
        output: '-- (runs in Roblox Studio: the classic lava block)' }
    ],
    firstSteps: [
      'The gateway drug: Roblox Studio is free and its scripting language IS Lua (Luau) — build a game today.',
      'Standalone: install Lua from lua.org or just use the live demo at lua.org/demo.html.',
      'Everything is a table: learn that one structure and you know the language.',
      'Watch the index-starts-at-1 quirk when moving between Lua and everything else.'
    ],
    related: ['js', 'python'],
    quiz: [
      { q: 'Lua\'s design niche is…', options: ['Operating systems', 'Being embedded inside other programs to make them scriptable', 'Web pages', 'Databases'], a: 1, why: 'Tiny, fast, easy to embed — the scripting layer of countless games and tools.' },
      { q: 'Roblox games are scripted in…', options: ['Python', 'JavaScript', 'Lua (Luau)', 'C#'], a: 2, why: 'Luau is Roblox\'s Lua dialect — millions of kids\' first language.' },
      { q: 'Lua arrays famously start at…', options: ['0', '1', '-1', 'Any index'], a: 1, why: 'The great index war. Lua chose 1; prepare your off-by-one jokes.' }
    ]
  },

  {
    id: 'r', name: 'R', icon: 'R', year: 1993, creator: 'Ross Ihaka & Robert Gentleman',
    tagline: 'Built by statisticians, for statistics — data\'s native tongue.',
    pitch: 'R is what happens when statisticians design a language: data frames, plots and models are built in, not imported. It rules academic research, biostatistics and serious data visualization (ggplot2 remains the gold standard of charting). Python took much of the general data-science market, but R remains beloved where rigorous statistics live.',
    uses: ['Statistics & research', 'Data visualization (ggplot2)', 'Bioinformatics & medicine', 'Reports (R Markdown)'],
    famous: ['Academic papers everywhere', 'FiveThirtyEight & BBC graphics', 'Pharma clinical analysis'],
    facts: [
      ['Typing', 'dynamic; vectors are the native unit — math applies element-wise'],
      ['Killer library', 'the tidyverse: dplyr (wrangling) + ggplot2 (charts)'],
      ['IDE', 'RStudio — practically part of the language'],
      ['Closest relative here', 'Python\'s data stack (pandas learned from R\'s data frames)'],
      ['File extension', '.R']
    ],
    samples: [
      { title: 'Vectors first, loops rarely', lang: 'r',
        code: 'scores <- c(88, 95, 73, 60)\n\nmean(scores)\nscores + 5              # math is element-wise, no loop\nscores[scores >= 70]    # filtering built into indexing',
        output: '[1] 79\n[1] 93 100 78 65\n[1] 88 95 73' },
      { title: 'Why analysts love it: the pipeline style', lang: 'r',
        code: 'library(dplyr)\n\nsales %>%\n  filter(region == "West") %>%\n  group_by(product) %>%\n  summarise(total = sum(amount)) %>%\n  arrange(desc(total))',
        output: '# A tibble: 3 x 2\n  product    total\n  Waffles     4200\n  Pancakes    3100\n  Toast        900' }
    ],
    firstSteps: [
      'Install R from r-project.org, then RStudio Desktop (free) — the console + plots + data viewer in one window.',
      'Learn the tidyverse from day one: install.packages("tidyverse"), and the free book "R for Data Science" (r4ds.hadley.nz).',
      'That %>% pipeline reads like the SQL you learned here: filter = WHERE, group_by + summarise = GROUP BY.',
      'Choose R over Python when the goal is statistics or publication-quality charts; either way, concepts transfer.'
    ],
    related: ['python', 'sql'],
    quiz: [
      { q: 'R\'s home turf is…', options: ['Game development', 'Statistics and data visualization', 'Mobile apps', 'Operating systems'], a: 1, why: 'Designed by statisticians — models and plots are built into its bones.' },
      { q: '<code>scores + 5</code> in R…', options: ['Errors — need a loop', 'Adds 5 to every element (vectorized)', 'Appends 5', 'Concatenates'], a: 1, why: 'Vectors are the native unit; operations broadcast element-wise, like numpy (which learned from R).' },
      { q: 'The famous R charting library is…', options: ['matplotlib', 'ggplot2', 'chart.js', 'd3'], a: 1, why: 'The "grammar of graphics" — still the standard serious-visualization tool.' }
    ]
  },

  {
    id: 'dart', name: 'Dart & Flutter', icon: 'Dt', year: 2011, creator: 'Google',
    tagline: 'One codebase, every phone — the language of Flutter apps.',
    pitch: 'Dart existed quietly until Flutter made it famous: write one Dart codebase and ship native apps to iPhone, Android, web and desktop simultaneously. Its hot reload (change code, see the running app update in under a second) makes UI building addictively fast. The language itself feels like a tidied-up blend of Java and JavaScript — your JS-track skills carry straight over.',
    uses: ['Cross-platform mobile apps (Flutter)', 'Web & desktop from the same code', 'Startup MVPs (one team, all platforms)'],
    famous: ['Google Pay & Google Ads apps', 'BMW\'s app', 'Reflectly', 'A huge share of new indie apps'],
    facts: [
      ['Typing', 'static, sound null-safety (like Kotlin/Swift)'],
      ['Killer app', 'Flutter — UI as composable widget trees'],
      ['Hot reload', 'sub-second code-to-screen loop while the app runs'],
      ['Compiles to', 'native ARM/x64, JavaScript, or WebAssembly'],
      ['File extension', '.dart']
    ],
    samples: [
      { title: 'Dart: familiar bones', lang: 'dart',
        code: 'void main() {\n  final scores = [88, 95, 73, 60];\n\n  final passing = scores.where((s) => s >= 70).toList()\n    ..sort((a, b) => b.compareTo(a));\n\n  print("Passing: $passing");\n\n  for (final (i, s) in passing.indexed) {\n    print("#${i + 1}: $s");\n  }\n}',
        output: 'Passing: [95, 88, 73]\n#1: 95\n#2: 88\n#3: 73' },
      { title: 'Flutter: UI as code — widgets all the way down', lang: 'dart',
        code: 'class ScoreCard extends StatelessWidget {\n  final int score;\n  const ScoreCard(this.score, {super.key});\n\n  @override\n  Widget build(BuildContext context) {\n    return Card(\n      child: Column(children: [\n        Text("Your score", style: TextStyle(fontSize: 18)),\n        Text("$score", style: TextStyle(fontSize: 48)),\n        ElevatedButton(onPressed: () {}, child: Text("Play again")),\n      ]),\n    );\n  }\n}',
        output: '// (a card with title, big number and a button -\n//  the same nested-boxes thinking as HTML, in code)' }
    ],
    firstSteps: [
      'Try Dart instantly at dartpad.dev — zero install, Flutter widgets included.',
      'Install Flutter (docs.flutter.dev) — its doctor command walks you through setup.',
      '`flutter create my_app && flutter run` — a working app on an emulator in minutes; then edit and watch hot reload.',
      'Coming from this site: widget trees ARE your HTML nesting instincts, and Dart syntax is JS/TS with minor costume changes.'
    ],
    related: ['js', 'ts'],
    quiz: [
      { q: 'Flutter\'s core promise is…', options: ['Fastest iOS apps', 'One codebase shipping native apps to every platform', 'No code needed', 'Free hosting'], a: 1, why: 'Write Dart once; compile natively for iPhone, Android, web and desktop.' },
      { q: 'Hot reload means…', options: ['The app restarts fast', 'Code changes appear in the RUNNING app in under a second, state intact', 'The phone gets warm', 'Faster downloads'], a: 1, why: 'The tight feedback loop is Flutter\'s beloved superpower for UI work.' },
      { q: 'Flutter UIs are built from…', options: ['XML layouts', 'Nested widget trees written in Dart code', 'HTML', 'Drag-and-drop only'], a: 1, why: 'Everything is a widget composed of widgets — the nesting mirrors your HTML instincts.' }
    ]
  },

  {
    id: 'haskell', name: 'Haskell', icon: 'λ', year: 1990, creator: 'An academic committee (really!)',
    tagline: 'Pure functional programming — the language that rewires your brain.',
    pitch: 'Haskell is the deep end of functional programming: functions can\'t secretly change anything (purity), nothing computes until needed (laziness), and the type system is so expressive that "if it compiles, it works" is only half a joke. Few jobs demand it; many great programmers credit it with permanently upgrading how they think. Your map/filter/reduce skills are baby Haskell already.',
    uses: ['Financial systems (correctness-critical)', 'Compilers & language research', 'Blockchain cores (Cardano)', 'Upgrading your brain'],
    famous: ['GHC (its own compiler, a marvel)', 'Pandoc (the universal document converter)', 'Cardano', 'Facebook\'s spam filters (Sigma)'],
    facts: [
      ['Typing', 'static, inferred, famously powerful (type classes, monads)'],
      ['Purity', 'functions can\'t mutate or do sneaky I/O — effects are explicit in types'],
      ['Laziness', 'expressions evaluate only when needed — infinite lists are normal'],
      ['The scary word', 'monads: just a pattern for chaining effectful steps. You\'ve used promises; you\'ll survive'],
      ['File extension', '.hs']
    ],
    samples: [
      { title: 'Declarative to the bone', lang: 'haskell',
        code: '-- functions are equations; pattern matching is the syntax\nfactorial :: Integer -> Integer\nfactorial 0 = 1\nfactorial n = n * factorial (n - 1)\n\n-- your map/filter instincts, native:\npassing :: [Int] -> [Int]\npassing scores = reverse (sort (filter (>= 70) scores))\n\nmain :: IO ()\nmain = do\n  print (factorial 20)\n  print (passing [88, 95, 73, 60])',
        output: '2432902008176640000\n[95,88,73]' },
      { title: 'The famous part: laziness — infinite lists are fine', lang: 'haskell',
        code: 'fibs :: [Integer]\nfibs = 0 : 1 : zipWith (+) fibs (tail fibs)\n-- an INFINITE list, defined in terms of itself!\n\nmain = print (take 10 fibs)\n-- only the 10 you asked for ever get computed',
        output: '[0,1,1,2,3,5,8,13,21,34]' }
    ],
    firstSteps: [
      'Install GHCup (haskell.org/ghcup) — the one-command toolchain installer; then `ghci` gives you an interactive playground.',
      'Read "Learn You a Haskell for Great Good!" — free online, genuinely funny, the classic on-ramp.',
      'Reframe, don\'t fight: no loops (recursion + map/filter instead), no mutation (new values instead). Your JS array-method habits are the bridge.',
      'Set the right goal: a month of Haskell makes your Python and JavaScript better forever, employed-as-Haskeller or not.'
    ],
    related: ['js', 'python'],
    quiz: [
      { q: '"Pure" functions in Haskell…', options: ['Run faster', 'Can\'t mutate state or perform hidden I/O — same input, same output, always', 'Have no arguments', 'Are written in C'], a: 1, why: 'Effects are explicit and tracked in types — whole bug categories can\'t exist.' },
      { q: 'Laziness makes it possible to…', options: ['Skip compiling', 'Define infinite data structures and take only what you need', 'Avoid types', 'Run without RAM'], a: 1, why: 'Nothing computes until demanded — fibs is infinite, take 10 is finite.' },
      { q: 'The realistic reason to learn Haskell:', options: ['Most jobs require it', 'It permanently deepens how you think about functions, data and effects', 'It\'s the fastest language', 'Easy syntax'], a: 1, why: 'It\'s the brain gym of programming languages — the gains transfer everywhere.' }
    ]
  },

  {
    id: 'asm', name: 'Assembly', icon: '01', year: 1949, creator: 'As old as computers themselves',
    tagline: 'The CPU\'s own language — what all your code eventually becomes.',
    pitch: 'Every language on this site — after compiling, interpreting, JIT-ing — becomes machine instructions: move this number into a register, add these, jump if zero. Assembly is those instructions with human-readable names. Nobody builds apps in it anymore, but reading a little assembly permanently demystifies computers: you\'ll know what a CPU actually does, why some code is fast, and what compilers are for.',
    uses: ['Understanding what computers really do', 'OS kernels & bootloaders', 'Reverse engineering & security', 'Retro consoles & demoscene', 'Hand-tuned hot paths'],
    famous: ['Every program, ultimately', 'RollerCoaster Tycoon (famously hand-written x86!)', 'The demoscene\'s 4KB miracles', 'Your CPU, right now'],
    facts: [
      ['Not one language', 'each CPU family has its own: x86-64 (PCs), ARM (phones), RISC-V (open), 6502 (retro)'],
      ['Registers', 'the CPU\'s ~16 named scratch cells — all real work happens in them'],
      ['Instructions', 'tiny steps: mov (copy), add, cmp (compare), jmp (goto). That\'s the whole vocabulary style'],
      ['No safety net', 'no types, no variables, no functions — just memory, registers and jumps'],
      ['See it live', 'godbolt.org shows any C/C++/Rust code as the assembly it becomes — addictive']
    ],
    samples: [
      { title: 'x86-64: summing an array (what your for-loop really is)', lang: 'asm',
        code: '; rdi = pointer to array, rsi = length\nsum_array:\n    xor  rax, rax          ; total = 0\n    xor  rcx, rcx          ; i = 0\n.loop:\n    cmp  rcx, rsi          ; i < length ?\n    jge  .done             ; if not, exit loop\n    add  rax, [rdi + rcx*8]  ; total += array[i]\n    inc  rcx               ; i++\n    jmp  .loop\n.done:\n    ret                    ; return value lives in rax',
        output: '; every for-loop you\'ve ever written, undressed:\n; a counter, a compare, a jump. That\'s all loops are.' },
      { title: '6502 (the NES/C64 chip): retro minimalism', lang: 'asm',
        code: '; add two numbers on a 1980s CPU (3 registers total!)\n        LDA score      ; load score into accumulator\n        CLC            ; clear carry flag\n        ADC #10        ; add 10\n        STA score      ; store it back\n        RTS            ; return',
        output: '; +10 points, 1980s style. Everything your\n; childhood consoles did looked like this.' }
    ],
    firstSteps: [
      'Start by READING, not writing: paste a tiny C function into godbolt.org and study what the compiler emits.',
      'The gateway drug is retro: "Easy 6502" (skilldrick.github.io/easy6502) is a free in-browser assembly tutorial — genuinely fun.',
      'The concepts checklist: registers, the stack, flags, jumps — four ideas unlock all assembly dialects.',
      'Then appreciate your compilers forever. They write better assembly than almost any human, almost always.'
    ],
    related: ['c'],
    quiz: [
      { q: 'Assembly is…', options: ['One universal language', 'Human-readable names for each CPU family\'s own machine instructions', 'A Windows feature', 'Obsolete and gone'], a: 1, why: 'x86, ARM, RISC-V, 6502 — each architecture speaks its own dialect.' },
      { q: 'Registers are…', options: ['Log files', 'The CPU\'s handful of named scratch cells where all work happens', 'RAM chips', 'Assembly errors'], a: 1, why: 'Data is loaded into registers, transformed, stored back — the universal rhythm.' },
      { q: 'Every loop, in assembly, is really…', options: ['Magic', 'A counter, a compare, and a conditional jump', 'Recursion', 'A hardware feature'], a: 1, why: 'for/while are courtesy costumes over cmp + jmp — seeing that is the enlightenment.' }
    ]
  },

  {
    id: 'julia', name: 'Julia', icon: 'Jl', year: 2012, creator: 'MIT (Bezanson, Karpinski, Shah, Edelman)',
    tagline: 'Python\'s friendliness, C\'s speed — science\'s new favorite.',
    pitch: 'Julia was designed to end the "two-language problem": scientists prototyped in slow Python, then rewrote in fast C. Julia is both at once — dynamic and readable like Python, JIT-compiled to near-C speed. Its signature idea, multiple dispatch, picks the right function version based on ALL argument types, which makes mathematical code compose beautifully. Big in climate modeling, pharma and finance.',
    uses: ['Scientific computing & simulation', 'Numerical analysis', 'Machine learning research (Flux.jl)', 'Quant finance', 'Climate & pharma modeling'],
    famous: ['NASA & CERN analyses', 'Climate modeling (CliMA)', 'Moderna\'s pharma pipelines', 'The Federal Reserve\'s models'],
    facts: [
      ['Typing', 'dynamic with optional annotations; JIT-compiled per concrete types'],
      ['Speed', 'routinely within 2× of C — in Python-looking code'],
      ['Signature idea', 'multiple dispatch: functions specialize on every argument\'s type'],
      ['Math native', 'ε and π are valid identifiers; matrices are built-in; 1-indexed like R/Lua'],
      ['File extension', '.jl']
    ],
    samples: [
      { title: 'Python-flavored, compiled-fast', lang: 'julia',
        code: 'function simulate(n)\n    total = 0.0\n    for i in 1:n\n        total += sin(i)^2       # this loop runs at C speed!\n    end\n    return total / n\nend\n\nscores = [88, 95, 73, 60]\npassing = filter(s -> s >= 70, scores)\n\nprintln(simulate(1_000_000))\nprintln("Passing: ", sort(passing, rev=true))',
        output: '0.4999993421...\nPassing: [95, 88, 73]' },
      { title: 'The famous part: multiple dispatch', lang: 'julia',
        code: 'area(r::Real) = π * r^2                 # circles from a radius\narea(w::Real, h::Real) = w * h           # rectangles\narea(v::Vector) = sum(area, v)           # a whole list of radii!\n\nprintln(area(2))          # picks version 1\nprintln(area(3, 4))       # picks version 2\nprintln(area([1, 2, 3]))  # picks version 3',
        output: '12.566370614359172\n12\n43.982297150257104' }
    ],
    firstSteps: [
      'Install from julialang.org, run `julia` — the REPL is excellent (try `?` for help mode, `]` for packages).',
      'Your Python-track knowledge maps ~directly: def→function/end, lists→vectors, comprehensions exist and are fast.',
      'Watch the 1-indexing (like R and Lua) and the JIT warm-up (first call compiles, second flies).',
      'The free "Introduction to Computational Thinking" MIT course (computationalthinking.mit.edu) teaches Julia with live notebooks — one of the best CS courses anywhere.'
    ],
    related: ['python', 'r'],
    quiz: [
      { q: 'The "two-language problem" Julia solves:', options: ['Too many syntaxes', 'Prototype in a slow language, rewrite in a fast one — Julia is both at once', 'English vs math', 'Python vs R wars'], a: 1, why: 'Dynamic feel + JIT compilation = one language from prototype to production-speed.' },
      { q: 'Multiple dispatch chooses a function version based on…', options: ['The first argument only', 'The types of ALL arguments', 'Alphabetical order', 'Runtime randomness'], a: 1, why: 'area(r), area(w,h), area(list) — the combination of types picks the method.' },
      { q: 'Julia arrays start at…', options: ['0', '1', '-1', 'Configurable only'], a: 1, why: 'Like R, Lua and mathematics itself. The index wars continue.' }
    ]
  },

  {
    id: 'zig', name: 'Zig', icon: 'Z', year: 2016, creator: 'Andrew Kelley',
    tagline: 'The new C: no hidden anything, comptime everything.',
    pitch: 'Zig\'s pitch is radical honesty: no hidden control flow (no exceptions, no operator overloading — the code you read is what runs), no hidden memory allocations (functions that allocate ASK for an allocator), and errors handled through the type system with try. Its comptime feature runs ordinary Zig code at compile time, replacing whole macro systems. It even compiles C — many projects adopt Zig first as a better C toolchain.',
    uses: ['Systems programming', 'A drop-in C/C++ cross-compiler', 'Game engines & embedded', 'WebAssembly'],
    famous: ['Bun (the fast JS runtime — written in Zig!)', 'TigerBeetle (financial database)', 'Ghostty terminal', 'Uber\'s C toolchain'],
    facts: [
      ['Typing', 'static, explicit; errors are values via error unions (!T)'],
      ['Memory', 'manual, but explicit: allocating functions take an allocator parameter'],
      ['Signature idea', 'comptime — run real Zig at compile time; generics fall out for free'],
      ['C story', '`zig cc` compiles C projects, cross-compiles anywhere, imports C headers directly'],
      ['File extension', '.zig']
    ],
    samples: [
      { title: 'Explicit, honest, C-adjacent', lang: 'zig',
        code: 'const std = @import("std");\n\nfn average(scores: []const i64) f64 {\n    var total: i64 = 0;\n    for (scores) |s| {\n        total += s;\n    }\n    return @as(f64, @floatFromInt(total)) /\n           @as(f64, @floatFromInt(scores.len));\n}\n\npub fn main() !void {\n    const scores = [_]i64{ 88, 95, 73, 60 };\n    std.debug.print("Average: {d:.1}\\n", .{average(&scores)});\n}',
        output: 'Average: 79.0' },
      { title: 'The famous parts: try and comptime', lang: 'zig',
        code: '// errors are in the TYPE - the ! means "or an error":\nfn parseAge(s: []const u8) !u8 {\n    return std.fmt.parseInt(u8, s, 10);   // may fail\n}\n// callers MUST handle it:  const age = try parseAge("25");\n\n// comptime: real code running during compilation\nfn Matrix(comptime rows: usize, comptime cols: usize) type {\n    return [rows][cols]f64;    // types built by functions!\n}\nconst Mat3x3 = Matrix(3, 3);',
        output: '// forget a try? compile error. generics? just\n// functions that run at compile time. no macros needed.' }
    ],
    firstSteps: [
      'Download from ziglang.org (a single archive), then `zig init` + `zig build run` in a new folder.',
      'Do ziglings (github.com/ratfactor/ziglings) — tiny broken programs you fix one by one; the beloved on-ramp.',
      'Best appreciated after C (Atlas page!): every Zig design choice answers a specific C pain.',
      'Try `zig cc` on an existing C project — the better-C-toolchain trick that converts skeptics.'
    ],
    related: ['c', 'rust'],
    quiz: [
      { q: '"No hidden control flow" means…', options: ['No if statements', 'No exceptions or overloads — the code you read is exactly what executes', 'No functions', 'Single-threaded only'], a: 1, why: 'Zig\'s bet: readability = knowing nothing invisible can happen between two lines.' },
      { q: 'comptime lets you…', options: ['Time your code', 'Run ordinary Zig code during compilation — generics and codegen without macros', 'Skip compiling', 'Compress binaries'], a: 1, why: 'Types are values at compile time; a function can build and return a type.' },
      { q: 'The fast JavaScript runtime written in Zig is…', options: ['Node.js', 'Deno', 'Bun', 'V8'], a: 2, why: 'Bun — proof of Zig shipping serious production software.' }
    ]
  },

  {
    id: 'polyglot', name: 'How to learn ANY language', icon: '🗺️', year: null, creator: null,
    tagline: 'The meta-skill: your 6th language takes a weekend, not a year.',
    pitch: 'Here\'s the secret the Atlas has been whispering: programming languages are ~80% identical. Variables, conditions, loops, functions, collections, objects — every language has them, wearing different costumes. Once you truly know those concepts (you do — you built them in the tracks), a new language is mostly a vocabulary lesson. This page is the checklist that turns any unfamiliar language into a familiar one, fast.',
    uses: ['Your next job\'s stack', 'That framework you\'re curious about', 'Whatever gets invented next'],
    famous: ['Every senior developer does this — nobody knows 10 languages deeply; they know programming deeply, 10 syntaxes shallowly'],
    facts: [
      ['The universal core', 'variables · conditions · loops · functions · collections · objects/structs · errors'],
      ['What actually differs', 'syntax (cosmetic), typing (static/dynamic), memory model, ecosystem, idioms'],
      ['Time to productive', 'a weekend for the core; months for idiomatic mastery; that\'s fine'],
      ['The trap', 'writing Python-flavored Java forever — learn each language\'s idioms eventually'],
      ['Best accelerator', 'porting a program you\'ve already written']
    ],
    samples: [
      { title: 'One function, five costumes — spot the constant skeleton', lang: 'text',
        code: 'Python:      def greet(name):  return f"Hi, {name}!"\nJavaScript:  const greet = (name) => `Hi, ${name}!`;\nJava:        String greet(String name) { return "Hi, " + name + "!"; }\nGo:          func greet(name string) string { return "Hi, " + name + "!" }\nRuby:        def greet(name) = "Hi, #{name}!"',
        output: 'Same idea everywhere: a named recipe, one input, one output.\nOnly the punctuation changed.' },
      { title: 'The 10-question checklist for any new language', lang: 'text',
        code: ' 1. How do I print?\n 2. How do I declare a variable? Types: declared or inferred?\n 3. What does if/else look like?\n 4. What do loops look like? Is there a for-each?\n 5. How do I write a function? How are values returned?\n 6. What is the list/array type and its map/filter tools?\n 7. What is the dictionary/map type?\n 8. How are errors handled - exceptions or return values?\n 9. How do I split code into files and import things?\n10. What is the package manager and how do I run one file?',
        output: 'Answer these 10 (an hour with the official tutorial)\nand you can read most code in the language.' }
    ],
    firstSteps: [
      'Pick a program you\'ve already built here (FizzBuzz → to-do list → text analyzer) and PORT it — known problem, unknown syntax isolates exactly what\'s new.',
      'Run the 10-question checklist against the official tutorial. Write the answers down; that page becomes your cheat sheet.',
      'Read real code early: the language\'s standard library or a popular small project shows the idioms tutorials skip.',
      'Expect a week of typing the old language\'s syntax by accident. Everyone does. The compiler will mock you; persist.'
    ],
    related: ['js', 'python'],
    quiz: [
      { q: 'Roughly how much of programming knowledge transfers between languages?', options: ['Almost none', 'Around 80% — the concepts; syntax is the small part', 'Only comments', '100%'], a: 1, why: 'Variables, loops, functions, collections — the mental model IS the skill.' },
      { q: 'The fastest way to learn language #2 is…', options: ['Memorize its manual', 'Port a program you already wrote in language #1', 'Watch videos only', 'Wait for AI'], a: 1, why: 'A known problem isolates the only new variable: the syntax.' },
      { q: '"Writing Python-flavored Java" refers to…', options: ['A compiler mode', 'Using a new language while ignoring its native idioms', 'A framework', 'Machine translation'], a: 1, why: 'The core transfers, but each language has its own "right way" — learn it as step two.' }
    ]
  }
];
