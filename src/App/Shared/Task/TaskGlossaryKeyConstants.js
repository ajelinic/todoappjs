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

  static getTaskPageKeys() {
    return [
      this.TITLE,
      this.ADD,
      this.DUE,
      this.PLACEHOLDER,
      this.CLEAR,
      this.NO_DUE,
      this.DELETE,
    ];
  }
}

export default TaskGlossaryKeyConstants;
