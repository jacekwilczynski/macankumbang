module.exports = require('./getWebpackConfig')({
  devMode: process.env.NODE_ENV === 'development',
  outputPath: 'build'
});
