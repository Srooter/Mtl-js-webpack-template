const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = merge(common, {
  mode: 'production',
  // 参考：https://webpack.js.org/configuration/devtool/
  // Reference：https://webpack.js.org/configuration/devtool/
  devtool: 'nosources-source-map',
  optimization: {
    minimizer: [
      // 参考：https://webpack.js.org/plugins/terser-webpack-plugin/
      // Reference：https://webpack.js.org/plugins/terser-webpack-plugin/
      new TerserJSPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  plugins: [
    // 参考：https://github.com/johnagan/clean-webpack-plugin/
    // Reference：https://github.com/johnagan/clean-webpack-plugin/
    new CleanWebpackPlugin(),
    // 参考：https://github.com/NMFR/optimize-css-assets-webpack-plugin/
    // Reference：https://github.com/NMFR/optimize-css-assets-webpack-plugin/
    new OptimizeCSSAssetsPlugin(),
    // 参考：https://github.com/webpack-contrib/webpack-bundle-analyzer/
    // Reference：https://github.com/webpack-contrib/webpack-bundle-analyzer/
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'static',
      reportFilename: '../reports/bundle-analyzer-report.html',
    }),
  ],
})
