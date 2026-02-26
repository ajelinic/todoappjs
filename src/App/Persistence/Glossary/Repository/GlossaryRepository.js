import { AbstractRepository } from "../../../../base/Abstracts/AbstractRepository.js";

/**
 * @class GlossaryRepository
 * @description GlossaryRepository
 */
export class GlossaryRepository extends AbstractRepository {
  static TEXT_FALLBACK = "";

  constructor(glossaryStorageGateway) {
    super(glossaryStorageGateway);
    this.glossaryStorageGateway = glossaryStorageGateway;
  }

  async seedRows(rows = []) {
    for (const row of rows) {
      if (!row?.textKey) {
        continue;
      }

      await this.glossaryStorageGateway.saveEntry({
        textKey: row.textKey,
        text: row.text ?? GlossaryRepository.TEXT_FALLBACK,
      });
    }
  }

  async countRows() {
    return this.glossaryStorageGateway.countRows();
  }

  async findByTextKey(textKey) {
    return this.glossaryStorageGateway.getEntryByTextKey(textKey);
  }

  async getText(textKey, fallback = null) {
    const glossaryValue = await this.findByTextKey(textKey);
    if (!glossaryValue || typeof glossaryValue.text !== "string") {
      return fallback ?? textKey;
    }

    return glossaryValue.text;
  }
}
