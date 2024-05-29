import React from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className="app-root-1">
      <header className="Paper-root AppBar-root AppBar-positionStatic AppBar-colorPrimary Paper-elevation4">
        <div className="Toolbar-root Toolbar-regular header-appBar-13 Toolbar-gutters">
          <div className="header-left-4"></div>
          <img className="header-logo-11" src={logo} />
          <div className="header-vertical-9"></div>
          <Link to={'/'} className="Typography-root header-logo-text">
            Shekles
          </Link>
          <div className="header-empty-6"></div>
          <div className="header-space-8"></div>

          <Link
            to={'/discover'}
            className="ButtonBase-root Button-root Button-text header-navButtons-3"
          >
            Discover
          </Link>
          <Link
            to={'/minter'}
            className="ButtonBase-root Button-root Button-text header-navButtons-3"
          >
            Minter
          </Link>
          <Link
            to={'/collection'}
            className="ButtonBase-root Button-root Button-text header-navButtons-3"
          >
            My NFTs
          </Link>
        </div>
      </header>
    </div>
  )
}

export default Header
