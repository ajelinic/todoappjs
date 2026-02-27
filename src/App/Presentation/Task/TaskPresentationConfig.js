import { AbstractConfig } from "../../../base/Abstracts/AbstractConfig.js";

/**
 * @class TaskPresentationConfig
 * @description Configuration for task presentation orchestration.
 */
export class TaskPresentationConfig extends AbstractConfig {
  static getDefaultLocale() {
    return "en-US";
  }

  static getMountSelector() {
    return "#task-feature";
  }

  static getLocaleChangedEventName() {
    return "app:locale-changed";
  }
}

export default TaskPresentationConfig;
