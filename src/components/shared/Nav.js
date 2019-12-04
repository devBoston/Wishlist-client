import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => (
  <nav>
    <NavLink to='/items'>Items</NavLink>
    <NavLink to='/create-item'>Create Item</NavLink>
  </nav>
)

export default Nav

// <NavLink to='/'>Home</NavLink>
