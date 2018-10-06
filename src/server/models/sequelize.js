const Sequelize = require('sequelize')

const config = require('../../../.sequelizerc')
const storage = config.url.replace(/^sqlite:\/\//, '')

module.exports = new Sequelize('opensource', null, null, {
  dialect: 'sqlite',
  pool: { max: 10, min: 0, idle: 1000 },
  storage,
})
