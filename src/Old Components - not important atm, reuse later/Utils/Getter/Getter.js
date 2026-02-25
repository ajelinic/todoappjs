/**
 * @Getter
 * @deprecated Will be removed/changed in future releases
 */

/**
 * @class Getter
 * @description Getter
 */
export class Getter {
  static get(obj, call) {
    let props = Object.getOwnPropertyNames(obj).filter(
      (prop) => prop !== "constructor" && typeof obj[prop] === "function"
    );

    for (let i = 0; i < props.length; i++) {
      if (props[i] === call) {
        return obj[props[i]]();
      }
    }
  }
}
