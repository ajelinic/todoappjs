import { MockController } from "../Controller/MockController.js";

/**
 * @class MockActionPlugin
 * @description MockActionPlugin
 */
export default class MockActionPlugin {
  action() {
    return MockController.viewAction();
  }
}
