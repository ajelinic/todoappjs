/** SharedEntryResolver */

import { AbstractClassResolver } from "../../../../Abstracts/AbstractClassResolver.js";

/**
 * @class SharedEntryResolver
 * @description Resolves shared bundle glossary constant modules.
 */
export class SharedEntryResolver extends AbstractClassResolver {
  constructor(sharedConstants, bundleKey) {
    super();
    this.sharedConstants = sharedConstants;
    this.bundleKey = bundleKey;
    this.resolvedPaths = [];
  }

  resolvePath(bundles) {
    const layerBundles = bundles[this.bundleKey] ?? [];

    layerBundles.forEach((layerBundle) => {
      this.resolvedPaths.push(
        `src/${this.getAppNamespace()}/Shared/${layerBundle}/${layerBundle}GlossaryKeyConstants.js`
      );
    });

    return this.resolvedPaths;
  }
}

export default SharedEntryResolver;
