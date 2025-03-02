import { useState, useEffect } from 'react'
import "./MTGSearchView.css"
import CardsContainer from '../CardsContainer/CardsContainer'

const fetchMTGCards = 'https://api.magicthegathering.io/v1/cards'

function MTGSearchView() {
    const [magicCards, setMagicCards] = useState([])

    useEffect(() => {
        fetch(fetchMTGCards, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setMagicCards(data.cards)
        })
        .catch(error => console.log('message: ', error.message))
    }, [])

    return (
        <section>
            <CardsContainer cards={ magicCards } />
        </section>
    )
}

export default MTGSearchView