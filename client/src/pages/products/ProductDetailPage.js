import React, { useEffect } from 'react';
import { Col, Row, Image, Button } from 'react-bootstrap';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, NavLink } from 'react-router-dom';

import { productDetailAction } from '../../actions/productActions';
import InfoMessage from '../../components/InfoMessage';
import Loading from '../../components/Loading';
import MainPage from '../../components/MainPage';

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const details = useSelector((state) => state.productDetail);
  const { loading, error, product } = details;

  const cartItems = useSelector((state) => state.cartItems);
  const { cart } = cartItems;

  console.log(product);

  useEffect(() => {
    dispatch(productDetailAction(id));
  }, [dispatch, id]);

  const ShowProductDetails = () => {
    return (
      <Row>
        <Col md={6}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width="400px"
            height="400px"
          />
        </Col>
        <Col md={6}>
          <h4 className="text-uppercase text-black-50">{product.category}</h4>
          <h1 className="display-5">{product.name}</h1>
          <p className="lead fw-bolder">Rating: {product.ratings}</p>
          <h3 className="display-6 fw-bold my-4">$ {product.price}</h3>
          <p className="lead">{product.description}</p>
          {cart.some((p) => p._id === product._id) ? (
            <Button
              variant="danger"
              // className="btn btn-outline-danger px-4 py-2"
              onClick={() =>
                dispatch({
                  type: 'REMOVE_FROM_CART',
                  payload: product,
                })
              }
            >
              Remove from Cart
            </Button>
          ) : (
            <Button
              className="btn btn-outline-dark px-4 py-2"
              onClick={() =>
                dispatch({
                  type: 'ADD_TO_CART',
                  payload: product,
                })
              }
              disabled={!product.inStock}
            >
              {!product.inStock ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          )}
          <NavLink to="/product/cart" className="btn btn-dark ms-2 px-3 py-2">
            Go to Cart
          </NavLink>
        </Col>
      </Row>
    );
  };

  return (
    <MainPage title="Product Details">
      {error && <InfoMessage variant="danger">{error}</InfoMessage>}
      {loading && <Loading />}

      <div className="navigation-arrow shadow-lg">
        <BsArrowLeftCircleFill
          fontSize="50px"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/products')}
        />
      </div>
      {product && <ShowProductDetails />}
    </MainPage>
  );
};

export default ProductDetailPage;
