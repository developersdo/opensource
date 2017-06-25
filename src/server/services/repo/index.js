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
      attributes: ['name'],
      where: {
        name: { $in: repos.map(r => r.name).filter(r => r) }
      }
    }).then((results) => {

      // Prevent creating repo with same name.
      const existingNames = results.map(r => r.name)
      const newRepos = repos.filter(r => existingNames.indexOf(r.name) === -1)

      return Repo.bulkCreate(
        newRepos.map((repo) => ({
          name: repo.name,
          description: repo.description,
          url: repo.url,
          languages: repo.languages.nodes.map(l => l.name.toLowerCase()).join(' '),
          stargazers: repo.stargazers.total,
          createdAt: new Date(repo.createdAt)
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
