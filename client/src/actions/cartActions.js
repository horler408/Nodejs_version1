import axios from 'axios';

export const cartListActions = () => async (dispatch, getstate) => {
  try {
    dispatch({
      type: 'CART_REQUEST',
    });

    const {
      userLogin: { userInfo },
    } = getstate();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/api/v1/notes', config);
    console.log(data);
    dispatch({
      type: 'CART_LIST_SUCCESS',
      payload: data,
    });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({
      type: 'CART_LIST_FAIL',
      payload: message,
    });
  }
};
