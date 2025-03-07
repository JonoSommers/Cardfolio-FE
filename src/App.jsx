import { Routes, Route} from 'react-router-dom'
import { useState } from 'react'
import './App.css';
import Login from './Login/Login.jsx'
import HomePage from './HomePage/HomePage.jsx';
import PokeCardsContainer from './PokeCardsContainer/PokeCardsContainer.jsx';
import MagicCardsContainer from './MagicCardsContainer/MagicCardsContainer.jsx'
import PokeDetailView from './PokeDetailView/PokeDetailView.jsx'
import MagicDetailView from './MagicDetailView/MagicDetailView.jsx';
import BinderView from './BinderView/BinderView.jsx';
import BinderCardDetailView from './BinderCardDetailView/BinderCardDetailView.jsx'
import CreateBinder from './CreateBinder/CreateBinder.jsx'

function App() {
    const [userData, setUserData] = useState([])
    return (
        <div className="App">
            <section className="Snorlax">
                <Routes>
                    <Route path="/" element={<Login setUserData={setUserData} />} />
                    <Route path="/:username" element={<HomePage setUserData={setUserData} userData={userData} />}/>
                    <Route path="/pokemon_search" element={<PokeCardsContainer />} />
                    <Route path="/mtg_search" element={<MagicCardsContainer />} />
                    <Route path="/pokemon_search/:cardId" element={<PokeDetailView userData={userData}/>} />
                    <Route path="/mtg_search/:cardId" element={<MagicDetailView userData={userData}/>} />
                    <Route path="/binder/:bindername" element={<BinderView  userData={userData} />} />
				    <Route path="/binder/:bindername/:cardName" element={<BinderCardDetailView userData={userData} />} />
                    <Route path="/createbinder" element={<CreateBinder userData={userData} setUserData={setUserData}/>} />
                </Routes>
            </section>
        </div>
    );
}

export default App;
