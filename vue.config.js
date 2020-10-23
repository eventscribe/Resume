module.exports = {
  configureWebpack: {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/Resume/'
    : '/',
    devtool: 'source-map',
  },
};
