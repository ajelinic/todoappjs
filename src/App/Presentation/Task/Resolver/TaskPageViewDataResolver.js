import { TaskActionResultTransfer } from "../../../Shared/Task/Transfer/TaskActionResultTransfer.js";
import { TaskCollectionTransfer } from "../../../Shared/Task/Transfer/TaskCollectionTransfer.js";
import { TaskPresentationConfig } from "../TaskPresentationConfig.js";

/**
 * @class TaskPageViewDataResolver
 * @description Resolves full task-page view data by coordinating form + builder + client.
 */
export class TaskPageViewDataResolver {
  constructor(taskClient, taskPageViewDataBuilder, taskPageForm) {
    this.taskClient = taskClient;
    this.taskPageViewDataBuilder = taskPageViewDataBuilder;
    this.taskPageForm = taskPageForm;
  }

  async resolve({ actionResult = null, fallbackForm = null, locale = "en-US" } = {}) {
    const resolvedLocale = this.resolveLocale(locale);
    const normalizedActionResult = TaskActionResultTransfer.from(actionResult).toObject();
    const [taskCollectionTransfer, localizedActionResult] = await Promise.all([
      this.taskClient.getTasks(),
      this.taskPageViewDataBuilder.localizeActionResult(
        normalizedActionResult,
        resolvedLocale
      ),
    ]);
    const tasks = TaskCollectionTransfer.from(taskCollectionTransfer).toArray();
    const pageData = await this.taskPageViewDataBuilder.getPageData({
      tasks,
      locale: resolvedLocale,
    });
    const formState = this.taskPageForm.resolveState(localizedActionResult, fallbackForm);

    return this.taskPageViewDataBuilder.createViewData({
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
