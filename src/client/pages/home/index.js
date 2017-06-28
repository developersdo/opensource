import html from 'choo/html'

import popularRepos from './components/popular-repos'
import styles from './styles.scss'

export default (state, emit) => {

  return html`
    <div>
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
}
