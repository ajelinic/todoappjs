import { AbstractClientFactory } from "../../../base/Abstracts/AbstractClientFactory.js";
import { MockBusinessFactory } from "../../Business/Mock/MockBusinessFactory.js";

/**
 * @class MockClientFactory
 * @description MockClientFactory
 */
export class MockClientFactory extends AbstractClientFactory {
  static createMockFacade() {
    return MockBusinessFactory.createMockFacade();
  }
}
