/**
 * @TaskInfoCreator
 */

export class TaskInfoCreator {
  constructor(
    taskInfoContainer,
    domElementCreator,
    infoBarConnector,
    infoHtmlCreatorPlugins
  ) {
    this.taskInfoContainer = taskInfoContainer;
    this.domElementCreator = domElementCreator;
    this.infoBarConnector = infoBarConnector;
    this.infoHtmlCreatorPlugins = infoHtmlCreatorPlugins;
  }

  renderTasksToInfoList() {
    let taskInfoDataList = this.domElementCreator.createHtmlElement(
      "ul",
      "task-info-data",
      "task-info-data"
    );
    this.gatherInfoData(taskInfoDataList);
    this.taskInfoContainer.appendChild(taskInfoDataList);
  }

  async renderLastAddedTask() {
    let lastAddedTask = await this.infoBarConnector.getLastEnteredTask();
    let taskInfoDataList = this.queryTaskInfoData();
    this.generateTaskInfoHtml(lastAddedTask.value, taskInfoDataList);
  }

  async gatherInfoData(taskInfoData) {
    let taskInfo;
    let taskArr = this.infoBarConnector.getTaskInfo();
    await taskArr.then((result) => {
      result.forEach((element) => {
        taskInfo = this.generateTaskInfoHtml(element, taskInfoData);
      });
    });
  }

  generateTaskInfoHtml(taskData, taskInfoData) {
    let listElement = this.createListElement();
    let spanElement = this.createSpanElement();
    let generatedHtml = "";
    for (const htmlCreatorPlugin of this.infoHtmlCreatorPlugins) {
      htmlCreatorPlugin.execute(taskData).then((result) => {
        spanElement.innerHTML = generatedHtml += result;
        listElement.appendChild(spanElement);
        taskInfoData.prepend(listElement);
      });
    }
  }

  createListElement() {
    return this.domElementCreator.createHtmlElement(
      "li",
      "info-task-item",
      "task-info-data__task"
    );
  }

  createSpanElement() {
    return this.domElementCreator.createHtmlElement(
      "span",
      "info-task-item-data",
      "task-info-data__task--data"
    );
  }

  queryTaskInfoData() {
    return document.querySelector(".task-info-data");
  }
}
