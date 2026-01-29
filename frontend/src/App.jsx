import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import Builer from './pages/Builder';
import Register from './pages/Register';


function App() {
  return (
    <Routes>
      <Route path='/login' element={<Register />}/>
      <Route path='/builder' element={<Builer />}/>
    </Routes>
  )

}

export default App