/** PresentationFactoryResolver */

import { AbstractClassResolver } from "../../../../Abstracts/AbstractClassResolver.js";
import { SharedConfig } from "../../../../Shared/SharedConfig.js";

export class ViewResolver extends AbstractClassResolver {
  static resolvedPaths = [];
  static BUNDLES = "PRESENTATION_BUNDLES";

  static resolveComponentPath(component) {
    const bundles = SharedConfig.getRegisteredBundles();
    let layerBundles = bundles[this.BUNDLES];

    layerBundles.forEach((layerBundle) => {
      this.resolvedPaths.push(
        `${this.getHost()}src/${this.getAppNamespace()}/${layerBundle}/Presentation/View/templates/${component}/${component}.js`
      );
    });

    return this.resolvedPaths;
  }
}
