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
import { Glossary } from "../../Utils/Glossary/Glossary.js";
import { DomElementCreator } from "../../Utils/DomElementCreate/DomElementCreator.js";
import { DateTimeHandler } from "../../Utils/DateTimeHandle/DateTimeHandler.js";
import { TaskConnector } from "./TaskConnector.js";
import { TaskConfig } from "./TaskConfig.js";
import { TaskSubmitListener } from "./Logic/TaskSubmitListener/TaskSubmitListener.js";
import { UtilsConnector } from "../../Utils/UtilsConnector.js";
import { TaskDueTimeSubmitListener } from "./Logic/TaskSubmitListener/TaskDueTimeSubmitListener.js";

export class TaskFactory {
  static createTaskCreator() {
    return new TaskCreator(
      DateTimeHandler,
      DomElementCreator,
      this.getNotificationDependency(),
      TaskConnector,
      TaskConfig,
      this.createTaskHandler(),
      TaskDataProvider,
      this.createTaskAddValidator()
    );
  }

  static createTaskDeleter() {
    return new TaskDeleter(
      TaskConnector,
      TaskDataProvider,
      this.createTaskDeleteValidator()
    );
  }

  static createTaskForm() {
    return new TaskForm(Glossary, DomElementCreator);
  }

  static createTaskAddValidator() {
    return new TaskAddValidator(DateTimeHandler, TaskConfig);
  }

  static createTaskDeleteValidator() {
    return new TaskDeleteValidator(
      this.getNotificationDependency(),
      TaskConfig
    );
  }

  static createTaskHandler() {
    return new TaskHandler(TaskDataProvider, TaskConnector, TaskConfig);
  }

  static createTaskFormHandler() {
    return new TaskFormHandler(
      TaskDataProvider,
      this.createTaskHandler(),
      this.createTaskDueTimeSubmitListener(),
      this.createTaskSubmitListener()
    );
  }

  static createTaskSubmitListener() {
    return new TaskSubmitListener(
      TaskDataProvider,
      this.getNotificationDependency(),
      TaskConfig,
      this.createTaskHandler(),
      this.createTaskCreator()
    );
  }

  static createTaskDueTimeSubmitListener() {
    return new TaskDueTimeSubmitListener(
      this.getNotificationDependency(),
      TaskConfig,
      this.createTaskHandler()
    );
  }

  static getNotificationDependency() {
    return UtilsConnector.createNotification();
  }

  static getTaskCreatorPlugins() {
    return [];
  }
}
