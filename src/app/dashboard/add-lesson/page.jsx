"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Card, Button } from "@heroui/react";

const categories = [
  "Personal Growth",
  "Career",
  "Relationships",
  "Mindset",
  "Mistakes Learned",
];

const emotionalTones = [
  "Motivational",
  "Sad",
  "Realization",
  "Gratitude",
];

export default function AddLessonPage() {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  // Change this according to how you store the user's plan.
  const isPremium = user?.plan === "Premium";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    emotionalTone: "",
    image: "",
    accessLevel: "Free",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAccessChange = (e) => {
    const value = e.target.value;

    // Free users can never select Premium
    if (!isPremium && value === "Premium") {
      return;
    }

    setFormData((previous) => ({
      ...previous,
      accessLevel: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Security check on the client side
    if (!isPremium) {
      formData.accessLevel = "Free";
    }

    const lessonData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      emotionalTone: formData.emotionalTone,
      image: formData.image,
      accessLevel: isPremium
        ? formData.accessLevel
        : "Free",
    };

    console.log("Lesson:", lessonData);

    // TODO:
    // Send lessonData to your API / MongoDB here.

    setSuccess("Lesson created successfully!");

    setFormData({
      title: "",
      description: "",
      category: "",
      emotionalTone: "",
      image: "",
      accessLevel: "Free",
    });
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold">
          Please login first.
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <p className="text-primary uppercase tracking-widest text-sm font-semibold">
          Dashboard
        </p>

        <h1 className="text-3xl md:text-4xl font-bold mt-2">
          Add New Lesson
        </h1>

        <p className="text-default-500 mt-2">
          Share an experience, insight, or lesson that may
          help others.
        </p>
      </div>

      <Card className="border border-default-200">
        <form
          onSubmit={handleSubmit}
          className="p-6 md:p-8 space-y-6"
        >

          {/* Lesson Title */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Lesson Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="What did you learn?"
              required
              className="w-full rounded-xl border border-default-300 bg-transparent px-4 py-3 outline-none focus:border-primary"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Full Description / Story / Insight
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Share your story or explain the lesson..."
              rows={7}
              required
              className="w-full rounded-xl border border-default-300 bg-transparent px-4 py-3 outline-none resize-none focus:border-primary"
            />
          </div>

          {/* Category + Emotional Tone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-default-300 bg-transparent px-4 py-3 outline-none focus:border-primary"
              >
                <option value="">
                  Select category
                </option>

                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Emotional Tone */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Emotional Tone
              </label>

              <select
                name="emotionalTone"
                value={formData.emotionalTone}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-default-300 bg-transparent px-4 py-3 outline-none focus:border-primary"
              >
                <option value="">
                  Select emotional tone
                </option>

                {emotionalTones.map((tone) => (
                  <option
                    key={tone}
                    value={tone}
                  >
                    {tone}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Image
              <span className="text-default-400 font-normal">
                {" "} (Optional)
              </span>
            </label>

            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-xl border border-default-300 bg-transparent px-4 py-3 outline-none focus:border-primary"
            />

            <p className="text-xs text-default-400 mt-2">
              Add an image URL related to your lesson.
            </p>
          </div>

          {/* Access Level */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Access Level
            </label>

            <div className="relative">

              <select
                name="accessLevel"
                value={
                  isPremium
                    ? formData.accessLevel
                    : "Free"
                }
                onChange={handleAccessChange}
                disabled={!isPremium}
                className={`w-full rounded-xl border px-4 py-3 outline-none ${
                  isPremium
                    ? "border-default-300 bg-transparent focus:border-primary"
                    : "border-default-200 bg-default-100 text-default-500 cursor-not-allowed"
                }`}
              >
                <option value="Free">
                  Free
                </option>

                <option
                  value="Premium"
                  disabled={!isPremium}
                >
                  Premium
                </option>
              </select>

            </div>

            {/* Free User Message */}
            {!isPremium && (
              <div className="mt-2 p-3 rounded-lg bg-warning-50 border border-warning-200">
                <p className="text-sm text-warning-700">
                  🔒 Upgrade to Premium to create paid
                  lessons.
                </p>
              </div>
            )}

            {/* Premium User Message */}
            {isPremium && (
              <p className="text-xs text-success-600 mt-2">
                ✓ Premium account — you can create paid
                lessons.
              </p>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 rounded-lg bg-danger-50 text-danger-600">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="p-3 rounded-lg bg-success-50 text-success-600">
              {success}
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end pt-4">

            <Button
              type="submit"
              color="primary"
              size="lg"
            >
              Create Lesson
            </Button>

          </div>

        </form>
      </Card>

    </div>
  );
}