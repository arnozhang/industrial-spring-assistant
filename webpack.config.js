const webpack = require('webpack');
const path = require('path');


const isProduction = process.env.NODE_ENV === 'prod';
console.log(`\nbuild for ${process.env.NODE_ENV} environment...\n`);

module.exports = {
  mode: isProduction ? 'production' : 'development',

  target: 'electron-renderer',
  entry: {
    'index': './src/main/index.ts',
    'render': './src/render/render.tsx',
  },

  output: {
    path: path.resolve(__dirname, './build/'),
    filename: '[name].js'
  },

  node: {
    __filename: false,
    __dirname: false
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.json', '.less',],
    alias: {
      '@@': path.resolve('./src'),
      '@': path.resolve('./src/render'),
    },
  },

  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]_[local]_[hash:base64:6]',
                exportLocalsConvention: 'camelCase',
              },
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|build|dist)/,
        use: [
          'ts-loader',
        ],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: /(node_modules|build|dist)/,
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
