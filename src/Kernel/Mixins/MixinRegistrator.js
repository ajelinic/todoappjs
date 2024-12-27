/**
 * @MixinRegistrator
 */

import { _getConfigMixin } from "./_getConfigMixin.js";
import { _getAppNamespaceMixin } from "./_getAppNamespaceMixin.js";
import { _containerMixin } from "./_containerMixin.js";
import { _locatorMixin } from "./_locatorMixin.js";

export class MixinRegistrator {
  static provideMixins() {
    return {
      AbstractConfig: [_getConfigMixin],
      AbstractFactory: [_locatorMixin],
      AbstractClassResolver: [_getAppNamespaceMixin, _containerMixin],
      AbstractDependencyProvider: [_containerMixin, _locatorMixin],
    };
  }
}
