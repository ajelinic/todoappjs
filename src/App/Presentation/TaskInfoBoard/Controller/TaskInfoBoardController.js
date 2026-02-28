import { AbstractPresentationController } from "../../../../base/Abstracts/AbstractPresentationController.js";
import "../../../View/components/views/task-info-board/task-info-board.js";
import { TaskInfoBoardPresentationFactory } from "../TaskInfoBoardPresentationFactory.js";

/**
 * @class TaskInfoBoardController
 * @description TaskInfoBoardController
 */
export class TaskInfoBoardController extends AbstractPresentationController {
  static FACTORY_CLASS = TaskInfoBoardPresentationFactory;

  static shouldAutoExecute() {
    return true;
  }

  getMountSelector() {
    return this.getConfig().getMountSelector();
  }

  async indexAction() {
    this.initializeControllerState();
    await this.bootstrap();
    const viewData = await this.buildViewData();
    this.pageView = await this.renderViewAtMount(
      "task-info-board-view",
      viewData,
      this.getMountSelector()
    );
    this.locale = viewData.locale;
    this.bindEvents();
  }

  initializeControllerState() {
    if (this.isInitialized) {
      return;
    }

    this.locale = this.getConfig().getDefaultLocale();
    this.pageView = null;
    this.areEventsBound = false;
    this.isBootstrapped = false;
    this.handleTaskDataChanged = this.handleTaskDataChanged.bind(this);
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

  bindEvents() {
    if (this.areEventsBound) {
      return;
    }

    document.addEventListener(
      this.getConfig().getTaskDataChangedEventName(),
      this.handleTaskDataChanged
    );
    this.areEventsBound = true;
  }

  async handleTaskDataChanged(event) {
    const tasks = Array.isArray(event?.detail?.tasks) ? event.detail.tasks : null;
    const locale = this.resolveLocale(event?.detail?.locale);

    if (locale) {
      this.locale = locale;
    }

    await this.refreshView({
      tasks,
      locale: this.locale,
    });
  }

  async refreshView({ tasks = null, locale = null } = {}) {
    if (!this.pageView) {
      return;
    }

    await this.bootstrap();
    const viewData = await this.buildViewData({
      tasks,
      locale,
    });
    this.pageView.data = viewData;
    this.locale = viewData.locale;
  }

  resolveLocale(locale) {
    if (typeof locale !== "string") {
      return null;
    }

    const normalizedLocale = locale.trim();
    return normalizedLocale.length > 0 ? normalizedLocale : null;
  }

  async buildViewData({ tasks = null, locale = null } = {}) {
    const normalizedLocale = this.resolveLocale(locale) ?? this.locale;

    return this.getFactory().createTaskInfoBoardViewDataResolver().resolve({
      tasks,
      locale: normalizedLocale,
    });
  }
}

export default TaskInfoBoardController;
