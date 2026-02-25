/**
 * @Glossary
 * @deprecated Will be removed/changed in future releases
 */

import { StorageConnector } from "../../Storage/StorageConnector.js";

/**
 * @class Glossary
 * @description Glossary
 */
export class Glossary {
  static async getGlossaryData(key) {
    return await StorageConnector.getGlossaryValue(key);
  }
}
