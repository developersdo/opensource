import React from 'react'
import classnames from 'classnames'
import { Link, withRouter, matchPath } from 'react-router-dom'

const NavBarItem = ({ to, children, location }) => {
  const active = !!matchPath(location.pathname, { path: to })
  return (
    <li className={classnames({active})}>
      <Link to={to}>{children}</Link>
    </li>
  )
}

export default withRouter(NavBarItem)
