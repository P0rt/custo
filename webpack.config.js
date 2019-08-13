const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: { main: './index.js' },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use:  ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./vendor/[name].[ext]'
      },
      {
        test: /\.(svg|jpg)$/,
        loader: 'file-loader?name=./images/[name].[ext]'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: 'style.[contenthash].css',
    }),
    new CopyPlugin([
        { from: `${__dirname}/images`, to: 'images'}
    ]),
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      template: './index.html',
      filename: 'index.html',
      svgoConfig: {
        removeTitle: false,
        removeViewBox: true,
        convertStyleToAttrs: true,
        mergePaths: true,
        convertShapeToPath: true,
        transformsWithOnePath: true
      }
    }),
    new WebpackMd5Hash()
  ]
};