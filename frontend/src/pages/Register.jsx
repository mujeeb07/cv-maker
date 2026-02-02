import React from 'react'
import axiosInstance from '../api/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { User, Mail, Lock } from 'lucide-react';
import ThemeToggle from '../components/ui/ThemeToggle';

function Register() {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Full Name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                // Remove confirmPassword before sending to API
                const dataToSend = { ...values };
                delete dataToSend.confirmPassword;

                const response = await axiosInstance.post("/auth/register", dataToSend);
                console.log("Response:", response);
                alert("Registration successful! Please login.");
                navigate('/login');
            } catch (error) {
                console.error("Register Error:", error);
                setErrors({ submit: error.response?.data?.message || "Registration failed. Please try again." });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4 transition-colors duration-300">
            {/* Theme Toggle Positioned Absolute Top Right */}
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl w-full max-w-sm p-8 border border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                        Create Account
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
                        Start your professional journey
                    </p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-zinc-700 dark:text-zinc-300 text-xs font-semibold mb-1 ml-1" htmlFor="name">
                            Full Name
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="John Doe"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-700'} 
                                bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500
                                focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm`}
                            />
                        </div>
                        {formik.touched.name && formik.errors.name ? (
                            <div className="text-red-500 text-xs mt-1 ml-1 font-medium">{formik.errors.name}</div>
                        ) : null}
                    </div>

                    <div>
                        <label className="block text-zinc-700 dark:text-zinc-300 text-xs font-semibold mb-1 ml-1" htmlFor="email">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-700'} 
                                bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500
                                focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm`}
                            />
                        </div>
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 text-xs mt-1 ml-1 font-medium">{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <div>
                        <label className="block text-zinc-700 dark:text-zinc-300 text-xs font-semibold mb-1 ml-1" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-700'} 
                                bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500
                                focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm`}
                            />
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-red-500 text-xs mt-1 ml-1 font-medium">{formik.errors.password}</div>
                        ) : null}
                    </div>

                    <div>
                        <label className="block text-zinc-700 dark:text-zinc-300 text-xs font-semibold mb-1 ml-1" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirmPassword}
                                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-700'} 
                                bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500
                                focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm`}
                            />
                        </div>
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <div className="text-red-500 text-xs mt-1 ml-1 font-medium">{formik.errors.confirmPassword}</div>
                        ) : null}
                    </div>

                    {formik.errors.submit && (
                        <div className="text-red-500 bg-red-50 dark:bg-red-900/20 p-2 rounded text-xs text-center border border-red-200 dark:border-red-900/30">
                            {formik.errors.submit}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 transform transition hover:-translate-y-0.5 mt-2 text-sm"
                    >
                        {formik.isSubmitting ? 'Creating Account...' : 'Register'}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-bold text-indigo-600 hover:text-indigo-500 transition duration-200"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );

}

export default Register