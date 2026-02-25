/**
 * @AppCoreLoader
 */
import { AppCoreFactory } from "../AppCoreFactory.js";

/**
 * @class AppCoreLoader
 * @description AppCoreLoader
 */
export class AppCoreLoader {
  static async init() {
    AppCoreFactory.createMixinRegistry().loadMixins();
    await AppCoreFactory.createBundleLoader().loadBundles();
  }
}
