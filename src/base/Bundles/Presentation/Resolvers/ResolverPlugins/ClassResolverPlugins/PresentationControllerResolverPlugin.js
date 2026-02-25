/** PresentationFactoryResolverPlugin */

import { PresentationBundleFactory } from "../../../PresentationBundleFactory.js";

/**
 * @class PresentationControllerResolverPlugin
 * @description PresentationControllerResolverPlugin
 */
export class PresentationControllerResolverPlugin {
  resolve(bundles) {
    return PresentationBundleFactory.createPresentationControllerResolver().resolve(
      bundles
    );
  }
}
