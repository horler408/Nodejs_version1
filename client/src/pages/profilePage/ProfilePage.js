import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import MainPage from '../../components/MainPage';
import './profilePage.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../actions/userActions';
import Loading from '../../components/Loading';
import InfoMessage from '../../components/InfoMessage';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [pic, setPic] = useState();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [picMessage, setPicMessage] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo);

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login', { state: { message: 'Please log in' } });
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPhone(userInfo.phone);
      setGender(userInfo.gender);
      setAddress(userInfo.address);
      setPic(userInfo.pic);
    }
  }, [navigate, userInfo]);

  const postDetails = (pics) => {
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

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword)
      dispatch(
        updateProfile({
          name,
          email,
          phone,
          gender,
          address,
          password,
          pic,
        })
      );
  };

  return (
    <MainPage title="EDIT PROFILE">
      <div>
        <Row className="profile-container">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <InfoMessage variant="success">
                  Updated Successfully
                </InfoMessage>
              )}
              {error && <InfoMessage variant="danger">{error}</InfoMessage>}

              <Row className="mb-4">
                <Form.Group as={Col} md="6" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Row>

              <Row className="mb-4">
                <Form.Group as={Col} md="6" controlId="phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="08030001000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Choose..</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="shemale">Undecided</option>
                  </Form.Control>
                </Form.Group>
              </Row>

              <Row className="mb-4">
                <Form.Group as={Col} md="6" controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="1, Bola Ige street Oluyole estate, Ibadan"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                {picMessage && (
                  <InfoMessage variant="danger">{picMessage}</InfoMessage>
                )}
                <Form.Group as={Col} md="6" controlId="formFile">
                  <Form.Label>Change Profile Picture</Form.Label>
                  <Form.Control
                    onChange={(e) => postDetails(e.target.files[0])}
                    type="file"
                    label="Upload Profile Picture"
                    custom
                  />
                </Form.Group>
              </Row>

              <Row className="mb-4">
                <Form.Group as={Col} md="6" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="confirm-password">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>{' '}
              </Row>

              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src={pic} alt={name} className="profile-pic" />
          </Col>
        </Row>
      </div>
    </MainPage>
  );
};

export default ProfilePage;
