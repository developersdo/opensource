const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DefinePlugin = webpack.DefinePlugin

module.exports = {
  entry: path.join(__dirname, '../src/client/app.js'),
  output: {
    path: path.join(__dirname, '../docs'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }
    ],
  },
  plugins: [
    new DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/client/index.html'),
      inject: 'body',
      hash: true
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, '../docs')
  }
}
