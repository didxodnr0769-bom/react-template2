import { Link } from 'react-router-dom'
import { URL } from '../core/constants/URL'
import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to={URL.HOME}>
            <h1>React Template</h1>
          </Link>
        </div>

        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to={URL.HOME} className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={URL.ABOUT} className="nav-link">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
