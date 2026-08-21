"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Chip,
  Spinner,
  Select,
  SelectItem,
} from "@heroui/react";

import {
  Trash2,
  Star,
  CheckCircle,
  Eye,
  EyeOff,
  Flag,
} from "lucide-react";

const API_URL = "http://localhost:3001";

const ManageLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const [categoryFilter, setCategoryFilter] = useState("all");
  const [visibilityFilter, setVisibilityFilter] = useState("all");
  const [flagFilter, setFlagFilter] = useState("all");

  // =========================
  // Fetch Lessons
  // =========================

  const fetchLessons = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/lesson`);

      if (!res.ok) {
        throw new Error("Failed to fetch lessons");
      }

      const data = await res.json();

      setLessons(data);
    } catch (error) {
      console.error("FETCH LESSON ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLessons();
  }, []);

  // =========================
  // Delete Lesson
  // =========================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this lesson?"
    );

    if (!confirmed) return;

    try {
      setActionLoading(id);

      const res = await fetch(`${API_URL}/lesson/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete lesson");
      }

      setLessons((prevLessons) =>
        prevLessons.filter((lesson) => lesson._id !== id)
      );
    } catch (error) {
      console.error("DELETE ERROR:", error);

      alert("Failed to delete lesson.");
    } finally {
      setActionLoading(null);
    }
  };

  // =========================
  // Feature Lesson
  // =========================

  const handleFeature = async (id) => {
    try {
      setActionLoading(id);

      const res = await fetch(
        `${API_URL}/lesson/${id}/featured`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to feature lesson");
      }

      setLessons((prevLessons) =>
        prevLessons.map((lesson) =>
          lesson._id === id
            ? {
                ...lesson,
                isFeatured: true,
              }
            : lesson
        )
      );
    } catch (error) {
      console.error("FEATURE ERROR:", error);

      alert("Failed to feature lesson.");
    } finally {
      setActionLoading(null);
    }
  };

  // =========================
  // Mark Reviewed
  // =========================

  const handleReviewed = async (id) => {
    try {
      setActionLoading(id);

      const res = await fetch(
        `${API_URL}/lesson/${id}/reviewed`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to mark reviewed");
      }

      setLessons((prevLessons) =>
        prevLessons.map((lesson) =>
          lesson._id === id
            ? {
                ...lesson,
                isReviewed: true,
              }
            : lesson
        )
      );
    } catch (error) {
      console.error("REVIEW ERROR:", error);

      alert("Failed to mark lesson as reviewed.");
    } finally {
      setActionLoading(null);
    }
  };

  // =========================
  // Categories
  // =========================

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        lessons
          .map((lesson) => lesson.category)
          .filter(Boolean)
      ),
    ];

    return uniqueCategories;
  }, [lessons]);

  // =========================
  // Filter Lessons
  // =========================

  const filteredLessons = useMemo(() => {
    return lessons.filter((lesson) => {
      // Category
      if (
        categoryFilter !== "all" &&
        lesson.category !== categoryFilter
      ) {
        return false;
      }

      // Visibility
      if (visibilityFilter === "public" && !lesson.isPublic) {
        return false;
      }

      if (visibilityFilter === "private" && lesson.isPublic) {
        return false;
      }

      // Flag
      if (flagFilter === "flagged" && !lesson.isFlagged) {
        return false;
      }

      if (flagFilter === "not-flagged" && lesson.isFlagged) {
        return false;
      }

      return true;
    });
  }, [
    lessons,
    categoryFilter,
    visibilityFilter,
    flagFilter,
  ]);

  // =========================
  // Statistics
  // =========================

  const publicLessons = lessons.filter(
    (lesson) => lesson.isPublic
  ).length;

  const privateLessons = lessons.filter(
    (lesson) => !lesson.isPublic
  ).length;

  const flaggedLessons = lessons.filter(
    (lesson) => lesson.isFlagged
  ).length;

  const featuredLessons = lessons.filter(
    (lesson) => lesson.isFeatured
  ).length;

  // =========================
  // Loading
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Spinner
          color="primary"
          size="lg"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">

      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}

        <div className="mb-8">

          <h1 className="text-3xl md:text-4xl font-bold">
            Manage Lessons
          </h1>

          <p className="text-zinc-400 mt-2">
            Review, manage and moderate lessons
            submitted by users.
          </p>

        </div>

        {/* ================= STATS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          {/* Public */}

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-zinc-400 text-sm">
                  Public Lessons
                </p>

                <p className="text-3xl font-bold mt-2">
                  {publicLessons}
                </p>
              </div>

              <div className="p-3 bg-green-500/10 rounded-xl">
                <Eye
                  size={22}
                  className="text-green-400"
                />
              </div>

            </div>

          </div>

          {/* Private */}

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-zinc-400 text-sm">
                  Private Lessons
                </p>

                <p className="text-3xl font-bold mt-2">
                  {privateLessons}
                </p>

              </div>

              <div className="p-3 bg-yellow-500/10 rounded-xl">
                <EyeOff
                  size={22}
                  className="text-yellow-400"
                />
              </div>

            </div>

          </div>

          {/* Flagged */}

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-zinc-400 text-sm">
                  Flagged Content
                </p>

                <p className="text-3xl font-bold mt-2">
                  {flaggedLessons}
                </p>

              </div>

              <div className="p-3 bg-red-500/10 rounded-xl">
                <Flag
                  size={22}
                  className="text-red-400"
                />
              </div>

            </div>

          </div>

          {/* Featured */}

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-zinc-400 text-sm">
                  Featured Lessons
                </p>

                <p className="text-3xl font-bold mt-2">
                  {featuredLessons}
                </p>

              </div>

              <div className="p-3 bg-purple-500/10 rounded-xl">
                <Star
                  size={22}
                  className="text-purple-400"
                />
              </div>

            </div>

          </div>

        </div>

        {/* ================= FILTERS ================= */}

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 mb-8">

          <div className="flex items-center gap-2 mb-5">

            <h2 className="text-lg font-semibold">
              Filter Lessons
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Category */}

            <Select
              label="Category"
              selectedKeys={[categoryFilter]}
              onSelectionChange={(keys) =>
                setCategoryFilter(
                  Array.from(keys)[0]
                )
              }
              classNames={{
                trigger:
                  "bg-zinc-900 border-zinc-800",
                label:
                  "text-zinc-400",
              }}
            >

              <div key="all">
                All Categories
              </div>

              {categories.map((category) => (
                <div
                  key={category}
                >
                  {category}
                </div>
              ))}

            </Select>

            {/* Visibility */}

            <Select
              label="Visibility"
              selectedKeys={[visibilityFilter]}
              onSelectionChange={(keys) =>
                setVisibilityFilter(
                  Array.from(keys)[0]
                )
              }
              classNames={{
                trigger:
                  "bg-zinc-900 border-zinc-800",
                label:
                  "text-zinc-400",
              }}
            >

              <div key="all">
                All
              </div>

              <div key="public">
                Public
              </div>

              <div key="private">
                Private
              </div>

            </Select>

            {/* Flags */}

            <Select
              label="Content Status"
              selectedKeys={[flagFilter]}
              onSelectionChange={(keys) =>
                setFlagFilter(
                  Array.from(keys)[0]
                )
              }
              classNames={{
                trigger:
                  "bg-zinc-900 border-zinc-800",
                label:
                  "text-zinc-400",
              }}
            >

              <div key="all">
                All
              </div>

              <div key="flagged">
                Flagged
              </div>

              <div key="not-flagged">
                Not Flagged
              </div>

            </Select>

          </div>

        </div>

        {/* ================= LESSON TABLE ================= */}

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">

          <div className="p-5 border-b border-zinc-800">

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-xl font-semibold">
                  All Lessons
                </h2>

                <p className="text-zinc-500 text-sm mt-1">
                  Showing {filteredLessons.length} lessons
                </p>

              </div>

            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-zinc-900 border-b border-zinc-800">

                <tr>

                  <th className="text-left p-4 text-zinc-400 font-medium">
                    #
                  </th>

                  <th className="text-left p-4 text-zinc-400 font-medium">
                    Lesson
                  </th>

                  <th className="text-left p-4 text-zinc-400 font-medium">
                    Category
                  </th>

                  <th className="text-left p-4 text-zinc-400 font-medium">
                    Visibility
                  </th>

                  <th className="text-left p-4 text-zinc-400 font-medium">
                    Status
                  </th>

                  <th className="text-right p-4 text-zinc-400 font-medium">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredLessons.length === 0 ? (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center p-10 text-zinc-500"
                    >
                      No lessons found.
                    </td>

                  </tr>

                ) : (

                  filteredLessons.map(
                    (lesson, index) => (

                      <tr
                        key={lesson._id}
                        className="border-b border-zinc-800 hover:bg-zinc-900/50 transition"
                      >

                        {/* Number */}

                        <td className="p-4 text-zinc-500">
                          {index + 1}
                        </td>

                        {/* Lesson */}

                        <td className="p-4">

                          <div className="max-w-xs">

                            <p className="font-semibold truncate">
                              {lesson.title ||
                                lesson.name ||
                                "Untitled Lesson"}
                            </p>

                            <p className="text-zinc-500 text-sm truncate mt-1">
                              {lesson.description ||
                                "No description"}
                            </p>

                          </div>

                        </td>

                        {/* Category */}

                        <td className="p-4">

                          <Chip
                            size="sm"
                            variant="flat"
                          >
                            {lesson.category ||
                              "General"}
                          </Chip>

                        </td>

                        {/* Visibility */}

                        <td className="p-4">

                          {lesson.isPublic ? (

                            <Chip
                              size="sm"
                              color="success"
                              variant="flat"
                              startContent={
                                <Eye size={14} />
                              }
                            >
                              Public
                            </Chip>

                          ) : (

                            <Chip
                              size="sm"
                              color="warning"
                              variant="flat"
                              startContent={
                                <EyeOff size={14} />
                              }
                            >
                              Private
                            </Chip>

                          )}

                        </td>

                        {/* Status */}

                        <td className="p-4">

                          <div className="flex flex-wrap gap-2">

                            {lesson.isFlagged && (

                              <Chip
                                size="sm"
                                color="danger"
                                variant="flat"
                                startContent={
                                  <Flag size={14} />
                                }
                              >
                                Flagged
                              </Chip>

                            )}

                            {lesson.isFeatured && (

                              <Chip
                                size="sm"
                                color="secondary"
                                variant="flat"
                                startContent={
                                  <Star size={14} />
                                }
                              >
                                Featured
                              </Chip>

                            )}

                            {lesson.isReviewed && (

                              <Chip
                                size="sm"
                                color="success"
                                variant="flat"
                                startContent={
                                  <CheckCircle size={14} />
                                }
                              >
                                Reviewed
                              </Chip>

                            )}

                            {!lesson.isFlagged &&
                              !lesson.isFeatured &&
                              !lesson.isReviewed && (

                                <Chip
                                  size="sm"
                                  variant="flat"
                                >
                                  Pending
                                </Chip>

                              )}

                          </div>

                        </td>

                        {/* Actions */}

                        <td className="p-4">

                          <div className="flex justify-end gap-2 flex-wrap">

                            {/* Feature */}

                            {!lesson.isFeatured && (

                              <Button
                                size="sm"
                                color="secondary"
                                variant="flat"
                                startContent={
                                  <Star size={15} />
                                }
                                isLoading={
                                  actionLoading ===
                                  lesson._id
                                }
                                onPress={() =>
                                  handleFeature(
                                    lesson._id
                                  )
                                }
                              >
                                Feature
                              </Button>

                            )}

                            {/* Reviewed */}

                            {!lesson.isReviewed && (

                              <Button
                                size="sm"
                                color="success"
                                variant="flat"
                                startContent={
                                  <CheckCircle
                                    size={15}
                                  />
                                }
                                isLoading={
                                  actionLoading ===
                                  lesson._id
                                }
                                onPress={() =>
                                  handleReviewed(
                                    lesson._id
                                  )
                                }
                              >
                                Review
                              </Button>

                            )}

                            {/* Delete */}

                            <Button
                              size="sm"
                              color="danger"
                              variant="flat"
                              startContent={
                                <Trash2 size={15} />
                              }
                              isLoading={
                                actionLoading ===
                                lesson._id
                              }
                              onPress={() =>
                                handleDelete(
                                  lesson._id
                                )
                              }
                            >
                              Delete
                            </Button>

                          </div>

                        </td>

                      </tr>

                    )
                  )

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ManageLessons;