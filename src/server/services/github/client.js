const config = require('config')
const fetch = require('isomorphic-fetch')
const { ApolloClient, createNetworkInterface, IntrospectionFragmentMatcher } = require('apollo-client')

const networkInterface = createNetworkInterface({
  uri: config.get('github.api.uri'),
})

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
