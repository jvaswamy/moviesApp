import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import MovieItem from '../MovieItem'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
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

    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
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
        overview: eachItem.overview,
        title: eachItem.title,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        movieList: formatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccesView = () => {
    const {movieList} = this.state

    return (
      <>
        {/* <h1 className="popular-movie-heading">Most Popular Movies</h1> */}
        <ul className="movie-list-container">
          {movieList.map(eachMovie => (
            <MovieItem itemDetails={eachMovie} key={eachMovie.id} />
          ))}
        </ul>
        <Footer />
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
        <Header isActiveName="popular" />
        <div className="">{this.renderAllViews()}</div>
      </div>
    )
  }
}

export default Popular
