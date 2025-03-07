import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import homeIcon from '../icons/home.png'
import searchIcon from '../icons/search.png'
import './BinderView.css'

function BinderView({ userData }) {
	const [search, setSearch] = useState('')
	const userName = userData.attributes.username
	const binderName = useParams().bindername
	const binder = userData.attributes.binders.find(binder => binder.name === binderName);
	const filteredCards = binder.binders_cards.filter((card) => (
		card.data.attributes.card.name.toLowerCase().startsWith(search.toLowerCase())
	))

	const searchCards = filteredCards.map((card) => {

    	return (
			<section className="binderCards">
				<Link to={`/binder/${binderName}/${card.data.attributes.card.name}`}>
					<img src={`${card.data.attributes.card.image_url}`} alt={`${card.data.attributes.card.name}`} />
				</Link>
			</section>
    	)
	})

	return (
    <section className="binderView">
        <div className="top">
            <Link to={`/${userName}`}>
				<img className="homeIcon" src={homeIcon} alt="home icon" />
			</Link>
				<h1 className="binderName">{binderName}</h1>
			<img className="searchIcon" src={searchIcon} alt="search icon" /> 
			<input 
				className="searchBar"
				type="text"
				placeholder="Search Name..."
				value={search}
				onChange={(event) => setSearch(event.target.value)}
			/>
                </div>
			<section className="binderCards">
				{searchCards}
			</section>
    </section>
  )
}

export default BinderView