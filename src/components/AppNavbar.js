import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import { FiHome, FiList, FiUser, FiLogIn, FiUserPlus, FiLogOut } from 'react-icons/fi';

export default function AppNavbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Could not log out');
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        {/* ✅ Logo + Brand */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            alt="Foodshare"
            width="35"
            height="35"
            className="me-2"
          />
          <span className="fw-bold">Foodshare</span>
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              <FiHome className="me-1" /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/posts">
              <FiList className="me-1" /> View Posts
            </Nav.Link>
          </Nav>
          <Nav>
            {currentUser ? (
              <>
                <Nav.Link as={Link} to="/profile">
                  <FiUser className="me-1" /> Profile
                </Nav.Link>
                <Button 
                  variant="outline-secondary" 
                  className="ms-2 d-flex align-items-center"
                  onClick={handleLogout}
                >
                  <FiLogOut className="me-1" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  <FiLogIn className="me-1" /> Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <FiUserPlus className="me-1" /> Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
