/**
 * @MixinRegistry
 */

import { getConfigMixin } from "./Collection/getConfigMixin.js";
import { getAppNamespaceMixin } from "./Collection/getAppNamespaceMixin.js";
import { AbstractConfig } from "../Abstracts/AbstractConfig.js";
import { AbstractFactory } from "../Abstracts/AbstractFactory.js";
import { AbstractClassResolver } from "../Abstracts/AbstractClassResolver.js";
import { AbstractDependencyProvider } from "../Abstracts/AbstractDependencyProvider.js";
import { AbstractController } from "../Abstracts/AbstractController.js";
import { createViewMixin } from "./Collection/createViewMixin.js";

export class MixinRegistry {
  constructor() {
    this.applicableClasses = {
      AbstractConfig: AbstractConfig,
      AbstractFactory: AbstractFactory,
      AbstractClassResolver: AbstractClassResolver,
      AbstractDependencyProvider: AbstractDependencyProvider,
      AbstractController: AbstractController,
    };
  }

  registerMixins() {
    return {
      AbstractConfig: [getConfigMixin],
      AbstractFactory: [],
      AbstractClassResolver: [getAppNamespaceMixin],
      AbstractDependencyProvider: [],
      AbstractController: [createViewMixin],
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
