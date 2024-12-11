const path = require('path');
const fs = require('fs');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = function override(config) {

    // Disable all code splitting and merge everything into a single file for all environments
    config.optimization.splitChunks = {
      cacheGroups: {
        default: false, // Disable default chunking behavior
      },
    };

    // Generating .map files to ease debugging
    config.devtool = 'source-map',
  
    // Define the output filename for the main bundle
    config.output.filename = 'static/js/bundle.js'; // The final name of the bundle file
    config.output.chunkFilename = 'static/js/[name].chunk.js'; // Naming for chunk files (if any, they will be merged)

    // IMPORTANT : Authorize to resolve source outside of src folder. Workaround error:
    //      Module not found: Error: You attempted to import /home/dev/git/liferay-oauth-test/poc2-reactjs-liferay-keycloak/runtime/front-end/app2/react-app/node_modules/react which falls outside of the project src/ directory. Relative imports outside of src/ are not supported.
    //      You can either move it inside src/, or add a symlink to it from project's node_modules/.
    config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));

    // IMPORTANT : Force pearDependencies to resolve from the app2's node_modules. Avoid to include React twice 
    //Dynamically load peerDependancies from common-modules package.json
    const commonModulesPackageJson = path.resolve(__dirname, '../../common-modules/package.json');
    const commonModulesPackage = JSON.parse(fs.readFileSync(commonModulesPackageJson, 'utf8'));
    const peerDependencies = commonModulesPackage.peerDependencies || {};

    const peerDependencyAliases = Object.keys(peerDependencies).reduce((aliases, packageName) => {
      aliases[packageName] = path.resolve(__dirname, 'node_modules', packageName);
      return aliases;
    }, {});

    config.resolve.alias = {
      ...config.resolve.alias,
      ...peerDependencyAliases,
    };

    console.log('DECLARED ALIAS (to avoid including librairies twice) :', config.resolve.alias);

    // JDA : see output folder and open bundle-report.html to visualize packaged dependencies
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',  // Generate a static HTML file
        reportFilename: 'bundle-report.html',  // Name of the generated report
        openAnalyzer: false,  // Open the report automatically in the browser
      })
    );

    return config;
  };