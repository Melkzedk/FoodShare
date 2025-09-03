import React, { useState } from 'react';
import { db, auth } from '../../firebase'; // removed storage
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { geohashForLocation } from 'geofire-common';

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [qty, setQty] = useState('');
  const [expiry, setExpiry] = useState('');
  const [phone, setPhone] = useState(''); // 🔥 WhatsApp phone
  const [imageBase64, setImageBase64] = useState('');
  const [latLng, setLatLng] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Convert selected file to Base64 string
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result); // base64 string
    };
    reader.readAsDataURL(file); // convert file → base64
  };

  // Get user location
  const useMyLocation = () => {
    if (!navigator.geolocation) return alert('No geolocation support');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatLng({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (err) => alert('Could not get location: ' + err.message)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      if (!latLng) throw new Error('Please provide pickup location (use My Location).');
      if (!phone) throw new Error('Please provide your WhatsApp number.');

      const geohash = geohashForLocation([latLng.lat, latLng.lng]);

      await addDoc(collection(db, 'posts'), {
        title,
        description: desc,
        quantity: qty,
        expiry: expiry ? new Date(expiry) : null,
        imageBase64,
        lat: latLng.lat,
        lng: latLng.lng,
        geohash,
        available: true,
        userId: auth.currentUser?.uid || null,
        phone, // ✅ Save WhatsApp phone number
        createdAt: serverTimestamp(),
      });

      // reset fields
      setTitle('');
      setDesc('');
      setQty('');
      setExpiry('');
      setPhone('');
      setImageBase64('');
      setLatLng(null);

      setMessage({ type: 'success', text: '✅ Food posted successfully!' });
    } catch (err) {
      console.error('Error posting: ', err);
      setMessage({ type: 'danger', text: `❌ Failed to post: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Share Food</h3>

      {message && (
        <div className={`alert alert-${message.type}`} role="alert">
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card shadow-sm" style={{ maxWidth: '600px' }}>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Food Image</label>
            <input type="file" className="form-control" onChange={handleImageChange} />
            {imageBase64 && (
              <img
                src={imageBase64}
                alt="Preview"
                className="img-thumbnail mt-2"
                style={{ maxHeight: '150px' }}
              />
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., 20 packed meals"
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="form-control"
              rows="3"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <input
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              type="number"
              className="form-control"
              placeholder="Enter number of portions/items"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Expiry Date</label>
            <input
              type="date"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">WhatsApp Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              placeholder="e.g., 254712345678"
              required
            />
          </div>

          <div className="mb-3">
            <button type="button" onClick={useMyLocation} className="btn btn-outline-primary w-100">
              Use My Location
            </button>
          </div>
        </div>

        <div className="card-footer bg-white position-sticky bottom-0">
          <button type="submit" className="btn btn-success w-100" disabled={loading}>
            {loading ? 'Posting...' : 'Post Food'}
          </button>
        </div>
      </form>
    </div>
  );
}
