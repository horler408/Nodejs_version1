import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ErrorPage from './components/ErrorPage';
import LandingPage from './pages/landingPage/LandingPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/profilePage/ProfilePage';
import CreateNote from './pages/notes/CreateNote';

import SingleNote from './pages/notes/SingleNote';
import Cart from './pages/products/Cart';
import MyNotes from './pages/notes/MyNotes';
import CreateProduct from './pages/products/CreateProductPage';
import UpdateProduct from './pages/products/UpdateProductPage';
import AdminProductPage from './pages/admin/AdminProductPage';
import SingleProduct from './pages/products/SingleProductPage';
import ProductDetailPage from './pages/products/ProductDetailPage';
import Products from './pages/products/ProductsPage';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkout from './pages/products/Checkout';
// const MyNotes = React.lazy(() => import('./pages/myNotes/MyNotes'));
// const LandingPage = React.lazy(() => import('./pages/landingPage/LandingPage'));
import TestProduct from './pages/products/TestProduct';

function App() {
  const [search, setSearch] = useState('');

  return (
    <Router>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route path="/*" element={<ErrorPage />} />
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/createnote" element={<CreateNote />} />
          <Route path="/note/:id" element={<SingleNote />} />
          <Route path="/mynotes" element={<MyNotes search={search} />} />

          <Route path="/product/create" element={<CreateProduct />} />
          <Route path="/product/update/:id" element={<UpdateProduct />} />
          <Route path="/product/admin" element={<AdminProductPage />} />
          <Route path="/test" element={<TestProduct />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/product/cart" element={<Cart />} />
          <Route path="/product/checkout" element={<Checkout />} />
          <Route path="/product/detail/:id" element={<ProductDetailPage />} />
          <Route path="/products" element={<Products search={search} />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
