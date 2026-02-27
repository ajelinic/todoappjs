import { AbstractConfig } from "../../../base/Abstracts/AbstractConfig.js";

/**
 * @class GlossaryBusinessConfig
 * @description Glossary business configuration.
 */
export class GlossaryBusinessConfig extends AbstractConfig {
  static useFacadeSingleton() {
    return true;
  }
}

export default GlossaryBusinessConfig;
