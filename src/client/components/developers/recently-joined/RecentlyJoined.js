import React from 'react'
import Loading from '../../loading/Loading'
import store from '../../../store/store'
import DeveloperList from '../list/List'
import { orderBy } from 'lodash'

class RecentlyJoinedDevelopers extends React.Component {
  state = {
    users: [],
    loading: true,
    error: false
  }
  componentDidMount() {
    store.getUsers().then((response) => {
      this.setState({
        users: response.items,
        loading: !response.ready,
        error: response.error
      })
    })
  }
  render() {
    const { users, loading, error } = this.state
    if (loading) {
      return <Loading />
    }

    const orderedUsers = orderBy(users, ['createdAt', 'name'], ['desc', 'asc'])

    return <DeveloperList users={orderedUsers} />
  }
}

export default RecentlyJoinedDevelopers
