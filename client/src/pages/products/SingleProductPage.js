import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Rating from '../../components/Rating';

const SingleProductPage = ({ product, key }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cartItems);
  const { cart } = cartItems;

  return (
    <div className="products">
      <Card>
        <Link to={`/product/detail/${key}`}>
          <Card.Img
            variant="top"
            className="product-image"
            src={product.imageUrl}
            alt={product.name}
          />
        </Link>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            <span>NGN {product.price}</span>
            {product.expressDelivery ? (
              <div>Express Delivery</div>
            ) : (
              <div>7 days delivery</div>
            )}
            <Rating rating={product.ratings} />
          </Card.Subtitle>
          {cart.some((p) => p.id === product.id) ? (
            <Button
              variant="danger"
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
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProductPage;
