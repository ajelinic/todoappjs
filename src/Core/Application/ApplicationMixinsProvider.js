/**
 * @ApplicationMixinsProvider
 */

import { MixinRegistrator } from "./Mixins/MixinRegistrator.js";
import { AbstractConfig } from "../Kernel/AbstractConfig.js";
import { AbstractFactory } from "../Kernel/AbstractFactory.js";
import { AbstractClassResolver } from "../Kernel/AbstractClassResolver.js";

export class ApplicationMixinsProvider {
  static applicableClasses = {
    AbstractConfig: AbstractConfig,
    AbstractFactory: AbstractFactory,
    AbstractClassResolver: AbstractClassResolver,
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
