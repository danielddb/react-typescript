const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const commonConfig = require('./common.config')
const helpers = require('../helpers')
const argv = require('minimist')(process.argv.slice(2))

const envArgs = argv.env || {}

module.exports = webpackMerge(commonConfig, {
  devtool: 'inline-source-map',

  devServer: {
    historyApiFallback: true,
    proxy: [
      {
        context: envArgs.mockPath,
        target: `http://localhost:${envArgs.mockPort}`,
        pathRewrite: {
          [`^${envArgs.mockPath}`]: '/'
        }
      }
    ],
    stats: 'minimal'
  },

  module: {
    rules: [
      // All files with a '.js' or '.jsx' extension are handled by 'babel-loader'.
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        include: helpers.root('src'),
      },
    ]
  }
})
