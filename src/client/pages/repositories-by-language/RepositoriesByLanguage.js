import React from 'react'
import DocumentTitle from 'react-document-title'
import { orderBy, each, filter, includes } from 'lodash'
import store from '~/store/store'
import Loading from '~/components/loading/Loading'
import RepositoryList from '~/components/repository-list/RepositoryList'

/**
 * The RepositoriesByLanguage class object.
 */
class RepositoriesByLanguage extends React.Component {

  // Initial state.
  state = {
    repos: [],
    loading: true,
    error: false
  }

  /**
   * Fetch repos when this component mount.
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
    const { language } = this.props.match.params

    const filteredRepos = filter(repos, (repo) => includes(repo.languageNames, language))

    if (loading) {
      return <Loading />
    }

    return (
      <DocumentTitle title={ `Popular ${language} repositories – Dominican Open Source` }>
        <div>
          <h3 className="center-align">Popular <u>{ language }</u> repositories</h3>
          <p className="center-align">Showing <strong>{ filteredRepos.length.toLocaleString() }</strong> repositories.</p>
          <RepositoryList repos={ filteredRepos } />
        </div>
      </DocumentTitle>
    )
  }
}

export default RepositoriesByLanguage
