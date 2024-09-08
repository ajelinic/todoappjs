/**
 * AbstractConfig
 */

import { AbstractConfig } from "../AbstractConfig.js";
import * as ApplicationConstants from "../../Application/ApplicationConstants.js";

export class KernelSharedConfig extends AbstractConfig {
  static getAppNamespace() {
    return this.get(ApplicationConstants.APP_NAMESPACE);
  }

  static getRegisteredBundles() {
    return this.get(ApplicationConstants.REGISTERED_BUNDLES);
  }
}
