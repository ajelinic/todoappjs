/**
 * @ApplicationLoader
 */

import { SharedConfig } from "../Shared/SharedConfig.js";
import { SharedConstants } from "../Shared/SharedConstants.js";
import { ApplicationDependencyProvider } from "./ApplicationDependencyProvider.js";
import { ApplicationMixinsProvider } from "./ApplicationMixinsProvider.js";
import { ApplicationFactory } from "./ApplicationFactory.js";

export class ApplicationLoader {
  static KEY_SUFFIX = "_BUNDLES";
  static BUNDLE_LIST = {};

  static init() {
    ApplicationMixinsProvider.applyMixins();
    ApplicationDependencyProvider.setDependencies();
    this.load();
  }

  static load() {
    const bundles = SharedConfig.getRegisteredBundles();
    const bundleLayers = this.getBundleLayers();

    for (const key in bundleLayers) {
      const bundleKey = key.toUpperCase() + this.KEY_SUFFIX;

      if (bundleKey in bundles) {
        this.BUNDLE_LIST[key] = bundles[bundleKey];
      }
    }

    let resolverPlugins = ApplicationFactory.getApplicationResolverPlugins();

    resolverPlugins.forEach((plugin) => {
      let resolvedClasses = plugin.resolve(this.BUNDLE_LIST);

      resolvedClasses.forEach((value) => {
        try {
          import(value);
        } catch (e) {
          console.log(e);
        }
      });
    });
  }

  static getBundleLayers() {
    return SharedConstants.getBundleLayers();
  }
}
