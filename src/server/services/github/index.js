const debug = require('debug')('services:github')

const client = require('./client')
const queries = require('./queries')

module.exports = {

  /**
   * Search for users from GitHub API.
   *
   * @param {String} query The search string to look for.
   * @param {String} after When paginating forwards, the cursor to continue.
   *
   * @return {Promise} A promise.
   */
  async searchUsers(query, after = null) {
    debug('Search users:', { query, after })

    const results = await client.request(queries.searchUsers, { query, after })
    logRateLimit(results)
    return results
  },

  /**
   * Search for repositories from GitHub API.
   *
   * @param {String} query The search string to look for.
   * @param {String} after When paginating forwards, the cursor to continue.
   *
   * @return {Promise} A promise.
   */
  async searchRepos(query, after = null) {
    debug('Search repos:', { query, after })

    const response = await client.request(queries.searchRepos, { query, after })
    logRateLimit(response)

    // Filter repository nodes by GraphQL typename and by privacy (because we may be using a personal token
    // which may include private repository). We don't want to leak anything sensitive.
    response.search.nodes = response.search.nodes.filter((node) => {
      return node.__typename === 'Repository' && !node.isPrivate
    })

    return response
  }
}

function logRateLimit(response) {
  debug('Rate limit:', response.rateLimit)
  return response
}
