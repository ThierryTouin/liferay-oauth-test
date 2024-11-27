const path = require('path');

module.exports = function override(config) {
    // Disable all code splitting and merge everything into a single file for all environments
    config.optimization.splitChunks = {
      cacheGroups: {
        default: false, // Disable default chunking behavior
      },
    };
  
    // Define the output filename for the main bundle
    config.output.filename = 'static/js/bundle.js'; // The final name of the bundle file
    config.output.chunkFilename = 'static/js/[name].chunk.js'; // Naming for chunk files (if any, they will be merged)

    // Override default path
    config.output.path = path.resolve(__dirname, '../app1/react-app/build'); // Nouveau chemin pour le répertoire de build
    config.output.publicPath = '/'; // Assurez-vous que le chemin public est correct pour le fonctionnement de l'application

  
    return config;
  };