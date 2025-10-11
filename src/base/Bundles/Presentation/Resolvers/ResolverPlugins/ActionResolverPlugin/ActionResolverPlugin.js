/** PresentationFactoryResolverPlugin */

import { ControllerActionsResolver } from "../../ActionResolver/ControllerActionsResolver.js";

export class ActionResolverPlugin {
  callActions(bundles) {
    return ControllerActionsResolver.resolvePath(bundles);
  }
}
