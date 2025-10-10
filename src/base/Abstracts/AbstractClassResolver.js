import { ABSTRACT_CLASS_ERROR_MESSAGE } from "../Shared/AppCoreConstants.js";
import { SharedConfig } from "../Shared/SharedConfig.js";

export class AbstractClassResolver {
  constructor() {
    if (this.constructor === AbstractClassResolver) {
      throw new TypeError(ABSTRACT_CLASS_ERROR_MESSAGE);
    }
  }

  static CLASS_SUFFIX_KEY;
  static BUNDLE_KEY;

  static resolve(bundles) {
    if (this.BUNDLE_KEY === undefined) {
      throw new Error(
        "BUNDLE_KEY is not defined in concrete resolver classes."
      );
    }

    const container = this.createContainer();
    container.set(this.BUNDLE_KEY, this.resolvePath(bundles));

    return container;
  }

  static resolvePath([]) {
    throw new Error(
      "Method 'resolvePath' must be implemented by concrete resolver classes."
    );
  }

  static getAppNamespace() {
    return this.prototype.getAppNamespace();
  }

  static createContainer() {
    return new Map();
  }

  static setContainer(id, value) {
    this.createContainer().set(id, value);
  }

  static getClassNameSuffix() {
    throw new Error(
      "Method 'getClassNameSuffix' must be implemented by concrete resolver classes."
    );
  }

  static getHost() {
    return SharedConfig.getHost();
  }
}
