/**
 * @AppCoreConfig
 */

import * as obj from "../../data/config/config_default.js";

/**
 * @class AppCoreConfig
 * @description AppCoreConfig
 */
export class AppCoreConfig {
  static get(key = null) {
    if (key === null) {
      return null;
    }

    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      return undefined;
    }

    return obj[key];
  }
}
