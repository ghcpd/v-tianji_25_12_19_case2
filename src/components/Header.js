import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: #333;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 1rem;
`;

function Header() {
  return (
    <Nav>
      <h1>Movie Booking</h1>
      <div>
        <NavLink to="/">Movies</NavLink>
        <NavLink to="/history">History</NavLink>
      </div>
    </Nav>
  );
}

export default Header;