import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import MainPage from '../../components/MainPage';

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo);

  useEffect(() => {
    const infoStorage = localStorage.getItem('userInfo');
    if (!infoStorage) {
      navigate('/');
    }
  }, [dispatch, navigate]);
  return (
    <MainPage title="Dashboard">
      <h1>Welcome: {userInfo && userInfo.name}</h1>
    </MainPage>
  );
};

export default UserDashboard;
