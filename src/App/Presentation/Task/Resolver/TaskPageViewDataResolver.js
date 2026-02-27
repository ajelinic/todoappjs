import { TaskPresentationConfig } from "../TaskPresentationConfig.js";

/**
 * @class TaskPageViewDataResolver
 * @description Resolves full task-page view data by coordinating form + service + client.
 */
export class TaskPageViewDataResolver {
  constructor(taskClient, taskPageViewDataService, taskPageForm) {
    this.taskClient = taskClient;
    this.taskPageViewDataService = taskPageViewDataService;
    this.taskPageForm = taskPageForm;
  }

  async resolve({ actionResult = null, fallbackForm = null, locale = "en-US" } = {}) {
    const resolvedLocale = this.resolveLocale(locale);
    const [tasks, localizedActionResult] = await Promise.all([
      this.taskClient.getTasks(),
      this.taskPageViewDataService.localizeActionResult(actionResult, resolvedLocale),
    ]);
    const pageData = await this.taskPageViewDataService.getPageData({
      tasks,
      locale: resolvedLocale,
    });
    const formState = this.taskPageForm.resolveState(localizedActionResult, fallbackForm);

    return this.taskPageViewDataService.createViewData({
      pageData,
      actionResult: localizedActionResult,
      formState,
      locale: resolvedLocale,
    });
  }

  resolveLocale(locale) {
    if (typeof locale === "string" && locale.trim().length > 0) {
      return locale.trim();
    }

    return TaskPresentationConfig.getDefaultLocale();
  }
}

export default TaskPageViewDataResolver;
