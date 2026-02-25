/**
 * @BundleLoader
 */

/**
 * @class BundleLoader
 * @description BundleLoader
 */
export class BundleLoader {
  constructor(sharedConfig, sharedConstants, resolverPlugins = [], keySuffix) {
    this.sharedConfig = sharedConfig;
    this.sharedConstants = sharedConstants;
    this.resolverPlugins = resolverPlugins;
    this.keySuffix = keySuffix;
    this.bundleList = {};
  }

  loadBundles() {
    const bundles = this.sharedConfig.getRegisteredBundles();
    const bundleLayers = this.sharedConstants.getBundleLayers();

    for (const key in bundleLayers) {
      const bundleKey = key.toUpperCase() + this.keySuffix;

      if (bundleKey in bundles) {
        this.bundleList[key] = bundles[bundleKey];
      }
    }

    this.resolverPlugins.forEach((plugin) => {
      let resolvedClasses = plugin.resolve(this.bundleList);

      resolvedClasses.forEach(async (value) => {
        try {
          await import(value);
        } catch (e) {
          console.error("Error importing bundle:", value, e);
        }
      });
    });
  }
}
