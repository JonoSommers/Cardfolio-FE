import { Routes, Route} from 'react-router-dom'
import './App.css';
import LoginView from './LoginView/LoginView.jsx'
import HomePageView from './HomePageView/HomePageView.jsx';
import PokemonSearchView from './PokemonSearchView/PokemonSearchView.jsx';
import MTGSearchView from './MTGSearchView/MTGSearchView.jsx';

function App() {
    return (
        <div className="App">
            <section className="Snorlax">
                <Routes>
                    <Route path="/" element={<LoginView />} />
                    <Route path="/:username" element={<HomePageView />} />
                    <Route path="/pokemon_search" element={<PokemonSearchView />} />
                    <Route path="/mtg_search" element={<MTGSearchView />} />
                </Routes>
            </section>
        </div>
    );
}

export default App;
