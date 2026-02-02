import { GoogleLogin } from '@react-oauth/google';
import React from 'react';
import axiosInstance from '../api/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Mail, Lock } from 'lucide-react';
import ThemeToggle from '../components/ui/ThemeToggle';

function Login() {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const response = await axiosInstance.post("/auth/login", values);
                localStorage.setItem("token", response.data.token);
                // alert("Logged in successfully");
                navigate('/builder');
            } catch (error) {
                console.error("Login Error:", error);
                setErrors({ submit: error.response?.data?.message || "Login failed. Please try again." });
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await axiosInstance.post(
                '/auth/google',
                {
                    token: credentialResponse.credential
                }
            );
            localStorage.setItem("token", response.data.token);
            alert("Google Login successful");
            navigate('/builder');
        } catch (error) {
            console.error(error.response?.data || error.message);
            alert("Google Login Failed");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4 transition-colors duration-300">
            {/* Theme Toggle Positioned Absolute Top Right */}
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl w-full max-w-sm p-8 border border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-1 text-sm">
                        Sign in to your account
                    </p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
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

                    {formik.errors.submit && (
                        <div className="text-red-500 bg-red-50 dark:bg-red-900/20 p-2 rounded text-xs text-center border border-red-200 dark:border-red-900/30">
                            {formik.errors.submit}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900 transition duration-200 text-sm mt-2"
                    >
                        {formik.isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-zinc-200 dark:border-zinc-800"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-2 bg-white dark:bg-zinc-900 text-zinc-500">
                                OR CONTINUE WITH
                            </span>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-center">
                        <GoogleLogin
                            theme="filled_blue"
                            shape="pill"
                            size="medium"
                            onSuccess={handleGoogleSuccess}
                            onError={() => alert("Google Login Failed")}
                        />
                    </div>
                </div>

                <div className="text-center mt-6">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-bold text-indigo-600 hover:text-indigo-500 transition duration-200"
                        >
                            Sign up now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default Login;