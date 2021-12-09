const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  // TODO: Explain Source Map
  devtool: 'inline-source-map',
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.ts|\.tsx$/,
        include: __dirname,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [[
              '@babel/preset-env', {
                targets: {
                  esmodules: true
                }
              }],
              '@babel/preset-react']
          }
        }
      },
      {
        test: [/\.s[ac]ss$/i, /\.css$/i],
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [new Dotenv()],
  resolve: {
    extensions: ['.tsx', '.js'],
  },
  output: {
    filename: 'electron.js',
    path: path.resolve(__dirname, 'build', 'tsx'),
  },
};