/**
 * @StorageSaver
 * @deprecated Will be removed/changed in future releases
 */

import { CsvParser } from "../../Utils/FileParsers/CsvParser.js";
import { StorageConfig } from "../StorageConfig.js";

export class StorageSaver {
  constructor(taskStorageManager, glossaryStorageManager) {
    this.taskStorageManager = taskStorageManager;
    this.glossaryStorageManager = glossaryStorageManager;
  }

  saveTaskToStorage(item) {
    let storingItem = {};
    storingItem["id"] = item.taskID.innerText;
    storingItem["taskValue"] = item.taskValue.innerText;
    storingItem["dueTime"] = item.dueTime;
    storingItem["timeAdded"] = item.timeAdded.innerText;
    storingItem["checked"] = item.checkbox.checked;
    return this.taskStorageManager.saveTask(storingItem);
  }

  async importData() {
    let glossaryArray = await CsvParser.parseDataFromCsv(
      StorageConfig.pathToDataFile() + StorageConfig.getGlossaryFile()
    );

    return this.glossaryStorageManager.importGlossaryData(glossaryArray);
  }
}
