import "./CardsContainer.css";

function CardsContainer({ cards }) {
    return (
        <section className='CardsContainer'>
            {cards.map((card) => {
                if (card.supertype === 'Pokémon') {
                    return (
                        <div key={card.id} className="card">
                            <img src={card.images.small} alt={card.name} />
                        </div>
                    );
                }
                if (card.supertype === 'Magic') {
                    return (
                        <div key={card.id} className="card">
                            <img src={card.image_url} alt={card.name} />
                        </div>
                    );
                }
            })}
        </section>
    );
}

export default CardsContainer;