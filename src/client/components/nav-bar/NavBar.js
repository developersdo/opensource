import React from 'react'
import {  withRouter } from 'react-router-dom'
import NavBarItem from '~/components/nav-bar/navbar-item/NavBarItem'

import '../../images/logo.svg'

const style = {
  menu: {
    cursor: 'pointer'
  },
  dev_do_logo: {
    color: '#fff',
    fill: 'currentColor',
    width: '1.3em',
    height: '1.3em',
    verticalAlign: 'middle',
    overflow: 'hidden',
  }
}

class NavBar extends React.Component {

  componentDidMount() {
    $(() => {
      $('.button-collapse').sideNav({
        closeOnClick: true,
      })
    })
  }

  render() {
    return (
      <nav className="blue darken-1">
        <div className="nav-wrapper container">
          <span className="brand-logo hide-on-small-only">
            <svg style={ style.dev_do_logo } aria-hidden="true" focusable="false">
              <use xlinkHref="#logo_logo"></use>
					  </svg> Dominican Open Source</span>
          <span className="brand-logo hide-on-med-and-up">
            <svg style={ style.dev_do_logo } aria-hidden="true" focusable="false">
              <use xlinkHref="#logo_logo"></use>
            </svg>
          </span>
          <span
            className="button-collapse hide-on-large-only"
            style={ style.menu }
            data-activates="nav-bar-mobile"
          ><i className="material-icons">menu</i></span>
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
