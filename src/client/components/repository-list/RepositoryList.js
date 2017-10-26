import React from 'react'
import InfiniteScroller from 'react-infinite-scroller'
import { filter } from 'lodash'
import utils from '~/utils'
import Filter from '~/components/filter/Filter'
import InfiniteScroll from '~/components/infinite-scroll/InfiniteScroll'
import RepositoryCard from '~/components/repository-list/repository-card/RepositoryCard'

class RepositoriesList extends React.Component {

  state = {
    filteredRepos: this.props.repos
  }

  static defaultProps = {
    repos: [],
  }

  /**
   * Render this component.
   */
  render() {
    const { filteredRepos } = this.state
    return (
      <div>
        <Filter onChange={(value) => this.filterChanged(value)} />
        <InfiniteScroll
          items={filteredRepos}
          render={(repo) => (
            <RepositoryCard
              key={repo.id}
              repo={repo}
            />
          )}
        />
      </div>
    )
  }

  filterChanged(value) {
    const { repos } = this.props

    // Filter repos.
    const matcher = new RegExp(utils.escapeRegExp(value), 'i')
    const filteredRepos = filter(repos, (repo) => {
      return matcher.test(repo.name) || matcher.test(repo.description) || matcher.test(repo.user.name)
    })

    // Update the state.
    this.setState((state) => ({
      filteredRepos,
    }))
  }
}

export default RepositoriesList
