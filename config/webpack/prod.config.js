const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const commonConfig = require('./common.config')
const helpers = require('../helpers')

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        include: helpers.root('src')
      }
    ]
  },

  plugins: [
    new UglifyJSPlugin({ ie8: false, output: { comments: false } }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => /node_modules/.test(module.resource)
    }),

    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: helpers.root('reports/bundle-analyzer/index.html')
    }),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
})
