import { Routes, Route} from 'react-router-dom'
import './App.css';
import Login from './Login/Login.jsx'
import HomePage from './HomePage/HomePage.jsx';
import PokeSearchView from './PokeSearchView/PokeSearchView.jsx';
import MagicSearchView from './MagicSearchView/MagicSearchView.jsx';
import PokeDetailView from './PokeDetailView/PokeDetailView.jsx'
import MagicDetailView from './MagicDetailView/MagicDetailView.jsx';

function App() {
    return (
        <div className="App">
            <section className="Snorlax">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/:username" element={<HomePage />} />
                    <Route path="/pokemon_search" element={<PokeSearchView />} />
                    <Route path="/mtg_search" element={<MagicSearchView />} />
                    <Route path="/pokemon_search/:cardId" element={<PokeDetailView />} />
                    <Route path="/mtg_search/:cardId" element={<MagicDetailView />} />
                </Routes>
            </section>
        </div>
    );
}

export default App;
