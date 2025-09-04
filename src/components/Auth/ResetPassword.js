import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Check your inbox for a password reset link.');
      setTimeout(() => navigate('/login'), 3000); // redirect after 3s
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <Card className="mx-auto" style={{ maxWidth: 420 }}>
      <Card.Body>
        <h3 className="mb-3">Reset Password</h3>
        {message && <div className="alert alert-info">{message}</div>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control 
              type="email" 
              value={email} 
              onChange={(e)=>setEmail(e.target.value)} 
              required 
            />
          </Form.Group>
          <Button type="submit" className="w-100">Reset Password</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
