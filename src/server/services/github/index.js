const print = require('chalk-printer')

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
  searchUsers(query, after = null) {
    print.trace('Search users:', { query, after })

    return client.query({
      query: queries.searchUsers,
      variables: { query, after }
    }).then(logRateLimit)
  },

  /**
   * Search for repositories from GitHub API.
   *
   * @param {String} query The search string to look for.
   * @param {String} after When paginating forwards, the cursor to continue.
   *
   * @return {Promise} A promise.
   */
  searchRepos(query, after = null) {
    print.trace('Search repos:', { query, after })

    return client.query({
      query: queries.searchRepos,
      variables: { query, after }
    }).then(logRateLimit)
      .then((response) => {

        // Filter repository nodes by GraphQL typename and by privacy (because we may be using a personal token
        // which may include private repository). We don't want to leak anything sensitive.
        response.data.search.nodes = response.data.search.nodes.filter((node) => {
          return node.__typename === 'Repository' && !node.isPrivate
        })
        return response
      })
  }
}

function logRateLimit(response) {
  print.trace('Rate limit:', response.data.rateLimit)
  return response
}
