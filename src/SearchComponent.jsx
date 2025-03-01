import "./SearchComponent.css"

const fetchPokemonCards = 'https://api.pokemontcg.io/v2/cards/'
const fetchMTGCards = 'https://api.magicthegathering.io/v1/cards'

function getPokemonCards() {
    fetch(fetchPokemonCards, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('data: ', data)
    })
    .catch(error => console.log('message: ', error.message))
}

function getMTGCards() {
    fetch(fetchMTGCards, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('data: ', data)
    })
    .catch(error => console.log('message: ', error.message))
}

function SearchComponent() {
    return (
        <div>
            <button onClick={() => getPokemonCards()}> Pokemon</button>
            <button onClick={() => getMTGCards()}>MTG</button>
        </div>
    )
}

export default SearchComponent