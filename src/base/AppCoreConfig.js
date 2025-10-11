/**
 * @AppCoreConfig
 */

import * as obj from "../../data/config/config_default.js";

export class AppCoreConfig {
  static get(key = null) {
    if (key === null) {
      return null;
    }

    let props = Object.getOwnPropertyNames(obj).filter(
      (prop) => prop !== "constructor" && typeof prop !== "function"
    );

    for (let i = 0; i < props.length; i++) {
      if (props[i] === key) {
        return obj[props[i]];
      }
    }
  }
}
