/** PresentationFactoryResolverPlugin */

import { PresentationBundleFactory } from "../../../PresentationBundleFactory.js";

/**
 * @class PresentationFactoryResolverPlugin
 * @description PresentationFactoryResolverPlugin
 */
export class PresentationFactoryResolverPlugin {
  resolve(bundles) {
    return PresentationBundleFactory.createPresentationFactoryResolver().resolve(
      bundles
    );
  }
}
