import React from 'react'
import DocumentTitle from 'react-document-title'
import { orderBy, filter } from 'lodash'
import store from '~/store/store'
import Loading from '~/components/loading/Loading'
import DeveloperList from '~/components/developer-list/DeveloperList'

class RecentlyJoinedDevelopers extends React.Component {

  state = {
    users: [],
    loading: true,
    error: false
  }

  componentDidMount() {
    store.getUsers().then((response) => {
      const orderedUsers = orderBy(response.items, ['createdAt', 'name'], ['desc', 'asc'])
      this.setState({
        users: orderedUsers,
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

    const now = new Date()
    const recently = new Date(now.setDate(now.getDate() - 30))
    console.log(recently)
    const newUsers = filter(users, (user) => user.createdAt > recently)

    return (
      <DocumentTitle title="Recently Joined Developers – Dominican Open Source">
        <div>
          <h3 className="center-align">Recently joined developers</h3>
          <p className="center-align">Showing <strong>{ newUsers.length }</strong> developers that <em>has joined in the last 30 days</em>.</p>
          <DeveloperList users={ newUsers } />
        </div>
      </DocumentTitle>
    )
  }
}

export default RecentlyJoinedDevelopers
