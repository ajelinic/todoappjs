/**
 * @TaskListHeaderCreator
 */

import { DateHandler } from "../../../../Utils/Date/DateHandler.js";
import { DomElementCreator } from "../../../../Utils/DomElementCreate/DomElementCreator.js";

export class TaskListHeaderCreator {
  constructor(baseElement) {
    this.baseElement = baseElement;
  }

  taskListCreateMain() {
    let header = DomElementCreator.createHtmlElement(
      "header",
      "header",
      "header header--title"
    );
    this.baseElement[0].appendChild(header);
    header.appendChild(this.taskListHeaderCreateTitle());
    header.appendChild(this.taskListCreateClock());
  }

  taskListHeaderCreateTitle() {
    let div = DomElementCreator.createHtmlElement(
      "div",
      "title",
      "title title--font"
    );
    div.innerText = "To-Do App";
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
