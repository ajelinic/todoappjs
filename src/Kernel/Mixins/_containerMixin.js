/**_containerMixin */

export const _containerMixin = {
  createContainer() {
    return new Map();
  },
  setContainer(container, key, value) {
    return (container[key] = value);
  },
};
