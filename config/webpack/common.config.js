const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const helpers = require('../helpers')

module.exports = {
  entry: {
    main: './src/index.jsx'
  },

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].chunk.js'
  },

  resolve: {
    extensions: [".jsx", ".js"],

    // Tell webpack what directories to search when resolving modules
    modules: [helpers.root('src'), 'node_modules']
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
    new CleanWebpackPlugin(['dist'], { root: helpers.root() }),

    // A webpack plugin that simplifies creation of HTML files to serve your webpack bundles.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        conservativeCollapse: false,
        collapseWhitespace: true,
      }
    }),

    new webpack.ProvidePlugin({
      Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    })
  ]
}
