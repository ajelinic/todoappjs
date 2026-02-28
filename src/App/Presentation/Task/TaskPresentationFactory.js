import { AbstractPresentationFactory } from "../../../base/Abstracts/AbstractPresentationFactory.js";
import { TaskPresentationConfig } from "./TaskPresentationConfig.js";
import { TaskPageForm } from "./Form/TaskPageForm.js";
import { TaskPageActionHandler } from "./Handler/TaskPageActionHandler.js";
import { TaskPageViewDataResolver } from "./Resolver/TaskPageViewDataResolver.js";
import { TaskPageViewDataBuilder } from "./Builder/TaskPageViewDataBuilder.js";
import { TaskPresentationDependencyProvider } from "./TaskPresentationDependencyProvider.js";

/**
 * @class TaskPresentationFactory
 * @description Factory for task presentation classes and dependencies.
 */
export class TaskPresentationFactory extends AbstractPresentationFactory {
  static CONFIG_CLASS = TaskPresentationConfig;
  static DEPENDENCY_PROVIDER_CLASS = TaskPresentationDependencyProvider;

  static createTaskClient() {
    return this.getProvidedDependency(TaskPresentationDependencyProvider.TASK_CLIENT);
  }

  static createLanguageSwitcherClient() {
    return this.getProvidedDependency(
      TaskPresentationDependencyProvider.LANGUAGE_SWITCHER_CLIENT
    );
  }

  static createGlossaryClient() {
    return this.getProvidedDependency(TaskPresentationDependencyProvider.GLOSSARY_CLIENT);
  }

  static createTaskPageForm() {
    if (!this.taskPageForm) {
      this.taskPageForm = new TaskPageForm();
    }

    return this.taskPageForm;
  }

  static createTaskPageActionHandler() {
    if (!this.taskPageActionHandler) {
      this.taskPageActionHandler = new TaskPageActionHandler(this.createTaskClient());
    }

    return this.taskPageActionHandler;
  }

  static createTaskPageViewDataBuilder() {
    if (!this.taskPageViewDataBuilder) {
      this.taskPageViewDataBuilder = new TaskPageViewDataBuilder(this.createGlossaryClient());
    }

    return this.taskPageViewDataBuilder;
  }

  static createTaskPageViewDataResolver() {
    if (!this.taskPageViewDataResolver) {
      this.taskPageViewDataResolver = new TaskPageViewDataResolver(
        this.createTaskClient(),
        this.createTaskPageViewDataBuilder(),
        this.createTaskPageForm()
      );
    }

    return this.taskPageViewDataResolver;
  }
}

export default TaskPresentationFactory;
