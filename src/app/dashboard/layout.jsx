"use client";

import { DashboardSidebar } from "@/components/DashboardSidebar";
import { authClient } from "@/lib/auth-client";

const DashboardLayout = ({ children }) => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">
          You must be logged in to access the dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <main className="flex-1 p-6 md:p-10">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;