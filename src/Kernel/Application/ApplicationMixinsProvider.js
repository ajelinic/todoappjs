/**
 * @ApplicationMixinsProvider
 */

import { MixinRegistrator } from "../Mixins/MixinRegistrator.js";
import { AbstractConfig } from "../AbstractConfig.js";
import { AbstractFactory } from "../AbstractFactory.js";
import { AbstractClassResolver } from "../AbstractClassResolver.js";
import { AbstractDependencyProvider } from "../AbstractDependencyProvider.js";

export class ApplicationMixinsProvider {
  static applicableClasses = {
    AbstractConfig: AbstractConfig,
    AbstractFactory: AbstractFactory,
    AbstractClassResolver: AbstractClassResolver,
    AbstractDependencyProvider: AbstractDependencyProvider,
  };

  static applyMixins() {
    for (const [key, mixins] of Object.entries(
      MixinRegistrator.provideMixins()
    )) {
      mixins.forEach((mixin) => {
        if (Object.keys(mixin).length > 0)
          Object.assign(this.applicableClasses[key].prototype, mixin);
      });
    }
  }
}
