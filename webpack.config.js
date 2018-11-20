module.exports = require('./getWebpackConfig')({
  entry: { style: './src/style.scss' },
  outputPath: 'build',
  remove: ['style.js']
});
