/**
 * @class DeleteTaskRequestTransfer
 * @description Request transfer for delete-task operations.
 */
export class DeleteTaskRequestTransfer {
  constructor({ id = null } = {}) {
    const parsedId = Number.parseInt(id, 10);
    this.id = Number.isFinite(parsedId) ? parsedId : null;
  }

  static from(payload = {}) {
    if (payload instanceof DeleteTaskRequestTransfer) {
      return payload;
    }

    return new DeleteTaskRequestTransfer(payload);
  }

  toObject() {
    return {
      id: this.id,
    };
  }
}

export default DeleteTaskRequestTransfer;
