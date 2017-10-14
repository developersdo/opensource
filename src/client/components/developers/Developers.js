import React from 'react'
import { Route, Redirect, NavLink } from 'react-router-dom'
import Popular from './popular/Popular'
import RecentlyJoined from './recently-joined/RecentlyJoined'

const Developers = (props) => (
  <div id="developers">
    <div className="row">
      <div className="col s2 center-align offset-s4">
        <NavLink to="/developers/popular" activeStyle={{ textDecoration: 'underline' }}>Popular</NavLink>
      </div>
      <div className="col s2 center-align">
        <NavLink to="/developers/recently-joined" activeStyle={{ textDecoration: 'underline' }}>Recently joined</NavLink>
      </div>
    </div>
    <Route exact path="/developers" render={() => <Redirect to="/developers/popular" />} />
    <Route path="/developers/popular" component={Popular} />
    <Route path="/developers/recently-joined" component={RecentlyJoined} />
  </div>
)

export default Developers
