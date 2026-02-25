import { AbstractFactory } from "../../../base/Abstracts/AbstractFactory.js";
import { MockPersistenceConfig } from "./MockPersistenceConfig.js";
import { CsvParser } from "./Parser/CsvParser.js";
import { SchemaParser } from "./Parser/SchemaParser.js";
import { MockQueryContainer } from "./QueryContainer/MockQueryContainer.js";
import { GlossaryRepository } from "./Repository/GlossaryRepository.js";
import { TaskRepository } from "./Repository/TaskRepository.js";

/**
 * @class MockPersistenceFactory
 * @description MockPersistenceFactory
 */
export class MockPersistenceFactory extends AbstractFactory {
  static queryContainer = null;
  static glossaryRepository = null;
  static taskRepository = null;
  static csvParser = null;

  static createQueryContainer() {
    if (!this.queryContainer) {
      this.queryContainer = new MockQueryContainer(
        MockPersistenceConfig,
        this.createSchemaParser()
      );
    }

    return this.queryContainer;
  }

  static createSchemaParser() {
    return new SchemaParser();
  }

  static createCsvParser() {
    if (!this.csvParser) {
      this.csvParser = new CsvParser();
    }

    return this.csvParser;
  }

  static createTaskRepository() {
    if (!this.taskRepository) {
      this.taskRepository = new TaskRepository(this.createQueryContainer());
    }

    return this.taskRepository;
  }

  static createGlossaryRepository() {
    if (!this.glossaryRepository) {
      this.glossaryRepository = new GlossaryRepository(
        this.createQueryContainer()
      );
    }

    return this.glossaryRepository;
  }

  static getPersistenceConfig() {
    return MockPersistenceConfig;
  }
}
