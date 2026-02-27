import { LanguageSwitcherPresentationConfig } from "../LanguageSwitcherPresentationConfig.js";

/**
 * @class LanguageSwitcherViewDataResolver
 * @description Resolves language switcher view data from locale + supported locales.
 */
export class LanguageSwitcherViewDataResolver {
  constructor(languageSwitcherClient, languageSwitcherViewDataService) {
    this.languageSwitcherClient = languageSwitcherClient;
    this.languageSwitcherViewDataService = languageSwitcherViewDataService;
  }

  async resolve(locale = null) {
    const activeLocale = this.resolveLocale(locale);
    const resolvedLocale =
      activeLocale ??
      (await this.languageSwitcherClient.getCurrentLocale()) ??
      LanguageSwitcherPresentationConfig.getDefaultLocale();
    const supportedLocales = this.languageSwitcherClient.getSupportedLocales();

    return this.languageSwitcherViewDataService.getViewData({
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
