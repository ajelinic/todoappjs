/**
 * @AbstractFactory
 */

import { ABSTRACT_CLASS_ERROR_MESSAGE } from "../Shared/AppCoreConstants.js";

export class AbstractFactory {
  constructor() {
    if (this.constructor === AbstractFactory) {
      throw new TypeError(ABSTRACT_CLASS_ERROR_MESSAGE);
    }
  }
}
