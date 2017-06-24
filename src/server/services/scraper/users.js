const print = require('chalk-printer')
const config = require('config')

const srv = require('..')

module.exports = {

  /**
   * Scrape users data from GitHub API.
   *
   * @return {Promise} A promise.
   */
  async scrape() {
    print.trace('Scrape data...')

    // Scrape users data for each defined locations.
    for (const location of config.get('users.locations')) {
      await this.scrapeUsersInLocation(location)
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
  async scrapeUsersInLocation(location, after = null) {
    print.trace('Scrape users in location', { location, after })

    return await srv.github.searchUsers({ after, query: `location:"${location}"` })
      .then((response) => {

        // Store users.
        const users = response.data.search.nodes.filter((node) => node.__typename === 'User')
        return srv.user.createUsers(users)
          .then(() => {

            // If a next page is available then let's fetch it.
            const { hasNextPage, endCursor } = response.data.search.pageInfo
            return hasNextPage ? this.scrapeUsersInLocation(location, endCursor) : Promise.resolve()
          })
      })
  }
}
