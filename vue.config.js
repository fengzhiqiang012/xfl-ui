const path = require('path')
const glob = require('glob')
function resolve (dir) {
  return path.resolve(__dirname, dir)
}

const getEntrys = {}
glob.sync('./packages/**/index.js').forEach(path => {
  path = path.replace('.js', '')
  const name = path.split('./packages/')[1].split('/index')[0]
  getEntrys[name] = resolve(path)
})

// 开发环境配置
const DEV_CONFIG = {
  pages: {
    index: {
      entry: 'examples/main.js'
    }
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': resolve('packages')
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
      .add('/packages')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options
      })
  }
}
// 生成环境配置
const BUILD_CONFIG = {
  css: {
    extract: {
      filename: 'style/[name].css'
    }
  },
  configureWebpack: {
    entry: getEntrys,
    output: {
      filename: '[name]/index.js',
      libraryTarget: 'umd'
    }
  },
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
      .add('/packages')
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options
      })

    config.entryPoints.delete('app')// 清除原先入口文件配置中的app项

    config.optimization.delete('splitChunks')
    config.plugins.delete('copy')
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    config.plugins.delete('hmr')
  },
  outputDir: 'lib',
  productionSourceMap: false
}

module.exports = process.env.NODE_ENV === 'development' ? DEV_CONFIG : BUILD_CONFIG
