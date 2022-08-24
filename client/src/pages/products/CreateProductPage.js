import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import MainPage from '../../components/MainPage';
import { productCreateAction } from '../../actions/productActions';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import ReactMarkdown from 'react-markdown';

function CreateProductPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0.0);
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

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error } = productCreate;

  const resetHandler = () => {
    setName('');
    setDescription('');
    setCategory('');
    setPrice('');
    setRatings(0);
    setInStock(false);
    setExpress(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !ratings || !description || !category) return;
    dispatch(
      productCreateAction(
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
  };

  useEffect(() => {}, []);

  return (
    <MainPage title="Create a Product">
      <Card>
        <Card.Header>Create a new Product</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                placeholder="Enter the product name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Content</Form.Label>
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

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                type="category"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                value={price}
                placeholder="e.g NGN 2.00"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="ratings">
              <Form.Label>Product Rating</Form.Label>
              <Form.Control
                type="number"
                value={ratings}
                onChange={(e) => setRatings(e.target.value)}
              />
            </Form.Group>

            <span>
              <Form.Check
                label="True"
                name="group1"
                type="radio"
                id={`inline-1`}
                onChange={(e) => setExpress(e.target.value)}
                checked={express === 'true' ? true : false}
              />
            </span>
            <span>
              <Form.Check
                inline
                label="False"
                name="group1"
                type="radio"
                id={`inline-2`}
                onChange={(e) => setName(e.target.value)}
                checked={express === 'false' ? false : true}
              />
            </span>
            {picMessage && (
              <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
            )}
            <Form.Group as={Col} md="6" className="mb-3">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                onChange={(e) => postDetails(e.target.files[0])}
                id="custom-file"
                type="file"
                label="Upload Profile Picture"
                custom
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Product
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
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

export default CreateProductPage;
