import { useParams, Link } from 'react-router-dom'
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

    function addToBinder() {
      fetch('http://localhost:3000/api/v1/users/1/binders/1/binder_cards', {
        method: "POST", 
        headers: {
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify({name: clickedCard.name, image_url: clickedCard.imageUrl, category: 1})
      })

      .then(response => response.json())
      .then(data => console.log(data))
    }

    if(clickedCard) {
        return (
            <section>
                <img src= { clickedCard.imageUrl } alt= { clickedCard.name } />
                <button onClick={() => addToBinder()}>Add To Binder</button>
                <Link to={"/mtg_search"}><button>Back</button></Link>
            </section>
        )
    }
}

export default MagicDetailView