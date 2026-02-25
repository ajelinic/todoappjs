/**
 * AbstractConfig
 */

import { ABSTRACT_CLASS_ERROR_MESSAGE } from "../Shared/AppCoreConstants.js";

/**
 * @class AbstractConfig
 * @description AbstractConfig
 */
export class AbstractConfig {
  constructor() {
    if (this.constructor === AbstractConfig) {
      throw new TypeError(ABSTRACT_CLASS_ERROR_MESSAGE);
    }
  }

  static get(key) {
    return this.prototype.getConfig().get(key);
  }
}
