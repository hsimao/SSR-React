const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const webpackNodeExternals = require('webpack-node-externals')

const config = {
  // Inform webpack that we're building a  bundle
  // for nodeJS, rather than for the browser
  target: 'node',

  // Tell webpack the root file of our
  // server application
  entry: './src/index.js',

  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },

  // 不要將有引入 node_modules 的插件編譯到 bundle.js 內
  externals: [webpackNodeExternals()],
}

module.exports = merge(baseConfig, config)
