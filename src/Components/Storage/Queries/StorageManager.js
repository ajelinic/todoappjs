/**
 * @StorageManager
 */

import { StorageConnector } from "../StorageConnector.js";
import { StorageConfig } from "../StorageConfig.js";
import { StorageFactory } from "../StorageFactory.js";

export class StorageManager {
  saveTaskToStorage(item) {
    let storingItem = {};
    storingItem["id"] = StorageConnector.getTaskArrLength();
    storingItem["taskValue"] = item.taskValue.innerText;
    storingItem["dueTime"] = item.dueTime;
    storingItem["timeAdded"] = item.timeAdded.innerText;
    storingItem["checked"] = item.checkbox.checked;

    let taskArr = StorageFactory.getTasksArray();
    taskArr.push(storingItem);

    return localStorage.setItem(
      StorageConfig.setTasks(),
      JSON.stringify(taskArr)
    );
  }

  deleteTaskFromStorage(id) {
    let taskArr = StorageFactory.getTasksArray();
    taskArr.splice(id, 1);

    taskArr.forEach((item, key) => {
      Object.keys(item).forEach((objKey) => {
        if (objKey === "id") {
          item[objKey] = key;
        }
      });
    });

    return localStorage.setItem(
      StorageConfig.setTasks(),
      JSON.stringify(taskArr)
    );
  }

  updateTask(id, checked) {
    let taskArr = StorageFactory.getTasksArray();

    for (let i = 0; i < taskArr.length; i++) {
      if (i == id) {
        Object.keys(taskArr[i]).forEach((objKey) => {
          if (objKey === "checked") {
            taskArr[i][objKey] = checked;
          }
        });
      }
    }

    return localStorage.setItem(
      StorageConfig.setTasks(),
      JSON.stringify(taskArr)
    );
  }
}
