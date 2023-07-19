import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillExclamationTriangleFill} from 'react-icons/bs'
import Header from '../Header'
import TrendingCart from '../TrendingCart'
import MoviesSlick from '../MoviesSlick'
import TopRatedCart from '../TopRatedCart'

import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    posterDetailsList: [],
  }

  componentDidMount() {
    this.getHomePoster()
  }

  getHomePoster = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const responseDate = await response.json()

      const formatedData = responseDate.results.map(eachItem => ({
        backdropPath: eachItem.backdrop_path,
        posterPath: eachItem.poster_path,
        overview: eachItem.overview,
        id: eachItem.id,
        title: eachItem.title,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        posterDetailsList: formatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickTry = () => {
    this.getHomePoster()
  }

  renderSuccessView = index => {
    const {posterDetailsList} = this.state

    return (
      <div className="poster-responsive-container">
        <h1 className="poster-title">{posterDetailsList[index].title}</h1>
        <h1 className="poster-description">
          {posterDetailsList[index].overview}
        </h1>
        <button type="button" className="poster-button">
          Play
        </button>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="loader-container">
      <BsFillExclamationTriangleFill color="#D81F26" size={35} />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button className="failure-btn" type="button" onClick={this.onClickTry}>
        Try Again
      </button>
    </div>
  )

  renderInProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderAllViews = index => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderInProgressView()
      case apiStatusConstants.success:
        return this.renderSuccessView(index)
      default:
        return null
    }
  }

  renderOriginalList = () => {
    const {posterDetailsList} = this.state

    return <MoviesSlick moviesList={posterDetailsList} />
  }

  renderAllOriginalMovies = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.failure:
        return (
          <div className="failure-loader-container">
            <BsFillExclamationTriangleFill color="#D81F26" size={24} />
            <p className="failure-text">
              Something went wrong. Please try again
            </p>
            <button
              className="failure-btn"
              type="button"
              onClick={this.onClickTry}
            >
              Try Again
            </button>
          </div>
        )
      case apiStatusConstants.inProgress:
        return (
          <div className="failure-loader-container" data-testid="loader">
            <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
          </div>
        )
      case apiStatusConstants.success:
        return this.renderOriginalList()
      default:
        return null
    }
  }

  render() {
    const {posterDetailsList} = this.state
    const index = Math.floor(Math.random() * posterDetailsList.length)
    const bgPoster =
      posterDetailsList.length > 0 &&
      `url(${posterDetailsList[index].backdropPath})`

    return (
      <div className="home-container">
        <div
          className="poster-container"
          style={{
            backgroundImage: bgPoster,
          }}
        >
          <Header isActiveName="home" />
          {this.renderAllViews(index)}
        </div>
        <div className="home-movies-container">
          <h1 className="movie-category-heading">Trending Now</h1>
          <div className="movie-category-container">
            <TrendingCart />
          </div>
          <h1 className="movie-category-heading">Top Rated</h1>
          <div className="movie-category-container">
            <TopRatedCart />
          </div>
          <h1 className="movie-category-heading">Originals</h1>
          <div className="movie-category-container">
            {this.renderAllOriginalMovies()}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
