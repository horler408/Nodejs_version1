import React, { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { productDetailAction } from '../../actions/productActions';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import MainPage from '../../components/MainPage';

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { id } = useParams();

  const productDetail = useSelector((state) => state.productDetail);
  const { loading, error, product } = productDetail;

  useEffect(() => {
    dispatch(productDetailAction(id));
  }, [dispatch, id]);
  return (
    <MainPage title="Product Details">
      <Card>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <FaArrowLeft
          fontSize="20px"
          style={{ cursor: 'pointer' }}
          onClick={() =>navigate('/products')}
        />
        {/* <BsArrowLeftCircle
          fontSize="20px"
          style={{ cursor: 'pointer' }}
          onClick={() =>})
          }
        /> */}
        {product.name}
      </Card>
    </MainPage>
  );
};

export default ProductDetailPage;
