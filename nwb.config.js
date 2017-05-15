var path = require('path');

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'reactCreditCard',
      externals: {
        react: 'React'
      }
    }
  },
  webpack: {
    aliases: {
      'src': path.resolve('src'),
    }
  }
}
