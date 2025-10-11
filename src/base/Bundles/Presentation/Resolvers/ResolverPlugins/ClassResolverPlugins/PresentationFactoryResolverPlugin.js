/** PresentationFactoryResolverPlugin */

import { PresentationFactoryResolver } from "../../ClassResolvers/PresentationFactoryResolver.js";

export class PresentationFactoryResolverPlugin {
  resolve(bundles) {
    return PresentationFactoryResolver.resolve(bundles);
  }
}
