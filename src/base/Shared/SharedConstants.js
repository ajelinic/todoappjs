/**
 * @SharedConstants
 */

/**
 * @class SharedConstants
 * @description SharedConstants
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
      business: "Business",
      presentation: "Presentation",
      client: "Client",
      shared: "Shared",
      service: "Service",
      persistence: "Persistence",
    };
  }
}
