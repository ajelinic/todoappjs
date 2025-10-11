/** ActionResolverPluginInterface */

export const ActionResolverPluginInterface = (plugin) => {
  if (!plugin.callActions) {
    throw new Error("Plugin must include callAction method");
  }

  return plugin;
};
