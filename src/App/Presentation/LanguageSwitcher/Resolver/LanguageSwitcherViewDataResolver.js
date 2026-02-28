import { LanguageSwitcherPresentationConfig } from "../LanguageSwitcherPresentationConfig.js";

/**
 * @class LanguageSwitcherViewDataResolver
 * @description Resolves language switcher view data from locale + supported locales.
 */
export class LanguageSwitcherViewDataResolver {
  constructor(languageSwitcherClient, languageSwitcherViewDataBuilder) {
    this.languageSwitcherClient = languageSwitcherClient;
    this.languageSwitcherViewDataBuilder = languageSwitcherViewDataBuilder;
  }

  async resolve(locale = null) {
    const activeLocale = this.resolveLocale(locale);
    const resolvedLocale =
      activeLocale ??
      (await this.languageSwitcherClient.getCurrentLocale()) ??
      LanguageSwitcherPresentationConfig.getDefaultLocale();
    const supportedLocales = this.languageSwitcherClient.getSupportedLocales();

    return this.languageSwitcherViewDataBuilder.getViewData({
      locale: resolvedLocale,
      supportedLocales,
    });
  }

  resolveLocale(locale) {
    if (typeof locale !== "string") {
      return null;
    }

    const normalizedLocale = locale.trim();
    return normalizedLocale.length > 0 ? normalizedLocale : null;
  }
}

export default LanguageSwitcherViewDataResolver;
