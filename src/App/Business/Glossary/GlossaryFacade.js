import { AbstractFacade } from "../../../base/Abstracts/AbstractFacade.js";

/**
 * @class GlossaryFacade
 * @description GlossaryFacade
 */
export class GlossaryFacade extends AbstractFacade {
  constructor(factory) {
    super();
    this.factory = factory;
    this.isBootstrapped = false;
    this.isSeeded = false;
    this.seedPromise = null;
  }

  getFactory() {
    return this.factory;
  }

  async bootstrap() {
    if (this.isBootstrapped) {
      return;
    }

    await this.getFactory().createGlossaryStorageGateway().registerSchema();
    this.isBootstrapped = true;
  }

  async getText(key, fallback = null, options = {}) {
    await this.bootstrap();
    await this.ensureSeeded();

    const locale = this.resolveLocale(options);
    const text = await this.getFactory()
      .createGlossaryRepository()
      .getText(key, fallback, locale);

    return this.interpolateText(text, this.resolveParameters(options));
  }

  async getTexts(entries = [], options = {}) {
    await this.bootstrap();
    await this.ensureSeeded();
    const locale = this.resolveLocale(options);

    const normalizedEntries = entries.filter((entry) => {
      return (
        entry &&
        typeof entry.key === "string" &&
        entry.key.length > 0
      );
    });

    const texts = await Promise.all(
      normalizedEntries.map((entry) => {
        return this.getFactory()
          .createGlossaryRepository()
          .getText(entry.key, entry.fallback, locale);
      })
    );

    const result = {};
    normalizedEntries.forEach((entry, index) => {
      result[entry.key] = this.interpolateText(
        texts[index],
        this.resolveEntryParameters(entry, options)
      );
    });

    return result;
  }

  async ensureSeeded() {
    if (this.isSeeded) {
      return;
    }

    if (this.seedPromise) {
      await this.seedPromise;
      return;
    }

    this.seedPromise = this.seedGlossary();

    try {
      await this.seedPromise;
      this.isSeeded = true;
    } finally {
      this.seedPromise = null;
    }
  }

  async seedGlossary() {
    const csvUrl = this.getFactory().createPersistenceConfig().getGlossaryCsvUrl();
    const rows = await this.getFactory().createCsvParser().parseFromUrl(csvUrl);
    await this.getFactory().createGlossaryRepository().seedRows(rows);
  }

  resolveLocale(options = {}) {
    if (!options || typeof options !== "object") {
      return this.getDefaultLocale();
    }

    if (typeof options.locale === "string" && options.locale.trim().length > 0) {
      return options.locale.trim();
    }

    return this.getDefaultLocale();
  }

  getDefaultLocale() {
    return this.getFactory().createPersistenceConfig().getDefaultLocale();
  }

  resolveParameters(options = {}) {
    if (!options || typeof options !== "object") {
      return {};
    }

    if (!options.parameters || typeof options.parameters !== "object") {
      return {};
    }

    return options.parameters;
  }

  resolveEntryParameters(entry = {}, options = {}) {
    const globalParameters = this.resolveParameters(options);
    const entryParameters =
      entry && typeof entry.parameters === "object" ? entry.parameters : {};

    return {
      ...globalParameters,
      ...entryParameters,
    };
  }

  interpolateText(text, parameters = {}) {
    if (typeof text !== "string") {
      return text;
    }

    if (!parameters || typeof parameters !== "object") {
      return text;
    }

    return text.replace(/%([^%]+)%/g, (match, token) => {
      if (Object.prototype.hasOwnProperty.call(parameters, token)) {
        return this.stringifyParameterValue(parameters[token]);
      }

      if (Object.prototype.hasOwnProperty.call(parameters, match)) {
        return this.stringifyParameterValue(parameters[match]);
      }

      return match;
    });
  }

  stringifyParameterValue(value) {
    if (value === null || value === undefined) {
      return "";
    }

    return String(value);
  }
}
