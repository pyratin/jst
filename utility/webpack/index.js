'use strict';

import dotenv from 'dotenv';
import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

module.exports = {
  entry: {
    bundle: [path.join(process.cwd(), 'source/client')]
  },
  output: {
    path: path.join(process.cwd(), 'source/client'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new webpack.DefinePlugin({
      'globalThis.ENCRYPT_STORAGE_SECRET': JSON.stringify(
        process.env.ENCRYPT_STORAGE_SECRET
      )
    }),
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@emotion/babel-preset-css-prop'
              ]
            }
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor.bundle'
        }
      }
    }
  },
  devServer: {
    proxy: {
      '*': 'http://localhost:3000'
    }
  },
  resolve: {
    alias: {
      client: path.join(process.cwd(), 'source/client')
    },
    fallback: { crypto: false }
  }
};
