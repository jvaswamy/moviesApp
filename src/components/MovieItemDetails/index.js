import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import format from 'date-fns/format'
import Header from '../Header'
import MovieItem from '../MovieItem'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, movieDetails: {}}

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const formatedData = {
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        id: data.movie_details.id,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
        genres: data.movie_details.genres,
        similarMovies: data.movie_details.similar_movies.map(eachItem => ({
          id: eachItem.id,
          backdropPath: eachItem.backdrop_path,
          posterPath: eachItem.poster_path,
          title: eachItem.title,
        })),
        spokenLanguages: data.movie_details.spoken_languages.map(eachItem => ({
          id: eachItem.id,
          englishName: eachItem.english_name,
        })),
      }
      this.setState({
        apiStatus: apiStatusConstants.success,
        movieDetails: formatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickMovieDetails = () => {
    this.getMovieDetails()
  }

  movieGenerItem = item => {
    const {id, name} = item
    return (
      <li className="list-item" key={id}>
        {name}
      </li>
    )
  }

  movieLanguageItem = item => {
    const {id, englishName} = item
    return (
      <li className="list-item" key={id}>
        {englishName}
      </li>
    )
  }

  isClickItem = () => {
    this.getMovieDetails()
  }

  renderSuccesView = () => {
    const {movieDetails} = this.state

    const {
      backdropPath,
      title,
      overview,
      adult,
      releaseDate,
      runtime,
      voteCount,
      voteAverage,
      budget,
      genres,
      spokenLanguages,
      similarMovies,
    } = movieDetails
    const getYear = format(new Date(releaseDate), 'yyyy')
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    const date = format(new Date(releaseDate), 'do 	LLL yyyy')

    return (
      <>
        <div
          className="header-poster-section"
          style={{
            backgroundImage: `url(${backdropPath})`,
          }}
        >
          <Header />
          <div className="header-content-container">
            <h1 className="movie-title">{title}</h1>
            <div className="movie-time-container">
              <p className="duration">{`${hours}h ${minutes}m`}</p>
              <p className="adult">{adult ? 'A' : 'U/A'}</p>
              <p className="year">{getYear}</p>
            </div>
            <p className="movie-description">{overview}</p>
            <button type="button" className="movie-play-button">
              Play
            </button>
          </div>
        </div>
        <div className="movie-content-container-top">
          <div className="movie-content-container">
            <div className="content-container">
              <h1 className="content-heading">Genres</h1>
              <ul className="content-list">
                {genres.map(eachItem => this.movieGenerItem(eachItem))}
              </ul>
            </div>
            <div className="content-container">
              <h1 className="content-heading">Audio Available</h1>
              <ul className="content-list">
                {spokenLanguages.map(eachItem =>
                  this.movieLanguageItem(eachItem),
                )}
              </ul>
            </div>
            <div className="content-container">
              <h1 className="content-heading">Rating Count</h1>
              <p className="content-values">{voteCount}</p>
              <h1 className="content-heading">Rating Average</h1>
              <p className="content-values">{voteAverage}</p>
            </div>
            <div className="content-container">
              <h1 className="content-heading">Budget</h1>
              <p className="content-values">{budget}</p>
              <h1 className="content-heading">Release Date</h1>
              <p className="content-values">{date}</p>
            </div>
          </div>
        </div>

        <h1 className="similar-movies-list-heading">More like this</h1>
        <ul className="similar-movies-list">
          {similarMovies.map(eachItem => (
            <MovieItem key={eachItem.id} itemDetails={eachItem} />
          ))}
        </ul>
        <Footer />
      </>
    )
  }

  renderFailureView = () => (
    <>
      <Header />
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
          onClick={this.onClickMovieDetails}
        >
          Try Again
        </button>
      </div>
    </>
  )

  renderProgressView = () => (
    <>
      <Header />
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
      <div className="movie-details-container">{this.renderAllViews()}</div>
    )
  }
}

export default MovieItemDetails
