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
  }
}
