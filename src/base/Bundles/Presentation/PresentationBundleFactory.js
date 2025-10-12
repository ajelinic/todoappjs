/**
 * @PresentationBundleFactory
 */

import { SharedConstants } from "../../Shared/SharedConstants.js";
import { AbstractFactory } from "../../Abstracts/AbstractFactory.js";
import { PresentationControllerResolver } from "./Resolvers/ClassResolvers/PresentationControllerResolver.js";
import { PresentationFactoryResolver } from "./Resolvers/ClassResolvers/PresentationFactoryResolver.js";
import { ControllerActionsResolver } from "./Resolvers/ActionResolver/ControllerActionsResolver.js";

export class PresentationBundleFactory extends AbstractFactory {
  /**
   * @var string
   */
  static BUNDLE_KEY = "presentation";

  /**
   * @returns PresentationControllerResolver
   */
  static createPresentationControllerResolver() {
    return new PresentationControllerResolver(SharedConstants, this.BUNDLE_KEY);
  }

  /**
   * @returns PresentationFactoryResolver
   */
  static createPresentationFactoryResolver() {
    return new PresentationFactoryResolver(SharedConstants, this.BUNDLE_KEY);
  }

  /**
   * @returns ControllerActionsResolver
   */
  static createControllerActionsResolver() {
    return new ControllerActionsResolver(SharedConstants, this.BUNDLE_KEY);
  }
}
