/**
 * @AppCoreFactory
 */

import { AbstractFactory } from "./Abstracts/AbstractFactory.js";
import { AppCoreDependencyProvider } from "./AppCoreDependencyProvider.js";

export class AppCoreFactory extends AbstractFactory {
  /**
   * @returns array<BundleResolverPluginInterface>
   */
  static getBundleResolverPlugins() {
    return AppCoreDependencyProvider.getProvidedDependency(
      AppCoreDependencyProvider.BUNDLE_RESOLVER_PLUGINS
    );
  }
}
