module.exports = {
  up(queryInterface, Sequelize) {
    queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      login: { type: Sequelize.STRING, unique: 'usersLoginIndex' },
      name: { type: Sequelize.STRING },
      type: { type: Sequelize.STRING },
      url: { type: Sequelize.STRING },
      avatarUrl: { type: Sequelize.STRING },
      company: { type: Sequelize.STRING },
      location: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE },
      followers: { type: Sequelize.INTEGER },
      following: { type: Sequelize.INTEGER },
      sources: { type: Sequelize.INTEGER },
      forked: { type: Sequelize.INTEGER },
      collaborations: { type: Sequelize.INTEGER },
      scrapedAt: { type: Sequelize.DATE },
    })
  },

  down(queryInterface, Sequelize) {
    queryInterface.dropTable('users')
  }
}
