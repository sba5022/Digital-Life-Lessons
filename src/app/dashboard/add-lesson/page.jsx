
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Card, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { createLesson } from "@/lib/actions/lesson";
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

export default  function AddLessonPage () {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
const router = useRouter();

  // Change this according to your database structure
  const isPremium = user?.plan === "Premium";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    emotionalTone: "",
    // image: "",
    accessLevel: "Free",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

 

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Remove error when user starts fixing it
    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setSuccess("");
  };

 
  const validateForm = () => {
    const newErrors = {};

    // Title
    if (!formData.title.trim()) {
      newErrors.title = "Lesson title is required.";
    } else if (formData.title.trim().length < 5) {
      newErrors.title =
        "Lesson title must be at least 5 characters.";
    } else if (formData.title.trim().length > 100) {
      newErrors.title =
        "Lesson title cannot exceed 100 characters.";
    }

    // Description
    if (!formData.description.trim()) {
      newErrors.description =
        "Please provide your lesson description.";
    } else if (formData.description.trim().length < 20) {
      newErrors.description =
        "Description must be at least 20 characters.";
    } else if (formData.description.trim().length > 5000) {
      newErrors.description =
        "Description cannot exceed 5000 characters.";
    }

    // Category
    if (!formData.category) {
      newErrors.category =
        "Please select a category.";
    }

    // Emotional Tone
    if (!formData.emotionalTone) {
      newErrors.emotionalTone =
        "Please select an emotional tone.";
    }

    // Image
    // if (formData.image.trim()) {
    //   try {
    //     new URL(formData.image);
    //   } catch {
    //     newErrors.image =
    //       "Please enter a valid image URL.";
    //   }
    // }

    // Access Level
    if (!isPremium && formData.accessLevel === "Premium") {
      newErrors.accessLevel =
        "Only Premium users can create Premium lessons.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleAccessChange = (e) => {
    const value = e.target.value;

    if (!isPremium && value === "Premium") {
      return;
    }

    setFormData((previous) => ({
      ...previous,
      accessLevel: value,
    }));

    setErrors((previous) => ({
      ...previous,
      accessLevel: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const lessonData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      emotionalTone: formData.emotionalTone,
      // image: formData.image.trim(),
      accessLevel: isPremium
        ? formData.accessLevel
        : "Free",
    };
// const res = await createLesson(lessonData);
// if (res.insertedId){
//   e.target.reset();
//   setIsRemote(false)
// }
    fetch('http://localhost:3001/lesson', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lessonData),
    });
 const data = await res.json();
 console.log('Response from server:', data);
    setSuccess("Lesson created successfully!");


    setFormData({
      title: "",
      description: "",
      category: "",
      emotionalTone: "",
      image: "",
      accessLevel: "Free",
    });

    setErrors({});
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
        // validationBehavior="aria"
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
              className={`w-full rounded-xl border px-4 py-3 bg-transparent outline-none ${
                errors.title
                  ? "border-danger"
                  : "border-default-300 focus:border-primary"
              }`}
            />

            {errors.title && (
              <p className="text-danger text-sm mt-2">
                {errors.title}
              </p>
            )}
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
              className={`w-full rounded-xl border px-4 py-3 bg-transparent outline-none resize-none ${
                errors.description
                  ? "border-danger"
                  : "border-default-300 focus:border-primary"
              }`}
            />

            <div className="flex justify-between mt-2">
              {errors.description ? (
                <p className="text-danger text-sm">
                  {errors.description}
                </p>
              ) : (
                <p className="text-default-400 text-xs">
                  Minimum 20 characters
                </p>
              )}

              <p className="text-default-400 text-xs">
                {formData.description.length}/5000
              </p>
            </div>
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
                className={`w-full rounded-xl border px-4 py-3 bg-transparent outline-none ${
                  errors.category
                    ? "border-danger"
                    : "border-default-300 focus:border-primary"
                }`}
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

              {errors.category && (
                <p className="text-danger text-sm mt-2">
                  {errors.category}
                </p>
              )}
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
                className={`w-full rounded-xl border px-4 py-3 bg-transparent outline-none ${
                  errors.emotionalTone
                    ? "border-danger"
                    : "border-default-300 focus:border-primary"
                }`}
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

              {errors.emotionalTone && (
                <p className="text-danger text-sm mt-2">
                  {errors.emotionalTone}
                </p>
              )}
            </div>
          </div>

       
    
          <div>
            <label className="block text-sm font-semibold mb-2">
              Access Level
            </label>

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

            {errors.accessLevel && (
              <p className="text-danger text-sm mt-2">
                {errors.accessLevel}
              </p>
            )}

            {!isPremium && (
              <div className="mt-2 p-3 rounded-lg bg-warning-50 border border-warning-200">
                <p className="text-sm text-warning-700">
                  🔒 Upgrade to Premium to create paid
                  lessons.
                </p>
              </div>
            )}

            {isPremium && (
              <p className="text-xs text-success-600 mt-2">
                ✓ Premium account — you can create paid
                lessons.
              </p>
            )}
          </div>

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
              onPress={() => router.push("/dashboard/my-lessons")}
            >
              Create Lesson
            </Button>

          </div>

        </form>
      </Card>
    </div>
  );
}
