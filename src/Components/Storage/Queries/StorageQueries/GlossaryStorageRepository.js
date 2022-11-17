/**
 * @GlossaryStorageRepository
 */

export class GlossaryStorageRepository {
  constructor(queryContainer) {
    this.queryContainer = queryContainer;
  }
  async getGlossaryValue(key) {
    let database = await this.queryContainer.openDatabase();
    let glossaryValue = await this.queryContainer.readData(
      key,
      database,
      "glossary"
    );

    if (glossaryValue) {
      return glossaryValue.text;
    }
  }
}
