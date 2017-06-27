export default (app) => {
  app.use((state, emitter) => {

    // Initialize state.
    state.loading = false
    state.users = []
    state.repos = []

    // State modifiers.
    emitter.on('repos.loaded', (repos) => {
      state.repos = repos
      emitter.emit('render')
    })

    emitter.on('users.loaded', (users) => {
      state.users = users
      emitter.emit('render')
    })
  })
}
