/** PresentationFactoryResolverPlugin */

import { PresentationBundleFactory } from "../../../PresentationBundleFactory.js";

export class ActionResolverPlugin {
  callActions(bundles) {
    return PresentationBundleFactory.createControllerActionsResolver().resolvePath(
      bundles
    );
  }
}
