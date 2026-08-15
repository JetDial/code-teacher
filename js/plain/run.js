/* ============================================================
   Plain, running inside Code Teacher.

   Plain is dependency-free ES modules, so the whole language runs in the
   page with nothing to fetch - no Pyodide, no wasm, no network. This file
   is the one bridge: it loads the language once, then answers run requests
   from the ordinary (non-module) app script.
   ============================================================ */

let ready = null;

async function load() {
  if (ready) return ready;

  ready = (async () => {
    const [{ createRuntime }, { installGame }, { installStore }, { installData }] =
      await Promise.all([
        import('./src/runtime.js'),
        import('./engines/game/engine.js'),
        import('./engines/store/engine.js'),
        import('./engines/data/engine.js')
      ]);

    return { createRuntime, installGame, installStore, installData };
  })();

  return ready;
}

/**
 * Run a Plain program and hand back what it said.
 *
 * Errors come back as words rather than being thrown, because a learner
 * getting something wrong is the normal case here, not an exception.
 */
window.CT_PLAIN_RUN = async function (source) {
  try {
    const { createRuntime, installGame, installStore, installData } = await load();
    const said = [];
    const runtime = createRuntime({ onOutput: (line) => said.push(String(line)) });

    installGame(runtime, {});
    installStore(runtime, {});
    installData(runtime, {});

    const verdict = runtime.tryRun(source, 'lesson.plain');

    return {
      ok: verdict.ok,
      output: (verdict.output || said).join('\n'),
      problem: verdict.ok ? null : verdict.message
    };
  } catch (error) {
    return { ok: false, output: '', problem: String((error && error.message) || error) };
  }
};

/**
 * Check a program without running it, and say which of its names are
 * already words in Plain - the mistake that costs beginners the most time.
 */
window.CT_PLAIN_CHECK = async function (source) {
  try {
    const { createRuntime, installGame } = await load();
    const runtime = createRuntime({ onOutput: () => {} });

    installGame(runtime, {});
    runtime.parse(source, 'lesson.plain');

    return { ok: true, problem: null };
  } catch (error) {
    return { ok: false, problem: String((error && (error.plainMessage || error.message)) || error) };
  }
};

/** Say the same program in one of the six languages Plain reads. */
window.CT_PLAIN_SAY = async function (source, language) {
  try {
    const { PACKS, intoLanguage } = await import('./src/languages.js');
    const pack = PACKS[language];

    if (!pack) return source;

    const marker = {
      spanish: 'en español', french: 'en français', german: 'auf deutsch',
      portuguese: 'em português', italian: 'in italiano', dutch: 'in het nederlands'
    }[language];

    return marker + '\n' + intoLanguage(source, pack);
  } catch (error) {
    return source;
  }
};

window.CT_PLAIN_READY = true;
