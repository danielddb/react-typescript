import * as webpack from 'webpack'
import * as webpackMerge from 'webpack-merge'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

import commonConfig from './common.config'
import { root } from '../helpers'

const config: webpack.Configuration = webpackMerge(commonConfig, {
  devtool: 'cheap-module-source-map',

  module: {
    rules: [
      { test: /\.tsx?$/, use: ['awesome-typescript-loader'] }
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
      reportFilename: root('reports/bundle-analyzer/index.html')
    }),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
})

export default config
