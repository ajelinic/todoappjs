import { AbstractFacade } from "../../../base/Abstracts/AbstractFacade.js";

/**
 * @class LanguageSwitcherFacade
 * @description LanguageSwitcherFacade
 */
export class LanguageSwitcherFacade extends AbstractFacade {
  static SUPPORTED_LOCALES = [
    {
      code: "en-US",
      labelKey: "language.locale.en-US",
      fallbackLabel: "English US",
    },
    {
      code: "hr-HR",
      labelKey: "language.locale.hr-HR",
      fallbackLabel: "Hrvatski",
    },
  ];

  constructor(factory) {
    super();
    this.factory = factory;
    this.isBootstrapped = false;
  }

  getFactory() {
    return this.factory;
  }

  async bootstrap() {
    if (this.isBootstrapped) {
      return;
    }

    await this.getFactory().createLanguageSwitcherStorageGateway().registerSchema();
    this.isBootstrapped = true;
  }

  getSupportedLocales() {
    return LanguageSwitcherFacade.SUPPORTED_LOCALES.map((locale) => ({
      ...locale,
    }));
  }

  async getCurrentLocale() {
    await this.bootstrap();

    const locale = await this.getFactory()
      .createLanguageSwitcherRepository()
      .getSelectedLocale(this.getDefaultLocale());

    return this.normalizeLocale(locale);
  }

  async setCurrentLocale(locale) {
    await this.bootstrap();

    const normalizedLocale = this.normalizeLocale(locale);
    await this.getFactory()
      .createLanguageSwitcherRepository()
      .saveSelectedLocale(normalizedLocale);

    return normalizedLocale;
  }

  normalizeLocale(locale) {
    if (typeof locale !== "string") {
      return this.getDefaultLocale();
    }

    const normalizedLocale = locale.trim();
    const isSupportedLocale = this.getSupportedLocales().some((supportedLocale) => {
      return supportedLocale.code === normalizedLocale;
    });

    return isSupportedLocale ? normalizedLocale : this.getDefaultLocale();
  }

  getDefaultLocale() {
    return this.getFactory().createPersistenceConfig().getDefaultLocale();
  }
}
