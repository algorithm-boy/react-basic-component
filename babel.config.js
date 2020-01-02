module.exports = function (api) {
  const isProd = api.env('production')

  const presets = isProd
    ? [[
      'babel-preset-minify',
      {
        builtIns: false,
        removeConsole: false,
        removeDebugger: true
      }
    ], ['@babel/preset-typescript']]
    : [[
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: {
          version: 3
        }
      }
    ], [
      '@babel/preset-react',
      {
        development: api.env('development')
      }
    ], ['@babel/preset-typescript']]

  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-object-assign'
  ]

  return {
    presets,
    plugins
  }
}
