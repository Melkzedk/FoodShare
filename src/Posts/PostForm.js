import React, { useState } from 'react';
import { db, storage, auth } from '../firebase';
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
    navigator.geolocation.getCurrentPosition(pos => {
      setLatLng({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    }, err => alert('Could not get location: ' + err.message));
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
      createdAt: serverTimestamp()
    });

    // reset fields
    setTitle(''); setDesc(''); setQty(''); setExpiry(''); setImage(null);
    alert('Posted! Thanks for sharing.');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form controls (Bootstrap classes) */}
      <button type="button" onClick={useMyLocation}>Use My Location</button>
      <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g., 20 packed meals" />
      <textarea value={desc} onChange={e=>setDesc(e.target.value)} />
      <input value={qty} onChange={e=>setQty(e.target.value)} />
      <input type="date" value={expiry} onChange={e=>setExpiry(e.target.value)} />
      <button type="submit">Post Food</button>
    </form>
  );
}
