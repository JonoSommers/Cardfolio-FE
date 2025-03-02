import "./CardsContainer.css"
import PokemonSearchView from "../PokemonSearchView/PokemonSearchView"
// import MTGSearchView from "../MTGSearchView/MTGSearchView"


function CardsContainer( { cards }) {
    const sortedCards = cards.map((card, index) => {
        if (card.supertype === 'Pokémon') {
            return (
                < PokemonSearchView
                    key = { index }
                    p_card_image_path = { card.images.small }
                    p_card_name = { card.name }
                />
            )
        }
        // else if (!card.data.includes('supertype')) {
        //     return (
        //         < MTGSearchView
        //             m_card_key = { index }
        //             m_card_image_path = { card.image_url}
        //             m_card_name = { card.name }
        //         />
        //     )
        // }
    })
    return (
        <section className='CardsContainer'>
            { sortedCards }
        </section>
    )
}

export default CardsContainer