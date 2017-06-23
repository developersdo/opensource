module.exports = {
  up(queryInterface, Sequelize) {
    queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      login: { type: Sequelize.STRING, unique: 'usersLoginIndex' },
      name: { type: Sequelize.STRING },
      url: { type: Sequelize.STRING },
      avatarUrl: { type: Sequelize.STRING },
      createdAt: { type: Sequelize.DATE }
    })
  },

  down(queryInterface, Sequelize) {
    queryInterface.dropTable('users')
  }
}
