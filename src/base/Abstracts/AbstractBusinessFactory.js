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

  static getConfig() {
    if (!this.CONFIG_CLASS) {
      throw new Error("[AbstractBusinessFactory] CONFIG_CLASS is not defined.");
    }

    return this.CONFIG_CLASS;
  }

  static getDependencyProvider() {
    if (!this.DEPENDENCY_PROVIDER_CLASS) {
      throw new Error(
        "[AbstractBusinessFactory] DEPENDENCY_PROVIDER_CLASS is not defined."
      );
    }

    return this.DEPENDENCY_PROVIDER_CLASS;
  }

  static getProvidedDependency(key) {
    const dependencyCache = this.getDependencyCache();

    if (dependencyCache.has(key)) {
      return dependencyCache.get(key);
    }

    const dependency = this.getDependencyProvider().getProvidedDependency(key);
    const resolvedDependency =
      typeof dependency === "function" ? dependency() : dependency;

    dependencyCache.set(key, resolvedDependency);
    return resolvedDependency;
  }

  static getDependencyCache() {
    if (!Object.prototype.hasOwnProperty.call(this, "resolvedDependencies")) {
      this.resolvedDependencies = new Map();
    }

    return this.resolvedDependencies;
  }
}
