import React from 'react'
import classnames from 'classnames'
import Loading from '../../loading/Loading'
import DeveloperCard from './card/DeveloperCard'
import InfiniteScroller from 'react-infinite-scroller'

const style = {
  first: {
    paddingRight: 10,
  },
  second: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  third: {
    paddingLeft: 10,
  }
}

class DevelopersList extends React.Component {
  state = {
    hasMore: true,
    page: 0,
    users: [],
  }
  render() {
    const { hasMore, users } = this.state
    return (
      <div className="row">
        <InfiniteScroller
          loadMore={() => this.loadMore()}
          hasMore={hasMore}
          loader={<Loading />}
        >
          {users.map((user, index) => (
            <div
              key={user.id}
              className="col s4"
              style={style[['first', 'second', 'third'][index % 3]]}
            >
              <DeveloperCard user={user} />
            </div>
          ))}
        </InfiniteScroller>
      </div>
    )
  }
  loadMore() {
    const { users } = this.props
    const { users: usersInPage, page } = this.state
    const pageSize = 12
    const moreUsersInPage = [...usersInPage, ...users.slice(page * pageSize, (page * pageSize) + pageSize)]
    this.setState({
      page: page + 1,
      users: moreUsersInPage,
      hasMore: moreUsersInPage.length < users.length,
    })
  }
}

export default DevelopersList
