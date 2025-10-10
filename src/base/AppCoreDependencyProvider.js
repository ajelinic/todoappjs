/**
 * AppCoreDependencyProvider
 */

import { AbstractDependencyProvider } from "./Abstracts/AbstractDependencyProvider.js";
import { BundleResolverPluginInterface } from "./Bundles/BundleResolverPluginInterface.js";
import { PresentationFactoryResolverPlugin } from "./Bundles/Presentation/Resolvers/Plugin/PresentationFactoryResolverPlugin.js";
import { PresentationControllerResolverPlugin } from "./Bundles/Presentation/Resolvers/Plugin/PresentationControllerResolverPlugin.js";

export class AppCoreDependencyProvider extends AbstractDependencyProvider {
  APPLICATION_RESOLVER_PLUGINS = "APPLICATION_RESOLVER_PLUGINS";

  static provideDependencies(container) {
    container = this.provideBundleResolverPlugins(container);

    return container;
  }

  static provideBundleResolverPlugins(container) {
    container.set(
      this.APPLICATION_RESOLVER_PLUGINS,
      this.getBundleResolverPlugins()
    );

    return container;
  }

  static getBundleResolverPlugins() {
    let resolverPlugins = [
      new PresentationFactoryResolverPlugin(),
      new PresentationControllerResolverPlugin(),
    ];

    resolverPlugins.forEach((plugin) => {
      BundleResolverPluginInterface(plugin);
    });

    return resolverPlugins;
  }
}
