var fs = require('fs')
var path = require('path')
var express = require('express')
var app = express()

app.set('port', (4992))
app.disable('x-powered-by')

try {
  fs.statSync('demo/dist')
  console.log('Serving static build from demo/dist/')
  console.log('Run `npm run clean` to return to development mode')
  app.use('/', express.static(path.join(__dirname, 'demo/dist')));
}
catch (e) {
  console.log('Serving development build with nwb middleware')
  console.log('Run `npm run build` to create a production build')
  app.use(require('nwb/express')(express))
}

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
  // Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

// go to home page
app.get('*', (req, res) => {
  res.redirect('/')
})

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/')
})