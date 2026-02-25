import { ABSTRACT_CLASS_ERROR_MESSAGE } from "../Shared/AppCoreConstants.js";

/**
 * @class AbstractRepository
 * @description AbstractRepository
 */
export class AbstractRepository {
  constructor(queryContainer) {
    if (new.target === AbstractRepository) {
      throw new TypeError(ABSTRACT_CLASS_ERROR_MESSAGE);
    }

    this.queryContainer = queryContainer;
  }
}
