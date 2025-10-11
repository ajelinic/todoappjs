/**
 * StorageConfig
 */

export class StorageConfig {
  static setStatistics() {
    return "statistics";
  }

  static setTasks() {
    return "tasks";
  }

  static getSchema() {
    return "todoappschema.xml";
  }

  static pathToSchema() {
    return "src/Components/Storage/Schema/";
  }

  static getGlossaryFile() {
    return "glossary.csv";
  }

  static pathToDataFile() {
    return "src/Install/Data/Glossary/";
  }

  static getDBName() {
    return "ToDoApp";
  }
}
