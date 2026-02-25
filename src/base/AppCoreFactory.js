/**
 * @AppCoreFactory
 */

import { AbstractFactory } from "./Abstracts/AbstractFactory.js";
import { AppCoreDependencyProvider } from "./AppCoreDependencyProvider.js";
import { BundleLoader } from "./Loader/Bundle/BundleLoader.js";
import { MixinRegistry } from "./Mixins/MixinRegistry.js";
import { SharedConstants } from "./Shared/SharedConstants.js";
import { SharedConfig } from "./Shared/SharedConfig.js";

/**
 * @class AppCoreFactory
 * @description AppCoreFactory
 */
export class AppCoreFactory extends AbstractFactory {
  static KEY_SUFFIX = "_BUNDLES";

  /**
   *
   * @returns BundleLoader
   */
  static createBundleLoader() {
    return new BundleLoader(
      SharedConfig,
      SharedConstants,
      this.getBundleResolverPlugins(),
      this.KEY_SUFFIX
    );
  }

  static createMixinRegistry() {
    return new MixinRegistry();
  }

  /**
   * @returns array<BundleResolverPluginInterface>
   */
  static getBundleResolverPlugins() {
    return AppCoreDependencyProvider.getProvidedDependency(
      AppCoreDependencyProvider.BUNDLE_RESOLVER_PLUGINS
    );
  }
}
