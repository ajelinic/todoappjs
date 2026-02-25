import { AbstractClient } from "../../../base/Abstracts/AbstractClient.js";
import { MockClientFactory } from "./MockClientFactory.js";

/**
 * @class MockClient
 * @description MockClient
 */
export class MockClient extends AbstractClient {
  getFactory() {
    return MockClientFactory;
  }

  async getTodoPageData() {
    return this.getFactory().createMockFacade().getTodoPageData();
  }

  async addTask(payload) {
    return this.getFactory().createMockFacade().addTask(payload);
  }

  async toggleTask(payload) {
    return this.getFactory().createMockFacade().toggleTask(payload);
  }

  async clearCompletedTasks() {
    return this.getFactory().createMockFacade().clearCompletedTasks();
  }
}
