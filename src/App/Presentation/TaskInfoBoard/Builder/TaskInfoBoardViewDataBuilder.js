import {
  TaskInfoBoardGlossaryKeyConstants,
} from "../../../Shared/TaskInfoBoard/TaskInfoBoardGlossaryKeyConstants.js";

/**
 * @class TaskInfoBoardViewDataBuilder
 * @description Builds task info board view data.
 */
export class TaskInfoBoardViewDataBuilder {
  constructor(glossaryClient) {
    this.glossaryClient = glossaryClient;
  }

  async getViewData({ tasks = [], locale = "en-US" }) {
    const glossary = await this.transList(
      TaskInfoBoardGlossaryKeyConstants.getTaskInfoBoardKeys(),
      locale
    );

    return {
      infoItems: await this.buildTaskInfoItems(tasks, glossary, locale),
      locale,
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
    const taskTemplate = TaskInfoBoardGlossaryKeyConstants.INFO_TEMPLATE;
    const taskDueText = glossary[TaskInfoBoardGlossaryKeyConstants.INFO_DUE_TIME];
    const taskNoDueText = glossary[TaskInfoBoardGlossaryKeyConstants.INFO_NO_DUE_TIME];

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

export default TaskInfoBoardViewDataBuilder;
