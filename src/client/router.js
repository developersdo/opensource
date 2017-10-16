import home from './pages/home'

const urlBase = process.env.NODE_ENV === 'development' ? '/' : '/opensource'

export default (app) => {
  app.route(`${urlBase}`, home)
}
