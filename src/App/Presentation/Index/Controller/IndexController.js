import { AbstractController } from "../../../../base/Abstracts/AbstractController.js";

/**
 * @class IndexController
 * @description IndexController
 */
export class IndexController extends AbstractController {
  static shouldAutoExecute() {
    return true;
  }

  async indexAction() {
    const mountPoint = await this.getMountPoint(this.getMountSelector());
    const layoutResult = await this.renderLayout(mountPoint, this.getDefaultLayout());
    this.renderFeatureSlots(layoutResult.content);
  }

  renderFeatureSlots(contentElement) {
    contentElement.innerHTML = `
      <section class="index-layout container">
        <section class="index-layout__toolbar row justify-content-end">
          <section class="col-12 col-md-4 col-lg-3">
            <section id="language-switcher-feature"></section>
          </section>
        </section>
        <section class="row g-3">
          <section class="col-12 col-lg-8" id="task-feature"></section>
          <section class="col-12 col-lg-4" id="task-info-board-feature"></section>
        </section>
      </section>
    `;
  }
}

export default IndexController;
