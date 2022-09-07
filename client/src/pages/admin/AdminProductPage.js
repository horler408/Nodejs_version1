import React, { useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  productDeleteAction,
  productListAction,
} from '../../actions/productActions';
import InfoMessage from '../../components/InfoMessage';
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

    // if (!userInfo) {
    //   navigate('/products');
    // }
  }, [dispatch, navigate, userInfo]);
  // console.log(userInfo);

  return (
    <MainPage>
      {error && <InfoMessage variant="danger">{error}</InfoMessage>}
      {loading && <Loading />}
      {products &&
        products.map((product) => (
          <table key={product._id}>
            <th>{product.name}</th>
            <div>
              <Button href={`/product/update/${product._id}`}>Edit</Button>
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
    </MainPage>
  );
};

export default AdminProductPage;
