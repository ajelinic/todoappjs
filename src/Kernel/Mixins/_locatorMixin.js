/**_locatorMixin */

import { ApplicationContainerGlobals } from "../Application/ApplicationContainerGlobals.js";

export const _locatorMixin = {
  DEPENDENCIES_KEY: "dependecies",
  getProvidedDependency(key) {
    let container = ApplicationContainerGlobals.get(this.DEPENDENCIES_KEY);
    return container.get(key);
  },
  setProvidedDependencies(container) {
    ApplicationContainerGlobals.set(this.DEPENDENCIES_KEY, container);
  },
};
