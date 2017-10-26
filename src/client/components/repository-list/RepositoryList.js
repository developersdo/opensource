import React from 'react'
import { filter } from 'lodash'
import utils from '~/utils'
import Filter from '~/components/filter/Filter'
import InfiniteScroll from '~/components/infinite-scroll/InfiniteScroll'
import RepositoryCard from '~/components/repository-list/repository-card/RepositoryCard'

/**
 * The RepositoryList object class.
 */
class RepositoryList extends React.Component {

  // Initial state.
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
        <Filter
          placeholder="Filter repositories by name or author..."
          onChange={(value) => this.filterChanged(value)}
        />
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

  /**
   * Handle filter value changes.
   * @param {String} value The new filter value.
   */
  filterChanged(value) {
    const { repos } = this.props

    // Filter repos.
    const query = utils.unicodeNormalize(value)
    const matcher = new RegExp(utils.escapeRegExp(query), 'i')
    const filteredRepos = filter(repos, (repo) => {
      return matcher.test(repo.normalizedName) || matcher.test(repo.normalizedDescription) || matcher.test(repo.user.normalizedName)
    })

    // Update the state.
    this.setState((state) => ({
      filteredRepos,
    }))
  }
}

export default RepositoryList
