/**
 * @SharedConstants
 */

export class SharedConstants {
  static getClassNameSuffixs() {
    return {
      factory: "Factory",
      dependencyProvider: "DependencyProvider",
      controller: "Controller",
      config: "Config",
      manager: "Manager",
      repository: "Repository",
      facade: "Facade",
      bridge: "Bridge",
      queryContainer: "QueryContainer",
      plugin: "Plugin",
      client: "Client",
      form: "Form",
    };
  }

  static getBundleLayers() {
    return {
      logic: "Logic",
      presentation: "Presentation",
      client: "Client",
      shared: "Shared",
      utils: "Utils",
      persistence: "Persistence",
    };
  }
}
