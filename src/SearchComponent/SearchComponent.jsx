import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import "./SearchComponent.css"
import CardsContainer from '../CardsContainer/CardsContainer'

const fetchPokemonCards = 'https://api.pokemontcg.io/v2/cards?page=1&pageSize=100'
const fetchMTGCards = 'https://api.magicthegathering.io/v1/cards'

function SearchComponent() {
    const [cards, setCards] = useState([])

    function getPokemonCards() {
        fetch(fetchPokemonCards, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setCards(data.data)
        })
        .catch(error => console.log('message: ', error.message))
    }

    // function getMTGCards() {
    //     fetch(fetchMTGCards, {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         setCards(data.data)
    //         console.log('data: ', data.data)
    //     })
    //     .catch(error => console.log('message: ', error.message))
    // }

    useEffect(() => {
        getPokemonCards();
    }, [])

    // useEffect(() => {
    //     getMTGCards();
    // }, [])


    return (
        <div>
            <Link to={'/pokemon_search'}>
                <button onClick={() => getPokemonCards()}>Pokemon</button>
            </Link>
            <CardsContainer cards={ cards } />
            {/* <button onClick={() => getMTGCards()}>MTG</button> */}
        </div>
    )
}

export default SearchComponent