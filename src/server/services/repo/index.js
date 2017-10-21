const print = require('chalk-printer')

const { Repo, RepoChange } = require('../../models')

module.exports = {

  /**
   * Create one or more repos. Any existing repos identified by their name will be skipped.
   *
   * @param {Array} repos The array of repositories.
   * @return {Promise} A promise.
   */
  createOrUpdateRepos(repos = []) {
    print.trace(`Create ${repos.length} repos...`)

    return Promise.all(
      repos.map((repo) => {
        return Repo.findById(repo.id)
          .then((existingRepo) => {
            if (existingRepo) {
              const languages = repo.languages.nodes.map(l => l.name.toLowerCase()).join(' ');
              return Promise.resolve().then(function () {
                if (
                    existingRepo.name !== repo.name
                    || existingRepo.description !== repo.description
                    || existingRepo.url !== repo.url
                    || existingRepo.languages !== languages
                    || existingRepo.stargazers !== repo.stargazers.total
                    || existingRepo.watchers !== repo.watchers.total
                    || existingRepo.forks !== repo.forks.total
                ) {
                  return RepoChange.create({
                    repoId: existingRepo.id,
                    name: existingRepo.name,
                    description: existingRepo.description,
                    url: existingRepo.url,
                    languages: existingRepo.languages,
                    stargazers: existingRepo.stargazers,
                    watchers: existingRepo.watchers,
                    forks: existingRepo.forks,
                    createdAt: new Date()
                  })
                }
              }).then(function () {
                return Repo.update({
                  name: repo.name,
                  description: repo.description,
                  url: repo.url,
                  languages: languages,
                  stargazers: repo.stargazers.total,
                  watchers: repo.watchers.total,
                  forks: repo.forks.total,
                  createdAt: new Date(repo.createdAt),
                  scrapedAt: new Date(),
                }, {
                  where: { id: repo.id }
                })
              })
            } else {
              return Repo.create({
                id: repo.id,
                name: repo.name,
                description: repo.description,
                url: repo.url,
                languages: repo.languages.nodes.map(l => l.name.toLowerCase()).join(' '),
                stargazers: repo.stargazers.total,
                watchers: repo.watchers.total,
                forks: repo.forks.total,
                createdAt: new Date(repo.createdAt),
                scrapedAt: new Date(),
              })
            }
          })
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
  }
}
