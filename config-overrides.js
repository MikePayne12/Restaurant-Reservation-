module.exports = function override(config, env) {
  if (config.devServer) {
    config.devServer.allowedHosts = ['localhost']; // Add valid hosts here
  }

  return config;
};