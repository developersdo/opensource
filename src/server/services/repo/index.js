const print = require('chalk-printer')

const { Repo } = require('../../models')

module.exports = {

  /**
   * Create one or more repos. Any existing repos identified by their name will be skipped.
   *
   * @param {Array} repos The array of repositories.
   * @return {Promise} A promise.
   */
  createRepos(repos = []) {
    print.trace(`Create ${repos.length} repos...`)

    // Find existing repository by their name.
    return Repo.findAll({
      attributes: ['id'],
      where: {
        id: { $in: repos.map(r => r.id).filter(r => r) }
      }
    }).then((results) => {

      // Prevent creating repo with same name.
      const existingIds = results.map(r => r.id);
      const newRepos = repos.filter(r => existingIds.indexOf(r.id) === -1)

      return Repo.bulkCreate(
          newRepos.map((repo) => ({
              id:repo.id,
              name: repo.name,
              description: repo.description,
              url: repo.url,
              languages: repo.languages.nodes.map(l => l.name.toLowerCase()).join(' '),
              stargazers: repo.stargazers.total,
              watchers: repo.watchers.total,
              forks: repo.forks.total,
              createdAt: new Date(repo.createdAt),
              scrapedAt: new Date(),

        }))
      )
    })
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
  }
}
