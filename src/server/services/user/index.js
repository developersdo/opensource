const { isEqual, merge, pick } = require('lodash')
const print = require('chalk-printer')

const { User, UserChange } = require('../../models')

module.exports = {

  /**
   * Create or update one or more users.
   *
   * @param {Array} users The array of users.
   * @return {Promise} A promise.
   */
  createOrUpdateUsers(users = []) {
    print.trace(`Create or update ${users.length} users...`)

    return Promise.all(
      users.map(async (user) => {
        const exist = await User.find({ where: { originalId: user.originalId } })
        if (exist) {
          return await this.updateUser(exist.id, user)
        } else {
          return await User.create(user)
        }
      })
    )
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
  },

  /**
   * Try to update a user in the database.
   * The user will only be updated if a change was detected.
   * If a change was detected a user change record will be also created.
   * @param {Number} id The id of the user to update.
   * @param {Object} user The user to update.
   * @return {Promise}
   */
  async updateUser(id, user) {
    print.trace(`Update user with id ${id}...`)

    const original = await User.findById(id)
    if (!original) {
      throw new Error('No existing user.')
    }

    if (this.isDifferentUser(original, user)) {
      await this.createUserChange(original, user)
      const updates = pick(user, ['login', 'name', 'type', 'url', 'avatarUrl', 'company', 'location', 'followers', 'following', 'sources', 'forked', 'collaborations'])
      return await User.update(updates, { where: { originalId: user.originalId } })
    }

    print.trace(`Nothing to update for user with login: ${user.login}`)
  },

  /**
   * Indicates if two given users are different.
   * @param {Object} a A user.
   * @param {Object} b A user.
   */
  isDifferentUser(a, b) {
    const fields = ['login', 'name', 'type', 'url', 'company', 'location', 'followers', 'following', 'sources', 'forked', 'collaborations']
    return (!a || !b) || fields.some((field) => a[field] !== b[field])
  },

  /**
   * Create a user change based on the original and the changed user.
   * @param {Object} original The original user.
   * @param {Object} changed The changed user.
   * @return {Promise}
   */
  async createUserChange(original, changed) {
    const change = pick(changed, ['login', 'name', 'type', 'url', 'avatarUrl', 'company', 'location'])
    change.followers = changed.followers - original.followers
    change.following = changed.following - original.following
    change.sources = changed.sources - original.sources
    change.forked = changed.forked - original.forked
    change.collaborations = changed.collaborations - original.collaborations
    change.userId = original.id
    change.createdAt = new Date()
    return await UserChange.create(change)
  }
}
