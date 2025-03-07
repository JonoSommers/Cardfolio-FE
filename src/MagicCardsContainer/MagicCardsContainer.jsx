import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import MagicSearchView from '../MagicSearchView/MagicSearchView'
import homeIcon from '../icons/home.png'
import searchIcon from '../icons/search.png'

const fetchMTGCards = 'https://api.magicthegathering.io/v1/cards'

function MagicCardsContainer({userData}) {
    const [magicCards, setMagicCards] = useState([])
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
        <section className="MagicContainer">
                <header className="MagicHeader">
                    <h1>Magic</h1>
                </header>
                <div className="searchSection">
                    <Link to={`/${userData.attributes.username}`}>
                        <img className="homeIcon" src={homeIcon} alt="home icon" />
                    </Link>
                    <input 
                        className="searchBar3"
                        type="text"
                        placeholder="Search Magic Name..."
                        value={magicSearch}
                        onChange={(event) => setMagicSearch(event.target.value)}
                    />
                    <img className="searchIcon3" src={searchIcon} alt="search icon" />
                </div>
            <section className="MagicSearchView">
                { cards }
            </section>
                
        </section>
    )
}

export default MagicCardsContainer