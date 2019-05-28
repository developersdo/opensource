const debug = require('debug')('dos')

const usersScraper = require('./users')
const reposScraper = require('./repos')

module.exports = {

  /**
   * Scrape data from GitHub API.
   */
  async scrape() {
    try {
      await usersScraper.scrape()
      await reposScraper.scrape()
    } catch (error) {
      debug('Cannot scrape completely', error)
      throw new Error(`Cannot scrape completely: ${error}`)
    }
  }
}
