import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { productListAction } from '../../actions/productActions';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import Filters from '../../components/Filters';
import SingleProductPage from './SingleProductPage';

import './styles.css';

const ProductsPage = ({ search }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

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
            .map((product) => (
              <SingleProductPage
                product={product}
                key={product._id}
                // carts={carts}
              />
            ))}
      </div>
    </div>
  );
};

export default ProductsPage;
