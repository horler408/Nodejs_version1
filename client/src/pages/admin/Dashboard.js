import React, { useEffect } from 'react';
import { Button, Card, Col, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../components/Loading';
import InfoMessage from '../../components/InfoMessage';
import MainPage from '../../components/MainPage';
import { userListAction, userDeleteAction } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';
import {
  productDeleteAction,
  productListAction,
} from '../../actions/productActions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { users, loading, error } = userList;

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(productDeleteAction(id));
    }
    navigate('/admin/dashboard');
  };

  useEffect(() => {
    if (!userInfo && !userInfo?.isAdmin) {
      navigate('/login', {
        state: { message: 'You are not authorized to access that page' },
      });
    }
    dispatch(userListAction());
    dispatch(productListAction());
  }, [dispatch, navigate, userInfo]);

  return (
    <MainPage title="Dashboard" style={{}}>
      {loading && <Loading />}
      {error && <InfoMessage>{error}</InfoMessage>}
      <Row>
        <h3>Product Section</h3>
        {products && (
          <h2 style={{ textAlign: 'center' }}>
            Total products: {products.length}
          </h2>
        )}
        {products &&
          products.map((product) => (
            <Col key={product._id}>
              <Card className="admin-item">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  className="admin-item-img"
                />
                <div className="admin-item-details">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Body>
                    <p>NGN {product.price}</p>
                    <p>{product.category}</p>
                    <p>{product.inStock}</p>
                  </Card.Body>
                </div>
                <div>
                  <Button href={`/product/update/${product._id}`}>Edit</Button>
                  <Button
                    variant="danger"
                    className="mx-2 my-2"
                    onClick={() => deleteHandler(product._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
      </Row>
      <hr />
      <Row>
        <h3>User Section</h3>
        {users && (
          <h2 style={{ textAlign: 'center' }}>Total users: {users.length}</h2>
        )}
        {users &&
          users.map((user) => (
            <Col key={user._id}>
              <Card className="admin-item">
                <Image
                  src={user.imageUrl}
                  alt={user.name}
                  className="admin-item-img"
                />
                <div className="admin-item-details">
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Body>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                  </Card.Body>
                </div>
                <div>
                  <Button href={`/product/update/${user._id}`}>Edit</Button>
                  <Button
                    variant="danger"
                    className="mx-2 my-2"
                    onClick={() => deleteHandler(user._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
      </Row>
    </MainPage>
  );
};

export default Dashboard;
