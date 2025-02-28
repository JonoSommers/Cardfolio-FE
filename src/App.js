import { Routes, Route } from 'react-router-dom'

import './App.css';
import LoginView from './LoginView.js'

function App() {
  return (
    <div className="App">
      <header>
        <h1>Cardfolio</h1>
      </header>
      <section className="Snorlax">
        <Routes>
          <Route path="/" element={<LoginView />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
