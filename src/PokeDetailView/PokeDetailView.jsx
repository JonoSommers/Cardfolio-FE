import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import './PokeDetailView.css'

function PokeDetailView({ userData }) {
  const clickedCardId = useParams().cardId
  const [clickedCard, setClickedCard] = useState(null)
  const [selectedBinderId, setSelectedBinderId] = useState(0)

  const [cardStyle, setCardStyle] = useState({})
  const cardRef = useRef(null)
  
  useEffect(() => {
    if (userData?.attributes?.binders?.length > 0) {
      setSelectedBinderId(String(userData.attributes.binders[0].id))
    }
  }, [userData])

  const allBinders = userData?.attributes?.binders?.map(binder => {
    return (
      <option key={binder.id} value={binder.id}>
        {binder.name}
      </option>
    )
  })

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
  }, [clickedCardId])

  const handleMouseMove = (e) => {
    const card = cardRef.current
    const pos = e.type === 'touchmove' ? [e.touches[0].clientX, e.touches[0].clientY] : [e.offsetX, e.offsetY]
    const { width, height } = card.getBoundingClientRect()
    const l = pos[0]
    const t = pos[1]

    const px = Math.abs(Math.floor((100 / width) * l) - 100)
    const py = Math.abs(Math.floor((100 / height) * t) - 100)
    const pa = (50 - px) + (50 - py)

    const lp = 50 + (px - 50) / 1.5
    const tp = 50 + (py - 50) / 1.5
    const px_spark = 50 + (px - 50) / 7
    const py_spark = 50 + (py - 50) / 7
    const p_opc = 20 + Math.abs(pa) * 1.5
    const ty = (tp - 50) / 2 * -1
    const tx = (lp - 50) / 1.5 * 0.5

    setCardStyle({
      transform: `rotateX(${ty}deg) rotateY(${tx}deg)`,
      backgroundPosition: `${lp}% ${tp}%`,
      backgroundPositionSpark: `${px_spark}% ${py_spark}%`,
      opacity: p_opc / 100,
    })
  }

  const handleMouseOut = () => {
    setCardStyle({})
  }

  const handleTouchEnd = () => {
    setCardStyle({})
  }

  function addToBinder() {
    if (selectedBinderId && clickedCard) {
      fetch(`http://localhost:3000/api/v1/users/${userData.id}/binders/${selectedBinderId}/binder_cards`, { 
        method: "POST", 
        headers: {
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
          name: clickedCard.data.name, 
          image_url: clickedCard.data.images.small, 
          category: 0
        })
      })
      .then(response => response.json())
      .catch(error => console.error("Error adding card to binder:", error))
    }
  }

  if (clickedCard) {
    return (
      <section className="PokeDetails">
        <header>
          <h1 className="PokeName">{clickedCard.data.name}</h1>
        </header>
        <div
          className="PokeDetailCard"
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
          <img className="PokeImg" src={clickedCard.data.images.small} alt={clickedCard.data.name} />
        </div>
        <div className="below">
        <label className="PokeLabel">Users Binders:   
          <select 
            name="selected binder"
            onChange={event => setSelectedBinderId(String(event.target.value))}
            value={selectedBinderId}
          >
            {allBinders}
          </select>
        </label>
        <button className="add" onClick={addToBinder}>Add To Binder</button>
        <Link className="back" to="/pokemon_search"><button>Back</button></Link>
        </div>
      </section>
    )
  }

  return null
}

export default PokeDetailView