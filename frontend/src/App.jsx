import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import React from 'react';
import useAuthStore from "./context/useAuthStore";
import useThemeStore  from "./context/useThemeStore";

import { Toaster } from 'react-hot-toast';
import { Loader } from "lucide-react";

import Navbar from './components/Navbar'
import Register from './pages/RegisterPage'
import Login from './pages/LoginPage'
import ContentPage from './pages/ContentPage'
import Settings from './pages/Settings'
import HomePage from './pages/HomePage';

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  // if(isCheckingAuth && !authUser) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <Loader className="size-10 animate-spin" />
  //     </div>
  //   );
  // };
  return (
    <div data-theme={theme}>
      {/* <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">DaisyUI Test</h1>
        <button className="btn btn-primary">Click Me</button>
      </div> */}
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login" />} />
        <Route path="/home" element={authUser ? <HomePage/> : <Navigate to="/login" />} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/course/:id" element={authUser ? <ContentPage/> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App
