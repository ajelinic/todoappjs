/**
 * @class TaskGlossaryKeyConstants
 * @description Shared glossary keys for task-related presentation texts.
 */
export class TaskGlossaryKeyConstants {
  static TITLE = "todoapp.title";
  static ADD = "todoapp.input.add";
  static DUE = "todoapp.input.due";
  static PLACEHOLDER = "todoapp.input.placeholder";
  static CLEAR = "todoapp.clear.list";
  static NO_DUE = "todoapp.task.nodue";
  static DELETE = "todoapp.task.delete";
  static INFO_TEMPLATE = "task.info.template";
  static INFO_DUE_TIME = "task.info.duetime.text";
  static INFO_NO_DUE_TIME = "task.info.noduetime.text";

  static getTaskPageKeys() {
    return [
      this.TITLE,
      this.ADD,
      this.DUE,
      this.PLACEHOLDER,
      this.CLEAR,
      this.NO_DUE,
      this.DELETE,
      this.INFO_TEMPLATE,
      this.INFO_DUE_TIME,
      this.INFO_NO_DUE_TIME,
    ];
  }
}

export default TaskGlossaryKeyConstants;
