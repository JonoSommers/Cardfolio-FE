import { useState, useEffect } from 'react'
import PokeSearchView from '../PokeSearchView/PokeSearchView.jsx'

const fetchPokemonCards = 'https://api.pokemontcg.io/v2/cards?page=1&pageSize=100'

function PokeCardsContainer() {
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

    const cards = pokemonCards.map(card => {
        return (
            < PokeSearchView
                key = { card.id }
                id = { card.id }
                p_card_path = { card.images.small }
                p_card_name = { card.name }
            />
        )
    })

    return (
        <section className="PokemonSearchView">
            { cards }
        </section>
    )
}

export default PokeCardsContainer