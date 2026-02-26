import { AbstractFactory } from "../../../base/Abstracts/AbstractFactory.js";
import { StorageClient } from "../../Client/Storage/StorageClient.js";
import { LanguageSwitcherPersistenceConfig } from "./LanguageSwitcherPersistenceConfig.js";
import { LanguageSwitcherStorageGateway } from "./Gateway/LanguageSwitcherStorageGateway.js";
import { LanguageSwitcherRepository } from "./Repository/LanguageSwitcherRepository.js";

/**
 * @class LanguageSwitcherPersistenceFactory
 * @description LanguageSwitcherPersistenceFactory
 */
export class LanguageSwitcherPersistenceFactory extends AbstractFactory {
  static storageClient = null;
  static languageSwitcherStorageGateway = null;
  static languageSwitcherRepository = null;

  static createStorageClient() {
    if (!this.storageClient) {
      this.storageClient = new StorageClient();
    }

    return this.storageClient;
  }

  static createLanguageSwitcherStorageGateway() {
    if (!this.languageSwitcherStorageGateway) {
      this.languageSwitcherStorageGateway = new LanguageSwitcherStorageGateway(
        this.createStorageClient(),
        LanguageSwitcherPersistenceConfig
      );
    }

    return this.languageSwitcherStorageGateway;
  }

  static createLanguageSwitcherRepository() {
    if (!this.languageSwitcherRepository) {
      this.languageSwitcherRepository = new LanguageSwitcherRepository(
        this.createLanguageSwitcherStorageGateway(),
        LanguageSwitcherPersistenceConfig
      );
    }

    return this.languageSwitcherRepository;
  }

  static getPersistenceConfig() {
    return LanguageSwitcherPersistenceConfig;
  }
}
