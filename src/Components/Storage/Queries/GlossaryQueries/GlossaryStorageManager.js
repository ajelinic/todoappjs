/**
 * @GlossaryStorageManager
 */

export class GlossaryStorageManager {
  constructor(queryContainer) {
    this.queryContainer = queryContainer;
  }

  async importGlossaryData(data) {
    let database = await this.queryContainer.openDatabase();
    let cursor = await this.queryContainer.openKeyCursor(database, "glossary");

    for (let i = 0; i < data.length; i++) {
      if (!cursor || cursor.key != data[i].textKey) {
        await this.queryContainer.importData(data[i], database, "glossary");
      }
    }
  }
}
