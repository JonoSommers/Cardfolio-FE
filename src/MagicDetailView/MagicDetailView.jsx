import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function MagicDetailView({userData}) {
    const clickedCardId = useParams().cardId
    const [clickedCard, setClickedCard] = useState()
    const [selectedBinderName, setSelectedBinderName] = useState("")
    const [selectedBinderID, setSelectedBinderID] = useState("")

    console.log(userData)
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
    },[])

    function findBinderIDByName(binderName) {
      const foundBinder = userData.data.attributes.binders.find(binder => binder.name === binderName)
      if (foundBinder) {
        setSelectedBinderID(foundBinder.id)
      } else {
        setSelectedBinderID("")
      }
    }

    function handleBinderChange(event) {
      const binderName = event.target.value
      setSelectedBinderName(binderName)
      findBinderIDByName(binderName)
    }

    function addToBinder() {
      fetch(`http://localhost:3000/api/v1/users/${userData.data.id}/binders/${selectedBinderID}/binder_cards`, { 
        method: "POST", 
        headers: {
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify({name: clickedCard.name, image_url: clickedCard.imageUrl, category: 1})
      })

      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error("Error adding card to binder:", error))
    }
    
    function findBinder(bindername) {

        userData.data.attributes.binders.forEach(binder => {
          if(binder.name === bindername) {
            setSelectedBinderID(binder.id)
          }
        })
    }

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
                    <option value="">-- Select a Binder --</option>
                    {userData.data.attributes.binders.map((binder) => (
                      <option key={binder.id} value={binder.name}>
                        {binder.name}
                      </option>
                    ))}
                  </select>
                </label>
                <button onClick={() => addToBinder()}>Add To Binder</button>
                <Link to={"/mtg_search"}><button>Back</button></Link>
            </section>
        )
    }
}

export default MagicDetailView