'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('users', 'originalId', Sequelize.STRING)
  },

  async down(queryInterface, Sequelize) {
    // To remove a column from a sqlite table, sequelize-cli will create a backup table,
    // drop the original and re-create it with the column removed. Therefore, it is
    // needed to disable constraint checks in order to successfully modify a table.
    await queryInterface.sequelize.query('PRAGMA foreign_keys = OFF;')
    return await queryInterface.removeColumn('users', 'originalId')
  }
}
