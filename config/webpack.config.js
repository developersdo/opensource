const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DefinePlugin = webpack.DefinePlugin
const CommonsChunkPlugin =  webpack.optimize.CommonsChunkPlugin

module.exports = {
  entry: {
    app: path.join(__dirname, '../src/client/app.js')
  },
  output: {
    path: path.join(__dirname, '../docs'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { importLoaders: 1, modules: 1 } },
          { loader: 'sass-loader' }
        ]
      }
    ],
  },
  plugins: [
    new DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/client/index.html'),
      inject: 'body',
      hash: true
    }),
    new CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module) => /node_modules/.test(module.context),
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, '../docs')
  }
}
