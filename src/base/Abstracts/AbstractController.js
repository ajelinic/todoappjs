/**
 * AbstractController
 */

import { ABSTRACT_CLASS_ERROR_MESSAGE } from "../Shared/AppCoreConstants.js";

export class AbstractController {
  constructor() {
    if (this.constructor === AbstractConfig) {
      throw new TypeError(ABSTRACT_CLASS_ERROR_MESSAGE);
    }
  }

  static view(component, data, mountSelector) {
    this.prototype.view(component, data, mountSelector);
  }
}
