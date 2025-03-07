import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import PokeSearchView from '../PokeSearchView/PokeSearchView.jsx';
import homeIcon from '../icons/home.png'
import searchIcon from '../icons/search.png'


const fetchPokemonCards = 'https://api.pokemontcg.io/v2/cards?page=1&pageSize=100';

function PokeCardsContainer({userData}) {
    const [pokemonCards, setPokemonCards] = useState([]);
    const [pokeSearch, setPokeSearch] = useState('')
    const filteredCards = pokemonCards.filter((card) => (
		card.name.toLowerCase().startsWith(pokeSearch.toLowerCase())
	))

    useEffect(() => {
        fetch(fetchPokemonCards, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setPokemonCards(data.data);
        })
        .catch(error => console.log('message: ', error.message));
    }, []);

    const cards = filteredCards.map(card => (
        <PokeSearchView
            key={card.id}
            id={card.id}
            p_card_path={card.images.small}
            p_card_name={card.name}
        />
    ));
    

    return (
        <section>
            <header>
				<h1>Pokemon</h1>
			</header>
            <img className="searchIcon2" src={searchIcon} alt="search icon" />
            <input 
				className="searchBar2"
				type="text"
				placeholder="Search Pokemon Name..."
				value={pokeSearch}
				onChange={(event) => setPokeSearch(event.target.value)}
			/>
            <section className="PokemonSearchView">
                {cards}
            </section>
                <Link to={`/${userData.attributes.username}`}>
                    <img className="homeIcon" src={homeIcon} alt="home icon" />
                </Link>
        </section>
    );
}

export default PokeCardsContainer;