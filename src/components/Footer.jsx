"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo */}
          <div>
            <Link href="/" className="flex items-center gap-3">

              <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                DL
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Digital Life Lessons
                </h2>

                <p className="text-sm text-slate-400">
                  Learn • Share • Grow
                </p>
              </div>

            </Link>

            <p className="mt-5 text-sm leading-7">
              A modern learning platform where students can discover,
              share, and master digital skills through interactive
              lessons and expert guidance.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Contact
            </h3>

            <div className="space-y-4">

              <p className="flex items-center gap-3">
                <MdEmail className="text-indigo-400 text-xl" />
                support@digitallifelessons.com
              </p>

              <p className="flex items-center gap-3">
                <MdPhone className="text-indigo-400 text-xl" />
                +880 1234-567890
              </p>

              <p className="flex items-center gap-3">
                <MdLocationOn className="text-indigo-400 text-xl" />
                Dhaka, Bangladesh
              </p>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link href="/" className="hover:text-indigo-400">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/public-lessons"
                  className="hover:text-indigo-400"
                >
                  Public Lessons
                </Link>
              </li>

              <li>
                <Link
                  href="/pricing"
                  className="hover:text-indigo-400"
                >
                  Pricing
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-indigo-400"
                >
                  Dashboard
                </Link>
              </li>

            </ul>
          </div>

          {/* Terms & Social */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Legal & Social
            </h3>

            <div className="space-y-3">

              <Link
                href="/terms"
                className="block hover:text-indigo-400"
              >
                Terms & Conditions
              </Link>

              <Link
                href="/privacy"
                className="block hover:text-indigo-400"
              >
                Privacy Policy
              </Link>

            </div>

         <div className="flex gap-4 mt-6">

  <a
    href="https://facebook.com"
    target="_blank"
    rel="noopener noreferrer"
    className="btn btn-circle bg-slate-800 border-slate-600 text-white hover:bg-blue-600 hover:border-blue-600 transition-all"
  >
    <FaFacebookF className="text-lg" />
  </a>

  <a
    href="https://x.com"
    target="_blank"
    rel="noopener noreferrer"
    className="btn btn-circle bg-slate-800 border-slate-600 text-white hover:bg-white hover:text-black hover:border-white transition-all"
  >
    <FaXTwitter className="text-lg" />
  </a>

  <a
    href="https://linkedin.com"
    target="_blank"
    rel="noopener noreferrer"
    className="btn btn-circle bg-slate-800 border-slate-600 text-white hover:bg-sky-600 hover:border-sky-600 transition-all"
  >
    <FaLinkedinIn className="text-lg" />
  </a>

  <a
    href="https://github.com"
    target="_blank"
    rel="noopener noreferrer"
    className="btn btn-circle bg-slate-800 border-slate-600 text-white hover:bg-gray-700 hover:border-gray-700 transition-all"
  >
    <FaGithub className="text-lg" />
  </a>

</div>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Digital Life Lessons. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}
export default Footer;