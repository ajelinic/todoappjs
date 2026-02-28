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

test("shared bundles include task/language switcher and core registers shared resolver", async () => {
  const config = await read("data/config/config_default.js");
  const appCoreDependencyProvider = await read("src/base/AppCoreDependencyProvider.js");
  const sharedTaskConstants = await read(
    "src/App/Shared/Task/TaskGlossaryKeyConstants.js"
  );
  const sharedLanguageSwitcherConstants = await read(
    "src/App/Shared/LanguageSwitcher/LanguageSwitcherGlossaryKeyConstants.js"
  );
  const sharedEntryResolver = await read(
    "src/base/Bundles/Shared/Resolvers/ClassResolvers/SharedEntryResolver.js"
  );

  assert.match(
    config,
    /SHARED_BUNDLES:\s*\["Task",\s*"LanguageSwitcher"\]/
  );
  assert.match(appCoreDependencyProvider, /SharedEntryResolverPlugin/);
  assert.match(sharedTaskConstants, /TaskGlossaryKeyConstants/);
  assert.match(
    sharedLanguageSwitcherConstants,
    /LanguageSwitcherGlossaryKeyConstants/
  );
  assert.match(sharedEntryResolver, /Shared\/\$\{layerBundle\}\/\$\{layerBundle\}GlossaryKeyConstants\.js/);
});

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
  const taskPresentationFactory = await read(
    "src/App/Presentation/Task/TaskPresentationFactory.js"
  );
  const taskPresentationDependencyProvider = await read(
    "src/App/Presentation/Task/TaskPresentationDependencyProvider.js"
  );
  const taskPresentationConfig = await read(
    "src/App/Presentation/Task/TaskPresentationConfig.js"
  );

  assert.match(taskController, /AbstractPresentationController/);
  assert.match(taskController, /TaskPresentationFactory/);
  assert.match(taskController, /static FACTORY_CLASS = TaskPresentationFactory/);
  assert.doesNotMatch(taskController, /constructor\(/);
  assert.match(taskController, /renderViewAtMount\("task-page"/);
  assert.match(taskController, /getMountSelector\(\)\s*{\s*return this\.getConfig\(\)/);
  assert.match(taskController, /createTaskClient\(\)/);
  assert.match(taskController, /createLanguageSwitcherClient\(\)/);
  assert.match(taskController, /createGlossaryClient\(\)/);
  assert.match(taskPresentationFactory, /AbstractPresentationFactory/);
  assert.match(taskPresentationFactory, /TaskPresentationDependencyProvider/);
  assert.match(taskPresentationFactory, /createTaskPageViewDataResolver/);
  assert.match(taskPresentationDependencyProvider, /AbstractDependencyProvider/);
  assert.match(taskPresentationDependencyProvider, /TASK_CLIENT/);
  assert.match(taskPresentationDependencyProvider, /LANGUAGE_SWITCHER_CLIENT/);
  assert.match(taskPresentationDependencyProvider, /GLOSSARY_CLIENT/);
  assert.match(taskPresentationConfig, /class TaskPresentationConfig/);
  assert.match(taskPresentationConfig, /#task-feature/);
});

test(
  "task controller delegates form/action/view-data responsibilities to dedicated classes",
  async () => {
  const taskController = await read(
    "src/App/Presentation/Task/Controller/TaskController.js"
  );
  const taskPageForm = await read("src/App/Presentation/Task/Form/TaskPageForm.js");
  const taskPageActionHandler = await read(
    "src/App/Presentation/Task/Handler/TaskPageActionHandler.js"
  );
  const taskViewDataResolver = await read(
    "src/App/Presentation/Task/Resolver/TaskPageViewDataResolver.js"
  );
  const taskViewDataBuilder = await read(
    "src/App/Presentation/Task/Builder/TaskPageViewDataBuilder.js"
  );
  const abstractForm = await read("src/base/Abstracts/AbstractForm.js");
  const taskGlossaryKeys = await read(
    "src/App/Shared/Task/TaskGlossaryKeyConstants.js"
  );

  assert.match(taskController, /createTaskPageForm\(\)/);
  assert.match(taskController, /createTaskPageActionHandler\(\)/);
  assert.match(taskController, /createTaskPageViewDataResolver\(\)/);
  assert.doesNotMatch(taskController, /taskClient\.addTask/);
  assert.doesNotMatch(taskController, /taskClient\.toggleTask/);
  assert.doesNotMatch(taskController, /taskClient\.deleteTask/);
  assert.doesNotMatch(taskController, /taskClient\.clearCompletedTasks/);
  assert.match(abstractForm, /class AbstractForm/);
  assert.match(abstractForm, /submit\(rawData = \{\}\)/);
  assert.match(taskPageForm, /class TaskPageForm extends AbstractForm/);
  assert.match(taskPageForm, /createDefaultState/);
  assert.match(taskPageForm, /resolveState/);
  assert.match(taskPageForm, /this\.submit\(/);
  assert.match(taskPageActionHandler, /class TaskPageActionHandler/);
  assert.match(taskPageActionHandler, /addTask/);
  assert.match(taskPageActionHandler, /toggleTask/);
  assert.match(taskPageActionHandler, /deleteTask/);
  assert.match(taskPageActionHandler, /clearCompleted/);
  assert.match(taskViewDataResolver, /class TaskPageViewDataResolver/);
  assert.match(taskViewDataResolver, /taskPageViewDataBuilder/);
  assert.match(taskViewDataResolver, /taskPageForm/);
  assert.match(taskViewDataResolver, /resolve\(\{/);
  assert.match(taskViewDataBuilder, /class TaskPageViewDataBuilder/);
  assert.match(taskViewDataBuilder, /getPageData/);
  assert.match(taskViewDataBuilder, /localizeActionResult/);
  assert.doesNotMatch(taskViewDataBuilder, /createDefaultFormState/);
  assert.doesNotMatch(taskViewDataBuilder, /getTranslationKeys/);
  assert.match(taskGlossaryKeys, /class TaskGlossaryKeyConstants/);
  assert.match(taskViewDataBuilder, /TaskGlossaryKeyConstants\.INFO_TEMPLATE/);
  assert.match(taskViewDataBuilder, /task_id/);
  assert.match(taskViewDataBuilder, /task_value/);
  }
);

test(
  "task flow uses transfer contracts across presentation, client, and business layers",
  async () => {
    const taskPageActionHandler = await read(
      "src/App/Presentation/Task/Handler/TaskPageActionHandler.js"
    );
    const taskViewDataResolver = await read(
      "src/App/Presentation/Task/Resolver/TaskPageViewDataResolver.js"
    );
    const taskClient = await read("src/App/Client/Task/TaskClient.js");
    const taskFacade = await read("src/App/Business/Task/TaskFacade.js");
    const taskCollectionTransfer = await read(
      "src/App/Shared/Task/Transfer/TaskCollectionTransfer.js"
    );
    const taskActionResultTransfer = await read(
      "src/App/Shared/Task/Transfer/TaskActionResultTransfer.js"
    );
    const addTaskRequestTransfer = await read(
      "src/App/Shared/Task/Transfer/AddTaskRequestTransfer.js"
    );
    const toggleTaskRequestTransfer = await read(
      "src/App/Shared/Task/Transfer/ToggleTaskRequestTransfer.js"
    );
    const deleteTaskRequestTransfer = await read(
      "src/App/Shared/Task/Transfer/DeleteTaskRequestTransfer.js"
    );

    assert.match(taskPageActionHandler, /AddTaskRequestTransfer/);
    assert.match(taskPageActionHandler, /ToggleTaskRequestTransfer/);
    assert.match(taskPageActionHandler, /DeleteTaskRequestTransfer/);
    assert.match(taskPageActionHandler, /TaskActionResultTransfer/);
    assert.match(taskViewDataResolver, /TaskCollectionTransfer/);
    assert.match(taskViewDataResolver, /TaskActionResultTransfer/);
    assert.match(taskClient, /TaskCollectionTransfer/);
    assert.match(taskClient, /TaskActionResultTransfer/);
    assert.match(taskFacade, /TaskCollectionTransfer/);
    assert.match(taskFacade, /TaskActionResultTransfer/);
    assert.match(taskFacade, /AddTaskRequestTransfer/);
    assert.match(taskFacade, /ToggleTaskRequestTransfer/);
    assert.match(taskFacade, /DeleteTaskRequestTransfer/);
    assert.match(taskCollectionTransfer, /class TaskCollectionTransfer/);
    assert.match(taskActionResultTransfer, /class TaskActionResultTransfer/);
    assert.match(addTaskRequestTransfer, /class AddTaskRequestTransfer/);
    assert.match(toggleTaskRequestTransfer, /class ToggleTaskRequestTransfer/);
    assert.match(deleteTaskRequestTransfer, /class DeleteTaskRequestTransfer/);
  }
);

test("language switcher controller owns switcher rendering and locale events", async () => {
  const languageSwitcherController = await read(
    "src/App/Presentation/LanguageSwitcher/Controller/LanguageSwitcherController.js"
  );
  const languageSwitcherPresentationFactory = await read(
    "src/App/Presentation/LanguageSwitcher/LanguageSwitcherPresentationFactory.js"
  );
  const languageSwitcherPresentationDependencyProvider = await read(
    "src/App/Presentation/LanguageSwitcher/LanguageSwitcherPresentationDependencyProvider.js"
  );
  const languageSwitcherPresentationConfig = await read(
    "src/App/Presentation/LanguageSwitcher/LanguageSwitcherPresentationConfig.js"
  );

  assert.match(languageSwitcherController, /AbstractPresentationController/);
  assert.match(languageSwitcherController, /LanguageSwitcherPresentationFactory/);
  assert.match(
    languageSwitcherController,
    /static FACTORY_CLASS = LanguageSwitcherPresentationFactory/
  );
  assert.doesNotMatch(languageSwitcherController, /constructor\(/);
  assert.match(languageSwitcherController, /renderViewAtMount\(/);
  assert.match(
    languageSwitcherController,
    /getMountSelector\(\)\s*{\s*return this\.getConfig\(\)/
  );
  assert.match(languageSwitcherController, /createLanguageSwitcherClient\(\)/);
  assert.match(languageSwitcherController, /createGlossaryClient\(\)/);
  assert.match(languageSwitcherController, /getLocaleChangedEventName/);
  assert.match(languageSwitcherPresentationFactory, /AbstractPresentationFactory/);
  assert.match(
    languageSwitcherPresentationFactory,
    /LanguageSwitcherPresentationDependencyProvider/
  );
  assert.match(
    languageSwitcherPresentationDependencyProvider,
    /AbstractDependencyProvider/
  );
  assert.match(
    languageSwitcherPresentationDependencyProvider,
    /LANGUAGE_SWITCHER_CLIENT/
  );
  assert.match(languageSwitcherPresentationDependencyProvider, /GLOSSARY_CLIENT/);
  assert.match(
    languageSwitcherPresentationConfig,
    /class LanguageSwitcherPresentationConfig/
  );
  assert.match(languageSwitcherPresentationConfig, /#language-switcher-feature/);
});

test(
  "language switcher controller delegates event/view-data responsibilities to dedicated classes",
  async () => {
  const languageSwitcherController = await read(
    "src/App/Presentation/LanguageSwitcher/Controller/LanguageSwitcherController.js"
  );
  const languageSwitcherEventHandler = await read(
    "src/App/Presentation/LanguageSwitcher/Handler/LanguageSwitcherEventHandler.js"
  );
  const languageSwitcherViewDataResolver = await read(
    "src/App/Presentation/LanguageSwitcher/Resolver/LanguageSwitcherViewDataResolver.js"
  );
  const languageSwitcherViewDataBuilder = await read(
    "src/App/Presentation/LanguageSwitcher/Builder/LanguageSwitcherViewDataBuilder.js"
  );
  const languageSwitcherGlossaryKeys = await read(
    "src/App/Shared/LanguageSwitcher/LanguageSwitcherGlossaryKeyConstants.js"
  );

  assert.match(languageSwitcherController, /createLanguageSwitcherEventHandler\(\)/);
  assert.match(languageSwitcherController, /createLanguageSwitcherViewDataResolver\(\)/);
  assert.doesNotMatch(languageSwitcherController, /setCurrentLocale\(/);
  assert.match(languageSwitcherEventHandler, /class LanguageSwitcherEventHandler/);
  assert.match(languageSwitcherEventHandler, /changeLocale/);
  assert.match(
    languageSwitcherViewDataResolver,
    /class LanguageSwitcherViewDataResolver/
  );
  assert.match(languageSwitcherViewDataResolver, /languageSwitcherViewDataBuilder/);
  assert.match(languageSwitcherViewDataResolver, /resolve\(/);
  assert.match(languageSwitcherViewDataBuilder, /class LanguageSwitcherViewDataBuilder/);
  assert.match(languageSwitcherViewDataBuilder, /getViewData/);
  assert.doesNotMatch(languageSwitcherViewDataBuilder, /getTranslationKeys/);
  assert.match(
    languageSwitcherGlossaryKeys,
    /getLanguageSwitcherKeys/
  );
  }
);

test("task notifications are glossary-key based (no hardcoded user-facing english)", async () => {
  const todoMessageService = await read(
    "src/App/Utils/Task/TodoMessageService.js"
  );

  assert.match(todoMessageService, /task\.notification\./);
  assert.doesNotMatch(todoMessageService, /Can'?t add empty task/i);
  assert.doesNotMatch(todoMessageService, /Task successfully added/i);
  assert.doesNotMatch(todoMessageService, /No tasks to clear/i);
});

test("glossary facade supports placeholder interpolation with parameters", async () => {
  const glossaryFacade = await read("src/App/Business/Glossary/GlossaryFacade.js");

  assert.match(glossaryFacade, /resolveParameters/);
  assert.match(glossaryFacade, /resolveEntryParameters/);
  assert.match(glossaryFacade, /interpolateText/);
  assert.match(glossaryFacade, /replace\(\/%\(\[\^%\]\+\)%\/g/);
  assert.match(glossaryFacade, /options\.parameters/);
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
  const taskBusinessDependencyProvider = await read(
    "src/App/Business/Task/TaskBusinessDependencyProvider.js"
  );
  const dateTimeService = await read("src/base/ServiceUtils/DateTimeService.js");

  assert.match(
    taskBusinessDependencyProvider,
    /base\/ServiceUtils\/DateTimeService\.js/
  );
  assert.doesNotMatch(
    taskBusinessFactory,
    /Business\/Task\/Service\/DateTimeService\.js/
  );
  assert.match(taskBusinessFactory, /createDateTimeService/);
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

test("abstract controller provides shared mount rendering helper", async () => {
  const abstractController = await read(
    "src/base/Abstracts/AbstractController.js"
  );

  assert.match(abstractController, /renderViewAtMount/);
  assert.match(abstractController, /mountPoint\.innerHTML = ""/);
  assert.match(abstractController, /mountPoint\.appendChild\(view\)/);
});

test("client factories use config and dependency-provider classes", async () => {
  const taskClientFactory = await read("src/App/Client/Task/TaskClientFactory.js");
  const languageSwitcherClientFactory = await read(
    "src/App/Client/LanguageSwitcher/LanguageSwitcherClientFactory.js"
  );
  const glossaryClientFactory = await read(
    "src/App/Client/Glossary/GlossaryClientFactory.js"
  );
  const storageClientFactory = await read(
    "src/App/Client/Storage/StorageClientFactory.js"
  );

  assert.match(taskClientFactory, /TaskClientConfig/);
  assert.match(taskClientFactory, /TaskClientDependencyProvider/);
  assert.match(taskClientFactory, /getProvidedDependency/);
  assert.match(languageSwitcherClientFactory, /LanguageSwitcherClientConfig/);
  assert.match(languageSwitcherClientFactory, /LanguageSwitcherClientDependencyProvider/);
  assert.match(glossaryClientFactory, /GlossaryClientConfig/);
  assert.match(glossaryClientFactory, /GlossaryClientDependencyProvider/);
  assert.match(storageClientFactory, /StorageClientConfig/);
  assert.match(storageClientFactory, /StorageClientDependencyProvider/);
});

test("business factories use config and dependency-provider classes", async () => {
  const taskBusinessFactory = await read("src/App/Business/Task/TaskBusinessFactory.js");
  const languageSwitcherBusinessFactory = await read(
    "src/App/Business/LanguageSwitcher/LanguageSwitcherBusinessFactory.js"
  );
  const glossaryBusinessFactory = await read(
    "src/App/Business/Glossary/GlossaryBusinessFactory.js"
  );
  const storageBusinessFactory = await read(
    "src/App/Business/Storage/StorageBusinessFactory.js"
  );

  assert.match(taskBusinessFactory, /TaskBusinessConfig/);
  assert.match(taskBusinessFactory, /TaskBusinessDependencyProvider/);
  assert.match(taskBusinessFactory, /getProvidedDependency/);
  assert.match(languageSwitcherBusinessFactory, /LanguageSwitcherBusinessConfig/);
  assert.match(
    languageSwitcherBusinessFactory,
    /LanguageSwitcherBusinessDependencyProvider/
  );
  assert.match(glossaryBusinessFactory, /GlossaryBusinessConfig/);
  assert.match(glossaryBusinessFactory, /GlossaryBusinessDependencyProvider/);
  assert.match(storageBusinessFactory, /StorageBusinessConfig/);
  assert.match(storageBusinessFactory, /StorageBusinessDependencyProvider/);
});
