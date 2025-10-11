/**
 * @TaskInfoAddedAtHtmlCreatorPlugin
 * @deprecated Will be removed/changed in future releases
 */

import { InfoBarFactory } from "../../InfoBarFactory.js";

export class TaskInfoAddedAtHtmlCreatorPlugin {
  static execute(data) {
    return this.createHtmlTemplate(data);
  }

  static async createHtmlTemplate(data) {
    return `${
      (await InfoBarFactory.provideGlossary().getGlossaryData(
        "task.info.addedat.text"
      )) +
      " " +
      InfoBarFactory.provideDomElementCreator().createHtmlElement(
        "span",
        "taskID",
        "task-info-container__task--id",
        data.timeAdded
      ).outerHTML +
      " "
    }`;
  }
}
