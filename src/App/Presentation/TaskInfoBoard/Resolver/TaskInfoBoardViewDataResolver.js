import { TaskCollectionTransfer } from "../../../Shared/Task/Transfer/TaskCollectionTransfer.js";
import { TaskInfoBoardPresentationConfig } from "../TaskInfoBoardPresentationConfig.js";

/**
 * @class TaskInfoBoardViewDataResolver
 * @description Resolves task info board view data from locale + tasks.
 */
export class TaskInfoBoardViewDataResolver {
  constructor(taskClient, languageSwitcherClient, taskInfoBoardViewDataBuilder) {
    this.taskClient = taskClient;
    this.languageSwitcherClient = languageSwitcherClient;
    this.taskInfoBoardViewDataBuilder = taskInfoBoardViewDataBuilder;
  }

  async resolve({ tasks = null, locale = null } = {}) {
    const resolvedLocale = await this.resolveLocale(locale);
    const resolvedTasks = await this.resolveTasks(tasks);

    return this.taskInfoBoardViewDataBuilder.getViewData({
      tasks: resolvedTasks,
      locale: resolvedLocale,
    });
  }

  async resolveTasks(tasks) {
    if (Array.isArray(tasks)) {
      return tasks;
    }

    const taskCollectionTransfer = await this.taskClient.getTasks();
    return TaskCollectionTransfer.from(taskCollectionTransfer).toArray();
  }

  async resolveLocale(locale) {
    if (typeof locale === "string" && locale.trim().length > 0) {
      return locale.trim();
    }

    const clientLocale = await this.languageSwitcherClient.getCurrentLocale();

    if (typeof clientLocale === "string" && clientLocale.trim().length > 0) {
      return clientLocale.trim();
    }

    return TaskInfoBoardPresentationConfig.getDefaultLocale();
  }
}

export default TaskInfoBoardViewDataResolver;
