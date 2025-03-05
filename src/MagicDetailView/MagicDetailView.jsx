import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function MagicDetailView({userData}) {
    const clickedCardId = useParams().cardId
    const [clickedCard, setClickedCard] = useState()
    const [selectedBinderName, setSelectedBinderName] = useState("")
    const [selectedBinderId, setSelectedBinderId] = useState(0)

    console.log("data", userData?.attributes?.binders)

    const allBinders = userData.attributes.binders.map(binder => {
        return (
            <option key={binder.id} value={binder.id}>
                {binder.name}
                {console.log("binder id:", binder.id)}
            </option>

    )          
});

    function getCardDetails() {
        fetch(`https://api.magicthegathering.io/v1/cards/${clickedCardId}`)
        .then(response => response.json())
        .then(data => {
            setClickedCard(data.card)
        })
        .catch(error => console.log('message: ', error.message))
    };

    useEffect(() => {
        getCardDetails()
    },[])




    // function handleBinderChange(event) {
    //   setSelectedBinderID(event.target.value)
    // };

    function addToBinder() {
      fetch(`http://localhost:3000/api/v1/users/${userData.id}/binders/${selectedBinderId}/binder_cards`, { 
        method: "POST", 
        headers: {
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify({name: clickedCard.name, image_url: clickedCard.imageUrl, category: 1})
      })

      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error("Error adding card to binder:", error))
    };
    

    if(clickedCard) {
        return (
            <section>
                <img src= { clickedCard.imageUrl } alt= { clickedCard.name } />
                <label>Users Binders:
                  <select 
                    name="selected binder"
                    onChange={(event) => setSelectedBinderId(event.target.value)}
                    value={selectedBinderId}
                  >
                    {allBinders}
                    {console.log("binders" ,allBinders)}
                  </select>
                </label>
                <button onClick={() => addToBinder()}>Add To Binder</button>
                <Link to={"/mtg_search"}><button>Back</button></Link>
            </section>
        )
    }
}

export default MagicDetailView