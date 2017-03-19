module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'cmxCreditCard',
      externals: {
        react: 'React'
      }
    }
  }
}
