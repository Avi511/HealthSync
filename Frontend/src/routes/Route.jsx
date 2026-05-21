import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Doctors from '../pages/Doctors';
import BookAppoinment from '../pages/BookAppoinment';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/book-appointment" element={<BookAppoinment />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
