const path = require('path')
var webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  // 参考：https://webpack.js.org/configuration/dev-server/
  // Reference：https://webpack.js.org/configuration/dev-server/
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    contentBase: [path.join(__dirname, 'dist'), path.join(__dirname, 'src')],
    useLocalIp: true,
    watchContentBase: true,
    compress: true,
    overlay: true,
    hot: true,
    inline: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
      },
    },
  },
  plugins: [
    // 参考：https://webpack.js.org/plugins/hot-module-replacement-plugin/
    // Reference：https://webpack.js.org/plugins/hot-module-replacement-plugin/
    new webpack.HotModuleReplacementPlugin()
  ],
})
