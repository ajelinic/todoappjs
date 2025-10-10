/** PresentationFactoryResolver */

import { AbstractClassResolver } from "../../../Abstracts/AbstractClassResolver.js";
import { SharedConstants } from "../../../Shared/SharedConstants.js";

export class PresentationControllerResolver extends AbstractClassResolver {
  static CLASS_SUFFIX_KEY = "controller";
  static BUNDLE_KEY = "presentation";
  static resolvedPaths = [];

  static resolvePath(bundles) {
    let layerBundles = bundles[this.BUNDLE_KEY];

    layerBundles.forEach((layerBundle) => {
      this.resolvedPaths.push(
        `${this.getHost()}src/${this.getAppNamespace()}/${layerBundle}/Presentation/Controller/${layerBundle}${this.getClassNameSuffix()}.js`
      );
    });

    return this.resolvedPaths;
  }

  static getClassNameSuffix() {
    let suffixes = SharedConstants.getClassNameSuffixs();

    return suffixes[this.CLASS_SUFFIX_KEY];
  }
}
