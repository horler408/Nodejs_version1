import React, { useEffect, useState } from 'react';
import { Col, Row, Image, Button } from 'react-bootstrap';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, NavLink } from 'react-router-dom';

import { productDetailAction } from '../../actions/productActions';
import {
  getCartItemAction,
  addToCartAction,
  removeFromCartAction,
} from '../../actions/cartActions';
import InfoMessage from '../../components/InfoMessage';
import Loading from '../../components/Loading';
import MainPage from '../../components/MainPage';

const ProductDetailPage = () => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userId = userInfo?._id;

  const details = useSelector((state) => state.productDetail);
  const { loading, error, product } = details;

  const addCart = useSelector((state) => state.addCartItem);
  const { success: addCartSuccess, loading: addCartLoading } = addCart;

  const removeCart = useSelector((state) => state.removeCartItem);
  const {
    success: removeCartSuccess,
    loading: removeCartLoading,
    error: removeCartError,
  } = removeCart;

  const getCartItems = useSelector((state) => state.getCartItems);
  const { cartItems } = getCartItems;
  console.log(cartItems);
  console.log(product);

  useEffect(() => {
    dispatch(productDetailAction(id));
    dispatch(getCartItemAction(userId));
  }, [dispatch, id, userId, addCartSuccess, removeCartSuccess]);

  const addToCartHandler = (userId, productId, qty) => {
    if (!userInfo) {
      navigate('/login', { state: { message: 'Please login to add to cart' } });
    }
    dispatch(addToCartAction(userId, productId, qty));
  };

  const ShowProductDetails = () => {
    return (
      <Row>
        <Col lg={6}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width="400px"
            height="400px"
          />
        </Col>
        <Col lg={6}>
          <h4 className="text-uppercase text-black-50">{product.category}</h4>
          <h1 className="display-5">{product.name}</h1>
          <p className="lead fw-bolder">Rating: {product.ratings}</p>
          <h3 className="display-6 fw-bold my-4">$ {product.price}</h3>
          <p className="lead">{product.description}</p>
          {cartItems?.some((p) => p.productId === product._id) ? (
            <Button
              variant="danger"
              // className="btn btn-outline-danger px-4 py-2"
              onClick={() =>
                dispatch(removeFromCartAction(userId, product._id))
              }
            >
              Remove from cart
            </Button>
          ) : (
            <Button
              className="btn btn-outline-dark px-4 py-2"
              onClick={addToCartHandler(userId, product._id, qty)}
              disabled={!product.inStock}
            >
              {!product.inStock ? 'Out of Stock' : 'Add to cart'}
            </Button>
          )}
          <Button
            className="btn btn-outline-white mx-4 px-4 py-2"
            disabled={!cartItems || cartItems.length === 0}
          >
            <NavLink to="/product/cart">Go to cart</NavLink>
          </Button>
        </Col>
      </Row>
    );
  };

  return (
    <MainPage title="Product Details">
      {error && <InfoMessage variant="danger">{error}</InfoMessage>}
      {removeCartError && (
        <InfoMessage variant="danger">{removeCartError}</InfoMessage>
      )}
      {loading && <Loading />}
      {addCartLoading && <Loading />}
      {removeCartLoading && <Loading />}

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
