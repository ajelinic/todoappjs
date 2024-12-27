/**
 * AbstractDependencyProvider
 */

export class AbstractDependencyProvider {
  static setDependencies() {
    this.prototype.setProvidedDependencies(this.provideDependencies());
  }

  static provideDependencies() {
    let container = this.createContainer();
    return container;
  }

  static createContainer() {
    return this.prototype.createContainer();
  }
}
