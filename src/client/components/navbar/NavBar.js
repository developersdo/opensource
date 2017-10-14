import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => (
  <nav>
    <ul>
      <li>
        <Link to="/repositories">Repositories</Link>
      </li>
      <li>
        <Link to="/developers">Developers</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>
  </nav>
)

export default NavBar
