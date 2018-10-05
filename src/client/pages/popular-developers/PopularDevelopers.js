import React from 'react'
import DocumentTitle from 'react-document-title'
import { orderBy } from 'lodash'
import store from '~/store/store'
import Loading from '~/components/loading/Loading'
import DeveloperList from '~/components/developer-list/DeveloperList'

class PopularDevelopers extends React.Component {

  state = {
    users: [],
    loading: true,
    error: false
  }

  componentDidMount() {
    store.getUsers().then((response) => {
      const orderedUsers = orderBy(response.items, ['followers', 'name'], ['desc', 'asc'])
      this.setState({
        users: orderedUsers,
        loading: !response.ready,
        error: response.error
      })
    })
  }

  render() {
    const { users, loading } = this.state

    if (loading) {
      return <Loading />
    }

    return (
      <DocumentTitle title="Popular Developers – Dominican Open Source">
        <div>
          <h3 className="center-align">Popular developers</h3>
          <p className="center-align">Showing <strong>{ users.length.toLocaleString() }</strong> developers <em>sorted by followers</em>.</p>
          <DeveloperList users={ users } />
        </div>
      </DocumentTitle>
    )
  }
}

export default PopularDevelopers
