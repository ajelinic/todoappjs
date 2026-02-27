import { AbstractClientFactory } from "../../../base/Abstracts/AbstractClientFactory.js";
import { TaskClientConfig } from "./TaskClientConfig.js";
import { TaskClientDependencyProvider } from "./TaskClientDependencyProvider.js";

/**
 * @class TaskClientFactory
 * @description TaskClientFactory
 */
export class TaskClientFactory extends AbstractClientFactory {
  static CONFIG_CLASS = TaskClientConfig;
  static DEPENDENCY_PROVIDER_CLASS = TaskClientDependencyProvider;

  static createTaskFacade() {
    return this.getProvidedDependency(TaskClientDependencyProvider.TASK_FACADE);
  }
}
