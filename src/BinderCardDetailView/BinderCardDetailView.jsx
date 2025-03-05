import { useParams } from 'react-router-dom'

function BinderCardDetailView({ userData }) {
	console.log(userData)
	const cardName = useParams().cardName
	const binderName = useParams().bindername
	const binder = userData.attributes.binders.find(binder => binder.name === binderName);
	const cardImage = binder.binders_cards.find(card => card.data.attributes.card.name === cardName)

	return (
		<section>
			<header>
				<h1>{cardName}</h1>
			</header>
			<img src={`${cardImage.data.attributes.card.image_url}`} alt={`${cardImage.data.attributes.card.name}`} />
		</section>

		
	)
}

export default BinderCardDetailView