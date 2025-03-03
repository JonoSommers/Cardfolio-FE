import { Link } from 'react-router-dom'
import "./PokeSearchView.css";

function PokeSearchView({ id, p_card_path, p_card_name }) {
    return (
        <section className='CardsContainer'>
            <div className="card">
                <Link to={`/pokemon_search/${id}`}>
                    <img src={p_card_path} alt={p_card_name} />
                </Link>
            </div>
        </section>
    );
}

export default PokeSearchView;