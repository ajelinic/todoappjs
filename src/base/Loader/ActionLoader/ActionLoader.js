/**
 * @ActionLoader
 */

import { AppCoreFactory } from "../../AppCoreFactory.js";
import { SharedConfig } from "../../Shared/SharedConfig.js";
import { SharedConstants } from "../../Shared/SharedConstants.js";

export class ActionLoader {
  static KEY_SUFFIX = "_BUNDLES";
  static BUNDLE_LIST = {};

  static callActions() {
    const bundles = SharedConfig.getRegisteredBundles();
    const bundleLayers = this.getBundleLayers();

    for (const key in bundleLayers) {
      const bundleKey = key.toUpperCase() + this.KEY_SUFFIX;

      if (bundleKey in bundles) {
        this.BUNDLE_LIST[key] = bundles[bundleKey];
      }
    }

    let resolverPlugins = AppCoreFactory.getCallableResolverPlugins();

    resolverPlugins.forEach((plugin) => {
      let resolvedClasses = plugin.callActions(this.BUNDLE_LIST);

      resolvedClasses.forEach(async (value) => {
        try {
          const callable = await import(value);
          const instance = new callable.default();
          instance.action();
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
