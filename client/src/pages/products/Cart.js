import React, { useEffect, useState } from 'react';
import { Button, Col, Form, ListGroup, Row, Image } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Rating from '../../components/Rating';
import {
  removeFromCartAction,
  getCartItemAction,
} from '../../actions/cartActions';
import Loading from '../../components/Loading';
import InfoMessage from '../../components/InfoMessage';

const Cart = () => {
  window.scrollTo(0, 0);

  // const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const [total, setTotal] = useState(0.0);
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userId = userInfo._id;
  // console.log(userId);

  // const carts = useSelector((state) => state.cartItems);
  // const { cart, loading, error } = carts;
  const getCartItems = useSelector((state) => state.getCartItems);
  const { cartItems, loading, error } = getCartItems;

  useEffect(() => {
    dispatch(getCartItemAction(userId));
    if (!userInfo) {
      navigate('/login');
    }
    setTotal(
      cartItems &&
        cartItems
          .reduce((acc, cur) => acc + Number(cur.price * qty), 0)
          .toFixed(2)
    );
  }, [cartItems, qty, userInfo, userId, navigate, dispatch]);

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  return (
    <div className="home">
      <div className="product-container">
        {loading && <Loading />}
        {error & <InfoMessage variant="danger">{error}</InfoMessage>}
        <ListGroup>
          {cartItems &&
            cartItems.map((cartItem) => (
              <ListGroup.Item key={cartItem._id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={cartItem.imageUrl}
                      alt={cartItem.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={2}>
                    <span>{cartItem.name}</span>
                  </Col>
                  <Col md={2}>NGN {cartItem.price}</Col>
                  <Col md={2}>
                    <Rating rating={cartItem.ratings} />
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() =>
                        dispatch(removeFromCartAction(userId, cartItem._id))
                      }
                    >
                      <AiFillDelete fontSize="20px" />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="product-title">
          Subtotal ({cartItems && cartItems.length}) items
        </span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>
          Total: NGN {total}
        </span>
        <Button type="button" disabled={total === 0}>
          <Link to="/checkout">Proceed to checkout</Link>
        </Button>
      </div>
    </div>
  );
};

export default Cart;
