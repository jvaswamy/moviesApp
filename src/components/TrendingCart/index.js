import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillExclamationTriangleFill} from 'react-icons/bs'
import MoviesSlick from '../MoviesSlick'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendingCart extends Component {
  state = {apiStatus: apiStatusConstants.initial, trendingMovieList: []}

  componentDidMount() {
    this.getTrendingMovies()
  }

  getTrendingMovies = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
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
        name: eachItem.title,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        trendingMovieList: formatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickTry = () => {
    this.getTrendingMovies()
  }

  renderSuccesView = () => {
    const {trendingMovieList} = this.state

    return <MoviesSlick moviesList={trendingMovieList} />
  }

  renderFailureView = () => (
    <div className="failure-loader-container">
      <BsFillExclamationTriangleFill color="#D81F26" size={24} />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button className="failure-btn" type="button" onClick={this.onClickTry}>
        Try Again
      </button>
    </div>
  )

  renderProgressView = () => (
    <div className="failure-loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
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
    return <>{this.renderAllViews()}</>
  }
}

export default TrendingCart
