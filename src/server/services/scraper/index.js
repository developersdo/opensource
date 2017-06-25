const print = require('chalk-printer')

const { User } = require('../../models')
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
      print.error('Cannot scrape completely', error)
    }
  }
}
