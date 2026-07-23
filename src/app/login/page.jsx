"use client";

import Link from "next/link";
import { Input, Button, Card, CardBody } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
    const handleLogin = (e) => {
        e.preventDefault();
        // Login logic here
    };

    const handleGoogleLogin = () => {
        // Google Login Logic
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-4">

            <Card className="w-full max-w-md bg-slate-900/80 backdrop-blur-md border border-slate-700 shadow-2xl">

           
                    <div className="text-center mb-8">

                        <div className="mx-auto w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-2xl font-bold text-white">
                            DL
                        </div>

                        <h1 className="text-3xl font-bold text-white mt-4">
                            Welcome Back
                        </h1>

                        <p className="text-slate-400 mt-2">
                            Login to your Digital Life Lessons account
                        </p>

                    </div>

                    <form
                        onSubmit={handleLogin}
                        className="space-y-5 space-x-5"
                    >

                        <Input
                            type="email"
                            label="Email"
                            placeholder="Enter your email"
                            variant="bordered"
                            isRequired
                        />

                        <Input
                            type="password"
                            label="Password"
                            placeholder="Enter your password"
                            variant="bordered"
                            isRequired
                        />

                        <Button
                            type="submit"
                            color="primary"
                            className="w-full"
                        >
                            Login
                        </Button>

                    </form>

                    <div className="flex items-center gap-3 my-6">

                        <div className="flex-1 border-t border-slate-700"></div>

                        <span className="text-slate-400 text-sm">
                            OR
                        </span>

                        <div className="flex-1 border-t border-slate-700"></div>

                    </div>

                    <button
                       
                        className="w-full btn btn-success"
                        startContent={<FcGoogle size={22} />}
                        onPress={handleGoogleLogin}
                    >
                        Continue with Google
                    </button>

                    <p className="text-center text-slate-400 mt-7">

                        Dont have an account?{" "}

                        <Link
                            href="/register"
                            className="text-indigo-400 hover:text-indigo-300 font-semibold"
                        >
                            Register
                        </Link>

                    </p>

             

            </Card>

        </div>
    );
}