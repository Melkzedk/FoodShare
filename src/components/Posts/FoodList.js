import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import FoodCard from './FoodCard';

export default function FoodList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Query Firestore posts, newest first
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Available Food</h3>
      <div className="row">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="col-md-4 mb-3">
              <FoodCard post={post} />
            </div>
          ))
        ) : (
          <p>No food posts yet.</p>
        )}
      </div>
    </div>
  );
}
