import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function MagicDetailView() {
    const clickedCardId = useParams().cardId
    const [clickedCard, setClickedCard] = useState()

    function getCardDetails() {
        fetch(`https://api.magicthegathering.io/v1/cards/${clickedCardId}`)
        .then(response => response.json())
        .then(data => {
            setClickedCard(data.card)
        })
        .catch(error => console.log('message: ', error.message))
    }

    useEffect(() => {
        getCardDetails()
    })

    if(clickedCard) {
        return (
            <section>
		<header>
			<h1>{clickedCard.name}</h1>
		</header>
                <img src= { clickedCard.imageUrl } alt= { clickedCard.name } />
            </section>
        )
    }
}

export default MagicDetailView
