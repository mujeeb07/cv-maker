import React from 'react'
import axiosInstance from '../api/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { User, Mail, Lock } from 'lucide-react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';

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
        <Layout showThemeToggle={true}>
            <div className="flex items-center justify-center min-h-[calc(100vh-100px)] pt-20 pb-10 px-4">
                <Card className="w-full max-w-[420px] shadow-2xl dark:shadow-black/50 border-t-4 border-t-[var(--primary-color)]">
                    <CardHeader className="text-center space-y-2">
                        <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
                        <CardDescription>
                            Start your professional journey
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={formik.handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="John Doe"
                                    startIcon={<User className="w-5 h-5" />}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    error={formik.touched.name && formik.errors.name}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    startIcon={<Mail className="w-5 h-5" />}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    error={formik.touched.email && formik.errors.email}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    startIcon={<Lock className="w-5 h-5" />}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    error={formik.touched.password && formik.errors.password}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    startIcon={<Lock className="w-5 h-5" />}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.confirmPassword}
                                    error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                />
                            </div>

                            {formik.errors.submit && (
                                <div className="text-red-600 bg-red-50 dark:bg-red-900/10 p-3 rounded-lg text-sm text-center border border-red-200 dark:border-red-900/20 animate-shake">
                                    {formik.errors.submit}
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={formik.isSubmitting}
                                className="w-full"
                            >
                                {formik.isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating Account...
                                    </span>
                                ) : 'Create Account'}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center border-t border-[var(--border-color)] pt-6 bg-[var(--bg-secondary)]/50 rounded-b-xl">
                        <p className="text-sm text-[var(--text-secondary)]">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-[var(--primary-color)] hover:underline transition-all"
                            >
                                Sign In
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </Layout>
    );
}
export default Register;