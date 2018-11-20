// Utilities
const path = require('path');

// Webpack plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Constants
const devMode = process.env.NODE_ENV === 'development';
const entry = './src/index.js';
const outputPath = 'build';
const hashCss = false;

// The webpack config
module.exports = {
  entry,
  output: { path: path.resolve(__dirname, outputPath) },
  mode: devMode ? 'development' : 'production',
  devtool: devMode && 'cheap-module-eval-source-map',
  plugins: [
    new CleanWebpackPlugin([outputPath]),
    new MiniCssExtractPlugin({
      filename: hashCss ? '[name].[hash].css' : '[name].css',
      chunkFilename: hashCss ? '[id].[hash].css' : '[id].css'
    })
  ],
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
