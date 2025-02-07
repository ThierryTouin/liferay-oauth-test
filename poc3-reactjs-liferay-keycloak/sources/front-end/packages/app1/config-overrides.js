const path = require('path');
const fs = require('fs');
const webpack = require('webpack'); 
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = function override(config) {

    // Disable all code splitting and merge everything into a single file for all environments
    config.optimization.splitChunks = {
      cacheGroups: {
        default: false, // Disable default chunking behavior
      },
    };

    config.optimization.runtimeChunk = false;
    config.plugins.push(new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1, // one single JS file generated
    }));

    // Generating .map files to ease debugging
    config.devtool = 'source-map',
  
    // Define the output filename for the main bundle
    config.output.filename = 'static/js/bundle.js'; // The final name of the bundle file
    config.output.chunkFilename = 'static/js/[name].chunk.js'; // Naming for chunk files (if any, they will be merged)

    config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));

    // JDA : see output folder and open bundle-report.html to visualize packaged dependencies
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',  // Generate a static HTML file
        reportFilename: 'bundle-report.html',  // Name of the generated report
        openAnalyzer: false,  // Open the report automatically in the browser
      }),
    );

    return config;
  };