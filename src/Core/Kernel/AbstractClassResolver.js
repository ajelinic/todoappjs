import { ABSTRACT_CLASS_ERROR_MESSAGE } from "../Application/ApplicationConstants.js";

export class AbstractClassResolver {
  constructor() {
    if (this.constructor === AbstractClassResolver) {
      throw new TypeError(ABSTRACT_CLASS_ERROR_MESSAGE);
    }
  }

  static resolvePath([]) {
    throw new Error(
      "Method 'resolvePath' must be implemented by concrete resolver classes."
    );
  }

  static getAppNamespace() {
    return this.prototype.getAppNamespace();
  }
}
