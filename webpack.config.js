var HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/, use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/, use: [
          {
            loader: 'file-loader?name=[hash:6].[ext]',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/, use: [
          'file-loader?name=images/[name].[ext]',
          'image-webpack-loader'
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    stats: 'errors-only',
    open: true
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      title: 'My App',
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      template: './src/index.ejs'
    }),
    new HtmlWebpackPlugin({
      title: 'Contact Page',
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      filename: 'contact/index.html',
      template: './src/contact.ejs'
    })
  ]
}