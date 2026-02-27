import { AbstractDependencyProvider } from "../../../base/Abstracts/AbstractDependencyProvider.js";
import { TaskBusinessFactory } from "../../Business/Task/TaskBusinessFactory.js";

/**
 * @class TaskClientDependencyProvider
 * @description Task client dependencies.
 */
export class TaskClientDependencyProvider extends AbstractDependencyProvider {
  static container = new Map();
  static TASK_FACADE = "TASK_FACADE";

  static provideDependencies(container) {
    container.set(this.TASK_FACADE, () => TaskBusinessFactory.createTaskFacade());
    return container;
  }
}

export default TaskClientDependencyProvider;
