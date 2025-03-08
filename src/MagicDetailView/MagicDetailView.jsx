import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import './MagicDetailView.css'

function MagicDetailView({userData}) {
  console.log(userData)
  const clickedCardId = useParams().cardId
  const [clickedCard, setClickedCard] = useState()
  const [selectedBinderId, setSelectedBinderId] = useState(0)
  const [cardStyle, setCardStyle] = useState({})
  const cardRef = useRef(null)

  useEffect(() => {
    if (userData?.attributes?.binders?.length > 0) {
      setSelectedBinderId(String(userData.attributes.binders[0].id))
    }
  }, [userData])

  const allBinders = userData.attributes.binders.map(binder => (
    <option key={binder.id} value={binder.id}>{binder.name}</option>
  ))

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
  }, [clickedCardId])

  function addToBinder() {
    if (selectedBinderId && clickedCard) {
      fetch(`https://cardfolio-be.onrender.com/api/v1/users/${userData.id}/binders/${selectedBinderId}/binder_cards`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
          name: clickedCard.name, 
          image_url: clickedCard.imageUrl, 
          category: 1
        })
      })
      .then(response => response.json())
      .catch(error => console.error("Error adding card to binder:", error))
    }
  }
  
  if (clickedCard) {
    return (
      <section className="MagicDetails">
        <header>
          <h1 className="MagicName">{clickedCard.name}</h1>
        </header>
        <div
          className="MagicCard"
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleMouseMove}
          onMouseOut={handleMouseOut}
          onTouchEnd={handleTouchEnd}
          style={{
            ...cardStyle,
            transition: 'transform 0.5s ease, box-shadow 0.2s ease',
          }}
        >
          <img className="MagicImg" src={clickedCard.imageUrl} alt={clickedCard.name} />
        </div>
        <div className="below">
          <label className="MagicLabel">Users Binders:
            <select 
              name="selected binder"
              onChange={event => setSelectedBinderId(String(event.target.value))}
              value={selectedBinderId}
            >
              {allBinders}
            </select>
          </label>
          <button className="add" onClick={addToBinder}>Add To Binder</button>
          <Link className="back" to="/mtg_search"><button>Back</button></Link>
        </div>
      </section>
    )
  }
  return null
}

export default MagicDetailView
