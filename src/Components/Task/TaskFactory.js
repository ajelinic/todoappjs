/**
 * @TaskFactory
 */

import { TaskForm } from "./Form/TaskForm.js";
import { TaskCreator } from "./Logic/Creator/TaskCreator.js";
import { TaskDeleter } from "./Logic/Deleter/TaskDeleter.js";
import { TaskHandler } from "./Logic/Handler/TaskHandler.js";
import { TaskDataProvider } from "./TaskDataProvider.js";
import { TaskAddValidator } from "./Logic/Validator/TaskAddValidator.js";
import { TaskDeleteValidator } from "./Logic/Validator/TaskDeleteValidator.js";
import { TaskFormHandler } from "./Logic/Handler/TaskFormHandler.js";

export class TaskFactory {
  static createTaskCreator() {
    return new TaskCreator(
      this.addHolderElement(),
      this.addInputField(),
      this.selectDueTimeInput()
    );
  }

  static createTaskDeleter() {
    return new TaskDeleter(
      this.addHolderElement(),
      this.selectClearTaskButton()
    );
  }

  static createTaskForm() {
    return new TaskForm();
  }

  static createTaskAddValidator() {
    return new TaskAddValidator();
  }

  static createTaskDeleteValidator() {
    return new TaskDeleteValidator();
  }

  static createTaskHandler() {
    return new TaskHandler(this.addHolderElement(), this.selectTaskCheckBox());
  }

  static createTaskFormHandler() {
    return new TaskFormHandler(
      this.selectDueTimeButton(),
      this.selectDueTimeInput(),
      this.selectAddTaskButton(),
      this.addInputField()
    );
  }

  static selectAddTaskButton() {
    return TaskDataProvider.queryAddTaskButton();
  }

  static selectTaskCheckBox() {
    return TaskDataProvider.queryTaskCheckBox();
  }

  static selectClearTaskButton() {
    return TaskDataProvider.queryDeleteTaskButton();
  }

  static addHolderElement() {
    return TaskDataProvider.getHolderElement();
  }

  static selectDueTimeButton() {
    return TaskDataProvider.getDueTimeButton();
  }

  static selectDueTimeInput() {
    return TaskDataProvider.getDueTimeInput();
  }

  static addInputField() {
    return TaskDataProvider.getInputField();
  }
}
