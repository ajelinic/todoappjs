/**
 * @class LanguageSwitcherGlossaryKeyConstants
 * @description Shared glossary keys for language switcher presentation.
 */
export class LanguageSwitcherGlossaryKeyConstants {
  static LABEL = "language.switcher.label";

  static getLanguageSwitcherKeys(supportedLocales = []) {
    return [
      this.LABEL,
      ...supportedLocales.map((supportedLocale) => supportedLocale.labelKey),
    ];
  }
}

export default LanguageSwitcherGlossaryKeyConstants;
