import html from 'choo/html'

import renderLoading from '../../../../components/loading'
import styles from './styles.scss'

export default (state, emit) => {

  // Count langaues for each repos.
  const langStats = state.repos.reduce((stats, repo) => {
    const langs = repo.languages
      .split(' ')
      .filter((lang) => lang)

    langs.forEach((lang) => {
      if (!stats[lang]) {
        stats[lang] = 0
      }
      stats[lang]++
    })
    return stats
  }, {})

  return html`
    <div>
      <h3>📊 Stats</h3>
      <div class="row">
        <div class="col l6">
          ${ state.repos.length ? renderLangStats(langStats) : renderLoading() }
        </div>
        <div class="col l6"></div>
      </div>
    </div>
  `

  function renderLangStats(stats) {

    const langs = Object.keys(stats)
      .map((name) => {
        return {
          name,
          total: stats[name],
          percentage: ((stats[name] / state.repos.length) * 100).toFixed(2)
        }
      })
      .sort((a, b) => b.total - a.total)
      .slice(0, 12)

    return html`
      <div>
        <h4>Popular Languages <small>(across ${ state.repos.length } repos)</small></h4>
        ${ langs.map((lang) => {
          return html`
            <div>
              <span class="${ styles.name }">${ lang.name }</span>
              <strong>${ lang.percentage }%</strong>
              (${ lang.total } repos)
              <div class="progress ${ styles.progress }">
                <div class="determinate" style="width: ${ lang.percentage }%"></div>
              </div>
            </div>
          `
        }) }
      </div>
    `
  }

}
