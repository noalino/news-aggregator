const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
  template: 'public/index.html'
});

module.exports = {
  // entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: { loader: 'babel-loader' },
        exclude: path.resolve(__dirname, 'node_modules'),
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { 
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: "[name]_[local]_[hash:base64:5]",
              minimize: true,
              importLoaders: 1,
            }
          },
        ],
      }
    ]
  },
  plugins: [htmlPlugin]
};