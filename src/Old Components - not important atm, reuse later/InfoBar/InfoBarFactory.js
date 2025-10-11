/**
 * @InfoBarFactory
 * @deprecated Will be removed/changed in future releases
 */

import { DateTimeHandler } from "../Utils/DateTimeHandle/DateTimeHandler.js";
import { DomElementCreator } from "../Utils/DomElementCreate/DomElementCreator.js";
import { Glossary } from "../Utils/Glossary/Glossary.js";
import { InfoBarConnector } from "./InfoBarConnector.js";
import { InfoBarDataProvider } from "./InfoBarDataProvider.js";
import { InfoBarCreator } from "./Logic/Creator/InfoBarCreator.js";
import { TaskInfoCreator } from "./Logic/Creator/TaskInfoCreator.js";
import { TaskInfoAddedAtHtmlCreatorPlugin } from "./Logic/Plugins/TaskInfoAddedAtHtmlCreatorPlugin.js";
import { TaskInfoDueTimeHtmlCreatorPlugin } from "./Logic/Plugins/TaskInfoDueTimeHtmlCreatorPlugin.js";
import { TaskInfoIdHtmlCreatorPlugin } from "./Logic/Plugins/TaskInfoIdHtmlCreatorPlugin.js";
import { TaskInfoTitleHtmlCreatorPlugin } from "./Logic/Plugins/TaskInfoTitleHtmlCreatorPlugin.js";

export class InfoBarFactory {
  static createInfoBarCreator() {
    return new InfoBarCreator(
      this.addBaseElement(),
      this.provideDateHandler(),
      this.provideDomElementCreator()
    );
  }

  static createTaskInfoContainer() {
    return new TaskInfoCreator(
      this.addInfoContainerElement(),
      this.provideDomElementCreator(),
      InfoBarConnector,
      this.getTaskInfoHtmlCreatorPlugins()
    );
  }

  static provideDomElementCreator() {
    return DomElementCreator;
  }

  static provideGlossary() {
    return Glossary;
  }

  static provideDateHandler() {
    return DateTimeHandler;
  }

  static addBaseElement() {
    return InfoBarDataProvider.getBaseElement();
  }

  static addInfoContainerElement() {
    return InfoBarDataProvider.getInfoContainerElement();
  }

  static getTaskInfoHtmlCreatorPlugins() {
    return [
      TaskInfoIdHtmlCreatorPlugin,
      TaskInfoTitleHtmlCreatorPlugin,
      TaskInfoAddedAtHtmlCreatorPlugin,
      TaskInfoDueTimeHtmlCreatorPlugin,
    ];
  }
}
