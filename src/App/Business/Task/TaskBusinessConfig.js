import { AbstractConfig } from "../../../base/Abstracts/AbstractConfig.js";

/**
 * @class TaskBusinessConfig
 * @description Task business configuration.
 */
export class TaskBusinessConfig extends AbstractConfig {
  static useFacadeSingleton() {
    return true;
  }
}

export default TaskBusinessConfig;
