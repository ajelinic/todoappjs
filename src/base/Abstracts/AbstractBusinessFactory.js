import { ABSTRACT_CLASS_ERROR_MESSAGE } from "../Shared/AppCoreConstants.js";

/**
 * @class AbstractBusinessFactory
 * @description AbstractBusinessFactory
 */
export class AbstractBusinessFactory {
  constructor() {
    if (new.target === AbstractBusinessFactory) {
      throw new TypeError(ABSTRACT_CLASS_ERROR_MESSAGE);
    }
  }
}
