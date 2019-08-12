const path = require('path')
module.exports = {
  baseUrl: '/',
  outputDir: 'dist',
  publicPath: '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://10.0.0.29:8080', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/css/index.less')]
    }
  }
}
