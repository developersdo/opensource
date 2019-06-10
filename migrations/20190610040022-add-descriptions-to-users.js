'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('users', 'description', {
        type: Sequelize.STRING(200)
      });
      await queryInterface.addColumn('user_changes', 'description', {
        type: Sequelize.STRING(200)
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('users', 'description'),
      await queryInterface.removeColumn('user_changes', 'description')
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
};
