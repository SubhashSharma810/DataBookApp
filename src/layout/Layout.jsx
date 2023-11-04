import React from 'react'
import PropTypes from 'prop-types'
import Navbar from "../component/Navbar"

function Layout({childern}) {
  return (
    <div>
        <Navbar/>
        <div className="content">{childern}</div>
    </div>
  )
}

Layout.propTypes = {
  childern: PropTypes.node.isRequired,
}

export default Layout ;
