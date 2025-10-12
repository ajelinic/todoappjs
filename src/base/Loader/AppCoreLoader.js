/**
 * @AppCoreLoader
 */
import { AppCoreFactory } from "../AppCoreFactory.js";
import { MixinRegistry } from "../Mixins/MixinRegistry.js";
import { ActionLoader } from "./ActionLoader/ActionLoader.js";

export class AppCoreLoader {
  static init() {
    AppCoreFactory.createMixinRegistry().loadMixins();
    AppCoreFactory.createBundleLoader().loadBundles();
    AppCoreFactory.createActionLoader().callActions();
    console.log("loading...");
  }
}
