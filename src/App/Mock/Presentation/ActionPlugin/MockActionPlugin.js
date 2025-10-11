import { MockController } from "../Controller/MockController.js";

export default class MockActionPlugin {
  action() {
    return MockController.viewAction();
  }
}
