import html from 'choo/html'
export default (state, emit) => {

  return html`
    <div onload=${load}>
      Home
    </div>
  `

  function load() {
    Promise.resolve()
      .then(fetchData('/data/users.json', 'users.loaded', 'users.loaded:failed'))
      .then(fetchData('/data/repos.json', 'repos.loaded', 'repos.loaded:failed'))
  }

  function fetchData(url, succeed, failed) {
    return () => fetch(url)
      .then((data) => data.json())
      .then((json) => emit(succeed, json))
      .catch((error) => emit(failed, error))
  }
}
