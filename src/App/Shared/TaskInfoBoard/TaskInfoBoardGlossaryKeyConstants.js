/**
 * @class TaskInfoBoardGlossaryKeyConstants
 * @description Shared glossary keys for task info board texts.
 */
export class TaskInfoBoardGlossaryKeyConstants {
  static INFO_TEMPLATE = "task.info.template";
  static INFO_DUE_TIME = "task.info.duetime.text";
  static INFO_NO_DUE_TIME = "task.info.noduetime.text";

  static getTaskInfoBoardKeys() {
    return [this.INFO_TEMPLATE, this.INFO_DUE_TIME, this.INFO_NO_DUE_TIME];
  }
}

export default TaskInfoBoardGlossaryKeyConstants;
