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

  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      return route.loadData ? route.loadData(store) : null
    })
    .map(promise => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve)
        })
      }
    })

  Promise.all(promises)
    .then(() => {
      const context = {}

      const content = renderer(req, store, context)

      // 如果有需驗證的頁面, 不可訪問需要重新導向, context 內會有參數, server side 需使用以下方式重新導向
      // 不然後端將會直接返回渲染完的頁面, 在瀏覽器端時 js 才會重新導頁, 會有瞬間閃跳情況
      // 若這時瀏覽器有關掉 js, 用戶就不會重新導向
      if (context.url) {
        return res.redirect(301, context.url)
      }

      if (context.notFound) res.status(404)

      res.send(content)
    })
    .catch(() => {
      res.send('Something went wrong')
    })
})

app.listen(3000, () => {
  console.log('Listening on prot 3000')
})
