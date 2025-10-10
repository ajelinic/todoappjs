/** _getAppNamespaceMixin */

import { APP_NAMESPACE } from "../Shared/AppCoreConstants.js";
import { AppCoreConfig } from "../AppCoreConfig.js";

export const _getAppNamespaceMixin = {
  getAppNamespace() {
    return AppCoreConfig.get(APP_NAMESPACE);
  },
};
