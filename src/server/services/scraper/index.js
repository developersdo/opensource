const print = require('chalk-printer')

const { User } = require('../../models')
const usersScraper = require('./users')

module.exports = {

  /**
   * Scrape data from GitHub API.
   */
  scrape() {
    usersScraper.scrape()
  }
}
