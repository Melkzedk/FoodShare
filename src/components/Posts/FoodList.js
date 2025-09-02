import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import FoodCard from './FoodCard';


export default function FoodList() {
const [posts, setPosts] = useState([]);


useEffect(() => {
const q = query(collection(db, 'posts'), where('available', '==', true), orderBy('createdAt', 'desc'));
const unsub = onSnapshot(q, snap => {
const arr = [];
snap.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
setPosts(arr);
});
return unsub;
}, []);


return (
<div>
{posts.length === 0 ? <p>No available posts yet.</p> : posts.map(p => <FoodCard key={p.id} post={p} />)}
</div>
);
}