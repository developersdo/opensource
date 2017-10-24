import React from 'react'
import InfiniteScroller from 'react-infinite-scroller'
import Loading from '~/components/loading/Loading'
import RepositoryCard from '~/components/repository-list/repository-card/RepositoryCard'

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
