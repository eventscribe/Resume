module.exports = {
  chainWebpack: config => {
    config
      .plugin('case-sensitive-paths')
      .use(require('case-sensitive-paths-webpack-plugin'));
  },

  /* configureWebpack: {
    devtool: 'source-map',
    
    
  }, */
};
