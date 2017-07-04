import html from 'choo/html'
import styles from './styles.scss'
import renderLoading from '../../../../components/loading'

const reposPaginationSize = 12

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

  const reposCount = state.repos.length
  const pagesCount = Math.round(reposCount / reposPaginationSize)

  return html`
    <div>
      <h3>🔥 Popular Repositories</h3>
      <div class="row">
        ${renderCurrentPageRepos()}
      </div>
      <ul class="pagination center">
        <li class="${state.currentReposPage == 0 ? 'disabled' : 'waves-effect'}"><a onclick=${goToPreviousPage}><i class="material-icons">chevron_left</i></a></li>
        ${getPagesList().map(renderPageNumbers)}
        <li class="${state.currentReposPage == pagesCount - 1 ? 'disabled' : 'waves-effect'}"><a onclick=${goToNextPage}><i class="material-icons">chevron_right</i></a></li>
      </ul>
    </div>
  `

  function renderRepo(repo, index) {
    return html`
      <div class="col s12 l6 xl4">
        <div class="card z-depth-3">
          <div class="card-content">
            <a href="${ repo.url}" target="_blank" class="${styles.name}">${repo.name}</a>
            <div class="${ styles.user}">
              <img src="${ repo.user.avatarUrl}" class="${styles.avatar}" />
              <a href="https://github.com/${ repo.user.login}" target="_blank">${repo.user.login}</a>
            </div>
            <div class="${ styles.languages}">
              ${ repo.languages.map(renderLanguage)}
            </div>
          </div>
          <div class="card-action ${ styles.numbers}">
            <span><i class="material-icons amber-text text-darken-3">star</i> ${ repo.stargazers}</span>
            <span><i class="material-icons">call_split</i> ${ repo.forks}</span>
            <span><i class="material-icons">search</i> ${ repo.watchers}</span>
          </div>
        </div>
      </div>
    `
  }

  function renderLanguage(language) {
    return html`
      <span class="badge ${languages[language] || languages.other}">${language}</span>
    `
  }

  function renderCurrentPageRepos() {
    let currentPageRepos = getPageOfRepos(state.currentReposPage)
      .map(addUserAndLanguageInfo)

    return currentPageRepos.length ? currentPageRepos.map(renderRepo) : renderLoading()
  }

  function getPageOfRepos(index) {
    const max = reposPaginationSize * (index + 1)
    const min = max - reposPaginationSize
    return state.repos
      .sort((a, b) => b.stargazers - a.stargazers)
      .slice(min, max)
  }

  function addUserAndLanguageInfo(repo) {
    const [login, name] = repo.name.split('/')
    return {
      ...repo,
      name,
      user: state.users.find(user => user.login === login),
      languages: repo.languages ? repo.languages.split(' ') : [],
    }
  }

  function getPagesList() {
    const pages = []
    for (let i = 0; i < pagesCount; i++) {
      pages.push(i)
    }
    return pages
  }

  function renderPageNumbers(pageIndex) {
    return html`
        <li onclick=${() => selectPage(pageIndex)} class="${state.currentReposPage == pageIndex ? 'active' : 'waves-effect'}"><a>${pageIndex + 1}</a></li>
      `
  }

  function selectPage(pageIndex) {
    emit('repos.pagination.changed', pageIndex)
  }

  function goToNextPage() {
    if (state.currentReposPage < pagesCount - 1) {
      emit('repos.pagination.changed', state.currentReposPage + 1)
    }
  }

  function goToPreviousPage() {
    if (state.currentReposPage > 0) {
      emit('repos.pagination.changed', state.currentReposPage - 1)
    }
  }

}
