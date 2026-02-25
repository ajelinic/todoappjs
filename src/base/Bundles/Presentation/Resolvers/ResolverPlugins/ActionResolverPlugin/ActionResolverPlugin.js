/** PresentationFactoryResolverPlugin */

import { PresentationBundleFactory } from "../../../PresentationBundleFactory.js";

/**
 * @class ActionResolverPlugin
 * @description ActionResolverPlugin
 */
export class ActionResolverPlugin {
  callActions(bundles) {
    return PresentationBundleFactory.createControllerActionsResolver().resolvePath(
      bundles
    );
  }
}
