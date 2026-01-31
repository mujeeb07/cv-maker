import { GoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';
import axiosInstance from '../api/axiosConfig';


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

            <p className="text-center text-sm mt-4 text-gray-600">
                Don't have an account?{" "}
                <span className="text-black font-semibold cursor-pointer">
                Register
                </span>
            </p>
            </div>
        </div>
  )
}
export default Login;