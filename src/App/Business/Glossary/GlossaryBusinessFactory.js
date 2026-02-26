import { AbstractBusinessFactory } from "../../../base/Abstracts/AbstractBusinessFactory.js";
import { GlossaryPersistenceFactory } from "../../Persistence/Glossary/GlossaryPersistenceFactory.js";
import { GlossaryFacade } from "./GlossaryFacade.js";

/**
 * @class GlossaryBusinessFactory
 * @description GlossaryBusinessFactory
 */
export class GlossaryBusinessFactory extends AbstractBusinessFactory {
  static facade = null;

  static createGlossaryFacade() {
    if (!this.facade) {
      this.facade = new GlossaryFacade(this);
    }

    return this.facade;
  }

  static createGlossaryRepository() {
    return GlossaryPersistenceFactory.createGlossaryRepository();
  }

  static createGlossaryStorageGateway() {
    return GlossaryPersistenceFactory.createGlossaryStorageGateway();
  }

  static createCsvParser() {
    return GlossaryPersistenceFactory.createCsvParser();
  }

  static createPersistenceConfig() {
    return GlossaryPersistenceFactory.getPersistenceConfig();
  }
}
