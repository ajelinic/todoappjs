/** PresentationFactoryResolverPlugin */

import { PresentationBundleFactory } from "../../../PresentationBundleFactory.js";

export class PresentationFactoryResolverPlugin {
  resolve(bundles) {
    return PresentationBundleFactory.createPresentationFactoryResolver().resolve(
      bundles
    );
  }
}
