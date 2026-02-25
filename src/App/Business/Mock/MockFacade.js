import { AbstractFacade } from "../../../base/Abstracts/AbstractFacade.js";
import { TodoMessageService } from "./Service/TodoMessageService.js";

/**
 * @class MockFacade
 * @description MockFacade
 */
export class MockFacade extends AbstractFacade {
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

    await this.getFactory().createQueryContainer().openDatabase();
    await this.seedGlossary();
    this.isBootstrapped = true;
  }

  async getTodoPageData() {
    await this.bootstrap();

    const [title, addButton, dueButton, clearButton, tasks] = await Promise.all([
      this.getGlossaryText("todoapp.title", "To-Do App"),
      this.getGlossaryText("todoapp.input.add", "Add to list"),
      this.getGlossaryText("todoapp.input.due", "+Due"),
      this.getGlossaryText("todoapp.clear.list", "Clear list"),
      this.getFactory().createTaskRepository().getAllTasks(),
    ]);

    const infoItems = await this.buildTaskInfoItems(tasks);

    return {
      title,
      labels: {
        add: addButton,
        due: dueButton,
        clear: clearButton,
      },
      tasks,
      infoItems,
    };
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

  async seedGlossary() {
    const glossaryRepository = this.getFactory().createGlossaryRepository();
    const glossaryCount = await glossaryRepository.countRows();
    if (glossaryCount > 0) {
      return;
    }

    const csvUrl = this.getFactory().createPersistenceConfig().getGlossaryCsvUrl();
    const rows = await this.getFactory().createCsvParser().parseFromUrl(csvUrl);
    await glossaryRepository.seedRows(rows);
  }

  async getGlossaryText(key, fallback) {
    return this.getFactory().createGlossaryRepository().getText(key, fallback);
  }

  async buildTaskInfoItems(tasks) {
    const formatter = this.getFactory().createTaskInfoFormatter();
    const sortedTasks = [...tasks].sort((left, right) => right.id - left.id);

    return Promise.all(
      sortedTasks.map(async (task) => {
        return {
          id: task.id,
          text: await formatter.format(task),
        };
      })
    );
  }
}
