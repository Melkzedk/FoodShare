import React, { useState } from 'react';
import { db, storage, auth } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { geohashForLocation } from 'geofire-common';

export default function PostForm() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [qty, setQty] = useState('');
  const [expiry, setExpiry] = useState('');
  const [image, setImage] = useState(null);
  const [latLng, setLatLng] = useState(null);

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
    if (!latLng) return alert('Please provide pickup location (use My Location or enter manually)');
    let imageUrl = '';
    if (image) {
      const storageRef = ref(storage, `images/${Date.now()}_${image.name}`);
      const snap = await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(snap.ref);
    }

    const geohash = geohashForLocation([latLng.lat, latLng.lng]);

    await addDoc(collection(db, 'posts'), {
      title,
      description: desc,
      quantity: qty,
      expiry: expiry ? new Date(expiry) : null,
      imageUrl,
      lat: latLng.lat,
      lng: latLng.lng,
      geohash,
      available: true,
      userId: auth.currentUser.uid,
      createdAt: serverTimestamp(),
    });

    // reset fields
    setTitle('');
    setDesc('');
    setQty('');
    setExpiry('');
    setImage(null);
    alert('Posted! Thanks for sharing.');
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Share Food</h3>
      <form onSubmit={handleSubmit} className="card shadow-sm" style={{ maxWidth: '600px' }}>
        <div className="card-body">
          <div className="mb-3">
            <label className="form-label">Food Image</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setImage(e.target.files[0])}
            />
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
            <button type="button" onClick={useMyLocation} className="btn btn-outline-primary w-100">
              Use My Location
            </button>
          </div>
        </div>

        {/* Sticky footer with button */}
        <div className="card-footer bg-white position-sticky bottom-0">
          <button type="submit" className="btn btn-success w-100">
            Post Food
          </button>
        </div>
      </form>
    </div>
  );
}
