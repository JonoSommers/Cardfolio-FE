import { useState, useEffect } from 'react'
import MagicSearchView from '../MagicSearchView/MagicSearchView'

const fetchMTGCards = 'https://api.magicthegathering.io/v1/cards'

function MagicCardsContainer() {
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

    const cards = magicCards.map(card => {
        if (card.imageUrl) {
            return (
                < MagicSearchView
                    key = { card.id }
                    id = { card.id }
                    m_card_path = { card.imageUrl }
                    m_card_name = { card.name }
                />
            )
        }
    })

    return (
        <section className="MTGSearchView">
            { cards }
        </section>
    )
}

export default MagicCardsContainer