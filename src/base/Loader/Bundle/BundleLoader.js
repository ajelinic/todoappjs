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
    this.rootMountControllerExecuted = false;
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

    const resolvedPaths = this.resolveModulePaths();
    for (const value of resolvedPaths) {
      const moduleUrl = this.resolveModuleUrl(value);

      try {
        const importedModule = await import(moduleUrl);
        await this.executeControllerIndexAction(importedModule, moduleUrl);
      } catch (e) {
        console.error("Error importing bundle:", moduleUrl, e);
      }
    }
  }

  resolveModulePaths() {
    const orderedPaths = this.resolverPlugins.flatMap((plugin) => {
      const resolvedClasses = plugin.resolve(this.bundleList);
      return this.normalizeResolvedClasses(resolvedClasses);
    });

    return [...new Set(orderedPaths)];
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

  resolveModuleUrl(modulePath) {
    if (typeof modulePath !== "string" || modulePath.length === 0) {
      return modulePath;
    }

    if (/^(https?:)?\/\//.test(modulePath)) {
      return modulePath;
    }

    const normalizedPath = modulePath.replace(/^\/+/, "");

    return new URL(normalizedPath, this.getAppBaseUrl()).href;
  }

  getAppBaseUrl() {
    const srcMarker = "/src/";
    const srcMarkerPosition = import.meta.url.indexOf(srcMarker);

    if (srcMarkerPosition >= 0) {
      return import.meta.url.slice(0, srcMarkerPosition + 1);
    }

    return new URL("./", document.baseURI).href;
  }

  async executeControllerIndexAction(importedModule, moduleUrl = "") {
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

    if (!this.shouldAutoExecuteController(controllerClass)) {
      return;
    }

    const controller = new controllerClass();
    const mountSelector = this.resolveMountSelector(controller);
    const isRootMountController = mountSelector === "#app";

    if (isRootMountController && this.rootMountControllerExecuted) {
      console.warn(
        `[BundleLoader] Skipping additional root presentation controller at ${moduleUrl}.`
      );
      return;
    }

    if (typeof controller.indexAction === "function") {
      await controller.indexAction();
      if (isRootMountController) {
        this.rootMountControllerExecuted = true;
      }
    }
  }

  resolveMountSelector(controller) {
    if (!controller || typeof controller.getMountSelector !== "function") {
      return "#app";
    }

    try {
      const selector = controller.getMountSelector();
      return typeof selector === "string" && selector.length > 0
        ? selector
        : "#app";
    } catch (error) {
      return "#app";
    }
  }

  shouldAutoExecuteController(controllerClass) {
    if (
      !controllerClass ||
      typeof controllerClass.shouldAutoExecute !== "function"
    ) {
      return false;
    }

    try {
      return controllerClass.shouldAutoExecute() === true;
    } catch (error) {
      return false;
    }
  }
}
