const path = require('path');

module.exports = {
  mode: 'production',  // Optimisation pour la production
  
  // Entrée de Webpack pour spécifier le fichier principal (index.js)
  entry: './src/index.js',  // Tu peux étendre ceci avec un glob si nécessaire
  
  output: {
    // Répertoire de sortie pour le bundle compilé
    path: path.resolve(__dirname, 'dist'),
    
    // Nom du fichier du bundle
    filename: 'common-modules.bundle.js',
    
    // Exposition de ce module comme une bibliothèque UMD
    library: 'common-modules', 
    libraryTarget: 'umd', 
  },

  resolve: {
    // Extensions à résoudre automatiquement
    extensions: ['.js', '.jsx'],  // Inclure les extensions .js et .jsx
  },
  
  module: {
    rules: [
      {
        test: /\.jsx?$/,  // Cibler les fichiers .js et .jsx
        exclude: /node_modules/,  // Ne pas inclure les fichiers dans node_modules
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',   // Transpile le JavaScript moderne
              '@babel/preset-react', // Support pour JSX et React
            ],
            plugins: [
              '@babel/plugin-syntax-dynamic-import',  // Permet les imports dynamiques
            ],
          },
        },
      },
    ],
  },
};

