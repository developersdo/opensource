require('isomorphic-fetch')

const config = require('config')
const { GraphQLClient } = require('graphql-request')

const client = new GraphQLClient(config.get('github.api.uri'), {
  headers: {
    Authorization: `bearer ${config.get('github.api.token')}`
  }
})

module.exports = client
