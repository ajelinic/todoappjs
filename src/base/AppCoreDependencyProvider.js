/**
 * AppCoreDependencyProvider
 */

import { AbstractDependencyProvider } from "./Abstracts/AbstractDependencyProvider.js";
import { BundleResolverPluginInterface } from "./Bundles/Presentation/Resolvers/ResolverPlugins/ClassResolverPlugins/BundleResolverPluginInterface.js";
import { PresentationFactoryResolverPlugin } from "./Bundles/Presentation/Resolvers/ResolverPlugins/ClassResolverPlugins/PresentationFactoryResolverPlugin.js";
import { PresentationControllerResolverPlugin } from "./Bundles/Presentation/Resolvers/ResolverPlugins/ClassResolverPlugins/PresentationControllerResolverPlugin.js";
import { ActionResolverPluginInterface } from "./Bundles/Presentation/Resolvers/ResolverPlugins/ActionResolverPlugin/ActionResolverPluginInterface.js";
import { ActionResolverPlugin } from "./Bundles/Presentation/Resolvers/ResolverPlugins/ActionResolverPlugin/ActionResolverPlugin.js";

export class AppCoreDependencyProvider extends AbstractDependencyProvider {
  static BUNDLE_RESOLVER_PLUGINS = "BUNDLE_RESOLVER_PLUGINS";
  static ACTION_RESOLVER_PLUGINS = "ACTION_RESOLVER_PLUGINS";

  static provideDependencies(container) {
    container = this.provideBundleResolverPlugins(container);
    container = this.provideCallableResolverPlugins(container);

    return container;
  }

  static provideBundleResolverPlugins(container) {
    container.set(
      this.BUNDLE_RESOLVER_PLUGINS,
      this.getBundleResolverPlugins()
    );

    return container;
  }

  static provideCallableResolverPlugins(container) {
    container.set(
      this.ACTION_RESOLVER_PLUGINS,
      this.getCallableResolverPlugins()
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

  static getCallableResolverPlugins() {
    let callablesPlugins = [new ActionResolverPlugin()];

    callablesPlugins.forEach((plugin) => {
      ActionResolverPluginInterface(plugin);
    });

    return callablesPlugins;
  }
}
