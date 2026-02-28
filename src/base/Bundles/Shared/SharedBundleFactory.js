/**
 * @SharedBundleFactory
 */

import { SharedConstants } from "../../Shared/SharedConstants.js";
import { AbstractFactory } from "../../Abstracts/AbstractFactory.js";
import { SharedEntryResolver } from "./Resolvers/ClassResolvers/SharedEntryResolver.js";

/**
 * @class SharedBundleFactory
 * @description SharedBundleFactory
 */
export class SharedBundleFactory extends AbstractFactory {
  /**
   * @var string
   */
  static BUNDLE_KEY = "shared";

  /**
   * @returns SharedEntryResolver
   */
  static createSharedEntryResolver() {
    return new SharedEntryResolver(SharedConstants, this.BUNDLE_KEY);
  }
}

export default SharedBundleFactory;
