import { AbstractConfig } from "../../../base/Abstracts/AbstractConfig.js";

/**
 * @class TaskInfoBoardPresentationConfig
 * @description Configuration for task info board presentation flow.
 */
export class TaskInfoBoardPresentationConfig extends AbstractConfig {
  static getDefaultLocale() {
    return "en-US";
  }

  static getMountSelector() {
    return "#task-info-board-feature";
  }

  static getTaskDataChangedEventName() {
    return "app:task-data-changed";
  }
}

export default TaskInfoBoardPresentationConfig;
