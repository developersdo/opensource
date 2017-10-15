import React from 'react'
import { Link, withRouter, matchPath } from 'react-router-dom'
import NavBarItem from './navbar-item/NavBarItem'

const NavBar = ({ location }) => (
  <nav className="blue darken-1">
    <div className="nav-wrapper container">
      <a href="#" className="brand-logo">Dominican Open Source</a>
      <ul className="right hide-on-med-and-down">
        <NavBarItem to="/repositories">Repositories</NavBarItem>
        <NavBarItem to="/developers">Developers</NavBarItem>
        <NavBarItem to="/about">About</NavBarItem>
      </ul>
    </div>
  </nav>
)

export default withRouter(NavBar)
