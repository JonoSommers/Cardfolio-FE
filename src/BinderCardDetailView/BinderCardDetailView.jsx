import { useParams, Link } from 'react-router-dom'
import './BinderCardDetailView.css'

function BinderCardDetailView({ userData }) {
	console.log(userData)
	const cardName = useParams().cardName
	const binderName = useParams().bindername
	const binder = userData.attributes.binders.find(binder => binder.name === binderName);
	const cardImage = binder.binders_cards.find(card => card.data.attributes.card.name === cardName)
	const favoritesPath = `http://localhost:3000/api/v1/users/${userData.id}/binders/${binder.id}/binder_cards/${cardImage.data.id}`

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
				<h1>{cardName}</h1>
			</header>
			<img  src={`${cardImage.data.attributes.card.image_url}`} alt={`${cardImage.data.attributes.card.name}`} />
			<Link to={`/binder/${binderName}`}>
				<button>Back</button>
			</Link>
			<button onClick={() => addToFavorites()}>Add To Favorites</button>
		</section>

		
	)
}

export default BinderCardDetailView