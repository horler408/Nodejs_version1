import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/landingPage/LandingPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import CreateNote from './pages/CreateNote/CreateNote';
import SingleNote from './pages/CreateNote/SingleNote';
import MyNotes from './pages/myNotes/MyNotes';
import Header from './components/Header';
import Logout from './pages/Logout/Logout';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// const MyNotes = React.lazy(() => import('./pages/myNotes/MyNotes'));
// const LandingPage = React.lazy(() => import('./pages/landingPage/LandingPage'));

function App() {
  const [search, setSearch] = useState('');
  console.log(search);
  return (
    <Router>
      <Header setSearch={setSearch} />
      <main className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/register" element={<RegisterPage exact />} />
          <Route path="/login" element={<LoginPage exact />} />
          <Route path="/logout" element={<Logout exact />} />
          <Route path="/createnote" element={<CreateNote />} exact />
          <Route path="/note/:id" element={<SingleNote />} exact />
          <Route path="/mynotes" element={<MyNotes search={search} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
