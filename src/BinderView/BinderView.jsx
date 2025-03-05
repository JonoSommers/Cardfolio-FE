import { useParams } from 'react-router-dom'
import './BinderView.css'

function BinderView({userData}) {
    const binderName = useParams().bindername
    const binder = userData.attributes.binders.find((binder) => {
        binder.name === binderName
    })

    
    if (binder) {
        binder.binder_cards.map((card) => {
            console.log('card: ', card)
            return (
                <section>
                    <h1>{binderName}</h1>
                    <img src={`${card.data.attributes.binder.card.image_url}`} alt={`${card.data.attributes.binder.card.name}`} />
                </section>
            )
        })
    }
}

export default BinderView