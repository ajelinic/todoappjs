/**
 * @class DateTimeService
 * @description DateTimeService
 */
export class DateTimeService {
  constructor(locale = "hr-HR") {
    this.locale = locale;
  }

  getCurrentMillis() {
    return Date.now();
  }

  createTaskAddedAtTimestamp() {
    return new Date().toLocaleString(this.locale);
  }

  parseDateTimeLocalInput(value) {
    if (!value || typeof value !== "string") {
      return null;
    }

    const parsed = new Date(value);
    const timestamp = parsed.getTime();
    if (Number.isNaN(timestamp)) {
      return null;
    }

    return timestamp;
  }

  formatMillis(timestamp) {
    if (!Number.isFinite(timestamp)) {
      return "";
    }

    return new Date(timestamp).toLocaleString(this.locale);
  }
}
