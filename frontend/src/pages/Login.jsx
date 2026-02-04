import { GoogleLogin } from '@react-oauth/google';
import React from 'react';
import axiosInstance from '../api/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Mail, Lock } from 'lucide-react';
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';

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
            const response = await axiosInstance.post('/auth/google',
                {
                    token: credentialResponse.credential
                }
            );

            localStorage.setItem("token", response.data.token);
            navigate('/builder');
        } catch (error) {
            console.error(error.response?.data || error.message);
            alert("Google Login Failed");
        }
    }

    return (
        <Layout showThemeToggle={true}>
            <div className="flex items-center justify-center min-h-[calc(100vh-100px)] pt-20 pb-10 px-4">
                <Card className="w-full max-w-[420px] shadow-2xl dark:shadow-black/50 border-t-4 border-t-[var(--primary-color)]">
                    <CardHeader className="text-center space-y-2">
                        <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
                        <CardDescription>
                            Sign in to continue building your CV
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={formik.handleSubmit} className="space-y-5">
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
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link to="/forgot-password" className="text-xs font-medium text-[var(--primary-color)] hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>
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
                                        Signing in...
                                    </span>
                                ) : 'Sign In'}
                            </Button>
                        </form>

                        <div className="mt-8">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-[var(--border-color)]"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="px-3 bg-[var(--bg-card)] text-[var(--text-tertiary)] font-medium tracking-wider">
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-center">
                                <GoogleLogin
                                    theme="filled_blue"
                                    shape="pill"
                                    size="large"
                                    width="320"
                                    onSuccess={handleGoogleSuccess}
                                    onError={() => alert("Google Login Failed")}
                                />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-center border-t border-[var(--border-color)] pt-6 bg-[var(--bg-secondary)]/50 rounded-b-xl">
                        <p className="text-sm text-[var(--text-secondary)]">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="font-semibold text-[var(--primary-color)] hover:underline transition-all"
                            >
                                Sign up now
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </Layout>
    )
}
export default Login;