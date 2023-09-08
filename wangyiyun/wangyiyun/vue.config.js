const { defineConfig } = require('@vue/cli-service')

const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
  
    devServer: {
      proxy: 'http://localhost:3000'
    },
  transpileDependencies: true
};
