import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/landingPage/LandingPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/profilePage/ProfilePage';
import CreateNote from './pages/notes/CreateNote';
import SingleNote from './pages/notes/SingleNote';
import MyNotes from './pages/notes/MyNotes';
import CreateProduct from './pages/products/CreateProductPage';
import SingleProduct from './pages/products/SingleProductPage';
import Products from './pages/products/ProductsPage';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// const MyNotes = React.lazy(() => import('./pages/myNotes/MyNotes'));
// const LandingPage = React.lazy(() => import('./pages/landingPage/LandingPage'));

function App() {
  const [search, setSearch] = useState('');

  return (
    <Router>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/createnote" element={<CreateNote />} />
          <Route path="/note/:id" element={<SingleNote />} />
          <Route path="/mynotes" element={<MyNotes search={search} />} />
          <Route path="/createproduct" element={<CreateProduct />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/products" element={<Products search={search} />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
