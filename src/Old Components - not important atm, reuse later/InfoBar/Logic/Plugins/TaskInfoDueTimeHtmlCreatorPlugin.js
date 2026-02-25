/**
 * @TaskInfoDueTimeHtmlCreatorPlugin
 * @deprecated Will be removed/changed in future releases
 */

import { InfoBarFactory } from "../../InfoBarFactory.js";

/**
 * @class TaskInfoDueTimeHtmlCreatorPlugin
 * @description TaskInfoDueTimeHtmlCreatorPlugin
 */
export class TaskInfoDueTimeHtmlCreatorPlugin {
  static execute(data) {
    return this.createHtmlTemplate(data);
  }

  static async createHtmlTemplate(data) {
    if (Number.isInteger(data.dueTime)) {
      return `${
        (await InfoBarFactory.provideGlossary().getGlossaryData(
          "task.info.duetime.text"
        )) +
        " " +
        InfoBarFactory.provideDomElementCreator().createHtmlElement(
          "span",
          "taskID",
          "task-info-container__task--id",
          InfoBarFactory.provideDateHandler().convertMillisToDate(data.dueTime)
        ).outerHTML
      }`;
    } else {
      return await InfoBarFactory.provideGlossary().getGlossaryData(
        "task.info.noduetime.text"
      );
    }
  }
}
