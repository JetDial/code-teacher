/* ============================================================
   CSS track — lesson data
   ============================================================ */
window.CT_TRACKS = window.CT_TRACKS || {};

window.CT_TRACKS.css = {
  id: 'css',
  name: 'CSS',
  icon: '{ }',
  area: 'web',
  tagline: 'The style of every web page — how things LOOK.',
  blurb: 'CSS (Cascading Style Sheets) controls colors, fonts, spacing, layout and animation. HTML says what things are; CSS says how they look. Together they are the visual web.',
  uses: ['Styling websites & apps', 'Page layout (flexbox, grid)', 'Responsive mobile design', 'Animations & transitions', 'Print stylesheets', 'Design systems & themes'],
  lessons: [

    /* ---------- BEGINNER ---------- */
    {
      id: 'css-1', title: 'What CSS is & how to add it', level: 0, minutes: 8,
      blocks: [
        { t: 'p', html: 'CSS is a list of style rules. Each rule says <b>who</b> it applies to (the <i>selector</i>) and <b>what</b> to change (properties and values):' },
        { t: 'code', lang: 'css', code: 'h1 {\n  color: darkred;\n  font-size: 40px;\n}' },
        { t: 'p', html: 'Read it as: "every <code>&lt;h1&gt;</code> on the page: make the text dark red and 40 pixels tall." The pattern is always <code>selector { property: value; }</code> — note the colon between property and value, and the semicolon after each declaration.' },
        { t: 'p', html: 'There are three ways to attach CSS to a page:' },
        { t: 'ol', items: [
          '<b>A separate file</b> (best): <code>&lt;link rel="stylesheet" href="style.css"&gt;</code> in the head. One stylesheet can style your whole site.',
          '<b>A &lt;style&gt; block</b> in the head — fine for small pages and experiments.',
          '<b>Inline</b> on one element: <code>&lt;p style="color: red"&gt;</code> — handy for a quick test, messy as a habit.'
        ] },
        { t: 'tip', html: 'In this site\'s editors, whatever you type in the CSS tab is automatically attached to the HTML tab\'s page — like method 2.' }
      ],
      tryIt: {
        mode: 'web',
        html: '<h1>Style me!</h1>\n<p>Switch to the CSS tab and change my look.</p>',
        css: 'h1 {\n  color: darkred;\n}\n\np {\n  color: gray;\n  font-size: 18px;\n}'
      },
      quiz: [
        { q: 'In <code>h1 { color: red; }</code>, what is <code>h1</code> called?', options: ['The property', 'The selector', 'The value', 'The attribute'], a: 1, why: 'The selector chooses which elements the rule applies to.' },
        { q: 'Which punctuation separates a property from its value?', options: ['A semicolon', 'An equals sign', 'A colon', 'A dash'], a: 2, why: '<code>property: value;</code> — colon between, semicolon after.' },
        { q: 'The best way to style a whole multi-page site is…', options: ['Inline styles on every tag', 'A linked .css file', 'A style block copied into each page', 'JavaScript'], a: 1, why: 'One linked stylesheet styles every page and you edit it in one place.' }
      ],
      challenge: {
        text: 'In the editor, make the paragraph dark blue, 20px, and give the h1 a yellow background.',
        hints: ['Background color is the <code>background</code> (or <code>background-color</code>) property.'],
        solution: { lang: 'css', code: 'h1 {\n  color: darkred;\n  background: yellow;\n}\n\np {\n  color: darkblue;\n  font-size: 20px;\n}' }
      }
    },

    {
      id: 'css-2', title: 'Colors, fonts & text', level: 0, minutes: 12,
      blocks: [
        { t: 'p', html: 'Colors can be written several ways — these are all the same red:' },
        { t: 'code', lang: 'css', code: 'p { color: red; }                  /* named color */\np { color: #ff0000; }              /* hex code */\np { color: rgb(255, 0, 0); }       /* red, green, blue 0-255 */\np { color: hsl(0, 100%, 50%); }    /* hue, saturation, lightness */' },
        { t: 'p', html: 'Hex codes are the most common: two characters each for red, green and blue. <code>#000000</code> is black, <code>#ffffff</code> is white, <code>#ff9900</code> is orange. Pick colors with any online color picker and paste the hex.' },
        { t: 'p', html: 'The essential text properties:' },
        { t: 'table', head: ['Property', 'Examples'], rows: [
          ['<code>color</code>', 'text color'],
          ['<code>font-size</code>', '<code>16px</code>, <code>1.2rem</code>, <code>2em</code>'],
          ['<code>font-family</code>', '<code>Georgia, serif</code> — a wish list; browser uses the first font it has'],
          ['<code>font-weight</code>', '<code>bold</code>, <code>400</code>, <code>700</code>'],
          ['<code>text-align</code>', '<code>left</code>, <code>center</code>, <code>right</code>'],
          ['<code>line-height</code>', '<code>1.6</code> — space between lines; unitless is best'],
          ['<code>text-decoration</code>', '<code>underline</code>, <code>none</code> (remove link underlines)']
        ] },
        { t: 'tip', html: 'About units: <code>px</code> is fixed pixels. <code>rem</code> scales with the user\'s font-size setting (1rem ≈ 16px by default) — friendlier for accessibility. A good habit: <code>rem</code> for font sizes, <code>px</code> for small details like borders.' }
      ],
      tryIt: {
        mode: 'web',
        html: '<h1>The Midnight Diner</h1>\n<p class="tagline">Open late. Pancakes always.</p>\n<p>Best diner in town — probably in the universe.</p>',
        css: 'body {\n  font-family: Georgia, serif;\n  background: #fdf6ec;\n  color: #333;\n}\n\nh1 {\n  color: #7a1f1f;\n  text-align: center;\n}\n\n.tagline {\n  text-align: center;\n  font-style: italic;\n  color: #b8860b;\n}'
      },
      quiz: [
        { q: 'What color is <code>#ffffff</code>?', options: ['Black', 'White', 'Red', 'Transparent'], a: 1, why: 'All three channels (red, green, blue) at maximum = white. All zero (#000000) = black.' },
        { q: 'Why list several fonts in <code>font-family: "Segoe UI", Arial, sans-serif;</code>?', options: ['They blend together', 'The browser uses the first one installed — the rest are fallbacks', 'It loads them all', 'It\'s required syntax'], a: 1, why: 'It\'s a preference list. Ending with a generic family (serif/sans-serif) guarantees something reasonable.' },
        { q: 'Which unit respects the user\'s font size settings best?', options: ['<code>px</code>', '<code>rem</code>', '<code>cm</code>', '<code>pt</code>'], a: 1, why: 'rem scales with the root font size, so users who enlarge text actually get larger text.' }
      ],
      challenge: {
        text: 'Restyle the diner page as "The Neon Arcade": dark background (<code>#111</code>), bright neon text colors, and a sans-serif font.',
        hints: ['Neon-ish colors: <code>#39ff14</code> (green), <code>#00e5ff</code> (cyan), <code>#ff2ec4</code> (pink).'],
        solution: { lang: 'css', code: 'body {\n  font-family: "Segoe UI", Arial, sans-serif;\n  background: #111;\n  color: #eee;\n}\n\nh1 {\n  color: #39ff14;\n  text-align: center;\n}\n\n.tagline {\n  color: #ff2ec4;\n  text-align: center;\n}' }
      }
    },

    {
      id: 'css-3', title: 'Selectors: classes, IDs & more', level: 0, minutes: 12,
      blocks: [
        { t: 'p', html: 'Styling every <code>&lt;p&gt;</code> the same way gets limiting fast. <b>Classes</b> let you label elements and style just those:' },
        { t: 'code', lang: 'html', code: '<p class="warning">The soup is extremely hot.</p>\n<p>This paragraph is normal.</p>' },
        { t: 'code', lang: 'css', code: '.warning {\n  color: white;\n  background: crimson;\n  padding: 8px;\n}' },
        { t: 'p', html: 'A dot in CSS means "class". Any element can have a class, elements can have several (<code>class="card featured"</code>), and many elements can share one — that\'s the point.' },
        { t: 'p', html: 'An <b>ID</b> (<code>#</code> in CSS, <code>id="..."</code> in HTML) labels exactly <i>one</i> element per page — good for unique things like <code>#site-header</code>.' },
        { t: 'p', html: 'Other selectors you\'ll use constantly:' },
        { t: 'table', head: ['Selector', 'Matches'], rows: [
          ['<code>p</code>', 'every &lt;p&gt;'],
          ['<code>.card</code>', 'anything with class="card"'],
          ['<code>#header</code>', 'the one element with id="header"'],
          ['<code>.card p</code>', 'paragraphs <i>inside</i> a .card (descendant)'],
          ['<code>h1, h2</code>', 'both h1s and h2s (a list)'],
          ['<code>a:hover</code>', 'links while the mouse is over them'],
          ['<code>li:first-child</code>', 'an li that is the first child of its parent'],
          ['<code>*</code>', 'everything (use sparingly)']
        ] },
        { t: 'p', html: 'When two rules target the same element, the more <b>specific</b> one wins (ID beats class beats tag), and among equals, the one written <i>later</i> wins. That\'s the "cascading" in Cascading Style Sheets.' }
      ],
      tryIt: {
        mode: 'web',
        html: '<h1>Menu</h1>\n<p class="dish">Pancakes — $5</p>\n<p class="dish special">Waffle Supreme — $9</p>\n<p class="dish">Toast — $2</p>\n<p id="footnote">Prices include one (1) compliment.</p>',
        css: '.dish {\n  padding: 6px;\n  border-bottom: 1px solid #ccc;\n}\n\n.special {\n  background: gold;\n  font-weight: bold;\n}\n\n#footnote {\n  font-size: 12px;\n  color: gray;\n}\n\n.dish:hover {\n  background: #eef;\n}'
      },
      quiz: [
        { q: 'What does <code>.card</code> select?', options: ['The element with id "card"', 'All elements with class "card"', 'All &lt;card&gt; tags', 'The first card only'], a: 1, why: 'Dot = class. Many elements can share a class.' },
        { q: 'How many elements per page should share one ID?', options: ['One', 'Up to ten', 'Any number', 'IDs are per-site, not per-page'], a: 0, why: 'IDs must be unique on the page. For groups, use classes.' },
        { q: 'What does <code>.menu a</code> select?', options: ['Elements with both classes', 'Links inside anything with class "menu"', 'The first link in .menu', 'A link with class "menu"'], a: 1, why: 'A space means "descendant of" — any &lt;a&gt; anywhere inside a .menu element.' }
      ],
      challenge: {
        text: 'Add a class <code>sold-out</code> to one dish and style it: gray text and <code>text-decoration: line-through</code>. Then make the <b>first</b> dish bigger using <code>:first-child</code> — without adding another class.',
        hints: ['An element can hold two classes: <code>class="dish sold-out"</code>.', '<code>.dish:first-child</code> — but careful, the h1 is the actual first child! Try <code>p:first-of-type</code> instead.'],
        solution: { lang: 'css', code: '.sold-out {\n  color: gray;\n  text-decoration: line-through;\n}\n\np:first-of-type {\n  font-size: 22px;\n}' }
      }
    },

    {
      id: 'css-4', title: 'The box model: spacing & borders', level: 0, minutes: 12,
      blocks: [
        { t: 'p', html: 'Every element on a page is a rectangular box, and every box has four layers — from inside out:' },
        { t: 'ol', items: [
          '<b>Content</b> — the text or image itself',
          '<b>Padding</b> — breathing room <i>inside</i> the box, between content and border',
          '<b>Border</b> — the box\'s edge',
          '<b>Margin</b> — space <i>outside</i> the box, pushing neighbors away'
        ] },
        { t: 'code', lang: 'css', code: '.card {\n  padding: 16px;              /* space inside */\n  border: 2px solid #333;     /* width style color */\n  border-radius: 12px;        /* rounded corners */\n  margin: 20px;               /* space outside */\n  background: #f5f5f5;        /* fills content + padding */\n}' },
        { t: 'p', html: 'Padding vs margin is <i>the</i> classic beginner confusion. Remember: <b>padding = inside</b> (the background color extends through it), <b>margin = outside</b> (always transparent).' },
        { t: 'p', html: 'You can set each side separately (<code>padding-top</code>, <code>margin-left</code>, …) or use shorthand: one value = all sides; two values = vertical, horizontal; four = top, right, bottom, left (clockwise).' },
        { t: 'code', lang: 'css', code: '.a { margin: 10px; }            /* all four sides */\n.b { margin: 10px 30px; }       /* 10 top/bottom, 30 left/right */\n.c { margin: 0 auto; }          /* classic: center a block horizontally */' },
        { t: 'tip', html: 'Add <code>* { box-sizing: border-box; }</code> to the top of your stylesheets. It makes <code>width</code> include padding and border — the way every human expects — instead of adding them on top. Nearly every real site does this.' }
      ],
      tryIt: {
        mode: 'web',
        html: '<div class="card">\n  <h2>Box model card</h2>\n  <p>Play with my padding, border and margin in the CSS tab.</p>\n</div>\n<div class="card">\n  <h2>Second card</h2>\n  <p>Margins keep us apart.</p>\n</div>',
        css: '* { box-sizing: border-box; }\n\nbody { font-family: sans-serif; background: #e8edf2; }\n\n.card {\n  background: white;\n  padding: 16px;\n  border: 2px solid #334;\n  border-radius: 12px;\n  margin: 20px;\n}'
      },
      quiz: [
        { q: 'Space between a box\'s content and its border is…', options: ['Margin', 'Padding', 'Gap', 'Outline'], a: 1, why: 'Padding is inside the border; margin is outside it.' },
        { q: 'What does <code>margin: 8px 24px;</code> mean?', options: ['8 left, 24 right', '8 top/bottom, 24 left/right', '8 all sides plus 24 extra', 'Invalid syntax'], a: 1, why: 'Two values = vertical then horizontal.' },
        { q: 'What does <code>box-sizing: border-box</code> change?', options: ['Adds a border automatically', 'Makes width include padding and border', 'Rounds the corners', 'Centers the box'], a: 1, why: 'With border-box, a 200px-wide card is truly 200px — padding and border fit inside.' }
      ],
      challenge: {
        text: 'Give the cards a max-width of 400px and center them on the page with the <code>margin: auto</code> trick. Then round one border side only.',
        hints: ['<code>max-width: 400px; margin: 20px auto;</code>', 'Single corners: <code>border-radius: 12px 0 0 12px;</code> goes clockwise from top-left.'],
        solution: { lang: 'css', code: '.card {\n  background: white;\n  padding: 16px;\n  border: 2px solid #334;\n  border-radius: 12px 0 12px 0;\n  max-width: 400px;\n  margin: 20px auto;\n}' }
      }
    },

    /* ---------- INTERMEDIATE ---------- */
    {
      id: 'css-5', title: 'Display & position', level: 1, minutes: 12,
      blocks: [
        { t: 'p', html: 'Why do headings stack vertically while links sit side by side? Every element has a <code>display</code> type:' },
        { t: 'ul', items: [
          '<b>block</b> — takes the full width, starts on a new line (h1, p, div, section…)',
          '<b>inline</b> — flows within text, width/height are ignored (a, strong, span…)',
          '<b>inline-block</b> — flows in a line <i>but</i> accepts width, height, and vertical padding',
          '<b>none</b> — removed from the page entirely (great for show/hide with JavaScript)'
        ] },
        { t: 'p', html: '<code>position</code> controls how an element is placed:' },
        { t: 'table', head: ['Value', 'Behavior'], rows: [
          ['<code>static</code>', 'the default — normal flow'],
          ['<code>relative</code>', 'normal spot, but nudgeable with top/left; also anchors absolute children'],
          ['<code>absolute</code>', 'removed from flow; positioned against the nearest positioned ancestor'],
          ['<code>fixed</code>', 'pinned to the screen — stays while scrolling (navbars, chat bubbles)'],
          ['<code>sticky</code>', 'scrolls normally, then sticks when it hits an edge']
        ] },
        { t: 'code', lang: 'css', code: '.badge {\n  position: absolute;\n  top: -10px;\n  right: -10px;\n}\n\n.card {\n  position: relative; /* the badge positions against ME */\n}' },
        { t: 'tip', html: 'The absolute+relative pairing is the classic pattern: put <code>position: relative</code> on the parent, <code>position: absolute</code> on the child, and the child\'s top/right/bottom/left measure from the parent\'s corners.' }
      ],
      tryIt: {
        mode: 'web',
        html: '<div class="card">\n  <span class="badge">NEW</span>\n  <h2>Sticker Pack</h2>\n  <p>Now with 30% more stickers.</p>\n</div>',
        css: 'body { font-family: sans-serif; padding: 40px; }\n\n.card {\n  position: relative;\n  width: 240px;\n  padding: 16px;\n  border: 2px solid #333;\n  border-radius: 10px;\n}\n\n.badge {\n  position: absolute;\n  top: -12px;\n  right: -12px;\n  background: crimson;\n  color: white;\n  padding: 4px 10px;\n  border-radius: 999px;\n  font-size: 12px;\n  font-weight: bold;\n}'
      },
      quiz: [
        { q: 'Which display type starts on a new line and takes full width?', options: ['inline', 'block', 'inline-block', 'none'], a: 1, why: 'Block elements stack vertically. Inline elements flow within text.' },
        { q: 'An absolutely-positioned element measures its top/left from…', options: ['The screen, always', 'Its nearest positioned ancestor (or the page if none)', 'Its previous sibling', 'The mouse position'], a: 1, why: 'That\'s why the parent usually gets <code>position: relative</code>.' },
        { q: 'A navbar that stays visible while you scroll uses…', options: ['<code>position: static</code>', '<code>display: block</code>', '<code>position: fixed</code> (or sticky)', '<code>float: top</code>'], a: 2, why: 'Fixed pins to the viewport; sticky sticks after scrolling to it.' }
      ],
      challenge: {
        text: 'Add a second badge to the bottom-left corner of the card saying "-50%", in a different color.',
        hints: ['Same recipe, but with <code>bottom</code> and <code>left</code> instead of top/right.'],
        solution: { lang: 'css', code: '.badge-sale {\n  position: absolute;\n  bottom: -12px;\n  left: -12px;\n  background: seagreen;\n  color: white;\n  padding: 4px 10px;\n  border-radius: 999px;\n  font-size: 12px;\n  font-weight: bold;\n}' }
      }
    },

    {
      id: 'css-6', title: 'Flexbox: layout in one dimension', level: 1, minutes: 14,
      blocks: [
        { t: 'p', html: 'Flexbox is how modern pages arrange things in a row or column — navbars, button groups, card rows, centering. Turn any container into a flex container with one line, and its <i>children</i> line up:' },
        { t: 'code', lang: 'css', code: '.toolbar {\n  display: flex;\n  gap: 12px;              /* space between children */\n  justify-content: center; /* along the row */\n  align-items: center;     /* across the row */\n}' },
        { t: 'p', html: 'The two alignment properties are the heart of it:' },
        { t: 'ul', items: [
          '<code>justify-content</code> — positions children along the main direction: <code>flex-start</code>, <code>center</code>, <code>flex-end</code>, <code>space-between</code> (first and last at the edges), <code>space-around</code>',
          '<code>align-items</code> — positions them across it: <code>stretch</code> (default), <code>center</code>, <code>flex-start</code>, <code>flex-end</code>'
        ] },
        { t: 'p', html: '<code>flex-direction: column</code> flips the axis to vertical. <code>flex-wrap: wrap</code> lets items flow onto new lines when they run out of room. And on the children, <code>flex: 1</code> means "grow to share the leftover space" — give it to all children and they split the row evenly.' },
        { t: 'code', lang: 'css', code: '/* The famous "center anything" recipe: */\n.parent {\n  display: flex;\n  justify-content: center;  /* horizontal */\n  align-items: center;      /* vertical */\n  height: 200px;\n}' },
        { t: 'tip', html: 'Memory hook: <b>justify</b> = the direction your items flow (main axis). <b>align</b> = the other one (cross axis). With <code>flex-direction: column</code> they swap jobs.' }
      ],
      tryIt: {
        mode: 'web',
        html: '<nav class="bar">\n  <div class="logo">🍩 DonutCo</div>\n  <div class="links">\n    <a href="#">Menu</a>\n    <a href="#">About</a>\n    <a href="#">Cart</a>\n  </div>\n</nav>\n<div class="hero">\n  <p>I am perfectly centered.</p>\n</div>',
        css: 'body { font-family: sans-serif; margin: 0; }\n\n.bar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px 20px;\n  background: #2d2a4a;\n  color: white;\n}\n\n.links { display: flex; gap: 16px; }\n.links a { color: #ffd166; }\n\n.hero {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 160px;\n  background: #f4f1ff;\n  font-size: 24px;\n}'
      },
      quiz: [
        { q: 'What does <code>display: flex</code> affect?', options: ['The element itself only', 'How the element\'s children are laid out', 'The whole page', 'Only text inside'], a: 1, why: 'Flex is set on the container; the children become flex items.' },
        { q: 'To push two items to opposite ends of a bar, use…', options: ['<code>justify-content: space-between</code>', '<code>align-items: apart</code>', '<code>margin: auto auto</code>', '<code>text-align: justify</code>'], a: 0, why: 'space-between puts the first item at the start, the last at the end, gaps between.' },
        { q: 'What does <code>flex: 1</code> on every child do?', options: ['Makes them tiny', 'Makes each grow equally to fill the row', 'Shows only one', 'Reverses their order'], a: 1, why: 'Each child takes an equal share of the free space — instant equal columns.' }
      ],
      challenge: {
        text: 'Under the hero, add a row of three "feature" boxes that share the width equally with a gap, and stack on top of each other when you make the preview narrow (hint: <code>flex-wrap</code> + <code>min-width</code> on the boxes).',
        hints: ['Container: <code>display: flex; gap: 12px; flex-wrap: wrap;</code>', 'Each box: <code>flex: 1; min-width: 150px;</code>'],
        solution: { lang: 'css', code: '.features {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  padding: 12px;\n}\n\n.features div {\n  flex: 1;\n  min-width: 150px;\n  background: #ffe8f0;\n  padding: 16px;\n  border-radius: 10px;\n}' }
      }
    },

    {
      id: 'css-7', title: 'Grid: layout in two dimensions', level: 1, minutes: 14,
      blocks: [
        { t: 'p', html: 'Flexbox handles a row <i>or</i> a column. <b>CSS Grid</b> handles rows <i>and</i> columns at once — photo galleries, dashboards, full page layouts:' },
        { t: 'code', lang: 'css', code: '.gallery {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;  /* three equal columns */\n  gap: 12px;\n}' },
        { t: 'p', html: 'The <code>fr</code> unit means "fraction of the free space". <code>1fr 2fr</code> makes the second column twice as wide. You can mix units: <code>200px 1fr</code> = fixed sidebar, flexible main.' },
        { t: 'p', html: 'The magic one-liner for responsive galleries — as many columns as fit, each at least 150px:' },
        { t: 'code', lang: 'css', code: '.gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n  gap: 12px;\n}' },
        { t: 'p', html: 'Items can span multiple cells with <code>grid-column: span 2</code> (or <code>grid-row</code>). That\'s how featured items get bigger tiles.' },
        { t: 'tip', html: 'Rule of thumb: content in a line → flexbox. Content in a grid of cells → grid. They nest happily — a grid of cards where each card uses flexbox inside is extremely normal.' }
      ],
      tryIt: {
        mode: 'web',
        html: '<div class="gallery">\n  <div class="tile featured">1 — featured</div>\n  <div class="tile">2</div>\n  <div class="tile">3</div>\n  <div class="tile">4</div>\n  <div class="tile">5</div>\n  <div class="tile">6</div>\n</div>',
        css: 'body { font-family: sans-serif; margin: 12px; }\n\n.gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));\n  gap: 12px;\n}\n\n.tile {\n  background: #4a7c59;\n  color: white;\n  border-radius: 10px;\n  padding: 30px 10px;\n  text-align: center;\n  font-weight: bold;\n}\n\n.featured {\n  grid-column: span 2;\n  background: #c05746;\n}'
      },
      quiz: [
        { q: 'What does <code>grid-template-columns: 1fr 2fr</code> create?', options: ['Two equal columns', 'A column and a row', 'Two columns, the second twice as wide', 'Three columns'], a: 2, why: 'fr units divide free space proportionally: 1 part vs 2 parts.' },
        { q: 'Which tool handles rows AND columns together?', options: ['Flexbox', 'Grid', 'Tables', 'Floats'], a: 1, why: 'Grid is two-dimensional by design; flexbox is one-dimensional.' },
        { q: 'What does <code>grid-column: span 2</code> do to an item?', options: ['Moves it to column 2', 'Makes it cover two columns wide', 'Duplicates it', 'Hides the second column'], a: 1, why: 'Span stretches the item across multiple tracks.' }
      ],
      challenge: {
        text: 'Build a classic page skeleton with grid: header across the top, a 160px sidebar on the left, main content on the right, footer across the bottom.',
        hints: ['Grid areas make this readable: <code>grid-template-areas: "head head" "side main" "foot foot";</code> then assign each child <code>grid-area: head;</code> etc.'],
        solution: { lang: 'css', code: '.page {\n  display: grid;\n  grid-template-columns: 160px 1fr;\n  grid-template-areas:\n    "head head"\n    "side main"\n    "foot foot";\n  gap: 10px;\n  min-height: 300px;\n}\n\nheader { grid-area: head; background: #ddd; }\naside  { grid-area: side; background: #eee; }\nmain   { grid-area: main; background: #fff; }\nfooter { grid-area: foot; background: #ddd; }' }
      }
    },

    /* ---------- ADVANCED ---------- */
    {
      id: 'css-8', title: 'Responsive design & media queries', level: 2, minutes: 14,
      blocks: [
        { t: 'p', html: 'More than half of web traffic is phones. <b>Responsive design</b> means one page that adapts to any screen, and the main tool is the <b>media query</b> — CSS that only applies when a condition is true:' },
        { t: 'code', lang: 'css', code: '/* base styles: designed for small screens first */\n.cards { display: grid; grid-template-columns: 1fr; gap: 12px; }\n\n/* when the screen is at least 700px wide… */\n@media (min-width: 700px) {\n  .cards { grid-template-columns: 1fr 1fr; }\n}\n\n@media (min-width: 1100px) {\n  .cards { grid-template-columns: 1fr 1fr 1fr; }\n}' },
        { t: 'p', html: 'This is <b>mobile-first</b> design: write the simple, single-column layout as the default, then <i>add</i> columns and complexity as space grows. It\'s much easier than designing big and cramming down.' },
        { t: 'p', html: 'The other pillars of responsiveness:' },
        { t: 'ul', items: [
          'The viewport meta tag in your HTML head (you met it in the HTML track) — without it, phones fake a desktop.',
          'Flexible units: <code>%</code>, <code>fr</code>, <code>rem</code>, and <code>max-width</code> instead of fixed widths.',
          '<code>img { max-width: 100%; height: auto; }</code> — images shrink to fit their container instead of overflowing.',
          'Flexbox <code>wrap</code> and grid <code>auto-fit</code> — layouts that reflow on their own, often with zero media queries.'
        ] },
        { t: 'tip', html: 'Test as you build: in this editor, drag the preview narrower and wider. In a real browser, press F12 and use the device toolbar to simulate phones.' }
      ],
      tryIt: {
        mode: 'web',
        html: '<div class="cards">\n  <div class="card">One</div>\n  <div class="card">Two</div>\n  <div class="card">Three</div>\n</div>\n<p>Resize this preview pane (drag the divider or your window) to see the layout change.</p>',
        css: 'body { font-family: sans-serif; margin: 12px; }\n\n.cards {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 12px;\n}\n\n.card {\n  background: #35618f;\n  color: white;\n  padding: 30px;\n  border-radius: 10px;\n  text-align: center;\n}\n\n@media (min-width: 500px) {\n  .cards { grid-template-columns: 1fr 1fr 1fr; }\n  .card { background: #8f3561; }\n}'
      },
      quiz: [
        { q: '<code>@media (min-width: 700px)</code> applies its styles when…', options: ['The screen is under 700px', 'The screen is 700px or wider', 'The screen is exactly 700px', 'Printing'], a: 1, why: 'min-width = "at least this wide". max-width = "at most this wide".' },
        { q: '"Mobile-first" means…', options: ['Building a separate mobile site', 'Default styles target small screens; media queries add complexity for larger ones', 'Testing on phones first', 'Mobile users get fewer features'], a: 1, why: 'The base CSS is the phone layout; wider screens progressively enhance it.' },
        { q: 'Which rule stops images from overflowing on small screens?', options: ['<code>img { width: 50%; }</code>', '<code>img { max-width: 100%; height: auto; }</code>', '<code>img { overflow: hidden; }</code>', '<code>img { display: none; }</code>'], a: 1, why: 'max-width: 100% lets images shrink with their container but never grow past their real size.' }
      ],
      challenge: {
        text: 'Make the demo mobile-first with three breakpoints: 1 column by default, 2 columns at 500px, 3 columns at 800px — and make the card text bigger on the widest layout.',
        hints: ['Two separate <code>@media (min-width: …)</code> blocks, smallest first.'],
        solution: { lang: 'css', code: '.cards { display: grid; grid-template-columns: 1fr; gap: 12px; }\n\n@media (min-width: 500px) {\n  .cards { grid-template-columns: 1fr 1fr; }\n}\n\n@media (min-width: 800px) {\n  .cards { grid-template-columns: 1fr 1fr 1fr; }\n  .card { font-size: 22px; }\n}' }
      }
    },

    {
      id: 'css-9', title: 'Transitions & animations', level: 2, minutes: 14,
      blocks: [
        { t: 'p', html: 'Motion makes interfaces feel alive. The easy 90% is <b>transitions</b>: "when this property changes, animate the change instead of jumping".' },
        { t: 'code', lang: 'css', code: '.button {\n  background: #2f6fed;\n  transition: background 0.3s, transform 0.15s;\n}\n\n.button:hover {\n  background: #1d4fc0;\n  transform: translateY(-2px);   /* lift slightly */\n}' },
        { t: 'p', html: '<code>transform</code> is the animator\'s best friend: <code>translate()</code> moves, <code>scale()</code> resizes, <code>rotate()</code> spins — all buttery-smooth because they don\'t trigger page re-layout.' },
        { t: 'p', html: 'For motion that runs on its own (loading spinners, attention pulses), define <b>keyframes</b> and attach them with <code>animation</code>:' },
        { t: 'code', lang: 'css', code: '@keyframes pulse {\n  0%   { transform: scale(1); }\n  50%  { transform: scale(1.15); }\n  100% { transform: scale(1); }\n}\n\n.heart {\n  animation: pulse 1s infinite;\n}' },
        { t: 'p', html: 'The <code>animation</code> shorthand takes the name, duration, and extras like <code>infinite</code> (loop forever), <code>ease-in-out</code> (speed curve), and <code>alternate</code> (play backwards every other time).' },
        { t: 'warn', html: 'Motion can make some users physically ill. Keep animations short and purposeful, and respect the system setting: wrap big motion in <code>@media (prefers-reduced-motion: no-preference) { … }</code> so it disappears for people who opted out.' }
      ],
      tryIt: {
        mode: 'web',
        html: '<button class="fancy">Hover me</button>\n<div class="loader"></div>',
        css: 'body { font-family: sans-serif; padding: 40px; display: flex; gap: 40px; align-items: center; }\n\n.fancy {\n  padding: 12px 28px;\n  font-size: 16px;\n  border: none;\n  border-radius: 8px;\n  background: #2f6fed;\n  color: white;\n  cursor: pointer;\n  transition: transform 0.15s, box-shadow 0.15s;\n}\n\n.fancy:hover {\n  transform: translateY(-3px) scale(1.05);\n  box-shadow: 0 8px 16px rgba(0,0,0,0.25);\n}\n\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}\n\n.loader {\n  width: 32px;\n  height: 32px;\n  border: 4px solid #ddd;\n  border-top-color: #2f6fed;\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}'
      },
      quiz: [
        { q: 'A transition animates…', options: ['On a timer, forever', 'The change when a property\'s value changes', 'Only page loads', 'Only colors'], a: 1, why: 'Transitions smooth out changes (like hover states). Self-running motion needs @keyframes.' },
        { q: 'Which property moves an element smoothly without re-layout?', options: ['<code>margin-left</code>', '<code>left</code>', '<code>transform: translateX()</code>', '<code>padding</code>'], a: 2, why: 'Transforms are GPU-friendly and don\'t shift surrounding content — the smoothest way to move things.' },
        { q: 'How do you respect users who turn off animations?', options: ['You can\'t detect that', 'Use <code>@media (prefers-reduced-motion: …)</code>', 'Keep animations under 10 seconds', 'Only animate buttons'], a: 1, why: 'The prefers-reduced-motion media query reflects the user\'s OS accessibility setting.' }
      ],
      challenge: {
        text: 'Create a "bouncing ball": a circle that bounces up and down forever using keyframes, squashing slightly (scale) when it "lands".',
        hints: ['Circle: a div with equal width/height and <code>border-radius: 50%</code>.', 'Keyframes: translateY(0) at 0% and 100%, translateY(-80px) at 50%. Add <code>scale(1.1, 0.9)</code> at the bottom for squash.'],
        solution: { lang: 'css', code: '.ball {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background: tomato;\n  animation: bounce 0.8s ease-in-out infinite;\n}\n\n@keyframes bounce {\n  0%, 100% { transform: translateY(0) scale(1.1, 0.9); }\n  50%      { transform: translateY(-80px) scale(1); }\n}' }
      }
    },

    {
      id: 'css-10', title: 'CSS variables & organizing your styles', level: 2, minutes: 12,
      blocks: [
        { t: 'p', html: 'As stylesheets grow, repeated values become a maintenance trap — your brand blue is pasted in 40 places and the redesign takes all afternoon. <b>CSS variables</b> (custom properties) fix that:' },
        { t: 'code', lang: 'css', code: ':root {\n  --brand: #6c4ab6;\n  --bg: #f7f5fb;\n  --radius: 10px;\n}\n\n.button {\n  background: var(--brand);\n  border-radius: var(--radius);\n}\n\n.link { color: var(--brand); }' },
        { t: 'p', html: 'Define them once on <code>:root</code> (the whole document), use them anywhere with <code>var()</code>. Change the variable, and everything using it updates. This is also exactly how dark mode is usually built — redefine the variables under a different class or media query:' },
        { t: 'code', lang: 'css', code: '@media (prefers-color-scheme: dark) {\n  :root {\n    --bg: #16121f;\n    --brand: #a98ae8;\n  }\n}' },
        { t: 'p', html: 'Habits that keep CSS manageable as it grows:' },
        { t: 'ul', items: [
          'Name classes by <b>what things are</b> (<code>.price-card</code>), not what they look like (<code>.big-blue-box</code>) — looks change.',
          'Group related rules together with a comment header per section.',
          'Prefer classes over IDs for styling — IDs are so specific they cause override fights.',
          'When you paste the same 3 properties a third time, make it a shared class or a variable.'
        ] },
        { t: 'tip', html: 'This very site is built exactly this way — open <code>css/style.css</code> in the Code Teacher folder and look at the <code>:root</code> block at the top. Real code you can read is the best teacher.' }
      ],
      tryIt: {
        mode: 'web',
        html: '<div class="card">\n  <h2>Theme demo</h2>\n  <p>Change the variables in <b>:root</b> and watch everything update at once.</p>\n  <button class="btn">A themed button</button>\n</div>',
        css: ':root {\n  --brand: #6c4ab6;\n  --bg: #f7f5fb;\n  --text: #2a2436;\n  --radius: 12px;\n}\n\nbody {\n  background: var(--bg);\n  color: var(--text);\n  font-family: sans-serif;\n  padding: 30px;\n}\n\n.card {\n  background: white;\n  border-top: 6px solid var(--brand);\n  border-radius: var(--radius);\n  padding: 20px;\n  max-width: 380px;\n}\n\n.btn {\n  background: var(--brand);\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: var(--radius);\n}'
      },
      quiz: [
        { q: 'Where do you usually define global CSS variables?', options: ['On <code>body</code>', 'On <code>:root</code>', 'In JavaScript', 'On every element'], a: 1, why: ':root is the document\'s top element, so variables defined there are visible everywhere.' },
        { q: 'How do you use a variable called <code>--brand</code>?', options: ['<code>color: --brand;</code>', '<code>color: $brand;</code>', '<code>color: var(--brand);</code>', '<code>color: get(brand);</code>'], a: 2, why: 'Variables are read with the var() function.' },
        { q: 'Why prefer <code>.error-text</code> over <code>.red-text</code> as a class name?', options: ['It\'s shorter', 'Meaning survives redesigns — the color might not stay red', 'Red is reserved', 'No real reason'], a: 1, why: 'Semantic names describe purpose. When errors become orange, .error-text still makes sense.' }
      ],
      challenge: {
        text: 'Add a "dark theme" to the try-it demo: redefine the variables inside a <code>.dark</code> selector, then add <code>class="dark"</code> to the body element in the HTML tab to switch themes.',
        hints: ['Variables cascade: <code>.dark { --bg: #1a1625; --text: #eee; }</code> overrides them for everything inside.', 'You\'ll need to move the background/color onto a wrapper div, or set class on body via the HTML tab: wrap everything in <code>&lt;div class="dark"&gt;</code>.'],
        solution: { lang: 'css', code: '.dark {\n  --brand: #a98ae8;\n  --bg: #1a1625;\n  --text: #efeaf7;\n}\n\n/* In the HTML tab, wrap the card:\n   <div class="dark"> ...card... </div>\n   and give the wrapper the background: */\n.dark {\n  background: var(--bg);\n  color: var(--text);\n  padding: 30px;\n}\n\n.dark .card { background: #241d33; }' }
      }
    }
  ]
};
