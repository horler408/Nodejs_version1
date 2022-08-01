import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/landingPage/LandingPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import CreateNote from './pages/CreateNote/CreateNote';
import MyNotes from './pages/myNotes/MyNotes';
import Header from './components/Header';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// const MyNotes = React.lazy(() => import('./pages/myNotes/MyNotes'));
// const LandingPage = React.lazy(() => import('./pages/landingPage/LandingPage'));

function App() {
  // const [search setSearch] = useState('')
  return (
    <Router>
      <Header />
      <main className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/register" element={<RegisterPage exact />} />
          <Route path="/login" element={<LoginPage exact />} />
          <Route path="/createnote" element={<CreateNote />} exact />
          <Route path="/notes" element={() => <MyNotes />} exact />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
