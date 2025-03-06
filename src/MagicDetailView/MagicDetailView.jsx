import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function MagicDetailView({userData}) {
  console.log(userData)
    const clickedCardId = useParams().cardId
    const [clickedCard, setClickedCard] = useState()
    const [selectedBinderId, setSelectedBinderId] = useState(0)

    useEffect(() => {
      if (userData?.attributes?.binders?.length > 0) {
          setSelectedBinderId(String(userData.attributes.binders[0].id));
      }
  }, []);

    const allBinders = userData.attributes.binders.map(binder => {
        return (
            <option key={binder.id} value={binder.id}>
                {binder.name}
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





    function addToBinder() {
      if (selectedBinderId) {
        fetch(`http://localhost:3000/api/v1/users/${userData.id}/binders/${selectedBinderId}/binder_cards`, { 
          method: "POST", 
          headers: {
            "Content-Type": "application/json"
          }, 
          body: JSON.stringify({
            name: clickedCard.name, 
            image_url: clickedCard.imageUrl, 
            category: 1})
        })
        .then(response => response.json())
        .catch(error => console.error("Error adding card to binder:", error))
      }
    };
    

    if(clickedCard) {
        return (
            <section>
		<header>
			<h1>{clickedCard.name}</h1>
		</header>
                <img src= { clickedCard.imageUrl } alt= { clickedCard.name } />
                <label>Users Binders:
                  <select 
                    name="selected binder"
                    onChange={event => setSelectedBinderId(String(event.target.value))}
                    value={selectedBinderId}
                  >
                    {allBinders}
                  </select>
                </label>
                <button onClick={() => addToBinder()}>Add To Binder</button>
                <Link to={"/mtg_search"}><button>Back</button></Link>
            </section>
        )
    }
}

export default MagicDetailView
