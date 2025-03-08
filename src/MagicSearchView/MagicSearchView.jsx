import { Link } from 'react-router-dom'
import "./MagicSearchView.css";

function MagicSearchView({ id, m_card_path, m_card_name }) {
    return (
        <section className='CardsContainer'> 
            <Link to={`/mtg_search/${id}`}>
                <div className="card">
                    <img src={m_card_path} alt={m_card_name} />
                </div>
            </Link>
        </section>
    );
}

export default MagicSearchView