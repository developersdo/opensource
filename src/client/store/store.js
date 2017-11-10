import 'isomorphic-fetch'
import { merge, find, compact, orderBy } from 'lodash'
import utils from '~/utils'

// This is needed because I haven't figured out how to tell webpack-dev-server to
// serve the `public` directory under `/opensource`. Therefore the data is served
// at the root. ¯\_(ツ)_/¯
const baseUrl = process.env.NODE_ENV === 'development' ? '/data' : '/opensource/data'

const cache = {
  repos: null,
  users: null,
}

const fetcher = {
  repos: null,
  users: null,
}

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
  'python': 'blue darken-3 white-text',
  'haskell': 'green accent-4',
  'batchfile': 'light-green lighten-3',
  'javascript': 'amber lighten-2',
  'objective-c': 'blue white-text',
  'coffeescript': 'indigo darken-4 white-text',
}

const store = {
  getRepos({ force } = { force: false }) {
    if (cache.repos && !force) {
      return Promise.resolve(cache.repos)
    }
    if (fetcher.repos) {
      return fetcher.repos
    }
    fetcher.repos = fetch(`${baseUrl}/repos.json`)
      .then((response) => response.json())
      .then((response) => Promise.all(response.map(transformRepo)))
      .then((response) => {
        cache.repos = { error: false, ready: true, items: response }
        return cache.repos
      })
      .catch((error) => {
        console.error('Cannot fetch repos data.', error)
        return { error, ready: false, items: [] }
      })
    return fetcher.repos
  },
  getUsers({ force } = { force: false }) {
    if (cache.users && !force) {
      return Promise.resolve(cache.users)
    }
    if (fetcher.users) {
      return fetcher.users
    }
    fetcher.users = fetch(`${baseUrl}/users.json`)
      .then((response) => response.json())
      .then((response) => response.map(transformUser))
      .then((response) => {
        cache.users = { error: false, ready: true, items: response }
        return cache.users
      })
      .catch((error) => {
        console.error('Cannot fetch users data.', error)
        return { error, ready: false, items: [] }
      })
    return fetcher.users
  }
}

function transformRepo(repo) {
  return new Promise((resolve, reject) => {
    return store.getUsers()
      .then((users) => {
        let owner = find(users.items, { login: repo.name.split('/')[0] })
        if (!owner) {
          owner = {}
          console.warn(`Could not find user by login: ${repo.name}, probably the user changed his login. More details at: https://github.com/developersdo/opensource/issues/89`)
        }
        return resolve(merge(repo, {
          normalizedName: utils.unicodeNormalize(repo.name),
          normalizedDescription: utils.unicodeNormalize(repo.description),
          languages: parseLanguages(repo.languages),
          languageNames: repo.languages,
          user: owner,
          createdAt: new Date(repo.createdAt),
        }))
      })
      .catch(reject)
  })
}

function transformUser(user) {
  return merge(user, {
    normalizedName: utils.unicodeNormalize(user.name),
    githubUrl: `https://github.com/${user.login}`,
    createdAt: new Date(user.createdAt),
  })
}

function parseLanguages(input) {
  const names = compact(input.split(/\ +/g))
  const langs = names.map((name) => ({ name, color: languages[name] }))
  return orderBy(langs, ['name'], ['asc'])
}

export default store
