/**
 * @TaskListHeaderCreator
 */

import { DateHandler } from "../../../../Utils/Date/DateHandler.js";
import { DomElementCreator } from "../../../../Utils/DomElementCreate/DomElementCreator.js";
import { Glossary } from "../../../../Utils/Glossary/Glossary.js";

export class TaskListHeaderCreator {
  constructor(baseElement) {
    this.baseElement = baseElement;
  }

  async taskListCreateHeader() {
    let header = DomElementCreator.createHtmlElement(
      "header",
      "header",
      "header header--title"
    );
    this.baseElement[0].appendChild(header);
    header.appendChild(await this.taskListHeaderCreateTitle());
    header.appendChild(this.taskListCreateClock());
  }

  async taskListHeaderCreateTitle() {
    let div = DomElementCreator.createHtmlElement(
      "div",
      "title",
      "title title--font"
    );
    div.innerText = await Glossary.getGlossaryData("todoapp.title");
    debugger;
    return div;
  }

  taskListCreateClock() {
    let clockDiv = DomElementCreator.createHtmlElement(
      "div",
      "clock",
      "clock clock--position"
    );
    setInterval(function () {
      clockDiv.innerHTML = DateHandler.clock();
    }, 1000);
    return clockDiv;
  }
}
