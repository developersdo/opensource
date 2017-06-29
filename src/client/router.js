import home from './pages/home'

const base = process.env.NODE_ENV === 'development' ? '/' : '/opensource'

export default (app) => {
  app.route(`${base}`, home)
}
