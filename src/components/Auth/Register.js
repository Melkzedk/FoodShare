import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function Register() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);
const { signup } = useAuth();
const navigate = useNavigate();


const handleSubmit = async (e) => {
e.preventDefault();
try {
setLoading(true);
await signup(email, password);
navigate('/');
} catch (err) {
alert(err.message);
} finally {
setLoading(false);
}
};


return (
<Card className="mx-auto" style={{ maxWidth: 420 }}>
<Card.Body>
<h3 className="mb-3">Register</h3>
<Form onSubmit={handleSubmit}>
<Form.Group className="mb-2">
<Form.Label>Email</Form.Label>
<Form.Control type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
</Form.Group>
<Form.Group className="mb-3">
<Form.Label>Password</Form.Label>
<Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
</Form.Group>
<Button type="submit" disabled={loading}>Register</Button>
</Form>
</Card.Body>
</Card>
);
}