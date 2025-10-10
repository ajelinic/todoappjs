/**
 * @BundleLoader
 */

import { AppCoreFactory } from "../../AppCoreFactory.js";
import { SharedConfig } from "../../Shared/SharedConfig.js";
import { SharedConstants } from "../../Shared/SharedConstants.js";

export class BundleLoader {
  static KEY_SUFFIX = "_BUNDLES";
  static BUNDLE_LIST = {};

  static loadBundles() {
    const bundles = SharedConfig.getRegisteredBundles();
    const bundleLayers = this.getBundleLayers();

    for (const key in bundleLayers) {
      const bundleKey = key.toUpperCase() + this.KEY_SUFFIX;

      if (bundleKey in bundles) {
        this.BUNDLE_LIST[key] = bundles[bundleKey];
      }
    }

    let resolverPlugins = AppCoreFactory.getBundleResolverPlugins();

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
