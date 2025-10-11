/**
 * AbstractDependencyProvider
 */

export class AbstractDependencyProvider {
  constructor() {
    if (this.constructor === AbstractDependencyProvider) {
      throw new TypeError(ABSTRACT_CLASS_ERROR_MESSAGE);
    }
  }

  static container = new Map();

  static provideDependencies() {
    throw new Error(
      "Method 'provideDependencies' must be implemented by concrete dependency provider classes."
    );
  }

  static getProvidedDependency(key) {
    let dependencyContainer = this.setProvidedDependencies();
    return dependencyContainer.get(key);
  }

  static setProvidedDependencies() {
    return this.provideDependencies(this.container);
  }
}
