import { useParams } from 'react-router-dom'
import "./HomePageView.css"

function HomePageView() {
  const displayName = useParams().username

  return( 
    <div>
      <h1>{displayName}</h1>
    </div>
  )   
}

export default HomePageView;