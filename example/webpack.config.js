const webpack = require('webpack')
const fs = require('fs')

const config = function(env) {

  const elements = fs.readdirSync('./elements')
  let loaders = [{ loader: 'babel-loader' }, { loader: '../index.js'}, { loader: 'wc-loader' }]
  let suffix = ''
  let prefix = ''
  let entry = null
  let skipNodeModules = false

  // Whether output unguarded bundles or not
  if(env && env.unguarded) {
    loaders = [{ loader: 'babel-loader' }, { loader: 'wc-loader' }]
    suffix = '.unguarded'
  }

  // whether to bundle all dependencies or not
  if(env && env.less) {
    suffix += '.less'
    skipNodeModules = true
  } else {
    suffix += '.full'
    skipNodeModules = false
  }

  // whether to bundle as separate element files or not
  if(env && env.separate) {
    entry = {}
    elements.forEach(dir => entry[`${dir}.bundle${suffix}`] = `./elements/${dir}/${dir}.html`)
  } else {
    entry = { [`bundle${suffix}`] : elements.map(dir => `./elements/${dir}/${dir}.html`) }
  }

  return {
    entry,
    output: {
      path: __dirname + "/dist",
      filename: `[name].js`
    },

    module: {
      rules: [
        {
          test: /\.html$/,
          use: loaders
        },
        {
          test: /\.js$/,
          use: 'babel-loader'
        }
      ]
    },
    
    externals: [
      function(context, request, callback) {
        if (skipNodeModules && /node_modules/.test(request)){
          return callback(null, 'commonjs ' + request);
        }
        callback();
      }
    ],

    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        include: /\.min\.js$/,
        minimize: true
      })
    ]
  }
}

module.exports = config