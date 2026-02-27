/**
 * @class LanguageSwitcherEventHandler
 * @description Handles language-switcher events through LanguageSwitcherClient.
 */
export class LanguageSwitcherEventHandler {
  constructor(languageSwitcherClient) {
    this.languageSwitcherClient = languageSwitcherClient;
  }

  async changeLocale(nextLocale) {
    return this.languageSwitcherClient.setCurrentLocale(nextLocale);
  }
}

export default LanguageSwitcherEventHandler;
