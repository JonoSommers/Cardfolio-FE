import { Routes, Route} from 'react-router-dom'
import './App.css';
import LoginView from './LoginView/LoginView.jsx'
import HomePageView from './HomePageView/HomePageView.jsx';
import PokemonSearchView from './PokemonSearchView/PokemonSearchView.jsx';
import MTGSearchView from './MTGSearchView/MTGSearchView.jsx';
import PokemonDetailView from './PokemonDetailView/PokemonDetailView.jsx'
import MTGDetailView from './MTGDetailView/MTGDetailView.jsx';

function App() {
    return (
        <div className="App">
            <section className="Snorlax">
                <Routes>
                    <Route path="/" element={<LoginView />} />
                    <Route path="/:username" element={<HomePageView />} />
                    <Route path="/pokemon_search" element={<PokemonSearchView />} />
                    <Route path="/mtg_search" element={<MTGSearchView />} />
                    <Route path="/pokemon_search/:cardId" element={<PokemonDetailView />} />
                    <Route path="/mtg_search/:cardId" element={<MTGDetailView />} />
                </Routes>
            </section>
        </div>
    );
}

export default App;
