import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function PokeDetailView() {
    const clickedCardId = useParams().cardId
    const [clickedCard, setClickedCard] = useState()

    function getCardDetails() {
        fetch(`https://api.pokemontcg.io/v2/cards/${clickedCardId}`)
        .then(response => response.json())
        .then(data => {
            setClickedCard(data)
        })
        .catch(error => console.log('message: ', error.message))
    }

    useEffect(() => {
        getCardDetails()
    }, [])

    if(clickedCard) {
        return (
            <section>
							<header>
								<h1>{clickedCard.data.name}</h1>
							</header>
                <img src= { clickedCard.data.images.small } alt= { clickedCard.data.name } />
            </section>
        )
    }
}

export default PokeDetailView