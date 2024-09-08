/** PresentationFactoryResolver */

import { AbstractClassResolver } from "../AbstractClassResolver.js";
import { KernelConstans } from "../Shared/KernelConstants.js";

export class PresentationFactoryResolver extends AbstractClassResolver {
  static CLASS_SUFFIX_KEY = "factory";
  static BUNDLE_KEY = "presentation";
  static resolvedPaths = [];

  static resolve(bundles) {
    return this.resolvePath(bundles);
  }

  static resolvePath(bundles) {
    let layerBundles = bundles[this.BUNDLE_KEY];

    layerBundles.forEach((layerBundle) => {
      this.resolvedPaths.push(
        `../../../${this.getAppNamespace()}/${layerBundle}/Presentation/${layerBundle}Presentation${this.getFactoryClassNameSuffix()}.js`
      );
    });

    return this.resolvedPaths;
  }

  static getFactoryClassNameSuffix() {
    let suffixes = KernelConstans.getClassNameSuffixs();

    return suffixes[this.CLASS_SUFFIX_KEY];
  }
}
