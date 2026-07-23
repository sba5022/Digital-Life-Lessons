"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    // Replace with your auth/session
    const user = {
        name: "John Doe",
        image: "",
        // https://i.pravatar.cc/100
        plan: "Free", // Free | Premium
    };

    const navLinks = (
        <>
            <li>
                <Link href="/">Home</Link>
            </li>

            <li>
                <Link href="/dashboard/add-lesson">
                    Add Lesson
                </Link>
            </li>

            <li>
                <Link href="/dashboard/my-lessons">
                    My Lessons
                </Link>
            </li>

            <li>
                <Link href="/public-lessons">
                    Public Lessons
                </Link>
            </li>

            {user?.plan === "Free" && (
                <li>
                    <Link href="/pricing">
                        Pricing / Upgrade
                    </Link>
                </li>
            )}
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-lg border-b border-base-300 sticky top-0 z-50">

            {/* Left */}
            <div className="navbar-start">

                {/* Mobile Menu */}
                <div className="dropdown">

                    <label
                        tabIndex={0}
                        className="btn btn-ghost lg:hidden"
                    >
                        ☰
                    </label>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[100] p-3 shadow bg-base-100 rounded-box w-60"
                    >
                        {navLinks}
                    </ul>

                </div>

                {/* Logo */}

                <Link
                    href="/"
                    className="flex items-center gap-3"
                >
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                        DL
                    </div>

                    <div>
                        <h1 className="font-bold text-lg">
                            Digital Life
                        </h1>

                        <p className="text-xs text-gray-400">
                            Lessons
                        </p>
                    </div>
                </Link>

            </div>

            {/* Center */}

            <div className="navbar-center hidden lg:flex">

                <ul className="menu menu-horizontal px-1 gap-2">
                    {navLinks}
                </ul>

            </div>

            {/* Right */}

            <div className="navbar-end">

  <div className="flex gap-2">
      <Link href="/login" className="btn btn-primary">
        Login
      </Link>

      <Link href="/register" className="btn btn-outline">
        Signup
      </Link>
    </div>

</div>

        </div>
    );
}