const gql = require('graphql-tag')

module.exports = {

  /**
   * Graphql query to search users on GitHub API.
   */
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
            }
          }
          ... on Organization {
            login
            name
            url
            avatarUrl
            forked: repositories(isFork: true, privacy: PUBLIC, affiliations: OWNER) {
              total: totalCount
            }
            collaborations: repositories(privacy: PUBLIC, affiliations: COLLABORATOR) {
              total: totalCount
            }
            sources: repositories(isFork: false, privacy: PUBLIC, affiliations: OWNER, first: 100) {
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
  searchRepos: gql`
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
