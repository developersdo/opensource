import React from 'react'
import { NavLink } from 'react-router-dom'

const style = {
  default: {
    display: 'inline-block',
    margin: '40px',
    fontSize: '20px',
    color: '#000'
  },
  active: {
    textDecoration: 'underline',
    fontWeight: 'bold'
  }
}

const SubNavLink = ({ to, children }) => (
  <NavLink style={style.default} to={to} activeStyle={style.active}>{children}</NavLink>
)

export default SubNavLink
