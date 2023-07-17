import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {HiOutlineSearch} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import MovieItem from '../MovieItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Footer extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    isHamburgar: false,
    searchText: '',
    noSearchText: '',
    movieList: [],
  }

  componentDidMount() {
    this.getMovieList()
  }

  onClickMovieList = () => {
    this.getMovieList()
  }

  onClickHamburgar = () => {
    this.setState(preState => ({isHamburgar: !preState.isHamburgar}))
  }

  onCloseHumburgar = () => {
    this.setState(preState => ({isHamburgar: !preState.isHamburgar}))
  }

  getMovieList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchText} = this.state

    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchText}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const formatedData = data.results.map(eachItem => ({
        id: eachItem.id,
        backdropPath: eachItem.backdrop_path,
        posterPath: eachItem.poster_path,
        title: eachItem.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        movieList: formatedData,
        noSearchText: searchText,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onSearchInput = event => {
    this.setState({searchText: event.target.value})
  }

  onClickSearch = () => {
    this.getMovieList()
  }

  renderSearchHeader = () => {
    const {searchText, isHamburgar} = this.state

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
              <Link to="/popular" className="link-item">
                <li className="destop-item">Popular</li>
              </Link>
            </ul>
          </div>
          <div className="hamburger-container">
            <div className="search-container">
              <input
                type="search"
                className="search-input"
                onChange={this.onSearchInput}
                value={searchText}
              />
              <button
                className="movie-search-button"
                type="button"
                testid="searchButton"
                onClick={this.onClickSearch}
              >
                <HiOutlineSearch className="search-logo" />
              </button>
            </div>

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
            <Link to="/account" className="link-item">
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
              <Link to="/popular" className="link-item">
                <li className="hamburger-item">Popular</li>
              </Link>
              <Link to="/account" className="link-item">
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

  renderSuccesView = () => {
    const {movieList, noSearchText} = this.state
    const isEmpty = movieList.length > 0

    return (
      <>
        {isEmpty ? (
          <ul className="movie-list-container">
            {movieList.map(eachMovie => (
              <MovieItem itemDetails={eachMovie} key={eachMovie.id} />
            ))}
          </ul>
        ) : (
          <div className="empty-list-container">
            <img
              src="https://res.cloudinary.com/dorgvlsce/image/upload/v1689591971/movies%20app/Group_7394_e01vjm.png"
              className="empty-list-image"
              alt="no movies"
            />
            <p className="empty-list-description">
              {`Your search for ${noSearchText} did not find any matches.`}
            </p>
          </div>
        )}
      </>
    )
  }

  renderFailureView = () => (
    <>
      <div className="movie-details-failure">
        <img
          src="https://res.cloudinary.com/dorgvlsce/image/upload/v1689355236/movies%20app/Background-Complete_carkyx.png"
          className="failure-logo"
          alt="failure view"
        />
        <p className="movie-failure-description">
          Something went wrong. Please try again
        </p>
        <button
          type="button"
          className="try-again-btn"
          onClick={this.onClickMovieList}
        >
          Try Again
        </button>
      </div>
    </>
  )

  renderProgressView = () => (
    <>
      <div className="loader-container1" data-testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </>
  )

  renderAllViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccesView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderProgressView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="search-movies-container">
        {this.renderSearchHeader()}
        <div className="">{this.renderAllViews()}</div>
      </div>
    )
  }
}

export default Footer
