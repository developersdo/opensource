const fs = require('fs-extra')
const path = require('path')

const { User, Repo } = require('../../models')

const target = path.join(__dirname, '../../../../data/generated/')

module.exports = {
  async generate() {
    await this.generateUsers()
    await this.generateRepos()
  },

  async generateUsers() {
    return await User.findAll()
      .then((users) => {
        return fs.writeJSON(path.join(target, 'users.json'), users)
      })
  },

  async generateRepos() {
    return await Repo.findAll()
      .then((repos) => {
        return fs.writeJSON(path.join(target, 'repos.json'), repos)
      })
  }
}
