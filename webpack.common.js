const path = require('path')
const fs = require('fs')
var glob = require('glob')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
// 参考：https://github.com/motdotla/dotenv/
// Reference：https://github.com/motdotla/dotenv/
// 读取环境变量配置文件
require('dotenv').config()
const NODE_ENV = process.env.NODE_ENV !== 'production'
const JS_CSS_VERSION = process.env.JS_CSS_VERSION !== 'param'
const OUTPUT_PUBLIC_PATH = process.env.OUTPUT_PUBLIC_PATH
// 打包路径。
const distPath = path.resolve(__dirname, 'dist')
// 读取动态读取views目录中html文件。
const pages = fs.readdirSync(path.resolve(__dirname, 'src/views')).filter(fileName => fileName.endsWith('.html'))

module.exports = {
  // 参考：https://webpack.js.org/configuration/entry-context/
  // Reference：https://webpack.js.org/configuration/entry-context/
  entry: {
    common: './src/js/common/common.js',
    index: './src/js/pages/index.js',
  },
  // 参考：https://webpack.js.org/configuration/output/
  // Reference：https://webpack.js.org/configuration/output/
  output: {
    filename: JS_CSS_VERSION ? 'js/[name].[hash].js' : 'js/[name].js?v=[hash]',
    chunkFilename: JS_CSS_VERSION ? 'js/[name].bundle.[hash].js' : 'js/[name].bundle.js?v=[hash]',
    path: distPath,
    publicPath: OUTPUT_PUBLIC_PATH ? OUTPUT_PUBLIC_PATH : '/',
    pathinfo: false,
  },
  optimization: {
    // 参考：https://webpack.docschina.org/plugins/split-chunks-plugin/
    // Reference：https://webpack.docschina.org/plugins/split-chunks-plugin/
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  // 参考：https://webpack.js.org/configuration/externals/
  // Reference：https://webpack.js.org/configuration/externals/
  externals: {
    // jquery: 'jQuery',
  },
  plugins: [
    // 参考：https://webpack.js.org/plugins/provide-plugin/
    // Reference：https://webpack.js.org/plugins/provide-plugin/
    new webpack.ProvidePlugin({
      // $: "jquery",
      // jQuery: "jquery",
    }),
    // 参考：https://webpack.js.org/plugins/html-webpack-plugin/
    // Reference：https://webpack.js.org/plugins/provide-plugin/
    // 动态读取views目录中html文件，创建多页应用。
    ...pages.map(
      page =>
        new HtmlWebpackPlugin({
          meta: {
            viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
            'X-UA-Compatible': {
              'http-equiv': 'X-UA-Compatible',
              content: 'ie=edge',
            },
          },
          template: './src/views/' + page,
          filename: page,
          chunks: ['common', page.replace('.html', '')],
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
          inject: true,
        })
    ),
    // 参考：https://webpack.js.org/plugins/stylelint-webpack-plugin/
    // Reference：https://webpack.js.org/plugins/stylelint-webpack-plugin/
    new StyleLintPlugin({
      files: ['src/css/pages/*.css', 'src/css/common/*.css'],
    }),
    // 参考：https://github.com/FullHuman/purgecss-webpack-plugin/
    // Reference：https://github.com/FullHuman/purgecss-webpack-plugin/
    new PurgecssPlugin({
      paths: glob.sync(path.join(__dirname, 'src') + '/**/*', { nodir: true }),
      purifyOptions: {
        info: true,
        minify: false,
      },
    }),
    // 参考：https://webpack.js.org/plugins/mini-css-extract-plugin/
    // Reference：https://webpack.js.org/plugins/mini-css-extract-plugin/
    new MiniCssExtractPlugin({
      filename: JS_CSS_VERSION ? 'css/[name].[hash].css' : 'css/[name].css?v=[hash]',
      chunkFilename: JS_CSS_VERSION ? 'css/[id].[hash].css' : 'css/[id].css?v=[hash]',
    }),
    // 参考：https://webpack.js.org/plugins/copy-webpack-plugin/
    // Reference：https://webpack.js.org/plugins/copy-webpack-plugin/
    new CopyPlugin([
      {
        from: 'src/favicon.ico',
        to: distPath,
      },
    ]),
  ],
  // 参考：https://webpack.js.org/configuration/module/
  // Reference：https://webpack.js.org/configuration/module/
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: [
          // 参考：https://webpack.js.org/loaders/html-loader/
          // Reference：https://webpack.js.org/loaders/html-loader/
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'link:href'],
            },
          },
        ],
      },
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [
          // 参考：https://webpack.js.org/loaders/eslint-loader/
          // Reference：https://webpack.js.org/loaders/eslint-loader/
          {
            loader: 'eslint-loader',
            options: {
              ignore: false,
            },
          },
        ],
        include: path.resolve(__dirname, 'src/js'),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          // 参考：https://webpack.js.org/loaders/cache-loader/
          // Reference：https://webpack.js.org/loaders/cache-loader/
          'cache-loader',
          // 参考：https://webpack.js.org/loaders/thread-loader/
          // Reference：https://webpack.js.org/loaders/thread-loader/
          {
            loader: 'thread-loader',
            options: {
              workers: 2,
              workerParallelJobs: 50,
              poolRespawn: false,
              poolTimeout: 2000,
              poolParallelJobs: 50,
              name: 'js-pool',
            },
          },
          // 参考：https://webpack.js.org/loaders/babel-loader/
          // Reference：https://webpack.js.org/loaders/babel-loader/
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          // 参考：https://webpack.js.org/loaders/style-loader/
          // Reference：https://webpack.js.org/loaders/style-loader/
          NODE_ENV ? 'style-loader' : MiniCssExtractPlugin.loader,
          // 参考：https://webpack.js.org/loaders/css-loader/
          // Reference：https://webpack.js.org/loaders/css-loader/
          {
            loader: 'css-loader',
            options: {
              sourceMap: NODE_ENV,
              importLoaders: 1,
            },
          },
          // 参考：https://webpack.js.org/loaders/postcss-loader/
          // Reference：https://webpack.js.org/loaders/postcss-loader/
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: loader => {
                let postcssPgn = [
                  require('postcss-import')({ root: loader.resourcePath }),
                  require('postcss-preset-env')(),
                ]
                NODE_ENV && postcssPgn.push(require('cssnano')())
                return postcssPgn
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          // 参考：https://webpack.js.org/loaders/url-loader/
          // Reference：https://webpack.js.org/loaders/url-loader/
          {
            loader: 'url-loader',
            options: {
              limit: 20480,
              name: '[name].[hash].[ext]',
              outputPath: 'assets/images/',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['url-loader'],
      },
    ],
  },
}
