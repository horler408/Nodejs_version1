import React from 'react';
import { Card } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

import Rating from '../../components/Rating';

const SingleProductPage = ({ product }) => {
  // const cartItems = useSelector((state) => state.cartItems);
  // const { cart } = cartItems;
  const id = product._id;

  return (
    <div className="products">
      <Card>
        <Link to={`/product/detail/${id}`}>
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
          <NavLink
            to={`/product/detail/${id}`}
            className="btn btn-outline-primary"
          >
            Buy Now
          </NavLink>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SingleProductPage;
