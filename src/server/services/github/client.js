require('isomorphic-fetch')

const config = require('config')
const { ApolloClient, createNetworkInterface, IntrospectionFragmentMatcher } = require('apollo-client')

const networkInterface = createNetworkInterface({
  uri: config.get('github.api.uri'),
})

fetch(config.get('github.api.uri'), {
  method: 'POST',
  headers: {
    'Authorization': `bearer ${config.get('github.api.token')}`
  },
  body: JSON.stringify({
    variables: {
      query: 'location:dominican'
    },
    query: `
      query searchUsers($query: String!, $after: String) {
        search(type: USER, query: $query, first: 100, after: $after) {
          userCount
          nodes {
            __typename
            ... on User {
              id
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
      }
    `
  })
}).then(console.log)

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }
    req.options.headers['Authorization'] = `bearer ${config.get('github.api.token')}`
    next()
  }
}])

const client = new ApolloClient({
  networkInterface,
  fragmentMatcher: new IntrospectionFragmentMatcher({
    introspectionQueryResultData: {
      __schema: {
        types: [
          {
            kind: "INTERFACE",
            name: "Actor",
            possibleTypes: [
              { name: "Bot" },
              { name: "Organization" },
            ],
          },
        ],
      },
    }
  })
})

module.exports = client
