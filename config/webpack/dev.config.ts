import * as webpack from "webpack"
import * as webpackMerge from 'webpack-merge'

import commonConfig from './common.config'
import { root } from '../helpers'

const config: webpack.Configuration = webpackMerge(commonConfig, {
  entry: {
    main: ['react-hot-loader/patch', './src/index.tsx']
  },

  devtool: 'inline-source-map',
  
  devServer: {
    hot: true
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