import { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/landingPage/LandingPage';
// const Landing = lazy(()=> import('./components/MainPage'));
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  // const [search setSearch] = useState('')
  return (
    <Router>
      <Header />
      <main className="App">
        <Routes>
          <Route path="/" component={LandingPage} exact />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
