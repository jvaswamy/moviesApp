import {Link} from 'react-router-dom'
import './index.css'

const MovieItem = props => {
  const {itemDetails} = props
  const {posterPath, title, id} = itemDetails
  return (
    <li className="movie-list-item" data-testid="movieItem">
      <div>
        <Link to={`/movies/${id}`}>
          <img src={posterPath} className="movie-item-image" alt={title} />
        </Link>
      </div>
    </li>
  )
}

export default MovieItem
