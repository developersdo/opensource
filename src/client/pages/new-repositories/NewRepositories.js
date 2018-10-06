import React from 'react'
import DocumentTitle from 'react-document-title'
import { orderBy, each, filter } from 'lodash'
import store from '~/store/store'
import Loading from '~/components/loading/Loading'
import RepositoryList from '~/components/repository-list/RepositoryList'

/**
 * The NewRepositories class object list all repositories by creation date.
 */
class NewRepositories extends React.Component {

  // Initial state.
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
      const orderedRepos = orderBy(response.items, ['createdAt'], ['desc'])
      each(orderedRepos, (repo, index) => repo.position = index + 1)
      this.setState({
        repos: orderedRepos,
        loading: !response.ready,
        error: response.error
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

    const now = new Date()
    const recently = new Date(now.setDate(now.getDate() - 7))
    const newRepos = filter(repos, (repo) => repo.createdAt > recently)

    return (
        <DocumentTitle title="New Repositories – Dominican Open Source">
          <div>
            <h3 className="center-align">New repositories</h3>
            <p className="center-align">Showing <strong>{ newRepos.length.toLocaleString() }</strong> repositories <em>created in the last 7 days</em>.</p>
            <RepositoryList repos={newRepos} />
          </div>
        </DocumentTitle>
      )
  }
}

export default NewRepositories
