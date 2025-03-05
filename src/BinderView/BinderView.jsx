import { useParams, Link } from 'react-router-dom'
import homeIcon from '../icons/home.png'
import './BinderView.css'

function BinderView({ userData }) {
	const userName = userData.attributes.username
  const binderName = useParams().bindername
  const binder = userData.attributes.binders.find(binder => binder.name === binderName);
  
  const binderCards = binder.binders_cards.map((card) => {
    return (
      <section className="card">
        <img src={`${card.data.attributes.card.image_url}`} alt={`${card.data.attributes.card.name}`} />
      </section>
    )
  })

  return (
    <section>
			<header>
				<h1>{binderName}</h1>
				<Link to={`/${userName}`}>
					<img className="homeIcon" src={homeIcon} alt="homeicon" />
				</Link>
			</header>
			<section className="BinderView">
				{binderCards}
			</section>
    </section>
  )
}

export default BinderView