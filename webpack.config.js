const webpack = require('webpack');
const path = require('path');
const outputPath = path.join(__dirname, './public');

module.exports = {
  mode: 'development',
  devtool: 'inline-sourcemap',
  module: {
    rules: [
      {
        test: /\.css$|\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {test: /\.html$/, use: 'html-loader'},
      {
        test: /\.(jpe?g|png|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: './public/img/'
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: './public/font/'
          }
        }
      }
    ]
  },
  // plugins: [
  //   new webpack.ProvidePlugin({
  //     $: 'jquery',
  //     jQuery: 'jquery'
  //   })
  // ],
  entry: [
    './client/components/docker-man/docker-man.js',
    './client/components/containers-man/containers-man.js',
    './client/components/images-man/images-man.js',
    './client/components/volumes-man/volumes-man.js'
  ],
  output: {
    path: outputPath,
    filename: 'docker-man.bundle.js',
    publicPath: './public/img'
  }
};
