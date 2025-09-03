import React from 'react';
import { Card } from 'react-bootstrap';

export default function FoodCard({ post }) {
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
      </Card.Body>
    </Card>
  );
}
