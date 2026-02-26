import { AbstractFacade } from "../../../base/Abstracts/AbstractFacade.js";
import { TodoMessageService } from "./Service/TodoMessageService.js";

/**
 * @class TaskFacade
 * @description TaskFacade
 */
export class TaskFacade extends AbstractFacade {
  constructor(factory) {
    super();
    this.factory = factory;
    this.isBootstrapped = false;
  }

  getFactory() {
    return this.factory;
  }

  async bootstrap() {
    if (this.isBootstrapped) {
      return;
    }

    await this.getFactory().createTaskStorageGateway().registerSchema();
    this.isBootstrapped = true;
  }

  async getTasks() {
    await this.bootstrap();
    return this.getFactory().createTaskRepository().getAllTasks();
  }

  async addTask(payload) {
    await this.bootstrap();

    const taskValue = payload?.taskValue ?? "";
    const dueTimeInput = payload?.dueTimeInput ?? "";
    const validation = this.getFactory()
      .createTodoValidator()
      .validateAddTask(taskValue, dueTimeInput);

    if (!validation.valid) {
      return {
        notification: validation.notification,
        ui: {
          taskValue,
          dueTimeInput,
          showDueInput: Boolean(dueTimeInput),
        },
      };
    }

    const taskRepository = this.getFactory().createTaskRepository();
    const dateTimeService = this.getFactory().createDateTimeService();
    const id = await taskRepository.getNextTaskId();

    await taskRepository.saveTask({
      id,
      taskValue: validation.value,
      dueTime: validation.dueTimestamp,
      timeAdded: dateTimeService.createTaskAddedAtTimestamp(),
      checked: false,
    });

    return {
      notification: TodoMessageService.taskAdded(),
      ui: {
        taskValue: "",
        dueTimeInput: "",
        showDueInput: false,
      },
    };
  }

  async toggleTask(payload) {
    await this.bootstrap();

    const id = Number.parseInt(payload?.id, 10);
    if (!Number.isFinite(id)) {
      return {};
    }

    await this.getFactory()
      .createTaskRepository()
      .updateCheckedStatus(id, Boolean(payload?.checked));

    return {};
  }

  async deleteTask(payload) {
    await this.bootstrap();

    const id = Number.parseInt(payload?.id, 10);
    if (!Number.isFinite(id)) {
      return {};
    }

    const taskRepository = this.getFactory().createTaskRepository();
    const task = await taskRepository.getTaskById(id);
    if (!task || !Boolean(task.checked)) {
      return {};
    }

    await taskRepository.deleteTaskById(id);

    return {};
  }

  async clearCompletedTasks() {
    await this.bootstrap();

    const taskRepository = this.getFactory().createTaskRepository();
    const tasks = await taskRepository.getAllTasks();

    if (!tasks.length) {
      return {
        notification: TodoMessageService.clearEmptyList(),
      };
    }

    const deletedCount = await taskRepository.deleteCompletedTasks();
    if (!deletedCount) {
      return {
        notification: TodoMessageService.clearNoSelection(),
      };
    }

    return {
      notification: TodoMessageService.clearSuccess(),
    };
  }
}
