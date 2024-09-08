/**
 * @MixinRegistrator
 */

import { _getConfigMixin } from "./_getConfigMixin.js";
import { _getAppNamespaceMixin } from "./_getAppNamespaceMixin.js";
import { _containerMixin } from "./_containerMixin.js";

export class MixinRegistrator {
  static provideMixins() {
    return {
      AbstractConfig: [_getConfigMixin],
      AbstractFactory: [],
      AbstractClassResolver: [_getAppNamespaceMixin, _containerMixin],
    };
  }
}
