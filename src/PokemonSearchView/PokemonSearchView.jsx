import { useState, useEffect } from 'react'
import "./PokemonSearchView.css"
import CardsContainer from '../CardsContainer/CardsContainer'

const fetchPokemonCards = 'https://api.pokemontcg.io/v2/cards?page=1&pageSize=100'

function PokemonSearchView() {
    const [pokemonCards, setPokemonCards] = useState([])

    useEffect(() => {
        fetch(fetchPokemonCards, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setPokemonCards(data.data)
        })
        .catch(error => console.log('message: ', error.message))
    }, [])

    return (
        <section>
            <CardsContainer cards={ pokemonCards } />
        </section>
    )
}

export default PokemonSearchView