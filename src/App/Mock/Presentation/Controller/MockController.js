import { MockPresentationFactory } from "../MockPresentationFactory.js";

export class MockController {
  static indexAction() {
    return MockPresentationFactory.test();
  }
}

MockController.indexAction();
