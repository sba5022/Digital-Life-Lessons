"use client";

import { Card } from "@heroui/react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Lightbulb,
  Heart,
  TrendingUp,
} from "lucide-react";

const benefits = [
  {
    number: "01",
    icon: BookOpen,
    title: "Preserve Your Wisdom",
    description:
      "Your experiences contain valuable lessons. Preserving them allows your knowledge and wisdom to remain meaningful for years to come.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Learn From Experience",
    description:
      "Reflecting on the past helps you understand what worked, what failed, and how those experiences can guide future decisions.",
  },
  {
    number: "03",
    icon: Heart,
    title: "Inspire Others",
    description:
      "A personal lesson that helped you overcome a difficult situation may become the encouragement someone else needs.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Grow Continuously",
    description:
      "Life is a continuous learning process. Recording your reflections helps you recognize your growth and become more intentional.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export default function LifeMatters() {
  return (
    <section
      id="why-learning-matters"
      className="relative overflow-hidden bg-black text-white py-24 md:py-32 px-6"
    >
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-white/50 uppercase tracking-[0.3em] text-xs font-semibold mb-5">
            Why It Matters
          </p>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            Why Learning From
            <br />

            <span className="text-white/40">
              Life Matters
            </span>
          </h2>

          <p className="mt-7 text-white/50 text-lg md:text-xl leading-relaxed max-w-2xl">
            Every experience has something to teach us. By preserving
            personal wisdom, we can transform everyday experiences into
            meaningful lessons for ourselves and others.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10"
        >
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.number}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="group"
              >
                <Card
                  radius="none"
                  shadow="none"
                  className="
                    relative
                    h-full
                    min-h-[370px]
                    p-7
                    rounded-none
                    bg-[#050505]
                    border-0
                    overflow-hidden
                    transition-all
                    duration-500
                    group-hover:bg-[#0b0b0b]
                  "
                >
                  {/* Number */}
                  <span
                    className="
                      absolute
                      top-5
                      right-6
                      text-7xl
                    //   font-black
                      text-white
                  
                      transition-all
                      duration-500
                    "
                  >
                    {benefit.number}
                  </span>

                  {/* Icon */}
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                    }}
                    className="
                      relative
                      w-12
                      h-12
                      border
                      border-white/15
                      flex
                      items-center
                      justify-center
                      mb-10
                      text-white
                      group-hover:bg-white
                      group-hover:text-black
                      transition-all
                      duration-500
                    "
                  >
                    <Icon size={21} strokeWidth={1.5} />
                  </motion.div>

                  {/* Title */}
                  <h3
                    className="
                      relative
                      text-xl
                      font-bold
                      tracking-tight
                      mb-5
                      group-hover:translate-x-1
                      transition-transform
                      duration-300
                    "
                  >
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="relative text-white/40 leading-7 text-sm">
                    {benefit.description}
                  </p>

                  {/* Bottom line */}
                  <div
                    className="
                      absolute
                      bottom-0
                      left-0
                      h-[2px]
                      w-0
                      bg-white
                      group-hover:w-full
                      transition-all
                      duration-500
                    "
                  />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="mt-20 text-center"
        >
          <div className="w-16 h-px bg-white/20 mx-auto mb-8" />

          <p className="text-xl md:text-3xl font-medium text-white/70 italic">
            "Your experience can become someone else's guide."
          </p>

          <p className="mt-4 text-xs uppercase tracking-[0.3em] text-white/30">
            Learn · Reflect · Share · Grow
          </p>
        </motion.div>

      </div>
    </section>
  );
}