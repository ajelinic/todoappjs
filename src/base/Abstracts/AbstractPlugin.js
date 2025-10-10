/** AbstractPlugin */

import { ABSTRACT_CLASS_ERROR_MESSAGE } from "../Shared/KernelConstants.js";

export class AbstractPlugin {
  constructor() {
    if (this.constructor === AbstractPlugin) {
      throw new TypeError(ABSTRACT_CLASS_ERROR_MESSAGE);
    }
  }
}
