import { useParams } from 'react-router-dom'
import "./HomePageView.css"
import SearchComponent from './SearchComponent.jsx'

function HomePageView() {
  const displayName = useParams().username

  return( 
    <div>
      <h1>{displayName}</h1>
      <SearchComponent />
    </div>
  )   
}

export default HomePageView;