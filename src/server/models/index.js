const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

module.exports = {
  User: sequelize.define('user', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    login: { type: Sequelize.STRING(100), unique: 'usersLoginIndex' },
    name: Sequelize.STRING(100),
    url: Sequelize.STRING(200),
    avatarUrl: Sequelize.STRING(200),
    createdAt: Sequelize.DATE
  }, {
    timestamps: false
  })
}
