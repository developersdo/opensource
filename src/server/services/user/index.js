const print = require('chalk-printer')

const { User } = require('../../models')

module.exports = {

  /**
   * Create one or more users. Any existing users identified by their login will be skipped.
   *
   * @param {Array} users The array of users.
   * @return {Promise} A promise.
   */
  createUsers(users = []) {
    print.trace(`Create ${users.length} users...`)

    // Find existing user by their login.
    return User.findAll({
      attributes: ['login'],
      where: {
        login: { $in: users.map(u => u.login).filter(u => u) }
      }
    }).then((results) => {

      // Prevent creating user with same login.
      const existingLogins = results.map(r => r.login)
      const newUsers = users.filter(u => existingLogins.indexOf(u.login) === -1)

      return User.bulkCreate(
        newUsers.map((user) => ({
          login: user.login,
          name: user.name,
          url: user.url,
          avatarUrl: user.avatarUrl,
          company: user.company,
          location: user.location,
          followers: user.followers ? user.followers.total : 0,
          following: user.following ? user.following.total : 0,
          sources: user.sources ? user.sources.total : 0,
          forked: user.forked ? user.forked.total : 0,
          collaborations: user.collaborations ? user.collaborations.total : 0,
          createdAt: new Date(user.createdAt)
        }))
      )
    })
  },

  /**
   * Find all users.
   *
   * @param {Array} attributes The list of attributes to return.
   *
   * @return {Promise} A promise.
   */
  findAllUsers(attributes = []) {
    print.trace('Find all users with:', { attributes })

    if (attributes && !Array.isArray(attributes)) {
      attributes = [attributes]
    }

    const opts = {}

    if (attributes.length) {
      opts.attributes = attributes
    }

    return User.findAll(opts)
  }
}
