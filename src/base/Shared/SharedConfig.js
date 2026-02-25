/**
 * SharedConfig
 */

import { AbstractConfig } from "../Abstracts/AbstractConfig.js";
import * as AppCoreConstants from "./AppCoreConstants.js";

/**
 * @class SharedConfig
 * @description SharedConfig
 */
export class SharedConfig extends AbstractConfig {
  static getAppNamespace() {
    return this.get(AppCoreConstants.APP_NAMESPACE);
  }

  static getRegisteredBundles() {
    return this.get(AppCoreConstants.REGISTERED_BUNDLES);
  }

  static getRegisteredComponents() {
    return this.get(AppCoreConstants.COMPONENTS);
  }
}
