/**
 * AbstractController
 */

import { ABSTRACT_CLASS_ERROR_MESSAGE } from "../Shared/AppCoreConstants.js";

/**
 * @class AbstractController
 * @description AbstractController
 */
export class AbstractController {
  static LAYOUT_MAIN = "main";
  static AUTO_EXECUTE = false;

  constructor() {
    if (new.target === AbstractController) {
      throw new TypeError(ABSTRACT_CLASS_ERROR_MESSAGE);
    }
  }

  async indexAction() {
    throw new Error(
      "Method 'indexAction' must be implemented by concrete controller classes."
    );
  }

  static shouldAutoExecute() {
    return this.AUTO_EXECUTE === true;
  }

  async waitForDomReady() {
    if (document.readyState === "loading") {
      await new Promise((resolve) =>
        document.addEventListener("DOMContentLoaded", resolve, { once: true })
      );
    }
  }

  async getMountPoint(selector = "#app") {
    await this.waitForDomReady();
    const mountPoint = document.querySelector(selector);

    if (!mountPoint) {
      throw new Error(`[AbstractController] Mount point not found: ${selector}`);
    }

    return mountPoint;
  }

  createView(tagName, data = null) {
    const view = document.createElement(tagName);

    if (data !== null && typeof data === "object") {
      view.data = data;
    }

    return view;
  }

  async renderViewAtMount(tagName, data = null, selector = null) {
    const mountSelector = typeof selector === "string" && selector.length > 0
      ? selector
      : this.getMountSelector();
    const mountPoint = await this.getMountPoint(mountSelector);
    mountPoint.innerHTML = "";

    const view = this.createView(tagName, data);
    mountPoint.appendChild(view);

    return view;
  }

  getDefaultLayout() {
    return this.constructor.LAYOUT_MAIN;
  }

  getMountSelector() {
    return "#app";
  }

  createViewResponse(view, data = {}, options = {}) {
    return {
      view,
      data,
      ...options,
    };
  }

  async renderResponse(response) {
    const resolvedResponse = this.resolveResponse(response);
    const mountPoint = await this.getMountPoint(resolvedResponse.mountSelector);
    const layoutResult = await this.renderLayout(
      mountPoint,
      resolvedResponse.layout
    );
    const pageView = this.createView(resolvedResponse.view, resolvedResponse.data);
    layoutResult.content.appendChild(pageView);

    return {
      mountPoint,
      pageView,
      layout: resolvedResponse.layout,
    };
  }

  resolveResponse(response) {
    if (!response || typeof response.view !== "string" || response.view.length === 0) {
      throw new Error("[AbstractController] Invalid view response.");
    }

    return {
      view: response.view,
      data: response.data ?? {},
      layout: response.layout ?? this.getDefaultLayout(),
      mountSelector: response.mountSelector ?? this.getMountSelector(),
    };
  }

  async renderLayout(mountPoint, layout) {
    switch (layout) {
      case this.constructor.LAYOUT_MAIN:
        return this.renderMainLayout(mountPoint);
      default:
        throw new Error(`[AbstractController] Unsupported layout: ${layout}`);
    }
  }

  async renderMainLayout(mountPoint) {
    await this.ensureMainLayoutComponents();
    mountPoint.classList.add("layout-main");
    mountPoint.innerHTML = "";

    const header = document.createElement("header");
    header.appendChild(document.createElement("header-organism"));

    const main = document.createElement("main");
    main.className = "layout-main__content";

    const footer = document.createElement("footer");
    footer.appendChild(document.createElement("footer-organism"));

    mountPoint.append(header, main, footer);

    return {
      root: mountPoint,
      content: main,
    };
  }

  async ensureMainLayoutComponents() {
    await Promise.all([
      import(
        this.resolveModuleUrl("src/App/View/components/organisms/header/header.js")
      ),
      import(
        this.resolveModuleUrl("src/App/View/components/organisms/footer/footer.js")
      ),
    ]);
  }

  resolveModuleUrl(modulePath) {
    if (typeof modulePath !== "string" || modulePath.length === 0) {
      return modulePath;
    }

    const normalizedPath = modulePath.replace(/^\/+/, "");

    return new URL(normalizedPath, this.getAppBaseUrl()).href;
  }

  getAppBaseUrl() {
    const srcMarker = "/src/";
    const srcMarkerPosition = import.meta.url.indexOf(srcMarker);

    if (srcMarkerPosition >= 0) {
      return import.meta.url.slice(0, srcMarkerPosition + 1);
    }

    return new URL("./", document.baseURI).href;
  }
}
