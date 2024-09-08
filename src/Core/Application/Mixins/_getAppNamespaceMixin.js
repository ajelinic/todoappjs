/** _getAppNamespaceMixin */

import { ApplicationConfig } from "../ApplicationConfig.js";
import { APP_NAMESPACE } from "../ApplicationConstants.js";

export const _getAppNamespaceMixin = {
  getAppNamespace() {
    return ApplicationConfig.get(APP_NAMESPACE);
  },
};
