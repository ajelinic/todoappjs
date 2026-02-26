import { AbstractController } from "../../../../base/Abstracts/AbstractController.js";
import "../../../View/components/views/task/task-page/task-page.js";
import { LanguageSwitcherClient } from "../../../Client/LanguageSwitcher/LanguageSwitcherClient.js";
import { TaskClient } from "../../../Client/Task/TaskClient.js";
import { TranslationService } from "../../../Utils/Translation/TranslationService.js";

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
    this.languageSwitcherClient = new LanguageSwitcherClient();
    this.translationService = new TranslationService();
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
      this.languageSwitcherClient.bootstrap(),
      this.translationService.bootstrap(),
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

    const localizedActionResult = await this.localizeActionResult(actionResult);
    const pageData = await this.getTodoPageData();
    const preservedForm = this.pageView.data?.form ?? this.createDefaultFormState();
    const viewData = this.mapViewData(pageData, localizedActionResult, preservedForm);

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
      title: pageData.title,
      labels: pageData.labels,
      tasks: pageData.tasks,
      infoItems: pageData.infoItems,
      locale: this.locale,
      form: formState,
      notification: normalizedActionResult.notification ?? null,
    };
  }

  async getTodoPageData() {
    await this.bootstrap();

    const glossaryKeys = this.createTaskTranslationKeys();
    const [tasks, glossary] = await Promise.all([
      this.getTasks(),
      this.translationService.transList(glossaryKeys, {
        locale: this.locale,
      }),
    ]);

    return {
      title: glossary["todoapp.title"],
      labels: {
        add: glossary["todoapp.input.add"],
        due: glossary["todoapp.input.due"],
        clear: glossary["todoapp.clear.list"],
        noDue: glossary["todoapp.task.nodue"],
        delete: glossary["todoapp.task.delete"],
        placeholder: glossary["todoapp.input.placeholder"],
      },
      tasks,
      infoItems: this.buildTaskInfoItems(tasks, glossary),
    };
  }

  createTaskTranslationKeys() {
    return [
      "todoapp.title",
      "todoapp.input.add",
      "todoapp.input.due",
      "todoapp.input.placeholder",
      "todoapp.clear.list",
      "todoapp.task.nodue",
      "todoapp.task.delete",
      "task.info.id.text",
      "task.info.title.text",
      "task.info.duetime.text",
      "task.info.noduetime.text",
      "task.info.addedat.text",
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
    const taskIdText = glossary["task.info.id.text"];
    const taskTitleText = glossary["task.info.title.text"];
    const taskDueText = glossary["task.info.duetime.text"];
    const taskNoDueText = glossary["task.info.noduetime.text"];
    const taskAddedAtText = glossary["task.info.addedat.text"];

    const dueText = Number.isFinite(task.dueTime)
      ? `${taskDueText} ${new Date(task.dueTime).toLocaleString(this.locale)}`
      : taskNoDueText;

    return `${taskIdText} ${task.id} ${taskTitleText} ${task.taskValue} ${dueText} ${taskAddedAtText} ${task.timeAdded}`;
  }

  async localizeActionResult(actionResult = {}) {
    const normalizedActionResult = actionResult ?? {};
    const localizedNotification = await this.localizeNotification(
      normalizedActionResult.notification
    );

    return {
      ...normalizedActionResult,
      notification: localizedNotification,
    };
  }

  async localizeNotification(notification) {
    if (!notification || typeof notification !== "object") {
      return null;
    }

    if (typeof notification.value === "string") {
      return notification;
    }

    if (typeof notification.key !== "string" || notification.key.trim().length === 0) {
      return null;
    }

    return {
      ...notification,
      value: await this.translationService.trans(notification.key, {
        locale: this.locale,
      }),
    };
  }
}

export default TaskController;
