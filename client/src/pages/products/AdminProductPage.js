import React, { useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  productDeleteAction,
  productListAction,
} from '../../actions/productActions';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import MainPage from '../../components/MainPage';

const AdminProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(productDeleteAction(id));
    }
    // navigate('/mynotes');
  };

  useEffect(() => {
    dispatch(productListAction());

    if (!userInfo && !userInfo.isAdmin) {
      navigate('/products');
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <MainPage>
      <Card>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        {products.map((product) => (
          <table key={product._id}>
            <th>{product.name}</th>
            <div>
              <Button href={`/product/${product._id}`}>Edit</Button>
              <Button
                variant="danger"
                className="mx-2"
                onClick={() => deleteHandler(product._id)}
              >
                Delete
              </Button>
            </div>
          </table>
        ))}
      </Card>
    </MainPage>
  );
};

export default AdminProductPage;
