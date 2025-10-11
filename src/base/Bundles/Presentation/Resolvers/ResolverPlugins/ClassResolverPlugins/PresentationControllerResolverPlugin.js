/** PresentationFactoryResolverPlugin */

import { PresentationControllerResolver } from "../../ClassResolvers/PresentationControllerResolver.js";

export class PresentationControllerResolverPlugin {
  resolve(bundles) {
    return PresentationControllerResolver.resolve(bundles);
  }
}
