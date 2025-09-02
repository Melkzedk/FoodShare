import React from 'react';
import { useAuth } from '../contexts/AuthContext';


export default function Profile() {
const { currentUser } = useAuth();
return (
<div>
<h4>Profile</h4>
<p><strong>Email:</strong> {currentUser?.email}</p>
</div>
);
}