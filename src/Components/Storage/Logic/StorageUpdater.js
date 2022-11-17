/**
 * @StorageUpdater
 */

import { StorageConnector } from "../StorageConnector.js";

export class StorageUpdater {
  constructor(storageManager) {
    this.storageManager = storageManager;
  }

  async updateTaskStatus(item) {
    let updatedItem = {};
    updatedItem["id"] = item.children.taskID.innerText;
    updatedItem["taskValue"] = item.children.task.innerText;
    updatedItem["dueTime"] = await StorageConnector.getDueTime(
      item.children.taskID.innerText
    );
    updatedItem["timeAdded"] = item.children.timeAdded.innerText;
    updatedItem["checked"] = item.children.checkbox.checked;

    return this.storageManager.updateTask(updatedItem);
  }
}
