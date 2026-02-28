/**
 * @class ToggleTaskRequestTransfer
 * @description Request transfer for task toggle operations.
 */
export class ToggleTaskRequestTransfer {
  constructor({ id = null, checked = false } = {}) {
    const parsedId = Number.parseInt(id, 10);

    this.id = Number.isFinite(parsedId) ? parsedId : null;
    this.checked = Boolean(checked);
  }

  static from(payload = {}) {
    if (payload instanceof ToggleTaskRequestTransfer) {
      return payload;
    }

    return new ToggleTaskRequestTransfer(payload);
  }

  toObject() {
    return {
      id: this.id,
      checked: this.checked,
    };
  }
}

export default ToggleTaskRequestTransfer;
