/* ============================================================
   AI & Neural Nets track — real, runnable networks in Python & JS
   ============================================================ */
window.CT_TRACKS = window.CT_TRACKS || {};

window.CT_TRACKS.ai = {
  id: 'ai',
  name: 'AI & Neural Nets',
  icon: 'AI',
  area: 'python',
  tagline: 'Build neural networks from scratch — and actually train them, right here.',
  blurb: 'Neural networks sound like magic; they are actually loops, multiplication and a clever trick called gradient descent — all things you already know. In this track you build real networks from scratch in Python AND JavaScript, train them live in your browser, and learn what CNNs, RNNs and transformers really are. Best after the intermediate lessons of the Python or JavaScript tracks.',
  uses: ['Image recognition (CNNs)', 'Chatbots & translation (transformers)', 'Speech & time series (RNNs)', 'Recommendations', 'Game AI', 'Art generation', 'Prediction & forecasting'],
  lessons: [

    /* ---------- BEGINNER ---------- */
    {
      id: 'ai-1', title: 'What is a neural network, really?', level: 0, minutes: 12,
      blocks: [
        { t: 'p', html: 'Strip away the hype and a neural network is a <b>function with adjustable knobs</b>. Numbers go in, numbers come out, and between them sit thousands (or billions) of little dials called <b>weights</b>. "Training" means automatically turning those dials until the outputs are useful.' },
        { t: 'p', html: 'The building block is the artificial <b>neuron</b>, loosely inspired by brain cells. One neuron does something almost insultingly simple:' },
        { t: 'ol', items: [
          'Take several input numbers.',
          'Multiply each by its own <b>weight</b> (how much that input matters).',
          'Add them up, plus a <b>bias</b> (a baseline nudge).',
          'Pass the sum through an <b>activation function</b> (e.g. "output 1 if the sum is big, else 0").'
        ] },
        { t: 'code', lang: 'text', code: 'inputs:   x1      x2      x3\n           \\       |       /\n        w1  \\   w2 |   w3 /      multiply by weights\n             \\     |     /\n              [ sum + bias ]\n                    |\n             [ activation ]\n                    |\n                 output' },
        { t: 'p', html: 'A <b>network</b> is just neurons wired in <b>layers</b>: an input layer (your data), one or more <b>hidden layers</b> (each neuron reads all the previous layer\'s outputs), and an output layer (the answer). More layers = "deeper" = <b>deep learning</b>. That\'s the whole vocabulary origin story.' },
        { t: 'p', html: 'Why does stacking simple neurons work? Each layer learns to detect patterns in the previous layer\'s patterns. In an image network: layer 1 finds edges → layer 2 combines edges into shapes → layer 3 combines shapes into "cat face". Nobody programs those steps — they <i>emerge</i> from training.' },
        { t: 'tip', html: 'Everything in this track runs on math you know: multiply, add, compare. If FizzBuzz made sense, neural nets are within reach — they\'re loops all the way down.' }
      ],
      tryIt: {
        mode: 'python',
        code: '# One neuron, deciding: "should I go outside?"\n# Inputs: sunshine (0-10), free_time (0-10), homework (0-10)\n\nsunshine = 8\nfree_time = 6\nhomework = 9\n\n# Weights: how much this neuron cares about each input\nw_sun = 0.6      # sunshine is nice\nw_time = 0.4     # free time helps\nw_hw = -0.8      # homework holds you back (negative weight!)\nbias = -2        # a lazy baseline: default is "stay in"\n\ntotal = sunshine * w_sun + free_time * w_time + homework * w_hw + bias\n\nprint("Neuron\'s total:", round(total, 2))\nif total > 0:\n    print("Decision: GO OUTSIDE 🌞")\nelse:\n    print("Decision: stay in 🏠")\n\n# Play with the weights and inputs. Make the neuron love homework.\n# Congratulations - you are now hand-training a neural network.',
        expected: 'Neuron\'s total: -1.6\nDecision: stay in 🏠'
      },
      quiz: [
        { q: 'A weight in a neural network is…', options: ['How heavy the computer is', 'An adjustable number deciding how much an input matters', 'The network\'s speed', 'A type of neuron'], a: 1, why: 'Weights are the knobs. Training = finding good values for them automatically.' },
        { q: 'What does one neuron fundamentally compute?', options: ['A database lookup', 'A weighted sum plus bias, passed through an activation', 'Random numbers', 'If-else chains'], a: 1, why: 'Multiply-add-activate. Everything else in deep learning is arranging billions of these.' },
        { q: '"Deep" in deep learning refers to…', options: ['Profound thoughts', 'Many layers of neurons stacked', 'Underground servers', 'Long training times'], a: 1, why: 'Depth = layer count. Each layer builds patterns out of the previous layer\'s patterns.' }
      ],
      challenge: {
        text: 'Give the go-outside neuron a fourth input: <code>friends_out</code> (0-10) with a strong positive weight. Find weight values where homework=10 still can\'t stop you if friends_out=10.',
        hints: ['The friends weight must be able to overpower w_hw × 10 — make it bigger than 0.8.'],
        solution: { lang: 'python', code: 'friends_out = 10\nw_friends = 1.2\n\ntotal = (sunshine * w_sun + free_time * w_time\n         + homework * w_hw + friends_out * w_friends + bias)\nprint(round(total, 2), "-> GO OUTSIDE" if total > 0 else "-> stay in")' }
      }
    },

    {
      id: 'ai-2', title: 'The perceptron: a neuron that learns', level: 0, minutes: 16,
      blocks: [
        { t: 'p', html: 'Hand-picking weights doesn\'t scale. The 1958 <b>perceptron</b> was the first neuron that found its own weights — and its learning rule is beautifully simple:' },
        { t: 'ol', items: [
          'Make a prediction with the current weights.',
          'Compare to the correct answer. The difference is the <b>error</b>.',
          'Nudge each weight a little bit in the direction that would have reduced that error.',
          'Repeat over the whole dataset, many times (<b>epochs</b>), until the errors stop.'
        ] },
        { t: 'code', lang: 'python', code: '# the entire learning rule:\nerror = target - prediction\nweight = weight + learning_rate * error * input_value\nbias = bias + learning_rate * error' },
        { t: 'p', html: 'The <b>learning rate</b> controls the nudge size. Too big and learning ping-pongs past the answer; too small and it crawls. (0.1 is a fine starting guess for toy problems.)' },
        { t: 'p', html: 'The classic first task is learning a <b>logic gate</b>. The AND gate outputs 1 only when both inputs are 1 — and a perceptron discovers this itself from just four examples, in a handful of epochs. Watch it happen below: run the code and read the training log. The errors shrink to zero — that\'s learning, live.' },
        { t: 'warn', html: 'Famous plot twist: a single perceptron can only learn patterns separable by a straight line. AND and OR work; <b>XOR</b> (output 1 when inputs <i>differ</i>) is impossible — this discovery froze AI research for years! The fix is hidden layers, coming two lessons from now.' }
      ],
      tryIt: {
        mode: 'python',
        code: '# A perceptron learns the AND gate - from scratch, before your eyes\n\ndata = [\n    ([0, 0], 0),\n    ([0, 1], 0),\n    ([1, 0], 0),\n    ([1, 1], 1),   # AND: only 1 AND 1 -> 1\n]\n\nweights = [0.0, 0.0]\nbias = 0.0\nlr = 0.1   # learning rate\n\nfor epoch in range(1, 11):\n    total_error = 0\n    for inputs, target in data:\n        # 1. predict\n        s = inputs[0] * weights[0] + inputs[1] * weights[1] + bias\n        prediction = 1 if s > 0 else 0\n        # 2. compare\n        error = target - prediction\n        total_error += abs(error)\n        # 3. nudge\n        weights[0] += lr * error * inputs[0]\n        weights[1] += lr * error * inputs[1]\n        bias += lr * error\n    print(f"Epoch {epoch}: mistakes={total_error}  weights={[round(w,2) for w in weights]}  bias={round(bias,2)}")\n    if total_error == 0:\n        print("\\nLearned it! 🎉 Final test:")\n        for inputs, target in data:\n            s = inputs[0] * weights[0] + inputs[1] * weights[1] + bias\n            print(f"  {inputs} -> {1 if s > 0 else 0} (wanted {target})")\n        break\n\n# Change the data to teach it OR instead. Then try XOR and watch it fail forever...',
        expected: 'Epoch 1: mistakes=1  weights=[0.1, 0.1]  bias=0.1\n...\nLearned it! 🎉 Final test:\n  [0, 0] -> 0 (wanted 0)\n  [0, 1] -> 0 (wanted 0)\n  [1, 0] -> 0 (wanted 0)\n  [1, 1] -> 1 (wanted 1)'
      },
      quiz: [
        { q: 'What drives the weight updates in perceptron learning?', options: ['Random guessing', 'The error: target minus prediction', 'The programmer\'s intuition', 'The input size'], a: 1, why: 'No error → no change. Wrong answers push weights toward doing better on that example.' },
        { q: 'An epoch is…', options: ['One weight', 'One pass through the entire training dataset', 'One neuron', 'One second of training'], a: 1, why: 'Training loops over the data many times; each full pass is an epoch.' },
        { q: 'Why can\'t a single perceptron learn XOR?', options: ['XOR has too many examples', 'No straight line separates XOR\'s classes', 'The learning rate is wrong', 'It can, slowly'], a: 1, why: 'Plot the four XOR points: no single line puts the 1s on one side and 0s on the other. Hidden layers solve it.' }
      ],
      challenge: {
        text: 'Teach the perceptron the OR gate (only [0,0] gives 0), then NAND (the opposite of AND). Then swap in XOR targets ([0,1,1,0]) and watch the mistake count never settle — you\'re witnessing the famous limitation firsthand.',
        hints: ['Only the targets in <code>data</code> change — the learning code is untouched. That generality is the whole point of machine learning.'],
        solution: { lang: 'python', code: '# OR:\ndata = [([0,0],0), ([0,1],1), ([1,0],1), ([1,1],1)]\n# NAND:\ndata = [([0,0],1), ([0,1],1), ([1,0],1), ([1,1],0)]\n# XOR (watch it flail - a single neuron cannot do this):\ndata = [([0,0],0), ([0,1],1), ([1,0],1), ([1,1],0)]' }
      }
    },

    /* ---------- INTERMEDIATE ---------- */
    {
      id: 'ai-3', title: 'Activations & gradient descent', level: 1, minutes: 16,
      blocks: [
        { t: 'p', html: 'Two upgrades turn the 1958 perceptron into modern deep learning. <b>Upgrade one: smooth activations.</b> The perceptron\'s harsh yes/no step function tells you nothing about <i>how wrong</i> you were. Smooth curves do:' },
        { t: 'table', head: ['Activation', 'Formula', 'Output range', 'Used for'], rows: [
          ['Sigmoid', '<code>1 / (1 + e^-x)</code>', '0 to 1', 'probabilities, classic nets'],
          ['ReLU', '<code>max(0, x)</code>', '0 to ∞', 'hidden layers of nearly everything modern'],
          ['Tanh', '<code>tanh(x)</code>', '-1 to 1', 'when negatives are meaningful']
        ] },
        { t: 'p', html: '<b>Upgrade two: a smarter way to nudge.</b> Define a <b>loss function</b> — a single number measuring total wrongness (e.g. squared error: <code>(prediction - target)²</code>). Now training becomes: <i>find the weights that minimize the loss</i>.' },
        { t: 'p', html: '<b>Gradient descent</b> does this: imagine the loss as hilly terrain where your position is the current weights. Compute the slope (<b>gradient</b>) under your feet, take a small step downhill, repeat. The learning rate is the step size. That\'s the algorithm training every neural network on Earth — GPT included.' },
        { t: 'code', lang: 'text', code: 'loss\n │ \\                                    /\n │  \\          you are here           /\n │   \\           ●                   /\n │    \\         / step downhill...  /\n │     \\against the slope          /\n │      \\___          ____________/\n │          \\________/  ← goal: the bottom\n └──────────────────────────────── weights' },
        { t: 'p', html: 'The demo below runs gradient descent on the simplest possible "network": fitting the line <code>y = m·x + b</code> to noisy data (this is <b>linear regression</b> — machine learning\'s hello world). Watch m and b walk toward the true values 2 and 1.' }
      ],
      tryIt: {
        mode: 'js',
        code: '// Gradient descent fitting y = m*x + b to noisy data (true: m=2, b=1)\nconst data = [];\nfor (let x = 0; x < 10; x++) {\n  data.push([x, 2 * x + 1 + (Math.random() - 0.5)]);   // y = 2x + 1 + noise\n}\n\nlet m = 0, b = 0;\nconst lr = 0.01;\n\nfor (let epoch = 1; epoch <= 300; epoch++) {\n  let gradM = 0, gradB = 0, loss = 0;\n  for (const [x, y] of data) {\n    const pred = m * x + b;\n    const error = pred - y;\n    loss += error * error;\n    gradM += 2 * error * x;    // slope of the loss w.r.t. m\n    gradB += 2 * error;        // slope of the loss w.r.t. b\n  }\n  m -= lr * gradM / data.length;   // step downhill\n  b -= lr * gradB / data.length;\n  if (epoch % 50 === 0) {\n    console.log(`epoch ${epoch}: m=${m.toFixed(3)} b=${b.toFixed(3)} loss=${(loss / data.length).toFixed(4)}`);\n  }\n}\nconsole.log(`\\nLearned: y = ${m.toFixed(2)}x + ${b.toFixed(2)}  (true: y = 2x + 1)`);\n\n// Try a huge learning rate (0.1)... then a tiny one (0.0001). Feel the tradeoff.'
      },
      quiz: [
        { q: 'A loss function measures…', options: ['Training speed', 'How wrong the model currently is, as one number', 'Memory usage', 'The number of layers'], a: 1, why: 'One number to minimize turns "learning" into a well-defined math problem.' },
        { q: 'Gradient descent works by…', options: ['Trying every possible weight', 'Repeatedly stepping weights against the slope of the loss', 'Sorting the data', 'Increasing the learning rate'], a: 1, why: 'Compute the gradient, step downhill, repeat until the loss flattens out.' },
        { q: 'A learning rate that\'s too large causes…', options: ['Slow but sure learning', 'Overshooting and unstable, bouncing loss', 'Perfect accuracy', 'Nothing different'], a: 1, why: 'Giant steps leap over the valley and can even diverge. Watching loss bounce = lower the rate.' }
      ],
      challenge: {
        text: 'Change the data to a downhill line (<code>y = -3x + 7</code> plus noise) and confirm gradient descent finds it. Then set lr = 0.15 and describe (in a comment) what the loss numbers do.',
        hints: ['Only the data-generating line changes. The learner is general — that\'s the magic.'],
        solution: { lang: 'js', code: 'data.push([x, -3 * x + 7 + (Math.random() - 0.5)]);\n// With lr = 0.15 the loss EXPLODES toward Infinity/NaN -\n// each step overshoots worse than the last. Classic divergence.' }
      }
    },

    {
      id: 'ai-4', title: 'Hidden layers & backpropagation: XOR, solved', level: 1, minutes: 18,
      blocks: [
        { t: 'p', html: 'Time to slay the XOR dragon. Add a <b>hidden layer</b> — a few neurons between input and output — and the network can bend its decision boundary. But that raises the deep question: <i>how do the hidden weights know how to change?</i> The error is measured at the output — the hidden neurons never see it directly.' },
        { t: 'p', html: 'The answer is <b>backpropagation</b> (1986, the algorithm that revived AI): send the error <i>backwards</i> through the network, using calculus\'s chain rule to compute exactly how much each weight — however deep — contributed to the mistake. Then nudge every weight by its share of the blame.' },
        { t: 'ol', items: [
          '<b>Forward pass:</b> data flows in, each layer computes, prediction comes out.',
          '<b>Measure loss</b> at the output.',
          '<b>Backward pass:</b> the error signal flows back layer by layer, computing each weight\'s blame (gradient).',
          '<b>Update:</b> every weight steps downhill. Repeat thousands of times.'
        ] },
        { t: 'p', html: 'Below is a complete neural network — 2 inputs, 3 hidden neurons, 1 output — written in ~50 lines of the JavaScript you already know. No libraries. It learns XOR in a few seconds. When it finishes, you\'ll have trained a genuine neural network with backpropagation, from scratch.' },
        { t: 'tip', html: 'The weights start <b>random</b> — this matters! If all weights started equal, the hidden neurons would compute identical things forever (nothing would break the symmetry). And why 3 hidden neurons when 2 is the theoretical minimum? Try setting <code>H = 2</code>: it usually works, but sometimes gets trapped in a <b>local minimum</b> — a dip in the loss landscape that isn\'t the bottom. A slightly roomier network has more escape routes. Real ML engineers overprovision for exactly this reason.' }
      ],
      tryIt: {
        mode: 'js',
        height: 320,
        code: '// A complete neural network learning XOR - no libraries!\nconst sigmoid = x => 1 / (1 + Math.exp(-x));\nconst rand = () => Math.random() * 2 - 1;\n\nconst H = 3;   // hidden neurons (try 2 - it sometimes gets stuck!)\n\n// 2 inputs -> H hidden neurons -> 1 output\nlet w1 = [Array.from({length: H}, rand), Array.from({length: H}, rand)];\nlet b1 = Array.from({length: H}, rand);\nlet w2 = Array.from({length: H}, rand);\nlet b2 = rand();\n\nconst data = [[[0,0],0], [[0,1],1], [[1,0],1], [[1,1],0]];  // XOR!\nconst lr = 0.5;\nconst hidden = (x) => b1.map((b, j) => sigmoid(x[0]*w1[0][j] + x[1]*w1[1][j] + b));\nconst output = (h) => sigmoid(h.reduce((s, hj, j) => s + hj * w2[j], b2));\n\nfor (let epoch = 1; epoch <= 8000; epoch++) {\n  let loss = 0;\n  for (const [x, target] of data) {\n    // ---- forward pass ----\n    const h = hidden(x);\n    const out = output(h);\n    loss += (out - target) ** 2;\n\n    // ---- backward pass (backpropagation) ----\n    const dOut = (out - target) * out * (1 - out);\n    const dH = h.map((hj, j) => dOut * w2[j] * hj * (1 - hj));\n\n    // ---- update every weight by its blame ----\n    for (let j = 0; j < H; j++) {\n      w2[j] -= lr * dOut * h[j];\n      b1[j] -= lr * dH[j];\n      w1[0][j] -= lr * dH[j] * x[0];\n      w1[1][j] -= lr * dH[j] * x[1];\n    }\n    b2 -= lr * dOut;\n  }\n  if (epoch % 2000 === 0) console.log(`epoch ${epoch}: loss=${loss.toFixed(4)}`);\n}\n\nconsole.log("\\nXOR, learned by a neural network:");\nfor (const [x, target] of data) {\n  const out = output(hidden(x));\n  console.log(`  ${x} -> ${out.toFixed(3)}  (target ${target})`);\n}'
      },
      quiz: [
        { q: 'Backpropagation exists to answer which question?', options: ['How fast can we train?', 'How much did each hidden weight contribute to the output error?', 'How many layers do we need?', 'Which data to use?'], a: 1, why: 'It distributes blame backwards through the layers so every weight knows its update.' },
        { q: 'Why must initial weights be random?', options: ['Randomness is faster', 'Equal weights would make hidden neurons forever identical', 'To confuse attackers', 'They don\'t need to be'], a: 1, why: 'Symmetry breaking: identical starts + identical gradients = identical neurons, forever. Random starts let them specialize.' },
        { q: 'The forward pass does what?', options: ['Updates weights', 'Computes the prediction from inputs through each layer', 'Measures the dataset size', 'Deletes bad neurons'], a: 1, why: 'Forward = predict. Backward = assign blame. Update = learn. That trio is the training loop.' }
      ],
      challenge: {
        text: 'Watch learning fail informatively: (1) replace every <code>rand</code> with <code>() => 0.5</code> so all hidden neurons start identical, and see the loss get stuck; (2) restore randomness but train only 500 epochs — inspect the half-baked outputs. Write one comment explaining each result.',
        hints: ['Stuck loss = the net outputs ~0.5 for everything: the clone neurons can\'t split the work.'],
        solution: { lang: 'js', code: '// (1) Array.from({length: H}, () => 0.5) everywhere + b2 = 0.5\n//     -> loss plateaus: symmetric neurons compute the same thing,\n//        so the network is effectively ONE neuron - and XOR needs more.\n// (2) 500 epochs -> outputs hover near 0.5: the loss landscape walk\n//     simply hasn\'t reached the valley yet. Training takes time.' }
      }
    },

    {
      id: 'ai-5', title: 'Training well: data, overfitting & evaluation', level: 1, minutes: 14,
      blocks: [
        { t: 'p', html: 'You can now train networks. The next skill separates hobbyists from practitioners: knowing whether a trained model is <i>actually good</i> — because a network can ace training and still be useless.' },
        { t: 'p', html: '<b>Overfitting</b> is the central villain: with enough knobs, a network can <i>memorize</i> the training examples instead of learning the pattern — like a student who memorizes last year\'s exam answers and fails this year\'s paper. Symptom: great accuracy on training data, terrible accuracy on new data.' },
        { t: 'p', html: 'The defense is discipline about data:' },
        { t: 'ul', items: [
          '<b>Split your data:</b> train on ~80%, hold out ~20% the model NEVER trains on (the <b>test set</b>). Only test-set performance counts.',
          '<b>Watch both curves:</b> training loss falling while test loss rises = overfitting in progress. Stop early.',
          '<b>More data beats cleverness:</b> the surest cure for memorization is more examples than the model can memorize.',
          '<b>Simpler when possible:</b> fewer neurons/layers = less memorization capacity. Start small, grow only if underfitting.'
        ] },
        { t: 'p', html: 'Vocabulary that unlocks every ML conversation and tutorial:' },
        { t: 'table', head: ['Term', 'Meaning'], rows: [
          ['features', 'the input columns (size, age, pixel values…)'],
          ['labels', 'the correct answers you train toward'],
          ['batch', 'a chunk of examples processed before each weight update'],
          ['hyperparameters', 'settings YOU choose: learning rate, layers, epochs'],
          ['accuracy', '% of predictions that are right (for yes/no tasks)'],
          ['underfitting', 'model too simple — bad even on training data']
        ] },
        { t: 'tip', html: 'The demo trains the same model on 6 noisy points vs 60, then tests both on fresh data it never saw. Small-data model looks great in training and embarrasses itself on the test — overfitting, live.' }
      ],
      tryIt: {
        mode: 'js',
        code: '// Overfitting demo: same model, 6 vs 60 training points\n// True rule: y = 3x + 2 (+ noise). Model: y = m*x + b via gradient descent.\n\nfunction makeData(n) {\n  const d = [];\n  for (let i = 0; i < n; i++) {\n    const x = Math.random() * 10;\n    d.push([x, 3 * x + 2 + (Math.random() - 0.5) * 8]);   // heavy noise!\n  }\n  return d;\n}\n\nfunction train(data, epochs) {\n  let m = 0, b = 0;\n  const lr = 0.01;\n  for (let e = 0; e < epochs; e++) {\n    let gm = 0, gb = 0;\n    for (const [x, y] of data) {\n      const err = m * x + b - y;\n      gm += 2 * err * x; gb += 2 * err;\n    }\n    m -= lr * gm / data.length; b -= lr * gb / data.length;\n  }\n  return [m, b];\n}\n\nconst avgLoss = (data, m, b) =>\n  data.reduce((s, [x, y]) => s + (m * x + b - y) ** 2, 0) / data.length;\n\nconst test = makeData(50);                    // fresh, never-trained-on data\n\nfor (const n of [6, 60]) {\n  const trainSet = makeData(n);\n  const [m, b] = train(trainSet, 2000);\n  console.log(`\\nTrained on ${n} points: y = ${m.toFixed(2)}x + ${b.toFixed(2)}`);\n  console.log(`  training loss: ${avgLoss(trainSet, m, b).toFixed(2)}`);\n  console.log(`  TEST loss:     ${avgLoss(test, m, b).toFixed(2)}   <- the score that matters`);\n}\nconsole.log("\\n(True rule was y = 3x + 2. More data -> closer fit, honest test score.)"'
          + ');'
      },
      quiz: [
        { q: 'Overfitting means the model…', options: ['Trains too slowly', 'Memorized the training data and fails on new data', 'Has too little data… wait, too few layers', 'Is too accurate'], a: 1, why: 'Great training scores + bad test scores = memorization, not understanding.' },
        { q: 'Why hold out a test set?', options: ['To train faster', 'To measure performance on data the model never saw — the honest score', 'To save memory', 'Tradition'], a: 1, why: 'Any score measured on training data is flattery. Generalization is the goal.' },
        { q: 'Which is a hyperparameter?', options: ['A weight', 'The learning rate', 'A gradient', 'A prediction'], a: 1, why: 'Weights are learned; hyperparameters (learning rate, layer sizes, epochs) are chosen by you.' }
      ],
      challenge: {
        text: 'Add a third run trained on 600 points. Then crank the noise multiplier from 8 to 20 and answer in a comment: which defense helps more here — more data or less noise?',
        hints: ['Just add 600 to the loop array. For noise, change the * 8.'],
        solution: { lang: 'js', code: 'for (const n of [6, 60, 600]) { ... }\n// With noise * 20: even 600 points leave a high loss FLOOR -\n// no amount of data can remove irreducible noise. Cleaner data\n// lowers the floor; more data just stops memorization of it.' }
      }
    },

    /* ---------- ADVANCED ---------- */
    {
      id: 'ai-6', title: 'Vectorized nets with numpy', level: 2, minutes: 18,
      blocks: [
        { t: 'p', html: 'Real networks have thousands of neurons — looping one weight at a time would take geological time. The professional move: express whole layers as <b>matrix multiplication</b>, and let optimized math libraries do it. In Python, that library is <b>numpy</b>.' },
        { t: 'p', html: 'The mental upgrade: instead of "neuron j computes a weighted sum", think "the layer is a weight <i>matrix</i> W; the whole forward pass is <code>outputs = activation(X · W + b)</code>". One line per layer, no loops, all inputs at once:' },
        { t: 'code', lang: 'python', code: 'import numpy as np\n\nX = np.array([[0,0], [0,1], [1,0], [1,1]])   # ALL 4 inputs at once (4x2)\nW1 = np.random.randn(2, 4)                    # layer 1: 2 inputs -> 4 hidden\nb1 = np.zeros(4)\n\nhidden = 1 / (1 + np.exp(-(X @ W1 + b1)))     # 4 examples forward, one line\nprint(hidden.shape)                           # (4, 4)' },
        { t: 'p', html: '<code>@</code> is matrix multiplication. Backprop vectorizes just as cleanly — the gradients become matrix expressions too. Below is the XOR network again, numpy-style: same math as the JavaScript version, but written the way every framework and every ML paper writes it. This code shape — <code>forward, loss, backward, update</code> — is EXACTLY what PyTorch automates in the next lesson.' },
        { t: 'warn', html: 'This lesson\'s editor needs internet the first time (numpy downloads into the browser Python). If it fails offline, read the code — the shapes in the comments tell the story — and run it when you\'re back online.' }
      ],
      tryIt: {
        mode: 'python',
        height: 320,
        code: 'import numpy as np\n\nnp.random.seed(42)\n\n# XOR with a vectorized 2 -> 4 -> 1 network\nX = np.array([[0,0], [0,1], [1,0], [1,1]], dtype=float)   # (4, 2)\ny = np.array([[0], [1], [1], [0]], dtype=float)           # (4, 1)\n\nW1 = np.random.randn(2, 4) * 0.5    # input -> hidden\nb1 = np.zeros((1, 4))\nW2 = np.random.randn(4, 1) * 0.5    # hidden -> output\nb2 = np.zeros((1, 1))\nlr = 1.0\n\nsigmoid = lambda z: 1 / (1 + np.exp(-z))\n\nfor epoch in range(1, 4001):\n    # ---- forward: all 4 examples at once ----\n    h = sigmoid(X @ W1 + b1)          # (4, 4)\n    out = sigmoid(h @ W2 + b2)        # (4, 1)\n    loss = np.mean((out - y) ** 2)\n\n    # ---- backward: gradients as matrices ----\n    d_out = (out - y) * out * (1 - out)        # (4, 1)\n    d_h = (d_out @ W2.T) * h * (1 - h)         # (4, 4)\n\n    # ---- update ----\n    W2 -= lr * (h.T @ d_out) / len(X)\n    b2 -= lr * d_out.mean(axis=0, keepdims=True)\n    W1 -= lr * (X.T @ d_h) / len(X)\n    b1 -= lr * d_h.mean(axis=0, keepdims=True)\n\n    if epoch % 1000 == 0:\n        print(f"epoch {epoch}: loss = {loss:.5f}")\n\nprint("\\nPredictions:")\nfor inp, pred in zip(X, out):\n    print(f"  {inp} -> {pred[0]:.3f}")\n\n# Try: shrink the hidden layer to 2 neurons. Grow it to 16.\n# How do speed and final loss change?',
        expected: 'epoch 1000: loss = 0.06...\nepoch 2000: loss = 0.01...\nepoch 3000: loss = 0.00...\nepoch 4000: loss = 0.00...\n\nPredictions:\n  [0. 0.] -> ~0.03\n  [0. 1.] -> ~0.96\n  [1. 0.] -> ~0.96\n  [1. 1.] -> ~0.04'
      },
      quiz: [
        { q: 'Why vectorize with matrices instead of looping neurons?', options: ['It looks smarter', 'Optimized matrix math is enormously faster and matches how GPUs work', 'Loops are forbidden in Python', 'It uses less memory only'], a: 1, why: 'numpy (and GPUs) chew through matrix multiplications thousands of times faster than Python loops.' },
        { q: 'In numpy, <code>X @ W</code> is…', options: ['Element-wise multiply', 'Matrix multiplication', 'A decorator', 'String formatting'], a: 1, why: '@ is the matrix-multiply operator — the single most important operation in deep learning.' },
        { q: 'If X is (4,2) and W1 is (2,4), then <code>X @ W1</code> has shape…', options: ['(2, 2)', '(4, 4)', '(2, 4)', '(8,)'], a: 1, why: '(4,2)·(2,4) → (4,4): 4 examples, each now represented by 4 hidden values. Shape-tracking is THE debugging skill in ML.' }
      ],
      challenge: {
        text: 'Change the task: make the network learn AND and OR <i>simultaneously</i> — two output neurons. y becomes shape (4,2), W2 becomes (4,2). Everything else is identical. (This is how real nets predict many things at once.)',
        hints: ['<code>y = np.array([[0,0],[0,1],[0,1],[1,1]], dtype=float)</code> — column 0 is AND, column 1 is OR.', 'Only shapes change: W2 = randn(4, 2), b2 = zeros((1, 2)).'],
        solution: { lang: 'python', code: 'y = np.array([[0,0], [0,1], [0,1], [1,1]], dtype=float)  # AND, OR\nW2 = np.random.randn(4, 2) * 0.5\nb2 = np.zeros((1, 2))\n# ...training loop unchanged. Predictions now print two numbers:\n# [1. 1.] -> [~0.97, ~0.98]   (AND=1, OR=1). One net, two skills.' }
      }
    },

    {
      id: 'ai-7', title: 'The neural net zoo: CNNs, RNNs & transformers', level: 2, minutes: 16,
      blocks: [
        { t: 'p', html: 'Every famous AI is the same ingredients you\'ve built — weights, layers, gradient descent, backprop — arranged in <b>architectures</b> shaped to their data. The field tour:' },
        { t: 'h3', text: 'CNNs — Convolutional Neural Networks (images)' },
        { t: 'p', html: 'Instead of connecting every pixel to every neuron (a million-pixel image would need billions of weights), a CNN slides small <b>filters</b> — say 3×3 grids of weights — across the image. Each filter learns to detect one local pattern (an edge, a corner, a texture) <i>wherever it appears</i>. Stack layers: edges → shapes → objects. CNNs run photo tagging, medical imaging, self-driving vision.' },
        { t: 'h3', text: 'RNNs — Recurrent Neural Networks (sequences)' },
        { t: 'p', html: 'For data that comes in order — text, audio, sensor streams — an RNN reads one step at a time while carrying a <b>memory</b> (hidden state) of what came before. Each step: combine the new input with the memory, update the memory, maybe emit an output. Improved variants (LSTM, GRU) fixed early RNNs\' forgetfulness and ran speech recognition and translation for a decade.' },
        { t: 'h3', text: 'Transformers (modern language AI — and increasingly everything)' },
        { t: 'p', html: 'The 2017 "Attention Is All You Need" paper replaced step-by-step reading with <b>attention</b>: every word looks at every other word simultaneously and learns which ones matter to it ("it" attends to the noun it refers to). This parallelism made truly enormous training possible. GPT, Claude, Gemini — transformers, trained on oceans of text to predict the next token, at a scale where startling abilities emerge.' },
        { t: 'h3', text: 'And the rest of the zoo' },
        { t: 'ul', items: [
          '<b>GANs</b> — two nets duel: a forger generates images, a detective calls fakes; both improve until the fakes are photorealistic.',
          '<b>Diffusion models</b> — learn to remove noise from images, then "denoise" pure static into brand-new images. (Modern AI art.)',
          '<b>Reinforcement learning</b> — nets that learn actions from rewards: game AIs, robotics, and the technique that helps align chatbots.'
        ] },
        { t: 'p', html: 'The try-it demonstrates the <i>idea</i> of a CNN filter — sliding a tiny weight grid over an "image" to detect a pattern — in plain Python you can read line by line.' }
      ],
      tryIt: {
        mode: 'python',
        code: '# The core CNN idea: slide a small filter over an image, in plain Python\n\nimage = [\n    [0, 0, 0, 0, 0, 0],\n    [0, 1, 1, 1, 1, 0],\n    [0, 1, 0, 0, 1, 0],\n    [0, 1, 0, 0, 1, 0],\n    [0, 1, 1, 1, 1, 0],\n    [0, 0, 0, 0, 0, 0],\n]   # a hollow square "drawing"\n\n# A 3x3 filter that lights up on VERTICAL EDGES (left bright, right dark)\nfilt = [\n    [1, 0, -1],\n    [1, 0, -1],\n    [1, 0, -1],\n]\n\nprint("Vertical-edge detection map:")\nfor row in range(4):            # slide the window over every position\n    line = ""\n    for col in range(4):\n        total = 0\n        for i in range(3):\n            for j in range(3):\n                total += image[row + i][col + j] * filt[i][j]\n        line += " █ " if abs(total) >= 2 else " · "\n    print(line)\n\nprint("\\nThe filter fired exactly on the square\'s vertical sides!")\nprint("A real CNN LEARNS its filter values by backprop - same learning")\nprint("rule you used on XOR, just applied to sliding windows.")',
        expected: 'Vertical-edge detection map:\n ·  █  ·  █ (pattern marking the left and right edges)\n...'
      },
      quiz: [
        { q: 'Why do CNNs use small sliding filters instead of full connections?', options: ['Images are small', 'A pattern detector can be reused at every position — vastly fewer weights, position-independent detection', 'Filters are prettier', 'To avoid backprop'], a: 1, why: 'An edge is an edge wherever it appears. Weight-sharing is the insight that made computer vision work.' },
        { q: 'What does an RNN carry between steps of a sequence?', options: ['The full dataset', 'A hidden state — its memory of what it has seen', 'Extra layers', 'The learning rate'], a: 1, why: 'That evolving memory is how order and context influence each step\'s output.' },
        { q: 'The transformer\'s key mechanism is…', options: ['Bigger filters', 'Attention — every position learns which other positions matter to it', 'Slower reading', 'More biases'], a: 1, why: 'Attention captures long-range relationships and parallelizes beautifully — enabling massive scale.' }
      ],
      challenge: {
        text: 'Design a 3×3 filter that detects HORIZONTAL edges instead, run it on the square, and check it fires on the top and bottom sides. (Hint: what does transposing the vertical filter mean?)',
        hints: ['Rows of 1s, 0s, -1s instead of columns.'],
        solution: { lang: 'python', code: 'filt = [\n    [ 1,  1,  1],\n    [ 0,  0,  0],\n    [-1, -1, -1],\n]\n# Fires along the TOP and BOTTOM of the square -\n# the same detector idea, rotated 90 degrees.' }
      }
    },

    {
      id: 'ai-8', title: 'Real frameworks: PyTorch, TensorFlow & beyond', level: 2, minutes: 16,
      blocks: [
        { t: 'p', html: 'You\'ve built nets by hand — which means framework code will now read as <i>shorthand for things you understand</i>, not incantations. The two giants:' },
        { t: 'h3', text: 'PyTorch (Python) — research favorite, friendliest to learn' },
        { t: 'code', lang: 'python', code: 'import torch\nimport torch.nn as nn\n\nmodel = nn.Sequential(          # your XOR net, framework-style:\n    nn.Linear(2, 4),            # W1, b1 - exactly your matrices\n    nn.Sigmoid(),\n    nn.Linear(4, 1),            # W2, b2\n    nn.Sigmoid(),\n)\n\nloss_fn = nn.MSELoss()                                 # your (out - y)**2\noptimizer = torch.optim.SGD(model.parameters(), lr=1)  # your gradient descent\n\nfor epoch in range(4000):\n    out = model(X)              # forward pass\n    loss = loss_fn(out, y)\n    optimizer.zero_grad()\n    loss.backward()             # backprop - AUTOMATIC. No hand-derived gradients!\n    optimizer.step()            # the downhill step' },
        { t: 'p', html: '<code>loss.backward()</code> is the headline: <b>autograd</b> computes every gradient automatically, for any architecture you compose. That, plus free GPU acceleration, is what frameworks buy you.' },
        { t: 'h3', text: 'TensorFlow/Keras (Python) — production workhorse' },
        { t: 'code', lang: 'python', code: 'from tensorflow import keras\n\nmodel = keras.Sequential([\n    keras.layers.Dense(4, activation="sigmoid", input_shape=(2,)),\n    keras.layers.Dense(1, activation="sigmoid"),\n])\nmodel.compile(optimizer="sgd", loss="mse")\nmodel.fit(X, y, epochs=4000, verbose=0)      # the whole training loop, one line' },
        { t: 'h3', text: 'TensorFlow.js — neural nets in the browser, in JavaScript' },
        { t: 'code', lang: 'js', code: 'const model = tf.sequential({\n  layers: [\n    tf.layers.dense({ units: 4, activation: "sigmoid", inputShape: [2] }),\n    tf.layers.dense({ units: 1, activation: "sigmoid" }),\n  ],\n});\nmodel.compile({ optimizer: tf.train.sgd(1), loss: "meanSquaredError" });\nawait model.fit(xs, ys, { epochs: 4000 });   // trains on the visitor\'s GPU via WebGL!' },
        { t: 'p', html: 'Your route onward, in order: (1) install PyTorch and re-build XOR — you\'ll recognize every line; (2) train on a real dataset like MNIST handwritten digits (the "hello world" of image AI — a CNN gets ~99%); (3) take a free course like fast.ai; (4) fine-tune a small pretrained model from Hugging Face. Each step reuses everything from this track.' },
        { t: 'tip', html: 'The try-it below is an honest capstone: your from-scratch skills applied to a classic real dataset pattern — classifying flowers with a softmax layer, in numpy. Frameworks make this shorter, not different.' }
      ],
      tryIt: {
        mode: 'python',
        height: 320,
        code: 'import numpy as np\n\nnp.random.seed(0)\n\n# Mini-Iris: classify flowers from [petal length, petal width]\n# Class 0 = small flower, 1 = medium, 2 = large (synthetic but realistic)\ncenters = [(1.5, 0.3), (4.2, 1.3), (5.8, 2.1)]\nX, y = [], []\nfor cls, (cx, cy) in enumerate(centers):\n    for _ in range(30):\n        X.append([cx + np.random.randn()*0.4, cy + np.random.randn()*0.2])\n        y.append(cls)\nX = np.array(X)\nY = np.eye(3)[y]          # one-hot labels: class 1 -> [0,1,0]\n\n# 2 -> 8 -> 3 network with softmax output (multi-class standard)\nW1 = np.random.randn(2, 8) * 0.5; b1 = np.zeros((1, 8))\nW2 = np.random.randn(8, 3) * 0.5; b2 = np.zeros((1, 3))\nlr = 0.1\n\nfor epoch in range(1, 501):\n    h = np.maximum(0, X @ W1 + b1)                 # ReLU hidden layer\n    scores = h @ W2 + b2\n    e = np.exp(scores - scores.max(axis=1, keepdims=True))\n    probs = e / e.sum(axis=1, keepdims=True)       # softmax: probabilities\n\n    d_scores = (probs - Y) / len(X)                # cross-entropy gradient\n    d_h = (d_scores @ W2.T) * (h > 0)\n    W2 -= lr * h.T @ d_scores; b2 -= lr * d_scores.sum(axis=0, keepdims=True)\n    W1 -= lr * X.T @ d_h;      b1 -= lr * d_h.sum(axis=0, keepdims=True)\n\n    if epoch % 100 == 0:\n        acc = (probs.argmax(axis=1) == np.array(y)).mean()\n        print(f"epoch {epoch}: accuracy = {acc:.1%}")\n\nprint("\\nNew flowers:")\nfor petal in [[1.4, 0.2], [4.0, 1.2], [6.0, 2.2]]:\n    h = np.maximum(0, np.array([petal]) @ W1 + b1)\n    s = h @ W2 + b2\n    p = np.exp(s - s.max()); p = p / p.sum()\n    print(f"  petals {petal} -> class {p.argmax()} ({p.max():.0%} sure)")',
        expected: 'epoch 100: accuracy = ~98%\n...\nNew flowers:\n  petals [1.4, 0.2] -> class 0 (~100% sure)\n  petals [4.0, 1.2] -> class 1 (~99% sure)\n  petals [6.0, 2.2] -> class 2 (~99% sure)'
      },
      quiz: [
        { q: 'What does PyTorch\'s <code>loss.backward()</code> replace from your hand-built nets?', options: ['The forward pass', 'Deriving and coding every gradient formula yourself', 'The dataset', 'The learning rate'], a: 1, why: 'Autograd tracks every operation and derives all gradients automatically — backprop for free, for any architecture.' },
        { q: 'Softmax turns a layer\'s raw scores into…', options: ['Binary yes/no', 'Probabilities across classes that sum to 1', 'Images', 'Gradients'], a: 1, why: 'Multi-class standard: the biggest score becomes the highest probability, and confidence is readable.' },
        { q: 'The traditional first real dataset for image AI is…', options: ['ImageNet', 'MNIST handwritten digits', 'Wikipedia', 'YouTube'], a: 1, why: '60,000 small digit images — big enough to be real, small enough to train anywhere. Every ML learner meets it.' }
      ],
      challenge: {
        text: 'Stress-test your classifier: move the class centers closer together (e.g. (2.0, 0.5), (3.0, 1.0), (4.0, 1.5)) and re-run. Watch accuracy drop, then compensate — more hidden neurons? more epochs? — and report (in a comment) what helped.',
        hints: ['Overlapping classes have irreducible confusion — 100% may be impossible, and that\'s an honest lesson too.'],
        solution: { lang: 'python', code: 'centers = [(2.0, 0.5), (3.0, 1.0), (4.0, 1.5)]\n# Accuracy falls to ~80-90%: the classes genuinely overlap now.\n# More epochs helps a little; more neurons barely at all -\n# when data overlaps, no architecture can un-overlap it.\n# (Real fix: better FEATURES, e.g. adding sepal measurements.)' }
      }
    }
  ]
};
