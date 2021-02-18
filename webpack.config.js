const webpack = require('webpack');
const path = require('path');


module.exports = {

  target: 'electron-renderer',
  entry: {
    'index': './index.ts',
    'app/HomePage': './app/render/pages/HomePage/index.tsx',
    'app/AboutPage': './app/render/pages/AboutPage/index.tsx',
  },

  output: {
    path: path.resolve(__dirname, './dist/build'),
    filename: '[name].js'
  },

  node: {
    __filename: false,
    __dirname: false
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json',],
    alias: {
      '@': path.resolve('./app/render'),
    },
  },

  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|dist)/,
        use: [
          'ts-loader',
        ],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {},
    }),
  ],

  externals: {},
};
