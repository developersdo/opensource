import 'isomorphic-fetch'
import choo from 'choo'
import html from 'choo/html'
import logger from 'choo-log'

import configureRoutes from './router'
import configureStore from './store'

import './app.scss'

const app = choo()

configureRoutes(app)
configureStore(app)

if (process.env.NODE_ENV === 'development') {
  app.use(logger())
}

app.mount('#app')
