/**
 * @ApplicationLoader
 */

import { KernelSharedConfig } from "../Kernel/Shared/KernelSharedConfig.js";
import { BundleLoader } from "../Kernel/Shared/BundleLoader.js";
import { ApplicationMixinsProvider } from "./ApplicationMixinsProvider.js";

export class ApplicationLoader {
  static init() {
    ApplicationMixinsProvider.applyMixins();
    this.loadBundles();
  }

  static loadBundles() {
    return this.createBundleLoader().load();
  }

  static createBundleLoader() {
    return new BundleLoader(KernelSharedConfig.getRegisteredBundles());
  }
}
