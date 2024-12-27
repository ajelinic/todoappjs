/**
 * @AbstractFactory
 */

export class AbstractFactory {
  constructor() {
    if (this.constructor === AbstractFactory) {
      throw new Error(ABSTRACT_CLASS_ERROR_MESSAGE);
    }
  }

  static getProvidedDependency(key) {
    return this.prototype.getProvidedDependency(key);
  }
}
