import { AbstractClient } from "../../../base/Abstracts/AbstractClient.js";
import { GlossaryClientFactory } from "./GlossaryClientFactory.js";

/**
 * @class GlossaryClient
 * @description GlossaryClient
 */
export class GlossaryClient extends AbstractClient {
  getFactory() {
    return GlossaryClientFactory;
  }

  async bootstrap() {
    return this.getFactory().createGlossaryFacade().bootstrap();
  }

  async getText(key, fallback = null) {
    return this.getFactory().createGlossaryFacade().getText(key, fallback);
  }

  async getTexts(entries = []) {
    return this.getFactory().createGlossaryFacade().getTexts(entries);
  }
}
