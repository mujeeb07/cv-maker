import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';

import Builder from './pages/Builder';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route path='/register' element={<Register />}/>
      <Route path='/login' element={<Login />}/>
      <Route
        path='/builder' 
          element={
            <ProtectedRoute>
              <Builder />
            </ProtectedRoute>
          }
      />

      {/* Default route */}
      <Route path='*' element={<Navigate to="/login" /> }/>
    </Routes>
  )

}

export default App