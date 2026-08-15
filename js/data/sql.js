/* ============================================================
   SQL track — lesson data
   SQL editors run live in the browser via sql.js (SQLite).
   tryIt: { mode:'sql', setup: hidden-prelude-SQL, code, tables: 'note text' }
   ============================================================ */
window.CT_TRACKS = window.CT_TRACKS || {};

var DINER_DB =
  "CREATE TABLE dishes (id INTEGER PRIMARY KEY, name TEXT, price REAL, vegan INTEGER);\n" +
  "INSERT INTO dishes VALUES\n" +
  " (1,'Pancakes',5.0,0),(2,'Waffle Supreme',9.0,0),(3,'Fruit Bowl',6.0,1),\n" +
  " (4,'Toast',2.0,1),(5,'Omelette',7.5,0),(6,'Smoothie',4.5,1);\n" +
  "CREATE TABLE orders (id INTEGER PRIMARY KEY, dish_id INTEGER, quantity INTEGER, day TEXT);\n" +
  "INSERT INTO orders VALUES\n" +
  " (1,1,2,'Mon'),(2,3,1,'Mon'),(3,2,1,'Tue'),(4,1,3,'Tue'),(5,4,5,'Wed'),\n" +
  " (6,2,2,'Wed'),(7,6,4,'Thu'),(8,1,1,'Thu'),(9,5,2,'Fri'),(10,2,3,'Fri');";

var DINER_NOTE = 'Pre-loaded sample database — <b>dishes</b>(id, name, price, vegan) and <b>orders</b>(id, dish_id, quantity, day). Every Run starts from a fresh copy, so experiment fearlessly.';

