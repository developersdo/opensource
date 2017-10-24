const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const FaviconsPlugin = require('favicons-webpack-plugin')
const DefinePlugin = webpack.DefinePlugin
const CommonsChunkPlugin =  webpack.optimize.CommonsChunkPlugin

const pathTo = {
  app: path.join(__dirname, '../src/client/Root.js'),
  public: path.join(__dirname, '../public'),
  index: path.join(__dirname, '../src/client/index.html'),
  client: path.join(__dirname, '../src/client/'),
  logo: path.join(__dirname, '../src/client/images/logo.png')
}

module.exports = {
  entry: {
    app: pathTo.app
  },
  output: {
    path: pathTo.public,
    filename: '[name].js',
    publicPath: '/opensource'
  },
  resolve: {
    alias: {
      '~': pathTo.client
    }
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
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new HtmlPlugin({
      template: pathTo.index,
      inject: 'body',
      hash: true,
      filename: 'index.html'
    }),
    new CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module) => /node_modules/.test(module.context),
    }),
    new FaviconsPlugin(pathTo.logo)
  ],
  devServer: {
    contentBase: pathTo.public,
    historyApiFallback: {
      index: '/opensource/index.html'
    }
  }
}
