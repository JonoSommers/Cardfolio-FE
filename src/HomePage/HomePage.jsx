import { useParams, Link } from 'react-router-dom'
import "./HomePage.css"
import FavoritesContainer from '../FavoritesContainer/FavoritesContainer'

function HomePage() {
  const displayName = useParams().username

  return( 
    <div>
      <h1>{displayName}</h1>
      <Link to={'/pokemon_search'}>
        <button>Pokemon</button>
      </Link>
      <Link to={'/mtg_search'}>
        <button>MTG</button>
      </Link>
      <FavoritesContainer/>
    </div>
  )   
}

export default HomePage;