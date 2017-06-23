const gql = require('graphql-tag')
const print = require('chalk-printer')

module.exports = (client) => {

  const queries = {
    searchUsers: gql`
    query searchUsers($query: String!, $after: String) {
      search(type: USER, query: $query, first: 100, after: $after) {
        userCount
        nodes {
          __typename
          ... on User {
            id: databaseId
            login
            name
            url
            avatarUrl
            createdAt
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
      rateLimit {
        limit
        remaining
      }
    }`
  }

  return {
    get(params = {}) {
      print.trace('get: Get users with params:', params)

      return client.query({
        query: queries.searchUsers,
        variables: {
          query: params.query,
          after: params.after || null
        }
      })
    }
  }
}
