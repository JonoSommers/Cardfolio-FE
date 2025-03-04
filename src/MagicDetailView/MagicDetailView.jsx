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
            console.log("data" , data.card.name)
            console.log("image", data.card.imageUrl)
        })
        .catch(error => console.log('message: ', error.message))
    }

    useEffect(() => {
        getCardDetails()
    },[])

    function addToBinder() {
      fetch('http://localhost:3000/api/v1/users/1/binders/1/binder_cards', { //this will need to be updated to interpolate the binder and user id
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
                <label>Users Binders:
                    <select name="selected">
                        <option value="binder 1">Default Binder</option>
                        <option value="binder 2">Users Second Binder</option>
                    </select>
                </label>
                <button onClick={() => addToBinder()}>Add To Binder</button>
                <Link to={"/mtg_search"}><button>Back</button></Link>
            </section>
        )
    }
}

export default MagicDetailView