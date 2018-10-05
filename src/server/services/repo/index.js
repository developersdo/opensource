const { pick } = require('lodash')
const print = require('chalk-printer')

const { Repo, RepoChange } = require('../../models')

module.exports = {

  /**
   * Create or update one or more repos.
   *
   * @param {Array} repos The array of repositories.
   * @return {Promise} A promise.
   */
  createOrUpdateRepos(repos = []) {
    print.trace(`Create or update ${repos.length} repos...`)

    return Promise.all(
      repos.map(async (repo) => {
        const exist = await Repo.find({ where: { originalId: repo.originalId } })
        if (exist) {
          return await this.updateRepo(exist.id, repo)
        } else {
          return await Repo.create(repo)
        }
      })
    )
  },

  /**
   * Find all repositories.
   *
   * @param {Array} attributes The list of attributes to return.
   *
   * @return {Promise} A promise.
   */
  findAllRepos(attributes = []) {
    print.trace('Find all repos with:', { attributes })

    if (attributes && Array.isArray(attributes)) {
      attributes = [attributes]
    }

    const opts = {}

    if (attributes.length) {
      opts.attributes = attributes
    }

    return Repo.findAll(opts)
  },

  /**
   * Try to update a repo in the database.
   * The repo will only be updated if a change was detected.
   * If a change was detected a repo change record will be also created.
   * @param {Number} id The id of the repo to update.
   * @param {Object} repo The repo to update.
   * @return {Promise}
   */
  async updateRepo(id, repo) {
    print.trace(`Update repo with id: ${id}...`)

    const original = await Repo.findById(id)
    if (!original) {
      throw new Error('No existing repo.')
    }

    if (this.isDifferentRepo(original, repo)) {
      await this.createRepoChange(original, repo)
      const updates = pick(repo, ['name', 'description', 'homepageUrl', 'url', 'languages', 'stargazers', 'watchers', 'forks'])
      return await Repo.update(updates, { where: { originalId: repo.originalId } })
    }

    print.trace(`Nothing to update for repo with name: ${repo.name}`)
  },

  /**
   * Indicates if two given repos are different.
   * @param {Object} a A repo.
   * @param {Object} b A repo.
   */
  isDifferentRepo(a, b) {
    const fields = ['name', 'description', 'homepageUrl', 'url', 'languages', 'stargazers', 'watchers', 'forks']
    return (!a || !b) || fields.some((field) => a[field] !== b[field])
  },

  /**
   * Create a repo change based on the original and the changed repo.
   * @param {Object} original The original repo.
   * @param {Object} changed The changed repo.
   * @return {Promise}
   */
  async createRepoChange(original, changed) {
    const change = pick(changed, ['name', 'description', 'homepageUrl', 'url', 'languages'])
    change.stargazers = changed.stargazers - original.stargazers
    change.watchers = changed.watchers - original.watchers
    change.forks = changed.forks - original.forks
    change.repoId = original.id
    change.createdAt = new Date()
    return await RepoChange.create(change)
  }
}
