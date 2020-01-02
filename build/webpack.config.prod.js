// ! This script has been depreciated
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const { promisify } = require('util')
const del = require('del')

const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
async function clearDir () {
  await del.sync('lib/*')
  await del.sync('es/*')
}

async function createConfig () {
  const entryPaths = {}
  const files = await readdir('src/components')
  const len = files.length
  for (let i = 0; i < len; i++) {
    const file = files[i];
    const filePath = path.resolve(__dirname, '../src/components/', file)
    const stats = await stat(filePath)
    if (stats.isDirectory()) {
      entryPaths[file] = filePath
    }
  }

  return {
    entry: {
      // index: path.resolve(__dirname, '../src/components', 'index.ts'),
      ...entryPaths
    },
    output: {
      filename: '[name]/index.js',
      path: path.resolve(__dirname, '../lib')
    },
    externals: [
      {
        react: {
          root: 'React',
          commonjs: 'react',
          commonjs2: 'react',
          amd: 'react'
        },
        'react-dom': {
          root: 'ReactDOM',
          commonjs: 'react-dom',
          commonjs2: 'react-dom',
          amd: 'react-dom'
        },
        'react-router': {
          root: 'react-router',
          commonjs: 'react-router',
          commonjs2: 'react-router',
          amd: 'react-router'
        },
        lodash: {
          root: 'lodash',
          commonjs: 'lodash',
          commonjs2: 'lodash',
          amd: 'lodash'
        },
        'peeler-js': {
          root: 'peeler-js',
          commonjs: 'peeler-js',
          commonjs2: 'peeler-js',
          amd: 'peeler-js'
        },
        'fe-supervisor': {
          root: '$sv',
          commonjs: 'fe-supervisor',
          commonjs2: 'fe-supervisor',
          amd: 'fe-supervisor'
        }
      }
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: path.resolve(__dirname, "..", "src/components/"),
          exclude: /node_modules/,
          use: [
            {loader: 'babel-loader'}
          ]
        },
        {
          test: /\.(ts|tsx)$/,
          include: path.resolve(__dirname, "..", "src/components/"),
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader'
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    mode: 'production',
    plugins: [
      new webpack.ProgressPlugin(function handler (percentage, msg) {
        console.log((percentage.toFixed(4) * 100) + '%', msg)
      })
    ]
  }
}

clearDir()
module.exports = createConfig()