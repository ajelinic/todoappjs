import { AbstractDependencyProvider } from "../../../base/Abstracts/AbstractDependencyProvider.js";
import { GlossaryClient } from "../../Client/Glossary/GlossaryClient.js";
import { LanguageSwitcherClient } from "../../Client/LanguageSwitcher/LanguageSwitcherClient.js";
import { TaskClient } from "../../Client/Task/TaskClient.js";

/**
 * @class TaskPresentationDependencyProvider
 * @description Provides Task presentation dependencies.
 */
export class TaskPresentationDependencyProvider extends AbstractDependencyProvider {
  static container = new Map();

  static TASK_CLIENT = "TASK_CLIENT";
  static LANGUAGE_SWITCHER_CLIENT = "LANGUAGE_SWITCHER_CLIENT";
  static GLOSSARY_CLIENT = "GLOSSARY_CLIENT";

  static provideDependencies(container) {
    container = this.provideTaskClient(container);
    container = this.provideLanguageSwitcherClient(container);
    container = this.provideGlossaryClient(container);

    return container;
  }

  static provideTaskClient(container) {
    container.set(this.TASK_CLIENT, () => new TaskClient());
    return container;
  }

  static provideLanguageSwitcherClient(container) {
    container.set(this.LANGUAGE_SWITCHER_CLIENT, () => new LanguageSwitcherClient());
    return container;
  }

  static provideGlossaryClient(container) {
    container.set(this.GLOSSARY_CLIENT, () => new GlossaryClient());
    return container;
  }
}

export default TaskPresentationDependencyProvider;
