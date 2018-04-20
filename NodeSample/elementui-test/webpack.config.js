var path = require('path');
var webpack = require('webpack');
/*import path from 'path';
 import webpack from 'webpack';*/
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: { }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
        /*,options: {
          presets: ['es2015']
        }*/
      },
      /*{
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
      ,*/
      {
        test: /\.(eot|png|jpg|gif|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      }
    ]
  },
  /*module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.vue$/, loader: 'vue-loader' }
    ]
  },*/

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
      //,'$': resolve('./src/plugin/jquery-1.8.1.min.js')
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  externals: {
    jquery: 'window.$'
  },
  devtool: '#eval-source-map'
}

console.log( 'new webpack.ProvidePlugin()', new webpack.ProvidePlugin() );
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    //生产环境插件
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    //压缩插件
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    //加载优化插件
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
    /*,new webpack.ProvidePlugin({
      $: resolve('./src/plugin/jquery-1.8.1.min.js'),
      "window.$": resolve('./src/plugin/jquery-1.8.1.min.js'),
      Jquery: resolve('./src/plugin/jquery-1.8.1.min.js'),
      "window.Jquery": resolve('./src/plugin/jquery-1.8.1.min.js')
      ,$ : '$'
    })*/
  ])
}
