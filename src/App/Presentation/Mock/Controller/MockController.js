import { AbstractController } from "../../../../base/Abstracts/AbstractController.js";
import "../../../View/components/views/mock/mock-page/mock-page.js";
import { MockClient } from "../../../Client/Mock/MockClient.js";

/**
 * @class MockController
 * @description MockController
 */
export class MockController extends AbstractController {
  constructor() {
    super();
    this.client = new MockClient();
    this.pageView = null;
    this.areEventsBound = false;

    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleToggleTask = this.handleToggleTask.bind(this);
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
  }

  async indexAction() {
    const pageData = await this.client.getTodoPageData();
    const viewData = this.mapViewData(pageData);
    const { pageView } = await this.renderResponse(
      this.createViewResponse("mock-page", viewData)
    );

    this.pageView = pageView;
    this.bindPageEvents();
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
    const actionResult = await this.client.addTask(event.detail ?? {});
    await this.refreshView(actionResult);
  }

  async handleToggleTask(event) {
    await this.client.toggleTask(event.detail ?? {});
    await this.refreshView();
  }

  async handleClearCompleted() {
    const actionResult = await this.client.clearCompletedTasks();
    await this.refreshView(actionResult);
  }

  async refreshView(actionResult = {}) {
    if (!this.pageView) {
      return;
    }

    const pageData = await this.client.getTodoPageData();
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
    const formState = actionResult.ui ?? fallbackForm ?? this.createDefaultFormState();

    return {
      title: pageData?.title || "To-Do App",
      labels: pageData?.labels || {},
      tasks: pageData?.tasks || [],
      infoItems: pageData?.infoItems || [],
      form: formState,
      notification: actionResult.notification ?? null,
    };
  }
}

export default MockController;
