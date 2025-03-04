import { useParams, Link } from 'react-router-dom'
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
    })

    function addToBinder() {
      fetch('http://localhost:3000/api/v1/users/1/binders/1/binder_cards')
      .then(response => response.json())
      .then(data => console.log(data))
    }

    if(clickedCard) {
        return (
            <section>
                <img src= { clickedCard.data.images.small } alt= { clickedCard.data.name } />
                <button onClick={() => addToBinder()}>Add To Binder</button>
                <Link to={"/pokemon_search"}><button>Back</button></Link>
            </section>
        )
    }
}

export default PokeDetailView