import { AbstractFactory } from "./AbstractFactory.js";

/**
 * @class AbstractPresentationFactory
 * @description Base factory for presentation-layer bundles.
 */
export class AbstractPresentationFactory extends AbstractFactory {
  static getConfig() {
    if (!this.CONFIG_CLASS) {
      throw new Error("[AbstractPresentationFactory] CONFIG_CLASS is not defined.");
    }

    return this.CONFIG_CLASS;
  }

  static getDependencyProvider() {
    if (!this.DEPENDENCY_PROVIDER_CLASS) {
      throw new Error(
        "[AbstractPresentationFactory] DEPENDENCY_PROVIDER_CLASS is not defined."
      );
    }

    return this.DEPENDENCY_PROVIDER_CLASS;
  }

  static getProvidedDependency(key) {
    const cache = this.getDependencyCache();
    if (cache.has(key)) {
      return cache.get(key);
    }

    const dependency = this.getDependencyProvider().getProvidedDependency(key);
    const resolvedDependency =
      typeof dependency === "function" ? dependency() : dependency;

    cache.set(key, resolvedDependency);
    return resolvedDependency;
  }

  static getDependencyCache() {
    if (!Object.prototype.hasOwnProperty.call(this, "resolvedDependencies")) {
      this.resolvedDependencies = new Map();
    }

    return this.resolvedDependencies;
  }
}

export default AbstractPresentationFactory;
