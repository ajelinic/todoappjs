/**
 * @AbstractFactory
 */

export class AbstractFactory {
  constructor() {
    if (this.constructor === AbstractFactory) {
      throw new Error(ABSTRACT_CLASS_ERROR_MESSAGE);
    }
  }

  createContainer() {
    return new Set();
  }

  getProvidedDependency(key) {
    throw new Error(`Dependency not found: ${key}`);
  }
}
