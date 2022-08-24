import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import MainPage from '../../components/MainPage';
import { productCreateAction } from '../../actions/productActions';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import ReactMarkdown from 'react-markdown';

function CreateProductPage() {
  // const [name, setName] = useState('');
  // const [desc, setDesc] = useState('');
  // const [price, setPrice] = useState('');
  // const [pic, setPic] = useState('');
  // const [category, setCategory] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const productCreate = useSelector((state) => state.productCreate);
  // const { loading, error } = productCreate;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    name,
    description,
    category,
    price,
    pic,
    inStock,
    ratings,
    expressDelivery,
    loading,
    error,
  } = productCreate;

  const resetHandler = () => {
    name('');
    description('');
    category('');
    price('');
    ratings(0);
    inStock(false);
    expressDelivery(false);
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
        expressDelivery,
        ratings
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
                onChange={(e) =>
                  dispatch({
                    type: '',
                    payload: '',
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                placeholder="Describe the product"
                rows={4}
                onChange={(e) =>
                  dispatch({
                    type: '',
                    payload: '',
                  })
                }
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
                onChange={(e) =>
                  dispatch({
                    type: '',
                    payload: '',
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                value={price}
                placeholder="e.g NGN 2.00"
                onChange={(e) =>
                  dispatch({
                    type: '',
                    payload: '',
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="ratings">
              <Form.Label>Product Rating</Form.Label>
              <Form.Control
                type="number"
                value={ratings}
                onChange={(e) =>
                  dispatch({
                    type: '',
                    payload: '',
                  })
                }
              />
            </Form.Group>

            <span>
              <Form.Check
                label="True"
                name="group1"
                type="radio"
                id={`inline-1`}
                onChange={() =>
                  dispatch({
                    type: '',
                    payload: 'true',
                  })
                }
                checked={expressDelivery === 'true' ? true : false}
              />
            </span>
            <span>
              <Form.Check
                inline
                label="False"
                name="group1"
                type="radio"
                id={`inline-2`}
                onChange={() =>
                  dispatch({
                    type: 'SORT_BY_PRICE',
                    payload: 'false',
                  })
                }
                checked={expressDelivery === 'false' ? false : true}
              />
            </span>
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
