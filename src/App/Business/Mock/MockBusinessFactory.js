import { AbstractBusinessFactory } from "../../../base/Abstracts/AbstractBusinessFactory.js";
import { MockPersistenceFactory } from "../../Persistence/Mock/MockPersistenceFactory.js";
import { MockFacade } from "./MockFacade.js";
import { TaskInfoFormatter } from "./Model/TaskInfoFormatter.js";
import { TodoValidator } from "./Model/TodoValidator.js";
import { DateTimeService } from "./Service/DateTimeService.js";

/**
 * @class MockBusinessFactory
 * @description MockBusinessFactory
 */
export class MockBusinessFactory extends AbstractBusinessFactory {
  static facade = null;
  static dateTimeService = null;
  static todoValidator = null;
  static taskInfoFormatter = null;

  static createMockFacade() {
    if (!this.facade) {
      this.facade = new MockFacade(this);
    }

    return this.facade;
  }

  static createTaskRepository() {
    return MockPersistenceFactory.createTaskRepository();
  }

  static createGlossaryRepository() {
    return MockPersistenceFactory.createGlossaryRepository();
  }

  static createQueryContainer() {
    return MockPersistenceFactory.createQueryContainer();
  }

  static createPersistenceConfig() {
    return MockPersistenceFactory.getPersistenceConfig();
  }

  static createCsvParser() {
    return MockPersistenceFactory.createCsvParser();
  }

  static createDateTimeService() {
    if (!this.dateTimeService) {
      this.dateTimeService = new DateTimeService();
    }

    return this.dateTimeService;
  }

  static createTodoValidator() {
    if (!this.todoValidator) {
      this.todoValidator = new TodoValidator(this.createDateTimeService());
    }

    return this.todoValidator;
  }

  static createTaskInfoFormatter() {
    if (!this.taskInfoFormatter) {
      this.taskInfoFormatter = new TaskInfoFormatter(
        this.createGlossaryRepository(),
        this.createDateTimeService()
      );
    }

    return this.taskInfoFormatter;
  }
}
