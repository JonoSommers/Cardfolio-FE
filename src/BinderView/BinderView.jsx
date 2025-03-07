import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import homeIcon from '../icons/home.png'
import searchIcon from '../icons/search.png'
import './BinderView.css'

function BinderView({ userData }) {
	const navigate = useNavigate();
	const [search, setSearch] = useState('')
	const [showInput, setShowInput] = useState(false);
	const [newName, setNewName] = useState("")
	const userName = userData.attributes.username
  	const binderName = useParams().bindername
 	const binder = userData.attributes.binders.find(binder => binder.name === binderName);
	const filteredCards = binder.binders_cards.filter((card) => (
		card.data.attributes.card.name.toLowerCase().startsWith(search.toLowerCase())
	))

	const searchCards = filteredCards.map((card) => {
    return (
      <section className="card">
				<Link to={`/binder/${card.data.attributes.binder.name}/${card.data.attributes.card.name}`}>
      		<img src={`${card.data.attributes.card.image_url}`} alt={`${card.data.attributes.card.name}`} />
				</Link>
      </section>
    )
	})
	

	function renameBinder() {
		fetch(`http://localhost:3000/api/v1/users/${userData.id}/binders/${binder.id}`,{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				binder_name: newName
			}),
		})
		.then((response) => response.json())
	}


	const handleRename = (event) => {
		event.preventDefault();
		renameBinder()
		setShowInput(!showInput)
		navigate(`/${userData.attributes.name}`)
	  };

  return (
    <section className="binderView">
        <div className="top">
            <Link to={`/${userName}`}>
					<img className="homeIcon" src={homeIcon} alt="home icon" />
				</Link>
				<h1 className="binderName">{binderName}</h1>
				<button onClick={() => setShowInput(!showInput)} className="renameButton">Rename Binder</button>
				{showInput && (
					<form onSubmit={handleRename}>
						<input 
						type="text"
						placeholder='New Name'
						className='newBinderName'
						value={newName}
						onChange={(event) => setNewName(event.target.value)}/>
						<button type="submit" >Submit</button>
					</form>
				)}
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