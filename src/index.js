import 'babel-polyfill'
import express from 'express'
import { matchRoutes } from 'react-router-config'
import proxy from 'express-http-proxy'
import Routes from './client/Routes'
import renderer from './helpers/renderer'
import createStore from './helpers/createStore'

const app = express()

app.use(
  '/api',
  proxy('http://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator(opts) {
      opts.headers['x-forwarded-host'] = 'localhost:3000' // 設置此 header 可讓 google 登入設定 redirect_uri 參數, 登入完後導回此網址, 而不是 api 網址 http://react-ssr-api.herokuapp.com/
      return opts
    },
  })
)

app.use(express.static('public'))

app.get('*', (req, res) => {
  const store = createStore(req)

  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null
  })

  Promise.all(promises).then(() => {
    res.send(renderer(req, store))
  })
})

app.listen(3000, () => {
  console.log('Listening on prot 3000')
})
