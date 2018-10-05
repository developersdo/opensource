const debug = require('debug')('services:scrapper:repos')

const srv = require('..')
const utils = require('../../utils')

module.exports = {

  /**
   * Scrape repositories data from GitHub API.
   *
   * @return {Promise} A promise.
   */
  async scrape() {
    debug('Scrape repositories data...')

    // Get all stored user logins.
    const logins = await srv.user.findAllUsers('login')
    const loginsChunks = utils.chunk(logins.filter(l => l).map(l => l.login), 50)

    // Scrape repos data for each group of logins.
    for (const loginsChunk of loginsChunks) {
      await this.scrapeReposFromUsers(loginsChunk)
    }
  },

  /**
   * Scrape repositories from a specific set of user.
   *
   * @param {Array} users Users logins to query repositories.
   * @param {String} after The cursor to continue after.
   *
   * @return {Promise} A promise.
   */
  async scrapeReposFromUsers(users, after = null) {
    debug('Scrape repos of users:', users)

    const query = users.map(user => `user:${user}`).join(' ')
    return await srv.github.searchRepos(query, after)
      .then((response) => {

        // Store repos.
        const repos = this.transform(response)
        return srv.repo.createOrUpdateRepos(repos)
          .then(() => {

            // If a next page is available then let's fetch it.
            const { hasNextPage, endCursor } = response.data.search.pageInfo
            return hasNextPage ? this.scrapeReposFromUsers(users, endCursor) : Promise.resolve()
          })
      })
  },

  /**
   * Transform a response into repo record object ready to be inserted.
   * @param {Object} response The response.
   * @return {Array}
   */
  transform(response) {
    return response.data.search.nodes.map((node) => ({
      originalId: node.id,
      name: node.name,
      description: node.description,
      homepageUrl: node.homepageUrl,
      url: node.url,
      languages: this.transformLanguages(node.languages),
      stargazers: node.stargazers ? node.stargazers.total : 0,
      watchers: node.watchers ? node.watchers.total : 0,
      forks: node.forks ? node.forks.total : 0,
      createdAt: new Date(node.createdAt),
      scrapedAt: new Date(),
      isPrivate: node.isPrivate
    }))
  },

  /**
   * Transform a languages response into a string.
   * @param {Object} languages
   * @return {String}
   */
  transformLanguages(languages) {
    return languages.nodes.map((node) => node.name.toLowerCase())
      .filter((name) => !!name)
      .join(' ')
  }
}
