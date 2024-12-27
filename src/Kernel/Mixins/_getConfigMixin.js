/** _getConfigMixin */

import { ApplicationConfig } from "../Application/ApplicationConfig.js";

export const _getConfigMixin = {
  getConfig() {
    return ApplicationConfig;
  },
};
