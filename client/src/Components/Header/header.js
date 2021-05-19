import React from 'react'
import PropTypes from 'prop-types'

import './header.css'

const Header = ({ title }) => (
  <header>
    <h1>{title}</h1>
  </header>
)

Header.propTypes = {
  title: PropTypes.string
}

export default Header
