import { AbstractController } from "../../../../base/Abstracts/AbstractController.js";
import "../../../View/components/views/mock/mock-page/mock-page.js";
import { GlossaryClient } from "../../../Client/Glossary/GlossaryClient.js";
import { TaskClient } from "../../../Client/Task/TaskClient.js";

/**
 * @class TaskController
 * @description TaskController
 */
export class TaskController extends AbstractController {
  static shouldAutoExecute() {
    return true;
  }

  constructor() {
    super();
    this.taskClient = new TaskClient();
    this.glossaryClient = new GlossaryClient();
    this.locale = "hr-HR";
    this.pageView = null;
    this.areEventsBound = false;

    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleToggleTask = this.handleToggleTask.bind(this);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
  }

  getMountSelector() {
    return "#task-feature";
  }

  async indexAction() {
    await this.bootstrap();
    const pageData = await this.getTodoPageData();
    const viewData = this.mapViewData(pageData, null, this.createDefaultFormState());
    await this.renderTaskPage(viewData);
    this.bindPageEvents();
  }

  async bootstrap() {
    await Promise.all([this.taskClient.bootstrap(), this.glossaryClient.bootstrap()]);
  }

  async getTasks() {
    return this.taskClient.getTasks();
  }

  async addTask(payload) {
    return this.taskClient.addTask(payload);
  }

  async toggleTask(payload) {
    return this.taskClient.toggleTask(payload);
  }

  async clearCompletedTasks() {
    return this.taskClient.clearCompletedTasks();
  }

  async renderTaskPage(viewData) {
    const mountPoint = await this.getMountPoint(this.getMountSelector());
    mountPoint.innerHTML = "";

    const pageView = this.createView("mock-page", viewData);
    mountPoint.appendChild(pageView);
    this.pageView = pageView;
  }

  bindPageEvents() {
    if (!this.pageView || this.areEventsBound) {
      return;
    }

    this.pageView.addEventListener("todo:add", this.handleAddTask);
    this.pageView.addEventListener("todo:toggle", this.handleToggleTask);
    this.pageView.addEventListener("todo:clear-completed", this.handleClearCompleted);
    this.areEventsBound = true;
  }

  async handleAddTask(event) {
    const actionResult = await this.addTask(event.detail ?? {});
    await this.refreshView(actionResult);
  }

  async handleToggleTask(event) {
    await this.toggleTask(event.detail ?? {});
    await this.refreshView();
  }

  async handleClearCompleted() {
    const actionResult = await this.clearCompletedTasks();
    await this.refreshView(actionResult);
  }

  async refreshView(actionResult = {}) {
    if (!this.pageView) {
      return;
    }

    const pageData = await this.getTodoPageData();
    const preservedForm = this.pageView.data?.form ?? this.createDefaultFormState();
    const viewData = this.mapViewData(pageData, actionResult, preservedForm);

    this.pageView.data = viewData;
  }

  createDefaultFormState() {
    return {
      taskValue: "",
      dueTimeInput: "",
      showDueInput: false,
    };
  }

  mapViewData(pageData, actionResult = {}, fallbackForm = null) {
    const normalizedActionResult = actionResult ?? {};
    const formState =
      normalizedActionResult.ui ?? fallbackForm ?? this.createDefaultFormState();

    return {
      title: pageData?.title || "To-Do App",
      labels: pageData?.labels || {},
      tasks: pageData?.tasks || [],
      infoItems: pageData?.infoItems || [],
      form: formState,
      notification: normalizedActionResult.notification ?? null,
    };
  }

  async getTodoPageData() {
    await this.bootstrap();

    const glossaryEntries = this.createGlossaryEntries();
    const [tasks, glossary] = await Promise.all([
      this.getTasks(),
      this.glossaryClient.getTexts(glossaryEntries),
    ]);

    return {
      title: glossary["todoapp.title"] ?? "To-Do App",
      labels: {
        add: glossary["todoapp.input.add"] ?? "Add to list",
        due: glossary["todoapp.input.due"] ?? "+Due",
        clear: glossary["todoapp.clear.list"] ?? "Clear list",
      },
      tasks,
      infoItems: this.buildTaskInfoItems(tasks, glossary),
    };
  }

  createGlossaryEntries() {
    return [
      { key: "todoapp.title", fallback: "To-Do App" },
      { key: "todoapp.input.add", fallback: "Add to list" },
      { key: "todoapp.input.due", fallback: "+Due" },
      { key: "todoapp.clear.list", fallback: "Clear list" },
      { key: "task.info.id.text", fallback: "Task with id" },
      { key: "task.info.title.text", fallback: "with value" },
      { key: "task.info.duetime.text", fallback: "has to be done by" },
      { key: "task.info.noduetime.text", fallback: "." },
      { key: "task.info.addedat.text", fallback: "added at" },
    ];
  }

  buildTaskInfoItems(tasks, glossary) {
    const sortedTasks = [...tasks].sort((left, right) => right.id - left.id);

    return sortedTasks.map((task) => {
      return {
        id: task.id,
        text: this.formatTaskInfo(task, glossary),
      };
    });
  }

  formatTaskInfo(task, glossary) {
    const taskIdText = glossary["task.info.id.text"] ?? "Task with id";
    const taskTitleText = glossary["task.info.title.text"] ?? "with value";
    const taskDueText = glossary["task.info.duetime.text"] ?? "has to be done by";
    const taskNoDueText = glossary["task.info.noduetime.text"] ?? ".";
    const taskAddedAtText = glossary["task.info.addedat.text"] ?? "added at";

    const dueText = Number.isFinite(task.dueTime)
      ? `${taskDueText} ${new Date(task.dueTime).toLocaleString(this.locale)}`
      : taskNoDueText;

    return `${taskIdText} ${task.id} ${taskTitleText} ${task.taskValue} ${dueText} ${taskAddedAtText} ${task.timeAdded}`;
  }
}

export default TaskController;
