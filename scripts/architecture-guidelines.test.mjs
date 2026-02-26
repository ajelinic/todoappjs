import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const read = async (relativePath) => {
  return readFile(resolve(process.cwd(), relativePath), "utf8");
};

test("presentation bundles exclude glossary and include index/task", async () => {
  const config = await read("data/config/config_default.js");
  const presentationMatch = config.match(/PRESENTATION_BUNDLES:\s*\[([^\]]*)\]/);

  assert.ok(presentationMatch);
  assert.match(config, /PRESENTATION_BUNDLES:\s*\["Index",\s*"Task"\]/);
  assert.doesNotMatch(presentationMatch[1], /"Glossary"/);
});

test("index controller remains orchestration-only", async () => {
  const indexController = await read(
    "src/App/Presentation/Index/Controller/IndexController.js"
  );

  assert.match(indexController, /renderFeatureSlots/);
  assert.match(indexController, /id="task-feature"/);
  assert.doesNotMatch(indexController, /Client\/Task\/TaskClient/);
  assert.doesNotMatch(indexController, /Client\/Glossary\/GlossaryClient/);
});

test("task controller owns task page rendering and feature clients", async () => {
  const taskController = await read(
    "src/App/Presentation/Task/Controller/TaskController.js"
  );

  assert.match(taskController, /Client\/Task\/TaskClient/);
  assert.match(taskController, /Client\/Glossary\/GlossaryClient/);
  assert.match(taskController, /createView\("mock-page"/);
  assert.match(taskController, /getMountSelector\(\)\s*{\s*return "#task-feature";/);
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
