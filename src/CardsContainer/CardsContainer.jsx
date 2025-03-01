import "./CardsContainer.css"
import PokemonSearchView from "../../PokemonSearchView"
import MTGSearchView from "../MTGSearchView/MTGSearchView"

function CardsContainer( { cards }) {
    const sortedCards = cards.map(card => {
        if (card.data.supertype === 'Pokémon') {
            return (
                < PokemonSearchView
                    p_card_image_path = { card.data.images.large}
                    p_card_name = { card.data.name }
                    p_card_category = { card.card_category }
                />
            )
        }
        else {
            return (
                < MTGSearchView
                    m_card_image_path = { card.image_url}
                    m_card_name = { card.name }
                    m_card_category = { card.card_category }
                />
            )
        }
    })
    return (
        <section className='CardsContainer'>
            { sortedCards }
        </section>
    )
}

export default CardsContainer