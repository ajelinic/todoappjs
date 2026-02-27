import { AbstractDependencyProvider } from "../../../base/Abstracts/AbstractDependencyProvider.js";
import { DateTimeService } from "../../../base/ServiceUtils/DateTimeService.js";
import { TaskPersistenceFactory } from "../../Persistence/Task/TaskPersistenceFactory.js";

/**
 * @class TaskBusinessDependencyProvider
 * @description Task business dependencies.
 */
export class TaskBusinessDependencyProvider extends AbstractDependencyProvider {
  static container = new Map();

  static TASK_REPOSITORY = "TASK_REPOSITORY";
  static TASK_STORAGE_GATEWAY = "TASK_STORAGE_GATEWAY";
  static DATE_TIME_SERVICE = "DATE_TIME_SERVICE";

  static provideDependencies(container) {
    container.set(this.TASK_REPOSITORY, () => TaskPersistenceFactory.createTaskRepository());
    container.set(this.TASK_STORAGE_GATEWAY, () =>
      TaskPersistenceFactory.createTaskStorageGateway()
    );
    container.set(this.DATE_TIME_SERVICE, () => new DateTimeService());

    return container;
  }
}

export default TaskBusinessDependencyProvider;
