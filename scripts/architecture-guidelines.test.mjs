import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const read = async (relativePath) => {
  return readFile(resolve(process.cwd(), relativePath), "utf8");
};

test(
  "presentation bundles exclude glossary and include index/languageSwitcher/task",
  async () => {
  const config = await read("data/config/config_default.js");
  const presentationMatch = config.match(/PRESENTATION_BUNDLES:\s*\[([^\]]*)\]/);

  assert.ok(presentationMatch);
  assert.match(
    config,
    /PRESENTATION_BUNDLES:\s*\["Index",\s*"LanguageSwitcher",\s*"Task"\]/
  );
  assert.doesNotMatch(presentationMatch[1], /"Glossary"/);
  }
);

test("index controller remains orchestration-only", async () => {
  const indexController = await read(
    "src/App/Presentation/Index/Controller/IndexController.js"
  );

  assert.match(indexController, /renderFeatureSlots/);
  assert.match(indexController, /id="language-switcher-feature"/);
  assert.match(indexController, /id="task-feature"/);
  assert.doesNotMatch(indexController, /Client\/Task\/TaskClient/);
  assert.doesNotMatch(indexController, /Client\/Glossary\/GlossaryClient/);
});

test("task controller owns task page rendering and feature clients", async () => {
  const taskController = await read(
    "src/App/Presentation/Task/Controller/TaskController.js"
  );

  assert.match(taskController, /Client\/Task\/TaskClient/);
  assert.match(taskController, /Client\/LanguageSwitcher\/LanguageSwitcherClient/);
  assert.match(taskController, /Utils\/Translation\/TranslationService/);
  assert.match(taskController, /createView\("task-page"/);
  assert.match(taskController, /getMountSelector\(\)\s*{\s*return "#task-feature";/);
});

test("language switcher controller owns switcher rendering and locale events", async () => {
  const languageSwitcherController = await read(
    "src/App/Presentation/LanguageSwitcher/Controller/LanguageSwitcherController.js"
  );

  assert.match(
    languageSwitcherController,
    /Client\/LanguageSwitcher\/LanguageSwitcherClient/
  );
  assert.match(
    languageSwitcherController,
    /Utils\/Translation\/TranslationService/
  );
  assert.match(languageSwitcherController, /createView\("language-switcher-molecule"/);
  assert.match(
    languageSwitcherController,
    /getMountSelector\(\)\s*{\s*return "#language-switcher-feature";/
  );
  assert.match(languageSwitcherController, /app:locale-changed/);
});

test("task notifications are glossary-key based (no hardcoded user-facing english)", async () => {
  const todoMessageService = await read(
    "src/App/Utils/Task/TodoMessageService.js"
  );

  assert.match(todoMessageService, /task\.notification\./);
  assert.doesNotMatch(todoMessageService, /Can'?t add empty task/i);
  assert.doesNotMatch(todoMessageService, /Task successfully added/i);
  assert.doesNotMatch(todoMessageService, /No tasks to clear/i);
});

test("task controller avoids english fallback strings for glossary-backed labels", async () => {
  const taskController = await read(
    "src/App/Presentation/Task/Controller/TaskController.js"
  );

  assert.doesNotMatch(taskController, /\?\?\s*"To-Do App"/);
  assert.doesNotMatch(taskController, /\?\?\s*"Add to list"/);
  assert.doesNotMatch(taskController, /\?\?\s*"Clear list"/);
  assert.doesNotMatch(taskController, /\?\?\s*"No due time"/);
  assert.doesNotMatch(taskController, /\?\?\s*"Delete"/);
});

test("datetime service lives in base and task factory uses base service", async () => {
  const taskBusinessFactory = await read(
    "src/App/Business/Task/TaskBusinessFactory.js"
  );
  const dateTimeService = await read("src/base/ServiceUtils/DateTimeService.js");

  assert.match(
    taskBusinessFactory,
    /base\/ServiceUtils\/DateTimeService\.js/
  );
  assert.doesNotMatch(
    taskBusinessFactory,
    /Business\/Task\/Service\/DateTimeService\.js/
  );
  assert.match(dateTimeService, /class DateTimeService/);
});

test("auto-start is explicit and gated in loader", async () => {
  const abstractController = await read(
    "src/base/Abstracts/AbstractController.js"
  );
  const bundleLoader = await read("src/base/Loader/Bundle/BundleLoader.js");

  assert.match(abstractController, /static AUTO_EXECUTE = false/);
  assert.match(abstractController, /static shouldAutoExecute\(\)/);
  assert.match(bundleLoader, /shouldAutoExecuteController/);
  assert.match(bundleLoader, /if \(!this\.shouldAutoExecuteController\(controllerClass\)\)/);
});
