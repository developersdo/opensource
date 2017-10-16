module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('user_changes', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: Sequelize.INTEGER, references: { model: 'users', key: 'id' } },
      login: { type: Sequelize.STRING },
      name: { type: Sequelize.STRING },
      type: { type: Sequelize.STRING },
      url: { type: Sequelize.STRING },
      avatarUrl: { type: Sequelize.STRING },
      company: { type: Sequelize.STRING },
      location: { type: Sequelize.STRING },
      followers: { type: Sequelize.INTEGER },
      following: { type: Sequelize.INTEGER },
      sources: { type: Sequelize.INTEGER },
      forked: { type: Sequelize.INTEGER },
      collaborations: { type: Sequelize.INTEGER },
      createdAt: { type: Sequelize.DATE },
    })
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('user_changes')
  }
}
