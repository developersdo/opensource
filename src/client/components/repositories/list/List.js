import React from 'react'
import RepositoryCard from './card/RepositoryCard'
import InfiniteScroller from 'react-infinite-scroller'
import Loading from '../../loading/Loading'

class RepositoriesList extends React.Component {
  state = {
    hasMore: true,
    page: 0,
    repos: [],
  }
  render() {
    const { hasMore, repos } = this.state
    return (
      <InfiniteScroller
        loadMore={() => this.loadMore()}
        hasMore={hasMore}
        loader={<Loading/>}
      >
        {repos.map((repo) => (
          <RepositoryCard
            key={repo.id}
            repo={repo}
          />
        ))}
      </InfiniteScroller>
    )
  }
  loadMore() {
    const { repos } = this.props
    const { repos: reposInPage, page } = this.state
    const pageSize = 10
    const moreReposInPage = [...reposInPage, ...repos.slice(page * pageSize, (page * pageSize) + pageSize)]
    this.setState({
      page: page + 1,
      repos: moreReposInPage,
      hasMore: moreReposInPage.length < repos.length,
    })
  }
}

export default RepositoriesList
