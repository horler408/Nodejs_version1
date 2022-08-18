import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import Rating from '../../components/Rating';

const SingleProductPage = ({ product, carts }) => {
  const dispatch = useDispatch();

  // const productList = useSelector((state) => state.productList);
  // const { products } = productList;

  return (
    <div className="products">
      <Card>
        <Card.Img
          variant="top"
          className="product-image"
          src={product.imageUrl}
          alt={product.name}
        />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Subtitle style={{ paddingBottom: 10 }}>
            {/* <span>NGN {product.price.split('.')[0]}</span> */}
            <span>NGN {product.price}</span>
            {product.expressDelivery ? (
              <div>Express Delivery</div>
            ) : (
              <div>7 days delivery</div>
            )}
            <Rating rating={product.ratings} />
          </Card.Subtitle>
          {carts.some((p) => p.id === product.id) ? (
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
