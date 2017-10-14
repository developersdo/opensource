import React from 'react'
import { Route, Redirect, NavLink } from 'react-router-dom'
import Popular from './popular/Popular'
import Trending from './trending/Trending'
import New from './new/New'

const Repositories = (props) => (
  <div id="repositories">
    <div className="row">
      <div className="col s2 center-align offset-s3">
        <NavLink to="/repositories/popular" activeStyle={{ textDecoration: 'underline' }}>Popular</NavLink>
      </div>
      <div className="col s2 center-align">
        <NavLink to="/repositories/trending" activeStyle={{ textDecoration: 'underline' }}>Trending</NavLink>
      </div>
      <div className="col s2 center-align">
        <NavLink to="/repositories/new" activeStyle={{ textDecoration: 'underline' }}>New</NavLink>
      </div>
    </div>
    <Route exact path="/repositories" render={() => <Redirect to="/repositories/popular" />} />
    <Route path="/repositories/popular" component={Popular} />
    <Route path="/repositories/trending" component={Trending} />
    <Route path="/repositories/new" component={New} />
  </div>
)

export default Repositories
