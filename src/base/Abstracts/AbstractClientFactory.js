import { ABSTRACT_CLASS_ERROR_MESSAGE } from "../Shared/AppCoreConstants.js";

/**
 * @class AbstractClientFactory
 * @description AbstractClientFactory
 */
export class AbstractClientFactory {
  constructor() {
    if (new.target === AbstractClientFactory) {
      throw new TypeError(ABSTRACT_CLASS_ERROR_MESSAGE);
    }
  }
}
