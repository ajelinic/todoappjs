/** SharedEntryResolverPlugin */

import { SharedBundleFactory } from "../../../SharedBundleFactory.js";

/**
 * @class SharedEntryResolverPlugin
 * @description Shared entry resolver plugin.
 */
export class SharedEntryResolverPlugin {
  resolve(bundles) {
    return SharedBundleFactory.createSharedEntryResolver().resolve(bundles);
  }
}

export default SharedEntryResolverPlugin;
