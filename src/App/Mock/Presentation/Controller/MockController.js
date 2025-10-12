import { AbstractController } from "../../../../base/Abstracts/AbstractController.js";

export class MockController extends AbstractController {
  static viewAction() {
    const data = { name: "World" };
    this.view("hello-world", data, ".header-container");
  }
}
