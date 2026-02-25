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
    const mixins = await Promise.resolve(
      AppCoreFactory.createMixinRegistry().loadMixins()
    );

    console.log(
      await Promise.resolve(AppCoreFactory.createMixinRegistry().loadMixins())
    );
    AppCoreFactory.createBundleLoader().loadBundles();
    AppCoreFactory.createComponentLoader().register();
    AppCoreFactory.createActionLoader().callActions();
    console.log("loading...");
  }
}
