const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

module.exports = {
  User: sequelize.define('user', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    login: { type: Sequelize.STRING(100), unique: 'usersLoginIndex' },
    name: Sequelize.STRING(100),
    url: Sequelize.STRING(200),
    avatarUrl: Sequelize.STRING(200),
    company: Sequelize.STRING(100),
    location: Sequelize.STRING(100),
    createdAt: Sequelize.DATE,
    followers: Sequelize.INTEGER,
    following: Sequelize.INTEGER,
    sources: Sequelize.INTEGER,
    forked: Sequelize.INTEGER,
    collaborations: Sequelize.INTEGER
  }, {
    timestamps: false
  })
}
