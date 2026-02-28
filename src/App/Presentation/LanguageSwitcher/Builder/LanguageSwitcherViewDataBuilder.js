import {
  LanguageSwitcherGlossaryKeyConstants,
} from "../../../Shared/LanguageSwitcher/LanguageSwitcherGlossaryKeyConstants.js";

/**
 * @class LanguageSwitcherViewDataBuilder
 * @description Builds language switcher view data.
 */
export class LanguageSwitcherViewDataBuilder {
  constructor(glossaryClient) {
    this.glossaryClient = glossaryClient;
  }

  async getViewData({ locale = "en-US", supportedLocales = [] }) {
    const glossary = await this.transList(
      LanguageSwitcherGlossaryKeyConstants.getLanguageSwitcherKeys(supportedLocales),
      locale
    );

    return {
      label: glossary[LanguageSwitcherGlossaryKeyConstants.LABEL],
      currentLocale: locale,
      locales: supportedLocales.map((supportedLocale) => {
        return {
          value: supportedLocale.code,
          label: glossary[supportedLocale.labelKey],
        };
      }),
    };
  }

  async transList(keys, locale) {
    const entries = keys.map((key) => ({
      key,
      fallback: key,
    }));

    return this.glossaryClient.getTexts(entries, {
      locale,
    });
  }
}

export default LanguageSwitcherViewDataBuilder;
