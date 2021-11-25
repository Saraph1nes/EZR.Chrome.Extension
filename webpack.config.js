const { getThemeVariables } = require('antd/dist/theme');

let webpack = require('webpack'),
  path = require('path'),
  fileSystem = require('fs-extra'),
  env = require('./utils/env'),
  { CleanWebpackPlugin } = require('clean-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  TerserPlugin = require('terser-webpack-plugin');

const ASSET_PATH = process.env.ASSET_PATH || '/';

let alias = {
  'react-dom': '@hot-loader/react-dom',
  '@': path.resolve('src'),
  '@services': path.resolve('src/services'),
  '@model': path.resolve('src/model'),
  '@utils': path.resolve('src/common/utils'),
  '@constant': path.resolve('src/common/constant')
};

// load the secrets
let secretsPath = path.join(__dirname, 'secrets.' + env.NODE_ENV + '.js');

let fileExtensions = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'eot',
  'otf',
  'svg',
  'ttf',
  'woff',
  'woff2'
];

if (fileSystem.existsSync(secretsPath)) {
  alias['secrets'] = secretsPath;
}

let options = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    newtab: path.join(__dirname, 'src', 'pages', 'Newtab', 'index.jsx'),
    options: path.join(__dirname, 'src', 'pages', 'Options', 'index.jsx'),
    popup: path.join(__dirname, 'src', 'pages', 'Popup', 'index.jsx'),
    background: path.join(__dirname, 'src', 'pages', 'Background', 'index.js'),
    contentScript: path.join(__dirname, 'src', 'pages', 'Content', 'index.js'),
    devtools: path.join(__dirname, 'src', 'pages', 'Devtools', 'index.js'),
    panel: path.join(__dirname, 'src', 'pages', 'Panel', 'index.jsx')
  },
  chromeExtensionBoilerplate: {
    notHotReload: ['contentScript', 'devtools']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    publicPath: ASSET_PATH
  },
  module: {
    rules: [
      {
        // look for .css or .scss files
        test: /\.(css|less)$/,
        // in the `src` directory
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
                // modifyVars: {
                //   'primary-color': '#8bc34a',
                //   'heading-color': '#E3E3E3',
                //   'body-background': '#121212',
                //   'component-background': '#272727',
                //   'popover-background': '#272727',
                //   'text-color': '#E3E3E3',
                //   'text-color-secondary': '#A9A9A9',
                //   'divider-color': '#4a4a4a',
                //   'border-color-base': '#272727',// base border outline a component
                //   'border-color-split': '#272727',// split border inside a component
                //   'font-family': '"PingFang SC",-apple-system,Arial,"Microsoft YaHei","Microsoft JhengHei","Helvetica Neue",sans-serif'
                // },
                // modifyVars: getThemeVariables({
                //   'primary-color': '#8bc34a',
                //   dark: false, // 开启暗黑模式
                //   compact: false, // 开启紧凑模式
                // }),
                javascriptEnabled: true
              }
            }
          }
          // {
          //   loader: 'sass-loader',
          //   options: {
          //     sourceMap: true,
          //   },
          // },
        ]
      },
      {
        test: new RegExp('.(' + fileExtensions.join('|') + ')$'),
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        },
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/
      },
      { test: /\.(ts|tsx)$/, loader: 'ts-loader', exclude: /node_modules/ },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'source-map-loader'
          },
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: alias,
    extensions: fileExtensions
      .map((extension) => '.' + extension)
      .concat(['.js', '.jsx', '.ts', '.tsx', '.css'])
  },
  plugins: [
    new webpack.ProgressPlugin(),
    // clean the build folder
    new CleanWebpackPlugin({
      verbose: true,
      cleanStaleWebpackAssets: true
    }),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/manifest.json',
          to: path.join(__dirname, 'build'),
          force: true,
          transform: function(content, path) {
            // generates the manifest file using the package.json informations
            return Buffer.from(
              JSON.stringify({
                description: process.env.npm_package_description,
                version: process.env.npm_package_version,
                ...JSON.parse(content.toString())
              }),
            );
          }
        }
      ]
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/pages/Content/content.styles.css',
          to: path.join(__dirname, 'build'),
          force: true
        }
      ]
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/img/icon-128.png',
          to: path.join(__dirname, 'build'),
          force: true
        }
      ]
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/img/icon-34.png',
          to: path.join(__dirname, 'build'),
          force: true
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'Newtab', 'index.html'),
      filename: 'newtab.html',
      chunks: ['newtab'],
      cache: false
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'Options', 'index.html'),
      filename: 'options.html',
      chunks: ['options'],
      cache: false
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'Popup', 'index.html'),
      filename: 'popup.html',
      chunks: ['popup'],
      cache: false
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'Devtools', 'index.html'),
      filename: 'devtools.html',
      chunks: ['devtools'],
      cache: false
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'Panel', 'index.html'),
      filename: 'panel.html',
      chunks: ['panel'],
      cache: false
    })
  ],
  infrastructureLogging: {
    level: 'info'
  }
};

if (env.NODE_ENV === 'development') {
  options.devtool = 'cheap-module-source-map';
} else {
  options.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false
      })
    ]
  };
}

module.exports = options;
