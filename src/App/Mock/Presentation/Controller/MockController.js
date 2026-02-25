import { AbstractController } from "../../../../base/Abstracts/AbstractController.js";
import "../../../View/components/views/mock/mock-page/mock-page.js";
import { MockPageDataProvider } from "../DataProvider/MockPageDataProvider.js";

/**
 * @class MockController
 * @description MockController
 */
export class MockController extends AbstractController {
  constructor() {
    super();
    this.dataProvider = new MockPageDataProvider();
  }

  async indexAction() {
    const pageData = await this.getPageData();
    const viewData = this.mapViewData(pageData);

    await this.renderResponse(this.createViewResponse("mock-page", viewData));
  }

  async getPageData() {
    return this.dataProvider.getPageData();
  }

  mapViewData(pageData) {
    return {
      name: pageData?.name || "Demo",
    };
  }
}

export default MockController;
