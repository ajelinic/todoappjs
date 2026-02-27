import { AbstractController } from "./AbstractController.js";

/**
 * @class AbstractPresentationController
 * @description Base presentation controller with factory/config access helpers.
 */
export class AbstractPresentationController extends AbstractController {
  getFactory() {
    const factoryClass = this.constructor.FACTORY_CLASS;
    if (!factoryClass) {
      throw new Error(
        `[AbstractPresentationController] FACTORY_CLASS is not defined for ${this.constructor.name}.`
      );
    }

    return factoryClass;
  }

  getConfig() {
    return this.getFactory().getConfig();
  }
}

export default AbstractPresentationController;
