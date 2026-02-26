import { AbstractRepository } from "../../../../base/Abstracts/AbstractRepository.js";

/**
 * @class GlossaryRepository
 * @description GlossaryRepository
 */
export class GlossaryRepository extends AbstractRepository {
  static TEXT_FALLBACK = "";
  static DEFAULT_LOCALE_FALLBACK = "en-US";

  constructor(glossaryStorageGateway, persistenceConfig) {
    super(glossaryStorageGateway);
    this.glossaryStorageGateway = glossaryStorageGateway;
    this.persistenceConfig = persistenceConfig;
  }

  async seedRows(rows = []) {
    for (const row of rows) {
      const textKey = this.normalizeTextKey(row?.textKey);
      const locale = this.normalizeLocale(row?.locale);
      if (!textKey || !locale) {
        continue;
      }

      await this.glossaryStorageGateway.saveEntry({
        id: this.createEntryId(locale, textKey),
        locale,
        textKey,
        text: row.text ?? GlossaryRepository.TEXT_FALLBACK,
      });
    }
  }

  async countRows() {
    return this.glossaryStorageGateway.countRows();
  }

  async findByLocaleAndTextKey(locale, textKey) {
    return this.glossaryStorageGateway.getEntryById(
      this.createEntryId(locale, textKey)
    );
  }

  async getText(textKey, fallback = null, locale = null) {
    const normalizedTextKey = this.normalizeTextKey(textKey);
    if (!normalizedTextKey) {
      return fallback ?? textKey;
    }

    const activeLocale = this.resolveLocale(locale);
    const defaultLocale = this.getDefaultLocale();

    const glossaryValue =
      (await this.findByLocaleAndTextKey(activeLocale, normalizedTextKey)) ??
      (activeLocale !== defaultLocale
        ? await this.findByLocaleAndTextKey(defaultLocale, normalizedTextKey)
        : null);

    if (!glossaryValue || typeof glossaryValue.text !== "string") {
      return fallback ?? textKey;
    }

    return glossaryValue.text;
  }

  createEntryId(locale, textKey) {
    return `${locale}::${textKey}`;
  }

  resolveLocale(locale = null) {
    return this.normalizeLocale(locale) || this.getDefaultLocale();
  }

  getDefaultLocale() {
    return (
      this.persistenceConfig?.getDefaultLocale?.() ??
      GlossaryRepository.DEFAULT_LOCALE_FALLBACK
    );
  }

  normalizeLocale(locale) {
    if (typeof locale !== "string") {
      return "";
    }

    return locale.trim();
  }

  normalizeTextKey(textKey) {
    if (typeof textKey !== "string") {
      return "";
    }

    return textKey.trim();
  }
}
