import { ABSTRACT_CLASS_ERROR_MESSAGE } from "../Shared/AppCoreConstants.js";

/**
 * @class AbstractQueryContainer
 * @description AbstractQueryContainer
 */
export class AbstractQueryContainer {
  constructor() {
    if (new.target === AbstractQueryContainer) {
      throw new TypeError(ABSTRACT_CLASS_ERROR_MESSAGE);
    }
  }

  requestToPromise(request) {
    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => resolve(event.target.result);
      request.onerror = () => reject(request.error);
    });
  }
}
