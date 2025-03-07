import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./HomePage.css";

function HomePage({ userData, setUserData }) {
  const displayName = useParams().username;
  const [allCards, setAllCards] = useState([]);

  useEffect(() => {
    if (userData?.attributes?.binders?.length > 0) {

      const allCards = userData.attributes.binders.flatMap(binder => binder.binders_cards) 

      setAllCards(allCards);
    }
    fetchUser()
  }, []);


  function fetchUser() {
		fetch(`http://localhost:3000/api/v1/users/${userData.id}`)
		  .then(response => response.json())
		  .then((data) => {
			setUserData(data.data);
		  })
		  .catch((error) => console.error("Error fetching user data:", error));
	  }

    useEffect(() => {
      fetchUser()
    }, [])

  const favoriteCards = allCards.filter(card => card.data.attributes.favorite.favorite === true);

  return (
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
              <button className="bindersButton">{binder.name}</button>
            </Link>
          ))}
            {userData.attributes.binders.length === 1 ? <Link to='/createbinder'><button className="createbinder">Create A New Binder</button></Link> : null }
        </section>

        {favoriteCards.length > 0 && (
          <section className="favorites-container">
            <h2>Favorite Cards</h2>
            <div className="favorite-cards">
              {favoriteCards.map((card) => (
                <div key={card.id} className="card-display">
                  <img src={card.data.attributes.card.image_url} alt={card.data.attributes.card.name} />
                </div>
              ))}
            </div>
          </section>
        )}
				<div>
					<Link to={"/"}>
						<button className="logout-button">Logout</button>
					</Link>
				</div>
      </div>
    </div>
  );
}

export default HomePage;
