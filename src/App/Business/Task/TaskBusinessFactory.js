import { AbstractBusinessFactory } from "../../../base/Abstracts/AbstractBusinessFactory.js";
import { TaskFacade } from "./TaskFacade.js";
import { TaskBusinessConfig } from "./TaskBusinessConfig.js";
import { TaskBusinessDependencyProvider } from "./TaskBusinessDependencyProvider.js";
import { TodoValidator } from "./Model/TodoValidator.js";

/**
 * @class TaskBusinessFactory
 * @description TaskBusinessFactory
 */
export class TaskBusinessFactory extends AbstractBusinessFactory {
  static CONFIG_CLASS = TaskBusinessConfig;
  static DEPENDENCY_PROVIDER_CLASS = TaskBusinessDependencyProvider;

  static facade = null;
  static todoValidator = null;

  static createTaskFacade() {
    if (!this.getConfig().useFacadeSingleton()) {
      return new TaskFacade(this);
    }

    if (!this.facade) {
      this.facade = new TaskFacade(this);
    }

    return this.facade;
  }

  static createTaskRepository() {
    return this.getProvidedDependency(TaskBusinessDependencyProvider.TASK_REPOSITORY);
  }

  static createTaskStorageGateway() {
    return this.getProvidedDependency(TaskBusinessDependencyProvider.TASK_STORAGE_GATEWAY);
  }

  static createDateTimeService() {
    return this.getProvidedDependency(TaskBusinessDependencyProvider.DATE_TIME_SERVICE);
  }

  static createTodoValidator() {
    if (!this.todoValidator) {
      this.todoValidator = new TodoValidator(this.createDateTimeService());
    }

    return this.todoValidator;
  }
}
