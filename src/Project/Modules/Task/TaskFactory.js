/**
 * @TaskFactory
 */

import { TaskForm } from "./Form/TaskForm.js";
import { TaskCreator } from "./Logic/Creator/TaskCreator.js";
import { TaskDeleter } from "./Logic/Deleter/TaskDeleter.js";
import { TaskHandler } from "./Logic/Handler/TaskHandler.js";
import { TaskDependecyProvider } from "./TaskDependencyProvider.js";
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
    return TaskDependecyProvider.queryAddTaskButton();
  }

  static selectTaskCheckBox() {
    return TaskDependecyProvider.queryTaskCheckBox();
  }

  static selectClearTaskButton() {
    return TaskDependecyProvider.queryDeleteTaskButton();
  }

  static addHolderElement() {
    return TaskDependecyProvider.getHolderElement();
  }

  static selectDueTimeButton() {
    return TaskDependecyProvider.getDueTimeButton();
  }

  static selectDueTimeInput() {
    return TaskDependecyProvider.getDueTimeInput();
  }

  static addInputField() {
    return TaskDependecyProvider.getInputField();
  }
}
