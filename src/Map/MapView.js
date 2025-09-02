import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import L from 'leaflet';

export default function MapView() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'posts'), where('available', '==', true));
    const unsub = onSnapshot(q, snap => {
      const arr = [];
      snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
      setPosts(arr);
    });
    return unsub;
  }, []);

  const center = posts[0] ? [posts[0].lat, posts[0].lng] : [0,0];

  return (
    <MapContainer center={center} zoom={13} style={{ height: '60vh', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {posts.map(p => (
        <Marker key={p.id} position={[p.lat, p.lng]}>
          <Popup>
            <strong>{p.title}</strong><br/>
            {p.description}<br/>
            Expires: {p.expiry ? new Date(p.expiry.seconds * 1000).toLocaleString() : 'N/A'}<br/>
            <a href={`mailto:placeholder@example.com`}>Contact</a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
