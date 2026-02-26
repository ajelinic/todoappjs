import { AbstractBusinessFactory } from "../../../base/Abstracts/AbstractBusinessFactory.js";
import { TaskPersistenceFactory } from "../../Persistence/Task/TaskPersistenceFactory.js";
import { TaskFacade } from "./TaskFacade.js";
import { DateTimeService } from "./Service/DateTimeService.js";
import { TodoValidator } from "./Model/TodoValidator.js";

/**
 * @class TaskBusinessFactory
 * @description TaskBusinessFactory
 */
export class TaskBusinessFactory extends AbstractBusinessFactory {
  static facade = null;
  static dateTimeService = null;
  static todoValidator = null;

  static createTaskFacade() {
    if (!this.facade) {
      this.facade = new TaskFacade(this);
    }

    return this.facade;
  }

  static createTaskRepository() {
    return TaskPersistenceFactory.createTaskRepository();
  }

  static createTaskStorageGateway() {
    return TaskPersistenceFactory.createTaskStorageGateway();
  }

  static createDateTimeService() {
    if (!this.dateTimeService) {
      this.dateTimeService = new DateTimeService();
    }

    return this.dateTimeService;
  }

  static createTodoValidator() {
    if (!this.todoValidator) {
      this.todoValidator = new TodoValidator(this.createDateTimeService());
    }

    return this.todoValidator;
  }
}
