import { useState } from 'react'
import { Link } from "react-router-dom"
import "./SearchComponent.css"

const fetchPokemonCards = 'https://api.pokemontcg.io/v2/cards?page=1&pageSize=100'
const fetchMTGCards = 'https://api.magicthegathering.io/v1/cards'

function getPokemonCards() {
    const [pokemon, setPokemonCards] = useState([])
    fetch(fetchPokemonCards, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        setPokemonCards(data)
        console.log('data: ', data)
    })
    .catch(error => console.log('message: ', error.message))
}

function getMTGCards() {
    const [MTG, setMTGCards] = useState([])
    fetch(fetchMTGCards, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        setMTGCards(data)
        console.log('data: ', data)
    })
    .catch(error => console.log('message: ', error.message))
}

function SearchComponent() {
    return (
        <div>
            <Link to={'/pokemon_search'}>
                <button onClick={() => getPokemonCards()}>Pokemon</button>
            </Link>
            <button onClick={() => getMTGCards()}>MTG</button>
        </div>
    )
}

export default SearchComponent