import { AbstractFacade } from "../../../base/Abstracts/AbstractFacade.js";
import { AddTaskRequestTransfer } from "../../Shared/Task/Transfer/AddTaskRequestTransfer.js";
import { DeleteTaskRequestTransfer } from "../../Shared/Task/Transfer/DeleteTaskRequestTransfer.js";
import { TaskActionResultTransfer } from "../../Shared/Task/Transfer/TaskActionResultTransfer.js";
import { TaskCollectionTransfer } from "../../Shared/Task/Transfer/TaskCollectionTransfer.js";
import { TaskTransfer } from "../../Shared/Task/Transfer/TaskTransfer.js";
import { ToggleTaskRequestTransfer } from "../../Shared/Task/Transfer/ToggleTaskRequestTransfer.js";
import { TodoMessageService } from "../../Utils/Task/TodoMessageService.js";

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
    const tasks = await this.getFactory().createTaskRepository().getAllTasks();

    return TaskCollectionTransfer.from(tasks);
  }

  async addTask(payload) {
    await this.bootstrap();

    const requestTransfer = AddTaskRequestTransfer.from(payload);
    const taskValue = requestTransfer.taskValue;
    const dueTimeInput = requestTransfer.dueTimeInput;
    const validation = this.getFactory()
      .createTodoValidator()
      .validateAddTask(taskValue, dueTimeInput);

    if (!validation.valid) {
      return TaskActionResultTransfer.from({
        notification: validation.notification,
        ui: {
          taskValue,
          dueTimeInput,
          showDueInput: Boolean(dueTimeInput),
        },
      });
    }

    const taskRepository = this.getFactory().createTaskRepository();
    const dateTimeService = this.getFactory().createDateTimeService();
    const id = await taskRepository.getNextTaskId();

    const taskTransfer = TaskTransfer.from({
      id,
      taskValue: validation.value,
      dueTime: validation.dueTimestamp,
      timeAdded: dateTimeService.createTaskAddedAtTimestamp(),
      checked: false,
    });

    await taskRepository.saveTask(taskTransfer.toObject());

    return TaskActionResultTransfer.from({
      notification: TodoMessageService.taskAdded(),
      ui: {
        taskValue: "",
        dueTimeInput: "",
        showDueInput: false,
      },
    });
  }

  async toggleTask(payload) {
    await this.bootstrap();

    const requestTransfer = ToggleTaskRequestTransfer.from(payload);
    if (!Number.isFinite(requestTransfer.id)) {
      return new TaskActionResultTransfer();
    }

    await this.getFactory()
      .createTaskRepository()
      .updateCheckedStatus(requestTransfer.id, requestTransfer.checked);

    return new TaskActionResultTransfer();
  }

  async deleteTask(payload) {
    await this.bootstrap();

    const requestTransfer = DeleteTaskRequestTransfer.from(payload);
    if (!Number.isFinite(requestTransfer.id)) {
      return new TaskActionResultTransfer();
    }

    const taskRepository = this.getFactory().createTaskRepository();
    const task = await taskRepository.getTaskById(requestTransfer.id);
    if (!task || !Boolean(task.checked)) {
      return new TaskActionResultTransfer();
    }

    await taskRepository.deleteTaskById(requestTransfer.id);

    return new TaskActionResultTransfer();
  }

  async clearCompletedTasks() {
    await this.bootstrap();

    const taskRepository = this.getFactory().createTaskRepository();
    const tasks = await taskRepository.getAllTasks();

    if (!tasks.length) {
      return TaskActionResultTransfer.from({
        notification: TodoMessageService.clearEmptyList(),
      });
    }

    const deletedCount = await taskRepository.deleteCompletedTasks();
    if (!deletedCount) {
      return TaskActionResultTransfer.from({
        notification: TodoMessageService.clearNoSelection(),
      });
    }

    return TaskActionResultTransfer.from({
      notification: TodoMessageService.clearSuccess(),
    });
  }
}
