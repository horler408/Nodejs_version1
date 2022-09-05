import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { productListAction } from '../../actions/productActions';
import Loading from '../../components/Loading';
import InfoMessage from '../../components/InfoMessage';
import Filters from '../../components/Filters';
import SingleProductPage from './SingleProductPage';

import './styles.css';

const ProductsPage = ({ search }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { products, error, loading } = productList;

  console.log(products);

  const productState = useSelector((state) => state.productFilter);
  const { byStock, byExpressDelivery, sort, byRating, searchQuery } =
    productState;

  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === 'lowToHigh' ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((product) => product.inStock);
    }

    if (byExpressDelivery) {
      sortedProducts = sortedProducts.filter(
        (product) => product.expressDelivery
      );
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (product) => product.ratings >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
    <div className="home">
      <Filters />
      {error && <InfoMessage variant="danger">{error}</InfoMessage>}
      {loading && <Loading />}
      <div className="product-container">
        {products &&
          transformProducts()
            .filter((filteredProduct) =>
              filteredProduct.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((product) => (
              <SingleProductPage product={product} key={product._id} />
            ))}
      </div>
    </div>
  );
};

export default ProductsPage;
