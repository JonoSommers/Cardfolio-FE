import { useParams, Link } from 'react-router-dom'
import "./HomePage.css"

function HomePage({userData}) {
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
      {userData.attributes.binders.map((binder) => (
      <Link key={binder.id} to={`/binder/${binder.name}`}>
        <button key={binder.id}>{binder.name}</button>
      </Link>
      ))}
    </div>
  )   
}

export default HomePage;