/** ApplicationResolverPluginInterface */

export const ApplicationResolverPluginInterface = (plugin) => {
  if (!plugin.resolve) {
    throw new Error("Plugin must include resolve method");
  }

  return plugin;
};
