import React from 'react'
import { Link, withRouter, matchPath } from 'react-router-dom'
import NavBarItem from '~/components/nav-bar/navbar-item/NavBarItem'

class NavBar extends React.Component {
    componentDidMount() {
            $(".button-collapse").sideNav();
    }
        render() {
    return (
        <nav className="blue darken-1">
          <div className="nav-wrapper container">
            <span href="#" className="brand-logo hide-on-large-only"><i class="material-icons hide-on-med-and-down">code</i>DO Open Source</span>
            <span href="#" className="brand-logo hide-on-med-and-down"><i class="material-icons">code</i>Dominican Open Source</span>
            <span href="#" data-activates="nav-bar-mobile" className="button-collapse hide-on-large-only"><i className="material-icons">menu</i></span>
            <ul className="right hide-on-med-and-down">
              <NavBarItem to="/repositories">Repositories</NavBarItem>
              <NavBarItem to="/developers">Developers</NavBarItem>
              <NavBarItem to="/about">About</NavBarItem>
            </ul>
            <ul className="side-nav" id="nav-bar-mobile">
              <NavBarItem to="/repositories">Repositories</NavBarItem>
              <NavBarItem to="/developers">Developers</NavBarItem>
              <NavBarItem to="/about">About</NavBarItem>
            </ul>
          </div>
        </nav>
    )

  }

}






export default withRouter(NavBar)
