/* ============================================================
   App Blueprints — how famous kinds of apps are actually built.
   Each: architecture teardown, runnable front-end demo, real SQL
   data model, the hard problems, and an MVP plan.
   Shape: { id, name, icon, examples, level, blurb, overview,
            layers[[part,tech,how]], schema, hard[], mvp[],
            demo{mode:'web',html,css,js}, quiz[] }
   ============================================================ */
window.CT_BLUEPRINTS = [

  {
    id: 'video', name: 'Video platform', icon: '▶️', examples: 'YouTube · Twitch · TikTok', level: 2,
    blurb: 'Upload, store, stream and recommend millions of videos.',
    overview: 'A video site is really four apps wearing one interface: an upload pipeline that converts videos into many sizes, a storage-and-delivery network that streams them, a database of metadata (titles, views, channels), and a recommendation system deciding what you see next. The player page itself — the part you can build today — is ordinary HTML/CSS/JS over that machinery.',
    layers: [
      ['Front end', 'HTML/CSS/JS (React at scale)', 'the grid of thumbnails, the player page, search — renders JSON from the backend'],
      ['Backend API', 'Node / Python / Go', 'endpoints like /videos?query=cats returning JSON; auth; view counting'],
      ['Database', 'SQL', 'videos, channels, users, comments, likes — metadata, not the video files themselves'],
      ['File storage + CDN', 'object storage (S3-style) + CDN', 'the actual video files, copied to servers near every viewer'],
      ['Transcoding pipeline', 'background workers (ffmpeg)', 'each upload converted to 240p→4K variants so any connection can stream'],
      ['Recommendations', 'ML models (see the AI track!)', 'watch history in, ranked "up next" out — the real moat']
    ],
    schema: "CREATE TABLE channels (\n  id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL,\n  subscribers INTEGER DEFAULT 0\n);\n\nCREATE TABLE videos (\n  id INTEGER PRIMARY KEY,\n  channel_id INTEGER,          -- foreign key -> channels\n  title TEXT NOT NULL,\n  duration_s INTEGER,\n  views INTEGER DEFAULT 0,\n  uploaded TEXT\n);\n\nCREATE TABLE comments (\n  id INTEGER PRIMARY KEY,\n  video_id INTEGER,\n  user_name TEXT,\n  body TEXT,\n  likes INTEGER DEFAULT 0\n);\n\n-- The homepage query:\nSELECT videos.title, channels.name, videos.views\nFROM videos JOIN channels ON videos.channel_id = channels.id\nORDER BY videos.views DESC LIMIT 20;",
    hard: [
      '<b>Storage & bandwidth:</b> video is enormous — hundreds of hours uploaded per minute at YouTube scale. CDNs and clever compression are the whole game.',
      '<b>Transcoding:</b> every upload becomes ~7 quality levels, chopped into small chunks so players can switch quality mid-stream (adaptive streaming).',
      '<b>Recommendations:</b> ranking billions of videos per viewer is a giant ML problem — and the most valuable code in the company.',
      '<b>Moderation:</b> detecting copyright, spam and harmful content across that volume needs ML plus humans.'
    ],
    mvp: [
      'Build the demo below into a full page: a grid of "videos" (thumbnails + titles from a JS array) with working search and a player page.',
      'Store metadata in the SQL playground using the schema above; write the homepage and search queries.',
      'Real playable video: host a few .mp4 files and use the &lt;video&gt; tag (HTML track lesson 8) — a genuine mini-YouTube for your friend group.',
      'Add comments with localStorage, then view counts that increment on play.',
      'Stretch: "recommended next" = same-channel videos, ranked by views — your first recommendation algorithm.'
    ],
    demo: {
      mode: 'web',
      html: '<header><b>▶ MyTube</b> <input id="q" placeholder="Search videos…"></header>\n<main>\n  <section id="player">\n    <div class="screen" id="screen">▶</div>\n    <h2 id="now">Pick a video</h2>\n    <p id="meta"></p>\n  </section>\n  <div id="grid"></div>\n</main>',
      css: 'body { font-family: sans-serif; margin: 0; background: #0f0f0f; color: #eee; }\nheader { padding: 10px 14px; background: #191919; display: flex; gap: 14px; align-items: center; }\n#q { flex: 1; max-width: 300px; padding: 7px 10px; border-radius: 20px; border: 1px solid #333; background: #121212; color: #eee; }\nmain { padding: 14px; }\n.screen { background: linear-gradient(120deg, #3a2f6b, #7a2f4f); height: 130px; border-radius: 10px;\n  display: grid; place-items: center; font-size: 40px; margin-bottom: 8px; }\n#grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px; margin-top: 16px; }\n.card { cursor: pointer; }\n.thumb { height: 72px; border-radius: 8px; display: grid; place-items: center; font-size: 24px; position: relative; }\n.thumb span { position: absolute; bottom: 4px; right: 6px; background: rgba(0,0,0,.8); font-size: 10px; padding: 1px 4px; border-radius: 3px; }\n.card p { font-size: 12px; margin: 6px 0 0; }\n.card small { color: #999; }',
      js: 'const videos = [\n  { title: "Cat learns to code", ch: "PawTech", views: 991204, len: "3:12", hue: 260 },\n  { title: "I built a website in 10 min", ch: "DevDash", views: 420111, len: "9:58", hue: 20 },\n  { title: "Neural nets explained w/ waffles", ch: "AIBreakfast", views: 310579, len: "12:04", hue: 160 },\n  { title: "SQL for arcade owners", ch: "DataDiner", views: 88240, len: "7:33", hue: 200 },\n  { title: "Speedrun: FizzBuzz any%", ch: "DevDash", views: 55012, len: "0:42", hue: 320 },\n  { title: "My desk setup (100% stickers)", ch: "PawTech", views: 12777, len: "4:20", hue: 60 },\n];\n\nconst grid = document.querySelector("#grid");\nconst fmt = n => n > 1e6 ? (n/1e6).toFixed(1) + "M" : n > 1e3 ? (n/1e3).toFixed(0) + "K" : n;\n\nfunction render(list) {\n  grid.innerHTML = "";\n  list.forEach(v => {\n    const card = document.createElement("div");\n    card.className = "card";\n    card.innerHTML = `<div class="thumb" style="background:hsl(${v.hue},45%,35%)">▶<span>${v.len}</span></div>\n      <p>${v.title}</p><small>${v.ch} · ${fmt(v.views)} views</small>`;\n    card.onclick = () => play(v);\n    grid.appendChild(card);\n  });\n}\n\nfunction play(v) {\n  v.views++;                      // the view counter!\n  document.querySelector("#screen").style.background = `hsl(${v.hue},45%,35%)`;\n  document.querySelector("#now").textContent = v.title;\n  document.querySelector("#meta").textContent = `${v.ch} · ${fmt(v.views)} views`;\n  render(current());\n}\n\nconst current = () => {\n  const q = document.querySelector("#q").value.toLowerCase();\n  return videos.filter(v => (v.title + v.ch).toLowerCase().includes(q));\n};\n\ndocument.querySelector("#q").addEventListener("input", () => render(current()));\nrender(videos);'
    },
    quiz: [
      { q: 'Where are the actual video files stored?', options: ['In the SQL database', 'In object storage, served through a CDN', 'In the HTML', 'In users\' browsers'], a: 1, why: 'Databases hold metadata (titles, views); the heavy files live in blob storage with CDN copies near viewers.' },
      { q: 'Why does every upload get transcoded to many sizes?', options: ['Legal reasons', 'So players can stream a quality matching each viewer\'s connection', 'To waste space', 'Backup purposes'], a: 1, why: 'Adaptive streaming switches between 240p…4K chunks as your bandwidth changes.' },
      { q: 'The "recommendation engine" is fundamentally…', options: ['A random picker', 'A machine-learning ranking model fed by watch history', 'Alphabetical order', 'Paid placement only'], a: 1, why: 'Watch data in, ranked suggestions out — the ML track here covers exactly those foundations.' }
    ]
  },

  {
    id: 'feed', name: 'Social feed', icon: '📸', examples: 'Instagram · X · Reddit', level: 1,
    blurb: 'Posts, likes, follows — and the ranked feed that never ends.',
    overview: 'A social app is three tables (users, posts, follows) plus one hard question: which posts, in what order? The interface — compose box, cards, like buttons, infinite scroll — is classic front-end work you can already do. The feed-ranking algorithm and delivering it to 500 million people are where it gets spicy.',
    layers: [
      ['Front end', 'HTML/CSS/JS', 'the feed of cards, compose box, like/follow buttons, infinite scroll'],
      ['Backend API', 'any server language', '/feed, /post, /like, /follow endpoints returning JSON'],
      ['Database', 'SQL', 'users, posts, likes, follows — the social graph is literally a table of (follower, followed) pairs'],
      ['Feed builder', 'ranking service', 'merges posts from everyone you follow, scores them (recency × engagement), caches the result'],
      ['Media storage', 'object storage + CDN', 'photos/videos resized into several sizes on upload'],
      ['Notifications', 'push service + queues', '"Ada liked your post" fan-out, batched to avoid melting phones']
    ],
    schema: "CREATE TABLE users (\n  id INTEGER PRIMARY KEY,\n  handle TEXT UNIQUE NOT NULL\n);\n\nCREATE TABLE posts (\n  id INTEGER PRIMARY KEY,\n  user_id INTEGER,\n  body TEXT,\n  likes INTEGER DEFAULT 0,\n  posted TEXT\n);\n\nCREATE TABLE follows (\n  follower_id INTEGER,   -- who follows\n  followed_id INTEGER    -- whom\n);\n\n-- \"My feed\": posts by people I (user 1) follow, newest first\nSELECT users.handle, posts.body, posts.likes\nFROM posts\nJOIN users ON posts.user_id = users.id\nJOIN follows ON follows.followed_id = posts.user_id\nWHERE follows.follower_id = 1\nORDER BY posts.posted DESC;",
    hard: [
      '<b>Feed ranking:</b> chronological is easy; "interesting first" is a permanent ML tuning war between engagement, recency and not showing you 40 posts from one friend.',
      '<b>Fan-out:</b> when someone with 100M followers posts, do you write it to 100M feeds, or compute feeds on read? (Real answer: both, depending on account size.)',
      '<b>Moderation & abuse:</b> spam, bots and harmful content at millions-of-posts-per-day scale.',
      '<b>The infinite scroll trap:</b> pagination that stays consistent while new posts arrive is trickier than it looks.'
    ],
    mvp: [
      'Extend the demo: add image "attachments" (gradient placeholders), timestamps, and a follow toggle that filters the feed.',
      'Model users/posts/follows in the SQL playground; write the feed query above and a "most-liked this week" query.',
      'Persist posts in localStorage so your feed survives reload.',
      'Rank the feed: score = likes + freshness bonus; sort by score. Congratulations, you\'re an algorithm now.',
      'Stretch: two ranking modes (Newest / Top) with a toggle — and notice how different the same data feels.'
    ],
    demo: {
      mode: 'web',
      html: '<main>\n  <div class="compose">\n    <input id="who" placeholder="you" size="8">\n    <input id="text" placeholder="What\'s happening?">\n    <button id="send">Post</button>\n  </div>\n  <div id="feed"></div>\n</main>',
      css: 'body { font-family: sans-serif; background: #101418; color: #e7ecf0; margin: 0; }\nmain { max-width: 420px; margin: 0 auto; padding: 14px; }\n.compose { display: flex; gap: 6px; margin-bottom: 14px; }\n.compose input { padding: 8px; border-radius: 8px; border: 1px solid #2a3540; background: #161b21; color: #e7ecf0; }\n#text { flex: 1; }\n.compose button { border: none; border-radius: 8px; background: #1d9bf0; color: white; padding: 8px 14px; font-weight: bold; cursor: pointer; }\n.post { border: 1px solid #2a3540; border-radius: 12px; padding: 12px 14px; margin-bottom: 10px; background: #161b21; }\n.post b { color: #1d9bf0; }\n.post p { margin: 6px 0 8px; }\n.like { background: none; border: none; color: #8899a6; cursor: pointer; font-size: 14px; }\n.like.liked { color: #f91880; }',
      js: 'const posts = [\n  { who: "ada", text: "Trained my first neural net today. It learned XOR. I learned patience.", likes: 42, liked: false },\n  { who: "sam", text: "day 12 of learning SQL: I now GROUP BY everything. my fridge. my laundry.", likes: 17, liked: false },\n  { who: "kim", text: "hot take: semicolons are just periods for robots", likes: 8, liked: false },\n];\n\nconst feed = document.querySelector("#feed");\n\nfunction render() {\n  feed.innerHTML = "";\n  posts.forEach(p => {\n    const el = document.createElement("div");\n    el.className = "post";\n    el.innerHTML = `<b>@${p.who}</b><p>${p.text}</p>`;\n    const like = document.createElement("button");\n    like.className = "like" + (p.liked ? " liked" : "");\n    like.textContent = `${p.liked ? "❤️" : "🤍"} ${p.likes}`;\n    like.onclick = () => {\n      p.liked = !p.liked;\n      p.likes += p.liked ? 1 : -1;\n      render();\n    };\n    el.appendChild(like);\n    feed.appendChild(el);\n  });\n}\n\ndocument.querySelector("#send").onclick = () => {\n  const who = document.querySelector("#who").value.trim() || "you";\n  const text = document.querySelector("#text").value.trim();\n  if (!text) return;\n  posts.unshift({ who, text, likes: 0, liked: false });\n  document.querySelector("#text").value = "";\n  render();\n};\n\nrender();'
    },
    quiz: [
      { q: 'The social graph ("who follows whom") is stored as…', options: ['A picture', 'A table of (follower_id, followed_id) pairs', 'One row per user with a giant list', 'Cookies'], a: 1, why: 'A follows table — and your feed query JOINs through it. Graphs are just pair tables.' },
      { q: 'The core question a feed algorithm answers:', options: ['How to store photos', 'Which posts, in what order, for this user', 'What color the buttons are', 'How to log in'], a: 1, why: 'Merging followed users\' posts and ranking them IS the product.' },
      { q: 'The "fan-out" problem is…', options: ['Server cooling', 'Delivering a celebrity\'s post to 100M followers\' feeds efficiently', 'Too many hashtags', 'Image resizing'], a: 1, why: 'Write-to-all-feeds vs compute-on-read — a classic scale tradeoff.' }
    ]
  },

  {
    id: 'chat', name: 'Chat app', icon: '💬', examples: 'WhatsApp · Discord · Slack', level: 1,
    blurb: 'Real-time messages between people, groups and servers.',
    overview: 'Chat inverts the usual web model: instead of you asking the server for pages, the server pushes messages TO you the instant they exist. That real-time channel (WebSockets), plus delivery guarantees (sent ✓, delivered ✓✓, read), is the interesting machinery. The bubbles-and-input interface is a beginner-friendly build.',
    layers: [
      ['Front end', 'HTML/CSS/JS', 'message bubbles, input, channel list, unread badges'],
      ['Real-time channel', 'WebSockets', 'a persistent two-way connection — the server pushes new messages instantly'],
      ['Backend', 'Node / Go / Elixir', 'routes each message to the right recipients\' open connections'],
      ['Database', 'SQL', 'messages, conversations, members — chat history is just a big table'],
      ['Delivery tracking', 'acknowledgments', 'sent/delivered/read receipts are tiny status updates flowing backwards'],
      ['Encryption', 'end-to-end crypto (Signal protocol)', 'in E2E apps, the server relays messages it cannot read']
    ],
    schema: "CREATE TABLE conversations (\n  id INTEGER PRIMARY KEY,\n  name TEXT                 -- null for DMs, set for groups\n);\n\nCREATE TABLE members (\n  conversation_id INTEGER,\n  user_name TEXT\n);\n\nCREATE TABLE messages (\n  id INTEGER PRIMARY KEY,\n  conversation_id INTEGER,\n  sender TEXT,\n  body TEXT,\n  sent_at TEXT,\n  status TEXT DEFAULT 'sent'   -- sent / delivered / read\n);\n\n-- Load a conversation, oldest first:\nSELECT sender, body, status FROM messages\nWHERE conversation_id = 1\nORDER BY sent_at;",
    hard: [
      '<b>Real-time at scale:</b> millions of open WebSocket connections, each needing the right messages instantly — routing is the art.',
      '<b>Delivery guarantees:</b> phones go offline mid-message. Queue it, retry it, sync it when they return, never duplicate it.',
      '<b>End-to-end encryption:</b> the gold standard means even the company can\'t read messages — key exchange across devices is deep cryptography.',
      '<b>Sync everywhere:</b> read a message on your phone; the laptop badge must clear too. Multi-device state sync is endless fun.'
    ],
    mvp: [
      'Extend the demo: multiple channels (array of conversations, a sidebar to switch), timestamps, and an unread counter per channel.',
      'Persist history in localStorage; model it in the SQL playground with the schema above.',
      'Smarter bot: give the fake replier keyword responses (you build exactly this in the AI chatbot blueprint).',
      'Two-tab "real" chat: localStorage fires a storage event in OTHER tabs — open your page twice and pass messages between tabs. Real push, no server!',
      'Stretch: add ✓ / ✓✓ status flow to each message with timed transitions.'
    ],
    demo: {
      mode: 'web',
      html: '<main>\n  <div id="log"></div>\n  <form id="bar">\n    <input id="msg" placeholder="Message #general" autocomplete="off">\n    <button>Send</button>\n  </form>\n</main>',
      css: 'body { font-family: sans-serif; background: #313338; color: #dbdee1; margin: 0; }\nmain { max-width: 420px; margin: 0 auto; height: 96vh; display: flex; flex-direction: column; }\n#log { flex: 1; overflow-y: auto; padding: 14px; }\n.row { margin-bottom: 10px; }\n.row b { font-size: 13px; }\n.row.me b { color: #6db4f5; }\n.row.bot b { color: #57f287; }\n.row p { margin: 2px 0 0; font-size: 14px; }\n.status { font-size: 10px; color: #80848e; }\n#bar { display: flex; gap: 8px; padding: 10px; }\n#msg { flex: 1; padding: 10px; border-radius: 8px; border: none; background: #383a40; color: #dbdee1; }\n#bar button { border: none; border-radius: 8px; background: #5865f2; color: white; padding: 0 16px; font-weight: bold; cursor: pointer; }',
      js: 'const log = document.querySelector("#log");\nconst replies = [\n  "nice, tell me more",\n  "have you tried turning it off and on again?",\n  "same tbh",\n  "ship it 🚀",\n  "brb, compiling",\n];\n\nfunction add(who, text, cls) {\n  const row = document.createElement("div");\n  row.className = "row " + cls;\n  row.innerHTML = `<b>${who}</b><p>${text}</p>` +\n    (cls === "me" ? \'<span class="status">✓ sent</span>\' : "");\n  log.appendChild(row);\n  log.scrollTop = log.scrollHeight;\n  return row;\n}\n\nadd("codebot", "Welcome to #general 👋 Say something!", "bot");\n\ndocument.querySelector("#bar").addEventListener("submit", (e) => {\n  e.preventDefault();\n  const input = document.querySelector("#msg");\n  const text = input.value.trim();\n  if (!text) return;\n  const row = add("you", text, "me");\n  input.value = "";\n\n  // the "delivery lifecycle", simulated:\n  setTimeout(() => row.querySelector(".status").textContent = "✓✓ delivered", 500);\n  setTimeout(() => row.querySelector(".status").textContent = "✓✓ read", 1200);\n  setTimeout(() => {\n    add("codebot", replies[Math.floor(Math.random() * replies.length)], "bot");\n  }, 1600);\n});'
    },
    quiz: [
      { q: 'What makes chat different from normal web pages?', options: ['More CSS', 'The server PUSHES messages to you over a persistent connection (WebSockets)', 'Bigger databases', 'No HTML'], a: 1, why: 'Request/response becomes a two-way open line — that inversion is the core of real-time apps.' },
      { q: 'The ✓✓ "delivered" receipt is really…', options: ['Decoration', 'A tiny acknowledgment message flowing back through the system', 'A font', 'Encryption'], a: 1, why: 'Status updates are themselves messages: sent → delivered → read, each an ack.' },
      { q: 'End-to-end encryption means…', options: ['The server encrypts its disks', 'Only the two devices can decrypt — the relay server can\'t read messages', 'Passwords are hashed', 'HTTPS is used'], a: 1, why: 'Keys live on the endpoints; the middle just ferries ciphertext.' }
    ]
  },

  {
    id: 'store', name: 'Online store', icon: '🛒', examples: 'Amazon · Etsy · Shopify stores', level: 1,
    blurb: 'Catalog, cart, checkout — and the money-handling machinery.',
    overview: 'E-commerce is a catalog (products table), a cart (state that follows the user), and a checkout (the sacred, must-never-break path where money moves). Almost nobody handles cards themselves — payment processors like Stripe take that burden — which puts a real store surprisingly within reach.',
    layers: [
      ['Front end', 'HTML/CSS/JS', 'product grid, filters, cart drawer, checkout form'],
      ['Backend API', 'any server language', 'products, cart, orders endpoints; price math NEVER trusted from the client'],
      ['Database', 'SQL', 'products, inventory, orders, order_items — the classic normalized schema'],
      ['Payments', 'Stripe / PayPal APIs', 'card handling outsourced: they take the card, you get a "paid" event'],
      ['Inventory & orders', 'transactions', 'decrement stock + create order atomically, or oversell during rushes'],
      ['Email & fulfillment', 'background jobs', 'confirmations, shipping updates, abandoned-cart nudges']
    ],
    schema: "CREATE TABLE products (\n  id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL,\n  price REAL NOT NULL,\n  stock INTEGER DEFAULT 0\n);\n\nCREATE TABLE orders (\n  id INTEGER PRIMARY KEY,\n  customer TEXT,\n  placed TEXT,\n  status TEXT DEFAULT 'paid'\n);\n\nCREATE TABLE order_items (       -- the join table pattern!\n  order_id INTEGER,\n  product_id INTEGER,\n  qty INTEGER,\n  unit_price REAL              -- price AT TIME OF SALE, frozen\n);\n\n-- Revenue per product:\nSELECT products.name, SUM(order_items.qty * order_items.unit_price) AS revenue\nFROM order_items JOIN products ON order_items.product_id = products.id\nGROUP BY products.name ORDER BY revenue DESC;",
    hard: [
      '<b>Never lose money math:</b> prices are computed on the server, taxes vary by region, currencies round differently — and it must be exactly right, always.',
      '<b>Inventory races:</b> two people buy the last item in the same second. Database transactions decide who gets it.',
      '<b>Fraud:</b> stolen cards, refund scams, bot buyers for limited drops — a whole ML discipline.',
      '<b>The checkout funnel:</b> every extra field loses real revenue; checkout UX is optimized to the pixel.'
    ],
    mvp: [
      'Extend the demo: product filters (category chips like the Projects page), a stock count that hits "sold out", and a cart drawer.',
      'Model products/orders/order_items in the SQL playground; run the revenue query.',
      'Persist the cart in localStorage — carts must survive reloads, always.',
      'A checkout form with the validation patterns from the Build-a-Website track.',
      'Stretch: read Stripe\'s docs (stripe.com/docs) — their test mode lets you "charge" fake cards for real, free.'
    ],
    demo: {
      mode: 'web',
      html: '<header><b>🧇 Waffle Depot</b><span id="cart">🛒 0 — $0.00</span></header>\n<div id="grid"></div>\n<button id="checkout" disabled>Checkout</button>',
      css: 'body { font-family: sans-serif; background: #f6f3ee; color: #333; margin: 0; }\nheader { display: flex; justify-content: space-between; padding: 12px 16px; background: #4a3728; color: #fff; }\n#grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 12px; padding: 14px; }\n.prod { background: white; border-radius: 10px; padding: 12px; text-align: center; box-shadow: 0 2px 6px rgba(0,0,0,.08); }\n.prod .pic { font-size: 34px; }\n.prod h4 { margin: 6px 0 2px; font-size: 13px; }\n.prod .price { color: #4a3728; font-weight: bold; }\n.prod button { margin-top: 8px; border: none; background: #c96f2e; color: white; border-radius: 6px; padding: 6px 12px; cursor: pointer; }\n.prod button:disabled { background: #bbb; }\n.prod small { display: block; color: #999; margin-top: 4px; }\n#checkout { margin: 0 14px 14px; padding: 10px 20px; border: none; border-radius: 8px; background: #2e7d4f; color: white; font-weight: bold; cursor: pointer; }\n#checkout:disabled { background: #bbb; }',
      js: 'const products = [\n  { name: "Waffle Iron Pro", pic: "🧇", price: 49.99, stock: 3 },\n  { name: "Maple Syrup 1L", pic: "🍁", price: 8.5, stock: 12 },\n  { name: "Chef Hat", pic: "👨‍🍳", price: 15.0, stock: 2 },\n  { name: "Mystery Batter", pic: "🥣", price: 4.25, stock: 8 },\n];\nconst cart = [];\n\nfunction render() {\n  const grid = document.querySelector("#grid");\n  grid.innerHTML = "";\n  products.forEach(p => {\n    const el = document.createElement("div");\n    el.className = "prod";\n    el.innerHTML = `<div class="pic">${p.pic}</div><h4>${p.name}</h4>\n      <div class="price">$${p.price.toFixed(2)}</div>\n      <small>${p.stock > 0 ? p.stock + " left" : "SOLD OUT"}</small>`;\n    const btn = document.createElement("button");\n    btn.textContent = "Add to cart";\n    btn.disabled = p.stock === 0;\n    btn.onclick = () => {\n      p.stock--;                          // inventory!\n      cart.push(p);\n      render();\n    };\n    el.appendChild(btn);\n    grid.appendChild(el);\n  });\n\n  const total = cart.reduce((s, p) => s + p.price, 0);\n  document.querySelector("#cart").textContent = `🛒 ${cart.length} — $${total.toFixed(2)}`;\n  document.querySelector("#checkout").disabled = cart.length === 0;\n}\n\ndocument.querySelector("#checkout").onclick = () => {\n  const total = cart.reduce((s, p) => s + p.price, 0);\n  alert(`Order placed! ${cart.length} items, $${total.toFixed(2)}.\\n(In a real store, Stripe takes it from here.)`);\n  cart.length = 0;\n  render();\n};\n\nrender();'
    },
    quiz: [
      { q: 'Why do order_items store their own unit_price?', options: ['Duplicated by accident', 'To freeze the price at time of sale — future price changes must not rewrite old orders', 'To save a JOIN', 'For taxes'], a: 1, why: 'Historical records stay true even when the catalog changes. A classic real-world denormalization.' },
      { q: 'How do small stores handle credit cards?', options: ['Store card numbers in their DB', 'They don\'t — processors like Stripe handle the card; the store gets a "paid" event', 'Email the bank', 'Cash only'], a: 1, why: 'Card handling is outsourced (and heavily regulated) — never store card numbers yourself.' },
      { q: 'Two buyers, one item left, same second. What prevents overselling?', options: ['Luck', 'A database transaction that checks-and-decrements stock atomically', 'Faster servers', 'JavaScript'], a: 1, why: 'Atomic check-and-update: one buyer wins, the other sees "sold out". Transactions exist for this.' }
    ]
  },

  {
    id: 'blog', name: 'Blog / CMS', icon: '📝', examples: 'WordPress · Medium · every news site', level: 0,
    blurb: 'Write once, publish everywhere — content management made simple.',
    overview: 'A blog is the friendliest architecture on this list: posts in storage, templates that wrap them in HTML, and an admin screen for writing. It\'s also a fork in the road — dynamic (WordPress renders pages per visit) versus static (generators pre-build every page as plain HTML, which your own Code Teacher-style sites already are).',
    layers: [
      ['Content storage', 'SQL or Markdown files', 'posts with title, body, date, tags — that\'s honestly most of it'],
      ['Templates', 'HTML/CSS', 'one post template + one list template render every page'],
      ['Admin / editor', 'a protected form', 'the compose screen — a textarea with superpowers'],
      ['Rendering', 'dynamic (PHP/WordPress) OR static (pre-built HTML)', 'per-visit rendering vs publish-time rendering'],
      ['Comments', 'DB table or external service', 'the moderation burden decides how much you want this'],
      ['SEO & RSS', 'meta tags + feeds', 'the head-tag skills from the HTML track, doing their job']
    ],
    schema: "CREATE TABLE posts (\n  id INTEGER PRIMARY KEY,\n  title TEXT NOT NULL,\n  slug TEXT UNIQUE,          -- the-url-version-of-the-title\n  body TEXT,\n  published TEXT,\n  draft INTEGER DEFAULT 1\n);\n\nCREATE TABLE tags (\n  post_id INTEGER,\n  tag TEXT\n);\n\n-- The homepage:\nSELECT title, slug, published FROM posts\nWHERE draft = 0\nORDER BY published DESC LIMIT 10;\n\n-- One tag's archive:\nSELECT posts.title FROM posts\nJOIN tags ON tags.post_id = posts.id\nWHERE tags.tag = 'python' AND draft = 0;",
    hard: [
      '<b>It\'s mostly not hard</b> — which is why it\'s the perfect first real project. The honest challenges:',
      '<b>The editor experience:</b> people want formatting, images and undo — rich text editing is famously fiddly.',
      '<b>Spam:</b> open a comment box and the bots arrive within hours.',
      '<b>Performance under a viral hit:</b> dynamic sites melt; static sites shrug. (This is why static is back in fashion.)'
    ],
    mvp: [
      'Extend the demo into a real personal blog: your posts in the array, tags, and an about page.',
      'Persist drafts in localStorage; add a "draft" flag and an admin-only view.',
      'Publish it for real with the Build-a-Website track\'s final lesson — a static blog on Netlify is free forever.',
      'Model it in SQL with the schema above; write the archive and tag queries.',
      'Stretch: write posts in Markdown and render them with a tiny parser you write yourself (bold, headers, links — 30 lines).'
    ],
    demo: {
      mode: 'web',
      html: '<main id="app"></main>',
      css: 'body { font-family: Georgia, serif; background: #faf8f4; color: #2a2a2a; margin: 0; }\nmain { max-width: 460px; margin: 0 auto; padding: 24px 16px; }\nh1 { border-bottom: 3px solid #b4552d; padding-bottom: 8px; }\n.post-link { display: block; padding: 12px 0; border-bottom: 1px solid #e5e0d8; color: inherit; text-decoration: none; }\n.post-link:hover h3 { color: #b4552d; }\n.post-link h3 { margin: 0 0 4px; }\n.post-link small, article small { color: #999; }\narticle p { line-height: 1.7; }\n.back { color: #b4552d; cursor: pointer; }',
      js: 'const posts = [\n  { slug: "learned-sql", title: "I learned SQL and now I see tables everywhere",\n    date: "2026-08-10", body: "The restaurant menu? A table. My week? A table with seven rows. Send help (in JSON)." },\n  { slug: "first-neural-net", title: "My first neural net: a diary",\n    date: "2026-08-04", body: "Epoch 1: it knew nothing. Epoch 4000: it knew XOR. Growth is possible for all of us." },\n  { slug: "hello-world", title: "Hello, world (my first post)",\n    date: "2026-07-28", body: "Every blog starts somewhere. Mine starts with a paragraph tag and unreasonable optimism." },\n];\n\nconst app = document.querySelector("#app");\n\nfunction listView() {\n  app.innerHTML = "<h1>My Dev Blog</h1>" + posts.map(p =>\n    `<a class="post-link" data-slug="${p.slug}"><h3>${p.title}</h3><small>${p.date}</small></a>`\n  ).join("");\n  app.querySelectorAll(".post-link").forEach(a =>\n    a.onclick = () => postView(a.dataset.slug));\n}\n\nfunction postView(slug) {\n  const p = posts.find(x => x.slug === slug);\n  app.innerHTML = `<span class="back">← All posts</span>\n    <article><h1>${p.title}</h1><small>${p.date}</small><p>${p.body}</p></article>`;\n  app.querySelector(".back").onclick = listView;\n}\n\nlistView();   // two templates render the whole site - that IS a CMS'
    },
    quiz: [
      { q: 'A "slug" is…', options: ['A bug', 'The URL-friendly version of a title (my-first-post)', 'The post ID', 'A template'], a: 1, why: 'Readable URLs beat /post?id=17 for humans and search engines alike.' },
      { q: 'Static site generators…', options: ['Render pages on every visit', 'Pre-build every page as plain HTML at publish time', 'Need PHP', 'Can\'t have styling'], a: 1, why: 'Publish-time rendering: nothing to hack, nothing to crash, free to host — the modern default for blogs.' },
      { q: 'Why is a blog the ideal first "real" project?', options: ['It\'s trendy', 'Simple architecture, every skill used, genuinely publishable in a weekend', 'It requires no code', 'It pays well'], a: 1, why: 'Templates + data + publishing = the whole web development loop, at learnable scale.' }
    ]
  },

  {
    id: 'search', name: 'Search engine', icon: '🔍', examples: 'Google · every site\'s search box', level: 2,
    blurb: 'Crawl, index, rank — finding needles in a billion haystacks.',
    overview: 'Search is three machines in a trenchcoat: a crawler that fetches pages by following links, an indexer that builds the world\'s best lookup table (word → pages containing it), and a ranker that orders results by relevance and authority. The demo below builds a real miniature index and ranker — the same shape Google had in 1998, minus a few data centers.',
    layers: [
      ['Crawler', 'distributed fetchers', 'follows links page→page, politely, forever; the web is its to-do list'],
      ['Indexer', 'the inverted index', 'word → list of (page, positions). The reason results arrive in milliseconds'],
      ['Ranker', 'relevance scoring + PageRank + ML', 'term frequency × page authority × freshness × a thousand signals'],
      ['Query front end', 'HTML/JS', 'the box, suggestions-as-you-type, results page'],
      ['Storage', 'massive distributed systems', 'a copy of the visible web, compressed and sharded'],
      ['Site search (small!)', 'SQL LIKE or a search library', 'your own site\'s search: honestly, a filtered query often suffices — this site\'s search bar is one']
    ],
    schema: "CREATE TABLE pages (\n  id INTEGER PRIMARY KEY,\n  url TEXT UNIQUE,\n  title TEXT,\n  links_in INTEGER DEFAULT 0    -- crude authority signal\n);\n\nCREATE TABLE index_entries (      -- the inverted index as a table\n  word TEXT,\n  page_id INTEGER,\n  count INTEGER                  -- times the word appears\n);\n\n-- \"Search\" for a word, ranked:\nSELECT pages.title, index_entries.count * (1 + pages.links_in) AS score\nFROM index_entries\nJOIN pages ON pages.id = index_entries.page_id\nWHERE index_entries.word = 'waffle'\nORDER BY score DESC;",
    hard: [
      '<b>Scale:</b> the index covers hundreds of billions of pages and updates continuously. Everything is distributed across data centers.',
      '<b>Ranking quality:</b> relevance is adversarial — an entire SEO industry tries to game every signal, forever.',
      '<b>Speed:</b> full results in ~200ms including spell-check, suggestions and ads. Every layer is cache upon cache.',
      '<b>Freshness vs authority:</b> news needs minutes-old pages; encyclopedic queries need trusted ones. Deciding which is which, per query, is ML.'
    ],
    mvp: [
      'Study the demo: it builds a genuine inverted index and TF ranking over mini-documents. Add more docs and watch rankings shift.',
      'Add an authority signal: give each doc a "links" score and multiply it in — congratulations, that\'s baby PageRank.',
      'Multi-word queries: sum the scores per word (the demo starts you off).',
      'Model the index in SQL with the schema above and rank with a query instead of JS.',
      'Stretch: highlight matched words in results, and add "did you mean" via closest-word matching.'
    ],
    demo: {
      mode: 'web',
      html: '<main>\n  <h2>🔍 MiniSearch</h2>\n  <input id="q" placeholder="try: waffle, neural, css…" autocomplete="off">\n  <div id="results"></div>\n</main>',
      css: 'body { font-family: sans-serif; background: #fff; color: #202124; margin: 0; }\nmain { max-width: 460px; margin: 0 auto; padding: 20px 16px; }\n#q { width: 100%; padding: 12px 16px; font-size: 15px; border: 1px solid #dfe1e5;\n  border-radius: 24px; box-shadow: 0 1px 6px rgba(32,33,36,.18); box-sizing: border-box; }\n.hit { padding: 12px 0; }\n.hit a { color: #1a0dab; font-size: 17px; text-decoration: none; }\n.hit .url { color: #006621; font-size: 12px; }\n.hit p { margin: 2px 0 0; font-size: 13px; color: #4d5156; }\n.score { float: right; font-size: 11px; color: #999; }',
      js: 'const docs = [\n  { url: "waffleworld.example/recipes", title: "27 Waffle Recipes Ranked by Crispiness",\n    text: "waffle recipes for every occasion the best waffle is a crispy waffle" },\n  { url: "codeteacher.example/ai", title: "Neural Nets from Scratch",\n    text: "train a neural network in your browser neural nets are loops and math" },\n  { url: "cssgarden.example", title: "CSS Grid Layouts Gallery",\n    text: "css grid flexbox layouts responsive css design patterns" },\n  { url: "waffleworld.example/history", title: "A Brief History of the Waffle",\n    text: "the waffle dates to medieval times waffle irons were hand forged" },\n  { url: "devblog.example/css-tricks", title: "10 CSS Tricks I Wish I Knew Sooner",\n    text: "css variables css animations and the css tricks that save hours" },\n];\n\n// 1. THE INVERTED INDEX: word -> [{doc, count}]\nconst index = {};\ndocs.forEach((doc, id) => {\n  doc.text.split(/\\s+/).forEach(word => {\n    index[word] = index[word] || {};\n    index[word][id] = (index[word][id] || 0) + 1;\n  });\n});\n\n// 2. THE RANKER: sum term counts across query words\nfunction search(query) {\n  const scores = {};\n  query.toLowerCase().split(/\\s+/).forEach(word => {\n    const hits = index[word] || {};\n    for (const id in hits) scores[id] = (scores[id] || 0) + hits[id];\n  });\n  return Object.entries(scores)\n    .sort((a, b) => b[1] - a[1])\n    .map(([id, score]) => ({ ...docs[id], score }));\n}\n\n// 3. THE FRONT END\ndocument.querySelector("#q").addEventListener("input", (e) => {\n  const hits = e.target.value.trim() ? search(e.target.value) : [];\n  document.querySelector("#results").innerHTML = hits.map(h =>\n    `<div class="hit"><span class="score">score ${h.score}</span>\n     <a>${h.title}</a><div class="url">${h.url}</div><p>${h.text.slice(0, 60)}…</p></div>`\n  ).join("") || (e.target.value ? "<p>No results. The index is honest.</p>" : "");\n});'
    },
    quiz: [
      { q: 'The inverted index maps…', options: ['Pages to their authors', 'Each word to the pages (and counts) containing it', 'URLs to IP addresses', 'Queries to ads'], a: 1, why: 'Look up the word, not the pages — the data structure that makes search instant.' },
      { q: 'PageRank\'s core idea was ranking pages by…', options: ['Length', 'How many (important) pages link to them — links as votes', 'Age', 'Keyword density'], a: 1, why: 'Authority flows through links — the insight that built Google.' },
      { q: 'For your own small site\'s search box, you typically need…', options: ['A crawler farm', 'A filtered query over your own content — like this site\'s search bar', 'PageRank', 'An ML ranker'], a: 1, why: 'Site search over hundreds of items is a LIKE query or an in-memory filter. Scale is what makes search hard.' }
    ]
  },

  {
    id: 'game', name: 'Multiplayer game', icon: '🎮', examples: 'Fortnite · Among Us · .io games', level: 2,
    blurb: 'Shared worlds, live leaderboards, and the fight against lag.',
    overview: 'Single-player games live entirely on one machine (the Toolbox\'s engine pages cover those). Multiplayer adds the hard part: many machines must agree on one world state while every packet takes 20-100ms to travel. The architecture — authoritative server, client prediction, lag compensation — is the same from .io games to Fortnite.',
    layers: [
      ['Game client', 'Unity/Unreal/Godot/JS', 'renders the world, sends YOUR inputs, predicts locally to feel instant'],
      ['Game server', 'authoritative simulation', 'the single source of truth — clients propose, the server decides (anti-cheat!)'],
      ['Netcode', 'UDP + prediction + reconciliation', 'clients guess ahead, server corrects, players rarely notice'],
      ['Matchmaking', 'queues + skill ratings (Elo-like)', 'grouping players of similar skill with low ping'],
      ['Persistence', 'SQL', 'accounts, unlocks, match history, leaderboards — the demo below'],
      ['Live ops', 'analytics + queues', 'events, balancing patches, and the eternal server-capacity dance']
    ],
    schema: "CREATE TABLE players (\n  id INTEGER PRIMARY KEY,\n  handle TEXT UNIQUE,\n  rating INTEGER DEFAULT 1000   -- Elo-style skill\n);\n\nCREATE TABLE matches (\n  id INTEGER PRIMARY KEY,\n  mode TEXT,\n  started TEXT\n);\n\nCREATE TABLE match_results (\n  match_id INTEGER,\n  player_id INTEGER,\n  score INTEGER,\n  won INTEGER                   -- 0/1\n);\n\n-- Leaderboard:\nSELECT players.handle, players.rating,\n       SUM(match_results.won) AS wins\nFROM players JOIN match_results ON match_results.player_id = players.id\nGROUP BY players.handle ORDER BY players.rating DESC LIMIT 10;",
    hard: [
      '<b>Latency:</b> light speed is a game mechanic. Prediction + reconciliation hide 50-100ms of physics from your perception.',
      '<b>Cheating:</b> the client is in the player\'s hands, so it can never be trusted — servers must validate every action.',
      '<b>State sync:</b> 100 players × 30 updates/second, compressed into tiny packets, prioritized by relevance.',
      '<b>Scale spikes:</b> launch day = 100x traffic. Matchmaking queues and server fleets flex or die.'
    ],
    mvp: [
      'Study the demo: a live leaderboard with simulated matches updating ratings — the persistence layer of every multiplayer game.',
      'Model it in the SQL playground with the schema; write the leaderboard and win-rate queries.',
      'Build a real single-player game first (Memory Match project, then a Toolbox engine tutorial) — multiplayer is a layer on top of a game worth playing.',
      'Two-tab multiplayer, for real: the localStorage storage event (chat blueprint, step 4) lets two tabs share game state — build turn-based tic-tac-toe across tabs, no server!',
      'Stretch: real netcode via free tiers of Photon/Colyseus, or a Node WebSocket server if you\'ve explored the Toolbox.'
    ],
    demo: {
      mode: 'web',
      html: '<main>\n  <h2>🏆 Live Arena Leaderboard</h2>\n  <p id="ticker">Waiting for matches…</p>\n  <table id="board"></table>\n</main>',
      css: 'body { font-family: sans-serif; background: #0d1321; color: #e6edf3; margin: 0; }\nmain { max-width: 420px; margin: 0 auto; padding: 20px 14px; }\n#ticker { color: #7ee787; font-size: 13px; min-height: 1.2em; }\ntable { width: 100%; border-collapse: collapse; }\ntd, th { padding: 8px 10px; text-align: left; border-bottom: 1px solid #21304a; }\nth { color: #8b949e; font-size: 12px; }\n.up { color: #7ee787; }\n.down { color: #f85149; }\n.rank { color: #8b949e; }',
      js: 'const players = [\n  { handle: "WaffleSlayer", rating: 1240 },\n  { handle: "xX_Ada_Xx", rating: 1195 },\n  { handle: "NullPointer", rating: 1150 },\n  { handle: "SegfaultSam", rating: 1102 },\n  { handle: "KimPossible", rating: 1080 },\n];\n\nfunction render(changed) {\n  players.sort((a, b) => b.rating - a.rating);\n  document.querySelector("#board").innerHTML =\n    "<tr><th>#</th><th>Player</th><th>Rating</th></tr>" +\n    players.map((p, i) =>\n      `<tr><td class="rank">${i + 1}</td><td>${p.handle}</td>\n       <td class="${p === changed?.winner ? "up" : p === changed?.loser ? "down" : ""}">${p.rating}</td></tr>`\n    ).join("");\n}\n\n// Simulated matches with a real Elo-style update:\nsetInterval(() => {\n  const [a, b] = [...players].sort(() => Math.random() - 0.5);\n  // higher rating = higher win chance (that\'s Elo\'s promise)\n  const expectedA = 1 / (1 + 10 ** ((b.rating - a.rating) / 400));\n  const aWins = Math.random() < expectedA;\n  const winner = aWins ? a : b, loser = aWins ? b : a;\n  const swing = Math.round(24 * (1 - (aWins ? expectedA : 1 - expectedA)));\n  winner.rating += swing;\n  loser.rating -= swing;\n  document.querySelector("#ticker").textContent =\n    `⚔ ${winner.handle} defeats ${loser.handle} (+${swing} / -${swing})`;\n  render({ winner, loser });\n}, 1800);\n\nrender();'
    },
    quiz: [
      { q: 'Why must the server be "authoritative"?', options: ['Servers are faster', 'Clients can be modified by cheaters — only the server\'s world state can be trusted', 'It saves bandwidth', 'Tradition'], a: 1, why: 'Clients propose actions; the server validates and decides. Anything else is an aimbot invitation.' },
      { q: 'Client-side prediction exists because…', options: ['Servers are lazy', 'Waiting a round-trip for every keypress would feel unplayably laggy', 'It saves battery', 'Graphics need it'], a: 1, why: 'Your client simulates ahead instantly, then reconciles with the server\'s truth — hiding latency from your hands.' },
      { q: 'In Elo-style ratings, beating a much higher-rated player…', options: ['Gains the same as any win', 'Gains extra points (upsets move ratings more)', 'Gains nothing', 'Resets both'], a: 1, why: 'Updates scale with surprise — the demo\'s formula does exactly this.' }
    ]
  },

  {
    id: 'aichat', name: 'AI chatbot', icon: '🤖', examples: 'ChatGPT · Claude · support bots', level: 2,
    blurb: 'A chat interface wrapped around a language model — the 2020s app.',
    overview: 'An AI chat app is architecturally humble: a chat UI (you built one in the chat blueprint), a backend that forwards the conversation to a language-model API, and streaming to show words as they generate. The model itself — a transformer from your AI track, scaled up a million-fold — is rented by the token from providers. The craft lives in prompts, context management and safety.',
    layers: [
      ['Chat front end', 'HTML/CSS/JS', 'bubbles, streaming text, markdown rendering, stop button'],
      ['Backend', 'thin API server', 'holds your secret API key, forwards conversations, streams responses back'],
      ['The model API', 'Claude / GPT / open models', 'conversation in → next message out, priced per token'],
      ['Context management', 'the conversation window', 'models see a finite window — old messages get summarized or dropped'],
      ['System prompt', 'instructions text', '"You are a helpful cooking assistant…" — the bot\'s personality and rules'],
      ['Safety & cost', 'filters + rate limits', 'abuse prevention, content policies, and not bankrupting yourself per token']
    ],
    schema: "CREATE TABLE conversations (\n  id INTEGER PRIMARY KEY,\n  user_id INTEGER,\n  title TEXT,\n  created TEXT\n);\n\nCREATE TABLE messages (\n  id INTEGER PRIMARY KEY,\n  conversation_id INTEGER,\n  role TEXT,          -- 'system' / 'user' / 'assistant'\n  content TEXT,\n  tokens INTEGER      -- cost tracking!\n);\n\n-- Rebuild a conversation to send to the model:\nSELECT role, content FROM messages\nWHERE conversation_id = 1 ORDER BY id;",
    hard: [
      '<b>Context limits:</b> models read a finite window; long chats need summarization, trimming or retrieval of relevant history.',
      '<b>Hallucination:</b> models confidently invent facts — grounding answers in real documents (RAG) is the standard mitigation.',
      '<b>Cost & latency:</b> every token costs money and time; caching, smaller models and streaming keep it usable.',
      '<b>Safety:</b> prompt injection, jailbreaks and harmful outputs make filtering and careful system prompts essential.'
    ],
    mvp: [
      'Study the demo — a rules-based bot with the real app shape: system persona, context memory, typing delay. It\'s the ELIZA pattern from 1966!',
      'Give it more rules and a memory of facts the user shares (the demo remembers your name — extend it).',
      'The real thing: Claude\'s API docs (docs.claude.com) show the exact messages format — the schema above mirrors it. Free tiers exist for experimenting.',
      'Add streaming: render the reply word-by-word with setInterval — instant "AI feel".',
      'Stretch: RAG-lite — paste your notes into an array, retrieve the most relevant one (search blueprint skills!) and prepend it to the bot\'s answer.'
    ],
    demo: {
      mode: 'web',
      html: '<main>\n  <div id="log"></div>\n  <form id="bar"><input id="msg" placeholder="Say hi… tell it your name… ask about waffles…" autocomplete="off"><button>➤</button></form>\n</main>',
      css: 'body { font-family: sans-serif; background: #1a1a2e; color: #e6e6f0; margin: 0; }\nmain { max-width: 440px; margin: 0 auto; height: 96vh; display: flex; flex-direction: column; }\n#log { flex: 1; overflow-y: auto; padding: 16px; }\n.b { max-width: 80%; padding: 10px 14px; border-radius: 14px; margin-bottom: 10px; font-size: 14px; line-height: 1.5; }\n.user { background: #4a4ae0; margin-left: auto; border-bottom-right-radius: 4px; }\n.bot { background: #26263e; border-bottom-left-radius: 4px; }\n.typing { color: #888; font-style: italic; }\n#bar { display: flex; gap: 8px; padding: 12px; }\n#msg { flex: 1; padding: 10px 14px; border-radius: 20px; border: 1px solid #333; background: #12121f; color: #e6e6f0; }\n#bar button { border: none; border-radius: 50%; width: 40px; background: #4a4ae0; color: white; font-size: 16px; cursor: pointer; }',
      js: '// A rules-based "language model" - the real app shape, toy brain.\nconst memory = { name: null };   // context management, miniature\n\nconst rules = [\n  { match: /my name is (\\w+)/i,\n    reply: (m) => { memory.name = m[1]; return `Nice to meet you, ${m[1]}! I\'ll remember that.`; } },\n  { match: /(hi|hello|hey)\\b/i,\n    reply: () => memory.name ? `Hello again, ${memory.name}!` : "Hi there! What\'s your name?" },\n  { match: /waffle/i,\n    reply: () => "Excellent topic. Waffles are pancakes with abs. What else can I help with?" },\n  { match: /(name|remember)/i,\n    reply: () => memory.name ? `You told me your name is ${memory.name}.` : "You haven\'t told me your name yet!" },\n  { match: /(how|what|why|help)/i,\n    reply: () => "Great question! A real model would reason about that - I just pattern-match. Try the AI track to see how the real ones work." },\n];\nconst fallback = () => "Interesting! Tell me more. (My rules are limited - real LLMs predict the next word from everything ever written.)";\n\nconst log = document.querySelector("#log");\nfunction bubble(text, cls) {\n  const b = document.createElement("div");\n  b.className = "b " + cls;\n  b.textContent = text;\n  log.appendChild(b);\n  log.scrollTop = log.scrollHeight;\n  return b;\n}\n\nbubble("Hello! I\'m WaffleBot 🤖 - a rules-based chatbot with the same app shape as the real ones.", "bot");\n\ndocument.querySelector("#bar").addEventListener("submit", (e) => {\n  e.preventDefault();\n  const input = document.querySelector("#msg");\n  const text = input.value.trim();\n  if (!text) return;\n  bubble(text, "user");\n  input.value = "";\n\n  const t = bubble("thinking…", "bot typing");\n  setTimeout(() => {\n    for (const rule of rules) {\n      const m = text.match(rule.match);\n      if (m) { t.textContent = rule.reply(m); t.classList.remove("typing"); return; }\n    }\n    t.textContent = fallback();\n    t.classList.remove("typing");\n  }, 700);\n});'
    },
    quiz: [
      { q: 'In an AI chat app, where does the "intelligence" live?', options: ['In the front-end JS', 'In a language-model API the backend calls', 'In the SQL database', 'In CSS'], a: 1, why: 'The app is a well-crafted wrapper; the model (a scaled-up transformer) is accessed per-token via API.' },
      { q: 'Why does the API key live on the backend, never in front-end code?', options: ['Keys are too long for JS', 'Anything in front-end code is visible to every visitor — they\'d spend your money', 'Browsers block keys', 'Style preference'], a: 1, why: 'View-source shows all client code. Secrets stay server-side, always.' },
      { q: 'The "system prompt" is…', options: ['An error message', 'Standing instructions defining the bot\'s role and rules, sent with every conversation', 'The OS terminal', 'User settings'], a: 1, why: 'It\'s the persona + policy layer — the first message the model sees, invisible to users.' }
    ]
  }
];
