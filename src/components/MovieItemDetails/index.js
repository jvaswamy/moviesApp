import './index.css'

const MovieItemDetails = props => {
  const {match} = props
  const {params} = match
  const {id} = params
  console.log(id)
  return <h1>details</h1>
}

export default MovieItemDetails
