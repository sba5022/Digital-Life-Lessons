"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Spinner, Input, Button } from "@heroui/react";
import LessonsCard from "@/components/LessonsCard";

const PublicLessonsPage = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [emotionalTone, setEmotionalTone] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // =========================
  // Fetch lessons
  // =========================

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const res = await fetch(
          "http://localhost:3001/public-lessons",
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch lessons");
        }

        const data = await res.json();

        setLessons(data);
      } catch (error) {
        console.error("FETCH ERROR:", error);
        setError("Unable to load lessons.");
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  // =========================
  // Categories
  // =========================

  const categories = useMemo(() => {
    return [
      ...new Set(
        lessons
          .map((lesson) => lesson.category)
          .filter(Boolean)
      ),
    ];
  }, [lessons]);

  // =========================
  // Emotional tones
  // =========================

  const emotionalTones = useMemo(() => {
    return [
      ...new Set(
        lessons
          .map((lesson) => lesson.emotionalTone)
          .filter(Boolean)
      ),
    ];
  }, [lessons]);

  // =========================
  // Filter + Search + Sort
  // =========================

  const filteredLessons = useMemo(() => {
    let result = [...lessons];

    // SEARCH
    const keyword = search.trim().toLowerCase();

    if (keyword) {
      result = result.filter((lesson) => {
        const title =
          lesson.title?.toLowerCase() || "";

        const description =
          lesson.description?.toLowerCase() || "";

        const categoryText =
          lesson.category?.toLowerCase() || "";

        const tone =
          lesson.emotionalTone?.toLowerCase() || "";

        return (
          title.includes(keyword) ||
          description.includes(keyword) ||
          categoryText.includes(keyword) ||
          tone.includes(keyword)
        );
      });
    }

    // CATEGORY
    if (category !== "all") {
      result = result.filter(
        (lesson) =>
          lesson.category === category
      );
    }

    // EMOTIONAL TONE
    if (emotionalTone !== "all") {
      result = result.filter(
        (lesson) =>
          lesson.emotionalTone ===
          emotionalTone
      );
    }

    // SORT
    if (sortBy === "newest") {
      result.sort((a, b) => {
        const dateA = new Date(
          a.createdAt || 0
        ).getTime();

        const dateB = new Date(
          b.createdAt || 0
        ).getTime();

        return dateB - dateA;
      });
    }

    if (sortBy === "mostSaved") {
      result.sort(
        (a, b) =>
          (b.saves || 0) -
          (a.saves || 0)
      );
    }

    return result;
  }, [
    lessons,
    search,
    category,
    emotionalTone,
    sortBy,
  ]);

  // =========================
  // Clear filters
  // =========================

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setEmotionalTone("all");
    setSortBy("newest");
  };

  // =========================
  // Loading
  // =========================

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Spinner
            size="lg"
            color="secondary"
          />

          <p className="text-white/50">
            Loading life lessons...
          </p>
        </div>
      </main>
    );
  }

  // =========================
  // Error
  // =========================

  if (error) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            Something went wrong
          </h2>

          <p className="mt-2 text-white/50">
            {error}
          </p>
        </div>
      </main>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <main className="min-h-screen bg-black text-white px-4 py-10 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* =========================
            HEADER
        ========================= */}

        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.25em] text-purple-400 font-medium">
            Life Lessons
          </p>

          <h1 className="text-3xl md:text-5xl font-bold mt-3">
            Public Life Lessons
          </h1>

          <p className="text-white/50 mt-3 max-w-2xl">
            Explore meaningful experiences,
            personal growth, mistakes and lessons
            shared by our community.
          </p>
        </div>

        {/* =========================
            FILTER CARD
        ========================= */}

        <section className="mb-10 rounded-3xl border border-white/10 bg-white/[0.04] p-5 md:p-6">

          {/* Filter heading */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">

            <div>
              <h2 className="text-lg font-semibold">
                Find a Lesson
              </h2>

              <p className="text-sm text-white/40 mt-1">
                Search, filter and sort community
                lessons.
              </p>
            </div>

            <Button
              variant="secondary"
              onPress={clearFilters}
              className="w-full md:w-auto"
            >
              Clear Filters
            </Button>

          </div>

          {/* =========================
              SEARCH
          ========================= */}

          <div className="mb-5">

            <Input
              label="Search lessons"
              placeholder="Search by title, keyword, category..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              classnames={{
                inputWrapper:
                  "bg-white/10 border border-white/10 hover:bg-white/[0.12]",
                input:
                  "text-white placeholder:text-white/30",
                label:
                  "text-white/60",
              }}
            />

          </div>

          {/* =========================
              FILTERS
          ========================= */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Category */}

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-white/60 mb-2"
              >
                Category
              </label>

              <select
                id="category"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full h-11 rounded-xl border border-white/10 bg-white/10 px-4 text-sm text-white outline-none focus:border-purple-500 transition cursor-pointer"
              >
                <option
                  value="all"
                  className="bg-neutral-900"
                >
                  All Categories
                </option>

                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                    className="bg-neutral-900"
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Emotional Tone */}

            <div>
              <label
                htmlFor="tone"
                className="block text-sm font-medium text-white/60 mb-2"
              >
                Emotional Tone
              </label>

              <select
                id="tone"
                value={emotionalTone}
                onChange={(e) =>
                  setEmotionalTone(e.target.value)
                }
                className="w-full h-11 rounded-xl border border-white/10 bg-white/10 px-4 text-sm text-white outline-none focus:border-purple-500 transition cursor-pointer"
              >
                <option
                  value="all"
                  className="bg-neutral-900"
                >
                  All Emotional Tones
                </option>

                {emotionalTones.map((tone) => (
                  <option
                    key={tone}
                    value={tone}
                    className="bg-neutral-900"
                  >
                    {tone}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}

            <div>
              <label
                htmlFor="sort"
                className="block text-sm font-medium text-white/60 mb-2"
              >
                Sort By
              </label>

              <select
                id="sort"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
                className="w-full h-11 rounded-xl border border-white/10 bg-white/10 px-4 text-sm text-white outline-none focus:border-purple-500 transition cursor-pointer"
              >
                <option
                  value="newest"
                  className="bg-neutral-900"
                >
                  Newest First
                </option>

                <option
                  value="mostSaved"
                  className="bg-neutral-900"
                >
                  Most Saved
                </option>
              </select>
            </div>

          </div>

          {/* =========================
              ACTIVE FILTERS
          ========================= */}

          <div className="flex flex-wrap gap-2 mt-5">

            {search && (
              <span className="px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs">
                Search: {search}
              </span>
            )}

            {category !== "all" && (
              <span className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs">
                Category: {category}
              </span>
            )}

            {emotionalTone !== "all" && (
              <span className="px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs">
                Tone: {emotionalTone}
              </span>
            )}

          </div>

        </section>

        {/* =========================
            RESULTS HEADER
        ========================= */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

          <div>
            <h2 className="text-xl font-semibold">
              Explore Lessons
            </h2>

            <p className="text-sm text-white/40 mt-1">
              Showing{" "}
              <span className="text-white font-semibold">
                {filteredLessons.length}
              </span>{" "}
              of{" "}
              <span className="text-white font-semibold">
                {lessons.length}
              </span>{" "}
              lessons
            </p>
          </div>

          {sortBy === "newest" ? (
            <span className="text-xs text-white/40">
              Sorted by newest
            </span>
          ) : (
            <span className="text-xs text-white/40">
              Sorted by most saved
            </span>
          )}

        </div>

        {/* =========================
            LESSONS
        ========================= */}

        {filteredLessons.length === 0 ? (

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] py-24 text-center">

            <div className="text-5xl mb-4">
              🔎
            </div>

            <h2 className="text-xl font-semibold">
              No lessons found
            </h2>

            <p className="text-white/40 mt-2">
              Try another keyword or change your
              filters.
            </p>

            <Button
              variant="secondary"
              className="mt-5"
              onPress={clearFilters}
            >
              Reset Filters
            </Button>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredLessons.map((lesson) => (
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