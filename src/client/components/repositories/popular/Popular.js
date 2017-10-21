import React from 'react'
import Loading from '../../loading/Loading'
import store from '../../../store/store'
import RepositoryList from '../list/List'
import { orderBy } from 'lodash'

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

    return <RepositoryList repos={orderedRepos} />
  }
}

export default PopularRepositories
