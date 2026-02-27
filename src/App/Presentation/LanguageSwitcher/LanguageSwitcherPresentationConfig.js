import { AbstractConfig } from "../../../base/Abstracts/AbstractConfig.js";

/**
 * @class LanguageSwitcherPresentationConfig
 * @description Configuration for language switcher presentation flow.
 */
export class LanguageSwitcherPresentationConfig extends AbstractConfig {
  static getDefaultLocale() {
    return "en-US";
  }

  static getMountSelector() {
    return "#language-switcher-feature";
  }

  static getLocaleChangedEventName() {
    return "app:locale-changed";
  }
}

export default LanguageSwitcherPresentationConfig;
