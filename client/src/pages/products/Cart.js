import React, { useEffect, useState } from 'react';
import { Button, Col, Form, ListGroup, Row, Image } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Rating from '../../components/Rating';

const Cart = () => {
  const [total, setTotal] = useState(0.0);
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cartItems);
  const { cart } = cartItems;

  useEffect(() => {
    setTotal(cart.reduce((acc, cur) => acc + Number(cur.price * qty), 0));
  }, [cart, qty]);

  return (
    <div className="home">
      <div className="product-container">
        <ListGroup>
          {cart.map((cartItem) => (
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
                    // onChange={(e) =>
                    //   dispatch({
                    //     type: 'CHANGE_CART_QTY',
                    //     payload: {
                    //       id: cartItem._id,
                    //       qty: e.target.value,
                    //     },
                    //   })
                    // }
                  >
                    {/* {[...Array(cartItem.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))} */}
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
                      dispatch({
                        type: 'REMOVE_FROM_CART',
                        payload: cartItem,
                      })
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
        <span className="product-title">Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>
          Total: NGN {total.toFixed(2)}
        </span>
        <Button type="button" disabled={cart.length === 0}>
          <Link to="/checkout">Proceed to checkout</Link>
        </Button>
      </div>
    </div>
  );
};

export default Cart;
