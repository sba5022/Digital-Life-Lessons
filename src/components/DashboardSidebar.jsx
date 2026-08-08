"use client";

import Link from "next/link";
import {
  LayoutSideContent,
  Bulb,
  FolderPlus,
  Person,
  House,
  CirclePlus,
  Bookmark,
} from "@gravity-ui/icons";

import { Button, Drawer } from "@heroui/react";

export function DashboardSidebar() {
  const navItems = [
    {
      icon: House,
      label: "Home",
      href: "/dashboard",
    },
    {
      icon: CirclePlus,
      label: "Add Lesson",
      href: "/dashboard/add-lesson",
    },
    {
      icon: Bulb,
      label: "My Lessons",
      href: "/dashboard/my-lessons",
    },
    {
      icon: FolderPlus,
      label: "Update Lesson",
      href: "/dashboard/update-lesson",
    },
    {
      icon: Bookmark,
      label: "My Favorites",
      href: "/dashboard/favorites",
    },
    {
      icon: Person,
      label: "Profile",
      href: "/dashboard/profile",
    },
  ];

  const navContent = (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 min-h-screen border-r p-4">
        <div className="w-full">
          <h2 className="text-xl font-bold mb-6">
            Dashboard
          </h2>

          {navContent}
        </div>
      </aside>

      {/* Mobile Menu */}
      <div className="lg:hidden p-4">
        <Drawer>
          <Button variant="secondary">
            <LayoutSideContent />
            Menu
          </Button>

          <Drawer.Backdrop>
            <Drawer.Content placement="left">
              <Drawer.Dialog>
                <Drawer.CloseTrigger />

                <Drawer.Header>
                  <Drawer.Heading>
                    Navigation
                  </Drawer.Heading>
                </Drawer.Header>

                <Drawer.Body>
                  {navContent}
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
}