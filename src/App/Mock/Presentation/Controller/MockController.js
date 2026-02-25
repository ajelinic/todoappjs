import { AbstractController } from "../../../../base/Abstracts/AbstractController.js";

/**
 * @class MockController
 * @description MockController
 */
export class MockController extends AbstractController {
  static viewAction() {
    const data = { name: "World" };
    console.log("MockController viewAction called with data:", data);
    this.view("hello-world", data, "app-header .header-container");
  }
}
