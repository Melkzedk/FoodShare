import React from 'react';
import { Card, Button } from 'react-bootstrap';


export default function FoodCard({ post }) {
return (
<Card className="mb-3">
<Card.Body>
<div className="d-flex">
{post.imageUrl && <img src={post.imageUrl} alt="food" style={{ width: 120, height: 80, objectFit: 'cover', marginRight: 12 }} />}
<div>
<h6>{post.title}</h6>
<p className="mb-1">{post.description}</p>
<small>Qty: {post.quantity || 'N/A'}</small><br />
<small>Expires: {post.expiry ? new Date(post.expiry.seconds * 1000).toLocaleString() : 'N/A'}</small>
</div>
</div>
</Card.Body>
</Card>
);
}