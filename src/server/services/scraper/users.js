const print = require('chalk-printer')
const config = require('config')

const srv = require('..')
const utils = require('../../utils')

module.exports = {

  /**
   * Scrape users data from GitHub API.
   *
   * @return {Promise} A promise.
   */
  async scrape() {
    print.trace('Scrape users data...')

    // Scrape users data for each defined locations.
    for (const location of config.get('users.locations')) {
      await this.scrapeUsers(`location:"${location}"`)
    }

    // Scrape users data for specific users (those who can't be scraped by their location).
    const usernamesChunks = utils.chunk(config.get('users.include'), 50)
    for (const usernames of usernamesChunks) {
      const query = usernames.map(username => `user:${username}`).join(' ')
      await this.scrapeUsers(query)
    }
  },

  /**
   * Scrape users from a specific location.
   *
   * @param {String} location The location to query users.
   * @param {String} after The cursor to continue after.
   *
   * @return {Promise} A promise.
   */
  async scrapeUsers(query, after = null) {
    print.trace('Scrape users')

    return await srv.github.searchUsers(query, after)
      .then((response) => {

        // Store users.
        const users = response.data.search.nodes
        return srv.user.createUsers(users)
          .then(() => {

            // If a next page is available then let's fetch it.
            const { hasNextPage, endCursor } = response.data.search.pageInfo
            return hasNextPage ? this.scrapeUsers(query, endCursor) : Promise.resolve()
          })
      })
  }
}
