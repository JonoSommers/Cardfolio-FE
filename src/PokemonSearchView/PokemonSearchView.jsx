import "./PokemonSearchView.css"

function PokemonSearchView({p_card_image_path}) {
    return (
        <section>
            <img src={ p_card_image_path } alt="Card Image" />
        </section>
    )
}

export default PokemonSearchView