/** PresentationFactoryResolver */

import { AbstractClassResolver } from "../../../../Abstracts/AbstractClassResolver.js";
import { SharedConstants } from "../../../../Shared/SharedConstants.js";

/**
 * @class PresentationControllerResolver
 * @description PresentationControllerResolver
 */
export class PresentationControllerResolver extends AbstractClassResolver {
  constructor(sharedConstants, bundleKey) {
    super();
    this.sharedConstants = sharedConstants;
    this.bundleKey = bundleKey;
    this.CLASS_SUFFIX_KEY = "controller";
    this.resolvedPaths = [];
  }

  resolvePath(bundles) {
    let layerBundles = bundles[this.bundleKey];

    layerBundles.forEach((layerBundle) => {
      this.resolvedPaths.push(
        `/src/${this.getAppNamespace()}/${layerBundle}/Presentation/Controller/${layerBundle}${this.getClassNameSuffix()}.js`
      );
    });

    return this.resolvedPaths;
  }

  getClassNameSuffix() {
    let suffixes = this.sharedConstants.getClassNameSuffixs();

    return suffixes[this.CLASS_SUFFIX_KEY];
  }
}
