import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useAuth } from '../../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function Login() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);
const { login } = useAuth();
const navigate = useNavigate();


const handleSubmit = async (e) => {
e.preventDefault();
try {
setLoading(true);
await login(email, password);
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
<h3 className="mb-3">Log In</h3>
<Form onSubmit={handleSubmit}>
<Form.Group className="mb-2">
<Form.Label>Email</Form.Label>
<Form.Control type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
</Form.Group>
<Form.Group className="mb-3">
<Form.Label>Password</Form.Label>
<Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
</Form.Group>
<Button type="submit" disabled={loading}>Log In</Button>
</Form>
</Card.Body>
</Card>
);
}