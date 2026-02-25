/**
 * @class createViewMixin
 * @description Mixin to create and mount views dynamically.
 */

import { SharedConfig } from "../../Shared/SharedConfig.js";

export const createViewMixin = {
  async view(component, data, mountSelector = "#app") {
    if (!customElements.get(component)) {
      try {
        await import(this.resolveComponentPath(component));
      } catch (e) {
        console.error("Failed to load component:", component, e);
      }
    }

    const mountPoint = document.querySelector(mountSelector);
    if (!mountPoint) {
      const message = `[createViewMixin] Mount point not found: ${mountSelector}`;
      console.error(message);
      throw new Error(message);
    }

    const view = document.createElement(component);
    view.data = data;
    mountPoint.appendChild(view);
    return view;
  },
  resolveComponentPath(component) {
    return `/src/${SharedConfig.getAppNamespace()}/View/templates/${component}/${component}.js`;
  },
};
