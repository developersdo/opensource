const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

module.exports = {
  User: sequelize.define('user', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    originalId: { type: Sequelize.STRING(100), unique: 'usersOriginalIdIndex' },
    login: { type: Sequelize.STRING(100), unique: 'usersLoginIndex' },
    name: Sequelize.STRING(100),
    type: Sequelize.STRING(100),
    url: Sequelize.STRING(200),
    avatarUrl: Sequelize.STRING(200),
    company: Sequelize.STRING(100),
    location: Sequelize.STRING(100),
    followers: Sequelize.INTEGER,
    following: Sequelize.INTEGER,
    sources: Sequelize.INTEGER,
    forked: Sequelize.INTEGER,
    collaborations: Sequelize.INTEGER,
    createdAt: Sequelize.DATE,
    scrapedAt: Sequelize.DATE,
  }, {
    timestamps: false
  }),
  Repo: sequelize.define('repo', {
    id: { type: Sequelize.STRING(200), primaryKey: true },
    name: Sequelize.STRING(100),
    description: Sequelize.STRING(200),
    homepageUrl: Sequelize.STRING(200),
    url: Sequelize.STRING(200),
    languages: Sequelize.STRING(1000),
    stargazers: Sequelize.INTEGER,
    watchers: Sequelize.INTEGER,
    forks: Sequelize.INTEGER,
    createdAt: Sequelize.DATE,
    scrapedAt: Sequelize.DATE,
  }, {
    timestamps: false
  }),
  UserChange: sequelize.define('user_change', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    userId: { type: Sequelize.STRING(100), references: { model: 'user', key: 'id' } },
    login: { type: Sequelize.STRING(100) },
    name: Sequelize.STRING(100),
    type: Sequelize.STRING(100),
    url: Sequelize.STRING(200),
    company: Sequelize.STRING(100),
    location: Sequelize.STRING(100),
    followers: Sequelize.INTEGER,
    following: Sequelize.INTEGER,
    sources: Sequelize.INTEGER,
    forked: Sequelize.INTEGER,
    collaborations: Sequelize.INTEGER,
    createdAt: Sequelize.DATE,
  }, {
    timestamps: false
  }),
  RepoChange: sequelize.define('repo_change', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    repoId: { type: Sequelize.STRING(200), references: { model: 'repo', key: 'id' } },
    name: Sequelize.STRING(100),
    description: Sequelize.STRING(200),
    homepageUrl: Sequelize.STRING(200),
    url: Sequelize.STRING(200),
    languages: Sequelize.STRING(1000),
    stargazers: Sequelize.INTEGER,
    watchers: Sequelize.INTEGER,
    forks: Sequelize.INTEGER,
    createdAt: Sequelize.DATE,
  }, {
    timestamps: false
  }),
}
