import { SharedConfig } from "../../Shared/SharedConfig.js";

export const createViewMixin = {
  resolvedPaths: [],
  async view(component, data, mountSelector = "#app") {
    const mountPoint = document.querySelector(mountSelector);
    if (!mountPoint) {
      console.log("Mount point not found:", mountSelector);
      return;
    }

    if (!customElements.get(component)) {
      try {
        await import(this.resolveComponentPath(component));
      } catch (e) {
        console.error("Failed to load component:", component, e);
      }
    }

    const view = document.createElement(component);
    view.data = data;
    mountPoint.innerHTML = "";
    mountPoint.appendChild(view);
  },
  resolveComponentPath(component) {
    this.resolvedPaths.push(
      `${SharedConfig.getHost()}src/${SharedConfig.getAppNamespace()}/View/templates/${component}/${component}.js`
    );

    return this.resolvedPaths;
  },
};
