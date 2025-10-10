/**
 * @AppCoreLoader
 */
import { MixinLoader } from "../Mixins/MixinLoader.js";
import { BundleLoader } from "./Bundle/BundleLoader.js";

export class AppCoreLoader {
  static init() {
    MixinLoader.loadMixins();
    BundleLoader.loadBundles();
    console.log("loading...");
  }
}
