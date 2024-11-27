const path = require('path');

module.exports = function override(config) {
  // Ensure Webpack resolves the module from the right locations
  config.resolve = {
    // Alias common-modules to the correct folder path
    alias: {
      'common-modules': path.resolve(__dirname, '../../common-modules'),
    },
    // Include the node_modules directory and custom directories
    modules: [
      path.resolve(__dirname, 'src'),  // Default src folder in your app
      'node_modules',                  // Look in node_modules
    ],
  };

  return config;
};

