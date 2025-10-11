import { ViewResolver } from "../Bundles/Presentation/Resolvers/ViewResolver/ViewResolver.js";

export const _viewMixin = {
  async view(component, data, mountSelector = "#app") {
    const mountPoint = document.querySelector(mountSelector);
    if (!mountPoint) {
      console.log("Mount point not found:", mountSelector);
      return;
    }

    if (!customElements.get(component)) {
      try {
        await import(ViewResolver.resolveComponentPath(component));
      } catch (e) {
        console.error("Failed to load component:", component, e);
      }
    }

    const view = document.createElement(component);
    view.data = data;
    mountPoint.innerHTML = "";
    mountPoint.appendChild(view);
  },
};
