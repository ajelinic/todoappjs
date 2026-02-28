import { AbstractPresentationFactory } from "../../../base/Abstracts/AbstractPresentationFactory.js";
import { TaskInfoBoardPresentationConfig } from "./TaskInfoBoardPresentationConfig.js";
import { TaskInfoBoardPresentationDependencyProvider } from "./TaskInfoBoardPresentationDependencyProvider.js";
import { TaskInfoBoardViewDataBuilder } from "./Builder/TaskInfoBoardViewDataBuilder.js";
import { TaskInfoBoardViewDataResolver } from "./Resolver/TaskInfoBoardViewDataResolver.js";

/**
 * @class TaskInfoBoardPresentationFactory
 * @description Factory for task info board presentation classes and dependencies.
 */
export class TaskInfoBoardPresentationFactory extends AbstractPresentationFactory {
  static CONFIG_CLASS = TaskInfoBoardPresentationConfig;
  static DEPENDENCY_PROVIDER_CLASS = TaskInfoBoardPresentationDependencyProvider;

  static createTaskClient() {
    return this.getProvidedDependency(TaskInfoBoardPresentationDependencyProvider.TASK_CLIENT);
  }

  static createLanguageSwitcherClient() {
    return this.getProvidedDependency(
      TaskInfoBoardPresentationDependencyProvider.LANGUAGE_SWITCHER_CLIENT
    );
  }

  static createGlossaryClient() {
    return this.getProvidedDependency(TaskInfoBoardPresentationDependencyProvider.GLOSSARY_CLIENT);
  }

  static createTaskInfoBoardViewDataBuilder() {
    if (!this.taskInfoBoardViewDataBuilder) {
      this.taskInfoBoardViewDataBuilder = new TaskInfoBoardViewDataBuilder(
        this.createGlossaryClient()
      );
    }

    return this.taskInfoBoardViewDataBuilder;
  }

  static createTaskInfoBoardViewDataResolver() {
    if (!this.taskInfoBoardViewDataResolver) {
      this.taskInfoBoardViewDataResolver = new TaskInfoBoardViewDataResolver(
        this.createTaskClient(),
        this.createLanguageSwitcherClient(),
        this.createTaskInfoBoardViewDataBuilder()
      );
    }

    return this.taskInfoBoardViewDataResolver;
  }
}

export default TaskInfoBoardPresentationFactory;
