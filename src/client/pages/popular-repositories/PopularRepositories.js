import React from 'react'
import DocumentTitle from 'react-document-title'
import { orderBy } from 'lodash'
import store from '~/store/store'
import Loading from '~/components/loading/Loading'
import RepositoryList from '~/components/repository-list/RepositoryList'

class PopularRepositories extends React.Component {
  state = {
    repos: [],
    loading: true,
    error: false
  }
  componentDidMount() {
    store.getRepos().then((response) => {
      this.setState({
        repos: response.items,
        loading: !response.ready,
        error: response.error
      })
    })
  }
  render() {
    const { repos, loading, error } = this.state
    if (loading) {
      return <Loading />
    }

    const orderedRepos = orderBy(repos, ['stargazers', 'forks', 'watchers', 'name'], ['desc', 'desc', 'desc', 'asc'])

    // Add position to each repos.
    let currentPosition = 1
    _.forEach(orderedRepos, (current) => {
      current.position = currentPosition++
    })

    return (
      <DocumentTitle title='Popular Repositories – Dominican Open Source'>
        <RepositoryList repos={orderedRepos} />
      </DocumentTitle>
    )
  }
}

export default PopularRepositories
