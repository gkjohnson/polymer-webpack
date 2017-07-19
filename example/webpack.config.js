const webpack = require('webpack')
const fs = require('fs')

const config = function(env) {

  const elements = fs.readdirSync('./elements')
  let suffix = null
  let prefix = null
  let entry = null
  let skipNodeModules = false

  if(env && env.less) {
    // no node modules
    suffix = '.less'
    skipNodeModules = true
  } else {
    // inlude everything
    suffix = '.full'
    skipNodeModules = false
  }

  if(env && env.separate) {
    // separate
    entry = {}
    elements.forEach(dir => entry[`${dir}.bundle${suffix}`] = `./elements/${dir}/${dir}.html`)
  } else {
    // complete
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
          use: [
            { loader: 'babel-loader' },
            { loader: '../index.js' },
            { loader: 'wc-loader' },
          ]
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