window.CT_TRACKS.sql = {
  id: 'sql',
  name: 'SQL',
  icon: 'DB',
  area: 'python',
  tagline: 'The language of data — every app you use speaks it behind the scenes.',
  blurb: 'SQL (Structured Query Language) is how programs talk to databases: the organized storage behind every login, shopping cart, playlist and bank balance. It reads almost like English, it has barely changed since 1974, and it may be the single most employable language on this site. Here it runs live in your browser.',
  uses: ['Every app\'s data storage', 'Business analytics & reports', 'Data science pipelines', 'Backend development', 'Spreadsheet-beyond tasks', 'Data journalism'],
  lessons: [

    /* ---------- BEGINNER ---------- */
    {
      id: 'sql-1', title: 'Databases & your first SELECT', level: 0, minutes: 10,
      blocks: [
        { t: 'p', html: 'A <b>database</b> stores data in <b>tables</b> — like spreadsheets with rules. Each table has named <b>columns</b> and holds <b>rows</b> of data. A music app has tables like <code>songs</code>, <code>playlists</code>, <code>users</code>; our practice database is a diner with <code>dishes</code> and <code>orders</code>.' },
        { t: 'p', html: 'SQL is how you ask a database questions. The fundamental verb is <code>SELECT</code>:' },
        { t: 'code', lang: 'sql', code: 'SELECT * FROM dishes;' },
        { t: 'p', html: 'Read it as: "give me everything (<code>*</code>) from the dishes table." To pick specific columns, name them instead of using the star:' },
        { t: 'code', lang: 'sql', code: 'SELECT name, price FROM dishes;' },
        { t: 'ul', items: [
          'SQL keywords are traditionally written in CAPITALS — not required, but it makes queries readable.',
          'Statements end with a semicolon <code>;</code>.',
          'Text values use <b>single quotes</b>: <code>\'Pancakes\'</code>. (Double quotes mean column names in SQL!)'
        ] },
        { t: 'tip', html: 'SQL is <b>declarative</b>: you describe WHAT you want, and the database figures out HOW to get it. No loops, no ifs — that mental shift is the whole trick of learning it.' }
      ],
      tryIt: {
        mode: 'sql',
        setup: DINER_DB,
        tables: DINER_NOTE,
        code: 'SELECT * FROM dishes;\n\n-- Now try: only the name and vegan columns.\n-- Then: SELECT * FROM orders;'
      },
      quiz: [
        { q: 'What does <code>SELECT * FROM songs;</code> return?', options: ['The first song', 'Every column of every row in the songs table', 'The table\'s name', 'An error — * is invalid'], a: 1, why: 'The star means "all columns"; with no filter, you get all rows too.' },
        { q: 'In a table, a row represents…', options: ['A category of data', 'One record — one dish, one order, one user', 'A column\'s name', 'The table\'s title'], a: 1, why: 'Columns describe the fields; each row is one actual thing.' },
        { q: 'Text in SQL goes in…', options: ['Double quotes', 'Single quotes', 'Backticks', 'No quotes'], a: 1, why: "'like this' — double quotes are reserved for identifiers like column names." }
      ],
      challenge: {
        text: 'Write one query showing just the name and price of every dish, and a second query showing everything in the orders table.',
        hints: ['Two statements can run together — each ends with a semicolon.'],
        solution: { lang: 'sql', code: 'SELECT name, price FROM dishes;\nSELECT * FROM orders;' }
      }
    },

    {
      id: 'sql-2', title: 'Filtering with WHERE', level: 0, minutes: 12,
      blocks: [
        { t: 'p', html: 'Real tables have millions of rows — you almost never want all of them. <code>WHERE</code> keeps only rows that pass a test:' },
        { t: 'code', lang: 'sql', code: 'SELECT name, price FROM dishes\nWHERE price < 6;' },
        { t: 'p', html: 'The comparison toolkit:' },
        { t: 'table', head: ['Operator', 'Meaning', 'Example'], rows: [
          ['<code>=</code>', 'equals (just one!)', "<code>day = 'Mon'</code>"],
          ['<code>!=</code> or <code>&lt;&gt;</code>', 'not equal', "<code>day != 'Fri'</code>"],
          ['<code>&lt; &gt; &lt;= &gt;=</code>', 'comparisons', '<code>price >= 5</code>'],
          ['<code>AND</code> / <code>OR</code> / <code>NOT</code>', 'combine tests', '<code>vegan = 1 AND price &lt; 6</code>'],
          ['<code>BETWEEN a AND b</code>', 'inclusive range', '<code>price BETWEEN 4 AND 7</code>'],
          ['<code>IN (…)</code>', 'matches any listed value', "<code>day IN ('Sat','Sun')</code>"],
          ['<code>LIKE</code>', 'pattern match, % = anything', "<code>name LIKE 'W%'</code>"]
        ] },
        { t: 'p', html: '<code>LIKE</code> is the fuzzy one: <code>\'W%\'</code> means "starts with W", <code>\'%bowl%\'</code> means "contains bowl" (case-insensitive here), <code>\'_oast\'</code> means "any single character, then oast".' },
        { t: 'warn', html: 'One equals sign! SQL\'s <code>=</code> is comparison, not assignment. Coming from JavaScript, your fingers will type <code>==</code> for a week. The database will complain; forgive yourself and move on.' }
      ],
      tryIt: {
        mode: 'sql',
        setup: DINER_DB,
        tables: DINER_NOTE,
        code: 'SELECT name, price, vegan FROM dishes\nWHERE vegan = 1 AND price < 6;\n\n-- Try: dishes whose name contains \'a\'\n-- Try: orders from Tue or Wed (IN or OR)'
      },
      quiz: [
        { q: 'Which query finds dishes costing exactly 5?', options: ['<code>WHERE price == 5</code>', '<code>WHERE price = 5</code>', '<code>WHERE price IS 5</code>', '<code>IF price = 5</code>'], a: 1, why: 'Single = in SQL. (== is JavaScript leaking into your fingers.)' },
        { q: "<code>WHERE name LIKE '%urger%'</code> matches…", options: ['Names starting with urger', 'Names ending in urger', 'Names containing urger anywhere', 'Exactly "urger"'], a: 2, why: '% on both sides = anything before, anything after.' },
        { q: '<code>WHERE price BETWEEN 4 AND 7</code> includes a 7.00 dish?', options: ['No — BETWEEN excludes ends', 'Yes — BETWEEN is inclusive', 'Only if sorted', 'It errors'], a: 1, why: 'BETWEEN includes both endpoints.' }
      ],
      challenge: {
        text: 'Three queries: (1) non-vegan dishes over 5; (2) dishes whose name starts with a letter after \'S\' (hint: comparisons work on text!); (3) orders where quantity is 2 or 3, using IN.',
        hints: ["Text comparison: <code>name > 'S'</code> compares alphabetically.", '<code>quantity IN (2, 3)</code>'],
        solution: { lang: 'sql', code: "SELECT name, price FROM dishes WHERE vegan = 0 AND price > 5;\nSELECT name FROM dishes WHERE name > 'S';\nSELECT * FROM orders WHERE quantity IN (2, 3);" }
      }
    },

    {
      id: 'sql-3', title: 'Sorting & limiting', level: 0, minutes: 10,
      blocks: [
        { t: 'p', html: 'Databases return rows in whatever order they please — never rely on it. <code>ORDER BY</code> makes order explicit:' },
        { t: 'code', lang: 'sql', code: 'SELECT name, price FROM dishes\nORDER BY price DESC;   -- most expensive first' },
        { t: 'ul', items: [
          '<code>ASC</code> (ascending, A→Z, small→big) is the default; <code>DESC</code> flips it.',
          'Sort by several things: <code>ORDER BY vegan DESC, price ASC</code> — vegan dishes first, each group cheapest-first.',
          '<code>LIMIT n</code> caps the row count — the fuel of every "Top 10" list.'
        ] },
        { t: 'code', lang: 'sql', code: '-- The two cheapest vegan options:\nSELECT name, price FROM dishes\nWHERE vegan = 1\nORDER BY price\nLIMIT 2;' },
        { t: 'p', html: 'Note the clause order — SQL is strict about it: <code>SELECT … FROM … WHERE … ORDER BY … LIMIT</code>. You can also rename output columns with <code>AS</code>, and compute new ones right in the SELECT:' },
        { t: 'code', lang: 'sql', code: 'SELECT name, price * 1.1 AS price_with_tip\nFROM dishes\nORDER BY price_with_tip DESC;' }
      ],
      tryIt: {
        mode: 'sql',
        setup: DINER_DB,
        tables: DINER_NOTE,
        code: 'SELECT name, price FROM dishes\nORDER BY price DESC\nLIMIT 3;\n\n-- Try: cheapest first. Then alphabetical by name.\n-- Then: add a column price * 100 AS cents'
      },
      quiz: [
        { q: 'Without ORDER BY, rows come back…', options: ['Alphabetically', 'By id', 'Newest first', 'In no guaranteed order'], a: 3, why: 'The database chooses. If order matters, say so explicitly.' },
        { q: 'The top 5 highest scores query ends with…', options: ['<code>ORDER BY score DESC LIMIT 5</code>', '<code>LIMIT 5 ORDER BY score</code>', '<code>TOP 5 BY score</code>', '<code>SORT score MAX 5</code>'], a: 0, why: 'Sort descending, then cap. Clause order is fixed: ORDER BY before LIMIT.' },
        { q: 'What does <code>AS</code> do?', options: ['Casts a type', 'Renames a column in the output', 'Sorts ascending', 'Joins tables'], a: 1, why: 'Aliases make computed columns readable: price * 1.1 AS price_with_tip.' }
      ],
      challenge: {
        text: 'One query: the 3 biggest orders (by quantity), largest first, showing the order id, dish_id, and quantity renamed as <code>amount</code>.',
        hints: ['SELECT id, dish_id, quantity AS amount …'],
        solution: { lang: 'sql', code: 'SELECT id, dish_id, quantity AS amount\nFROM orders\nORDER BY quantity DESC\nLIMIT 3;' }
      }
    },

    /* ---------- INTERMEDIATE ---------- */
    {
      id: 'sql-4', title: 'Counting & grouping', level: 1, minutes: 14,
      blocks: [
        { t: 'p', html: 'The questions bosses actually ask — "how many?", "what\'s the total?", "which day was best?" — are <b>aggregate</b> questions. SQL\'s aggregate functions squash many rows into one answer:' },
        { t: 'code', lang: 'sql', code: 'SELECT COUNT(*) FROM orders;                 -- how many orders?\nSELECT SUM(quantity) FROM orders;            -- total items sold\nSELECT AVG(price) FROM dishes;               -- average dish price\nSELECT MIN(price), MAX(price) FROM dishes;   -- cheapest & priciest' },
        { t: 'p', html: 'The real power move is <code>GROUP BY</code> — compute an aggregate <i>per category</i>:' },
        { t: 'code', lang: 'sql', code: 'SELECT day, SUM(quantity) AS items_sold\nFROM orders\nGROUP BY day\nORDER BY items_sold DESC;' },
        { t: 'p', html: 'Read it as: "split the orders into piles by day, then total each pile." One result row per group. To filter <i>groups</i> (not rows), use <code>HAVING</code> after the GROUP BY:' },
        { t: 'code', lang: 'sql', code: 'SELECT day, SUM(quantity) AS items\nFROM orders\nGROUP BY day\nHAVING items > 3;   -- only the busy days' },
        { t: 'tip', html: 'WHERE filters rows <i>before</i> grouping; HAVING filters groups <i>after</i>. If your condition mentions an aggregate (SUM, COUNT…), it belongs in HAVING.' }
      ],
      tryIt: {
        mode: 'sql',
        setup: DINER_DB,
        tables: DINER_NOTE,
        code: 'SELECT day, SUM(quantity) AS items_sold, COUNT(*) AS orders_placed\nFROM orders\nGROUP BY day\nORDER BY items_sold DESC;\n\n-- Try: average dish price for vegan vs non-vegan\n-- (GROUP BY vegan)'
      },
      quiz: [
        { q: '<code>COUNT(*)</code> returns…', options: ['The number of columns', 'The number of rows matched', 'The biggest value', 'The table size in bytes'], a: 1, why: 'Count of rows. COUNT(column) counts non-empty values in that column.' },
        { q: '<code>GROUP BY day</code> produces…', options: ['One row per order', 'One row per distinct day', 'Seven rows always', 'Sorted output'], a: 1, why: 'Each unique value of day becomes one group → one result row.' },
        { q: 'To keep only groups with COUNT(*) > 10, use…', options: ['<code>WHERE COUNT(*) > 10</code>', '<code>HAVING COUNT(*) > 10</code>', '<code>LIMIT 10</code>', '<code>FILTER 10</code>'], a: 1, why: 'Aggregate conditions go in HAVING — WHERE runs before groups exist.' }
      ],
      challenge: {
        text: 'Which dish_id sold the most total items? One query: dish_id and total quantity, grouped, best first, limit 1.',
        hints: ['GROUP BY dish_id, ORDER BY the SUM descending.'],
        solution: { lang: 'sql', code: 'SELECT dish_id, SUM(quantity) AS total\nFROM orders\nGROUP BY dish_id\nORDER BY total DESC\nLIMIT 1;' }
      }
    },

    {
      id: 'sql-5', title: 'Changing data: INSERT, UPDATE, DELETE', level: 1, minutes: 12,
      blocks: [
        { t: 'p', html: 'Reading is half the job — apps also write. Three verbs cover it:' },
        { t: 'code', lang: 'sql', code: "-- add a row\nINSERT INTO dishes (name, price, vegan)\nVALUES ('Ramen', 8.5, 0);\n\n-- change existing rows\nUPDATE dishes SET price = 2.5 WHERE name = 'Toast';\n\n-- remove rows\nDELETE FROM orders WHERE quantity = 1;" },
        { t: 'p', html: 'Details that matter:' },
        { t: 'ul', items: [
          'INSERT lists the columns you\'re providing; unlisted ones get defaults (our auto-numbering <code>id</code> fills itself in).',
          'UPDATE can set several columns: <code>SET price = 3, vegan = 1</code>.',
          'UPDATE and DELETE affect <b>every row matching the WHERE</b>. That\'s the feature AND the danger.'
        ] },
        { t: 'warn', html: '<b>The most feared line in SQL:</b> an UPDATE or DELETE with no WHERE clause hits EVERY row in the table. Real engineers write the WHERE first, run it as a SELECT to see what would be affected, and only then change SELECT to DELETE. Adopt the habit now — our practice database resets every Run, production databases don\'t.' }
      ],
      tryIt: {
        mode: 'sql',
        setup: DINER_DB,
        tables: DINER_NOTE,
        code: "INSERT INTO dishes (name, price, vegan) VALUES ('Ramen', 8.5, 0);\n\nUPDATE dishes SET price = price + 1 WHERE vegan = 0;\n\nDELETE FROM dishes WHERE price > 9;\n\n-- see the aftermath:\nSELECT * FROM dishes ORDER BY price;"
      },
      quiz: [
        { q: '<code>DELETE FROM users;</code> (no WHERE) does what?', options: ['Deletes one user', 'Deletes the table structure', 'Deletes EVERY row in users', 'Nothing — it errors'], a: 2, why: 'No WHERE = all rows. The table survives, empty. Careers have ended here.' },
        { q: 'Before running a risky DELETE, professionals…', options: ['Type faster', 'Run the same WHERE as a SELECT first to preview the damage', 'Use double quotes', 'Turn off the database'], a: 1, why: 'SELECT-first shows exactly which rows the WHERE catches.' },
        { q: 'Which adds a row?', options: ['<code>ADD ROW dishes …</code>', '<code>UPDATE dishes ADD …</code>', '<code>INSERT INTO dishes (…) VALUES (…)</code>', '<code>NEW dishes(…)</code>'], a: 2, why: 'INSERT INTO table (columns) VALUES (values).' }
      ],
      challenge: {
        text: 'Practice the safety ritual: (1) SELECT the rows where day = \'Wed\' to preview; (2) then DELETE those orders; (3) add yourself an order of dish 3, quantity 2, day \'Sat\'; (4) SELECT * FROM orders to verify all of it.',
        hints: ['Four statements, run together, in that order.'],
        solution: { lang: 'sql', code: "SELECT * FROM orders WHERE day = 'Wed';\nDELETE FROM orders WHERE day = 'Wed';\nINSERT INTO orders (dish_id, quantity, day) VALUES (3, 2, 'Sat');\nSELECT * FROM orders;" }
      }
    },

    {
      id: 'sql-6', title: 'Creating tables', level: 1, minutes: 12,
      blocks: [
        { t: 'p', html: 'So far the tables existed already. Designing them yourself is <b>schema design</b> — deciding what to store and its rules:' },
        { t: 'code', lang: 'sql', code: "CREATE TABLE players (\n  id INTEGER PRIMARY KEY,        -- unique auto-number\n  name TEXT NOT NULL,            -- required text\n  score INTEGER DEFAULT 0,       -- starts at 0 if not given\n  joined TEXT                    -- dates stored as text in SQLite\n);\n\nINSERT INTO players (name, joined) VALUES ('Ada', '2026-08-01');\nINSERT INTO players (name, score) VALUES ('Sam', 120);\n\nSELECT * FROM players;" },
        { t: 'p', html: 'The pieces:' },
        { t: 'table', head: ['Piece', 'Meaning'], rows: [
          ['<code>INTEGER, REAL, TEXT</code>', 'the core SQLite types: whole numbers, decimals, strings'],
          ['<code>PRIMARY KEY</code>', 'the unique ID for each row — an INTEGER PRIMARY KEY numbers itself'],
          ['<code>NOT NULL</code>', 'this column is required'],
          ['<code>DEFAULT x</code>', 'value used when the INSERT doesn\'t provide one'],
          ['<code>UNIQUE</code>', 'no two rows may share this value (usernames, emails)']
        ] },
        { t: 'p', html: 'The deepest idea in databases: tables <b>reference</b> each other by ID instead of repeating data. Our <code>orders.dish_id</code> points at <code>dishes.id</code> — so renaming a dish means editing ONE row, not hunting through every order. This is called <b>normalization</b>, and IDs that point at other tables are <b>foreign keys</b>.' },
        { t: 'tip', html: 'Design rule of thumb: every time you\'d copy the same text into many rows ("Pancakes", "Pancakes", "Pancakes"…), that text wants its own table and an ID reference instead.' }
      ],
      tryIt: {
        mode: 'sql',
        code: "CREATE TABLE pets (\n  id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL,\n  species TEXT DEFAULT 'cat',\n  cuteness INTEGER\n);\n\nINSERT INTO pets (name, cuteness) VALUES ('Waffles', 11);\nINSERT INTO pets (name, species, cuteness) VALUES ('Rex', 'dog', 9);\nINSERT INTO pets (name, species, cuteness) VALUES ('Beep', 'robot', 7);\n\nSELECT * FROM pets ORDER BY cuteness DESC;",
        tables: 'This editor starts with an <b>empty database</b> — your CREATE TABLE builds it from nothing.'
      },
      quiz: [
        { q: 'A PRIMARY KEY is…', options: ['The first column', 'The unique identifier for each row', 'A password', 'The largest value'], a: 1, why: 'Every row gets one, no two rows share one — it\'s how other tables point at this row.' },
        { q: 'Storing the customer\'s full name on every one of their 500 orders is bad because…', options: ['Text is slow', 'A name change means editing 500 rows — store a customer_id instead', 'Names are private', 'It isn\'t bad'], a: 1, why: 'Duplicate data drifts out of sync. Reference it once by ID — normalization.' },
        { q: '<code>NOT NULL</code> on a column means…', options: ['It can\'t be zero', 'Every row must provide a value for it', 'It\'s the primary key', 'It\'s text-only'], a: 1, why: 'NULL is SQL\'s "missing value" — NOT NULL bans it.' }
      ],
      challenge: {
        text: 'Design a two-table schema for a tiny library: <code>authors</code>(id, name) and <code>books</code>(id, title, author_id, year). Insert 2 authors and 3 books (one author wrote two!), then SELECT each table.',
        hints: ['books.author_id holds the id number of a row in authors.'],
        solution: { lang: 'sql', code: "CREATE TABLE authors (id INTEGER PRIMARY KEY, name TEXT NOT NULL);\nCREATE TABLE books (\n  id INTEGER PRIMARY KEY,\n  title TEXT NOT NULL,\n  author_id INTEGER,\n  year INTEGER\n);\n\nINSERT INTO authors (name) VALUES ('Octavia Butler');\nINSERT INTO authors (name) VALUES ('Ursula K. Le Guin');\n\nINSERT INTO books (title, author_id, year) VALUES ('Kindred', 1, 1979);\nINSERT INTO books (title, author_id, year) VALUES ('Parable of the Sower', 1, 1993);\nINSERT INTO books (title, author_id, year) VALUES ('The Dispossessed', 2, 1974);\n\nSELECT * FROM authors;\nSELECT * FROM books;" }
      }
    },

    /* ---------- ADVANCED ---------- */
    {
      id: 'sql-7', title: 'JOINs: connecting tables', level: 2, minutes: 14,
      blocks: [
        { t: 'p', html: 'Our orders table says dish_id 2 sold well — but humans want to read "Waffle Supreme", not "2". <code>JOIN</code> stitches tables back together along their ID references:' },
        { t: 'code', lang: 'sql', code: 'SELECT orders.day, dishes.name, orders.quantity\nFROM orders\nJOIN dishes ON orders.dish_id = dishes.id;' },
        { t: 'p', html: 'The <code>ON</code> clause is the seam: "match each order to the dish whose id equals the order\'s dish_id." Once joined, you can use columns from BOTH tables anywhere — WHERE, GROUP BY, ORDER BY:' },
        { t: 'code', lang: 'sql', code: '-- Revenue per dish, best sellers first:\nSELECT dishes.name,\n       SUM(orders.quantity * dishes.price) AS revenue\nFROM orders\nJOIN dishes ON orders.dish_id = dishes.id\nGROUP BY dishes.name\nORDER BY revenue DESC;' },
        { t: 'p', html: 'That query — join, multiply, group, sort — is the shape of half of all business reporting. Congratulations, you now read dashboards\' source code.' },
        { t: 'p', html: 'One nuance: a plain <code>JOIN</code> (inner join) drops rows with no partner — a dish nobody ordered vanishes from the report. <code>LEFT JOIN</code> keeps every row from the left table, filling the gaps with NULL:' },
        { t: 'code', lang: 'sql', code: '-- ALL dishes, even never-ordered ones:\nSELECT dishes.name, SUM(orders.quantity) AS sold\nFROM dishes\nLEFT JOIN orders ON orders.dish_id = dishes.id\nGROUP BY dishes.name;' }
      ],
      tryIt: {
        mode: 'sql',
        setup: DINER_DB,
        tables: DINER_NOTE,
        code: 'SELECT dishes.name,\n       SUM(orders.quantity * dishes.price) AS revenue\nFROM orders\nJOIN dishes ON orders.dish_id = dishes.id\nGROUP BY dishes.name\nORDER BY revenue DESC;\n\n-- Try: which days did vegan food sell? (JOIN + WHERE vegan = 1)'
      },
      quiz: [
        { q: 'What does the ON clause of a JOIN specify?', options: ['Which database to use', 'How rows from the two tables match up', 'The sort order', 'Which columns to show'], a: 1, why: 'ON is the matching rule — almost always foreign key = primary key.' },
        { q: 'A dish with zero orders appears in an INNER JOIN result?', options: ['Yes, with 0', 'No — inner joins only keep matched rows', 'Only with GROUP BY', 'It errors'], a: 1, why: 'No partner, no row. LEFT JOIN keeps it with NULLs instead.' },
        { q: 'Why store dish_id in orders instead of the dish name?', options: ['Numbers are prettier', 'IDs stay stable and avoid duplicated data — JOIN restores the name on demand', 'Names are illegal in SQL', 'To confuse beginners'], a: 1, why: 'Normalization + JOIN: store the reference, reconstruct the readable view when querying.' }
      ],
      challenge: {
        text: 'Produce the diner\'s daily revenue report: each day with its total revenue (quantity × price), sorted by revenue, best day first. Then modify it to include only non-vegan revenue.',
        hints: ['GROUP BY orders.day this time.', 'The vegan filter is a WHERE on the joined result.'],
        solution: { lang: 'sql', code: 'SELECT orders.day,\n       SUM(orders.quantity * dishes.price) AS revenue\nFROM orders\nJOIN dishes ON orders.dish_id = dishes.id\nWHERE dishes.vegan = 0\nGROUP BY orders.day\nORDER BY revenue DESC;' }
      }
    },

    {
      id: 'sql-8', title: 'SQL in the real world', level: 2, minutes: 14,
      blocks: [
        { t: 'p', html: 'You\'ve been using <b>SQLite</b> — a complete database in a single file, and the most deployed software on Earth (it\'s inside every phone, browser and smart TV). Its bigger siblings run the internet\'s backends:' },
        { t: 'table', head: ['Database', 'Personality'], rows: [
          ['SQLite', 'one file, zero setup — apps, prototypes, and this very page'],
          ['PostgreSQL', 'the powerful open-source favorite of startups'],
          ['MySQL / MariaDB', 'the classic web workhorse (WordPress, older web)'],
          ['SQL Server / Oracle', 'the corporate heavyweights'],
          ['DuckDB', 'the analytics specialist — SQL over huge files, locally']
        ] },
        { t: 'p', html: 'The dialects differ at the edges; everything you learned here works in all of them. And every language on this site can speak SQL:' },
        { t: 'code', lang: 'python', code: 'import sqlite3\n\ndb = sqlite3.connect("diner.db")\nrows = db.execute(\n    "SELECT name, price FROM dishes WHERE price < ?", (6,)\n).fetchall()\nfor name, price in rows:\n    print(f"{name}: ${price}")' },
        { t: 'p', html: 'See the <code>?</code> in that query? That\'s a <b>parameterized query</b> — the value is passed separately, never glued into the SQL string. This defends against <b>SQL injection</b>, the classic attack where a malicious user types <code>\'; DROP TABLE users; --</code> into a login form and, if the site naively pastes input into its SQL, executes it. The rule every developer must know: <b>never build SQL by concatenating user input — always use ? placeholders.</b>' },
        { t: 'p', html: 'Two more ideas you\'ll meet immediately in real work:' },
        { t: 'ul', items: [
          '<b>Subqueries</b> — a query inside a query: <code>SELECT name FROM dishes WHERE price > (SELECT AVG(price) FROM dishes)</code> — "dishes pricier than average".',
          '<b>Indexes</b> — <code>CREATE INDEX idx ON orders(day)</code> builds a lookup structure that turns slow scans into instant finds. The classic fix for a slow query.'
        ] },
        { t: 'tip', html: '🎓 <b>Track complete!</b> SQL pairs with everything: query databases from your Python scripts, build a backend that serves query results as JSON to your JavaScript, and try the database design project in the Projects section.' }
      ],
      tryIt: {
        mode: 'sql',
        setup: DINER_DB,
        tables: DINER_NOTE,
        code: '-- Subquery: dishes pricier than the average dish\nSELECT name, price FROM dishes\nWHERE price > (SELECT AVG(price) FROM dishes)\nORDER BY price DESC;\n\n-- And proof the average is what we think:\nSELECT AVG(price) AS average_price FROM dishes;'
      },
      quiz: [
        { q: 'The most widely deployed database on Earth is…', options: ['Oracle', 'PostgreSQL', 'SQLite', 'Excel'], a: 2, why: 'SQLite ships inside every phone, browser, and countless devices — trillions of copies.' },
        { q: 'SQL injection happens when…', options: ['Databases get too full', 'User input is glued directly into an SQL string and gets executed', 'Queries run too fast', 'Tables are joined wrongly'], a: 1, why: 'Attacker-controlled text becomes attacker-controlled SQL. Parameterized queries (?) prevent it.' },
        { q: 'A query got slow as the table grew to a million rows. The classic first fix:', options: ['A bigger server', 'An index on the column being searched', 'Rewriting in C', 'Splitting into 10 tables'], a: 1, why: 'Indexes turn full-table scans into direct lookups — often a 1000x speedup for one line of SQL.' }
      ],
      challenge: {
        text: 'Combine the track: find each day\'s best-selling dish name. Warm-up version: join + group by day and name, then eyeball the winners. (The strict one-row-per-day version needs window functions — a rabbit hole for another day.)',
        hints: ['SELECT day, name, SUM(quantity) grouped by both, ordered by day then total DESC.'],
        solution: { lang: 'sql', code: 'SELECT orders.day, dishes.name, SUM(orders.quantity) AS sold\nFROM orders\nJOIN dishes ON orders.dish_id = dishes.id\nGROUP BY orders.day, dishes.name\nORDER BY orders.day, sold DESC;' }
      }
    }
  ]
};
