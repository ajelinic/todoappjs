/**
 * ApplicationDependencyProvider
 */

import { AbstractDependencyProvider } from "../AbstractDependencyProvider.js";
import { PresentationControllerResolverPlugin } from "../Resolvers/Presentation/Plugin/PresentationControllerResolverPlugin.js";
import { PresentationFactoryResolverPlugin } from "../Resolvers/Presentation/Plugin/PresentationFactoryResolverPlugin.js";
import { ApplicationResolverPluginInterface } from "./Plugin/ApplicationResolverPluginInterface.js";

export class ApplicationDependencyProvider extends AbstractDependencyProvider {
  static APPLICATION_RESOLVER_PLUGINS = "APPLICATION_RESOLVER_PLUGINS";

  static provideDependencies() {
    let container = super.provideDependencies();
    container = this.provideApplicationResolverPlugins(container);

    return container;
  }

  static provideApplicationResolverPlugins(container) {
    container.set(
      this.APPLICATION_RESOLVER_PLUGINS,
      this.getApplicationResolverPlugins()
    );

    return container;
  }

  static getApplicationResolverPlugins() {
    let resolverPlugins = [
      new PresentationFactoryResolverPlugin(),
      new PresentationControllerResolverPlugin(),
    ];

    resolverPlugins.forEach((plugin) => {
      ApplicationResolverPluginInterface(plugin);
    });

    return resolverPlugins;
  }
}
