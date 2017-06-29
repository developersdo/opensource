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

  const langs = Object.keys(langStats)
    .map((name) => {
      return {
        name,
        total: langStats[name],
        percentage: ((langStats[name] / state.repos.length) * 100).toFixed(2)
      }
    })
    .sort((a, b) => b.total - a.total)

  return html`
    <div>
      <div class="row">
        <h3>📊 Stats</h3>
        <div class="col s12 m6">
          ${ state.repos.length ? renderLangStats(langs) : renderLoading() }
        </div>
        <div class="col s12 m6">
          ${ state.repos.length && state.users.length ? renderInterestingNumbers(langs) : renderLoading() }
        </div>
      </div>
    </div>
  `

  function renderLangStats(langs) {
    langs = langs.slice(0, 12)
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

  function renderInterestingNumbers(langs) {

    const usersWithMoreThanTenRepo = state.users
      .filter((user) => user.sources > 10)
      .length

    const reposWithMoreThanOneStargazer = state.repos
      .filter((repo) => repo.stargazers > 1)
      .length

    return html`
      <div>
        <h4>Some Interesting Numbers</h4>
        <ul class="collection">
          <li class="collection-item">
            <h4><i class="material-icons">perm_identity</i> ${ state.users.length } users <small>are contributing to open source.</small></h4>
            <p>(organizations are not counted)</p>
            <p>Among that number of users, <strong>${ usersWithMoreThanTenRepo } have more 10 repos</strong>.</p>
          </li>
          <li class="collection-item">
            <h4><i class="material-icons">code</i> ${ state.repos.length } repos <small>created on GitHub. In average, each user contribute with ${ (state.repos.length / state.users.length).toFixed(1) } repos.</small></h4>
            <p>(excluding forks)</p>
            <p>Interesting, the fact that there are <strong>${ reposWithMoreThanOneStargazer } repos with more than one star</strong>.</p>
          </li>
          <li class="collection-item">
            <h4><i class="material-icons">assessment</i> ${ langs.length } programming languages <small>in use across ${ state.repos.length } repos.</small></h4>
            <p>The <strong>less used languages</strong> among dominican developers in open source via GitHub are: ${ langs.slice(-10).map((lang) => lang.name).join(', ') }.</p>
          </li>
        </ul>
      </div>
    `
  }

}
