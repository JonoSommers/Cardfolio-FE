import { Link } from 'react-router-dom'
import "./MTGCardsContainer.css";

function MTGCardsContainer({ id, m_card_path, m_card_name }) {
    return (
        <section className='CardsContainer'> 
            <div className="card">
                <Link to={`/mtg_search/${id}`}>
                    <img src={m_card_path} alt={m_card_name} />
                </Link>
            </div>
        </section>
    );
}

export default MTGCardsContainer