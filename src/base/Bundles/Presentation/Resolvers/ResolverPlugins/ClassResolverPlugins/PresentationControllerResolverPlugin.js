/** PresentationFactoryResolverPlugin */

import { PresentationBundleFactory } from "../../../PresentationBundleFactory.js";

export class PresentationControllerResolverPlugin {
  resolve(bundles) {
    return PresentationBundleFactory.createPresentationControllerResolver().resolve(
      bundles
    );
  }
}
