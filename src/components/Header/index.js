import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'
import {Link} from 'react-router-dom'

class Header extends Component {
  state = {isHamburgar: false}

  onClickHamburgar = () => {
    this.setState(preState => ({isHamburgar: !preState.isHamburgar}))
  }

  onCloseHumburgar = () => {
    this.setState({isHamburgar: false})
  }

  render() {
    const {isHamburgar} = this.state
    return (
      <nav className="header-container">
        <div className="header-responsive">
          <div className="header-logo-container">
            <Link to="/" className="link-item">
              <img
                src="https://res.cloudinary.com/dorgvlsce/image/upload/v1688788393/movies%20app/movie_app_title_logo.png"
                className="website-logo"
                alt="website logo"
              />
            </Link>
            <ul className="header-destop-list">
              <Link to="/" className="link-item">
                <li className="destop-item">Home</li>
              </Link>
              <Link to="/" className="link-item">
                <li className="destop-item">Popular</li>
              </Link>
            </ul>
          </div>
          <div className="hamburger-container">
            <button
              className="search-button"
              type="button"
              data-testid="searchButton"
            >
              <Link to="/">
                <HiOutlineSearch size={24} color="#ffffff" />
              </Link>
            </button>
            <button
              type="button"
              className="hamburgar-button"
              onClick={this.onClickHamburgar}
            >
              <img
                src="https://res.cloudinary.com/dorgvlsce/image/upload/v1689004009/movies%20app/add-to-queue_1_1_xbnhtr.png"
                className="hamburgar-logo"
                alt="failure view"
              />
            </button>
            <Link to="/" className="link-item">
              <img
                src="https://res.cloudinary.com/dorgvlsce/image/upload/v1689004430/movies%20app/Avatar_yjoabb.png"
                className="avatar"
                alt="profile"
              />
            </Link>
          </div>
        </div>

        {isHamburgar && (
          <div className="hamburger-responsive">
            <ul className="hamburger-list-container">
              <Link to="/" className="link-item">
                <li className="hamburger-item">Home</li>
              </Link>
              <Link to="/" className="link-item">
                <li className="hamburger-item">Popular</li>
              </Link>
              <Link to="/not-found" className="link-item">
                <li className="hamburger-item">Account</li>
              </Link>
            </ul>
            <button
              type="button"
              className="close-button"
              onClick={this.onCloseHumburgar}
            >
              <AiFillCloseCircle size={24} color="#ffffff" />
            </button>
          </div>
        )}
      </nav>
    )
  }
}

export default Header
