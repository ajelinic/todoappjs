/**
 * @TaskFactory
 */

import { TaskToTaskListConnector } from "../../Share/TaskList/TaskToTaskListConnector/TaskToTaskListConnector.js";
import { TaskForm } from "./Form/TaskForm.js";
import { TaskCreator } from "./Logic/Creator/TaskCreator.js";
import { TaskDeleter } from "./Logic/Deleter/TaskDeleter.js";
import { TaskHandler } from "./Logic/Handler/TaskHandler.js";
import { TaskDependecyProvider } from "./TaskDependencyProvider.js";
import { TaskAddValidator } from "./Logic/Validator/TaskAddValidator.js";
import { TaskDeleteValidator } from "./Logic/Validator/TaskDeleteValidator.js";

export class TaskFactory {
  static createTaskCreator() {
    return new TaskCreator(
      this.addHolderElement(),
      this.selectAddTaskButton(),
      this.addInputField()
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
    return new TaskAddValidator(
      this.addErrorMessageOnTaskAdd(),
      this.addSuccessMessageOnTaskAdd(),
      this.addOnlyNumbersErrorMessageOnTaskAdd()
    );
  }

  static createTaskDeleteValidator() {
    return new TaskDeleteValidator(
      this.addErrorMessageOnTaskDelete(),
      this.addSuccessMessageOnTaskDelete(),
      this.addWarningMessageOnEmptyTaskList()
    );
  }

  static createTaskHandler() {
    return new TaskHandler(this.addHolderElement(), this.selectTaskCheckBox());
  }

  static createFormConnector() {
    return new TaskToTaskListConnector(this.createTaskForm());
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

  static addErrorMessageOnTaskAdd() {
    return TaskDependecyProvider.getErrorMessageOnTaskAdd();
  }

  static addOnlyNumbersErrorMessageOnTaskAdd() {
    return TaskDependecyProvider.getOnlyNumbersErrorMessageOnTaskAdd();
  }

  static addSuccessMessageOnTaskAdd() {
    return TaskDependecyProvider.getSuccessMessageOnTaskAdd();
  }

  static addErrorMessageOnTaskDelete() {
    return TaskDependecyProvider.getErrorMessageOnTaskDelete();
  }

  static addSuccessMessageOnTaskDelete() {
    return TaskDependecyProvider.getSuccessMessageOnTaskDelete();
  }

  static addWarningMessageOnEmptyTaskList() {
    return TaskDependecyProvider.getWarningMessageOnEmptyTaskList();
  }

  static addInputField() {
    return TaskDependecyProvider.getInputField();
  }
}
