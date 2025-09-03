import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function FoodCard({ post }) {
  // WhatsApp contact URL
  const handleWhatsApp = () => {
    if (!post.phone) {
      alert("Donor didn't provide a contact number.");
      return;
    }
    const message = `Hi, I'm interested in your food post: "${post.title}". Is it still available?`;
    const whatsappUrl = `https://wa.me/${post.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="shadow-sm h-100">
      {post.imageBase64 && (
        <Card.Img
          variant="top"
          src={post.imageBase64}
          alt={post.title}
          style={{ objectFit: 'cover', height: '200px' }}
        />
      )}
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.description}</Card.Text>
        <p><strong>Quantity:</strong> {post.quantity}</p>
        {post.expiry && (
          <p><strong>Expiry:</strong> {new Date(post.expiry.seconds * 1000).toLocaleDateString()}</p>
        )}
        <Button variant="success" onClick={handleWhatsApp} className="w-100">
          Contact Donor via WhatsApp
        </Button>
      </Card.Body>
    </Card>
  );
}
