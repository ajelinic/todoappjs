import { GlossaryClient } from "../../Client/Glossary/GlossaryClient.js";

/**
 * @class TranslationService
 * @description TranslationService
 */
export class TranslationService {
  constructor(glossaryClient = new GlossaryClient()) {
    this.glossaryClient = glossaryClient;
  }

  async bootstrap() {
    await this.glossaryClient.bootstrap();
  }

  async trans(key, options = {}) {
    return this.glossaryClient.getText(key, key, options);
  }

  async transList(keys = [], options = {}) {
    const entries = keys
      .filter((key) => typeof key === "string" && key.trim().length > 0)
      .map((key) => ({
        key,
        fallback: key,
      }));

    return this.glossaryClient.getTexts(entries, options);
  }
}
