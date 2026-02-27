import { AbstractPresentationController } from "../../../../base/Abstracts/AbstractPresentationController.js";
import "../../../View/components/views/task/task-page/task-page.js";
import { TaskPresentationFactory } from "../TaskPresentationFactory.js";

/**
 * @class TaskController
 * @description TaskController
 */
export class TaskController extends AbstractPresentationController {
  static FACTORY_CLASS = TaskPresentationFactory;

  static shouldAutoExecute() {
    return true;
  }

  getMountSelector() {
    return this.getConfig().getMountSelector();
  }

  async indexAction() {
    this.initializeControllerState();
    await this.bootstrap();
    this.locale = await this.getFactory().createLanguageSwitcherClient().getCurrentLocale();
    const viewData = await this.buildViewData(
      null,
      this.getFactory().createTaskPageForm().createDefaultState()
    );
    this.pageView = await this.renderViewAtMount("task-page", viewData, this.getMountSelector());
    this.bindPageEvents();
    this.bindLocaleEvents();
  }

  initializeControllerState() {
    if (this.isInitialized) {
      return;
    }

    this.locale = this.getConfig().getDefaultLocale();
    this.pageView = null;
    this.areEventsBound = false;
    this.areLocaleEventsBound = false;
    this.isBootstrapped = false;

    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleToggleTask = this.handleToggleTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.handleLocaleChanged = this.handleLocaleChanged.bind(this);

    this.isInitialized = true;
  }

  async bootstrap() {
    if (this.isBootstrapped) {
      return;
    }

    const factory = this.getFactory();
    await Promise.all([
      factory.createTaskClient().bootstrap(),
      factory.createLanguageSwitcherClient().bootstrap(),
      factory.createGlossaryClient().bootstrap(),
    ]);
    this.isBootstrapped = true;
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

    document.addEventListener(
      this.getConfig().getLocaleChangedEventName(),
      this.handleLocaleChanged
    );
    this.areLocaleEventsBound = true;
  }

  async handleAddTask(event) {
    const actionResult = await this.getFactory()
      .createTaskPageActionHandler()
      .addTask(event.detail ?? {});
    await this.refreshView(actionResult);
  }

  async handleToggleTask(event) {
    await this.getFactory().createTaskPageActionHandler().toggleTask(event.detail ?? {});
    await this.refreshView();
  }

  async handleDeleteTask(event) {
    await this.getFactory().createTaskPageActionHandler().deleteTask(event.detail ?? {});
    await this.refreshView();
  }

  async handleClearCompleted() {
    const actionResult = await this.getFactory()
      .createTaskPageActionHandler()
      .clearCompleted();
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

    await this.bootstrap();
    const preservedForm =
      this.pageView.data?.form ?? this.getFactory().createTaskPageForm().createDefaultState();
    this.pageView.data = await this.buildViewData(actionResult, preservedForm);
  }

  async buildViewData(actionResult = null, fallbackForm = null) {
    return this.getFactory().createTaskPageViewDataResolver().resolve({
      actionResult,
      fallbackForm,
      locale: this.locale,
    });
  }
}

export default TaskController;
