import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function MagicDetailView({userData}) {
    const clickedCardId = useParams().cardId
    const [clickedCard, setClickedCard] = useState()
    const [selectedBinderName, setSelectedBinderName] = useState("")
    const [selectedBinderID, setSelectedBinderID] = useState("")

    console.log("data", userData?.attributes?.binders)

    const allBinders = userData.attributes.binders.map(binder => {
        return (
            <option key={binder.id} value={binder.name}>
                {binder.name}
                {console.log(binder.name)}
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

    function findBinderIDByName(binderName) {
      const foundBinder = userData.attributes.binders.find(binder => binder.name.downcase === binderName.downcase)
      if (foundBinder) {
        setSelectedBinderID(foundBinder.id)
      } else {
        setSelectedBinderID("")
      }
    };



    function handleBinderChange(event) {
      const binderName = event.target.value
      setSelectedBinderName(binderName)
      findBinderIDByName(binderName)
    };

    function addToBinder() {
      fetch(`http://localhost:3000/api/v1/users/${userData.id}/binders/${selectedBinderID}/binder_cards`, { 
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
                    onChange={handleBinderChange}
                    value={selectedBinderName}
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