import html from 'choo/html'
import styles from './styles.scss'
import renderLoading from '../../../../components/loading'

const reposPaginationSize = 12
const reposPageSpan = 4

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
        ${ renderCurrentPageRepos() }
      </div>
      <ul class="pagination center">
        <li class="${ state.currentReposPage === 0 ? 'disabled' : styles.wavesEffect } ${ styles.paginationEdge }"><a onclick=${ goToFirstPage }><i class="material-icons">chevron_left</i><i class="material-icons">chevron_left</i></a></li>
        <li class="${ state.currentReposPage === 0 ? 'disabled' : styles.wavesEffect }"><a onclick=${ goToPreviousPage }><i class="material-icons">chevron_left</i></a></li>
        ${ getPagesList(state.currentReposPage, pagesCount, reposPageSpan).map(renderPageNumbers) }
        <li class="${ state.currentReposPage === pagesCount - 1 ? 'disabled' : styles.wavesEffect }"><a onclick=${ goToNextPage }><i class="material-icons">chevron_right</i></a></li>
        <li class="${ state.currentReposPage === pagesCount - 1 ? 'disabled' : styles.wavesEffect } ${ styles.paginationEdge }"><a onclick=${ goToLastPage }><i class="material-icons">chevron_right</i><i class="material-icons">chevron_right</i></a></li>
      </ul>
    </div>
  `

  function renderRepo(repo, index) {
    return html`
      <div class="col s12 l6 xl4">
        <div class="card z-depth-3">
          <div class="card-content">
            <span class="${ styles.cardNumber }">#${getRepoPositionNumber(index)}</span>
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
      <span class="badge ${ languages[language] || languages.other }">${ language }</span>
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

  function getPagesList(current, total, span) {
    let leftSpan = current - span
    let rightSpan = current + span + 1

    if (leftSpan < 0) {
      rightSpan += Math.abs(leftSpan)
      leftSpan = 0
    } else if (rightSpan > total) {
      leftSpan -= rightSpan - total
      rightSpan = total
    }

    const pages = []
    for (let i = leftSpan; i < rightSpan; i++) {
      pages.push(i)
    }
    return pages
  }

  function renderPageNumbers(pageIndex) {
    return html`
        <li onclick=${ () => selectPage(pageIndex) } class="${ state.currentReposPage === pageIndex ? 'active' : styles.wavesEffect }"><a class="${ styles.paginationLink }">${ pageIndex + 1 }</a></li>
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

  function goToFirstPage() {
    emit('repos.pagination.changed', 0)
  }

  function goToLastPage() {
    emit('repos.pagination.changed', pagesCount - 1)
  }

  function getRepoPositionNumber(arrayIndex) {
    return reposPaginationSize * state.currentReposPage + (arrayIndex + 1);
  }
}
