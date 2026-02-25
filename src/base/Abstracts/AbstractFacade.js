import { ABSTRACT_CLASS_ERROR_MESSAGE } from "../Shared/AppCoreConstants.js";

/**
 * @class AbstractFacade
 * @description AbstractFacade
 */
export class AbstractFacade {
  constructor() {
    if (new.target === AbstractFacade) {
      throw new TypeError(ABSTRACT_CLASS_ERROR_MESSAGE);
    }
  }

  getFactory() {
    throw new Error(
      "Method 'getFactory' must be implemented by concrete facade classes."
    );
  }
}
