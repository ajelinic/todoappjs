import { ABSTRACT_CLASS_ERROR_MESSAGE } from "../Shared/AppCoreConstants.js";

/**
 * @class AbstractForm
 * @description Base form object with submit/validation state.
 */
export class AbstractForm {
  constructor(initialData = {}) {
    if (new.target === AbstractForm) {
      throw new TypeError(ABSTRACT_CLASS_ERROR_MESSAGE);
    }

    this.data = this.normalize(initialData);
    this.errors = [];
  }

  submit(rawData = {}) {
    this.errors = [];
    this.data = this.normalize(rawData);
    this.validate();

    return this;
  }

  normalize(rawData = {}) {
    return rawData;
  }

  validate() {}

  addError(field, message) {
    this.errors.push({
      field,
      message,
    });
  }

  getData() {
    return this.data;
  }

  getErrors() {
    return [...this.errors];
  }

  isValid() {
    return this.errors.length === 0;
  }
}

export default AbstractForm;
