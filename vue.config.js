// const webpack = require("webpack");
// import JSONBIG from './src/'
module.exports = {

  devServer: {
    proxy: {
      //所有api都可代理
      '/api': {
        //请求的地址
        target: 'http://wisdom.jd.brotop.cn/prod',
        // target: 'http://wisdom.jd.brotop.cn/dev-api',
        // target: 'http://192.168.12.180:3086',
        //当前是否跨域
        changeOrigin: true,
        pathRewrite: {
          '^/api': 'api'
        }
      }
    }
  },
  publicPath: "./"
}
