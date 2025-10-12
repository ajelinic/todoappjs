import { ABSTRACT_CLASS_ERROR_MESSAGE } from "../Shared/AppCoreConstants.js";
import { SharedConfig } from "../Shared/SharedConfig.js";

export class AbstractClassResolver {
  constructor() {
    if (this.constructor === AbstractClassResolver) {
      throw new TypeError(ABSTRACT_CLASS_ERROR_MESSAGE);
    }
  }

  resolve(bundles) {
    const container = this.createContainer();
    container.set(this.bundleKey, this.resolvePath(bundles));

    return container;
  }

  resolvePath([]) {
    throw new Error(
      "Method 'resolvePath' must be implemented by concrete resolver classes."
    );
  }

  getAppNamespace() {
    return this.prototype.getAppNamespace();
  }

  createContainer() {
    return new Map();
  }

  setContainer(id, value) {
    this.createContainer().set(id, value);
  }

  getClassNameSuffix() {
    throw new Error(
      "Method 'getClassNameSuffix' must be implemented by concrete resolver classes."
    );
  }

  getHost() {
    return SharedConfig.getHost();
  }
}
