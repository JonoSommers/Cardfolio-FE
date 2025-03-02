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
                else if (card.imageUrl) {
                    console.log('card: ', card)
                    return (
                        <div key={card.id} className="card">
                            <img src={card.imageUrl} alt={card.name} />
                        </div>
                    );
                }
            })}
        </section>
    );
}

export default CardsContainer;