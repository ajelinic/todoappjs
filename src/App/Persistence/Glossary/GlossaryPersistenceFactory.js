import { AbstractFactory } from "../../../base/Abstracts/AbstractFactory.js";
import { StorageClient } from "../../Client/Storage/StorageClient.js";
import { GlossaryPersistenceConfig } from "./GlossaryPersistenceConfig.js";
import { CsvParser } from "./Parser/CsvParser.js";
import { GlossaryStorageGateway } from "./Gateway/GlossaryStorageGateway.js";
import { GlossaryRepository } from "./Repository/GlossaryRepository.js";

/**
 * @class GlossaryPersistenceFactory
 * @description GlossaryPersistenceFactory
 */
export class GlossaryPersistenceFactory extends AbstractFactory {
  static storageClient = null;
  static csvParser = null;
  static glossaryStorageGateway = null;
  static glossaryRepository = null;

  static createStorageClient() {
    if (!this.storageClient) {
      this.storageClient = new StorageClient();
    }

    return this.storageClient;
  }

  static createCsvParser() {
    if (!this.csvParser) {
      this.csvParser = new CsvParser();
    }

    return this.csvParser;
  }

  static createGlossaryStorageGateway() {
    if (!this.glossaryStorageGateway) {
      this.glossaryStorageGateway = new GlossaryStorageGateway(
        this.createStorageClient(),
        GlossaryPersistenceConfig
      );
    }

    return this.glossaryStorageGateway;
  }

  static createGlossaryRepository() {
    if (!this.glossaryRepository) {
      this.glossaryRepository = new GlossaryRepository(
        this.createGlossaryStorageGateway(),
        GlossaryPersistenceConfig
      );
    }

    return this.glossaryRepository;
  }

  static getPersistenceConfig() {
    return GlossaryPersistenceConfig;
  }
}
