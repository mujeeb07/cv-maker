import React from 'react'
import { useState } from 'react';
import axiosInstance from '../api/axiosConfig';


function Register() {
    const [form, setForm] = useState({name:"", password:""});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const submit = async () => {
        const response = await axiosInstance.post("auth/register", form);
        console.log(response);
    }
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">
                Create Account
            </h2>

            <div className="space-y-4">
                <input
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-black"
                />

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
                Register
                </button>
            </div>

            <p className="text-center text-sm mt-4 text-gray-600">
                Already have an account?{" "}
                <span className="text-black font-semibold cursor-pointer">
                Login
                </span>
            </p>
            </div>
        </div>
    );

}

export default Register