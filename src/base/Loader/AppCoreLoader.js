/**
 * @AppCoreLoader
 */
import { MixinLoader } from "../Mixins/MixinLoader.js";
import { ActionLoader } from "./ActionLoader/ActionLoader.js";
import { BundleLoader } from "./Bundle/BundleLoader.js";

export class AppCoreLoader {
  static init() {
    MixinLoader.loadMixins();
    BundleLoader.loadBundles();
    ActionLoader.callActions();
    console.log("loading...");
  }
}
