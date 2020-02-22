Mtl-js-webpack-template

中文 | [English](README.md)

一个简单的 JavaScript webpack 模板，用于创建一个基于 webpack 的 JavaScript 前端应用。

![GitHub](https://img.shields.io/github/license/Srooter/Mtl-js-webpack-template)

## 特征

1. 非常简单的使用 html+js+css 开发多页前端应用。

2. 集成了常用的 webpack 加载器与插件。

### webpack 包含的 loaders 与 plugins

- 加载器:
  - `html-loader`
  - `eslint-loader`
  - `babel-loader`
  - `style-loader`
  - `postcss-loader`
    - `postcss-import`
    - `postcss-preset-env`
    - `cssnano`
  - `url-loader`
  - `cache-loader`

- 插件:
  - `html-webpack-plugin`
  - `mini-css-extract-plugin`
  - `purgecss-webpack-plugin`
  - `stylelint-webpack-plugin`
  - `copy-webpack-plugin`
  - `clean-webpack-plugin`
  - `terser-webpack-plugin`
  - `optimize-css-assets-webpack-plugin`
  - `webpack-bundle-analyzer`
    
## 环境支持

现代浏览器，Chrome,Firefox,Edge的最新两个版本。

## 使用

1. `git clone https://github.com/Srooter/Mtl-js-webpack-template.git` 或者下载zip。

2. `npm install`

3. `npm run start`

## 配置 

`.env` 文件 

### `JS_CSS_VERSION`

- 选项: `param` | `file`
- 默认: `param`

### `OUTPUT_PUBLIC_PATH`

- 类型: `String`
- 默认: ``
- 例子：`http://www.xxx.com`                      

## Npm命令 

- `npm run clean`: 清除 npm 缓存。

- `npm run start`: 启用开发环境。

- `npm run build`: 发布应用。

- `npm run serve`: 启动本地服务器测试发布应用。

- `npm run uncss`: 检查css文件未使用的样式并打印在控制台。

- `npm run test`: 运行单元测试。

- `npm run prettier-html`: 格式化所有html文件。

- `npm run prettier-css`: 格式化所有css文件。

- `npm run prettier-js`: 格式化所有js文件。

- `npm run prettier-all`: 格式化所有html+css+js文件。

> `npm run uncss` 检查src目录的css文件未使用的样式。

> `purgecss-webpack-plugin` 清除src（包括第三方库）目录的css文件未使用的样式。

## 参考

- [webpack](https://webpack.js.org/).

## License

The MIT License(http://opensource.org/licenses/MIT).
