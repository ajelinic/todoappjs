/**
 * @AppCoreFactory
 */

import { AbstractFactory } from "./Abstracts/AbstractFactory.js";
import { AppCoreDependencyProvider } from "./AppCoreDependencyProvider.js";
import { ActionLoader } from "./Loader/ActionLoader/ActionLoader.js";
import { BundleLoader } from "./Loader/Bundle/BundleLoader.js";
import { MixinRegistry } from "./Mixins/MixinRegistry.js";
import { SharedConfig } from "./Shared/SharedConfig.js";
import { SharedConstants } from "./Shared/SharedConstants.js";

export class AppCoreFactory extends AbstractFactory {
  static KEY_SUFFIX = "_BUNDLES";

  static createBundleLoader() {
    return new BundleLoader(
      SharedConfig,
      SharedConstants,
      this.getBundleResolverPlugins(),
      this.KEY_SUFFIX
    );
  }

  static createActionLoader() {
    return new ActionLoader(
      SharedConfig,
      SharedConstants,
      this.getCallableResolverPlugins(),
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

  /**
   * @returns array<ActionResolverPluginInterface>
   */
  static getCallableResolverPlugins() {
    return AppCoreDependencyProvider.getProvidedDependency(
      AppCoreDependencyProvider.ACTION_RESOLVER_PLUGINS
    );
  }
}
