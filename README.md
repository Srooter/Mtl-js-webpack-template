Mtl-js-webpack-template

English | [中文](README-zh.md)

A simple js webpack template，build a front-end js app with webpack.

![GitHub](https://img.shields.io/github/license/Srooter/Mtl-js-webpack-template)

## Features

1.Very esay to use html+js+css build front-end Multi pages app.

2.Integrate commonly webpack loaders and plugins.

### webpack Included loaders and plugins

- Loaders:
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

- Plugins:
  - `html-webpack-plugin`
  - `mini-css-extract-plugin`
  - `purgecss-webpack-plugin`
  - `stylelint-webpack-plugin`
  - `copy-webpack-plugin`
  - `clean-webpack-plugin`
  - `terser-webpack-plugin`
  - `optimize-css-assets-webpack-plugin`
  - `webpack-bundle-analyzer`
    
## Environment Support

Modern browser,like Chrome,Firefox,Edge last 2 versions.

## Usage

1. `git clone https://github.com/Srooter/Mtl-js-webpack-template.git` or download zip.

2. `npm install`

3. `npm run start`

## Config 

`.env` file 

### `JS_CSS_VERSION`

- Option: `param` | `file`
- Default: `param`

### `OUTPUT_PUBLIC_PATH`

- Type: `String`
- Default: ``
- Example：`http://www.xxx.com`                      

## Npm Command 

- `npm run clean`: Clean npm cache.

- `npm run start`: Start development environment.

- `npm run build`: Publish application.

- `npm run serve`: Test release application for Local http server.

- `npm run uncss`: Check css files unused styles and print to console.

- `npm run test`: Run unit test.

- `npm run prettier-html`: Formatter all html files.

- `npm run prettier-css`: Formatter all css files.

- `npm run prettier-js`: Formatter all js files.

- `npm run prettier-all`: Formatter all html,css,js files.

> `npm run uncss` Check src dir css files uCnused styles.

> `purgecss-webpack-plugin` Clean src (include vendor) dir css files unused styles.

## Reference

- [webpack](https://webpack.js.org/).

## License

The MIT License(http://opensource.org/licenses/MIT).
