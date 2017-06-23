const print = require('chalk-printer')
const config = require('config')

const services = require('..')
const { User } = require('../../models')

module.exports = {

  /**
   * Scrape users data from GitHub API.
   */
  async scrape() {
    // Scrape users data for each defined locations.
    for (const location of config.get('users.locations')) {
      await scrapeUsersInLocation(location)
    }
  }
}

/**
 * Scrape users from a specific location.
 * @param {String} location The location to query users.
 * @param {String} after The cursor to continue after.
 * @return {Promise} A promise.
 */
async function scrapeUsersInLocation(location, after = null) {
  return await services.user.get({ after, query: `location:"${location}"` })
    .then((response) => {

      // Store users.
      const users = response.data.search.nodes.filter((node) => node.__typename === 'User')
      return storeUsers(users)
        .then(() => response)
    })
    .then((response) => {

      // If a next page is available then let's fetch it.
      if (response.data.search.pageInfo.hasNextPage) {
        return scrapeUsersInLocation(location, response.data.search.pageInfo.endCursor)
      }

      // otherwise finish.
      return Promise.resolve()
    })
}

/**
 * Store a list of users.
 * @param {Array} users The array of users.
 * @return {Promise} A promise.
 */
function storeUsers(users) {
  return User.findAll({
    attributes: ['login'],
    where: {
      login: { $in: users.map(u => u.login).filter(u => u) }
    }
  }).then((results) => {
    const existingLogins = results.map(r => r.login)
    const newUsers = users.filter(u => existingLogins.indexOf(u.login) === -1)

    return User.bulkCreate(
      newUsers.map((user) => ({
        login: user.login,
        name: user.name,
        url: user.url,
        avatarUrl: user.avatarUrl,
        createdAt: new Date(user.createdAt)
      }))
    )
  })
}
