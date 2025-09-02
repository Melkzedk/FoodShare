import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
return (
<div>
<AppNavbar />
<div className="container mt-4">
<Routes>
<Route path="/" element={<Home />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
</Routes>
</div>
</div>
);
}


export default App;