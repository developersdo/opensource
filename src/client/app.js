import 'isomorphic-fetch'
import choo from 'choo'
import html from 'choo/html'

import configureRoutes from './router'
import configureLogger from './logger'
import configureStore from './store'

const app = choo()

configureRoutes(app)
configureStore(app)

if (process.env.NODE_ENV === 'development') {
  configureLogger(app)
}

app.mount('#app')
