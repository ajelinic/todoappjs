/**
 * @class ComponentLoader
 */

/**
 * @class ComponentLoader
 * @description ComponentLoader
 */
export default class ComponentLoader {
  constructor(sharedConfig, components) {
    this.sharedConfig = sharedConfig;
    this.components = components;
    this.resolvedPaths = [];
  }

  register() {
    this.components.forEach((component) => this.load(component));
  }

  load = async (component) => {
    if (!customElements.get(component)) {
      try {
        await import(this.resolveComponentPath(component));
      } catch (e) {
        console.error("Failed to load component:", component, e);
      }
    }
  };

  resolveComponentPath = (component) => {
    return `/src/${this.sharedConfig.getAppNamespace()}/View/templates/${component}/${component}.js`;
  };
}
