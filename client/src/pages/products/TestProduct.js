import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { itemAction } from '../../actions/itemActions';

const TestProduct = () => {
  const dispatch = useDispatch();

  const itemList = useSelector((state) => state.itemList);
  const { items } = itemList;

  console.log(items);

  useEffect(() => {
    dispatch(itemAction());
  }, [dispatch]);
  return (
    <div>
      {items &&
        items.map((item) => (
          <ul key={item._id}>
            <li>{item.name}</li>
          </ul>
        ))}
    </div>
  );
};

export default TestProduct;
