import { AbstractFactory } from "../../../Kernel/AbstractFactory.js";

export class MockPresentationFactory extends AbstractFactory {
  static test() {
    console.log("?");
  }
}
