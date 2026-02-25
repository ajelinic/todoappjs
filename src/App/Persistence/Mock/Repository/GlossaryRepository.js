import { AbstractRepository } from "../../../../base/Abstracts/AbstractRepository.js";

/**
 * @class GlossaryRepository
 * @description GlossaryRepository
 */
export class GlossaryRepository extends AbstractRepository {
  static STORE_NAME = "glossary";
  static TEXT_FALLBACK = "";

  async seedRows(rows = []) {
    for (const row of rows) {
      if (!row?.textKey) {
        continue;
      }

      await this.queryContainer.put(GlossaryRepository.STORE_NAME, {
        textKey: row.textKey,
        text: row.text ?? GlossaryRepository.TEXT_FALLBACK,
      });
    }
  }

  async countRows() {
    return this.queryContainer.count(GlossaryRepository.STORE_NAME);
  }

  async findByTextKey(textKey) {
    return this.queryContainer.get(GlossaryRepository.STORE_NAME, textKey);
  }

  async getText(textKey, fallback = null) {
    const glossaryValue = await this.findByTextKey(textKey);
    if (!glossaryValue || typeof glossaryValue.text !== "string") {
      return fallback ?? textKey;
    }

    return glossaryValue.text;
  }
}
