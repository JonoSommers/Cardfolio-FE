import { useParams } from 'react-router-dom'
import './BinderView.css'

function BinderView({ userData }) {
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
    <section className="BinderView">
      {/* <h1>{binderName}</h1> */}
				{binderCards}
    </section>
  )
}

export default BinderView