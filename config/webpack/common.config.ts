import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import * as webpack from "webpack"
const CleanWebpackPlugin = require('clean-webpack-plugin')

import { root } from '../helpers'

const config: webpack.Configuration = {
  entry: {
    main: './src/index.tsx'
  },

  output: {
    path: root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].chunk.js'
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js"],

    // Tell webpack what directories to search when resolving modules
    modules: [root('src'), 'node_modules']
  },

  module: {
    rules: [
      // Image files are handled by 'file-loader'.
      { test: /\.(png|svg|jpg|gif)$/, use: ['file-loader'] },

      // Font files are handled by 'file-loader'.
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] },

      // All output '.js' files have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },

  plugins: [
    // A webpack plugin to remove/clean the build folder before building.
    new CleanWebpackPlugin(['dist'], { root: root() }),

    // A webpack plugin that simplifies creation of HTML files to serve your webpack bundles.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        conservativeCollapse: false,
        collapseWhitespace: true,
      }
    })
  ]
}

export default config