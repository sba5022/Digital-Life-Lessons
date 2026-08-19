"use client";

import { useSession } from "@/lib/auth-client";
import React from "react";
import {
  Card,
  Chip,
} from "@heroui/react";

const AdminHome = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-zinc-400">Loading dashboard...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="bg-zinc-950 border border-zinc-800">
         
            <h2 className="text-xl font-bold text-red-400">
              Access Denied
            </h2>
            <p className="text-zinc-400 mt-2">
              You must be logged in as an admin.
            </p>
         
        </Card>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">

      {/* Header */}
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <p className="text-indigo-400 text-sm font-medium">
            ADMIN PANEL
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-1">
            Welcome back, {user?.name}
          </h1>

          <p className="text-zinc-500 mt-2">
            Monitor your Digital Life Lessons platform.
          </p>
        </div>


        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

          {/* Total Users */}
          <Card className="bg-zinc-950 border border-zinc-800 shadow-lg">
           

              <div className="flex items-center justify-between">
                <span className="text-zinc-400 text-sm">
                  Total Users
                </span>

                <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center">
                  👥
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-4">
                1,248
              </h2>

              <p className="text-emerald-400 text-sm mt-2">
                ↑ 12.5% this month
              </p>

            
          </Card>


          {/* Public Lessons */}
          <Card className="bg-zinc-950 border border-zinc-800 shadow-lg">
           
              <div className="flex items-center justify-between">
                <span className="text-zinc-400 text-sm">
                  Public Lessons
                </span>

                <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center">
                  📚
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-4">
                856
              </h2>

              <p className="text-emerald-400 text-sm mt-2">
                ↑ 8.2% this month
              </p>

            
          </Card>


          {/* Reported */}
          <Card className="bg-zinc-950 border border-zinc-800 shadow-lg">
           

              <div className="flex items-center justify-between">
                <span className="text-zinc-400 text-sm">
                  Reported Lessons
                </span>

                <div className="w-10 h-10 rounded-xl bg-red-600/20 flex items-center justify-center">
                  🚨
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-4">
                24
              </h2>

              <p className="text-red-400 text-sm mt-2">
                6 need attention
              </p>

            
          </Card>


          {/* Today's Lessons */}
          <Card className="bg-zinc-950 border border-zinc-800 shadow-lg">
           
              <div className="flex items-center justify-between">
                <span className="text-zinc-400 text-sm">
                  Today's Lessons
                </span>

                <div className="w-10 h-10 rounded-xl bg-cyan-600/20 flex items-center justify-center">
                  ✨
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-4">
                37
              </h2>

              <p className="text-emerald-400 text-sm mt-2">
                ↑ 18% from yesterday
              </p>

           
          </Card>


          {/* Premium Users */}
          <Card className="bg-zinc-950 border border-zinc-800 shadow-lg">
           
              <div className="flex items-center justify-between">
                <span className="text-zinc-400 text-sm">
                  Premium Users
                </span>

                <div className="w-10 h-10 rounded-xl bg-yellow-600/20 flex items-center justify-center">
                  ⭐
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-4">
                186
              </h2>

              <p className="text-emerald-400 text-sm mt-2">
                ↑ 5.4% this month
              </p>

           
          </Card>

        </div>


        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mt-6">

          {/* Lesson Growth */}
          <Card className="bg-zinc-950 border border-zinc-800">
           

              <div className="flex justify-between items-center mb-6">

                <div>
                  <h2 className="text-xl font-bold">
                    Lesson Growth
                  </h2>

                  <p className="text-sm text-zinc-500">
                    Lessons created over the last 6 months
                  </p>
                </div>

                <Chip
                  color="primary"
                  variant="flat"
                >
                  +18.4%
                </Chip>

              </div>

              <div className="h-64 flex items-end gap-4">

                {[
                  { month: "Mar", value: 35 },
                  { month: "Apr", value: 48 },
                  { month: "May", value: 42 },
                  { month: "Jun", value: 65 },
                  { month: "Jul", value: 78 },
                  { month: "Aug", value: 92 },
                ].map((item) => (

                  <div
                    key={item.month}
                    className="flex-1 h-full flex flex-col justify-end items-center gap-2"
                  >

                    <div
                      className="w-full max-w-10 bg-indigo-600 rounded-t-lg hover:bg-indigo-500 transition"
                      style={{
                        height: `${item.value}%`,
                      }}
                    />

                    <span className="text-xs text-zinc-500">
                      {item.month}
                    </span>

                  </div>

                ))}

              </div>

           
          </Card>


          {/* User Growth */}
          <Card className="bg-zinc-950 border border-zinc-800">
            

              <div className="flex justify-between items-center mb-6">

                <div>
                  <h2 className="text-xl font-bold">
                    User Growth
                  </h2>

                  <p className="text-sm text-zinc-500">
                    Registered users over the last 6 months
                  </p>
                </div>

                <Chip
                  color="success"
                  variant="flat"
                >
                  +12.5%
                </Chip>

              </div>

              <div className="h-64 flex items-end gap-4">

                {[
                  { month: "Mar", value: 30 },
                  { month: "Apr", value: 45 },
                  { month: "May", value: 55 },
                  { month: "Jun", value: 60 },
                  { month: "Jul", value: 75 },
                  { month: "Aug", value: 95 },
                ].map((item) => (

                  <div
                    key={item.month}
                    className="flex-1 h-full flex flex-col justify-end items-center gap-2"
                  >

                    <div
                      className="w-full max-w-10 bg-emerald-600 rounded-t-lg hover:bg-emerald-500 transition"
                      style={{
                        height: `${item.value}%`,
                      }}
                    />

                    <span className="text-xs text-zinc-500">
                      {item.month}
                    </span>

                  </div>

                ))}

              </div>

            
          </Card>

        </div>


        {/* Bottom Section */}
        <div className="grid lg:grid-cols-2 gap-6 mt-6">

          {/* Most Active Contributors */}
          <Card className="bg-zinc-950 border border-zinc-800">
           

              <div className="flex justify-between items-center mb-5">

                <div>
                  <h2 className="text-xl font-bold">
                    Most Active Contributors
                  </h2>

                  <p className="text-sm text-zinc-500">
                    Top lesson creators
                  </p>
                </div>

                <span className="text-indigo-400">
                  View all →
                </span>

              </div>

              <div className="space-y-4">

                {[
                  {
                    name: "Sumaia Binta Asad",
                    lessons: 42,
                    badge: "Top Contributor",
                  },
                  {
                    name: "Nusrat Jahan",
                    lessons: 35,
                    badge: "Active",
                  },
                  {
                    name: "Ayesha Rahman",
                    lessons: 28,
                    badge: "Active",
                  },
                  {
                    name: "Tanvir Ahmed",
                    lessons: 24,
                    badge: "Contributor",
                  },
                ].map((person, index) => (

                  <div
                    key={person.name}
                    className="flex items-center justify-between p-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition"
                  >

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold">
                        {index + 1}
                      </div>

                      <div>
                        <p className="font-medium">
                          {person.name}
                        </p>

                        <p className="text-xs text-zinc-500">
                          {person.lessons} lessons
                        </p>
                      </div>

                    </div>

                    <Chip
                      size="sm"
                      color={index === 0 ? "warning" : "default"}
                      variant="flat"
                    >
                      {person.badge}
                    </Chip>

                  </div>

                ))}

              </div>

            
          </Card>


          {/* Recent Activity */}
          <Card className="bg-zinc-950 border border-zinc-800">
            
              <h2 className="text-xl font-bold">
                Recent Activity
              </h2>

              <p className="text-sm text-zinc-500 mb-5">
                Latest platform activity
              </p>

              <div className="space-y-5">

                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2" />

                  <div>
                    <p className="text-sm">
                      New lesson{" "}
                      <span className="text-indigo-400">
                        "Learning from Failure"
                      </span>{" "}
                      was published.
                    </p>

                    <p className="text-xs text-zinc-600 mt-1">
                      10 minutes ago
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />

                  <div>
                    <p className="text-sm">
                      New user{" "}
                      <span className="text-emerald-400">
                        Rahim Ahmed
                      </span>{" "}
                      joined the platform.
                    </p>

                    <p className="text-xs text-zinc-600 mt-1">
                      35 minutes ago
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2" />

                  <div>
                    <p className="text-sm">
                      Lesson{" "}
                      <span className="text-red-400">
                        "Life Hacks"
                      </span>{" "}
                      was reported.
                    </p>

                    <p className="text-xs text-zinc-600 mt-1">
                      1 hour ago
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2" />

                  <div>
                    <p className="text-sm">
                      User{" "}
                      <span className="text-yellow-400">
                        Ayesha Rahman
                      </span>{" "}
                      upgraded to Premium.
                    </p>

                    <p className="text-xs text-zinc-600 mt-1">
                      2 hours ago
                    </p>
                  </div>
                </div>

              </div>

          
          </Card>

        </div>

      </div>
    </div>
  );
};

export default AdminHome;