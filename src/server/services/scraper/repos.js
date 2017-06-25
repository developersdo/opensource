const print = require('chalk-printer')

const srv = require('..')
const utils = require('../../utils')

module.exports = {

  /**
   * Scrape repositories data from GitHub API.
   *
   * @return {Promise} A promise.
   */
  async scrape() {
    print.trace('Scrape repositories data...')

    // Get all stored user logins.
    const logins = await srv.user.findAllUsers('login')
    const loginsChunks = utils.chunk(logins.map(l => l.login), 50)

    // Scrape repos data for each group of logins.
    for (const loginsChunk of loginsChunks) {
      await this.scrapeReposFromUsers(loginsChunk)
    }
  },

  /**
   * Scrape repositories from a specific set of user.
   *
   * @param {Array} users Users logins to query repositories.
   * @param {String} after The cursor to continue after.
   *
   * @return {Promise} A promise.
   */
  async scrapeReposFromUsers(users, after = null) {
    print.trace('Scrape repos of users:', users)

    const query = users.map(user => `user:${user}`).join(' ')
    return await srv.github.searchRepos(query, after)
      .then((response) => {

        // Store repos.
        const repos = response.data.search.nodes
        return srv.repo.createRepos(repos)
          .then(() => {

            // If a next page is available then let's fetch it.
            const { hasNextPage, endCursor } = response.data.search.pageInfo
            return hasNextPage ? this.scrapeReposFromUsers(users, endCursor) : Promise.resolve()
          })
      })
  }
}
