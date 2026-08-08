import Link from 'next/link';
import React from 'react';

const NotFound = () => {
    return (
        <div>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">

                {/* Big 404 Text */}
                <h1 className="text-9xl font-extrabold text-red-500">404</h1>

                {/* Message */}
                <h2 className="mt-4 text-3xl font-bold text-gray-800">
                    Page Not Found
                </h2>

                <p className="mt-2 text-gray-500 max-w-md">
                    Sorry, the page you are looking for doesn’t exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="mt-6 inline-block px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
                >
                    Go Back Home
                </Link>

                {/* Decorative circle */}
                <div className="absolute -z-10 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-60"></div>
            </div>
        </div>
    );
};

export default NotFound;