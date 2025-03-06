import { useParams, Link } from 'react-router-dom'
import "./HomePage.css"

function HomePage({userData}) {
  const displayName = useParams().username

  return( 
    <div className="card-container">

    <div className="card-name">{displayName}</div>

    <div className="card-image">
      <section className="buttons-container">
        <Link to={'/pokemon_search'}>
          <button className="homeViewButton">Pokemon</button>
        </Link>
        <Link to={'/mtg_search'}>
          <button className="homeViewButton">MTG</button>
        </Link>
      </section>
      <section className="binders-container">
      {userData.attributes.binders.map((binder) => (
      <Link key={binder.id} to={`/binder/${binder.name}`}>
        <button className="bindersButton" key={binder.id}>{binder.name}</button>
      </Link>  
      ))}
      </section>
    </div>
    </div>
      )}

export default HomePage
