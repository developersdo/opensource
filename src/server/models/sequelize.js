const path = require('path')
const Sequelize = require('sequelize')

module.exports = new Sequelize('opensource', null, null, {
  dialect: 'sqlite',
  pool: { max: 10, min: 0, idle: 1000 },
  storage: path.join(__dirname, '../../../data/db.sqlite')
})
