import React from 'react';
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Dropdown,
  Badge,
  Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';

import { logout } from '../actions/userActions';

function Header({ setSearch }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getCartItems = useSelector((state) => state.getCartItems);
  const { cartItems } = getCartItems;
  console.log(cartItems);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const cartCount = (items) => {
    if (items && items.userId !== '') {
      return items.items?.length;
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">HorlerTech Store</Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            {userInfo && (
              <Form>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Form>
            )}
          </Nav>
          <Nav>
            <Dropdown>
              <Dropdown.Toggle>
                <FaShoppingCart color="white" fontSize="25px" />
                <Badge className="mx-2">{cartCount(cartItems)}</Badge>
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ maxWidth: 700 }}>
                {cartItems && cartItems.length > 0 ? (
                  <>
                    {cartItems.map((cartItem) => (
                      <span className="cart-item" key={cartItem._id}>
                        <img
                          src={cartItem.imageUrl}
                          alt={cartItem.name}
                          className="cart-item-img"
                        />
                        <div className="cart-item-details">
                          <span>{cartItem.name}</span>
                          <span>NGN {cartItem.price}</span>
                        </div>

                        <AiFillDelete
                          fontSize="20px"
                          style={{ cursor: 'pointer' }}
                          onClick={() =>
                            dispatch({
                              type: 'REMOVE_FROM_CART',
                              payload: cartItem,
                            })
                          }
                        />
                      </span>
                    ))}
                    <Link to="/product/cart">
                      <Button style={{ width: '90%', margin: '0 10px' }}>
                        Go to Cart
                      </Button>
                    </Link>
                  </>
                ) : (
                  <span style={{ padding: 10 }}>Cart is empty!</span>
                )}
              </Dropdown.Menu>
            </Dropdown>
            <Nav.Link href="/products">Products Shopping</Nav.Link>
            {userInfo ? (
              <>
                <NavDropdown
                  title={`${userInfo?.name}`}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item href="/profile">
                    <img
                      alt=""
                      src={`${userInfo.pic}`}
                      width="25"
                      height="25"
                      style={{ marginRight: 10 }}
                    />
                    My Profile
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <NavLink
                      style={{ color: 'inherit' }}
                      className="link"
                      to="/mynotes"
                    >
                      My Notes
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <NavLink
                      style={{ color: 'inherit' }}
                      className="link"
                      to="/user/dashboard"
                    >
                      Dashboard
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link href="/products">Products Shopping</Nav.Link>

                <Nav.Link href="/login">Login</Nav.Link>
              </>
            )}
            {userInfo?.isAdmin ? (
              <Nav.Link href="/admin/dashboard">Admin</Nav.Link>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
