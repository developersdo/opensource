import html from 'choo/html'

import renderPopularRepos from './components/popular-repos'
import renderStats from './components/stats'
import styles from './styles.scss'

export default (state, emit) => {

  return html`
    <div>
      <div class="row">
        <header class="${ styles.header }">
          <h1><span>Open Source communities</span></h1>
          <p>Dominican developers are contributing to open source on GitHub!</p>
        </header>
      </div>
      <div class="divider"></div>
      <div class="section page-container">
        ${ renderPopularRepos(state, emit) }
      </div>
      <div class="divider"></div>
      <div class="section page-container">
        ${ renderStats(state, emit) }
      </div>
    </div>
  `
}
