import html from 'choo/html'

import popularRepos from './components/popular-repos'
import styles from './styles.scss'

export default (state, emit) => {

  return html`
    <div onload=${ load }>
      <header class="${ styles.header }">
        <h1><span>Open Source communities</span></h1>
        <p>Dominican developers are contributing to open source on GitHub!</p>
      </header>
      <div class="divider"></div>
      <div class="section page-container">
        ${ popularRepos(state, emit) }
      </div>
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
