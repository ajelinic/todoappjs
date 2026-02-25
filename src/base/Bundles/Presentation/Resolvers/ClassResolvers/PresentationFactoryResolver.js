/** PresentationFactoryResolver */

import { AbstractClassResolver } from "../../../../Abstracts/AbstractClassResolver.js";
import { SharedConstants } from "../../../../Shared/SharedConstants.js";

/**
 * @class PresentationFactoryResolver
 * @description PresentationFactoryResolver
 */
export class PresentationFactoryResolver extends AbstractClassResolver {
  constructor(sharedConstants, bundleKey) {
    super();
    this.sharedConstants = sharedConstants;
    this.bundleKey = bundleKey;
    this.CLASS_SUFFIX_KEY = "factory";
    this.resolvedPaths = [];
  }

  resolvePath(bundles) {
    let layerBundles = bundles[this.bundleKey];

    layerBundles.forEach((layerBundle) => {
      this.resolvedPaths.push(
        `/src/${this.getAppNamespace()}/${layerBundle}/Presentation/${layerBundle}Presentation${this.getClassNameSuffix()}.js`
      );
    });

    return this.resolvedPaths;
  }

  getClassNameSuffix() {
    let suffixes = SharedConstants.getClassNameSuffixs();

    return suffixes[this.CLASS_SUFFIX_KEY];
  }
}
