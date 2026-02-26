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
      <section class="index-layout">
        <section class="index-layout__toolbar">
          <section id="language-switcher-feature"></section>
        </section>
        <section id="task-feature"></section>
      </section>
    `;
  }
}

export default IndexController;
