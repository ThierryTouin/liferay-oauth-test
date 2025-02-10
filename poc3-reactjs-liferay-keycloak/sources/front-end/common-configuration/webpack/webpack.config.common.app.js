// webpack.config.common.js
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

const commonModulesToProcess = [
  '../../packages/common-components/package.json',
  '../../packages/common-services/package.json',
];

function override(config) {

    // Disable all code splitting
    config.optimization.splitChunks = { cacheGroups: { default: false } };
    config.optimization.runtimeChunk = false;
    config.plugins.push(new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }));

    // Generate source maps
    config.devtool = 'source-map';

    // Define output filenames
    config.output.filename = 'static/js/bundle.js';
    config.output.chunkFilename = 'static/js/[name].chunk.js';

    // Allow resolving sources outside of src/
    config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));

    // Manage peer dependencies from common modules
    // IMPORTANT : Force pearDependencies to resolve from the lerna managed node_modules. for example : avoid to include React twice 
    // Dynamically load peerDependancies from common-components package.json
    const peerDependencyAliases = commonModulesToProcess.reduce((aliases, modulePath) => {
      const modulePackageJson = path.resolve(__dirname, modulePath);
      const modulePackage = JSON.parse(fs.readFileSync(modulePackageJson, 'utf8'));
      const peerDependencies = modulePackage.peerDependencies || {};

      Object.keys(peerDependencies).forEach(packageName => {
        aliases[packageName] = path.resolve(__dirname, '../../../front-end/node_modules', packageName);
      });

      return aliases;
    }, {});

    config.resolve.alias = {
      ...config.resolve.alias,
      ...peerDependencyAliases,
    };

    console.log('DECLARED ALIAS (to avoid including librairies twice) :', config.resolve.alias);

    // Add bundle analyzer plugin
    config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'bundle-report.html',
        openAnalyzer: false,
    }));

    return config;
}

module.exports = override;
