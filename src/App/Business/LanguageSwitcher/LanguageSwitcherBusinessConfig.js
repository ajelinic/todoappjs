import { AbstractConfig } from "../../../base/Abstracts/AbstractConfig.js";

/**
 * @class LanguageSwitcherBusinessConfig
 * @description Language switcher business configuration.
 */
export class LanguageSwitcherBusinessConfig extends AbstractConfig {
  static useFacadeSingleton() {
    return true;
  }
}

export default LanguageSwitcherBusinessConfig;
