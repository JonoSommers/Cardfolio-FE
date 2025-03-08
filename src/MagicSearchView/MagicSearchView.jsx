import { useParams, Link } from 'react-router-dom'
import React, { useState } from 'react';
import "./MagicSearchView.css";

function MagicSearchView({ id, m_card_path, m_card_name }) {
    const magicId = useParams().cardId
    const [cardStyle, setCardStyle] = useState({});
    const handleMouseMove = (e) => {
        const pos = [e.nativeEvent.offsetX, e.nativeEvent.offsetY];
        const card = e.currentTarget;
        const l = pos[0];
        const t = pos[1];
        const h = card.offsetHeight;
        const w = card.offsetWidth;
        const px = Math.abs(Math.floor((100 / w) * l) - 100);
        const py = Math.abs(Math.floor((100 / h) * t) - 100);
        const pa = (50 - px) + (50 - py);

        const lp = 50 + (px - 50) / 1.5;
        const tp = 50 + (py - 50) / 1.5;
        const px_spark = 50 + (px - 50) / 7;
        const py_spark = 50 + (py - 50) / 7;
        const p_opc = 20 + Math.abs(pa) * 1.5;

        const ty = ((tp - 50) / 2) * -1;
        const tx = ((lp - 50) / 1.5) * 0.5;

        const grad_pos = `background-position: ${lp}% ${tp}%`;
        const sprk_pos = `background-position: ${px_spark}% ${py_spark}%`;
        const opacity = `opacity: ${p_opc / 100}`;
        const transform = `transform: rotateX(${ty}deg) rotateY(${tx}deg)`;

        setCardStyle({
            gradPos: grad_pos,
            sprkPos: sprk_pos,
            opacity: opacity,
            transform: transform,
        });
    };

    const handleMouseOut = () => {
        setCardStyle({});
    };

    return (
        <section className='MagicSearchView'> 
                <Link to={`/mtg_search/${magicId}`} className="card-link">
                <div
                    className="MTGcard"
                    onMouseMove={handleMouseMove}
                    onMouseOut={handleMouseOut}
                    style={cardStyle} 
                >
                    <img src={m_card_path} alt={m_card_name} />
                </div>
                </Link>
        </section>
    );
}

export default MagicSearchView