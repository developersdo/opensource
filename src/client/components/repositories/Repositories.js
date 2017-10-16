import React from 'react'
import { Route, Redirect, NavLink } from 'react-router-dom'
import Popular from './popular/Popular'
import Trending from './trending/Trending'
import New from './new/New'
import SubNavLink from '../sub-nav-link/SubNavLink'
import store from '../../store/store'

const Repositories = (props) => (
  <div id="repositories">
    <div className="row center-align">
      <SubNavLink to="/repositories/popular">Popular</SubNavLink>
      <SubNavLink to="/repositories/trending">Trending</SubNavLink>
      <SubNavLink to="/repositories/new">New</SubNavLink>
    </div>
    <Route exact path="/repositories" render={() => <Redirect to="/repositories/popular" />} />
    <Route path="/repositories/popular" render={() => <Popular repos={store.repos} />} />
    <Route path="/repositories/trending" component={Trending} />
    <Route path="/repositories/new" component={New} />
  </div>
)

export default Repositories
