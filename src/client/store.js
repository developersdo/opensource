const base = process.env.NODE_ENV === 'development' ? '' : '/opensource'

export default (app) => {
  app.use((state, emitter) => {

    // Initialize state.
    state.loading = false
    state.users = []
    state.repos = []
    state.currentReposPage = 0

    // Initialize.
    fetch(`${base}/data/users.json`)
      .then((response) => response.json())
      .then((users) => emitter.emit('users.loaded', users))
      .catch((error) => emitter.emit('users.loaded:failed', error));

    fetch(`${base}/data/repos.json`)
      .then((response) => response.json())
      .then((repos) => emitter.emit('repos.loaded', repos))
      .catch((error) => emitter.emit('repos.loaded:failed', error));

    // State modifiers.
    emitter.on('repos.loaded', (repos) => {
      state.repos = repos
      emitter.emit('render')
    })

    emitter.on('users.loaded', (users) => {
      state.users = users
      emitter.emit('render')
    })

    emitter.on('repos.pagination.changed', (currentPage) => {
      state.currentReposPage = currentPage
      emitter.emit('render')
    })
  })
}
