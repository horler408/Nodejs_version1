import axios from 'axios';

export const itemAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'TEST_REQUEST',
    });

    const {
      itemList: { items },
    } = getState();
    console.log(items);

    const { data } = await axios.get('/api/v1/products');
    console.log(data);
    dispatch({
      type: 'TEST_SUCCESS',
      payload: data,
    });
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    dispatch({
      type: 'TEST_FAIL',
      payload: message,
    });
  }
};

export const itemListReducer = (itemState = { items: [] }, action) => {
  switch (action.type) {
    case 'TEST_REQUEST':
      return { loading: true };
    case 'TEST_SUCCESS':
      return { loading: false, items: action.payload };
    case 'TEST_FAIL':
      return { loading: false, error: action.payload };

    default:
      return itemState;
  }
};
