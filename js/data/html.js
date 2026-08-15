/* ============================================================
   HTML track — lesson data
   Shape: { id, title, level (0=Beginner 1=Intermediate 2=Advanced),
            minutes, blocks[], tryIt{}, quiz[], challenge{} }
   Block types: p, h, h3, ul, ol, code, tip, warn, table
   ============================================================ */
window.CT_TRACKS = window.CT_TRACKS || {};

window.CT_TRACKS.html = {
  id: 'html',
  name: 'HTML',
  icon: '<>',
  area: 'web',
  tagline: 'The skeleton of every web page — what things ARE.',
  blurb: 'HTML (HyperText Markup Language) describes the structure and content of a web page: headings, paragraphs, images, links, forms. Every website you have ever visited is built on it. It is the perfect first language — you can see results in seconds.',
  uses: ['Every web page on Earth', 'Emails (newsletters are HTML)', 'App interfaces (Electron, mobile web views)', 'Documentation & wikis', 'E-books (EPUB is HTML inside)'],
  lessons: [

    /* ---------- BEGINNER ---------- */
    {
      id: 'html-1', title: 'Your first web page', level: 0, minutes: 8,
      blocks: [
        { t: 'p', html: 'A web page is just a text file. You write <b>tags</b> in it, save it, and a browser turns those tags into what you see on screen. That\'s HTML — <b>HyperText Markup Language</b>. It doesn\'t "run" like a program; it <i>describes</i> what things are: "this is a heading", "this is a paragraph", "this is a picture".' },
        { t: 'p', html: 'A tag is a word wrapped in angle brackets, like <code>&lt;h1&gt;</code>. Most tags come in pairs — an opening tag and a closing tag with a slash — and the content goes between them:' },
        { t: 'code', lang: 'html', code: '<h1>Hello, world!</h1>\n<p>This is my very first web page.</p>' },
        { t: 'p', html: '<code>&lt;h1&gt;</code> means "main heading" and <code>&lt;p&gt;</code> means "paragraph". A full page wraps everything in a standard skeleton:' },
        { t: 'code', lang: 'html', code: '<!doctype html>\n<html>\n  <head>\n    <title>My First Page</title>\n  </head>\n  <body>\n    <h1>Hello, world!</h1>\n    <p>This is my very first web page.</p>\n  </body>\n</html>' },
        { t: 'ul', items: [
          '<code>&lt;!doctype html&gt;</code> — tells the browser "this is modern HTML".',
          '<code>&lt;head&gt;</code> — information <i>about</i> the page (like its title in the browser tab). Not visible on the page itself.',
          '<code>&lt;body&gt;</code> — everything that actually shows on screen.'
        ] },
        { t: 'tip', html: '<b>To make a real page on your computer:</b> open Notepad (or any editor), paste the skeleton above, and save the file as <code>mypage.html</code>. Double-click the file — it opens in your browser. Congratulations, you\'re a web developer.' }
      ],
      tryIt: {
        mode: 'web',
        html: '<h1>Hello, world!</h1>\n<p>This is my very first web page.</p>\n<p>Try changing this text, then press Run!</p>'
      },
      quiz: [
        { q: 'What does HTML describe?', options: ['How a page looks (colors, fonts)', 'The structure and content of a page', 'How a page behaves when clicked', 'How fast a page loads'], a: 1, why: 'HTML is about structure and meaning. Looks are CSS\'s job, and behavior is JavaScript\'s.' },
        { q: 'Which is a correctly written paragraph?', options: ['<code>&lt;p&gt;Hello&lt;/p&gt;</code>', '<code>(p)Hello(/p)</code>', '<code>&lt;p&gt;Hello&lt;p&gt;</code>', '<code>p: Hello</code>'], a: 0, why: 'Tags use angle brackets, and the closing tag has a slash: <code>&lt;/p&gt;</code>.' },
        { q: 'Where does visible page content go?', options: ['Inside <code>&lt;head&gt;</code>', 'Inside <code>&lt;title&gt;</code>', 'Inside <code>&lt;body&gt;</code>', 'Inside <code>&lt;!doctype&gt;</code>'], a: 2, why: 'The <code>&lt;body&gt;</code> holds everything shown on screen; the <code>&lt;head&gt;</code> holds info about the page.' }
      ],
      challenge: {
        text: 'In the editor above, add a second heading with your name in it, and a paragraph describing your favorite hobby.',
        hints: ['Headings come in sizes <code>&lt;h1&gt;</code> (biggest) down to <code>&lt;h6&gt;</code> (smallest). Try <code>&lt;h2&gt;</code> for the second one.'],
        solution: { lang: 'html', code: '<h1>Hello, world!</h1>\n<h2>I\'m Alex</h2>\n<p>I love building things — and now I\'m building web pages.</p>' }
      }
    },

    {
      id: 'html-2', title: 'Headings, paragraphs & text style', level: 0, minutes: 10,
      blocks: [
        { t: 'p', html: 'Pages are mostly text, so HTML gives you a toolbox for it. Headings create an outline: <code>&lt;h1&gt;</code> is the page\'s main title, <code>&lt;h2&gt;</code> starts a section, <code>&lt;h3&gt;</code> a subsection, down to <code>&lt;h6&gt;</code>.' },
        { t: 'warn', html: 'Use headings for <b>structure</b>, not for making text big. There should usually be exactly one <code>&lt;h1&gt;</code> per page — like a book has one title.' },
        { t: 'p', html: 'Inside paragraphs, you can mark up individual words:' },
        { t: 'table', head: ['Tag', 'Meaning', 'Usually looks like'], rows: [
          ['<code>&lt;strong&gt;</code>', 'importantly emphasized', '<b>bold</b>'],
          ['<code>&lt;em&gt;</code>', 'stressed emphasis', '<i>italic</i>'],
          ['<code>&lt;mark&gt;</code>', 'highlighted', 'yellow highlight'],
          ['<code>&lt;small&gt;</code>', 'fine print', 'smaller text'],
          ['<code>&lt;br&gt;</code>', 'line break (no closing tag)', 'text continues on next line']
        ] },
        { t: 'code', lang: 'html', code: '<h1>Cooking 101</h1>\n<h2>Rule number one</h2>\n<p><strong>Never</strong> leave the stove unattended.\nIt <em>will</em> burn the moment you look away.</p>\n<p><small>This advice is free. Results may vary.</small></p>' },
        { t: 'p', html: 'Notice the line break inside the paragraph in the code did <b>not</b> appear on the page — browsers collapse whitespace. If you truly need a line break, use <code>&lt;br&gt;</code>. If you\'re starting a new thought, use a new <code>&lt;p&gt;</code> instead.' }
      ],
      tryIt: {
        mode: 'web',
        html: '<h1>Cooking 101</h1>\n<h2>Rule number one</h2>\n<p><strong>Never</strong> leave the stove unattended.</p>\n\n<!-- Add an h2 section called "Rule number two" with a paragraph -->'
      },
      quiz: [
        { q: 'How many <code>&lt;h1&gt;</code> headings should a page normally have?', options: ['As many as you like', 'One', 'At least three', 'Zero'], a: 1, why: 'One main title per page keeps the outline clear — for readers, screen readers and search engines.' },
        { q: 'Which tag marks text as importantly emphasized (typically bold)?', options: ['<code>&lt;bold&gt;</code>', '<code>&lt;em&gt;</code>', '<code>&lt;strong&gt;</code>', '<code>&lt;big&gt;</code>'], a: 2, why: '<code>&lt;strong&gt;</code> = strong importance (bold). <code>&lt;em&gt;</code> = stress emphasis (italic).' },
        { q: 'You press Enter in your HTML file. What does the browser show?', options: ['A line break', 'A new paragraph', 'Nothing — whitespace collapses', 'An error'], a: 2, why: 'Browsers collapse line breaks and repeated spaces into a single space. Use <code>&lt;br&gt;</code> or a new <code>&lt;p&gt;</code>.' }
      ],
      challenge: {
        text: 'Write a mini "About my week" section: one <code>&lt;h1&gt;</code>, two <code>&lt;h2&gt;</code> sections (e.g. "The good" and "The bad"), each with a paragraph using at least one <code>&lt;strong&gt;</code> and one <code>&lt;em&gt;</code>.',
        hints: ['Structure first (headings), then paragraphs, then sprinkle the emphasis tags inside the sentences.'],
        solution: { lang: 'html', code: '<h1>About my week</h1>\n<h2>The good</h2>\n<p>I <strong>finally</strong> started learning HTML. It is <em>much</em> easier than I feared.</p>\n<h2>The bad</h2>\n<p>I stayed up <em>way</em> too late doing it. <strong>Worth it.</strong></p>' }
      }
    },

    {
      id: 'html-3', title: 'Lists', level: 0, minutes: 8,
      blocks: [
        { t: 'p', html: 'Half the web is lists: menus, search results, to-dos, "top 10" articles. HTML has two main kinds:' },
        { t: 'ul', items: [
          '<code>&lt;ul&gt;</code> — <b>u</b>nordered <b>l</b>ist (bullet points), when order doesn\'t matter.',
          '<code>&lt;ol&gt;</code> — <b>o</b>rdered <b>l</b>ist (numbered), when it does.'
        ] },
        { t: 'p', html: 'Each item inside either kind is an <code>&lt;li&gt;</code> — <b>l</b>ist <b>i</b>tem:' },
        { t: 'code', lang: 'html', code: '<h2>Shopping list</h2>\n<ul>\n  <li>Milk</li>\n  <li>Bread</li>\n  <li>Hot sauce</li>\n</ul>\n\n<h2>How to make toast</h2>\n<ol>\n  <li>Put bread in toaster</li>\n  <li>Wait</li>\n  <li>Apply hot sauce (optional but correct)</li>\n</ol>' },
        { t: 'p', html: 'Lists can nest — put a whole <code>&lt;ul&gt;</code> <i>inside</i> an <code>&lt;li&gt;</code> to make sub-bullets:' },
        { t: 'code', lang: 'html', code: '<ul>\n  <li>Fruit\n    <ul>\n      <li>Apples</li>\n      <li>Bananas</li>\n    </ul>\n  </li>\n  <li>Vegetables</li>\n</ul>' }
      ],
      tryIt: {
        mode: 'web',
        html: '<h2>My top 3 favorite foods</h2>\n<ol>\n  <li>Pizza</li>\n  <li>Tacos</li>\n  <li>Replace these with YOUR favorites</li>\n</ol>'
      },
      quiz: [
        { q: 'Which list gives you numbers automatically?', options: ['<code>&lt;ul&gt;</code>', '<code>&lt;ol&gt;</code>', '<code>&lt;li&gt;</code>', '<code>&lt;list&gt;</code>'], a: 1, why: '<code>&lt;ol&gt;</code> = ordered list. The browser numbers the items for you.' },
        { q: 'What goes directly inside a <code>&lt;ul&gt;</code>?', options: ['Paragraphs', '<code>&lt;li&gt;</code> items', 'Plain text', 'Headings'], a: 1, why: 'Lists contain list items. Other content goes inside those <code>&lt;li&gt;</code> elements.' },
        { q: 'How do you make sub-bullets under an item?', options: ['Use <code>&lt;subli&gt;</code>', 'Indent the text with spaces', 'Nest a <code>&lt;ul&gt;</code> inside that <code>&lt;li&gt;</code>', 'You can\'t nest lists'], a: 2, why: 'A list inside a list item creates a nested (indented) list.' }
      ],
      challenge: {
        text: 'Build a numbered recipe with at least 4 steps, where one step contains a nested bullet list of ingredients to add at that step.',
        hints: ['The nested <code>&lt;ul&gt;</code> goes <i>before</i> the closing <code>&lt;/li&gt;</code> of the step it belongs to.'],
        solution: { lang: 'html', code: '<h2>Emergency pancakes</h2>\n<ol>\n  <li>Mix the dry things\n    <ul>\n      <li>1 cup flour</li>\n      <li>1 tbsp sugar</li>\n      <li>pinch of salt</li>\n    </ul>\n  </li>\n  <li>Whisk in one egg and a cup of milk</li>\n  <li>Fry spoonfuls in a hot pan</li>\n  <li>Flip when bubbly. Eat immediately.</li>\n</ol>' }
      }
    },

    {
      id: 'html-4', title: 'Links & images', level: 0, minutes: 12,
      blocks: [
        { t: 'p', html: 'Links are the "HyperText" in HTML — they\'re what makes the web a web. A link is an <code>&lt;a&gt;</code> (anchor) tag, and it introduces something new: an <b>attribute</b>. Attributes are extra settings written inside the opening tag as <code>name="value"</code>.' },
        { t: 'code', lang: 'html', code: '<a href="https://www.wikipedia.org">Visit Wikipedia</a>' },
        { t: 'p', html: '<code>href</code> ("hypertext reference") is the destination. The text between the tags is what you click. Links can point to other websites, to your own pages (<code>href="about.html"</code>), or to a spot on the same page.' },
        { t: 'p', html: 'Images use the <code>&lt;img&gt;</code> tag. It has no closing tag (there\'s nothing to put "inside" an image) and takes two important attributes:' },
        { t: 'code', lang: 'html', code: '<img src="cat.jpg" alt="An orange cat asleep on a keyboard">' },
        { t: 'ul', items: [
          '<code>src</code> — the image file to show (a file next to your page, or a full URL).',
          '<code>alt</code> — a text description. Shown if the image can\'t load, and read aloud by screen readers. <b>Always write one.</b>'
        ] },
        { t: 'tip', html: 'Want a clickable image? Put the <code>&lt;img&gt;</code> <i>inside</i> the <code>&lt;a&gt;</code>: <code>&lt;a href="..."&gt;&lt;img src="..." alt="..."&gt;&lt;/a&gt;</code>' },
        { t: 'p', html: 'In the editor below, the image uses a tiny built-in placeholder so it works offline. On a real page you\'d point <code>src</code> at a real file or URL.' }
      ],
      tryIt: {
        mode: 'web',
        html: '<h1>My favorite site</h1>\n<p>\n  When I need to know literally anything, I go to\n  <a href="https://www.wikipedia.org">Wikipedia</a>.\n</p>\n\n<img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'100\'%3E%3Crect width=\'160\' height=\'100\' fill=\'%23f4b942\'/%3E%3Ccircle cx=\'80\' cy=\'50\' r=\'30\' fill=\'%23333\'/%3E%3C/svg%3E" alt="A placeholder picture: a dark circle on a yellow background">'
      },
      quiz: [
        { q: 'Which attribute sets where a link goes?', options: ['<code>src</code>', '<code>link</code>', '<code>href</code>', '<code>url</code>'], a: 2, why: '<code>href</code> on an <code>&lt;a&gt;</code> tag is the destination. <code>src</code> is for images and scripts.' },
        { q: 'Why should every image have an <code>alt</code> attribute?', options: ['It makes the image load faster', 'It describes the image for screen readers and when loading fails', 'It is required or the page crashes', 'It sets the image size'], a: 1, why: 'Alt text makes images usable for people who can\'t see them — and shows when the file is missing.' },
        { q: 'Which tag has no closing tag?', options: ['<code>&lt;a&gt;</code>', '<code>&lt;p&gt;</code>', '<code>&lt;img&gt;</code>', '<code>&lt;h1&gt;</code>'], a: 2, why: '<code>&lt;img&gt;</code> is a "void" element — it has no content inside, so nothing to close. Same for <code>&lt;br&gt;</code>.' }
      ],
      challenge: {
        text: 'Make a tiny "3 links I use every day" page: a heading, then an unordered list where each item is a link to a real site.',
        hints: ['Each <code>&lt;li&gt;</code> contains one <code>&lt;a&gt;</code>.', 'URLs need the full <code>https://</code> at the front, or the browser thinks it\'s a local file.'],
        solution: { lang: 'html', code: '<h1>3 links I use every day</h1>\n<ul>\n  <li><a href="https://www.wikipedia.org">Wikipedia</a></li>\n  <li><a href="https://www.youtube.com">YouTube</a></li>\n  <li><a href="https://weather.com">The weather</a></li>\n</ul>' }
      }
    },

    /* ---------- INTERMEDIATE ---------- */
    {
      id: 'html-5', title: 'Structuring a page: containers & semantic tags', level: 1, minutes: 12,
      blocks: [
        { t: 'p', html: 'Real pages aren\'t one long stream of text — they have a header, navigation, main content, sidebars, a footer. HTML has tags whose whole job is to <b>group</b> other elements into these regions.' },
        { t: 'p', html: 'The generic ones are <code>&lt;div&gt;</code> (a block/box) and <code>&lt;span&gt;</code> (an inline piece of text). They mean nothing by themselves — they exist so you can group things and style them with CSS later.' },
        { t: 'p', html: 'But HTML also has <b>semantic</b> containers — same behavior as a div, but the name tells everyone (browsers, screen readers, search engines, future-you) what the region <i>is</i>:' },
        { t: 'table', head: ['Tag', 'Use it for'], rows: [
          ['<code>&lt;header&gt;</code>', 'the top of the page: logo, title, tagline'],
          ['<code>&lt;nav&gt;</code>', 'the main navigation links'],
          ['<code>&lt;main&gt;</code>', 'the main content — one per page'],
          ['<code>&lt;section&gt;</code>', 'a themed group of content, usually with its own heading'],
          ['<code>&lt;article&gt;</code>', 'a self-contained piece: a blog post, a comment, a card'],
          ['<code>&lt;aside&gt;</code>', 'side content: related links, ads, fun facts'],
          ['<code>&lt;footer&gt;</code>', 'the bottom: copyright, contact, small print']
        ] },
        { t: 'code', lang: 'html', code: '<header>\n  <h1>The Daily Waffle</h1>\n  <nav>\n    <a href="#news">News</a>\n    <a href="#recipes">Recipes</a>\n  </nav>\n</header>\n\n<main>\n  <article>\n    <h2>Waffle prices hit all-time high</h2>\n    <p>Experts blame "deliciousness".</p>\n  </article>\n</main>\n\n<footer>\n  <p>© 2026 The Daily Waffle</p>\n</footer>' },
        { t: 'tip', html: 'Rule of thumb: reach for a semantic tag first. If none fits, <i>then</i> use a <code>&lt;div&gt;</code>. Your pages will be easier to style, easier to read, and friendlier to screen readers.' }
      ],
      tryIt: {
        mode: 'web',
        html: '<header>\n  <h1>My Site</h1>\n  <nav>\n    <a href="#">Home</a> |\n    <a href="#">About</a>\n  </nav>\n</header>\n\n<main>\n  <section>\n    <h2>Welcome</h2>\n    <p>Try adding an <b>article</b> and a <b>footer</b>.</p>\n  </section>\n</main>'
      },
      quiz: [
        { q: 'What does a <code>&lt;div&gt;</code> mean, semantically?', options: ['A navigation area', 'A paragraph', 'Nothing — it\'s a generic box', 'The main content'], a: 2, why: 'Divs are meaning-free containers. Use them when no semantic tag fits.' },
        { q: 'How many <code>&lt;main&gt;</code> elements should a page have?', options: ['One', 'One per section', 'As many as needed', 'Zero — it\'s obsolete'], a: 0, why: 'A page has one main content area, so one <code>&lt;main&gt;</code>.' },
        { q: 'A blog post preview card that could stand on its own is best wrapped in…', options: ['<code>&lt;span&gt;</code>', '<code>&lt;article&gt;</code>', '<code>&lt;footer&gt;</code>', '<code>&lt;nav&gt;</code>'], a: 1, why: '<code>&lt;article&gt;</code> = self-contained content that would make sense on its own.' }
      ],
      challenge: {
        text: 'Structure a fake newspaper front page: a <code>&lt;header&gt;</code> with the paper\'s name and a <code>&lt;nav&gt;</code>, a <code>&lt;main&gt;</code> with two <code>&lt;article&gt;</code>s (headline + paragraph each), an <code>&lt;aside&gt;</code> with a fun fact, and a <code>&lt;footer&gt;</code>.',
        hints: ['Sketch the regions as comments first: <code>&lt;!-- header --&gt;</code> etc., then fill them in.'],
        solution: { lang: 'html', code: '<header>\n  <h1>The Morning Yawn</h1>\n  <nav><a href="#">World</a> <a href="#">Local</a> <a href="#">Naps</a></nav>\n</header>\n<main>\n  <article>\n    <h2>Local cat elected mayor</h2>\n    <p>Turnout was purr-fect.</p>\n  </article>\n  <article>\n    <h2>Scientists confirm Mondays are real</h2>\n    <p>Further research pending coffee.</p>\n  </article>\n</main>\n<aside>\n  <p>Fun fact: honey never spoils.</p>\n</aside>\n<footer><p>© 2026 The Morning Yawn</p></footer>' }
      }
    },

    {
      id: 'html-6', title: 'Tables', level: 1, minutes: 10,
      blocks: [
        { t: 'p', html: 'When data naturally has rows and columns — scores, schedules, prices — use a table. The tags read like the structure itself:' },
        { t: 'ul', items: [
          '<code>&lt;table&gt;</code> — the whole table',
          '<code>&lt;tr&gt;</code> — a <b>t</b>able <b>r</b>ow',
          '<code>&lt;th&gt;</code> — a header cell (bold, usually the first row)',
          '<code>&lt;td&gt;</code> — a data cell'
        ] },
        { t: 'code', lang: 'html', code: '<table>\n  <tr>\n    <th>Game</th>\n    <th>Score</th>\n  </tr>\n  <tr>\n    <td>Chess</td>\n    <td>1 – 0</td>\n  </tr>\n  <tr>\n    <td>Air hockey</td>\n    <td>7 – 4</td>\n  </tr>\n</table>' },
        { t: 'p', html: 'Bare tables have no borders — that\'s CSS\'s job later. For now, know that structure comes first: rows contain cells, and every row should have the same number of cells.' },
        { t: 'warn', html: 'Don\'t use tables to lay out a whole page (that\'s a 1990s move — CSS does layout now). Tables are for <i>data</i> that belongs in rows and columns.' }
      ],
      tryIt: {
        mode: 'web',
        html: '<h2>High scores</h2>\n<table border="1">\n  <tr>\n    <th>Player</th>\n    <th>Points</th>\n  </tr>\n  <tr>\n    <td>Sam</td>\n    <td>2400</td>\n  </tr>\n  <!-- Add two more rows! -->\n</table>',
        note: 'The border="1" attribute is a quick preview trick — real borders are done with CSS, which you\'ll meet in the CSS track.'
      },
      quiz: [
        { q: 'Which tag makes one row of a table?', options: ['<code>&lt;td&gt;</code>', '<code>&lt;tr&gt;</code>', '<code>&lt;row&gt;</code>', '<code>&lt;th&gt;</code>'], a: 1, why: '<code>&lt;tr&gt;</code> = table row. Cells (<code>&lt;td&gt;</code>/<code>&lt;th&gt;</code>) go inside it.' },
        { q: 'What\'s the difference between <code>&lt;th&gt;</code> and <code>&lt;td&gt;</code>?', options: ['No difference', '<code>&lt;th&gt;</code> is a header cell, <code>&lt;td&gt;</code> is a data cell', '<code>&lt;th&gt;</code> is taller', '<code>&lt;td&gt;</code> is deprecated'], a: 1, why: 'Header cells label a column or row; browsers show them bold and screen readers announce them as headers.' },
        { q: 'Tables are the right tool for…', options: ['Positioning your whole page layout', 'Data with rows and columns', 'Image galleries', 'Navigation menus'], a: 1, why: 'Page layout belongs to CSS. Tables are for tabular data.' }
      ],
      challenge: {
        text: 'Build a weekly schedule table: columns for Day, Morning, and Evening; rows for at least three days.',
        hints: ['First row: three <code>&lt;th&gt;</code> cells. Every following row: three <code>&lt;td&gt;</code> cells.'],
        solution: { lang: 'html', code: '<table border="1">\n  <tr><th>Day</th><th>Morning</th><th>Evening</th></tr>\n  <tr><td>Mon</td><td>Gym</td><td>Study HTML</td></tr>\n  <tr><td>Wed</td><td>Work</td><td>Build a page</td></tr>\n  <tr><td>Sat</td><td>Sleep in</td><td>Pizza + coding</td></tr>\n</table>' }
      }
    },

    {
      id: 'html-7', title: 'Forms & inputs', level: 1, minutes: 14,
      blocks: [
        { t: 'p', html: 'Every login box, search bar, and signup page is an HTML <b>form</b>. Forms collect input from the user. The container is <code>&lt;form&gt;</code>, and the workhorses inside are <code>&lt;input&gt;</code>, <code>&lt;textarea&gt;</code>, <code>&lt;select&gt;</code>, and <code>&lt;button&gt;</code>.' },
        { t: 'p', html: '<code>&lt;input&gt;</code> is a chameleon — its <code>type</code> attribute changes what it is:' },
        { t: 'table', head: ['Type', 'What you get'], rows: [
          ['<code>type="text"</code>', 'one-line text box'],
          ['<code>type="password"</code>', 'text box that hides what you type'],
          ['<code>type="email"</code>', 'text box that checks for an @'],
          ['<code>type="number"</code>', 'number box with up/down arrows'],
          ['<code>type="checkbox"</code>', 'a check box ☑'],
          ['<code>type="radio"</code>', 'pick-one-of-several circles'],
          ['<code>type="range"</code>', 'a slider'],
          ['<code>type="color"</code>', 'a color picker'],
          ['<code>type="date"</code>', 'a date picker']
        ] },
        { t: 'p', html: 'Every input should have a <code>&lt;label&gt;</code> so people (and screen readers) know what it\'s for. Connect them with <code>for</code> on the label matching <code>id</code> on the input — then clicking the label focuses the input:' },
        { t: 'code', lang: 'html', code: '<form>\n  <label for="name">Your name</label>\n  <input type="text" id="name" placeholder="e.g. Sam">\n\n  <label for="mood">Mood today</label>\n  <select id="mood">\n    <option>Great</option>\n    <option>Fine</option>\n    <option>Send snacks</option>\n  </select>\n\n  <button type="button">Save</button>\n</form>' },
        { t: 'tip', html: '<code>placeholder</code> shows gray hint text inside an empty box. It\'s a hint, <b>not</b> a replacement for a label.' },
        { t: 'p', html: 'Normally, submitting a form sends its data to a server. We don\'t have a server here — in the JavaScript track you\'ll learn to grab form values yourself and do something with them right in the page.' }
      ],
      tryIt: {
        mode: 'web',
        html: '<form>\n  <p>\n    <label for="pet">Pet\'s name</label><br>\n    <input type="text" id="pet" placeholder="e.g. Waffles">\n  </p>\n  <p>\n    <label for="size">Pet size</label><br>\n    <input type="range" id="size" min="1" max="100">\n  </p>\n  <p>\n    <label><input type="checkbox"> My pet is a good pet</label>\n  </p>\n  <button type="button">Submit (does nothing... yet)</button>\n</form>'
      },
      quiz: [
        { q: 'Which input type hides the characters as you type?', options: ['<code>type="hidden"</code>', '<code>type="secret"</code>', '<code>type="password"</code>', '<code>type="text"</code>'], a: 2, why: '<code>type="password"</code> masks input. <code>type="hidden"</code> hides the whole field, which is different.' },
        { q: 'Why do inputs need a <code>&lt;label&gt;</code>?', options: ['They break without one', 'It says what the field is for — visually and to screen readers', 'It submits the form', 'It stores the value'], a: 1, why: 'Labels give the field meaning, and clicking a connected label focuses its input.' },
        { q: 'How does a label connect to its input?', options: ['They just need to be adjacent', '<code>for</code> on the label matches <code>id</code> on the input', '<code>name</code> matches <code>class</code>', 'With JavaScript only'], a: 1, why: '<code>&lt;label for="x"&gt;</code> pairs with <code>&lt;input id="x"&gt;</code>. (Wrapping the input inside the label also works.)' }
      ],
      challenge: {
        text: 'Build a "Plan my party" form: a text input for the party name, a date input, a number input for guest count, radio buttons for indoor/outdoor, and a button.',
        hints: ['Radio buttons that share the same <code>name</code> attribute become a pick-one group: <code>&lt;input type="radio" name="place"&gt;</code>.'],
        solution: { lang: 'html', code: '<form>\n  <p><label for="pname">Party name</label><br>\n    <input type="text" id="pname" placeholder="Waffle Fest"></p>\n  <p><label for="pdate">Date</label><br>\n    <input type="date" id="pdate"></p>\n  <p><label for="guests">Guests</label><br>\n    <input type="number" id="guests" min="1" max="500"></p>\n  <p>\n    <label><input type="radio" name="place" checked> Indoor</label>\n    <label><input type="radio" name="place"> Outdoor</label>\n  </p>\n  <button type="button">Plan it!</button>\n</form>' }
      }
    },

    /* ---------- ADVANCED ---------- */
    {
      id: 'html-8', title: 'Media: video, audio & embeds', level: 2, minutes: 10,
      blocks: [
        { t: 'p', html: 'Modern HTML plays media natively — no plugins. The <code>&lt;video&gt;</code> and <code>&lt;audio&gt;</code> tags take a <code>src</code> (or child <code>&lt;source&gt;</code> tags) plus attributes that control behavior:' },
        { t: 'code', lang: 'html', code: '<video src="trailer.mp4" controls width="480" poster="cover.jpg">\n  Sorry — your browser can\'t play this video.\n</video>\n\n<audio src="podcast.mp3" controls></audio>' },
        { t: 'table', head: ['Attribute', 'Effect'], rows: [
          ['<code>controls</code>', 'show play/pause/volume UI (you almost always want this)'],
          ['<code>autoplay</code>', 'start automatically — most browsers require <code>muted</code> too'],
          ['<code>loop</code>', 'restart when finished'],
          ['<code>muted</code>', 'start with sound off'],
          ['<code>poster</code>', '(video) image shown before playback starts']
        ] },
        { t: 'p', html: 'The text between the tags is a fallback for ancient browsers. Multiple <code>&lt;source&gt;</code> children let the browser pick a format it supports.' },
        { t: 'p', html: 'The other big embed tag is <code>&lt;iframe&gt;</code> — a window onto <i>another page</i> inside yours. YouTube embeds, maps, and this site\'s own live previews are all iframes:' },
        { t: 'code', lang: 'html', code: '<iframe\n  src="https://www.example.com"\n  width="560" height="315"\n  title="Embedded example page">\n</iframe>' },
        { t: 'warn', html: 'Always give iframes a <code>title</code> attribute describing what\'s inside — it\'s how screen reader users know what the frame is.' }
      ],
      tryIt: {
        mode: 'web',
        html: '<h2>Media demo</h2>\n<!-- This video URL is a tiny public test clip; it needs internet. -->\n<video controls width="320"\n  src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4">\n  Your browser cannot play this video.\n</video>\n<p>Try adding the <code>loop</code> attribute, or removing <code>controls</code>.</p>'
      },
      quiz: [
        { q: 'Which attribute shows the play/pause bar on a video?', options: ['<code>ui</code>', '<code>controls</code>', '<code>player</code>', '<code>visible</code>'], a: 1, why: 'Without <code>controls</code> the video has no visible interface at all.' },
        { q: 'Browsers usually block autoplaying video unless it is…', options: ['short', 'muted', 'small', 'an MP4'], a: 1, why: 'Autoplay-with-sound is blocked nearly everywhere. <code>autoplay muted</code> is the reliable combo.' },
        { q: 'What is an <code>&lt;iframe&gt;</code>?', options: ['An image frame', 'Another web page embedded inside yours', 'A special form', 'An animation container'], a: 1, why: 'An inline frame hosts a separate page — with its own document — inside your page.' }
      ],
      challenge: {
        text: 'Make a mini "movie page": a heading, a video with controls and a fallback message, and below it a paragraph review with a <code>&lt;strong&gt;</code> star rating.',
        hints: ['Reuse the sample video URL from the editor if you\'re online.'],
        solution: { lang: 'html', code: '<h1>Flower: The Motion Picture</h1>\n<video controls width="320"\n  src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4">\n  Your browser cannot play this video.\n</video>\n<p><strong>★★★★★</strong> — "Gripping. Botanical. A triumph." </p>' }
      }
    },

    {
      id: 'html-9', title: 'The <head>: titles, meta tags & icons', level: 2, minutes: 10,
      blocks: [
        { t: 'p', html: 'Everything in the <code>&lt;head&gt;</code> is invisible on the page but shapes how the page behaves and how the outside world sees it. The essentials:' },
        { t: 'code', lang: 'html', code: '<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Waffle Recipes — The Daily Waffle</title>\n  <meta name="description" content="27 waffle recipes, rated by crispiness.">\n  <link rel="icon" href="favicon.png">\n  <link rel="stylesheet" href="style.css">\n</head>' },
        { t: 'ul', items: [
          '<code>charset="utf-8"</code> — makes emoji, accents and other alphabets work. Always include it, always first.',
          '<code>viewport</code> — makes the page scale properly on phones. Without it, mobile browsers show a zoomed-out desktop page.',
          '<code>&lt;title&gt;</code> — the browser-tab text, and the headline in search results.',
          '<code>description</code> — the gray text under your link in search results.',
          '<code>&lt;link rel="icon"&gt;</code> — the little tab icon (favicon).',
          '<code>&lt;link rel="stylesheet"&gt;</code> — attaches a CSS file (see the CSS track!).'
        ] },
        { t: 'p', html: 'Search engines read your <code>&lt;title&gt;</code>, <code>description</code>, headings and link text to understand the page — this is the foundation of <b>SEO</b> (search engine optimization). No tricks needed: clear titles and honest descriptions <i>are</i> the technique.' },
        { t: 'tip', html: 'Social sites (and chat apps) read special <code>og:</code> meta tags for link previews: <code>&lt;meta property="og:title" content="..."&gt;</code>, <code>og:description</code>, <code>og:image</code>. That\'s how links get pretty preview cards.' }
      ],
      tryIt: {
        mode: 'web',
        html: '<!-- The head is invisible, so here\'s the visible proof it matters: -->\n<h1>Look at this page\'s real tab ↑</h1>\n<p>This preview runs in a frame, so it can\'t change the tab title.\nBut on a real page, the <b>&lt;title&gt;</b> tag controls exactly that.</p>\n<p>Quick exercise: write out a full head section from memory in this editor\n(it won\'t render — that\'s the point, it\'s metadata!).</p>'
      },
      quiz: [
        { q: 'Where does the text in the browser tab come from?', options: ['The first <code>&lt;h1&gt;</code>', 'The <code>&lt;title&gt;</code> tag in the head', 'The file name', 'The <code>description</code> meta tag'], a: 1, why: '<code>&lt;title&gt;</code> sets the tab text and the search-result headline.' },
        { q: 'What does the viewport meta tag do?', options: ['Sets the page colors', 'Makes the page scale correctly on phones', 'Loads the page faster', 'Adds a favicon'], a: 1, why: 'Without it, phones render a zoomed-out desktop-width page.' },
        { q: 'The honest core of SEO is…', options: ['Hiding keywords in white text', 'Clear titles, descriptions and headings that say what the page is', 'Buying links', 'Repeating words 100 times'], a: 1, why: 'Search engines reward pages that clearly are what they say they are. The "tricks" get penalized.' }
      ],
      challenge: {
        text: 'Write a complete, correct <code>&lt;head&gt;</code> for an imaginary bakery website — charset, viewport, title, description, and a favicon link.',
        hints: ['Order matters little except charset first. Title format "Page — Site name" is a good habit.'],
        solution: { lang: 'html', code: '<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Fresh Sourdough Daily — Crumb & Get It Bakery</title>\n  <meta name="description" content="Family bakery in Springfield. Sourdough, bagels and cakes baked every morning.">\n  <link rel="icon" href="favicon.png">\n</head>' }
      }
    },

    {
      id: 'html-10', title: 'Accessibility & clean HTML habits', level: 2, minutes: 12,
      blocks: [
        { t: 'p', html: 'Accessibility ("a11y") means your page works for everyone: people using screen readers, keyboard-only navigation, high zoom, or voice control. The good news — <b>most of accessibility is just using HTML correctly</b>, which you\'ve been learning all along.' },
        { t: 'ul', items: [
          '<b>Real headings in order.</b> Screen reader users jump between headings like a table of contents. Don\'t skip from <code>&lt;h1&gt;</code> to <code>&lt;h4&gt;</code> because it "looks right".',
          '<b>Alt text on every image.</b> Describe what matters: <code>alt="Golden retriever catching a frisbee"</code>, not <code>alt="image123.jpg"</code>. Purely decorative image? Use an empty <code>alt=""</code> so it\'s skipped.',
          '<b>Labels on every input.</b> Placeholder text disappears when you type and isn\'t reliably announced.',
          '<b>Real buttons and links.</b> A <code>&lt;button&gt;</code> is keyboard-focusable and announces itself as a button. A clickable <code>&lt;div&gt;</code> is invisible to keyboards unless you do extra work. Rule: links <i>go</i> places, buttons <i>do</i> things.',
          '<b>Meaningful link text.</b> "Read the pancake guide" beats "click here" — screen readers can list all links on a page, and twelve "click here"s help nobody.'
        ] },
        { t: 'p', html: 'A few habits that keep your HTML clean as pages grow:' },
        { t: 'ul', items: [
          'Indent nested tags consistently (2 spaces is common) so structure is visible at a glance.',
          'Use lowercase tag and attribute names — it\'s the convention everywhere.',
          'Quote attribute values: <code>class="card"</code>, not <code>class=card</code>.',
          'Add comments to mark sections: <code>&lt;!-- pricing table --&gt;</code>. Future-you says thanks.'
        ] },
        { t: 'tip', html: 'Free checkup: the <b>W3C validator</b> at validator.w3.org finds broken and misnested tags. Browsers also have accessibility checkers built into their developer tools (F12 → Lighthouse in Chrome).' }
      ],
      tryIt: {
        mode: 'web',
        html: '<!-- This page has 4 accessibility problems. Can you fix them all? -->\n<h1>Adopt a pet</h1>\n<h4>Dogs</h4>\n<img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'80\'%3E%3Crect width=\'120\' height=\'80\' fill=\'%2390c290\'/%3E%3C/svg%3E">\n<p><a href="#">Click here</a> to see the dogs.</p>\n<div onclick="alert(\'adopted!\')">Adopt now</div>',
        note: 'Problems: heading jumps h1→h4, image has no alt text, vague "click here" link, and a clickable div that should be a <button>.'
      },
      quiz: [
        { q: 'An image is purely decorative. What alt text should it have?', options: ['<code>alt="decorative image"</code>', 'No alt attribute at all', 'An empty <code>alt=""</code>', '<code>alt="image"</code>'], a: 2, why: 'Empty alt tells screen readers to skip it. A missing attribute makes some read the file name aloud.' },
        { q: 'Why is a <code>&lt;button&gt;</code> better than a clickable <code>&lt;div&gt;</code>?', options: ['It loads faster', 'It works with keyboards and announces itself correctly, for free', 'It looks better', 'Divs can\'t have onclick'], a: 1, why: 'Buttons are focusable, respond to Enter/Space, and are announced as buttons — divs need extra attributes and code to fake all that.' },
        { q: 'Which link text is best?', options: ['"Click here"', '"Link"', '"More"', '"Download the 2026 schedule"'], a: 3, why: 'Link text should say where it goes or what it does, even when read out of context.' }
      ],
      challenge: {
        text: 'Fix all four problems in the Try-it editor above, then add one improvement of your own choice (e.g. wrap the content in <code>&lt;main&gt;</code>).',
        hints: ['h1 → h2, add a real alt, rewrite the link text, replace the div with <code>&lt;button onclick="alert(\'adopted!\')"&gt;</code>.'],
        solution: { lang: 'html', code: '<main>\n  <h1>Adopt a pet</h1>\n  <h2>Dogs</h2>\n  <img src="..." alt="A happy green rectangle (placeholder for a dog photo)">\n  <p><a href="#">See all adoptable dogs</a></p>\n  <button onclick="alert(\'adopted!\')">Adopt now</button>\n</main>' }
      }
    }
  ]
};
