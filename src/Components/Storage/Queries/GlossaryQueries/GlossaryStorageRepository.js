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
      await database,
      "glossary"
    );

    if (glossaryValue) {
      return await glossaryValue.text;
    }
  }
}
