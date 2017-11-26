import React from 'react'
import DocumentTitle from 'react-document-title'
import { orderBy, each, filter } from 'lodash'
import utils from '~/utils'
import store from '~/store/store'
import Loading from '~/components/loading/Loading'
import RepositoryList from '~/components/repository-list/RepositoryList'

/**
 * The PopularRepositories class object list all repositories by popularity.
 */
class PopularRepositories extends React.Component {

  // The initial state.
  state = {
    repos: [],
    loading: true,
    error: false
  }

  /**
   * When component did mount request respository data.
   */
  componentDidMount() {
    store.getRepos().then((response) => {
      const orderedRepos = orderBy(response.items, ['stargazers', 'forks', 'watchers', 'name'], ['desc', 'desc', 'desc', 'asc'])
      each(orderedRepos, (repo, index) => repo.position = index + 1)
      this.setState({
        repos: orderedRepos,
        loading: !response.ready,
        error: response.error,
      })
    })
  }

  /**
   * Render this component.
   */
  render() {
    const { repos, loading } = this.state

    if (loading) {
      return <Loading />
    }

    return (
      <DocumentTitle title="Popular Repositories – Dominican Open Source">
        <div>
          <h3 className="center-align">Popular repositories</h3>
          <p className="center-align">Showing <strong>{ repos.length.toLocaleString() }</strong> repositories <em>sorted by stars</em>.</p>
          <RepositoryList repos={repos} />
        </div>
      </DocumentTitle>
    )
  }
}

export default PopularRepositories
