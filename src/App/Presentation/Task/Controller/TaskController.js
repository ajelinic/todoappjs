import { AbstractController } from "../../../../base/Abstracts/AbstractController.js";
import "../../../View/components/views/task/task-page/task-page.js";
import { GlossaryClient } from "../../../Client/Glossary/GlossaryClient.js";
import { LanguageSwitcherClient } from "../../../Client/LanguageSwitcher/LanguageSwitcherClient.js";
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
    this.languageSwitcherClient = new LanguageSwitcherClient();
    this.locale = "en-US";
    this.pageView = null;
    this.areEventsBound = false;
    this.areLocaleEventsBound = false;

    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleToggleTask = this.handleToggleTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.handleLocaleChanged = this.handleLocaleChanged.bind(this);
  }

  getMountSelector() {
    return "#task-feature";
  }

  async indexAction() {
    await this.bootstrap();
    this.locale = await this.languageSwitcherClient.getCurrentLocale();
    const pageData = await this.getTodoPageData();
    const viewData = this.mapViewData(pageData, null, this.createDefaultFormState());
    await this.renderTaskPage(viewData);
    this.bindPageEvents();
    this.bindLocaleEvents();
  }

  async bootstrap() {
    await Promise.all([
      this.taskClient.bootstrap(),
      this.glossaryClient.bootstrap(),
      this.languageSwitcherClient.bootstrap(),
    ]);
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

  async deleteTask(payload) {
    return this.taskClient.deleteTask(payload);
  }

  async clearCompletedTasks() {
    return this.taskClient.clearCompletedTasks();
  }

  async renderTaskPage(viewData) {
    const mountPoint = await this.getMountPoint(this.getMountSelector());
    mountPoint.innerHTML = "";

    const pageView = this.createView("task-page", viewData);
    mountPoint.appendChild(pageView);
    this.pageView = pageView;
  }

  bindPageEvents() {
    if (!this.pageView || this.areEventsBound) {
      return;
    }

    this.pageView.addEventListener("todo:add", this.handleAddTask);
    this.pageView.addEventListener("todo:toggle", this.handleToggleTask);
    this.pageView.addEventListener("todo:delete", this.handleDeleteTask);
    this.pageView.addEventListener("todo:clear-completed", this.handleClearCompleted);
    this.areEventsBound = true;
  }

  bindLocaleEvents() {
    if (this.areLocaleEventsBound) {
      return;
    }

    document.addEventListener("app:locale-changed", this.handleLocaleChanged);
    this.areLocaleEventsBound = true;
  }

  async handleAddTask(event) {
    const actionResult = await this.addTask(event.detail ?? {});
    await this.refreshView(actionResult);
  }

  async handleToggleTask(event) {
    await this.toggleTask(event.detail ?? {});
    await this.refreshView();
  }

  async handleDeleteTask(event) {
    await this.deleteTask(event.detail ?? {});
    await this.refreshView();
  }

  async handleClearCompleted() {
    const actionResult = await this.clearCompletedTasks();
    await this.refreshView(actionResult);
  }

  async handleLocaleChanged(event) {
    const locale = event?.detail?.locale;
    if (typeof locale !== "string" || locale.trim().length === 0) {
      return;
    }

    this.locale = locale.trim();
    await this.refreshView();
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
      locale: this.locale,
      form: formState,
      notification: normalizedActionResult.notification ?? null,
    };
  }

  async getTodoPageData() {
    await this.bootstrap();

    const glossaryEntries = this.createGlossaryEntries();
    const [tasks, glossary] = await Promise.all([
      this.getTasks(),
      this.glossaryClient.getTexts(glossaryEntries, {
        locale: this.locale,
      }),
    ]);

    return {
      title: glossary["todoapp.title"] ?? "To-Do App",
      labels: {
        add: glossary["todoapp.input.add"] ?? "Add to list",
        due: glossary["todoapp.input.due"] ?? "+Due",
        clear: glossary["todoapp.clear.list"] ?? "Clear list",
        noDue: glossary["todoapp.task.nodue"] ?? "No due time",
        delete: glossary["todoapp.task.delete"] ?? "Delete",
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
      { key: "todoapp.task.nodue", fallback: "No due time" },
      { key: "todoapp.task.delete", fallback: "Delete" },
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
