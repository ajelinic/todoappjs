import { AbstractDependencyProvider } from "../../../base/Abstracts/AbstractDependencyProvider.js";
import { GlossaryPersistenceFactory } from "../../Persistence/Glossary/GlossaryPersistenceFactory.js";

/**
 * @class GlossaryBusinessDependencyProvider
 * @description Glossary business dependencies.
 */
export class GlossaryBusinessDependencyProvider extends AbstractDependencyProvider {
  static container = new Map();

  static GLOSSARY_REPOSITORY = "GLOSSARY_REPOSITORY";
  static GLOSSARY_STORAGE_GATEWAY = "GLOSSARY_STORAGE_GATEWAY";
  static CSV_PARSER = "CSV_PARSER";
  static PERSISTENCE_CONFIG = "PERSISTENCE_CONFIG";

  static provideDependencies(container) {
    container.set(this.GLOSSARY_REPOSITORY, () =>
      GlossaryPersistenceFactory.createGlossaryRepository()
    );
    container.set(this.GLOSSARY_STORAGE_GATEWAY, () =>
      GlossaryPersistenceFactory.createGlossaryStorageGateway()
    );
    container.set(this.CSV_PARSER, () => GlossaryPersistenceFactory.createCsvParser());
    container.set(this.PERSISTENCE_CONFIG, () =>
      GlossaryPersistenceFactory.getPersistenceConfig()
    );

    return container;
  }
}

export default GlossaryBusinessDependencyProvider;
