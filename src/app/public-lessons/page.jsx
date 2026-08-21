'use client';
import React, { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";
import LessonsCard from "@/components/LessonsCard";



const PublicLessonsPage = () => {
      const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await fetch(
          "http://localhost:3001/public-lessons"
        );

        if (!res.ok) {
          throw new Error("Failed to fetch lessons");
        }

        const data = await res.json();

        setLessons(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load lessons.");
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Spinner size="lg" color="secondary" />
          <p className="text-white/50">
            Loading life lessons...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            Something went wrong
          </h2>

          <p className="mt-2 text-white/50">
            {error}
          </p>
        </div>
      </main>
    );
  }
   return (
  <main className="min-h-screen bg-black text-white px-4 py-10">
    <div className="max-w-7xl mx-auto">

      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.2em] text-white/40">
          Life Lessons
        </p>

        <h1 className="text-3xl md:text-4xl font-bold mt-2">
          Public Life Lessons
        </h1>

        <p className="text-white/50 mt-3">
          Explore lessons and experiences shared by our community.
        </p>
      </div>

      {lessons.length === 0 ? (
        <div className="text-center py-20 text-white/50">
          No public lessons available.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <LessonsCard
              key={lesson._id}
              lesson={lesson}
            />
          ))}
        </div>
      )}

    </div>
  </main>
);
};

export default PublicLessonsPage;