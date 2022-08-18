import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { productListAction } from '../../actions/productActions';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import Filters from '../../components/Filters';
import SingleProductPage from './SingleProductPage';

import './styles.css';

const ProductsPage = ({ search }) => {
  const [carts] = useState([]);

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  // const cartItems = useSelector((state) => state.cartItems);
  // const { cart } = cartItems;

  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);

  return (
    <div className="home">
      <Filters />
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <div className="product-container">
        {products &&
          products
            .filter((filteredProduct) =>
              filteredProduct.name.toLowerCase().includes(search.toLowerCase())
            )
            .reverse()
            .map((product) => (
              <SingleProductPage
                product={product}
                key={product.id}
                carts={carts}
              />
            ))}
      </div>
    </div>
  );
};

export default ProductsPage;
