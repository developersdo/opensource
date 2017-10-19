import React from 'react'
import Loading from '../../loading/Loading'
import store from '../../../store/store'
import RepositoryList from '../list/List'
import { orderBy } from 'lodash'

class NewRepositories extends React.Component {
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

    const orderedRepos = orderBy(repos, ['createdAt'], ['desc'])

    // Add position to each repos. Some repos will have the same amount of stars, therefore
    // we have to assign the same position for those cases.
    let currentPosition = 0
    orderedRepos.reduce((previous, current) => {
      if (previous.createdAt !== current.createdAt) {
        currentPosition++
      }
      current.position = currentPosition
      return current
    }, {})

    return <RepositoryList repos={orderedRepos} />
  }
}

export default NewRepositories
