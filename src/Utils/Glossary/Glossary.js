/**
 * @Glossary
 */

import { StorageConnector } from "../../Old Components - not important atm, reuse later/Storage/StorageConnector.js";

export class Glossary {
  static async getGlossaryData(key) {
    return await StorageConnector.getGlossaryValue(key);
  }
}
