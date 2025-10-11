/**
 * @MixinLoader
 */

import { _getConfigMixin } from "./_getConfigMixin.js";
import { _getAppNamespaceMixin } from "./_getAppNamespaceMixin.js";
import { AbstractConfig } from "../Abstracts/AbstractConfig.js";
import { AbstractFactory } from "../Abstracts/AbstractFactory.js";
import { AbstractClassResolver } from "../Abstracts/AbstractClassResolver.js";
import { AbstractDependencyProvider } from "../Abstracts/AbstractDependencyProvider.js";
import { AbstractController } from "../Abstracts/AbstractController.js";
import { _viewMixin } from "./_viewMixin.js";

export class MixinLoader {
  static applicableClasses = {
    AbstractConfig: AbstractConfig,
    AbstractFactory: AbstractFactory,
    AbstractClassResolver: AbstractClassResolver,
    AbstractDependencyProvider: AbstractDependencyProvider,
    AbstractController: AbstractController,
  };

  static registerMixins() {
    return {
      AbstractConfig: [_getConfigMixin],
      AbstractFactory: [],
      AbstractClassResolver: [_getAppNamespaceMixin],
      AbstractDependencyProvider: [],
      AbstractController: [_viewMixin],
    };
  }

  static loadMixins() {
    for (const [key, mixins] of Object.entries(this.registerMixins())) {
      mixins.forEach((mixin) => {
        if (Object.keys(mixin).length > 0)
          Object.assign(this.applicableClasses[key].prototype, mixin);
      });
    }
  }
}
