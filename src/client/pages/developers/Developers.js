import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Popular from '~/pages/popular-developers/PopularDevelopers'
import RecentlyJoined from '~/pages/recently-joined-developers/RecentlyJoinedDevelopers'
import SubNavLink from '~/components/sub-nav-link/SubNavLink'

const Developers = (props) => (
  <div>
    <div className="row center-align">
      <SubNavLink to="/developers/popular">Popular</SubNavLink>
      <SubNavLink to="/developers/recently-joined">Recently Joined</SubNavLink>
    </div>
    <Route exact path="/developers" render={() => <Redirect to="/developers/popular" />} />
    <Route path="/developers/popular" component={Popular} />
    <Route path="/developers/recently-joined" component={RecentlyJoined} />
  </div>
)

export default Developers
