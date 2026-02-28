import {
  TaskGlossaryKeyConstants,
} from "../../../Shared/Task/TaskGlossaryKeyConstants.js";

/**
 * @class TaskPageViewDataBuilder
 * @description Builds task page view data and localized notifications.
 */
export class TaskPageViewDataBuilder {
  constructor(glossaryClient) {
    this.glossaryClient = glossaryClient;
  }

  createViewData({ pageData, actionResult = {}, formState = {}, locale = "en-US" }) {
    const normalizedActionResult = actionResult ?? {};

    return {
      title: pageData.title,
      labels: pageData.labels,
      tasks: pageData.tasks,
      infoItems: pageData.infoItems,
      locale,
      form: formState,
      notification: normalizedActionResult.notification ?? null,
    };
  }

  async getPageData({ tasks = [], locale = "en-US" }) {
    const glossary = await this.transList(TaskGlossaryKeyConstants.getTaskPageKeys(), locale);

    return {
      title: glossary[TaskGlossaryKeyConstants.TITLE],
      labels: {
        add: glossary[TaskGlossaryKeyConstants.ADD],
        due: glossary[TaskGlossaryKeyConstants.DUE],
        clear: glossary[TaskGlossaryKeyConstants.CLEAR],
        noDue: glossary[TaskGlossaryKeyConstants.NO_DUE],
        delete: glossary[TaskGlossaryKeyConstants.DELETE],
        placeholder: glossary[TaskGlossaryKeyConstants.PLACEHOLDER],
      },
      tasks,
      infoItems: await this.buildTaskInfoItems(tasks, glossary, locale),
    };
  }

  async localizeActionResult(actionResult = {}, locale = "en-US") {
    const normalizedActionResult = actionResult ?? {};

    return {
      ...normalizedActionResult,
      notification: await this.localizeNotification(
        normalizedActionResult.notification,
        locale
      ),
    };
  }

  async buildTaskInfoItems(tasks, glossary, locale) {
    const sortedTasks = [...tasks].sort((left, right) => right.id - left.id);

    return Promise.all(
      sortedTasks.map(async (task) => {
        return {
          id: task.id,
          text: await this.formatTaskInfo(task, glossary, locale),
        };
      })
    );
  }

  async formatTaskInfo(task, glossary, locale) {
    const taskTemplate = TaskGlossaryKeyConstants.INFO_TEMPLATE;
    const taskDueText = glossary[TaskGlossaryKeyConstants.INFO_DUE_TIME];
    const taskNoDueText = glossary[TaskGlossaryKeyConstants.INFO_NO_DUE_TIME];

    const dueText = Number.isFinite(task.dueTime)
      ? `${taskDueText} ${new Date(task.dueTime).toLocaleString(locale)}`
      : taskNoDueText;

    return this.trans(taskTemplate, locale, {
      task_id: task.id,
      task_value: task.taskValue,
      due_text: dueText,
      added_at: task.timeAdded,
    });
  }

  async localizeNotification(notification, locale) {
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
      value: await this.trans(notification.key, locale),
    };
  }

  async trans(key, locale, parameters = {}) {
    return this.glossaryClient.getText(key, key, {
      locale,
      parameters,
    });
  }

  async transList(keys, locale) {
    const entries = keys.map((key) => ({
      key,
      fallback: key,
    }));

    return this.glossaryClient.getTexts(entries, {
      locale,
    });
  }
}

export default TaskPageViewDataBuilder;
