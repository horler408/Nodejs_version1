export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'CART_REQUEST':
      return { loading: true };
    case 'ADD_TO_CART':
      return {
        ...state,
        loading: false,
        cart: [...state.cart, { ...action.payload, qty: 1 }],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        loading: false,
        cart: state.cart.filter((c) => c.id !== action.payload.id),
      };
    case 'CHANGE_CART_QTY':
      return {
        ...state,
        loading: false,
        cart: state.cart.filter((c) =>
          c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
        ),
      };
    default:
      return state;
  }
};

export const productReducer = (state, action) => {
  switch (action.type) {
    case 'SORT_BY_PRICE':
      return { ...state, sort: action.payload };
    case 'FILTER_BY_STOCK':
      return { ...state, inStock: !state.inStock };
    case 'FILTER_BY_DELIVERY':
      return { ...state, byExpressDelivery: !state.byExpressDelivery };
    case 'FILTER_BY_RATING':
      return { ...state, byRating: action.payload };
    case 'FILTER_BY_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'CLEAR_FILTERS':
      return { byStock: false, byExpressDelivery: false, byRating: 0 };
    default:
      return state;
  }
};
