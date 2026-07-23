"use client";

import Link from "next/link";

export default function Banner() {
  return (
    <div className="carousel w-full h-[80vh] rounded-xl">

      {/* Slide 1 */}
      <div id="slide1" className="carousel-item relative w-full">
        <div className="hero w-full bg-gradient-to-r from-indigo-900 via-slate-900 to-black">
          <div className="hero-content text-center text-white">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold">
                Learn Digital Skills That Matter
              </h1>

              <p className="py-6 text-lg text-slate-300">
                Master web development, AI, programming, productivity, and
                many other digital skills through expert-created lessons.
              </p>

              <Link
                href="/public-lessons"
                className="btn btn-primary"
              >
                Explore Lessons
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
          <a href="#slide3" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>

      {/* Slide 2 */}
      <div id="slide2" className="carousel-item relative w-full">
        <div className="hero w-full bg-gradient-to-r from-emerald-900 via-slate-900 to-black">
          <div className="hero-content text-center text-white">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold">
                Become an Instructor
              </h1>

              <p className="py-6 text-lg text-slate-300">
                Share your knowledge by creating engaging lessons and help
                thousands of learners improve their digital skills.
              </p>

              <Link
                href="/dashboard/add-lesson"
                className="btn btn-success"
              >
                Add Lesson
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>

      {/* Slide 3 */}
      <div id="slide3" className="carousel-item relative w-full">
        <div className="hero w-full bg-gradient-to-r from-purple-900 via-slate-900 to-black">
          <div className="hero-content text-center text-white">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold">
                Learn Anytime, Anywhere
              </h1>

              <p className="py-6 text-lg text-slate-300">
                Access lessons on desktop, tablet, and mobile. Upgrade to
                Premium for exclusive content and certificates.
              </p>

              <Link
                href="/pricing"
                className="btn btn-secondary"
              >
                Upgrade Now
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
}