import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import MainPage from '../../components/MainPage';
import {
  productUpdateAction,
  productDeleteAction,
} from '../../actions/productActions';
import Loading from '../../components/Loading';
import InfoMessage from '../../components/InfoMessage';
import ReactMarkdown from 'react-markdown';

function UpdateProductPage() {
  const [flag, setFlag] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [ratings, setRatings] = useState(0);
  const [express, setExpress] = useState(false);
  const [inStock, setInStock] = useState(false);
  const [picMessage, setPicMessage] = useState('');
  const [pic, setPic] = useState(
    'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const postDetails = (pics) => {
    if (
      pics ===
      'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
    ) {
      return setPicMessage('Please Select an Image');
    }
    setPicMessage(null);
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'notestutorial');
      data.append('cloud_name', 'horlertech');
      fetch('https://api.cloudinary.com/v1_1/horlertech/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage('Please Select an Image');
    }
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading, error, success } = productUpdate;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete } = productDelete;

  const resetHandler = () => {
    setName('');
    setDescription('');
    setCategory('');
    setPrice('');
    setRatings(0);
    setInStock(false);
    setExpress(false);
  };

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(productDeleteAction(id));
    }
    navigate('/products');
  };

  const updateHandler = (e) => {
    e.preventDefault();
    setFlag(false);
    if (!userInfo) {
      navigate('/');
    }

    if (!name || !ratings || !description || !category) return;
    dispatch(
      productUpdateAction(
        name,
        description,
        category,
        price,
        inStock,
        express,
        ratings,
        pic
      )
    );

    resetHandler();
    navigate('/products');
    setFlag(true);
  };

  useEffect(() => {
    if (!userInfo && !userInfo?.isAdmin) {
      navigate('/');
    }

    const fetching = async () => {
      const { data } = await axios.get(`/api/v1/products/${id}`);

      setName(data.name);
      setDescription(data.description);
      setCategory(data.category);
      setPrice(data.price);
      setExpress(data.express);
      setInStock(data.inStock);
      setRatings(data.ratings);
      setPic(data.imageUrl);
      //   setDate(data.updatedAt);
    };

    fetching();
  }, [id, userInfo, navigate]);

  return (
    <MainPage title="Update a Product">
      <Card>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {error && <InfoMessage variant="danger">{error}</InfoMessage>}
            {flag && <InfoMessage variant="success">{success}</InfoMessage>}
            {errorDelete && (
              <InfoMessage variant="danger">{errorDelete}</InfoMessage>
            )}
            {loading && <Loading />}
            {loadingDelete && <Loading />}
            <Row mb="3">
              <Form.Group as={Col} md="6" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  placeholder="Enter the product name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  value={price}
                  placeholder="e.g NGN 2.00"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
            </Row>
            <br />
            <Row mb="3">
              <Form.Group as={Col} md="6" controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  type="category"
                  value={category}
                  placeholder="Enter the Category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Choose..</option>
                  <option value="shoe">Shoe</option>
                  <option value="bag">Bag</option>
                  <option value="cloth">Cloth</option>
                  <option value="jwellery">Jwellery</option>
                  <option value="cosmetics">Cosmetics</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="express">
                <Form.Label>Express Delivery</Form.Label>
                <Form.Control
                  as="select"
                  value={express}
                  onChange={(e) => setExpress(e.target.value)}
                >
                  <option value="">Choose..</option>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Form.Control>
              </Form.Group>
            </Row>
            <br />
            <Row mb="3">
              <Form.Group as={Col} md="6" controlId="ratings">
                <Form.Label>Product Rating</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  max="5"
                  value={ratings}
                  onChange={(e) => setRatings(e.target.value)}
                />
              </Form.Group>

              {picMessage && (
                <InfoMessage variant="danger">{picMessage}</InfoMessage>
              )}
              <Form.Group as={Col} md="6" className="mb-3">
                <Form.Label>Product Picture</Form.Label>
                <Form.Control
                  onChange={(e) => postDetails(e.target.files[0])}
                  id="custom-file"
                  type="file"
                  label="Upload Profile Picture"
                  custom
                />
              </Form.Group>
            </Row>

            <Form.Group as={Col} controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                placeholder="Describe the product"
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            {description && (
              <Card>
                <Card.Header>Product Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{description}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}
            <br />
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Update Product
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => deleteHandler(id)}
            >
              Delete Product
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainPage>
  );
}

export default UpdateProductPage;
