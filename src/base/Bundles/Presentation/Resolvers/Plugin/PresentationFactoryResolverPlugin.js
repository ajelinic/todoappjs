/** PresentationFactoryResolverPlugin */

import { PresentationFactoryResolver } from "../PresentationFactoryResolver.js";

export class PresentationFactoryResolverPlugin {
  resolve(bundles) {
    return PresentationFactoryResolver.resolve(bundles);
  }
}
