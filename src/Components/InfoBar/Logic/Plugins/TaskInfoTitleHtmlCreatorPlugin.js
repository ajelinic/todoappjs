/**
 * @TaskInfoTitleHtmlCreatorPlugin
 */

import { InfoBarFactory } from "../../InfoBarFactory.js";

export class TaskInfoTitleHtmlCreatorPlugin {
  static execute(data) {
    return this.createHtmlTemplate(data);
  }

  static async createHtmlTemplate(data) {
    return `${
      (await InfoBarFactory.provideGlossary().getGlossaryData(
        "task.info.title.text"
      )) +
      " " +
      InfoBarFactory.provideDomElementCreator().createHtmlElement(
        "span",
        "taskID",
        "task-info-container__task--id",
        data.taskValue
      ).outerHTML +
      " "
    }`;
  }
}
