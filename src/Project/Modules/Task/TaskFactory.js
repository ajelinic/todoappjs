/**
 * @TaskFactory
 */

import { TaskToTaskListConnector } from "../../ModuleConnect/TaskList/TaskToTaskListConnector/TaskToTaskListConnector.js";
import { TaskCreator } from "./Creator/TaskCreator.js";
import { TaskDeleter } from "./Deleter/TaskDeleter.js";
import { TaskForm } from "./Form/TaskForm.js";
import { TaskDependecyProvider } from "./TaskDependencyProvider.js";
import { TaskHandler } from "./TaskHandler/TaskHandler.js";
import { TaskAddValidator } from "./Validator/TaskAddValidator.js";
import { TaskDeleteValidator } from "./Validator/TaskDeleteValidator.js";

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
