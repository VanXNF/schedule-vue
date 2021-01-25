const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

const BASE_URL = process.env.NODE_ENV === 'production' ?
  '/' :
  '/'

module.exports = {

  baseUrl: BASE_URL,
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
  },
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/*': {
        target: 'http://remote.vanxnf.top:31180'
        // target: 'http://vanxnf.top:8080'
        // target: 'http://localhost:10000'
      }
    }
  }
}
