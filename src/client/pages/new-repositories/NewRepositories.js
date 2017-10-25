import React from 'react'
import DocumentTitle from 'react-document-title'
import { orderBy, each, filter } from 'lodash'
import store from '~/store/store'
import Filter from '~/components/filter/Filter'
import Loading from '~/components/loading/Loading'
import RepositoryList from '~/components/repository-list/RepositoryList'
import utils from '~/utils'

class NewRepositories extends React.Component {
  state = {
    filterIteration: 0,
    filteredRepos: [],
    repos: [],
    loading: true,
    error: false
  }
  componentDidMount() {
    store.getRepos().then((response) => {
      const orderedRepos = orderBy(response.items, ['createdAt'], ['desc'])
      each(orderedRepos, (repo, index) => repo.position = index + 1)
      this.setState({
        filteredRepos: orderedRepos,
        repos: orderedRepos,
        loading: !response.ready,
        error: response.error
      })
    })
  }
  render() {
    const { filterIteration, filteredRepos, loading, error } = this.state
    if (loading) {
      return <Loading />
    }

    return (
        <DocumentTitle title="New Repositories – Dominican Open Source">
          <div>
            <Filter onChange={(value) => this.filterChanged(value)} />
            <RepositoryList key={filterIteration} repos={filteredRepos} />
          </div>
        </DocumentTitle>
      )
  }
  filterChanged(value) {
    const matcher = new RegExp(utils.escapeRegExp(value), 'i')
    const { repos } = this.state
    const filteredRepos = filter(repos, (repo) => {
      return matcher.test(repo.name) || matcher.test(repo.description) || matcher.test(repo.user.name)
    })
    this.setState((state) => ({
      filteredRepos,
      filterIteration: state.filterIteration + 1,
    }))
  }
}

export default NewRepositories
