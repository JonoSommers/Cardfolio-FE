import { useParams, Link } from 'react-router-dom'
import './BinderCardDetailView.css'

function BinderCardDetailView({ userData }) {
	console.log(userData)
	const cardName = useParams().cardName
	const binderName = useParams().bindername
	const binder = userData.attributes.binders.find(binder => binder.name === binderName);
	const cardImage = binder.binders_cards.find(card => card.data.attributes.card.name === cardName)
	const favoritesPath = `https://cardfolio-be.onrender.com/api/v1/users/${userData.id}/binders/${binder.id}/binder_cards/${cardImage.data.id}`

	function addToFavorites() {
		fetch(favoritesPath, {
			method: "PATCH"
		})
		.then(response => response.json())
		.then(data => {console.log(data)})
		.catch(error => console.log('message: ', error))
	}
	
	return (
		<section className="view">
			<header>
				<h1 className="detailCardName">{cardName}</h1>
			</header>
			<img className="card" src={`${cardImage.data.attributes.card.image_url}`} alt={`${cardImage.data.attributes.card.name}`}/>
			<Link to={`/binder/${binderName}`}>
				<button className="backToBinder">Back</button>
			</Link>
			<button className="addFave" onClick={() => addToFavorites()}>Add To Favorites</button>
		</section>

		
	)
}

export default BinderCardDetailView