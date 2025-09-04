import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import FoodList from './components/Posts/FoodList'; // ✅ import FoodList
import ResetPassword from './components/Auth/ResetPassword'; // Import ResetPassword component

function App() {
  return (
    <div>
      <AppNavbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route path="/posts" element={<FoodList />} /> {/* ✅ Added route for posts */}
          <Route path='reset-password' element={<ResetPassword />} /> {/* ResetPassword route */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
