import { Routes, Route} from 'react-router-dom'
import './App.css';
import LoginView from './LoginView.jsx'
import HomePageView from './HomePageView.jsx';

function App() {
    return (
        <div className="App">
            <section className="Snorlax">
                <Routes>
                    <Route path="/" element={<LoginView />} />
                    <Route path="/:username" element={<HomePageView />} />
                </Routes>
            </section>
        </div>
    );
}

export default App;
