import React, { useState, useEffect } from 'react';
import MainPage from '../../components/MainPage';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../components/Loading';
import InfoMessage from '../../components/InfoMessage';
import GradientBar from '../../components/commons/GradientBar';
import './register.css';
import { register } from '../../actions/userActions';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [pic, setPic] = useState(
    'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
  );
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

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

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate('/');
  //   }
  // }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !address || !gender || !pic || !password) {
      setMessage('All fields must be filled!');
    } else if (password !== confirmpassword) {
      setMessage('Passwords do not match');
      return;
    } else {
      dispatch(register(name, email, phone, gender, address, password, pic));
      setTimeout(() => {
        navigate('/login');
      }, 700);
    }
  };

  return (
    <MainPage title="REGISTER">
      <div className="register-container">
        <GradientBar />
        {error && <InfoMessage variant="danger">{error}</InfoMessage>}
        {message && <InfoMessage variant="danger">{message}</InfoMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                value={name}
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Choose..</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Shemale">Undecided</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="formBasicAddress">
              <Form.Label>Home Address</Form.Label>
              <Form.Control
                type="text"
                value={address}
                placeholder="1, Otitoju street Ikeja, Lagos"
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={phone}
                placeholder="08030001000"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            {picMessage && (
              <InfoMessage variant="danger">{picMessage}</InfoMessage>
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
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmpassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Button className="mt-3" variant="primary" type="submit">
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </div>
    </MainPage>
  );
};

export default RegisterPage;
