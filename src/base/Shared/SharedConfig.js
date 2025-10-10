/**
 * SharedConfig
 */

import { AbstractConfig } from "../Abstracts/AbstractConfig.js";
import * as KernelConstants from "./AppCoreConstants.js";

export class SharedConfig extends AbstractConfig {
  static getAppNamespace() {
    return this.get(KernelConstants.APP_NAMESPACE);
  }

  static getRegisteredBundles() {
    return this.get(KernelConstants.REGISTERED_BUNDLES);
  }

  static getHost() {
    return window.location.href;
  }
}
