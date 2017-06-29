import html from 'choo/html'
import styles from './styles.scss'

const languages = {
  'other': 'grey lighten-3',
  'c': 'grey darken-3 white-text',
  'c#': 'green darken-3 white-text',
  'go': 'blue darken-4 white-text',
  'c++': 'pink accent-2 white-text',
  'php': 'indigo lighten-1 white-text',
  'css': 'deep-purple white-text',
  'html': 'red white-text',
  'java': 'brown lighten-3',
  'shell': 'green accent-3',
  'pascal': 'lime lighten-4',
  'haskell': 'green accent-4',
  'batchfile': 'light-green lighten-3',
  'javascript': 'amber lighten-2',
  'objective-c': 'blue white-text',
  'coffeescript': 'indigo darken-4 white-text',
}

export default (state, emit) => {

  const repos = state.repos
    .sort((a, b) => b.stargazers - a.stargazers)
    .slice(0, 12)
    .map(repo => {
      const [login, name] = repo.name.split('/')
      return {
        ...repo,
        name,
        user: state.users.find(user => user.login === login),
        languages: repo.languages ? repo.languages.split(' ') : [],
      }
    })

  return html`
    <div>
      <h3>🔥 Popular Repositories</h3>
      <div class="row">
        ${ repos.length ? repos.map(renderRepo) : html`<div class="progress"><div class="indeterminate"></div></div>` }
      </div>
    </div>
  `

  function renderRepo(repo, index) {
    return html`
      <div class="col s12 l6 xl4">
        <div class="card z-depth-3">
          <div class="card-content">
            <a href="${ repo.url }" target="_blank" class="${ styles.name }">${ repo.name }</a>
            <div class="${ styles.user }">
              <img src="${ repo.user.avatarUrl }" class="${ styles.avatar }" />
              <a href="https://github.com/${ repo.user.login }" target="_blank">${ repo.user.login }</a>
            </div>
            <div class="${ styles.languages }">
              ${ repo.languages.map(renderLanguage) }
            </div>
          </div>
          <div class="card-action ${ styles.numbers }">
            <span><i class="material-icons amber-text text-darken-3">star</i> ${ repo.stargazers }</span>
            <span><i class="material-icons">call_split</i> ${ repo.forks }</span>
            <span><i class="material-icons">search</i> ${ repo.watchers }</span>
          </div>
        </div>
      </div>
    `
  }

  function renderLanguage(language) {
    return html`
      <span class="badge ${languages[language] || languages.other}">${ language }</span>
    `
  }
}
