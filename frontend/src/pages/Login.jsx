import { GoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';
import axiosInstance from '../api/axiosConfig';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {
    const [form, setForm] = useState({email:"", password: ""});

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const submit = async () => {
        console.log("Data:",form)
        const response = await axiosInstance.post("/auth/login", form);
        console.log("Login Response:", response.data)
        localStorage.setItem("token", response.data.token); 
        alert("Logged in")
    }

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await axiosInstance.post(
                '/auth/google',
                {
                    token: credentialResponse.credential
                }
            );
            console.log("Google login response",response.data)
        } catch (error) {
            console.error(error.response?.data || error.message);
        }

    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">
                Login
            </h2>

            <div className="space-y-4">
                <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-black"
                />

                <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-black"
                />

                <button
                onClick={submit}
                className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
                >
                Login
                </button>
            </div>

            <div style={{ marginTop: "20px" }}>
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => alert("Google Login Failed")}
                />
            </div>

            <p className="text-center text-sm mt-4 text-gray-600">
                Don't have an account?{" "}
                <Link
                    to="/register"
                    className="text-black font-semibold hover:underline"
                >
                    Register
                </Link>
            </p>
            </div>
        </div>
  )
}
export default Login;