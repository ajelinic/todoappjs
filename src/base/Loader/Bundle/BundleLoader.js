/**
 * @BundleLoader
 */

import { AbstractController } from "../../Abstracts/AbstractController.js";

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

  async loadBundles() {
    const bundles = this.sharedConfig.getRegisteredBundles();
    const bundleLayers = this.sharedConstants.getBundleLayers();

    for (const key in bundleLayers) {
      const bundleKey = key.toUpperCase() + this.keySuffix;

      if (bundleKey in bundles) {
        this.bundleList[key] = bundles[bundleKey];
      }
    }

    const imports = this.resolverPlugins.flatMap((plugin) => {
      const resolvedClasses = plugin.resolve(this.bundleList);
      const resolvedPaths = this.normalizeResolvedClasses(resolvedClasses);

      return resolvedPaths.map(async (value) => {
        try {
          const importedModule = await import(value);
          await this.executeControllerIndexAction(importedModule);
        } catch (e) {
          console.error("Error importing bundle:", value, e);
        }
      });
    });

    await Promise.all(imports);
  }

  normalizeResolvedClasses(resolvedClasses) {
    if (Array.isArray(resolvedClasses)) {
      return [...new Set(resolvedClasses)].filter(
        (value) => typeof value === "string" && value.length > 0
      );
    }

    if (resolvedClasses instanceof Set) {
      return [...resolvedClasses].filter(
        (value) => typeof value === "string" && value.length > 0
      );
    }

    if (resolvedClasses instanceof Map) {
      const values = [...resolvedClasses.values()];
      const flattened = values.flatMap((value) =>
        Array.isArray(value) ? value : [value]
      );
      return [...new Set(flattened)].filter(
        (value) => typeof value === "string" && value.length > 0
      );
    }

    if (resolvedClasses == null) {
      return [];
    }

    if (typeof resolvedClasses === "string" && resolvedClasses.length > 0) {
      return [resolvedClasses];
    }

    return [];
  }

  async executeControllerIndexAction(importedModule) {
    if (!importedModule) {
      return;
    }

    const exportedClasses = [importedModule.default, ...Object.values(importedModule)]
      .filter((exportedValue, index, array) => {
        return (
          typeof exportedValue === "function" &&
          array.indexOf(exportedValue) === index
        );
      });

    const controllerClass = exportedClasses.find((exportedClass) => {
      return exportedClass.prototype instanceof AbstractController;
    });

    if (!controllerClass) {
      return;
    }

    const controller = new controllerClass();
    if (typeof controller.indexAction === "function") {
      await controller.indexAction();
    }
  }
}
