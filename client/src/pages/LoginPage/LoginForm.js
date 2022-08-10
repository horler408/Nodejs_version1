import React, { useEffect } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import MainPage from '../../components/MainPage';
import Loading from '../../components/Loading';
import { login } from '../../actions/userActions';

import './loginPage.css';
// import ErrorMessage from '../../components/ErrorMessage';

const LoginForm = ({ navigate }) => {
  const initialValues = {
    email: '',
    password: '',
  };

  const signInSchema = Yup.object().shape({
    email: Yup.string().email().required('Email is required'),

    password: Yup.string()
      .required('Password is required')
      .min(4, 'Password is too short - should be 4 chars minimum'),
  });

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  //   const submitHandler = async (e) => {
  //     e.preventDefault();
  //     dispatch(login(email, password));
  //   };

  useEffect(() => {
    if (userInfo) {
      navigate('/landingPage');
    }
  }, [navigate, userInfo]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signInSchema}
      onSubmit={(values) => {
        console.log(values);
        dispatch(login(values));
      }}
    >
      {(formik) => {
        const { errors, touched, isValid, dirty } = formik;
        return (
          <MainPage title="LOGIN">
            <div className="login-container">
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              {loading && <Loading />}
              <h1>Sign in to continue</h1>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <div className="form-row">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        className={
                          errors.email && touched.email ? 'input-error' : null
                        }
                      />
                    </Form.Control>
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="error"
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <div className="form-row">
                    <Form.Label>Password</Form.Label>
                    <Form.Control>
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        className={
                          errors.password && touched.password
                            ? 'input-error'
                            : null
                        }
                      />
                    </Form.Control>
                    <ErrorMessage
                      name="password"
                      component="span"
                      className="error"
                    />
                  </div>
                </Form.Group>

                <Button
                  //   className="mb-3"
                  variant="primary"
                  type="submit"
                  className={!(dirty && isValid) ? 'disabled-btn' : ''}
                  disabled={!(dirty && isValid)}
                >
                  Sign In
                </Button>
              </Form>
              <Row className="py-3">
                <Col>
                  New Customer ? <Link to="/register">Register Here</Link>
                </Col>
              </Row>
            </div>
          </MainPage>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
