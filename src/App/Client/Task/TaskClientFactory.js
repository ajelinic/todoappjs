import { AbstractClientFactory } from "../../../base/Abstracts/AbstractClientFactory.js";
import { TaskBusinessFactory } from "../../Business/Task/TaskBusinessFactory.js";

/**
 * @class TaskClientFactory
 * @description TaskClientFactory
 */
export class TaskClientFactory extends AbstractClientFactory {
  static createTaskFacade() {
    return TaskBusinessFactory.createTaskFacade();
  }
}
