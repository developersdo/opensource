import React from 'react'
import { Route, Redirect, NavLink } from 'react-router-dom'
import Popular from './popular/Popular'
import RecentlyJoined from './recently-joined/RecentlyJoined'
import SubNavLink from '../sub-nav-link/SubNavLink'

const Developers = (props) => (
  <div id="developers">
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
