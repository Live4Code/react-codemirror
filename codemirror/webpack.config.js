var fs = require('fs');
var React = require('react');
var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');
var Clean = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
const ROOT_PATH = path.resolve(__dirname);
const APP_TITLE = 'CodeMirror app';

const common = {
  entry: path.resolve(ROOT_PATH, 'app/main.jsx'),
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      _: "lodash"
    })
  ],
  output: {
    path: path.resolve(ROOT_PATH, 'build'),
    filename: 'bundle.js'
  }
};

if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['react-hot', 'babel'],
          include: path.resolve(ROOT_PATH, 'app')
        },
        {
          test: /\.css$/,
          loader: 'style!css',
          include: path.resolve(ROOT_PATH, 'app')
        },
        {
          test: /\.scss$/,
          loader: 'style!css!sass'
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: 'url?limit=25000'
        },
        {
          test: /\.(woff|woff2|svg|ttf|eot)(\?.+)?$/,
          loader: 'url?limit=100000'
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlwebpackPlugin({
        title: APP_TITLE
      })
    ]
  });
}

if(TARGET === 'build') {
  module.exports = merge(common, {
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['react-hot', 'babel'],
          include: path.resolve(ROOT_PATH, 'app')
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style', 'css')
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', 'css!sass'),
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: 'url?limit=25000'
        },
        {
          test: /\.(woff|woff2|svg|ttf|eot)(\?.+)?$/,
          loader: 'url?limit=100000'
        }
      ]
    },
    plugins: [
      new Clean(['build']),
      new ExtractTextPlugin('styles.css?[chunkhash]'),
      /*
      new webpack.DefinePlugin({
        'process.env': {
          // This affects react lib size
          'NODE_ENV': JSON.stringify('production')
        }
      }), */
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new HtmlwebpackPlugin({
        title: APP_TITLE
      })
    ]
  });
}
