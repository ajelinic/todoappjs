/**
 * @ApplicationFactory
 */

import { AbstractFactory } from "../AbstractFactory.js";
import { ApplicationDependencyProvider } from "./ApplicationDependencyProvider.js";
import { ApplicationResolverPluginInterface } from "./Plugin/ApplicationResolverPluginInterface.js";

export class ApplicationFactory extends AbstractFactory {
  static getApplicationResolverPlugins() {
    return this.getProvidedDependency(
      ApplicationDependencyProvider.APPLICATION_RESOLVER_PLUGINS
    );
  }
}
