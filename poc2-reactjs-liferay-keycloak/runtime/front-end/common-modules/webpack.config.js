const path = require('path');

module.exports = {
  mode: 'production',  // Optimization for production
  
  // Webpack entry to specify the main file (index.js)
  entry: './src/index.js',  // You can extend this with a glob if necessary
  
  output: {
    // Output directory for the compiled bundle
    path: path.resolve(__dirname, 'dist'),
    
    // Bundle file name
    // WARNING !!!! this name must match the one configured in package.json
    filename: 'common-modules.bundle.js',
    
    // Expose this module as a UMD library
    library: 'common-modules', 
    libraryTarget: 'umd', 
  },

  resolve: {
    // Extensions to resolve automatically
    extensions: ['.js', '.jsx'],  // Include .js and .jsx extensions
  },
  
  module: {
    rules: [
      {
        test: /\.jsx?$/,  // Target .js and .jsx files
        exclude: /node_modules/,  // Do not include files in node_modules
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',   // Transpile modern JavaScript
              '@babel/preset-react', // Support for JSX and React
            ],
            plugins: [
              '@babel/plugin-syntax-dynamic-import',  // Allows dynamic imports
            ],
          },
        },
      },
    ],
  },
};
