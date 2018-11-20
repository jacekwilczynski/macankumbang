// Utilities
const path = require('path');

// Webpack plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// The webpack config generator
module.exports = function getWebpackConfig({
  entry = './src/index.js',
  devMode,
  outputPath = 'dist'
} = {}) {
  return {
    entry,
    output: outputPath && { path: path.resolve(outputPath) },
    mode: devMode ? 'development' : 'production',
    devtool: devMode && 'cheap-module-eval-source-map',
    plugins: [new CleanWebpackPlugin([outputPath]), new MiniCssExtractPlugin()],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: { presets: ['@babel/preset-env'] }
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { importLoaders: 2 }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [require('autoprefixer')(), require('cssnano')()]
              }
            },
            'sass-loader'
          ]
        }
      ]
    }
  };
};
