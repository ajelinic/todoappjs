import { ABSTRACT_CLASS_ERROR_MESSAGE } from "../Shared/AppCoreConstants.js";

/**
 * @class AbstractClient
 * @description AbstractClient
 */
export class AbstractClient {
  constructor() {
    if (new.target === AbstractClient) {
      throw new TypeError(ABSTRACT_CLASS_ERROR_MESSAGE);
    }
  }

  getFactory() {
    throw new Error(
      "Method 'getFactory' must be implemented by concrete client classes."
    );
  }
}
