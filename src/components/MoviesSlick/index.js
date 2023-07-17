import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import './index.css'

class MoviesSlick extends Component {
  renderMovieSlider = () => {
    const {moviesList} = this.props
    const settings = {
      dots: false,
      infinite: false,
      className: 'sample',
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <Slider {...settings}>
        {moviesList.map(eachMovie => {
          const {id, posterPath, name} = eachMovie
          return (
            <div className="slick-item" key={id}>
              <Link to={`movies/${id}`}>
                <img src={posterPath} className="slick-logo" alt={name} />
              </Link>
            </div>
          )
        })}
      </Slider>
    )
  }

  render() {
    return <div className="slick-container">{this.renderMovieSlider()}</div>
  }
}

export default MoviesSlick
