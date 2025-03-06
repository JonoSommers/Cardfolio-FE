import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function PokeDetailView({userData}) {
    const clickedCardId = useParams().cardId
    const [clickedCard, setClickedCard] = useState()
    const [selectedBinderId, setSelectedBinderId] = useState(0)
    const [message, setMessage] = useState("")

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
        fetch(`https://api.pokemontcg.io/v2/cards/${clickedCardId}`)
        .then(response => response.json())
        .then(data => {
            setClickedCard(data)
        })
        .catch(error => console.log('message: ', error.message))
    }

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
            name: clickedCard.data.name, 
            image_url: clickedCard.data.images.small, 
            category: 0})
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.data) {
            setMessage(`${clickedCard.data.name} has been added to your binder!`);
          } else {
            setMessage(data.error.message);
          }
        })
        .catch((error) => {
          console.error("Error adding card to binder:", error);
          setMessage("Error adding card to binder.");
        });
      }
    };

    if(clickedCard) {
        return (
            <section>
				<header>
				    <h1>{clickedCard.data.name}</h1>
				</header>
                <img src= { clickedCard.data.images.small } alt= { clickedCard.data.name } />
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
                {message && <p className="confirmation-message">{message}</p>}
                <Link to={"/pokemon_search"}><button>Back</button></Link>
            </section>
        )
    }
}

export default PokeDetailView
