/** ApplicationContainerGlobals */

export class ApplicationContainerGlobals {
  static containerGlobals = {};

  static getContainerGlobals() {
    return { ...this.containerGlobals };
  }

  static set(id, value) {
    this.containerGlobals[id] = value;
  }

  static get(id) {
    if (!this.containerGlobals.hasOwnProperty(id)) {
      throw new Error(`Identifier "${id}" is not defined.`);
    }

    return this.containerGlobals[id];
  }

  static has(id) {
    return this.containerGlobals.hasOwnProperty(id);
  }

  static delete(id) {
    delete this.containerGlobals[id];
  }

  static keys() {
    return Object.keys(this.containerGlobals);
  }
}
