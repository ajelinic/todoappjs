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

  async getText(key, fallback = null) {
    await this.bootstrap();
    await this.ensureSeeded();
    return this.getFactory().createGlossaryRepository().getText(key, fallback);
  }

  async getTexts(entries = []) {
    await this.bootstrap();
    await this.ensureSeeded();

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
          .getText(entry.key, entry.fallback);
      })
    );

    const result = {};
    normalizedEntries.forEach((entry, index) => {
      result[entry.key] = texts[index];
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
    const glossaryRepository = this.getFactory().createGlossaryRepository();
    const glossaryCount = await glossaryRepository.countRows();

    if (glossaryCount > 0) {
      return;
    }

    const csvUrl = this.getFactory().createPersistenceConfig().getGlossaryCsvUrl();
    const rows = await this.getFactory().createCsvParser().parseFromUrl(csvUrl);
    await glossaryRepository.seedRows(rows);
  }
}
