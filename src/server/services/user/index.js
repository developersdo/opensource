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
            login
            name
            url: websiteUrl
            avatarUrl
            company
            location
            createdAt
            followers {
              total: totalCount
            }
            following {
              total: totalCount
            }
            sources: repositories(isFork: false, privacy: PUBLIC, affiliations: OWNER) {
              total: totalCount
            }
            forked: repositories(isFork: true, privacy: PUBLIC, affiliations: OWNER) {
              total: totalCount
            }
            collaborations: repositories(privacy: PUBLIC, affiliations: COLLABORATOR) {
              total: totalCount
            }
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

    /**
     * Get a list of users from GitHub API.
     * @param {Object} params The parameters.
     */
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
