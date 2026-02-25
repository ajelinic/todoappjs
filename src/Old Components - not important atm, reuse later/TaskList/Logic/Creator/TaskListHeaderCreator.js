/**
 * @TaskListHeaderCreator
 * @deprecated Will be removed/changed in future releases
 */

/**
 * @class TaskListHeaderCreator
 * @description TaskListHeaderCreator
 */
export class TaskListHeaderCreator {
  constructor(dateHandler, domElementCreator, taskListDataProvider, glossary) {
    this.dateHandler = dateHandler;
    this.domElementCreator = domElementCreator;
    this.taskListDataProvider = taskListDataProvider;
    this.glossary = glossary;
  }

  async taskListCreateHeader() {
    let header = this.domElementCreator.createHtmlElement(
      "header",
      "header",
      "header"
    );
    this.taskListDataProvider.baseElement.appendChild(header);
    header.appendChild(await this.taskListHeaderCreateTitle());
  }

  async taskListHeaderCreateTitle() {
    let div = this.domElementCreator.createHtmlElement(
      "div",
      "header-title",
      "header__title--font"
    );
    div.innerText = await this.glossary.getGlossaryData("todoapp.title");
    return div;
  }
}
