/**
 * @Glossary
 */

import { StorageConnector } from "../../Components/Storage/StorageConnector.js";

export class Glossary {
  static async getGlossaryData(key) {
    return await StorageConnector.getGlossaryValue(key);
  }
}
