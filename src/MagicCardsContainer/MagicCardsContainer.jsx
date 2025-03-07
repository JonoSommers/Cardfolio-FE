import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import MagicSearchView from '../MagicSearchView/MagicSearchView'
import homeIcon from '../icons/home.png'
import searchIcon from '../icons/search.png'

const fetchMTGCards = 'https://api.magicthegathering.io/v1/cards'

function MagicCardsContainer({userData}) {
    const [magicCards, setMagicCards] = useState([])
    console.log('card: ', magicCards)
    const [magicSearch, setMagicSearch] = useState('')
    const filteredCards = magicCards.filter((card) => (
		card.name.toLowerCase().startsWith(magicSearch.toLowerCase())
	))

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

    const cards = filteredCards.map(card => {
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
        <section>
                <header>
                    <h1>Magic</h1>
                </header>
                <img className="searchIcon3" src={searchIcon} alt="search icon" />
                <input 
                    className="searchBar3"
                    type="text"
                    placeholder="Search Magic Name..."
                    value={magicSearch}
                    onChange={(event) => setMagicSearch(event.target.value)}
                />
            <section className="MTGSearchView">
                { cards }
            </section>
                <Link to={`/${userData.attributes.username}`}>
                    <img className="homeIcon" src={homeIcon} alt="home icon" />
                </Link>
        </section>
    )
}

export default MagicCardsContainer