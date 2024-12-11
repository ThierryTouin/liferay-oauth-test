const path = require('path');
const { peerDependencies } = require('./package.json'); // Load peerDependencies dynamically
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'production', // Optimize the build for production

  // Webpack entry point specifying the main file
  entry: './src/index.ts',

  // Generate source maps for easier debugging
  devtool: 'source-map',

  output: {
    // Directory for the compiled bundle
    path: path.resolve(__dirname, 'dist'),

    // Bundle file name
    filename: 'common-modules.bundle.js',

    // Expose this module as a UMD library
    library: 'common-modules',
    libraryTarget: 'umd',
  },

  resolve: {
    // Automatically resolve these extensions
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/, // Target TypeScript files (.ts and .tsx)
        exclude: /node_modules/, // Exclude files in node_modules
        use: {
          loader: 'ts-loader', // Use ts-loader to transpile TypeScript
        },
      },
      {
        test: /\.jsx?$/, // Target JavaScript and JSX files (.js and .jsx)
        exclude: /node_modules/, // Exclude files in node_modules
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',   // Transpile modern JavaScript
              '@babel/preset-react', // Support for JSX and React
            ],
            plugins: [
              '@babel/plugin-syntax-dynamic-import', // Allow dynamic imports
            ],
          },
        },
      },
      {
        test: /\.css$/, // Target CSS files
        use: [
          'style-loader', // Inject styles into the DOM
          'css-loader',   // Turn CSS into JavaScript
        ],
      },
    ],
  },

  // Automatically exclude all peerDependencies from the resulting output file
  externals: (() => {
    const externals = Object.keys(peerDependencies).reduce((result, packageName) => {
      result[packageName] = packageName; // Map each dependency to its own name (UMD-compatible)
      return result;
    }, {});

    // Log the externalized libraries for debugging purposes
    console.log('IMPORTANT : Excluding the following peerDependencies as externals:', Object.keys(externals));
    return externals;
  })(),

  // Bundle analysis plugin : to debug packaged dependencies
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static', // Generate a static HTML file
      openAnalyzer: false,    // Do not automatically open the report in the browser
      reportFilename: 'bundle-report.html', // Name of the report file
    }),
  ],
};
