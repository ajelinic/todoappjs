/** PresentationFactoryResolver */

import { AbstractClassResolver } from "../../../../Abstracts/AbstractClassResolver.js";
import { SharedConstants } from "../../../../Shared/SharedConstants.js";

/**
 * @class ControllerActionsResolver
 * @description ControllerActionsResolver
 */
export class ControllerActionsResolver extends AbstractClassResolver {
  constructor(sharedConstants, bundleKey) {
    super();
    this.sharedConstants = sharedConstants;
    this.bundleKey = bundleKey;
    this.CLASS_SUFFIX_KEY = "actionPlugin";
    this.resolvedPaths = [];
  }

  resolvePath(bundles) {
    let layerBundles = bundles[this.bundleKey];

    layerBundles.forEach((layerBundle) => {
      this.resolvedPaths.push(
        `/src/${this.getAppNamespace()}/${layerBundle}/Presentation/ActionPlugin/${layerBundle}${this.getClassNameSuffix()}.js`
      );
    });

    return this.resolvedPaths;
  }

  getClassNameSuffix() {
    let suffixes = SharedConstants.getClassNameSuffixs();

    return suffixes[this.CLASS_SUFFIX_KEY];
  }
}
