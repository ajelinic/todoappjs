import { AbstractConfig } from "../../../base/Abstracts/AbstractConfig.js";

/**
 * @class StorageBusinessConfig
 * @description Storage business configuration.
 */
export class StorageBusinessConfig extends AbstractConfig {
  static useFacadeSingleton() {
    return true;
  }
}

export default StorageBusinessConfig;
