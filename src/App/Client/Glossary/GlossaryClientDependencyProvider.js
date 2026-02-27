import { AbstractDependencyProvider } from "../../../base/Abstracts/AbstractDependencyProvider.js";
import { GlossaryBusinessFactory } from "../../Business/Glossary/GlossaryBusinessFactory.js";

/**
 * @class GlossaryClientDependencyProvider
 * @description Glossary client dependencies.
 */
export class GlossaryClientDependencyProvider extends AbstractDependencyProvider {
  static container = new Map();
  static GLOSSARY_FACADE = "GLOSSARY_FACADE";

  static provideDependencies(container) {
    container.set(this.GLOSSARY_FACADE, () => GlossaryBusinessFactory.createGlossaryFacade());
    return container;
  }
}

export default GlossaryClientDependencyProvider;
