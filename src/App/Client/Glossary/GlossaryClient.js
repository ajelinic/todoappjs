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

  async getText(key, fallback = null, options = {}) {
    return this.getFactory()
      .createGlossaryFacade()
      .getText(key, fallback, options);
  }

  async getTexts(entries = [], options = {}) {
    return this.getFactory().createGlossaryFacade().getTexts(entries, options);
  }
}
