// 'use client';
// import { DashboardSidebar } from '@/components/DashboardSidebar';
// import React from 'react';
// import { authClient } from "@/lib/auth-client";

// const Dashboardlayout = ({children}) => {
//     const { data: session , isLoading } = authClient.useSession();
//     if (isLoading) {
//         return <div>Loading...</div>;
//     }

//     if (!session) {
//         return <div>You must be logged in to access the dashboard.</div>;
//     }
//     const user = session?.user;
//     console.log(user,session);
//     return (
//         <div className='flex gap-3 min-h-screen'> 
//             <DashboardSidebar/>
//             <div>{children}</div>
//            <div className='font-bold text-4xl'>Welcome, {user?.name}!</div>
//         </div>
//     );
// };

// export default Dashboardlayout;
"use client";

import { Card, Button } from "@heroui/react";

import Link from "next/link";

const DashboardHome = () => {
  // Temporary data
  // Later you can get these values from MongoDB/API
  const stats = [
    {
      title: "Total Lessons",
      value: "24",
      description: "Lessons you have created",
    },
    {
      title: "Saved Favorites",
      value: "12",
      description: "Lessons you have saved",
    },
    {
      title: "This Week",
      value: "5",
      description: "New lessons this week",
    },
    {
      title: "Reflections",
      value: "18",
      description: "Total reflections",
    },
  ];

  const recentLessons = [
    {
      id: 1,
      title: "Learning From Failure",
      category: "Personal Growth",
      date: "Today",
    },
    {
      id: 2,
      title: "The Importance of Patience",
      category: "Life",
      date: "Yesterday",
    },
    {
      id: 3,
      title: "Never Stop Learning",
      category: "Education",
      date: "3 days ago",
    },
  ];

  const weeklyData = [
    { day: "Mon", value: 4 },
    { day: "Tue", value: 7 },
    { day: "Wed", value: 5 },
    { day: "Thu", value: 9 },
    { day: "Fri", value: 6 },
    { day: "Sat", value: 10 },
    { day: "Sun", value: 8 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* Header */}
      <div>
        <p className="text-primary font-medium">
          Dashboard
        </p>

        <h1 className="text-3xl md:text-4xl font-bold mt-2">
          Welcome back!
        </h1>

        <p className="text-default-500 mt-2">
          Manage your life lessons, reflections and saved ideas.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="border border-default-200"
          >
            <div className="p-6">

              <p className="text-default-500 text-sm">
                {stat.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {stat.value}
              </h2>

              <p className="text-xs text-default-400 mt-2">
                {stat.description}
              </p>

            </div>
          </Card>
        ))}

      </div>

      {/* Quick Actions */}
      <Card className="border border-default-200">

        <div className="px-6 pt-6">
          <div>
            <h2 className="text-xl font-bold">
              Quick Actions
            </h2>

            <p className="text-sm text-default-500 mt-1">
              Quickly access your important actions.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 px-6 pb-6">

          <Button
            as={Link}
            href="/dashboard/add-lesson"
            color="primary"
          >
            + Add New Lesson
          </Button>

          <Button
            as={Link}
            href="/dashboard/my-lessons"
            variant="bordered"
          >
            My Lessons
          </Button>

          <Button
            as={Link}
            href="/dashboard/my-favorites"
            variant="bordered"
          >
            My Favorites
          </Button>

          <Button
            as={Link}
            href="/public-lessons"
            variant="flat"
          >
            Explore Lessons
          </Button>

        </div>

      </Card>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Recent Lessons */}
        <Card className="border border-default-200">

          <div className="px-6 pt-6">
            <div>
              <h2 className="text-xl font-bold">
                Recently Added Lessons
              </h2>

              <p className="text-sm text-default-500 mt-1">
                Your latest life lessons.
              </p>
            </div>
          </div>

          <div className="px-6">

            <div className="space-y-4">

              {recentLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between gap-4 p-4 rounded-xl bg-default-100 hover:bg-default-200 transition"
                >

                  <div>
                    <h3 className="font-semibold">
                      {lesson.title}
                    </h3>

                    <p className="text-sm text-default-500">
                      {lesson.category}
                    </p>
                  </div>

                  <span className="text-xs text-default-400 whitespace-nowrap">
                    {lesson.date}
                  </span>

                </div>
              ))}

            </div>

            <Button
              as={Link}
              href="/dashboard/my-lessons"
              variant="light"
              className="mt-5"
            >
              View All Lessons →
            </Button>

          </div>

        </Card>

        {/* Weekly Analytics */}
        <Card className="border border-default-200">

          <div className="px-6 pt-6">
            <div>
              <h2 className="text-xl font-bold">
                Weekly Contributions
              </h2>

              <p className="text-sm text-default-500 mt-1">
                Your activity during this week.
              </p>
            </div>
          </div>

          <div className="px-6">

            <div className="h-64 flex items-end justify-between gap-3">

              {weeklyData.map((item) => (
                <div
                  key={item.day}
                  className="flex-1 h-full flex flex-col items-center justify-end gap-2"
                >

                  {/* Value */}
                  <span className="text-xs text-default-500">
                    {item.value}
                  </span>

                  {/* Bar */}
                  <div
                    className="w-full max-w-10 bg-primary rounded-t-lg transition-all hover:opacity-80"
                    style={{
                      height: `${item.value * 8}%`,
                    }}
                  />

                  {/* Day */}
                  <span className="text-xs text-default-400">
                    {item.day}
                  </span>

                </div>
              ))}

            </div>

          </div>

        </Card>

      </div>

      {/* Bottom Information */}
      <Card className="border border-default-200">

        <div className="p-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>
              <h2 className="text-xl font-bold">
                Keep Sharing Your Wisdom
              </h2>

              <p className="text-default-500 mt-2">
                Every experience can become a valuable lesson
                for someone else.
              </p>
            </div>

            <Button
              as={Link}
              href="/dashboard/add-lesson"
              color="primary"
            >
              Share a Lesson
            </Button>

          </div>

        </div>

      </Card>

    </div>
  );
};

export default DashboardHome;