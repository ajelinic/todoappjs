/**
 * AbstractConfig
 */

import { ABSTRACT_CLASS_ERROR_MESSAGE } from "../Application/ApplicationConstants.js";

export class AbstractConfig {
  constructor() {
    if (this.constructor === AbstractConfig) {
      throw new Error(ABSTRACT_CLASS_ERROR_MESSAGE);
    }
  }

  static get(key) {
    return this.prototype.getConfig().get(key);
  }
}
