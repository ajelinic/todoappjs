/**
 * @MixinRegistry
 */

import { getConfigMixin } from "./Collection/getConfigMixin.js";
import { getAppNamespaceMixin } from "./Collection/getAppNamespaceMixin.js";
import { AbstractConfig } from "../Abstracts/AbstractConfig.js";
import { AbstractFactory } from "../Abstracts/AbstractFactory.js";
import { AbstractClassResolver } from "../Abstracts/AbstractClassResolver.js";
import { AbstractDependencyProvider } from "../Abstracts/AbstractDependencyProvider.js";

/**
 * @class MixinRegistry
 * @description MixinRegistry
 */
export class MixinRegistry {
  constructor() {
    this.applicableClasses = {
      AbstractConfig: AbstractConfig,
      AbstractFactory: AbstractFactory,
      AbstractClassResolver: AbstractClassResolver,
      AbstractDependencyProvider: AbstractDependencyProvider,
    };
  }

  registerMixins() {
    return {
      AbstractConfig: [getConfigMixin],
      AbstractFactory: [],
      AbstractClassResolver: [getAppNamespaceMixin],
      AbstractDependencyProvider: [],
    };
  }

  loadMixins() {
    for (const [key, mixins] of Object.entries(this.registerMixins())) {
      mixins.forEach((mixin) => {
        if (Object.keys(mixin).length > 0)
          Object.assign(this.applicableClasses[key].prototype, mixin);
      });
    }
  }
}
