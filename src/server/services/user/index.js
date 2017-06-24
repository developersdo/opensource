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
    print.trace('Create users', users.length)

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
          company: user.company,
          location: user.location,
          followers: user.followers.total,
          following: user.following.total,
          sources: user.sources.total,
          forked: user.forked.total,
          collaborations: user.collaborations.total,
          createdAt: new Date(user.createdAt)
        }))
      )
    })
  }
}
