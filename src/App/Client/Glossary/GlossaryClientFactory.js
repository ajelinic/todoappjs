import { AbstractClientFactory } from "../../../base/Abstracts/AbstractClientFactory.js";
import { GlossaryBusinessFactory } from "../../Business/Glossary/GlossaryBusinessFactory.js";

/**
 * @class GlossaryClientFactory
 * @description GlossaryClientFactory
 */
export class GlossaryClientFactory extends AbstractClientFactory {
  static createGlossaryFacade() {
    return GlossaryBusinessFactory.createGlossaryFacade();
  }
}
