import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';


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
<Navbar bg="light" expand="lg">
<Container>
<Navbar.Brand as={Link} to="/">Foodshare</Navbar.Brand>
<Navbar.Toggle />
<Navbar.Collapse>
<Nav className="me-auto">
<Nav.Link as={Link} to="/">Home</Nav.Link>
</Nav>
<Nav>
{currentUser ? (
<>
<Nav.Link as={Link} to="/profile">Profile</Nav.Link>
<Button variant="outline-secondary" onClick={handleLogout}>Logout</Button>
</>
) : (
<>
<Nav.Link as={Link} to="/login">Login</Nav.Link>
<Nav.Link as={Link} to="/register">Register</Nav.Link>
</>
)}
</Nav>
</Navbar.Collapse>
</Container>
</Navbar>
);
}