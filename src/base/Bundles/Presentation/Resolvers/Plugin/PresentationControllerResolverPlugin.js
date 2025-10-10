/** PresentationFactoryResolverPlugin */

import { PresentationControllerResolver } from "../PresentationControllerResolver.js";

export class PresentationControllerResolverPlugin {
  resolve(bundles) {
    return PresentationControllerResolver.resolve(bundles);
  }
}
