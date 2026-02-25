/**
 * @PresentationBundleFactory
 */

import { SharedConstants } from "../../Shared/SharedConstants.js";
import { AbstractFactory } from "../../Abstracts/AbstractFactory.js";
import { PresentationControllerResolver } from "./Resolvers/ClassResolvers/PresentationControllerResolver.js";

/**
 * @class PresentationBundleFactory
 * @description PresentationBundleFactory
 */
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

}
