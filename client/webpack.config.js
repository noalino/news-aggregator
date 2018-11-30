const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const dotenv = require('dotenv');

const htmlPlugin = new HtmlWebPackPlugin({
  template: 'public/index.html',
});

const cssPlugin = new MiniCssExtractPlugin({
  filename: '[name].css',
});

const syncPlugin = new BrowserSyncPlugin(
  {
    host: 'localhost',
    port: '8081',
    proxy: 'http://localhost:8080/',
  },
  {
    reload: false,
  },
);

const compressionPlugin = new CompressionPlugin({
  test: /\.(js|css)(\?.*)?$/i,
});

const cleanPlugin = new CleanWebpackPlugin('build', {});

/* Define envPlugin to use .env variables */
const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => ({
  ...prev,
  [`process.env.${next}`]: JSON.stringify(env[next]),
}), {});
const envPlugin = new webpack.DefinePlugin(envKeys);

const devMode = process.env.NODE_ENV !== 'production';

let plugins = [
  envPlugin,
  htmlPlugin,
  cssPlugin,
];

if (devMode) {
  // plugins = [...plugins, syncPlugin];
} else {
  plugins = [...plugins, compressionPlugin, cleanPlugin];
}

module.exports = {
  // entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/', // Enable 404 page on nested routes
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: path.resolve(__dirname, 'node_modules'),
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[name]_[hash:base64:5]',
              minimize: true,
              importLoaders: 2,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|ico|gif|png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '/images/', // First slash to enable nested routes
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true, // Redirect 404s to /index.html
  },
  plugins,
};
