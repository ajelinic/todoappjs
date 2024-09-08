/**
 * @ModuleLoader
 */

import { PresentationFactoryResolver } from "../Presentation/PresentationFactoryResolver.js";
import { KernelConstans } from "./KernelConstants.js";

export class BundleLoader {
  KEY_SUFFIX = "_BUNDLES";
  BUNDLE_LIST = {};

  constructor(bundles) {
    this.bundles = bundles;
  }

  load() {
    const bundleLayers = this.getBundleLayers();

    for (const key in bundleLayers) {
      const bundleKey = key.toUpperCase() + this.KEY_SUFFIX;

      if (bundleKey in this.bundles) {
        this.BUNDLE_LIST[key] = this.bundles[bundleKey];
      }
    }

    /** testing only */

    let resolvedPresentationFactories = PresentationFactoryResolver.resolve(
      this.BUNDLE_LIST
    );

    Object.values(resolvedPresentationFactories).forEach((value) => {
      try {
        import(value);
      } catch (e) {
        console.log(e);
      }
    });

    let testImport = import(
      "../../../App/Mock/Presentation/MockPresentationFactory.js"
    );

    /*  try {
      testImport.catch((err) => {
        ApplicationErrorDisplayer.display(err);
      });
    } catch (e) {
      console.log(e);
    } */

    return console.log("loading module test");
  }

  getBundleLayers() {
    return KernelConstans.getBundleLayers();
  }
}
