"use client";

import React, { useEffect, useState } from "react";
import { Button, Chip, Spinner } from "@heroui/react";
import { Trash2, ShieldCheck } from "lucide-react";

const ManageAdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:3001/users");

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, []);

  // Promote user to admin
  const handlePromote = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to promote this user to admin?"
    );

    if (!confirmed) return;

    try {
      setActionLoading(id);

      const res = await fetch(
        `http://localhost:3001/users/${id}/role`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role: "admin",
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update role");
      }

      // Update UI immediately
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id
            ? { ...user, role: "admin" }
            : user
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to promote user.");
    } finally {
      setActionLoading(null);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this account?"
    );

    if (!confirmed) return;

    try {
      setActionLoading(id);

      const res = await fetch(
        `http://localhost:3001/users/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete user");
      }

      // Remove user from UI
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete user.");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Spinner color="primary" size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">

      {/* Header */}
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            Manage Users
          </h1>

          <p className="text-zinc-400 mt-2">
            Manage platform users, roles and accounts.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-400 text-sm">
              Total Users
            </p>

            <p className="text-3xl font-bold mt-2">
              {users.length}
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-400 text-sm">
              Administrators
            </p>

            <p className="text-3xl font-bold mt-2">
              {users.filter((user) => user.role === "admin").length}
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-400 text-sm">
              Regular Users
            </p>

            <p className="text-3xl font-bold mt-2">
              {users.filter((user) => user.role !== "admin").length}
            </p>
          </div>

        </div>

        {/* Table */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-zinc-900 border-b border-zinc-800">

                <tr>
                  <th className="text-left p-4 text-zinc-400 font-medium">
                    #
                  </th>

                  <th className="text-left p-4 text-zinc-400 font-medium">
                    User Name
                  </th>

                  <th className="text-left p-4 text-zinc-400 font-medium">
                    Email
                  </th>

                  <th className="text-left p-4 text-zinc-400 font-medium">
                    Role
                  </th>

                  <th className="text-left p-4 text-zinc-400 font-medium">
                    Total Lessons
                  </th>

                  <th className="text-right p-4 text-zinc-400 font-medium">
                    Actions
                  </th>
                </tr>

              </thead>

              <tbody>

                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center p-10 text-zinc-500"
                    >
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => (

                    <tr
                      key={user._id}
                      className="border-b border-zinc-800 hover:bg-zinc-900/50 transition"
                    >

                      <td className="p-4 text-zinc-500">
                        {index + 1}
                      </td>

                      <td className="p-4">

                        <div className="flex items-center gap-3">

                          {user.image ? (
                            <img
                              src={user.image}
                              alt={user.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold">
                              {user.name?.charAt(0)?.toUpperCase()}
                            </div>
                          )}

                          <span className="font-semibold">
                            {user.name || "Unknown"}
                          </span>

                        </div>

                      </td>

                      <td className="p-4 text-zinc-400">
                        {user.email}
                      </td>

                      <td className="p-4">

                        <Chip
                          color={
                            user.role === "admin"
                              ? "secondary"
                              : "primary"
                          }
                          variant="flat"
                        >
                          {user.role || "user"}
                        </Chip>

                      </td>

                      <td className="p-4 font-semibold">
                        {user.totalLessons || 0}
                      </td>

                      <td className="p-4">

                        <div className="flex justify-end gap-2">

                          {user.role !== "admin" && (
                            <Button
                              size="sm"
                              color="primary"
                              variant="flat"
                              startContent={<ShieldCheck size={16} />}
                              isLoading={actionLoading === user._id}
                              onPress={() =>
                                handlePromote(user._id)
                              }
                            >
                              Promote
                            </Button>
                          )}

                          <Button
                            size="sm"
                            color="danger"
                            variant="flat"
                            startContent={<Trash2 size={16} />}
                            isLoading={actionLoading === user._id}
                            onPress={() =>
                              handleDelete(user._id)
                            }
                          >
                            Delete
                          </Button>

                        </div>

                      </td>

                    </tr>

                  ))
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ManageAdminUsers;