import { AbstractRepository } from "../../../../base/Abstracts/AbstractRepository.js";

/**
 * @class LanguageSwitcherRepository
 * @description LanguageSwitcherRepository
 */
export class LanguageSwitcherRepository extends AbstractRepository {
  constructor(languageSwitcherStorageGateway, persistenceConfig) {
    super(languageSwitcherStorageGateway);
    this.languageSwitcherStorageGateway = languageSwitcherStorageGateway;
    this.persistenceConfig = persistenceConfig;
  }

  async saveSelectedLocale(locale) {
    await this.languageSwitcherStorageGateway.saveEntry({
      key: this.persistenceConfig.getSelectedLocaleKey(),
      value: locale,
    });

    return locale;
  }

  async getSelectedLocale(defaultLocale = "en-US") {
    const entry = await this.languageSwitcherStorageGateway.getEntryByKey(
      this.persistenceConfig.getSelectedLocaleKey()
    );

    if (!entry || typeof entry.value !== "string" || entry.value.trim().length === 0) {
      return defaultLocale;
    }

    return entry.value.trim();
  }
}
