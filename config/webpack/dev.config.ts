import * as webpack from 'webpack'
import * as webpackMerge from 'webpack-merge'
import commonConfig from './common.config'
import { root } from '../helpers'
const argv = require('minimist')(process.argv.slice(2))

const envArgs = argv.env || {}

const config: webpack.Configuration = webpackMerge(commonConfig, {
  entry: {
    main: ['react-hot-loader/patch', './src/index.tsx']
  },

  devtool: 'inline-source-map',

  devServer: {
    historyApiFallback: true,
    hot: true,
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
      // All files with a '.ts' or '.tsx' extension are handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loaders: [
          'react-hot-loader/webpack',
          'awesome-typescript-loader'
        ],
        include: root('src'),
      },
    ]
  },

  plugins: [
    new webpack.NamedModulesPlugin(),

    new webpack.HotModuleReplacementPlugin()
  ]
})

export default config
