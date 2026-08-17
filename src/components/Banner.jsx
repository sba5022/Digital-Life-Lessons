"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Learn Digital Skills That Matter",
    description:
      "Master web development, AI, programming, productivity, and other valuable digital skills through expert-created lessons.",
    button: "Explore Lessons",
    href: "/public-lessons",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2000&q=85",
    accent: "from-indigo-600 to-purple-600",
  },
  {
    id: 2,
    title: "Share Knowledge. Inspire Others.",
    description:
      "Become an instructor and share your experience by creating meaningful lessons for learners around the world.",
    button: "Become an Instructor",
    href: "/dashboard/add-lesson",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=85",
    accent: "from-emerald-500 to-cyan-500",
  },
  {
    id: 3,
    title: "Learn Anytime. Anywhere.",
    description:
      "Build your skills at your own pace. Learn from anywhere and unlock premium content designed for serious learners.",
    button: "Explore Premium",
    href: "/pricing",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2000&q=85",
    accent: "from-purple-500 to-pink-500",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  // Automatic slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden rounded-2xl">

      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${slide.accent} opacity-30`}
      />

      {/* Decorative blur circles */}
      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
      />

      {/* Main content */}
      <div className="relative z-10 h-full flex items-center justify-center text-white px-6">

        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{
              opacity: 0,
              y: 60,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -40,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="max-w-4xl text-center"
          >

            {/* Small badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />

              <span className="text-sm font-medium">
                Learn • Create • Grow
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight"
            >
              {slide.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
            >
              {slide.description}
            </motion.p>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="mt-8"
            >
              <Link href={slide.href}>
                <motion.button
                  whileHover={{
                    scale: 1.06,
                    boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`btn btn-lg border-none text-white bg-gradient-to-r ${slide.accent} px-8`}
                >
                  {slide.button}

                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </Link>
            </motion.div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Previous button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={previousSlide}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 btn btn-circle bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
      >
        ❮
      </motion.button>

      {/* Next button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={nextSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 btn btn-circle bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
      >
        ❯
      </motion.button>

      {/* Bottom indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">

        {slides.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setCurrent(index)}
            className="group"
          >
            <motion.div
              animate={{
                width: current === index ? 45 : 12,
              }}
              transition={{ duration: 0.3 }}
              className={`h-2 rounded-full ${
                current === index
                  ? "bg-white"
                  : "bg-white/40"
              }`}
            />
          </button>
        ))}

      </div>

      {/* Slide counter */}
      {/* <div className="absolute bottom-8 right-8 z-20 text-white/70 text-sm">
        <span className="text-white font-bold">
          0{current + 1}
        </span>
        {" / "}
        0{slides.length}
      </div> */}

    </section>
  );
};

export default Banner;