/** _getAppNamespaceMixin */

import { ApplicationConfig } from "../Application/ApplicationConfig.js";
import { APP_NAMESPACE } from "../Application/ApplicationConstants.js";

export const _getAppNamespaceMixin = {
  getAppNamespace() {
    return ApplicationConfig.get(APP_NAMESPACE);
  },
};
