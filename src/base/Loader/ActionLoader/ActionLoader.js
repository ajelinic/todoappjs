/**
 * @ActionLoader
 */

/**
 * @class ActionLoader
 * @description ActionLoader
 */
export class ActionLoader {
  constructor(sharedConfig, sharedConstants, resolverPlugins = [], keySuffix) {
    this.sharedConfig = sharedConfig;
    this.sharedConstants = sharedConstants;
    this.resolverPlugins = resolverPlugins;
    this.keySuffix = keySuffix;
    this.bundleList = {};
  }

  callActions() {
    const bundles = this.sharedConfig.getRegisteredBundles();
    const bundleLayers = this.sharedConstants.getBundleLayers();

    for (const key in bundleLayers) {
      const bundleKey = key.toUpperCase() + this.keySuffix;

      if (bundleKey in bundles) {
        this.bundleList[key] = bundles[bundleKey];
      }
    }

    this.resolverPlugins.forEach((plugin) => {
      let resolvedClasses = plugin.callActions(this.bundleList);

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
}
