import { SharedConfig } from "../../Shared/SharedConfig.js";

export const createViewMixin = {
  resolvedPaths: [],
  bundleCollection: "PRESENTATION_BUNDLES",
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
    const bundles = SharedConfig.getRegisteredBundles();
    let layerBundles = bundles[this.bundleCollection];

    layerBundles.forEach((layerBundle) => {
      this.resolvedPaths.push(
        `${SharedConfig.getHost()}src/${SharedConfig.getAppNamespace()}/${layerBundle}/Presentation/View/templates/${component}/${component}.js`
      );
    });

    return this.resolvedPaths;
  },
};
