module.exports = {

  /**
   * Graphql query to search users on GitHub API.
   */
  searchUsers: `
    query searchUsers($query: String!, $after: String) {
      search(type: USER, query: $query, first: 100, after: $after) {
        userCount
        nodes {
          __typename
          ... on User {
            id
            login
            name
            status {
              emoji
              message
            }
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
            sources: repositories {
              total: totalCount
            }
            forked: repositories(isFork: true) {
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
        cost
        resetAt
      }
    }`,

  /**
   * Graphql query to search repositories on GitHub API.
   */
  searchRepos: `
    query searchRepos($query: String!, $after: String) {
      search(type: REPOSITORY, query: $query, first: 100, after: $after) {
        repositoryCount
        nodes {
          ... on Repository {
            id
            name: nameWithOwner
            description
            homepageUrl
            url
            languages(first: 100) {
              totalCount
              nodes {
                name
              }
            }
            stargazers {
              total: totalCount
            }
            watchers {
              total: totalCount
            }
            forks {
              total: totalCount
            }
            createdAt
            isPrivate
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
        cost
        resetAt
      }
    }`
}
