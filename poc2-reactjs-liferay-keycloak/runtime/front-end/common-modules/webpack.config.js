const path = require('path');
const { peerDependencies } = require('./package.json');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  mode: 'production',  // Optimization for production
  
  // Webpack entry to specify the main file (index.ts or index.tsx)
  entry: './src/index.ts',  // Assuming your entry is a TypeScript file
  
  output: {
    // Output directory for the compiled bundle
    path: path.resolve(__dirname, 'dist'),
    
    // Bundle file name
    filename: 'common-modules.bundle.js',
    
    // Expose this module as a UMD library
    library: 'common-modules', 
    libraryTarget: 'umd', 
  },

  resolve: {
    // Extensions to resolve automatically
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],  // Include .ts and .tsx extensions
  },
  
  module: {
    rules: [
      {
        test: /\.tsx?$/,  // Target .ts and .tsx files
        exclude: /node_modules/,  // Do not include files in node_modules
        use: {
          loader: 'ts-loader',  // Use ts-loader to transpile TypeScript
        },
      },
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
      {
        test: /\.css$/, // Target .css files
        use: [
          'style-loader', // Inject styles into DOM
          'css-loader',   // Turns CSS into JavaScript
        ],
      },
    ],
  },

  // Automatically exclude all peerDependencies and react-related dependencies fron final build : 
  // to avoid errors using useState and useRef
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    'react-router-dom': 'react-router-dom',
    'react-oidc-context': 'react-oidc-context',
    'oidc-client': 'oidc-client',
  },

  // JDA : see output folder and open bundle-report.html to visualize packaged dependencies
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',  // Génère un fichier HTML statique
      openAnalyzer: false,      // Ouvre automatiquement le rapport dans le navigateur
      reportFilename: 'bundle-report.html'  // Nom du fichier de rapport
    })
  ]

};
