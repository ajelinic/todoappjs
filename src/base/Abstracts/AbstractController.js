/**
 * AbstractController
 */

import { ABSTRACT_CLASS_ERROR_MESSAGE } from "../Shared/AppCoreConstants.js";

/**
 * @class AbstractController
 * @description AbstractController
 */
export class AbstractController {
  constructor() {
    if (this.constructor === AbstractController) {
      throw new TypeError(ABSTRACT_CLASS_ERROR_MESSAGE);
    }
  }

  static view(component, data, mountSelector) {
    this.prototype.view(component, data, mountSelector);
  }
}
