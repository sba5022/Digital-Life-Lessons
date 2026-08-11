
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  Button,
  Input,
  Chip,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const ProfilePage = () => {
  const { data: session, isLoading } = authClient.useSession();

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [saving, setSaving] = useState(false);

  // Example data
  // Replace this with your MongoDB/API data
  const lessons = [
    {
      id: "1",
      title: "Never Be Afraid of Failure",
      description:
        "Failure taught me that mistakes are part of the learning process.",
      category: "Personal Growth",
      emotionalTone: "Motivational",
      image: "/projects/life-lesson.jpg",
      createdAt: "2026-07-20",
    },
    {
      id: "2",
      title: "A Lesson About Patience",
      description:
        "Sometimes the best things in life require patience and consistency.",
      category: "Mindset",
      emotionalTone: "Realization",
      image: "/projects/life-lesson.jpg",
      createdAt: "2026-07-15",
    },
    {
      id: "3",
      title: "Learning From Mistakes",
      description:
        "Every mistake can become an opportunity to grow.",
      category: "Mistakes Learned",
      emotionalTone: "Gratitude",
      image: "/projects/life-lesson.jpg",
      createdAt: "2026-07-10",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold">
            Login Required
          </h2>

          <p className="mt-2 text-default-500">
            Please login to view your profile.
          </p>

          <Link href="/login" className="mt-5">
            <Button color="primary">
              Login
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const user = session.user;

  const isPremium =
    user?.plan === "Premium" ||
    user?.plan === "premium";

  const totalLessons = lessons.length;

  // Replace this with the actual saved/favorites count
  const totalSaved = 8;

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      // Connect this to your Better Auth / API
      console.log({
        name,
        photo,
      });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-background p-5 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="mb-8">

          <p className="text-primary uppercase tracking-widest text-sm font-semibold">
            Dashboard
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-2">
            My Profile
          </h1>

          <p className="text-default-500 mt-2">
            Manage your profile and explore your public lessons.
          </p>

        </div>


        {/* Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Profile Card */}
          <Card className="p-6 lg:col-span-1">

            <div className="flex flex-col items-center text-center">

              {/* Profile Image */}
              <div className="relative">

                <Image
                  src={
                    user?.image ||
                    "https://i.pravatar.cc/150?img=12"
                  }
                  alt={user?.name || "User"}
                  width={130}
                  height={130}
                  className="w-32 h-32 rounded-full object-cover border-4 border-primary"
                />

              </div>

              {/* Name */}
              <h2 className="text-2xl font-bold mt-5">
                {user?.name}
              </h2>

              {/* Email */}
              <p className="text-default-500 mt-1 break-all">
                {user?.email}
              </p>

              {/* Premium Badge */}
              {isPremium && (
                <Chip
                  color="warning"
                  variant="flat"
                  className="mt-4"
                >
                  ⭐ Premium
                </Chip>
              )}

            </div>


            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4 mt-8">

              <div className="text-center p-4 rounded-xl bg-default-100">

                <p className="text-3xl font-bold">
                  {totalLessons}
                </p>

                <p className="text-sm text-default-500">
                  Lessons Created
                </p>

              </div>

              <div className="text-center p-4 rounded-xl bg-default-100">

                <p className="text-3xl font-bold">
                  {totalSaved}
                </p>

                <p className="text-sm text-default-500">
                  Saved
                </p>

              </div>

            </div>

          </Card>


          {/* Edit Profile */}
          <Card className="p-6 lg:col-span-2">

            <h2 className="text-2xl font-bold">
              Edit Profile
            </h2>

            <p className="text-default-500 mt-1 mb-6">
              Update your display name or profile photo.
            </p>


            <form
              onSubmit={handleUpdateProfile}
              className="space-y-6"
            >

              {/* Name */}
              <Input
                label="Display Name"
                placeholder={user?.name}
                value={name}
                onValueChange={setName}
                variant="bordered"
              />


              {/* Email */}
              <Input
                label="Email"
                value={user?.email || ""}
                isReadOnly
                variant="bordered"
                description="Email cannot be changed."
              />


              {/* Photo */}
              <Input
                label="Photo URL"
                placeholder={user?.image || "Enter image URL"}
                value={photo}
                onValueChange={setPhoto}
                variant="bordered"
              />


              {/* Update Button */}
              <Button
                type="submit"
                color="primary"
                isLoading={saving}
              >
                Update Profile
              </Button>

            </form>

          </Card>

        </div>


        {/* Public Lessons */}
        <section className="mt-14">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-7">

            <div>

              <p className="text-primary uppercase tracking-widest text-sm font-semibold">
                My Content
              </p>

              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                Public Lessons
              </h2>

              <p className="text-default-500 mt-2">
                Lessons shared publicly by {user?.name}.
              </p>

            </div>

          </div>


          {lessons.length === 0 ? (

            <Card className="p-10 text-center">

              <h3 className="text-xl font-semibold">
                No Public Lessons
              </h3>

              <p className="text-default-500 mt-2">
                You haven't published any lessons yet.
              </p>

              <Link
                href="/dashboard/add-lesson"
                className="mt-5"
              >
                <Button color="primary">
                  Create Your First Lesson
                </Button>
              </Link>

            </Card>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              {lessons.map((lesson) => (

                <Card
                  key={lesson.id}
                  className="overflow-hidden hover:-translate-y-1 transition-transform duration-300"
                >

                  {/* Image */}
                  <div className="relative h-52 w-full">

                    <Image
                      src={lesson.image}
                      alt={lesson.title}
                      fill
                      className="object-cover"
                    />

                  </div>


                  {/* Content */}
                  <div className="p-5">

                    <div className="flex flex-wrap gap-2 mb-3">

                      <Chip
                        size="sm"
                        variant="flat"
                        color="primary"
                      >
                        {lesson.category}
                      </Chip>

                      <Chip
                        size="sm"
                        variant="flat"
                        color="secondary"
                      >
                        {lesson.emotionalTone}
                      </Chip>

                    </div>


                    <h3 className="text-xl font-bold">
                      {lesson.title}
                    </h3>


                    <p className="text-default-500 mt-2 line-clamp-3">
                      {lesson.description}
                    </p>


                    <p className="text-xs text-default-400 mt-4">
                      Published: {lesson.createdAt}
                    </p>


                    <Link
                      href={`/public-lessons/${lesson.id}`}
                      className="block mt-5"
                    >

                      <Button
                        color="primary"
                        variant="flat"
                        className="w-full"
                      >
                        View Lesson
                      </Button>

                    </Link>

                  </div>

                </Card>

              ))}

            </div>

          )}

        </section>

      </div>

    </main>
  );
};

export default ProfilePage;

