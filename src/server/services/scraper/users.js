const debug = require('debug')('services:scrapper:users')
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
    debug('Scrape users data...')

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
    debug('Scrape users')

    return await srv.github.searchUsers(query, after)
      .then((response) => {

        // Store users.
        const accounts = this.transform(response)
        const users = accounts.filter((account) => account.type === 'User')
        return srv.user.createOrUpdateUsers(users)
          .then(() => {

            // If a next page is available then let's fetch it.
            const { hasNextPage, endCursor } = response.data.search.pageInfo
            return hasNextPage ? this.scrapeUsers(query, endCursor) : Promise.resolve()
          })
      })
  },

  /**
   * Transform a response into user record object ready to be inserted.
   * @param {Object} response The response.
   * @return {Array}
   */
  transform(response) {
    return response.data.search.nodes.map((node) => ({
      originalId: node.id,
      login: node.login,
      name: node.name,
      url: node.url,
      type: node.__typename,
      avatarUrl: node.avatarUrl,
      company: node.company,
      location: node.location,
      followers: node.followers ? node.followers.total : 0,
      following: node.following ? node.following.total : 0,
      sources: node.sources ? node.sources.total : 0,
      forked: node.forked ? node.forked.total : 0,
      collaborations: node.collaborations ? node.collaborations.total : 0,
      createdAt: new Date(node.createdAt),
      scrapedAt: new Date(),
    }))
  }
}
