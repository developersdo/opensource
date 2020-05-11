import 'isomorphic-fetch'
import { merge, find, compact, orderBy } from 'lodash'
import utils from '~/utils'
import { languageColor } from '~/utils/colors'

const baseUrl = 'https://developersdo.github.io/opensource-data/'

const cache = {
  repos: null,
  users: null,
}

const fetcher = {
  repos: null,
  users: null,
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
  const langs = names.map((name) => {
    return {
      name: name,
      color: languageColor(name).backgroundColor,
    }
  })
  return orderBy(langs, ['name'], ['asc'])
}

export default store
