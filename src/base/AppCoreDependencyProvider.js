/**
 * AppCoreDependencyProvider
 */

import { AbstractDependencyProvider } from "./Abstracts/AbstractDependencyProvider.js";
import { BundleResolverPluginInterface } from "./Bundles/Presentation/Resolvers/ResolverPlugins/ClassResolverPlugins/BundleResolverPluginInterface.js";
import { PresentationControllerResolverPlugin } from "./Bundles/Presentation/Resolvers/ResolverPlugins/ClassResolverPlugins/PresentationControllerResolverPlugin.js";
import { SharedEntryResolverPlugin } from "./Bundles/Shared/Resolvers/ResolverPlugins/ClassResolverPlugins/SharedEntryResolverPlugin.js";

/**
 * @class AppCoreDependencyProvider
 * @description AppCoreDependencyProvider
 */
export class AppCoreDependencyProvider extends AbstractDependencyProvider {
  static BUNDLE_RESOLVER_PLUGINS = "BUNDLE_RESOLVER_PLUGINS";

  static provideDependencies(container) {
    container = this.provideBundleResolverPlugins(container);

    return container;
  }

  static provideBundleResolverPlugins(container) {
    container.set(
      this.BUNDLE_RESOLVER_PLUGINS,
      this.getBundleResolverPlugins()
    );

    return container;
  }

  static getBundleResolverPlugins() {
    let resolverPlugins = [
      new SharedEntryResolverPlugin(),
      new PresentationControllerResolverPlugin(),
    ];

    resolverPlugins.forEach((plugin) => {
      BundleResolverPluginInterface(plugin);
    });

    return resolverPlugins;
  }
}
