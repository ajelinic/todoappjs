/**_containerMixin */

export const _containerMixin = {
  createContainer() {
    return new Set();
  },
  setContainer(container, key, value) {
    return (container[key] = value);
  },
};
