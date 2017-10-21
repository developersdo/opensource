'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    queryInterface.createTable('repo_changes', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      repoId: { type: Sequelize.STRING(200), references: { model: 'repos', key: 'id' } },
      name: { type: Sequelize.STRING },
      description: { type: Sequelize.STRING },
      homepageUrl: { type: Sequelize.STRING },
      url: { type: Sequelize.STRING },
      languages: { type: Sequelize.STRING },
      stargazers: { type: Sequelize.INTEGER },
      watchers: { type: Sequelize.INTEGER },
      forks: { type: Sequelize.INTEGER },
      createdAt: { type: Sequelize.DATE },
    })
  },

  down(queryInterface, Sequelize) {
    queryInterface.dropTable('repo_changes')
  }
};
