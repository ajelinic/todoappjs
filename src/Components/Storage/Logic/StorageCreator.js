/**
 * @StorageCreator
 */

import { XmlParser } from "../../../Utils/FileParsers/XmlParser.js";
import { StorageConfig } from "../StorageConfig.js";
import { StorageFactory } from "../StorageFactory.js";

export class StorageCreator {
  async initStorage() {
    let request = await StorageFactory.createDBInitiator().initDatabase(
      StorageConfig.getDBName(),
      1
    );
    console.log(request);

    let dB;
    let dataTablesArray = this.getDataTablesArray(
      await XmlParser.parseDataFromXml(
        StorageConfig.pathToSchema() + StorageConfig.getSchema()
      )
    );

    request.onerror = (event) => {
      //TODO: Implement error handling
      alert(`Error: ${event.target.error}`);
    };

    request.onupgradeneeded = (event) => {
      dB = event.target.result;
      this.createStores(dB, dataTablesArray);
    };

    request.onsuccess = (event) => {
      dB = event.target.result;
      this.createStores(dB, dataTablesArray);
    };

    let createDB = new Promise((resolve, reject) => {
      resolve(request);
    });

    return await createDB;
  }

  getDataTablesArray(schemeData) {
    return schemeData.querySelectorAll("dataTable");
  }

  async createStores(dB, dataTablesArray) {
    for (let i = 0; i < dataTablesArray.length; i++) {
      let store;
      if (
        !dB.objectStoreNames.contains(
          dataTablesArray[i].getElementsByTagName("dataTableName")[0].innerHTML
        )
      ) {
        store = dB.createObjectStore(
          dataTablesArray[i].getElementsByTagName("dataTableName")[0].innerHTML,
          {
            keyPath:
              dataTablesArray[i].getElementsByTagName("keyPath")[0].innerHTML,
          }
        );
        this.createIndexes(store, dataTablesArray[i].children);
      }
    }
  }

  async createIndexes(store, dataTableParams) {
    for (let i = 0; i < dataTableParams.length; i++) {
      if (dataTableParams[i].tagName === "indexes") {
        let indexes = dataTableParams[i].children;
        for (let i = 0; i < indexes.length; i++) {
          await store.createIndex(
            indexes[i].innerHTML + "X",
            indexes[i].innerHTML,
            {
              unique: false,
            }
          );
        }
      }
    }
  }
}
