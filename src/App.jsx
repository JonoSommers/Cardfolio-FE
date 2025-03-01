import { Routes, Route} from 'react-router-dom'
import './App.css';
import LoginView from './LoginView/LoginView.jsx'
import HomePageView from './HomePageView/HomePageView.jsx';
import PokemonSearchView from './PokemonSearchView/PokemonSearchView.jsx';

function App() {
    return (
        <div className="App">
            <section className="Snorlax">
                <Routes>
                    <Route path="/" element={<LoginView />} />
                    <Route path="/:username" element={<HomePageView />} />
                    <Route path="/pokemon_search" element={<PokemonSearchView />} />
                </Routes>
            </section>
        </div>
    );
}

export default App;
