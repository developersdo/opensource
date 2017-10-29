import React from 'react'
import { Link, withRouter, matchPath } from 'react-router-dom'
import NavBarItem from '~/components/nav-bar/navbar-item/NavBarItem'

const NavBar = ({ location }) => (
  <nav className="blue darken-1">
    <div className="nav-wrapper container">
      <span className="brand-logo">
        <i className="material-icons">code</i>
        Dominican Open Source
      </span>
      <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
      <ul className="right hide-on-med-and-down">
        <NavBarItem to="/repositories">Repositories</NavBarItem>
        <NavBarItem to="/developers">Developers</NavBarItem>
        <NavBarItem to="/about">About</NavBarItem>
      </ul>
      <ul className="side-nav" id="mobile-demo">
        <NavBarItem to="/repositories">Repositories</NavBarItem>
        <NavBarItem to="/developers">Developers</NavBarItem>
        <NavBarItem to="/about">About</NavBarItem>
      </ul>
    </div>
  </nav>
)

$(document).ready(function(){
    $(".button-collapse").sideNav();
})

export default withRouter(NavBar)
