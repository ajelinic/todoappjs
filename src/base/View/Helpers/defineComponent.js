export function defineComponent(tag, component) {
  customElements.define(tag, component);
  component.tagNameFromDefine = tag;
  if (typeof component.autoMount === "function") {
    component.autoMount();
  }
}
