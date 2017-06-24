const gql = require('graphql-tag')

module.exports = {
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
            forked: repositories(isFork: true, privacy: PUBLIC, affiliations: OWNER) {
              total: totalCount
            }
            collaborations: repositories(privacy: PUBLIC, affiliations: COLLABORATOR) {
              total: totalCount
            }
            sources: repositories(isFork: false, privacy: PUBLIC, affiliations: OWNER, first: 100) {
              total: totalCount
              nodes {
                name
                description
                homepageUrl
                url
                languages(first:50) {
                  totalCount
                  nodes {
                    name
                  }
                }
                stargazers {
                  totalCount
                }
              }
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
