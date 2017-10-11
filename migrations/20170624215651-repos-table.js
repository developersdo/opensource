module.exports = {
  up(queryInterface, Sequelize) {
    queryInterface.createTable('repos', {
      id: { type: Sequelize.STRING, primaryKey: true },
      name: { type: Sequelize.STRING },
      description: { type: Sequelize.STRING },
      homepageUrl: { type: Sequelize.STRING },
      url: { type: Sequelize.STRING },
      languages: { type: Sequelize.STRING },
      stargazers: { type: Sequelize.INTEGER },
      watchers: { type: Sequelize.INTEGER },
      forks: { type: Sequelize.INTEGER },
      createdAt: { type: Sequelize.DATE },
      scrapedAt: { type: Sequelize.DATE },
    })
  },

  down(queryInterface, Sequelize) {
    queryInterface.dropTable('repos')
  }
}
