const print = require('chalk-printer')

const client = require('./client')
const queries = require('./queries')

module.exports = {

  /**
   * Search for users from GitHub API.
   *
   * @param {Object} params The parameters.
   * @return {Promise} A promise.
   */
  searchUsers(params = {}) {
    print.trace('Search users:', params)

    return client.query({
      query: queries.searchUsers,
      variables: {
        query: params.query,
        after: params.after || null
      }
    })
  }
}
