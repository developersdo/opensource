const fs = require('fs-extra')
const path = require('path')

const { User, Repo } = require('../../models')

const target = path.join(__dirname, '../../../../docs/data')

module.exports = {

  /**
   * Generate data.
   */
  async generate() {
    await this.generateUsers()
    await this.generateRepos()
  },

  /**
   * Generate users data.
   * @return {Promise}
   */
  async generateUsers() {
    return await User.findAll()
      .then((users) => {
        return fs.writeJSON(path.join(target, 'users.json'), users)
      })
  },

  /**
   * Generate repos data.
   * @return {Promise}
   */
  async generateRepos() {
    return await Repo.findAll()
      .then((repos) => {
        return fs.writeJSON(path.join(target, 'repos.json'), repos)
      })
  }
}
