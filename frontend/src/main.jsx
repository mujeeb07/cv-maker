import { StrictMode } from 'react'
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from "@react-oauth/google"
import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='153988744772-sebjecpqfddivn0abl9aig0sm613npqj.apps.googleusercontent.com'>
      <BrowserRouter>
        <App/> 
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>,
)
